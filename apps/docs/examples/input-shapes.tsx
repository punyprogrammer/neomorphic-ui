"use client";

import { Input } from "@neomorphic-react/ui/input";

export default function InputShapes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Input aria-label="Full name" placeholder="Full name" />
      <Input
        aria-label="Search"
        placeholder="Search"
        shape="pill"
        type="search"
      />
    </div>
  );
}
