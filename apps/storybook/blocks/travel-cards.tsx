import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@neomorphic-react/ui/avatar";
import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import { Bookmark, CalendarDays, MapPin, Star } from "lucide-react";
import { useId, useState } from "react";

import { landscape, portrait } from "./images";

const BEACH = landscape("#9cc9e8", "#f2dcb3", "#5f8f6e");
const ISLAND = landscape("#7fb4e6", "#e9d3ad", "#46705c");
const DUNES = landscape("#f0c49a", "#e6b98a", "#b9794c");
const PEAKS = landscape("#a9c4e4", "#dfe6ee", "#6b7c93");

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// ---------------------------------------------------------------------------
// Info card
// ---------------------------------------------------------------------------

interface TravelInfoCardProps {
  className?: string;
  defaultSaved?: boolean;
  location: string;
  onSavedChange?: (saved: boolean) => void;
  photo: string;
  /** Per night, in US dollars. */
  price: number;
  rating: number;
  title: string;
}

/** The kit's info card: photo, place, rating, price and a Save toggle. */
function TravelInfoCard({
  className,
  defaultSaved = false,
  location,
  onSavedChange,
  photo,
  price,
  rating,
  title,
}: TravelInfoCardProps) {
  const id = useId();
  return (
    <Card
      aria-labelledby={id}
      className={cn("w-72", className)}
      render={<article />}
    >
      <img alt="" className="h-40" height={160} src={photo} width={288} />
      <CardHeader>
        <CardTitle id={id}>{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin aria-hidden="true" className="size-3.5" />
          {location}
        </CardDescription>
        <CardAction>
          <Toggle
            aria-label={`Save ${title}`}
            defaultPressed={defaultSaved}
            iconFill
            onPressedChange={onSavedChange}
            size="sm"
          >
            <Bookmark />
          </Toggle>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-between">
        <span className="flex items-center gap-1 text-foreground">
          <Star
            aria-hidden="true"
            className="size-4 fill-warning text-warning"
          />
          {rating.toFixed(1)}
          <span className="sr-only"> out of 5</span>
        </span>
        <span className="text-muted-foreground">
          <span className="font-medium text-base text-foreground">
            {usd.format(price)}
          </span>{" "}
          / night
        </span>
      </CardFooter>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Big info card
// ---------------------------------------------------------------------------

const TRAVELLERS = [
  { name: "Ada", hue: 20 },
  { name: "Grace", hue: 200 },
  { name: "Linus", hue: 120 },
];

interface TravelFeatureCardProps {
  className?: string;
  onBook?: (title: string) => void;
}

/**
 * The kit's big info card: a tall photo, a trip summary, who is going and a
 * primary action. Booking swaps the button for a confirmation.
 */
function TravelFeatureCard({ className, onBook }: TravelFeatureCardProps) {
  const id = useId();
  const title = "Santorini getaway";
  const [booked, setBooked] = useState(false);
  return (
    <Card
      aria-labelledby={id}
      className={cn("w-80", className)}
      render={<article />}
      size="lg"
    >
      <img alt="" className="h-52" height={208} src={ISLAND} width={320} />
      <CardHeader>
        <CardTitle id={id}>{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <CalendarDays aria-hidden="true" className="size-3.5" />
          12 – 18 June · 6 nights
        </CardDescription>
        <CardAction>
          <Badge variant="inset">Greece</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground leading-relaxed">
        Whitewashed cliffs over the caldera, a sunset catamaran and two nights
        in Oia. Flights and transfers included.
      </CardContent>
      <CardFooter className="justify-between">
        <AvatarGroup aria-label="Travellers: Ada, Grace, Linus and 2 more">
          {TRAVELLERS.map((t) => (
            <Avatar key={t.name} size="sm">
              <AvatarImage alt="" src={portrait(t.hue)} />
            </Avatar>
          ))}
          <AvatarGroupCount className="size-8">+2</AvatarGroupCount>
        </AvatarGroup>
        {booked ? (
          <Badge role="status" variant="success">
            Booked
          </Badge>
        ) : (
          <Button
            onClick={() => {
              setBooked(true);
              onBook?.(title);
            }}
            variant="primary"
          >
            Book now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Info boxes
// ---------------------------------------------------------------------------

interface InfoBox {
  detail: string;
  photo: string;
  title: string;
}

const BOXES: InfoBox[] = [
  { title: "Sahara dunes", detail: "Morocco · 4 days", photo: DUNES },
  { title: "Alpine pass", detail: "Switzerland · 6 days", photo: PEAKS },
];

/** The kit's info boxes: compact raised rows with a framed thumbnail. */
function TravelInfoBoxes({
  boxes = BOXES,
  className,
}: {
  boxes?: InfoBox[];
  className?: string;
}) {
  return (
    <ItemGroup aria-label="More trips" className={cn("w-72", className)}>
      {boxes.map((box) => (
        <Item key={box.title} variant="raised">
          <ItemMedia>
            <Avatar shape="rounded" size="lg">
              <AvatarImage alt="" src={box.photo} />
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{box.title}</ItemTitle>
            <ItemDescription>{box.detail}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );
}

// ---------------------------------------------------------------------------
// Composition
// ---------------------------------------------------------------------------

interface TravelCardsProps {
  className?: string;
  onBook?: (title: string) => void;
  onSavedChange?: (saved: boolean) => void;
}

/** The kit's travel screen (`3:731`): all three card types together. */
function TravelCards({ className, onBook, onSavedChange }: TravelCardsProps) {
  const id = useId();
  return (
    <section
      aria-labelledby={id}
      className={cn("flex flex-wrap items-start gap-10", className)}
    >
      <h2 className="sr-only" id={id}>
        Trips
      </h2>
      <div className="grid gap-8">
        <TravelInfoCard
          location="Bali, Indonesia"
          onSavedChange={onSavedChange}
          photo={BEACH}
          price={124}
          rating={4.8}
          title="Uluwatu Beach"
        />
        <TravelInfoBoxes />
      </div>
      <TravelFeatureCard onBook={onBook} />
    </section>
  );
}

export type {
  InfoBox,
  TravelCardsProps,
  TravelFeatureCardProps,
  TravelInfoCardProps,
};
export { TravelCards, TravelFeatureCard, TravelInfoBoxes, TravelInfoCard };
