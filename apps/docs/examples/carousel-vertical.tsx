"use client";

import { Card, CardContent } from "@neomorphic-react/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@neomorphic-react/ui/carousel";

const departures = [
  { time: "08:15", to: "Porto", platform: "4" },
  { time: "09:40", to: "Faro", platform: "2" },
  { time: "11:05", to: "Coimbra", platform: "6" },
  { time: "12:30", to: "Braga", platform: "1" },
  { time: "14:10", to: "Évora", platform: "3" },
];

export default function CarouselVertical() {
  return (
    <Carousel
      aria-label="Departures"
      className="my-14 w-full max-w-xs"
      gap="1rem"
      opts={{ align: "start" }}
      orientation="vertical"
    >
      <CarouselContent className="h-64">
        {departures.map((departure) => (
          <CarouselItem className="basis-1/2" key={departure.time}>
            <Card className="h-full" size="sm">
              <CardContent className="flex h-full items-center justify-between">
                <span className="grid">
                  <span className="font-medium">{departure.to}</span>
                  <span className="text-muted-foreground text-xs">
                    Platform {departure.platform}
                  </span>
                </span>
                <span className="font-medium tabular-nums">
                  {departure.time}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
