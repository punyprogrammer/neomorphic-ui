"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@neomorphic-react/ui/combobox";
import { Label } from "@neomorphic-react/ui/label";

const carriers = ["DHL Express", "DPD", "FedEx", "Royal Mail", "UPS"];

function CarrierList() {
  return (
    <ComboboxContent>
      <ComboboxEmpty>No carriers found.</ComboboxEmpty>
      <ComboboxList>
        {(carrier: string) => (
          <ComboboxItem key={carrier} value={carrier}>
            {carrier}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  );
}

export default function ComboboxStates() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <div className="grid w-60 gap-2">
        <Label className="text-foreground/50" htmlFor="combobox-disabled">
          Carrier
        </Label>
        <Combobox defaultValue="Royal Mail" items={carriers}>
          <ComboboxInput disabled id="combobox-disabled" showClear />
          <CarrierList />
        </Combobox>
      </div>
      <div className="grid w-60 gap-2">
        <Label htmlFor="combobox-invalid">Return carrier</Label>
        <Combobox items={carriers}>
          <ComboboxInput
            aria-describedby="combobox-invalid-error"
            aria-invalid
            id="combobox-invalid"
            placeholder="Search carriers"
          />
          <CarrierList />
        </Combobox>
        <p className="text-destructive text-xs" id="combobox-invalid-error">
          Choose a carrier for returns.
        </p>
      </div>
    </div>
  );
}
