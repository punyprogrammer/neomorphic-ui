"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Weekly summary</CardTitle>
        <CardDescription>12 to 18 October</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        You logged 5 runs and 42 km, 8 km more than last week.
      </CardContent>
      <CardFooter>
        <Button size="sm">View details</Button>
      </CardFooter>
    </Card>
  );
}
