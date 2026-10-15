"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button, type ButtonProps } from "./button";
import { PageIndicator, type PageIndicatorProps } from "./page-indicator";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselContextValue {
  api: CarouselApi;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: UseEmblaCarouselType[0];
  orientation: "horizontal" | "vertical";
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  slideCount: number;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

/** The carousel's state and Embla API, for custom controls. */
function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// ---------------------------------------------------------------------------
// Carousel (Root)
// ---------------------------------------------------------------------------

interface CarouselProps extends React.ComponentProps<"div"> {
  /**
   * Space between slides, any CSS length; sets `--carousel-gap`.
   * @default "1.5rem"
   */
  gap?: string;
  /** Called with the new slide's index when the selection changes. */
  onSlideChange?: (index: number) => void;
  /** Embla options, such as `loop`, `align` or `direction: "rtl"`. */
  opts?: CarouselOptions;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Embla plugins. Nothing moves on its own unless you add one (autoplay). */
  plugins?: CarouselPlugin;
  /** Receives the Embla API once it's ready. */
  setApi?: (api: CarouselApi) => void;
}

/**
 * Slides in a scrolling track, built on Embla. Give it an `aria-label`
 * ("Featured trips"); arrow keys move between slides while focus is inside.
 */
function Carousel({
  className,
  children,
  gap = "1.5rem",
  onKeyDownCapture,
  onSlideChange,
  opts,
  orientation = "horizontal",
  plugins,
  setApi,
  style,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const indexRef = useRef(0);

  const sync = useCallback(
    (emblaApi: CarouselApi) => {
      if (!emblaApi) {
        return;
      }
      const index = emblaApi.selectedScrollSnap();
      setSlideCount(emblaApi.scrollSnapList().length);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(index);
      if (indexRef.current !== index) {
        indexRef.current = index;
        onSlideChange?.(index);
      }
    },
    [onSlideChange]
  );

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  // Arrows follow the axis (and reading direction); the page indicator
  // handles its own keys.
  const handleKeyDownCapture = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownCapture?.(event);
      const target = event.target as HTMLElement;
      if (
        event.defaultPrevented ||
        target.closest("[data-slot=carousel-indicator], input, textarea")
      ) {
        return;
      }
      const rtl =
        orientation === "horizontal" &&
        getComputedStyle(event.currentTarget).direction === "rtl";
      const back = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      if (event.key !== back && event.key !== forward) {
        return;
      }
      event.preventDefault();
      if ((event.key === forward) === rtl) {
        scrollPrev();
      } else {
        scrollNext();
      }
    },
    [onKeyDownCapture, orientation, scrollNext, scrollPrev]
  );

  useEffect(() => {
    if (api && setApi) {
      setApi(api);
    }
  }, [api, setApi]);

  useEffect(() => {
    if (!api) {
      return;
    }
    sync(api);
    api.on("reInit", sync);
    api.on("select", sync);
    return () => {
      api.off("reInit", sync);
      api.off("select", sync);
    };
  }, [api, sync]);

  const context = useMemo(
    () => ({
      api,
      canScrollNext,
      canScrollPrev,
      carouselRef,
      orientation,
      scrollNext,
      scrollPrev,
      scrollTo,
      selectedIndex,
      slideCount,
    }),
    [
      api,
      canScrollNext,
      canScrollPrev,
      carouselRef,
      orientation,
      scrollNext,
      scrollPrev,
      scrollTo,
      selectedIndex,
      slideCount,
    ]
  );

  return (
    <CarouselContext.Provider value={context}>
      {/* biome-ignore lint/a11y/useSemanticElements: a carousel is a region with aria-roledescription, per the APG pattern */}
      <div
        aria-roledescription="carousel"
        className={cn("group/carousel relative grid grid-cols-1", className)}
        data-orientation={orientation}
        data-slot="carousel"
        onKeyDownCapture={handleKeyDownCapture}
        role="region"
        style={{ "--carousel-gap": gap, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// CarouselContent / CarouselItem
// ---------------------------------------------------------------------------

type CarouselContentProps = React.ComponentProps<"div">;

/**
 * The viewport and track. The viewport keeps a margin of room around the
 * slides so raised cards' shadows aren't clipped.
 */
function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div
      className="-m-4 overflow-hidden p-4 [grid-area:1/1/2/2]"
      data-slot="carousel-content"
      ref={carouselRef}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "-ms-(--carousel-gap)"
            : "-mt-(--carousel-gap) flex-col",
          className
        )}
        data-slot="carousel-track"
        {...props}
      />
    </div>
  );
}

