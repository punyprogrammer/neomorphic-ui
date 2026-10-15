"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@neomorphic-react/ui/select";
import { Fragment } from "react";

const timeZones = {
  Americas: [
    ["America/New_York", "New York (UTC−5)"],
    ["America/Chicago", "Chicago (UTC−6)"],
    ["America/Los_Angeles", "Los Angeles (UTC−8)"],
    ["America/Sao_Paulo", "São Paulo (UTC−3)"],
  ],
  Europe: [
    ["Europe/London", "London (UTC+0)"],
    ["Europe/Paris", "Paris (UTC+1)"],
    ["Europe/Athens", "Athens (UTC+2)"],
  ],
  Asia: [
    ["Asia/Dubai", "Dubai (UTC+4)"],
    ["Asia/Kolkata", "Kolkata (UTC+5:30)"],
    ["Asia/Singapore", "Singapore (UTC+8)"],
    ["Asia/Tokyo", "Tokyo (UTC+9)"],
  ],
};

const items = Object.fromEntries(Object.values(timeZones).flat());

export default function SelectGroups() {
  return (
    <Select defaultValue="Asia/Kolkata" items={items}>
      <div className="grid gap-2">
        <SelectLabel>Time zone</SelectLabel>
        <SelectTrigger className="w-72">
          <SelectValue />
        </SelectTrigger>
      </div>
      <SelectContent className="max-h-72">
        {Object.entries(timeZones).map(([region, zones], index) => (
          <Fragment key={region}>
            {index > 0 ? <SelectSeparator /> : null}
            <SelectGroup>
              <SelectGroupLabel>{region}</SelectGroupLabel>
              {zones.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </Fragment>
        ))}
      </SelectContent>
    </Select>
  );
}
