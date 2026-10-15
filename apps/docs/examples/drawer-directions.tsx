"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@neomorphic-react/ui/drawer";

const edges = [
  { direction: "top", label: "Top", hint: "Swipe up to close." },
  { direction: "right", label: "Right", hint: "Swipe right to close." },
  { direction: "bottom", label: "Bottom", hint: "Swipe down to close." },
  { direction: "left", label: "Left", hint: "Swipe left to close." },
] as const;

export default function DrawerDirections() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {edges.map(({ direction, label, hint }) => (
        <Drawer direction={direction} key={direction}>
          <DrawerTrigger render={<Button />}>{label}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerDescription>{hint}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button />}>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
