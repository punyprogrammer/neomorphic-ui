"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";

const plans = [
  { label: "Starter", value: "starter" },
  { label: "Team", value: "team" },
  { label: "Business", value: "business" },
  { label: "Enterprise", value: "enterprise" },
];

function PlanItems() {
  return (
    <SelectContent>
      {plans.map((plan) => (
        <SelectItem
          disabled={plan.value === "enterprise"}
          key={plan.value}
          value={plan.value}
        >
          {plan.label}
        </SelectItem>
      ))}
    </SelectContent>
  );
}

export default function SelectStates() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <Select items={plans}>
        <div className="grid gap-2">
          <SelectLabel>Plan</SelectLabel>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Choose a plan" />
          </SelectTrigger>
        </div>
        <PlanItems />
      </Select>
      <Select defaultValue="team" disabled items={plans}>
        <div className="grid gap-2">
          <SelectLabel className="text-foreground/50">Current plan</SelectLabel>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
        </div>
      </Select>
      <Select items={plans}>
        <div className="grid gap-2">
          <SelectLabel>Billing plan</SelectLabel>
          <SelectTrigger
            aria-describedby="billing-plan-error"
            aria-invalid
            className="w-52"
          >
            <SelectValue placeholder="Choose a plan" />
          </SelectTrigger>
          <p className="text-destructive text-xs" id="billing-plan-error">
            Choose a plan to continue.
          </p>
        </div>
        <PlanItems />
      </Select>
    </div>
  );
}
