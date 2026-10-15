"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleAlert as CircleAlertIcon,
  CircleCheck as CircleCheckIcon,
  Info as InfoIcon,
  LoaderCircle as LoaderCircleIcon,
  TriangleAlert as TriangleAlertIcon,
  X as XIcon,
} from "lucide-react";
import { type CSSProperties, isValidElement, type ReactNode } from "react";

import { buttonVariants } from "./button";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastType =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading";

interface ToastAction {
  label: ReactNode;
  onClick: () => void;
}

interface ToastOptions {
  /** A button on the toast, e.g. Undo. */
  action?: ToastAction;
  /** Whether it can be swiped away or closed. @default true */
  dismissible?: boolean;
  /** Milliseconds before it closes; `Infinity` keeps it open. */
  duration?: number;
  /** An existing toast's id, to update it in place. */
  id?: string;
  /** Called once the toast closes, however it closed. */
  onClose?: () => void;
}

interface ToastInput extends ToastOptions {
  /** The message. A bare `toast("…")` fills this. */
  description?: ReactNode;
  /** A bold line above the message. */
  title?: ReactNode;
}

interface ToastData {
  dismissible: boolean;
}

interface ToastFn {
  (input: ToastInput): string;
  (message: ReactNode, options?: ToastOptions): string;
}

type ToastPromiseState<T> =
  | ReactNode
  | ToastInput
  | ((arg: T) => ReactNode | ToastInput);

interface ToastPromiseOptions<T> {
  error: ToastPromiseState<Error>;
  loading: ReactNode | ToastInput;
  success: ToastPromiseState<T>;
}

// ---------------------------------------------------------------------------
// toast()
// ---------------------------------------------------------------------------

const toastManager = ToastPrimitive.createToastManager();

/** Tells `toast({ … })` apart from `toast(<Message />)` or `toast("…")`. */
function isToastInput(value: unknown): value is ToastInput {
  return (
    typeof value === "object" &&
    value !== null &&
    !isValidElement(value) &&
    !("$$typeof" in value) &&
    !(Symbol.iterator in value) &&
    typeof (value as { then?: unknown }).then !== "function"
  );
}

function toPayload(input: ToastInput, type?: ToastType) {
  const {
    title,
    description,
    duration,
    action,
    dismissible = true,
    onClose,
  } = input;
  let timeout: number | undefined;
  if (
    duration === Number.POSITIVE_INFINITY ||
    (duration == null && type === "loading")
  ) {
    timeout = 0;
  } else {
    timeout = duration;
  }
  return {
    title,
    description,
    type: type ?? "default",
    timeout,
    onClose,
    actionProps: action
      ? { children: action.label, onClick: action.onClick }
      : undefined,
    data: { dismissible } satisfies ToastData,
  };
}

function show(input: ToastInput, type?: ToastType): string {
  const payload = toPayload(input, type);
  if (input.id) {
    toastManager.update(input.id, payload);
    return input.id;
  }
  return toastManager.add(payload);
}

function createToastFn(type?: ToastType): ToastFn {
  return ((messageOrInput: ReactNode | ToastInput, options?: ToastOptions) =>
    show(
      isToastInput(messageOrInput)
        ? messageOrInput
        : { ...options, description: messageOrInput },
      type
    )) as ToastFn;
}

function toPromiseState(state: ReactNode | ToastInput) {
  return toPayload(isToastInput(state) ? state : { description: state });
}

function mapPromiseState<A>(state: ToastPromiseState<A>) {
  if (typeof state === "function") {
    return (arg: A) =>
      toPromiseState((state as (a: A) => ReactNode | ToastInput)(arg));
  }
  return toPromiseState(state);
}

/** Shows a loading toast that turns into success or error with the promise. */
function promise<T>(value: Promise<T>, options: ToastPromiseOptions<T>) {
  return toastManager.promise(value, {
    loading: toPromiseState(options.loading),
    success: mapPromiseState(options.success),
    error: mapPromiseState(options.error),
  } as Parameters<typeof toastManager.promise>[1]);
}

/** Closes one toast by id, or all of them. */
function dismiss(id?: string) {
  toastManager.close(id);
}

/**
 * Shows a toast from anywhere, once a `Toaster` is mounted:
 * `toast("Saved")`, `toast.success({ title, description, action })`,
 * `toast.promise(save(), { loading, success, error })`.
 */
const toast = Object.assign(createToastFn(), {
  dismiss,
  error: createToastFn("error"),
  info: createToastFn("info"),
  loading: createToastFn("loading"),
  promise,
  success: createToastFn("success"),
  warning: createToastFn("warning"),
});

// ---------------------------------------------------------------------------
// Toast styles
// ---------------------------------------------------------------------------

const ICONS: Partial<Record<string, ReactNode>> = {
  success: <CircleCheckIcon />,
  info: <InfoIcon />,
  warning: <TriangleAlertIcon />,
  error: <CircleAlertIcon />,
  loading: <LoaderCircleIcon className="animate-spin" />,
};

// The icon's colour says what kind of toast it is, as in `Alert`.
const ACCENTS: Partial<Record<string, string>> = {
  success:
    "[--toast-accent:color-mix(in_oklab,var(--color-success)_75%,var(--color-success-foreground))]",
  info: "[--toast-accent:var(--color-chart-1,oklch(0.62_0.14_245))]",
  warning:
    "[--toast-accent:color-mix(in_oklab,var(--color-warning)_55%,var(--color-warning-foreground))]",
  error: "[--toast-accent:var(--color-destructive)]",
};

