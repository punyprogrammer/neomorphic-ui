"use client";

import { Label } from "@neomorphic-react/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";

export default function NativeSelectDemo() {
  return (
    <div className="grid w-full max-w-56 gap-2">
      <Label htmlFor="native-select-demo">Seat</Label>
      <NativeSelect className="w-full" id="native-select-demo" name="seat">
        <NativeSelectOption value="">Choose a seat</NativeSelectOption>
        <NativeSelectOption value="window">Window</NativeSelectOption>
        <NativeSelectOption value="middle">Middle</NativeSelectOption>
        <NativeSelectOption value="aisle">Aisle</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
