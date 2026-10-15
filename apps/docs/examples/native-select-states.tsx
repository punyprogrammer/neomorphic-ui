"use client";

import { Label } from "@neomorphic-react/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";

export default function NativeSelectStates() {
  return (
    <div className="grid w-full max-w-sm gap-6 sm:grid-cols-2">
      <div className="grid content-start gap-2">
        <Label htmlFor="native-select-size">Shirt size</Label>
        <NativeSelect
          aria-describedby="native-select-size-error"
          aria-invalid
          className="w-full"
          defaultValue=""
          id="native-select-size"
          required
        >
          <NativeSelectOption value="">Choose a size</NativeSelectOption>
          <NativeSelectOption value="s">Small</NativeSelectOption>
          <NativeSelectOption value="m">Medium</NativeSelectOption>
          <NativeSelectOption value="l">Large</NativeSelectOption>
        </NativeSelect>
        <p className="text-destructive text-sm" id="native-select-size-error">
          Choose a size to continue.
        </p>
      </div>
      <div className="grid content-start gap-2">
        <Label className="opacity-50" htmlFor="native-select-colour">
          Colour
        </Label>
        <NativeSelect
          className="w-full"
          defaultValue="navy"
          disabled
          id="native-select-colour"
        >
          <NativeSelectOption value="navy">Navy</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  );
}
