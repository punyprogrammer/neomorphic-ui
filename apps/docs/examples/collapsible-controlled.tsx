"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
} from "@neomorphic-react/ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import { Label } from "@neomorphic-react/ui/label";
import { useState } from "react";

export default function CollapsibleControlled() {
  const [separate, setSeparate] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col">
      <Label className="gap-3">
        <Checkbox checked={separate} onCheckedChange={setSeparate} />
        Send the invoice to a different address
      </Label>
      <Collapsible open={separate}>
        <CollapsibleContent>
          <FieldGroup className="px-1 pt-5 pb-1">
            <Field>
              <FieldLabel>Company</FieldLabel>
              <Input autoComplete="organization" placeholder="Northwind Ltd" />
            </Field>
            <Field>
              <FieldLabel>Billing address</FieldLabel>
              <Input
                autoComplete="billing street-address"
                placeholder="22 Harbour Street"
              />
            </Field>
          </FieldGroup>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
