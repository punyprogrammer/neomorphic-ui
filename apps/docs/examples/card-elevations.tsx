"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";

const elevations = [
  { elevation: "raised", text: "Stands out of the page" },
  { elevation: "inset", text: "A well for secondary panels" },
  { elevation: "flat", text: "Level, for nesting" },
] as const;

export default function CardElevations() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-3">
      {elevations.map(({ elevation, text }) => (
        <Card elevation={elevation} key={elevation} size="sm">
          <CardHeader>
            <CardTitle className="capitalize">{elevation}</CardTitle>
            <CardDescription>{text}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
