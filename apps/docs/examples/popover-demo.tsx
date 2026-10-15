"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@neomorphic-react/ui/popover";
import { Info } from "lucide-react";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button icon={<Info />} />}>
        Delivery
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Free delivery</PopoverTitle>
          <PopoverDescription>
            Orders over £40 ship free and arrive in 2 to 3 working days. Returns
            are free for 30 days.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
