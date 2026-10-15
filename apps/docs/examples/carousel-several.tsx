"use client";

import { Card, CardContent } from "@neomorphic-react/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@neomorphic-react/ui/carousel";

const ideas = [
  { title: "Tile museum", detail: "2 hours" },
  { title: "Tram 28", detail: "45 minutes" },
  { title: "Belém pastries", detail: "30 minutes" },
  { title: "Castle walls", detail: "1 hour" },
  { title: "River cruise", detail: "90 minutes" },
  { title: "Fado night", detail: "Evening" },
];

export default function CarouselSeveral() {
  return (
    <Carousel
      aria-label="Things to do"
      className="mx-14 w-full max-w-xl"
      gap="1rem"
      opts={{ align: "start", loop: true }}
    >
      <CarouselContent>
        {ideas.map((idea) => (
          <CarouselItem className="basis-1/2 sm:basis-1/3" key={idea.title}>
            <Card className="h-full" size="sm">
              <CardContent className="grid aspect-square content-center gap-1 text-center">
                <span className="font-medium">{idea.title}</span>
                <span className="text-muted-foreground text-xs">
                  {idea.detail}
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
