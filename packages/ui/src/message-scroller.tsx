"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ArrowDown as ArrowDownIcon } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { Button, type ButtonProps } from "./button";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Scroll controller
// ---------------------------------------------------------------------------

// Scroll position, following and anchoring are tracked here, outside React
// state, so scrolling and streamed text never re-render the transcript.
// Only `useMessageScrollerScrollable` subscribers re-render, when an edge
// becomes reachable or unreachable.

type ScrollPosition = "start" | "end" | "last-anchor";

interface ScrollerOptions {
  autoScroll: boolean;
  defaultScrollPosition: ScrollPosition;
  preserveScrollOnPrepend: boolean;
  scrollPreviousItemPeek: number;
}

interface Scrollable {
  /** There is content below the viewport. */
  end: boolean;
  /** There is content above the viewport. */
  start: boolean;
}

interface ScrollCommandOptions {
  /** @default "smooth" (instant under `prefers-reduced-motion`) */
  behavior?: "smooth" | "instant";
}

const ITEM_SELECTOR = "[data-slot=message-scroller-item]";
const EDGE = 4;
const SMOOTH_TIMEOUT = 1000;
const NOT_SCROLLABLE: Scrollable = { start: false, end: false };

function isAnchor(element: HTMLElement) {
  return element.dataset.scrollAnchor !== undefined;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

function setFlag(elements: (HTMLElement | null)[], name: string, on: boolean) {
  for (const element of elements) {
    element?.toggleAttribute(name, on);
  }
}

class Scroller {
  options: ScrollerOptions;
  content: HTMLElement | null = null;
  scrollable: Scrollable = NOT_SCROLLABLE;

  private root: HTMLElement | null = null;
  private viewport: HTMLElement | null = null;
  private spacer: HTMLElement | null = null;
  private onOpen: (() => void) | null = null;
  private following: boolean;
  private expectedTop: number | null = null;
  private smooth: boolean;
  private smoothTimer: ReturnType<typeof setTimeout> | undefined;
  private anchor: HTMLElement | null = null;
  private pinned: { element: HTMLElement; top: number } | null = null;
  private pending: { id: string; options: ScrollCommandOptions } | null = null;
  private readonly listeners = new Set<() => void>();

  constructor(options: ScrollerOptions) {
    this.options = options;
    this.following = true;
    this.smooth = false;
  }

  // -- subscriptions --------------------------------------------------------

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getScrollable = () => this.scrollable;

  getServerScrollable = () => NOT_SCROLLABLE;

  // -- lifecycle ------------------------------------------------------------

  // The frame's ref is set after the viewport attaches, so mirror the state
  // onto it then.
  setRoot(element: HTMLElement | null) {
    this.root = element;
    this.sync();
  }

  attach(viewport: HTMLElement, spacer: HTMLElement, onOpen: () => void) {
    this.viewport = viewport;
    this.spacer = spacer;
    this.onOpen = onOpen;
    viewport.addEventListener("scroll", this.handleScroll, { passive: true });
    viewport.addEventListener("scrollend", this.handleScrollEnd);
    for (const type of ["wheel", "touchmove", "pointerdown", "keydown"]) {
      viewport.addEventListener(type, this.handleIntent, { passive: true });
    }
    document.addEventListener("selectionchange", this.handleSelection);
    const mutations = new MutationObserver(this.handleMutations);
    const resizes =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(this.handleResize);
    resizes?.observe(viewport);
    if (this.content) {
      mutations.observe(this.content, { childList: true });
      resizes?.observe(this.content);
    }

    if (this.items().length > 0) {
      this.open();
    } else {
      this.markOpen();
    }

    return () => {
      viewport.removeEventListener("scroll", this.handleScroll);
      viewport.removeEventListener("scrollend", this.handleScrollEnd);
      for (const type of ["wheel", "touchmove", "pointerdown", "keydown"]) {
        viewport.removeEventListener(type, this.handleIntent);
      }
      document.removeEventListener("selectionchange", this.handleSelection);
      mutations.disconnect();
      resizes?.disconnect();
      clearTimeout(this.smoothTimer);
      this.viewport = null;
      this.spacer = null;
    };
  }

  // -- commands -------------------------------------------------------------

  scrollToEnd = ({ behavior = "smooth" }: ScrollCommandOptions = {}) => {
    this.following = true;
    this.scrollTo(this.maxScroll(), behavior, true);
  };

  scrollToStart = ({ behavior = "smooth" }: ScrollCommandOptions = {}) => {
    this.following = false;
    this.scrollTo(0, behavior);
  };

  /**
   * Scrolls `messageId`'s row near the top. Before any row has mounted the
   * jump is queued; after that, an unknown id returns `false`.
   */
  scrollToMessage = (messageId: string, options: ScrollCommandOptions = {}) => {
    const items = this.items();
    const target = items.find((item) => item.dataset.messageId === messageId);
    if (!target) {
      if (items.length === 0 || !this.viewport) {
        this.pending = { id: messageId, options };
        return true;
      }
      return false;
    }
    this.following = false;
    this.scrollTo(
      this.offsetOf(target) - this.options.scrollPreviousItemPeek,
      options.behavior ?? "smooth"
    );
    return true;
  };

  // -- events ---------------------------------------------------------------

  // Scroll events at the position we just set are ours; anything else is
  // the reader moving, which decides whether to keep following.
  private readonly handleScroll = () => {
    if (!this.smooth) {
      const expected = this.expectedTop;
      this.expectedTop = null;
      const ours =
        expected !== null &&
        Math.abs((this.viewport?.scrollTop ?? 0) - expected) < 1;
      if (!ours) {
        this.following = this.atEnd();
      }
    }
    this.sync();
  };

  private readonly handleScrollEnd = () => {
    if (this.smooth) {
      this.endSmooth();
    }
  };

  // Wheel, touch, a click on the scrollbar or a key take over from a smooth
  // scroll we started; the scroll events that follow decide `following`.
  private readonly handleIntent = () => {
    if (this.smooth) {
      clearTimeout(this.smoothTimer);
      this.smooth = false;
      setFlag([this.root, this.viewport], "data-autoscrolling", false);
    }
  };

  // Selecting text in the transcript stops the view following new output,
  // so the selection isn't dragged away.
  private readonly handleSelection = () => {
    const selection = document.getSelection();
    if (
      selection &&
      !selection.isCollapsed &&
      this.content?.contains(selection.anchorNode)
    ) {
      this.following = false;
      this.sync();
    }
  };

  private readonly handleMutations = (records: MutationRecord[]) => {
    const added = new Set<Node>();
    for (const record of records) {
      for (const node of record.addedNodes) {
        added.add(node);
      }
    }
    const items = this.items();
    const newItems = items.filter((item) => added.has(item));
    if (newItems.length > 0 && newItems.length === items.length) {
      // A whole transcript arrived (it loaded after mount).
      this.open();
      return;
    }
    const lastAnchor = items.findLast(isAnchor);
    if (lastAnchor && added.has(lastAnchor) && lastAnchor !== this.anchor) {
      this.anchorTo(lastAnchor);
    } else {
      this.handleResize();
    }
    this.flushPending();
  };

  private readonly handleResize = () => {
    this.updateSpacer();
    if (this.smooth) {
      return;
    }
    if (this.options.autoScroll && this.following) {
      this.scrollTo(this.maxScroll(), "instant");
    } else if (this.options.preserveScrollOnPrepend) {
      this.restorePinned();
    }
    this.sync();
  };

  // -- internals ------------------------------------------------------------

  private items() {
    return this.content
      ? Array.from(this.content.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
      : [];
  }

  private maxScroll() {
    const viewport = this.viewport;
    return viewport
      ? Math.max(0, viewport.scrollHeight - viewport.clientHeight)
      : 0;
  }

  private atEnd() {
    return this.maxScroll() - (this.viewport?.scrollTop ?? 0) <= EDGE;
  }

  /** `element`'s top in scroll coordinates, independent of scrollTop. */
  private offsetOf(element: HTMLElement) {
    const viewport = this.viewport;
    if (!viewport) {
      return 0;
    }
    return (
      element.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top +
      viewport.scrollTop
    );
  }

  private scrollTo(
    top: number,
    behavior: "smooth" | "instant",
    autoscrolling = false
  ) {
    const viewport = this.viewport;
    if (!viewport) {
      return;
    }
    const target = Math.min(Math.max(0, top), this.maxScroll());
    if (Math.abs(viewport.scrollTop - target) < 1) {
      this.sync();
      return;
    }
    clearTimeout(this.smoothTimer);
    if (behavior === "smooth" && !prefersReducedMotion() && viewport.scrollTo) {
      this.smooth = true;
      setFlag([this.root, viewport], "data-autoscrolling", autoscrolling);
      viewport.scrollTo({ top: target, behavior: "smooth" });
      this.smoothTimer = setTimeout(() => this.endSmooth(), SMOOTH_TIMEOUT);
    } else {
      this.smooth = false;
      if (viewport.scrollTo) {
        viewport.scrollTo({ top: target, behavior: "instant" });
      } else {
        viewport.scrollTop = target;
      }
      this.expectedTop = viewport.scrollTop;
    }
    this.sync();
  }

  private endSmooth() {
    clearTimeout(this.smoothTimer);
    this.smooth = false;
    setFlag([this.root, this.viewport], "data-autoscrolling", false);
    // Output may have grown while the scroll ran.
    if (this.options.autoScroll && this.following && !this.atEnd()) {
      this.scrollTo(this.maxScroll(), "instant");
    }
    this.sync();
  }

  private open() {
    const items = this.items();
    let target = this.maxScroll();
    if (this.options.defaultScrollPosition === "start") {
      target = 0;
    } else if (this.options.defaultScrollPosition === "last-anchor") {
      const last = items.findLast(isAnchor);
      if (last) {
        target = Math.min(
          target,
          this.offsetOf(last) - this.options.scrollPreviousItemPeek
        );
      }
    }
    this.scrollTo(target, "instant");
    this.following = this.atEnd();
    this.markOpen();
    this.flushPending();
    this.sync();
  }

  private markOpen() {
    this.viewport?.removeAttribute("data-pending-scroll");
    this.onOpen?.();
  }

  // A new turn settles near the top, with a peek of the row before it. The
  // spacer below the content makes room for that while the reply is still
  // short; it shrinks as the reply streams in, and once the reply fills the
  // viewport, following the live edge takes over.
  private anchorTo(anchor: HTMLElement) {
    this.anchor = anchor;
    this.following = true;
    this.updateSpacer();
    this.scrollTo(
      this.offsetOf(anchor) - this.options.scrollPreviousItemPeek,
      "smooth"
    );
  }

  private updateSpacer() {
    const { spacer, viewport } = this;
    if (!(spacer && viewport)) {
      return;
    }
    let height = 0;
    if (this.anchor?.isConnected) {
      const current = spacer.offsetHeight;
      const target =
        this.offsetOf(this.anchor) - this.options.scrollPreviousItemPeek;
      height = Math.max(
        0,
        Math.ceil(
          target + viewport.clientHeight - (viewport.scrollHeight - current)
        )
      );
    }
    if (height === 0) {
      this.anchor = null;
    }
    spacer.style.height = height > 0 ? `${height}px` : "";
  }

  // Keep the first visible row where it was, e.g. when earlier messages are
  // prepended above it or an image above it loads.
  private restorePinned() {
    const { pinned, viewport } = this;
    if (!(pinned?.element.isConnected && viewport)) {
      return;
    }
    const now =
      pinned.element.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top;
    const delta = now - pinned.top;
    if (Math.abs(delta) >= 1) {
      this.scrollTo(viewport.scrollTop + delta, "instant");
    }
  }

  private recordPinned() {
    const viewport = this.viewport;
    if (!viewport) {
      return;
    }
    // Prefer a row with a `messageId`: a "Load earlier" row at the top
    // stays put while history is inserted below it.
    const top = viewport.getBoundingClientRect().top;
    const bottom = top + viewport.clientHeight;
    this.pinned = null;
    for (const element of this.items()) {
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= top) {
        continue;
      }
      if (rect.top >= bottom) {
        return;
      }
      this.pinned ??= { element, top: rect.top - top };
      if (element.dataset.messageId !== undefined) {
        this.pinned = { element, top: rect.top - top };
        return;
      }
    }
  }

  private flushPending() {
    if (this.pending && this.items().length > 0) {
      const { id, options } = this.pending;
      this.pending = null;
      this.scrollToMessage(id, options);
    }
  }

  private sync() {
    const viewport = this.viewport;
    if (!viewport) {
      return;
    }
    const scrollTop = viewport.scrollTop;
    const next = {
      start: scrollTop > EDGE,
      end: this.maxScroll() - scrollTop > EDGE,
    };
    const elements = [this.root, viewport];
    setFlag(elements, "data-at-start", !next.start);
    setFlag(elements, "data-at-end", !next.end);
    setFlag(elements, "data-following", this.following);
    if (
      next.start !== this.scrollable.start ||
      next.end !== this.scrollable.end
    ) {
      this.scrollable = next;
      for (const listener of this.listeners) {
        listener();
      }
    }
    this.recordPinned();
  }
}

// ---------------------------------------------------------------------------
// MessageScrollerProvider
// ---------------------------------------------------------------------------

const ScrollerContext = createContext<Scroller | null>(null);

function useScroller(part: string) {
  const scroller = useContext(ScrollerContext);
  if (!scroller) {
    throw new Error(`${part} must be used within a MessageScrollerProvider`);
  }
  return scroller;
}

interface MessageScrollerProviderProps {
  /**
   * Keep growing output in view while the reader is at the latest message.
   * Scrolling away (wheel, touch, keys, scrollbar), selecting text or
   * jumping to a message releases it; scrolling back to the end, or the
   * jump button, picks it up again.
   * @default false
   */
  autoScroll?: boolean;
  children?: React.ReactNode;
  /**
   * Where a transcript opens. `last-anchor` shows the last `scrollAnchor`
   * row (the reader's latest question) with the reply below it, falling
   * back to `end` when that turn fits.
   * @default "last-anchor"
   */
  defaultScrollPosition?: ScrollPosition;
  /**
   * Keep the reader's place when earlier messages are prepended.
   * @default true
   */
  preserveScrollOnPrepend?: boolean;
  /**
   * Pixels of the previous row kept visible above a newly anchored turn.
   * @default 64
   */
  scrollPreviousItemPeek?: number;
}

/**
 * Owns the scroll state for one transcript. The `useMessageScroller` hooks
 * work anywhere inside it, so controls can live outside the scroller frame.
 */
function MessageScrollerProvider({
  autoScroll = false,
  children,
  defaultScrollPosition = "last-anchor",
  preserveScrollOnPrepend = true,
  scrollPreviousItemPeek = 64,
}: MessageScrollerProviderProps) {
  const [scroller] = useState(
    () =>
      new Scroller({
        autoScroll,
        defaultScrollPosition,
        preserveScrollOnPrepend,
        scrollPreviousItemPeek,
      })
  );
  useLayoutEffect(() => {
    scroller.options = {
      autoScroll,
      defaultScrollPosition,
      preserveScrollOnPrepend,
      scrollPreviousItemPeek,
    };
  }, [
    autoScroll,
    defaultScrollPosition,
    preserveScrollOnPrepend,
    scroller,
    scrollPreviousItemPeek,
  ]);
  return (
    <ScrollerContext.Provider value={scroller}>
      {children}
    </ScrollerContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/** Commands to drive the transcript: jump to the end, the start or a row. */
function useMessageScroller() {
  const scroller = useScroller("useMessageScroller");
  return useMemo(
    () => ({
      scrollToEnd: scroller.scrollToEnd,
      scrollToMessage: scroller.scrollToMessage,
      scrollToStart: scroller.scrollToStart,
    }),
    [scroller]
  );
}

/**
 * Which edges the viewport can still scroll towards. At the latest message
 * `end` is `false`. For styling, prefer the `data-at-start`/`data-at-end`
 * attributes on `MessageScroller`.
 */
function useMessageScrollerScrollable(): Scrollable {
  const scroller = useScroller("useMessageScrollerScrollable");
  return useSyncExternalStore(
    scroller.subscribe,
    scroller.getScrollable,
    scroller.getServerScrollable
  );
}

// ---------------------------------------------------------------------------
// MessageScroller
// ---------------------------------------------------------------------------

type MessageScrollerProps = React.ComponentProps<"div">;

/**
 * The frame: it fills its parent, so give the parent a height. Holds a
 * `MessageScrollerViewport` and a `MessageScrollerButton`.
 */
function MessageScroller({ className, ref, ...props }: MessageScrollerProps) {
  const scroller = useScroller("MessageScroller");
  const setRoot = useCallback(
    (element: HTMLDivElement | null) => {
      scroller.setRoot(element);
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    },
    [ref, scroller]
  );
  return (
    <div
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      data-slot="message-scroller"
      ref={setRoot}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// MessageScrollerViewport
// ---------------------------------------------------------------------------

type MessageScrollerViewportProps = React.ComponentProps<"section">;

/**
 * The scrolling element: a focusable region named "Messages", so keyboard
 * users can scroll it. Hidden until the opening position is applied, so the
 * transcript doesn't jump.
 */
function MessageScrollerViewport({
  children,
  className,
  ref,
  ...props
}: MessageScrollerViewportProps) {
  const scroller = useScroller("MessageScrollerViewport");
  const viewport = useRef<HTMLElement | null>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(
    scroller.options.defaultScrollPosition !== "start"
  );

  const setViewport = useCallback(
    (element: HTMLElement | null) => {
      viewport.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    },
    [ref]
  );

  useLayoutEffect(() => {
    if (!(viewport.current && spacer.current)) {
      return;
    }
    return scroller.attach(viewport.current, spacer.current, () =>
      setPending(false)
    );
  }, [scroller]);

  return (
    <section
      aria-label="Messages"
      className={cn(
        "neu-scrollbar size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain outline-none [overflow-anchor:none] [scrollbar-gutter:stable] focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:-outline-offset-2 data-pending-scroll:invisible",
        className
      )}
      data-pending-scroll={pending ? "" : undefined}
      data-slot="message-scroller-viewport"
      ref={setViewport}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard
      tabIndex={0}
      {...props}
    >
      {children}
      <div
        aria-hidden="true"
        data-slot="message-scroller-spacer"
        ref={spacer}
      />
    </section>
  );
}

// ---------------------------------------------------------------------------
// MessageScrollerContent / MessageScrollerItem
// ---------------------------------------------------------------------------

type MessageScrollerContentProps = useRender.ComponentProps<"div">;

/**
 * The transcript: a `role="log"` live region announcing added rows (not
 * every streamed token). Name it with `aria-label`; set `aria-busy` while a
 * reply streams to announce it once complete. Render it as an `<ol>` with
 * `<li>` items for a list.
 */
function MessageScrollerContent({
  className,
  render,
  ...props
}: MessageScrollerContentProps) {
  const scroller = useScroller("MessageScrollerContent");
  const setContent = useCallback(
    (element: HTMLElement | null) => {
      scroller.content = element;
    },
    [scroller]
  );
  return useRender({
    defaultTagName: "div",
    ref: setContent,
    render,
    props: mergeProps<"div">(
      {
        "aria-relevant": "additions",
        className: cn("flex h-max min-h-full flex-col gap-6", className),
        role: "log",
      },
      props
    ),
    state: { slot: "message-scroller-content" },
  });
}

interface MessageScrollerItemProps extends useRender.ComponentProps<"div"> {
  /** A stable id, for `scrollToMessage` and keeping place on prepend. */
  messageId?: string;
  /**
   * This row starts a turn (usually the reader's own message, or a marker
   * such as "Marcus joined"): when appended, it settles near the top.
   * @default false
   */
  scrollAnchor?: boolean;
}

/** One row of the transcript: a message, marker or typing indicator. */
function MessageScrollerItem({
  className,
  messageId,
  render,
  scrollAnchor = false,
  ...props
}: MessageScrollerItemProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn("min-w-0 shrink-0", className),
        "data-message-id": messageId,
        "data-scroll-anchor": scrollAnchor ? "" : undefined,
      } as React.ComponentProps<"div">,
      props
    ),
    state: { slot: "message-scroller-item" },
  });
}

// ---------------------------------------------------------------------------
// MessageScrollerButton
// ---------------------------------------------------------------------------

interface MessageScrollerButtonProps extends ButtonProps {
  /**
   * `end` jumps to the latest message (and resumes following it); `start`
   * to the first.
   * @default "end"
   */
  direction?: "start" | "end";
}

/**
 * A raised round button over the transcript's edge. It is hidden and inert
 * until there is content in its direction. Children add a label beside the
 * arrow ("New messages").
 */
function MessageScrollerButton({
  children,
  className,
  direction = "end",
  onClick,
  ...props
}: MessageScrollerButtonProps) {
  const scroller = useScroller("MessageScrollerButton");
  const scrollable = useMessageScrollerScrollable();
  const active = scrollable[direction];
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      if (direction === "end") {
        scroller.scrollToEnd();
      } else {
        scroller.scrollToStart();
      }
    },
    [direction, onClick, scroller]
  );
  const label = direction === "end" ? "Scroll to latest" : "Scroll to start";
  return (
    <Button
      aria-label={children ? undefined : label}
      className={cn(
        "absolute start-1/2 z-10 -translate-x-1/2 transition-[translate,scale,opacity] duration-[var(--duration-base)] ease-[var(--ease-out)] data-[direction=end]:data-[active=false]:translate-y-2 data-[direction=start]:data-[active=false]:-translate-y-2 data-[active=false]:pointer-events-none data-[direction=start]:top-3 data-[direction=end]:bottom-3 data-[active=false]:scale-95 data-[active=false]:opacity-0 rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
        className
      )}
      data-active={active}
      data-direction={direction}
      data-slot="message-scroller-button"
      icon={<ArrowDownIcon />}
      inert={!active}
      onClick={handleClick}
      shape="pill"
      size="sm"
      tabIndex={active ? undefined : -1}
      {...props}
    >
      {children}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  MessageScrollerButtonProps,
  MessageScrollerContentProps,
  MessageScrollerItemProps,
  MessageScrollerProps,
  MessageScrollerProviderProps,
  MessageScrollerViewportProps,
  Scrollable,
  ScrollCommandOptions,
  ScrollPosition,
};
export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
};
