"use client";

import {
  type ButtonVariantsProps,
  buttonVariants,
} from "@neomorphic-react/ui/button";
import { cn } from "@neomorphic-react/ui/utils";
import Link from "next/link";
import type * as React from "react";

type LinkButtonProps = Omit<React.ComponentProps<"a">, "href"> &
  ButtonVariantsProps & {
    href: string;
  };

/**
 * A link styled as a button. `buttonVariants` lives in a client module, so
 * Server Components render this instead of calling it.
 */
export function LinkButton({
  className,
  fullWidth,
  href,
  iconOnly,
  iconPosition,
  shape,
  size,
  variant,
  ...props
}: LinkButtonProps) {
  const classes = cn(
    buttonVariants({ fullWidth, iconOnly, iconPosition, shape, size, variant }),
    className
  );
  if (href.startsWith("http")) {
    return (
      <a
        className={classes}
        href={href}
        rel="noreferrer"
        target="_blank"
        {...props}
      />
    );
  }
  return <Link className={classes} href={href} {...props} />;
}
