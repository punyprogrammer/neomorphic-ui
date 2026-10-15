"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";

export default function NativeSelectField() {
  return (
    <Field className="max-w-64">
      <FieldLabel htmlFor="native-select-field-currency">Currency</FieldLabel>
      <NativeSelect
        aria-describedby="native-select-field-hint"
        className="w-full"
        defaultValue="gbp"
        id="native-select-field-currency"
        name="currency"
      >
        <NativeSelectOption value="gbp">British pound (GBP)</NativeSelectOption>
        <NativeSelectOption value="eur">Euro (EUR)</NativeSelectOption>
        <NativeSelectOption value="usd">US dollar (USD)</NativeSelectOption>
      </NativeSelect>
      <FieldDescription id="native-select-field-hint">
        Prices and invoices use this currency.
      </FieldDescription>
    </Field>
  );
}
