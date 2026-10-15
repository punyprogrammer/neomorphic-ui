import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const SLIDES = ["Lisbon", "Porto", "Faro"];

function Trips({ setApi }: { setApi?: (api: CarouselApi) => void }) {
  return (
    <Carousel aria-label="Trips" setApi={setApi}>
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicator />
    </Carousel>
  );
}

describe("Carousel", () => {
  it("is a labelled region of slides", () => {
    render(<Trips />);
    const root = screen.getByRole("region", { name: "Trips" });
    expect(root).toHaveAttribute("aria-roledescription", "carousel");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute("aria-roledescription", "slide");
  });

  it("renders raised round previous/next buttons", () => {
    render(<Trips />);
    const next = screen.getByRole("button", { name: "Next slide" });
    expect(next).toHaveAttribute("data-slot", "carousel-next");
    expect(next).toHaveClass("rounded-full", "shadow-neu");
    expect(
      screen.getByRole("button", { name: "Previous slide" })
    ).toBeDisabled();
  });

  it("hands over the Embla API and moves with the buttons and arrow keys", async () => {
    let api: CarouselApi;
    const setApi = vi.fn((value: CarouselApi) => {
      api = value;
    });
    render(<Trips setApi={setApi} />);
    await waitFor(() => expect(setApi).toHaveBeenCalled());
    if (!api) {
      throw new Error("Embla API was not handed over");
    }
    const scrollNext = vi.spyOn(api, "scrollNext");
    const scrollPrev = vi.spyOn(api, "scrollPrev");
    const root = screen.getByRole("region", { name: "Trips" });
    fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(scrollNext).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(root, { key: "ArrowLeft" });
    expect(scrollPrev).toHaveBeenCalledTimes(1);
  });
});
