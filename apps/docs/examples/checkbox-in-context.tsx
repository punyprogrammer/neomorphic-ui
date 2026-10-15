"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@neomorphic-react/ui/field";
import { useState } from "react";

const sources = [
  {
    id: "calendar",
    label: "Calendar",
    description: "Free and busy times for the next two weeks",
  },
  {
    id: "files",
    label: "Shared files",
    description: "Documents in folders shared with you",
  },
  {
    id: "web",
    label: "Web search",
    description: "Public pages, with links to each source",
  },
];

export default function CheckboxInContext() {
  const [enabled, setEnabled] = useState(["calendar", "web"]);

  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Sources</CardTitle>
        <CardDescription>
          {enabled.length} of {sources.length} sources the assistant may use
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          {sources.map((source) => (
            <Field key={source.id} orientation="horizontal">
              <Checkbox
                checked={enabled.includes(source.id)}
                onCheckedChange={(checked) =>
                  setEnabled((current) =>
                    checked
                      ? [...current, source.id]
                      : current.filter((id) => id !== source.id)
                  )
                }
              />
              <FieldContent>
                <FieldLabel>{source.label}</FieldLabel>
                <FieldDescription>{source.description}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
