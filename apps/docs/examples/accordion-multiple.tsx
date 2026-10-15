"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";

export default function AccordionMultiple() {
  return (
    <Accordion
      className="max-w-lg"
      defaultValue={["materials", "care"]}
      multiple
    >
      <AccordionItem value="materials">
        <AccordionTrigger>Materials</AccordionTrigger>
        <AccordionContent>
          Shell: 100% recycled nylon. Lining: 80% organic cotton, 20% recycled
          polyester.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="care">
        <AccordionTrigger>Care</AccordionTrigger>
        <AccordionContent>
          Machine wash cold on a gentle cycle. Hang to dry and don't iron the
          shell.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="fit">
        <AccordionTrigger>Size and fit</AccordionTrigger>
        <AccordionContent>
          Relaxed fit. The model is 1.85 m tall and wears a size M.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
