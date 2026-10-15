"use client";

import { Card, CardContent } from "@neomorphic-react/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@neomorphic-react/ui/carousel";

const days = ["Lisbon", "Sintra", "Évora", "Porto", "Faro"];

export default function CarouselDemo() {
  return (
    <Carousel aria-label="Itinerary" className="mx-14 w-full max-w-xs">
      <CarouselContent>
        {days.map((city, index) => (
          <CarouselItem
            aria-label={`Day ${index + 1} of ${days.length}`}
            key={city}
          >
            <Card>
              <CardContent className="flex aspect-[4/3] flex-col items-center justify-center gap-1">
                <span className="font-semibold text-3xl">{city}</span>
                <span className="text-muted-foreground text-xs">
                  Day {index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicator />
    </Carousel>
  );
}
