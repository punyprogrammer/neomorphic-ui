"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function InputGroupDemo() {
  const [query, setQuery] = useState("");

  return (
    <InputGroup className="max-w-sm" shape="pill">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        onValueChange={setQuery}
        placeholder="Search products"
        type="search"
        value={query}
      />
      {query ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Clear search"
            icon={<X />}
            onClick={() => setQuery("")}
          />
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
