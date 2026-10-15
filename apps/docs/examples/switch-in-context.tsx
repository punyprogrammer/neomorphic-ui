"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Label } from "@neomorphic-react/ui/label";
import { Switch } from "@neomorphic-react/ui/switch";
import { Bell, DoorClosed, Lightbulb, Sparkles } from "lucide-react";
import { useState } from "react";

const devices = [
  { id: "porch", label: "Porch light", icon: Lightbulb },
  { id: "doorbell", label: "Doorbell chime", icon: Bell },
  { id: "lock", label: "Auto-lock front door", icon: DoorClosed },
  { id: "adaptive", label: "Adaptive lighting", icon: Sparkles },
];

export default function SwitchInContext() {
  const [on, setOn] = useState(["porch", "lock", "adaptive"]);

  return (
    <Card className="w-full max-w-xs" size="sm">
      <CardHeader>
        <CardTitle>Away mode</CardTitle>
        <CardDescription>
          {on.length} of {devices.length} on while you're out
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {devices.map(({ id, label, icon: Icon }) => (
          <Label className="flex gap-3 font-normal" key={id}>
            <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
            <span className="flex-1">{label}</span>
            <Switch
              checked={on.includes(id)}
              onCheckedChange={(checked) =>
                setOn((current) =>
                  checked
                    ? [...current, id]
                    : current.filter((item) => item !== id)
                )
              }
            />
          </Label>
        ))}
      </CardContent>
    </Card>
  );
}
