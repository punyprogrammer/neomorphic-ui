"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Dial } from "@neomorphic-react/ui/dial";
import { Volume1, Volume2 } from "lucide-react";
import { useState } from "react";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export default function DialInContext() {
  const [volume, setVolume] = useState(64);

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="text-center">
        <CardTitle>Living room</CardTitle>
        <CardDescription>Playing on 2 speakers</CardDescription>
      </CardHeader>
      <CardContent className="grid justify-items-center gap-6">
        <Dial
          aria-label="Volume"
          getAriaValueText={(value) => `${value} percent`}
          onValueChange={setVolume}
          size="lg"
          value={volume}
        >
          {volume}
        </Dial>
        <div className="flex w-full justify-between">
          <Button
            aria-label="Turn down"
            icon={<Volume1 />}
            onClick={() => setVolume((current) => clamp(current - 5))}
            variant="ghost"
          />
          <Button
            aria-label="Turn up"
            icon={<Volume2 />}
            onClick={() => setVolume((current) => clamp(current + 5))}
            variant="ghost"
          />
        </div>
      </CardContent>
    </Card>
  );
}
