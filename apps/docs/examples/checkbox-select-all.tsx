"use client";

import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";
import { useState } from "react";

const toppings = ["Mozzarella", "Mushrooms", "Olives", "Basil"];

export default function CheckboxSelectAll() {
  const [chosen, setChosen] = useState(["Mozzarella", "Basil"]);
  const all = chosen.length === toppings.length;
  const some = chosen.length > 0 && !all;

  return (
    <fieldset className="grid gap-4">
      <legend className="sr-only">Toppings</legend>
      <Label className="gap-3">
        <Checkbox
          checked={all}
          indeterminate={some}
          onCheckedChange={(checked) => setChosen(checked ? toppings : [])}
        />
        All toppings
      </Label>
      <div className="grid gap-4 ps-9">
        {toppings.map((topping) => (
          <Label className="gap-3 font-normal" key={topping}>
            <Checkbox
              checked={chosen.includes(topping)}
              onCheckedChange={(checked) =>
                setChosen((current) =>
                  checked
                    ? [...current, topping]
                    : current.filter((item) => item !== topping)
                )
              }
            />
            {topping}
          </Label>
        ))}
      </div>
    </fieldset>
  );
}
