"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";

const steps = [
  {
    value: "connect",
    title: "Connect your bank",
    body: "Link the account your customers pay into. We only read incoming payments.",
  },
  {
    value: "invoice",
    title: "Send your first invoice",
    body: "Pick a customer, add line items and choose when payment is due.",
  },
  {
    value: "remind",
    title: "Turn on reminders",
    body: "We email customers 3 days before and 1 day after an invoice is due.",
  },
];

export default function AccordionFlat() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Getting started</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["connect"]} variant="flat">
          {steps.map((step) => (
            <AccordionItem key={step.value} value={step.value}>
              <AccordionTrigger>{step.title}</AccordionTrigger>
              <AccordionContent>{step.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
