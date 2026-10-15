"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";
import { Button } from "@neomorphic-react/ui/button";
import { useState } from "react";

const sections = [
  {
    value: "overview",
    title: "Overview",
    body: "A 3-day walking tour of Porto's old town, wine cellars and riverside.",
  },
  {
    value: "included",
    title: "What's included",
    body: "2 nights in a central hotel, breakfast, a local guide and a cellar tasting.",
  },
  {
    value: "cancellation",
    title: "Cancellation",
    body: "Free cancellation up to 7 days before the tour starts.",
  },
];

export default function AccordionControlled() {
  const [open, setOpen] = useState<string[]>(["overview"]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => setOpen(sections.map((section) => section.value))}
          size="sm"
          variant="ghost"
        >
          Expand all
        </Button>
        <Button onClick={() => setOpen([])} size="sm" variant="ghost">
          Collapse all
        </Button>
      </div>
      <Accordion multiple onValueChange={setOpen} value={open}>
        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>{section.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
