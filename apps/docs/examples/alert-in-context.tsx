"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { TriangleAlert } from "lucide-react";

const legs = [
  { route: "Porto Campanhã to Coimbra-B", time: "08:12 – 09:05" },
  { route: "Coimbra-B to Lisboa Oriente", time: "09:45 – 11:20" },
];

export default function AlertInContext() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Porto to Lisbon</CardTitle>
        <CardDescription>Friday 16 October, 2 passengers</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Alert variant="warning">
          <TriangleAlert />
          <AlertTitle>Tight connection</AlertTitle>
          <AlertDescription>40 minutes to change in Coimbra.</AlertDescription>
          <AlertAction>
            <Button size="sm">Rebook</Button>
          </AlertAction>
        </Alert>
        <ul className="grid gap-3">
          {legs.map((leg) => (
            <li className="flex justify-between gap-4" key={leg.route}>
              <span>{leg.route}</span>
              <span className="text-muted-foreground tabular-nums">
                {leg.time}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button fullWidth variant="primary">
          View tickets
        </Button>
      </CardFooter>
    </Card>
  );
}
