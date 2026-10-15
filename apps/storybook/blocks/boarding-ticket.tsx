import { Badge } from "@neomorphic-react/ui/badge";
import { Button } from "@neomorphic-react/ui/button";
import { Card, CardContent } from "@neomorphic-react/ui/card";
import { Separator } from "@neomorphic-react/ui/separator";
import { Surface } from "@neomorphic-react/ui/surface";
import { cn } from "@neomorphic-react/ui/utils";
import { Check, Plane, Wallet } from "lucide-react";
import { useState } from "react";

interface Airport {
  city: string;
  code: string;
  time: string;
}

interface Flight {
  boarding: string;
  date: string;
  flight: string;
  from: Airport;
  gate: string;
  passenger: string;
  seat: string;
  to: Airport;
  travelClass: string;
}

const FLIGHT: Flight = {
  flight: "NU 214",
  passenger: "Ada Lovelace",
  date: "18 Oct",
  boarding: "06:05",
  gate: "B12",
  seat: "14A",
  travelClass: "Economy",
  from: { code: "CCU", city: "Kolkata", time: "06:40" },
  to: { code: "BLR", city: "Bengaluru", time: "09:15" },
};

/** Bar widths from the booking text, so each ticket's code differs. */
function bars(text: string) {
  const widths: number[] = [];
  for (const char of text.repeat(4)) {
    const code = char.charCodeAt(0);
    widths.push((code % 3) + 1, (code % 2) + 1);
  }
  return widths;
}

function Barcode({ value }: { value: string }) {
  let x = 0;
  const rects = bars(value).map((width, i) => {
    const rect =
      i % 2 === 0 ? (
        <rect fill="currentColor" height="48" key={x} width={width} x={x} />
      ) : null;
    x += width + 1;
    return rect;
  });
  return (
    <svg
      aria-hidden="true"
      className="h-12 w-full text-foreground"
      preserveAspectRatio="none"
      viewBox={`0 0 ${x} 48`}
    >
      {rects}
    </svg>
  );
}

function Stop({ airport, end }: { airport: Airport; end?: boolean }) {
  return (
    <div className={cn("grid gap-0.5", end && "text-end")}>
      <span className="font-semibold text-3xl text-foreground tracking-tight">
        {airport.code}
      </span>
      <span className="text-muted-foreground text-xs">{airport.city}</span>
      <span className="font-medium text-foreground text-sm tabular-nums">
        {airport.time}
      </span>
    </div>
  );
}

// A punched hole on the tear line: an inset well half off the card's edge.
function Notch({ side }: { side: "start" | "end" }) {
  return (
    <Surface
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 size-6 -translate-y-1/2",
        side === "start" ? "-start-3" : "-end-3"
      )}
      depth="sm"
      elevation="inset"
      shape="circle"
    />
  );
}

interface BoardingTicketProps {
  className?: string;
  flight?: Flight;
  onAddToWallet?: (flight: Flight) => void;
}

/**
 * The kit's boarding ticket (`3:731`): a raised `Card` with the route, the
 * flight details as a description list, a perforated tear line with punched
 * notches, and a barcode stub with an Add to wallet action.
 */
function BoardingTicket({
  className,
  flight = FLIGHT,
  onAddToWallet,
}: BoardingTicketProps) {
  const [added, setAdded] = useState(false);
  const details = [
    ["Passenger", flight.passenger],
    ["Seat", flight.seat],
    ["Date", flight.date],
    ["Boarding", flight.boarding],
    ["Gate", flight.gate],
  ];

  return (
    <Card
      aria-label={`Boarding pass, ${flight.from.code} to ${flight.to.code}`}
      className={cn("w-80 rounded-3xl", className)}
      render={<article />}
    >
      <CardContent className="flex items-center justify-between">
        <span className="font-medium text-foreground">
          Neu Air{" "}
          <span className="text-muted-foreground">· {flight.flight}</span>
        </span>
        <Badge variant="inset">{flight.travelClass}</Badge>
      </CardContent>

      <CardContent className="flex items-center justify-between gap-3">
        <Stop airport={flight.from} />
        <div
          aria-hidden="true"
          className="flex flex-1 items-center gap-2 text-muted-foreground"
        >
          <Separator className="flex-1" variant="perforated" />
          <Plane className="size-5 shrink-0 fill-current" />
          <Separator className="flex-1" variant="perforated" />
        </div>
        <Stop airport={flight.to} end />
      </CardContent>

      <CardContent>
        <dl className="grid grid-cols-3 gap-x-4 gap-y-3">
          {details.map(([term, value]) => (
            <div
              className={cn(
                "grid gap-0.5",
                term === "Passenger" && "col-span-2"
              )}
              key={term}
            >
              <dt className="text-muted-foreground text-xs">{term}</dt>
              <dd className="truncate font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>

      <div className="relative py-3">
        <Notch side="start" />
        <Separator
          className="mx-auto w-[calc(100%-3rem)]"
          variant="perforated"
        />
        <Notch side="end" />
      </div>

      <CardContent className="grid gap-4">
        <Barcode value={`${flight.flight}${flight.seat}${flight.passenger}`} />
        {added ? (
          <p
            className="flex h-10 items-center justify-center gap-2 font-medium text-foreground"
            role="status"
          >
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check aria-hidden="true" className="size-3.5" />
            </span>
            Added to wallet
          </p>
        ) : (
          <Button
            className="w-full"
            icon={<Wallet />}
            onClick={() => {
              setAdded(true);
              onAddToWallet?.(flight);
            }}
            variant="primary"
          >
            Add to wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export type { Airport, BoardingTicketProps, Flight };
export { BoardingTicket };
