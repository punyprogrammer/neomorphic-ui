"use client";

import { Label } from "@neomorphic-react/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@neomorphic-react/ui/native-select";

export default function NativeSelectGroups() {
  return (
    <div className="grid w-full max-w-64 gap-2">
      <Label htmlFor="native-select-departure">Departure airport</Label>
      <NativeSelect
        className="w-full"
        defaultValue="lhr"
        id="native-select-departure"
      >
        <NativeSelectOptGroup label="London">
          <NativeSelectOption value="lhr">Heathrow</NativeSelectOption>
          <NativeSelectOption value="lgw">Gatwick</NativeSelectOption>
          <NativeSelectOption value="stn">Stansted</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Paris">
          <NativeSelectOption value="cdg">Charles de Gaulle</NativeSelectOption>
          <NativeSelectOption value="ory">Orly</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Amsterdam">
          <NativeSelectOption value="ams">Schiphol</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  );
}
