"use client";

import { AspectRatio } from "@neomorphic-react/ui/aspect-ratio";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { landscape } from "@/components/blocks/images";

const stays = [
  {
    id: "sintra",
    name: "Quinta in Sintra",
    detail: "4 guests, from €180 a night",
    alt: "Wooded hills behind the quinta",
    image: landscape("#c3d3ea", "#dfd6c5", "#5e7a63"),
  },
  {
    id: "faro",
    name: "Beach house in Faro",
    detail: "6 guests, from €240 a night",
    alt: "The beach in front of the house",
    image: landscape("#9fd0e0", "#f5e4c6", "#6e8f9a"),
  },
];

export default function AspectRatioInContext() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      {stays.map((stay) => (
        <Card className="pt-0" key={stay.id} size="sm">
          <AspectRatio ratio={4 / 3}>
            <img alt={stay.alt} src={stay.image} />
          </AspectRatio>
          <CardHeader>
            <CardTitle>{stay.name}</CardTitle>
            <CardDescription>{stay.detail}</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Free cancellation until 7 days before arrival.
          </CardContent>
          <CardFooter>
            <Button fullWidth size="sm">
              View stay
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
