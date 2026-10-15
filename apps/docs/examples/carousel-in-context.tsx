"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@neomorphic-react/ui/carousel";
import { landscape } from "@/components/blocks/images";

const stays = [
  {
    name: "Casa da Ria",
    place: "Tavira",
    price: 128,
    image: landscape("#9fd3ee", "#e9dcb8", "#5f9c8a"),
  },
  {
    name: "Quinta do Mar",
    place: "Lagos",
    price: 164,
    image: landscape("#f4a990", "#f2d2a9", "#8a5a4a"),
  },
  {
    name: "Monte Azul",
    place: "Monchique",
    price: 96,
    image: landscape("#c7b5e3", "#efc7a8", "#6c5a86"),
  },
  {
    name: "Vila Sol",
    place: "Sagres",
    price: 142,
    image: landscape("#f6d1b0", "#e7b98a", "#b97b4f"),
  },
];

export default function CarouselInContext() {
  return (
    <div className="mx-14 grid w-full max-w-xl gap-4">
      <p className="font-semibold text-foreground text-lg" id="algarve-stays">
        Stays in the Algarve
      </p>
      <Carousel
        aria-labelledby="algarve-stays"
        gap="1rem"
        opts={{ align: "start" }}
      >
        <CarouselContent>
          {stays.map((stay) => (
            <CarouselItem className="sm:basis-1/2" key={stay.name}>
              <Card className="h-full" size="sm">
                <img alt="" height={180} src={stay.image} width={320} />
                <CardHeader>
                  <CardTitle>{stay.name}</CardTitle>
                  <CardDescription>
                    {stay.place} · €{stay.price} a night
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button
                    aria-label={`Book ${stay.name}`}
                    fullWidth
                    size="sm"
                    variant="primary"
                  >
                    Book
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicator />
      </Carousel>
    </div>
  );
}
