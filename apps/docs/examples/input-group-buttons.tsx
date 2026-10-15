"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Eye, EyeOff, Mail, Tag } from "lucide-react";
import { useState } from "react";

export default function InputGroupButtons() {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-6">
      <Field>
        <FieldLabel>Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            autoComplete="current-password"
            type={visible ? "text" : "password"}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Show password"
              aria-pressed={visible}
              icon={visible ? <EyeOff /> : <Eye />}
              onClick={() => setVisible((value) => !value)}
            />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>Promo code</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <Tag />
          </InputGroupAddon>
          <InputGroupInput onValueChange={setCode} value={code} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              disabled={!code.trim()}
              onClick={() => setApplied(code.trim().toUpperCase())}
            >
              Apply
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {applied ? (
          <FieldDescription>
            {applied} is applied to your order.
          </FieldDescription>
        ) : null}
      </Field>
      <InputGroup shape="pill">
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Email"
          placeholder="Your email"
          type="email"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="primary">Subscribe</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
