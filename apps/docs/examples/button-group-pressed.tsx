"use client";

import { Button } from "@neomorphic-react/ui/button";
import { ButtonGroup } from "@neomorphic-react/ui/button-group";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

const MARKS = [
  { value: "bold", label: "Bold", icon: Bold },
  { value: "italic", label: "Italic", icon: Italic },
  { value: "underline", label: "Underline", icon: Underline },
];

export default function ButtonGroupPressed() {
  const [marks, setMarks] = useState<string[]>(["bold"]);
  const toggle = (mark: string) =>
    setMarks((current) =>
      current.includes(mark)
        ? current.filter((value) => value !== mark)
        : [...current, mark]
    );
  return (
    <ButtonGroup aria-label="Text style">
      {MARKS.map(({ value, label, icon: Icon }) => (
        <Button
          aria-label={label}
          aria-pressed={marks.includes(value)}
          icon={<Icon />}
          key={value}
          onClick={() => toggle(value)}
          size="sm"
        />
      ))}
    </ButtonGroup>
  );
}
