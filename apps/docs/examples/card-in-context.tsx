"use client";

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
import { Chip } from "@neomorphic-react/ui/chip";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";

const usage = [
  { label: "Photos", used: 41 },
  { label: "Documents", used: 18 },
  { label: "Backups", used: 9 },
];

const total = usage.reduce((sum, { used }) => sum + used, 0);

export default function CardInContext() {
  return (
    <Card className="w-full max-w-sm" render={<section aria-label="Storage" />}>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>
          {total} GB of 100 GB used · renews 3 November
        </CardDescription>
        <CardAction>
          <Chip size="sm" variant="inset">
            Pro plan
          </Chip>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        {usage.map(({ label, used }) => (
          <Progress key={label} size="sm" value={used}>
            <div className="flex items-center justify-between">
              <ProgressLabel>{label}</ProgressLabel>
              <ProgressValue>{() => `${used} GB`}</ProgressValue>
            </div>
          </Progress>
        ))}
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" variant="ghost">
          Manage files
        </Button>
        <Button size="sm" variant="primary">
          Upgrade
        </Button>
      </CardFooter>
    </Card>
  );
}