// Stacking from Base UI's toast demo: behind toasts peek and shrink; hovering
// the stack fans them out.
const STACK = [
  "[--gap:0.75rem] [--peek:0.75rem]",
  "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
  "[--height:var(--toast-frontmost-height,var(--toast-height))]",
  "absolute w-full z-[calc(1000-var(--toast-index))]",
  "h-(--height) data-expanded:h-(--toast-height)",
  "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] data-swiping:[transition:none]",
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  "data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
  "data-ending-style:opacity-0 data-limited:opacity-0",
  "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
  "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
  "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
];

const STACK_BOTTOM = [
  "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
  "bottom-0 origin-bottom",
  "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "data-starting-style:[transform:translateY(150%)]",
  "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
];

const STACK_TOP = [
  "[--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]",
  "top-0 origin-top",
  "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "data-starting-style:[transform:translateY(-150%)]",
  "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]",
];

const VIEWPORT_POSITION: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};

// ---------------------------------------------------------------------------
// ToastItem (internal)
// ---------------------------------------------------------------------------

type ManagedToast = ReturnType<
  typeof ToastPrimitive.useToastManager
>["toasts"][number];

function textOf(node: ReactNode) {
  return typeof node === "string" || typeof node === "number"
    ? String(node)
    : undefined;
}

function ToastItem({
  toast: t,
  isTop,
  closeButton,
}: {
  toast: ManagedToast;
  isTop: boolean;
  closeButton: boolean;
}) {
  const data = (t.data ?? { dismissible: true }) as ToastData;
  const type = t.type ?? "default";
  const icon = ICONS[type];
  return (
    <ToastPrimitive.Root
      // A toast with no title is named by its message.
      aria-label={t.title == null ? textOf(t.description) : undefined}
      className={cn(
        STACK,
        isTop ? STACK_TOP : STACK_BOTTOM,
        "pointer-events-auto inset-shadow-neu-flat select-none rounded-xl bg-neu-convex text-foreground shadow-neu-lg",
        ACCENTS[type]
      )}
      data-slot="toast"
      data-type={type}
      swipeDirection={data.dismissible ? ["down", "right"] : []}
      toast={t}
    >
      <ToastPrimitive.Content
        className="flex h-full w-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-[250ms] data-behind:pointer-events-none data-expanded:pointer-events-auto data-behind:opacity-0 data-expanded:opacity-100"
        data-slot="toast-content"
      >
        {icon ? (
          <span
            aria-hidden="true"
            className="shrink-0 text-[var(--toast-accent,currentColor)] [&_svg]:size-5"
            data-slot="toast-icon"
          >
            {icon}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {t.title == null ? null : (
            <ToastPrimitive.Title
              className="font-semibold text-sm leading-snug"
              data-slot="toast-title"
            />
          )}
          {t.description == null ? null : (
            <ToastPrimitive.Description
              className="text-muted-foreground text-sm leading-snug"
              data-slot="toast-description"
            />
          )}
        </div>
        {t.actionProps ? (
          <ToastPrimitive.Action
            className={buttonVariants({ size: "sm" })}
            data-slot="toast-action"
          />
        ) : null}
        {closeButton && data.dismissible ? (
          <ToastPrimitive.Close
            aria-label="Close"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                shape: "rounded",
                iconOnly: true,
              }),
              "text-muted-foreground hover:text-foreground"
            )}
            data-slot="toast-close"
          >
            <XIcon aria-hidden="true" />
          </ToastPrimitive.Close>
        ) : null}
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  );
}

function ToastList({
  isTop,
  closeButton,
}: {
  isTop: boolean;
  closeButton: boolean;
}) {
  const { toasts } = ToastPrimitive.useToastManager();
  return toasts.map((t) => (
    <ToastItem closeButton={closeButton} isTop={isTop} key={t.id} toast={t} />
  ));
}

// ---------------------------------------------------------------------------
// Toaster
// ---------------------------------------------------------------------------

interface ToasterProps {
  className?: string;
  /** Shows a close button on every dismissible toast. @default true */
  closeButton?: boolean;
  /** Default milliseconds before a toast closes. @default 5000 */
  duration?: number;
  /** How many toasts show at once; older ones step back. @default 3 */
  limit?: number;
  /** @default "bottom-right" */
  position?: ToastPosition;
}

/**
 * Where `toast()` renders. Mount one near the root of the app. Toasts are
 * announced politely by screen readers and pause while hovered or focused;
 * F6 moves focus into the stack.
 */
function Toaster({
  className,
  closeButton = true,
  duration = 5000,
  limit = 3,
  position = "bottom-right",
}: ToasterProps) {
  const isTop = position.startsWith("top");
  return (
    <ToastPrimitive.Provider
      limit={limit}
      timeout={duration}
      toastManager={toastManager}
    >
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          className={cn(
            "fixed z-[var(--z-toast)] m-4 w-(--toaster-width) outline-none max-sm:right-0 max-sm:left-0 max-sm:mx-2 max-sm:w-auto max-sm:translate-x-0",
            VIEWPORT_POSITION[position],
            className
          )}
          data-position={isTop ? "top" : "bottom"}
          data-slot="toaster"
          style={{ "--toaster-width": "22rem" } as CSSProperties}
        >
          <ToastList closeButton={closeButton} isTop={isTop} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  ToastAction,
  ToasterProps,
  ToastInput,
  ToastOptions,
  ToastPosition,
  ToastPromiseOptions,
  ToastType,
};
export { Toaster, toast };
