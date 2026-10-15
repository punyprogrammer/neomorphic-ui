"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@neomorphic-react/ui/drawer";

const stops = [
  { time: "09:00", station: "Edinburgh Waverley" },
  { time: "10:27", station: "Newcastle" },
  { time: "11:20", station: "York" },
  { time: "12:01", station: "Doncaster" },
  { time: "13:19", station: "London King's Cross" },
];

export default function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={["12rem", 1]}>
      <DrawerTrigger render={<Button />}>Journey details</DrawerTrigger>
      <DrawerContent className="h-[calc(100dvh-3rem)]">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Edinburgh to London</DrawerTitle>
            <DrawerDescription>Drag up to see every stop.</DrawerDescription>
          </DrawerHeader>
          <ol className="grid gap-3 px-5 pb-5">
            {stops.map((stop) => (
              <li
                className="inset-shadow-neu-sm flex justify-between rounded-lg px-4 py-3 shadow-neu-flat"
                key={stop.station}
              >
                <span>{stop.station}</span>
                <span className="text-muted-foreground tabular-nums">
                  {stop.time}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
