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
import { Label } from "@neomorphic-react/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";
import { useState } from "react";

const settings = [
  {
    id: "language",
    label: "Language",
    defaultValue: "en-GB",
    options: [
      ["en-GB", "English (UK)"],
      ["fr-FR", "Français"],
      ["de-DE", "Deutsch"],
    ],
  },
  {
    id: "timezone",
    label: "Time zone",
    defaultValue: "Europe/London",
    options: [
      ["Europe/London", "London"],
      ["Europe/Paris", "Paris"],
      ["America/New_York", "New York"],
    ],
  },
  {
    id: "week-start",
    label: "Week starts on",
    defaultValue: "monday",
    options: [
      ["monday", "Monday"],
      ["sunday", "Sunday"],
    ],
  },
];

export default function NativeSelectInContext() {
  const [saved, setSaved] = useState(true);

  return (
    <Card
      className="w-full max-w-sm"
      render={
        <form
          onChange={() => setSaved(false)}
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
        />
      }
    >
      <CardHeader>
        <CardTitle>Region</CardTitle>
        <CardDescription>How dates and times appear to you.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {settings.map((setting) => (
          <div
            className="flex items-center justify-between gap-4"
            key={setting.id}
          >
            <Label htmlFor={`region-${setting.id}`}>{setting.label}</Label>
            <NativeSelect
              className="w-40"
              defaultValue={setting.defaultValue}
              id={`region-${setting.id}`}
              name={setting.id}
              size="sm"
            >
              {setting.options.map(([value, label]) => (
                <NativeSelectOption key={value} value={value}>
                  {label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={saved} type="submit" variant="primary">
          {saved ? "Saved" : "Save changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
