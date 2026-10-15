import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Checkbox } from "./checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./field";
import { Input } from "./input";
import { Label } from "./label";

describe("Label", () => {
  it("renders a native label pointing at its control", () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <input id="name" />
      </>
    );
    expect(screen.getByText("Name").tagName).toBe("LABEL");
    expect(screen.getByLabelText("Name")).toHaveAttribute("id", "name");
    expect(screen.getByText("Name")).toHaveAttribute("data-slot", "label");
  });
});

describe("Field", () => {
  it("labels and describes a library Input", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldDescription>We never share it.</FieldDescription>
      </Field>
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("data-slot", "input");
    const description = screen.getByText("We never share it.");
    expect(input.getAttribute("aria-describedby")).toContain(description.id);
  });

  it("marks an invalid field's control and describes it by the error", () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError>Enter an email</FieldError>
      </Field>
    );
    const error = screen.getByText("Enter an email");
    expect(error).toHaveClass("text-destructive");
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("without a message, waits for native validation to fail", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input required />
        <FieldError />
      </Field>
    );
    expect(
      document.querySelector('[data-slot="field-error"]')
    ).not.toBeInTheDocument();
  });

  it("dedupes `errors` from a form library into a list", () => {
    render(
      <Field>
        <Input aria-label="Password" />
        <FieldError
          errors={[
            { message: "Too short" },
            { message: "Needs a number" },
            { message: "Too short" },
          ]}
        />
      </Field>
    );
    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([
      "Too short",
      "Needs a number",
    ]);
  });

  it("sets orientation as a data attribute", () => {
    render(
      <Field data-testid="field" orientation="horizontal">
        <Checkbox />
        <FieldContent>
          <FieldLabel>Remember me</FieldLabel>
        </FieldContent>
      </Field>
    );
    const field = screen.getByTestId("field");
    expect(field).toHaveAttribute("data-orientation", "horizontal");
    expect(field).toHaveClass("flex-row");
  });

  it("groups fields in a fieldset named by its legend", () => {
    render(
      <FieldSet>
        <FieldLegend>Address</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>Street</FieldLabel>
            <Input />
          </Field>
        </FieldGroup>
      </FieldSet>
    );
    expect(screen.getByRole("group", { name: "Address" })).toBeInTheDocument();
  });

  it("puts separator text over a decorative groove", () => {
    render(<FieldSeparator>Or continue with</FieldSeparator>);
    expect(screen.getByText("Or continue with")).toHaveAttribute(
      "data-slot",
      "field-separator-content"
    );
    expect(screen.getByRole("none")).toHaveAttribute("data-slot", "separator");
  });
});
