"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";

const faqs = [
  {
    value: "bags",
    question: "What can I bring on board?",
    answer:
      "One cabin bag up to 10 kg and one personal item that fits under the seat.",
  },
  {
    value: "change",
    question: "Can I change my booking?",
    answer:
      "Yes, up to 24 hours before departure. Changes cost €5 plus any fare difference.",
  },
  {
    value: "pets",
    question: "Can I travel with a pet?",
    answer: "Small pets in a carrier travel free on all routes.",
  },
];

export default function AccordionDemo() {
  return (
    <Accordion className="max-w-lg" defaultValue={["bags"]}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
