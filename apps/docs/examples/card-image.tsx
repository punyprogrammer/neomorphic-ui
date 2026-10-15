"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { Heart, MapPin, Star } from "lucide-react";
import { landscape } from "@/components/blocks/images";

export default function CardImage() {
  return (
    <Card className="w-full max-w-xs" render={<article />}>
      <img
        alt="Uluwatu cliffs above the sea at sunset"
        className="h-44"
        height={176}
        src={landscape("#7cc4e8", "#f6d58e", "#4f7a6a")}
        width={320}
      />
      <CardHeader>
        <CardTitle>Uluwatu Beach</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin aria-hidden="true" className="size-3.5" />
          Bali, Indonesia
        </CardDescription>
        <CardAction>
          <Toggle aria-label="Save Uluwatu Beach" iconFill size="sm">
            <Heart />
          </Toggle>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-between">
        <span className="flex items-center gap-1 text-foreground">
          <Star aria-hidden="true" className="size-4 fill-current" />
          4.8
        </span>
        <span className="font-medium text-base text-foreground">
          $1,240 for 7 nights
        </span>
      </CardFooter>
    </Card>
  );
}
