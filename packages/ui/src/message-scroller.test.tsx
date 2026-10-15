import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "./message-scroller";

const PROVIDER_ERROR = /within a MessageScrollerProvider/;

// jsdom has no layout: give the viewport a 1000px transcript in a 200px
// window, with a working scrollTop.
const scrollTops = new WeakMap<Element, number>();
function isViewport(element: Element) {
  return element.getAttribute("data-slot") === "message-scroller-viewport";
}

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockImplementation(
    function (this: HTMLElement) {
      return isViewport(this) ? 1000 : 0;
    }
  );
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(
    function (this: HTMLElement) {
      return isViewport(this) ? 200 : 0;
    }
  );
  vi.spyOn(Element.prototype, "scrollTop", "get").mockImplementation(function (
    this: Element
  ) {
    return scrollTops.get(this) ?? 0;
  });
  vi.spyOn(Element.prototype, "scrollTop", "set").mockImplementation(function (
    this: Element,
    value: number
  ) {
    scrollTops.set(this, value);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

let commands: ReturnType<typeof useMessageScroller> | undefined;
function Commands() {
  commands = useMessageScroller();
  return null;
}

function Transcript({ autoScroll = false }: { autoScroll?: boolean }) {
  return (
    <MessageScrollerProvider
      autoScroll={autoScroll}
      defaultScrollPosition="end"
    >
      <Commands />
      <MessageScroller data-testid="root">
        <MessageScrollerViewport>
          <MessageScrollerContent aria-label="Conversation">
            <MessageScrollerItem messageId="m1" scrollAnchor>
              Hello
            </MessageScrollerItem>
            <MessageScrollerItem messageId="m2">Hi there</MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

describe("MessageScroller", () => {
  it("is a focusable region holding a log of rows", () => {
    render(<Transcript />);
    const region = screen.getByRole("region", { name: "Messages" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).not.toHaveAttribute("data-pending-scroll");
    const log = screen.getByRole("log", { name: "Conversation" });
    expect(log).toHaveAttribute("aria-relevant", "additions");
    const first = screen.getByText("Hello");
    expect(first).toHaveAttribute("data-message-id", "m1");
    expect(first).toHaveAttribute("data-scroll-anchor");
    expect(screen.getByText("Hi there")).not.toHaveAttribute(
      "data-scroll-anchor"
    );
  });

  it("opens at the latest turn, with the jump button inert", () => {
    render(<Transcript />);
    const region = screen.getByRole("region", { name: "Messages" });
    expect(region.scrollTop).toBe(800);
    expect(screen.getByTestId("root")).toHaveAttribute("data-at-end");
    const button = screen.getByRole("button", {
      hidden: true,
      name: "Scroll to latest",
    });
    expect(button).toHaveAttribute("data-active", "false");
    expect(button).toHaveAttribute("inert");
  });

  it("stops following when the reader scrolls up, and jumps back", async () => {
    const user = userEvent.setup();
    render(<Transcript autoScroll />);
    const region = screen.getByRole("region", { name: "Messages" });
    const root = screen.getByTestId("root");
    expect(root).toHaveAttribute("data-following");

    act(() => {
      region.scrollTop = 300;
      fireEvent.scroll(region);
    });
    expect(root).not.toHaveAttribute("data-following");
    expect(root).not.toHaveAttribute("data-at-end");
    const button = screen.getByRole("button", { name: "Scroll to latest" });
    expect(button).toHaveAttribute("data-active", "true");
    expect(button).not.toHaveAttribute("inert");

    await user.click(button);
    expect(region.scrollTop).toBe(800);
    expect(root).toHaveAttribute("data-following");
  });

  it("jumps to a message by id, releasing the live edge", () => {
    render(<Transcript autoScroll />);
    const root = screen.getByTestId("root");
    let found: boolean | undefined;
    act(() => {
      found = commands?.scrollToMessage("m1", { behavior: "instant" });
    });
    expect(found).toBe(true);
    expect(root).not.toHaveAttribute("data-following");
    expect(commands?.scrollToMessage("missing")).toBe(false);
  });

  it("throws outside a provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<MessageScroller />)).toThrow(PROVIDER_ERROR);
  });
});
