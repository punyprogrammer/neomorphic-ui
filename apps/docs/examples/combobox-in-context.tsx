"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@neomorphic-react/ui/combobox";
import { useState } from "react";

interface Person {
  label: string;
  value: string;
}

const people: Person[] = [
  { label: "Amara Okafor", value: "amara@northwind.io" },
  { label: "Ben Hartley", value: "ben@northwind.io" },
  { label: "Chloé Martin", value: "chloe@northwind.io" },
  { label: "Dev Patel", value: "dev@northwind.io" },
  { label: "Elena Rossi", value: "elena@northwind.io" },
  { label: "Farah Haddad", value: "farah@northwind.io" },
];

export default function ComboboxInContext() {
  const anchor = useComboboxAnchor();
  const [invitees, setInvitees] = useState(() => people.slice(2, 3));

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Share Q3 roadmap</CardTitle>
        <CardDescription>Invitees can view and comment.</CardDescription>
      </CardHeader>
      <CardContent>
        <Combobox
          items={people}
          multiple
          onValueChange={setInvitees}
          value={invitees}
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values: Person[]) => (
                <>
                  {values.map((person) => (
                    <ComboboxChip
                      key={person.value}
                      removeLabel={`Remove ${person.label}`}
                    >
                      {person.label}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    aria-label="Invite people"
                    placeholder={values.length ? "" : "Add people by name"}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No one in your workspace matches.</ComboboxEmpty>
            <ComboboxList>
              {(person: Person) => (
                <ComboboxItem key={person.value} value={person}>
                  <span className="grid">
                    {person.label}
                    <span className="text-muted-foreground text-xs">
                      {person.value}
                    </span>
                  </span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={invitees.length === 0} variant="primary">
          {invitees.length > 1 ? `Invite ${invitees.length} people` : "Invite"}
        </Button>
      </CardFooter>
    </Card>
  );
}
