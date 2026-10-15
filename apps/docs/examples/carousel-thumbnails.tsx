"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@neomorphic-react/ui/carousel";
import { landscape } from "@/components/blocks/images";

const photos = [
  { title: "Dunes at dawn", src: landscape("#f6d1b0", "#e7b98a", "#b97b4f") },
  { title: "Lagoon at noon", src: landscape("#9fd3ee", "#e9dcb8", "#5f9c8a") },
  { title: "Ridge at dusk", src: landscape("#c7b5e3", "#efc7a8", "#6c5a86") },
  {
    title: "Cliffs at sunset",
    src: landscape("#f4a990", "#f2d2a9", "#8a5a4a"),
  },
];

function Thumbnails() {
  const { scrollTo, selectedIndex } = useCarousel();
  return (
    <div className="mt-5 flex justify-center gap-3">
      {photos.map((photo, index) => (
        <button
          aria-current={index === selectedIndex || undefined}
          aria-label={`Show ${photo.title.toLowerCase()}`}
          className="size-12 cursor-pointer overflow-hidden rounded-lg opacity-60 shadow-neu-sm outline-none transition-opacity focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 aria-current:opacity-100 aria-current:ring-2 aria-current:ring-primary"
          key={photo.title}
          onClick={() => scrollTo(index)}
          type="button"
        >
          <img
            alt=""
            className="size-full object-cover"
            height={48}
            src={photo.src}
            width={48}
          />
        </button>
      ))}
    </div>
  );
}

export default function CarouselThumbnails() {
  return (
    <Carousel aria-label="Trip photos" className="mx-14 w-full max-w-sm">
      <CarouselContent>
        {photos.map((photo) => (
          <CarouselItem key={photo.title}>
            <img
              alt={photo.title}
              className="aspect-video w-full rounded-2xl object-cover shadow-neu"
              height={180}
              src={photo.src}
              width={320}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <Thumbnails />
    </Carousel>
  );
}
