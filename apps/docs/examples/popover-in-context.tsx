"use client";

import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import { Button } from "@neomorphic-react/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";
import { Check, Copy, UserPlus } from "lucide-react";
import { useState } from "react";

const link = "https://plans.example.com/d/onboarding-2026";

const people = [
  { name: "Priya Shah", initials: "PS", role: "Owner" },
  { name: "Tom Becker", initials: "TB", role: "Can edit" },
  { name: "Lena Okafor", initials: "LO", role: "Can view" },
];

export default function PopoverInContext() {
  const [copied, setCopied] = useState(false);

  return (
    <Popover onOpenChange={() => setCopied(false)}>
      <PopoverTrigger render={<Button icon={<UserPlus />} variant="primary" />}>
        Share
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Share "Onboarding plan"</PopoverTitle>
          <PopoverDescription>
            Anyone with the link can view.
          </PopoverDescription>
        </PopoverHeader>
        <InputGroup size="sm">
          <InputGroupInput aria-label="Share link" readOnly value={link} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label={copied ? "Link copied" : "Copy link"}
              icon={copied ? <Check /> : <Copy />}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
              }}
            />
          </InputGroupAddon>
        </InputGroup>
        <ul className="grid gap-3">
          {people.map((person) => (
            <li className="flex items-center gap-3" key={person.name}>
              <Avatar size="sm">
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <span className="flex-1 font-medium">{person.name}</span>
              <span className="text-muted-foreground">{person.role}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
