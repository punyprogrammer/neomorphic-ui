"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Kbd } from "@neomorphic-react/ui/kbd";
import { cn } from "@neomorphic-react/ui/utils";
import {
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
} from "react";

import { isSharp, noteName } from "@/lib/piano";

interface KeyboardProps {
  active: ReadonlySet<number>;
  /** Lowest key; a C. */
  from: number;
  /** Typing key for each MIDI note in reach of the keyboard. */
  labels: ReadonlyMap<number, string>;
  onPress: (midi: number, velocity: number) => void;
  onRelease: (midi: number) => void;
  showLabels: boolean;
  /** Highest key; a C. */
  to: number;
}

// A key sounds louder the nearer its front edge it's struck.
function velocityAt(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const depth = (event.clientY - rect.top) / rect.height;
  return Math.min(Math.max(0.35 + 0.65 * depth, 0.3), 1);
}

export function Keyboard({
  active,
  from,
  labels,
  onPress,
  onRelease,
  showLabels,
  to,
}: KeyboardProps) {
  const notes = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const whites = notes.filter((midi) => !isSharp(midi));
  const pointers = useRef(new Map<number, number>());

  // A pointer let go outside the keys still lifts its note.
  useEffect(() => {
    const lift = (event: globalThis.PointerEvent) => {
      const midi = pointers.current.get(event.pointerId);
      if (midi !== undefined) {
        pointers.current.delete(event.pointerId);
        onRelease(midi);
      }
    };
    window.addEventListener("pointerup", lift);
    window.addEventListener("pointercancel", lift);
    return () => {
      window.removeEventListener("pointerup", lift);
      window.removeEventListener("pointercancel", lift);
    };
  }, [onRelease]);

  function handlers(midi: number) {
    return {
      onMouseDown: (event: MouseEvent) => event.preventDefault(),
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        if (event.button !== 0) {
          return;
        }
        // Let the pointer slide on to the neighbouring keys (a glissando).
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        pointers.current.set(event.pointerId, midi);
        onPress(midi, velocityAt(event));
      },
      onPointerEnter: (event: PointerEvent<HTMLElement>) => {
        const held = pointers.current.get(event.pointerId);
        if (held === undefined || held === midi) {
          return;
        }
        onRelease(held);
        pointers.current.set(event.pointerId, midi);
        onPress(midi, velocityAt(event));
      },
    };
  }

  return (
    <div
      aria-label="Piano keys"
      className="relative flex h-48 gap-(--gap) sm:h-56"
      role="group"
      style={
        {
          "--gap": "0.375rem",
          "--keys": whites.length,
          // One white key's width; percentages resolve against the keyboard.
          "--white":
            "calc((100% - (var(--keys) - 1) * var(--gap)) / var(--keys))",
        } as CSSProperties
      }
    >
      {whites.map((midi) => {
        const label = labels.get(midi);
        return (
          <Button
            aria-label={noteName(midi)}
            aria-pressed={active.has(midi)}
            className="h-full min-w-0 flex-1 flex-col justify-end gap-2 rounded-t-md rounded-b-xl px-0 pb-3 normal-case tracking-normal aria-pressed:bg-[color-mix(in_oklab,var(--brass)_16%,var(--color-background))]"
            key={midi}
            nativeButton
            shape="rounded"
            tabIndex={-1}
            {...handlers(midi)}
          >
            {showLabels && label ? (
              <Kbd aria-hidden="true" size="sm">
                {label.toUpperCase()}
              </Kbd>
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                "font-normal text-[0.625rem] text-muted-foreground",
                midi % 12 !== 0 && "invisible"
              )}
            >
              {noteName(midi)}
            </span>
          </Button>
        );
      })}

      {notes.filter(isSharp).map((midi) => {
        const below = whites.indexOf(midi - 1);
        const label = labels.get(midi);
        return (
          <Button
            aria-label={noteName(midi)}
            aria-pressed={active.has(midi)}
            className="absolute top-0 z-10 h-[60%] w-[calc(var(--white)*0.62)] min-w-0 -translate-x-1/2 flex-col justify-end rounded-t-sm rounded-b-lg bg-linear-to-b from-primary to-[color-mix(in_oklab,var(--color-primary)_82%,white)] px-0 pb-2.5 normal-case tracking-normal aria-pressed:bg-[color-mix(in_oklab,var(--brass)_22%,var(--color-primary))]"
            key={midi}
            nativeButton
            shape="rounded"
            style={{
              left: `calc(var(--white) * ${below + 1} + var(--gap) * ${below} + var(--gap) / 2)`,
            }}
            tabIndex={-1}
            variant="primary"
            {...handlers(midi)}
          >
            {showLabels && label ? (
              <span
                aria-hidden="true"
                className="font-medium text-[0.625rem] text-primary-foreground/70"
              >
                {label.toUpperCase()}
              </span>
            ) : null}
          </Button>
        );
      })}
    </div>
  );
}
