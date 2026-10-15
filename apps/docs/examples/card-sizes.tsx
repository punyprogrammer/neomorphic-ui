"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";

const sizes = [
  { size: "sm", spacing: "16px" },
  { size: "md", spacing: "24px" },
  { size: "lg", spacing: "32px" },
] as const;

export default function CardSizes() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      {sizes.map(({ size, spacing }) => (
        <Card className="w-52" key={size} size={size}>
          <CardHeader>
            <CardTitle>Size {size}</CardTitle>
            <CardDescription>{spacing} padding and gaps</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
