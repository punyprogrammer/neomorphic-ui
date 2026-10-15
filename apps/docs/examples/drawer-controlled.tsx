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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { useState } from "react";

const goals = ["6000", "8000", "10000", "12000"];
const steps = new Intl.NumberFormat("en-GB");

export default function DrawerControlled() {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState("8000");
  const [draft, setDraft] = useState(goal);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">
        Daily goal: {steps.format(Number(goal))} steps
      </p>
      <Drawer
        onOpenChange={(next) => {
          setOpen(next);
          setDraft(goal);
        }}
        open={open}
      >
        <DrawerTrigger render={<Button />}>Change goal</DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Daily step goal</DrawerTitle>
              <DrawerDescription>
                Pick a target you can reach on most days.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex justify-center px-5">
              <ToggleGroup
                aria-label="Steps a day"
                onValueChange={(value) => setDraft(value[0] ?? draft)}
                value={[draft]}
              >
                {goals.map((value) => (
                  <ToggleGroupItem key={value} value={value}>
                    {steps.format(Number(value))}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <DrawerFooter>
              <Button
                onClick={() => {
                  setGoal(draft);
                  setOpen(false);
                }}
                variant="primary"
              >
                Save goal
              </Button>
              <DrawerClose render={<Button variant="ghost" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