type CarouselItemProps = React.ComponentProps<"div">;

/** One slide, a full-width basis by default (`basis-1/2` for two). */
function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();
  return (
    // biome-ignore lint/a11y/useSemanticElements: a slide is a group with aria-roledescription, per the APG pattern
    <div
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal"
          ? "ps-(--carousel-gap)"
          : "pt-(--carousel-gap)",
        className
      )}
      data-slot="carousel-item"
      role="group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// CarouselPrevious / CarouselNext
// ---------------------------------------------------------------------------

type CarouselButtonProps = Omit<ButtonProps, "icon" | "children">;

// Round raised buttons centred on the track, outside it. The grid area pins
// them to the track's row even with an indicator below.
const ARROW =
  "absolute z-10 [grid-area:1/1/2/2] group-data-[orientation=horizontal]/carousel:top-1/2 group-data-[orientation=horizontal]/carousel:-translate-y-1/2 group-data-[orientation=vertical]/carousel:start-1/2 group-data-[orientation=vertical]/carousel:-translate-x-1/2 group-data-[orientation=vertical]/carousel:rotate-90 rtl:group-data-[orientation=horizontal]/carousel:rotate-180";

function CarouselPrevious({
  className,
  size = "sm",
  ...props
}: CarouselButtonProps) {
  const { canScrollPrev, scrollPrev } = useCarousel();
  return (
    <Button
      aria-label="Previous slide"
      className={cn(
        ARROW,
        "group-data-[orientation=horizontal]/carousel:-start-14 group-data-[orientation=vertical]/carousel:-top-14",
        className
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      icon={<ChevronLeftIcon />}
      onClick={scrollPrev}
      shape="pill"
      size={size}
      {...props}
    />
  );
}

function CarouselNext({
  className,
  size = "sm",
  ...props
}: CarouselButtonProps) {
  const { canScrollNext, scrollNext } = useCarousel();
  return (
    <Button
      aria-label="Next slide"
      className={cn(
        ARROW,
        "group-data-[orientation=horizontal]/carousel:-end-14 group-data-[orientation=vertical]/carousel:-bottom-14",
        className
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      icon={<ChevronRightIcon />}
      onClick={scrollNext}
      shape="pill"
      size={size}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// CarouselIndicator
// ---------------------------------------------------------------------------

type CarouselIndicatorProps = Omit<
  PageIndicatorProps,
  "count" | "onValueChange" | "value"
>;

function slideLabel(index: number, count: number) {
  return `Slide ${index + 1} of ${count}`;
}

/** A `PageIndicator` under the track whose dots pick a slide. */
function CarouselIndicator({
  "aria-label": ariaLabel = "Choose slide",
  className,
  getAriaLabel = slideLabel,
  ...props
}: CarouselIndicatorProps) {
  const { scrollTo, selectedIndex, slideCount } = useCarousel();
  if (slideCount <= 1) {
    return null;
  }
  return (
    <PageIndicator
      aria-label={ariaLabel}
      className={cn("mt-6 justify-self-center", className)}
      count={slideCount}
      data-slot="carousel-indicator"
      getAriaLabel={getAriaLabel}
      onValueChange={scrollTo}
      value={selectedIndex}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  CarouselApi,
  CarouselButtonProps,
  CarouselContentProps,
  CarouselIndicatorProps,
  CarouselItemProps,
  CarouselOptions,
  CarouselPlugin,
  CarouselProps,
};
export {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
};
