"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";

export default function AccordionDisabled() {
  return (
    <Accordion className="max-w-lg">
      <AccordionItem value="upgrade">
        <AccordionTrigger>Upgrade to first class</AccordionTrigger>
        <AccordionContent>
          €40 per leg, with a wider seat and a meal served at your seat.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem disabled value="lounge">
        <AccordionTrigger>Lounge access (sold out)</AccordionTrigger>
        <AccordionContent>
          Lounge passes for this departure are sold out.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
