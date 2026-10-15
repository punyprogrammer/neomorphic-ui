"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@neomorphic-react/ui/drawer";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-react/ui/field";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

type Amenity = "wifi" | "kitchen" | "workspace";

const amenities: { id: Amenity; label: string }[] = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "kitchen", label: "Kitchen" },
  { id: "workspace", label: "Desk to work at" },
];

const stays: { name: string; price: number; has: Amenity[] }[] = [
  { name: "Alfama loft", price: 96, has: ["wifi", "kitchen"] },
  { name: "Baixa studio", price: 74, has: ["wifi"] },
  {
    name: "Belém townhouse",
    price: 140,
    has: ["wifi", "kitchen", "workspace"],
  },
  { name: "Chiado flat", price: 118, has: ["wifi", "workspace"] },
  { name: "Graça room", price: 52, has: ["kitchen"] },
];

export default function DrawerInContext() {
  const [required, setRequired] = useState<Amenity[]>([]);
  const results = stays.filter((stay) =>
    required.every((amenity) => stay.has.includes(amenity))
  );

  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Stays in Lisbon</CardTitle>
        <CardDescription>
          {results.length} of {stays.length} match your filters
        </CardDescription>
        <CardAction>
          <Drawer>
            <DrawerTrigger
              render={<Button icon={<SlidersHorizontal />} size="sm" />}
            >
              Filters
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription>
                    Only show stays that have all of these.
                  </DrawerDescription>
                </DrawerHeader>
                <FieldGroup className="px-5">
                  {amenities.map(({ id, label }) => (
                    <Field key={id} orientation="horizontal">
                      <Checkbox
                        checked={required.includes(id)}
                        onCheckedChange={(checked) =>
                          setRequired((current) =>
                            checked
                              ? [...current, id]
                              : current.filter((item) => item !== id)
                          )
                        }
                      />
                      <FieldLabel>{label}</FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="primary" />}>
                    Show {results.length} stays
                  </DrawerClose>
                  <Button onClick={() => setRequired([])} variant="ghost">
                    Clear filters
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-sm">
          {results.map((stay) => (
            <li className="flex justify-between" key={stay.name}>
              <span>{stay.name}</span>
              <span className="text-muted-foreground tabular-nums">
                €{stay.price} a night
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
