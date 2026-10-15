"use client";

import { buttonVariants } from "@neomorphic-react/ui/button";
import { ArrowRight } from "lucide-react";

export default function ButtonAsLink() {
  return (
    <a className={buttonVariants({ variant: "primary" })} href="#as-a-link">
      Read the docs
      <ArrowRight />
    </a>
  );
}
