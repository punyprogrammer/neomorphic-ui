import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp";

function Example(props: Partial<React.ComponentProps<typeof InputOTP>>) {
  return (
    <InputOTP aria-label="Code" length={6} {...props}>
      <InputOTPGroup>
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe("InputOTP", () => {
  it("renders one well per slot", () => {
    const { container } = render(<Example />);
    const slots = container.querySelectorAll('[data-slot="input-otp-slot"]');
    expect(slots).toHaveLength(6);
    expect(slots[0]).toHaveClass("inset-shadow-neu", "shadow-neu-flat");
  });

  it("moves through the slots as you type and reports completion", async () => {
    const onValueComplete = vi.fn();
    const { container } = render(<Example onValueComplete={onValueComplete} />);
    const slots = container.querySelectorAll<HTMLInputElement>(
      '[data-slot="input-otp-slot"]'
    );
    await userEvent.click(slots[0] as HTMLInputElement);
    await userEvent.keyboard("123456");
    expect([...slots].map((slot) => slot.value).join("")).toBe("123456");
    expect(onValueComplete).toHaveBeenCalledWith("123456", expect.anything());
  });

  it("rejects letters by default", async () => {
    const { container } = render(<Example />);
    const first = container.querySelector<HTMLInputElement>(
      '[data-slot="input-otp-slot"]'
    ) as HTMLInputElement;
    await userEvent.click(first);
    await userEvent.keyboard("a");
    expect(first.value).toBe("");
  });

  it("sizes every slot from the root", () => {
    const { container } = render(<Example size="lg" />);
    expect(container.querySelector('[data-slot="input-otp-slot"]')).toHaveClass(
      "h-13",
      "w-12"
    );
  });
});
