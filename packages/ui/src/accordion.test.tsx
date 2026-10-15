import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

function Faq(props: Partial<React.ComponentProps<typeof Accordion>>) {
  return (
    <Accordion {...props}>
      <AccordionItem value="bags">
        <AccordionTrigger>Bags</AccordionTrigger>
        <AccordionContent>One cabin bag.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="seats">
        <AccordionTrigger>Seats</AccordionTrigger>
        <AccordionContent>Pick at check-in.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const expanded = () =>
  screen
    .getAllByRole("button")
    .map((b) => b.getAttribute("aria-expanded") === "true");

describe("Accordion", () => {
  it("renders headers holding buttons, all closed", () => {
    render(<Faq />);
    expect(screen.getAllByRole("heading")).toHaveLength(2);
    expect(expanded()).toEqual([false, false]);
    expect(screen.queryByText("One cabin bag.")).not.toBeInTheDocument();
  });

  it("raises each item by default", () => {
    const { container } = render(<Faq />);
    expect(container.querySelector('[data-slot="accordion"]')).toHaveAttribute(
      "data-variant",
      "raised"
    );
    for (const item of container.querySelectorAll(
      '[data-slot="accordion-item"]'
    )) {
      expect(item).toHaveClass("shadow-neu", "inset-shadow-neu-flat");
    }
  });

  it("opens one item at a time", () => {
    render(<Faq />);
    const [bags, seats] = screen.getAllByRole("button");
    fireEvent.click(bags as HTMLElement);
    expect(expanded()).toEqual([true, false]);
    expect(screen.getByText("One cabin bag.")).toBeInTheDocument();
    fireEvent.click(seats as HTMLElement);
    expect(expanded()).toEqual([false, true]);
  });

  it("opens several with multiple", () => {
    render(<Faq defaultValue={["bags"]} multiple />);
    fireEvent.click(screen.getByRole("button", { name: "Seats" }));
    expect(expanded()).toEqual([true, true]);
  });

  it("splits flat items with grooves instead of panels", () => {
    const { container } = render(<Faq variant="flat" />);
    const item = container.querySelector('[data-slot="accordion-item"]');
    expect(item).not.toHaveClass("shadow-neu");
    expect(item?.className).toContain("after:bg-[var(--neu-dark)]");
  });
});
