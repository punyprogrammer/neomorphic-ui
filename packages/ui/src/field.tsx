"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext } from "react";

import { labelClassName } from "./label";
import { Separator } from "./separator";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// FieldSet / FieldLegend
// ---------------------------------------------------------------------------

type FieldSetProps = FieldsetPrimitive.Root.Props;

/** A `<fieldset>` grouping related fields under one `FieldLegend`. */
function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <FieldsetPrimitive.Root
      className={cn(
        "flex min-w-0 flex-col gap-5 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      data-slot="field-set"
      {...props}
    />
  );
}

interface FieldLegendProps extends FieldsetPrimitive.Legend.Props {
  /**
   * `legend` is a section heading; `label` matches a `FieldLabel`, for a
   * radio or checkbox group that reads as one question.
   * @default "legend"
   */
  variant?: "legend" | "label";
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldLegendProps) {
  return (
    <FieldsetPrimitive.Legend
      className={cn(
        "mb-1 font-medium text-foreground data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      data-slot="field-legend"
      data-variant={variant}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FieldGroup
// ---------------------------------------------------------------------------

type FieldGroupProps = React.ComponentProps<"div">;

/**
 * Stacks fields, and is the container `orientation="responsive"` measures:
 * fields switch to a row once the group is at least 28rem wide.
 */
function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-6 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      data-slot="field-group"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Field
// ---------------------------------------------------------------------------

// Base UI's label and description throw outside a `Field.Root`, but a
// fieldset's description and a choice card's label sit outside one. They
// fall back to plain elements there.
const InsideFieldContext = createContext(false);

const fieldVariants = cva("group/field flex w-full gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>:is([data-slot=checkbox],[data-slot=radio-group-item],[data-slot=switch])]:mt-0.5 [&>[data-slot=field-label]]:flex-auto",
      responsive:
        "@md/field-group:flex-row flex-col @md/field-group:items-center @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:[&>*]:w-auto [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

interface FieldProps
  extends FieldPrimitive.Root.Props,
    VariantProps<typeof fieldVariants> {
  /**
   * `vertical` stacks label, control and messages; `horizontal` puts a
   * checkbox or switch beside its label; `responsive` switches inside a
   * wide `FieldGroup`.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "responsive";
}

/**
 * One form field. Base UI controls inside it (`Input`, `Textarea`, `Select`,
 * `Checkbox`, `Switch`, `Slider`, `RadioGroup`, …) are labelled by
 * `FieldLabel`, described by `FieldDescription` and `FieldError`, and get
 * `data-invalid` when the field is `invalid` or fails `validate`.
 */
function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <InsideFieldContext.Provider value={true}>
      <FieldPrimitive.Root
        className={cn(fieldVariants({ orientation }), className)}
        data-orientation={orientation}
        data-slot="field"
        {...props}
      />
    </InsideFieldContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// FieldContent / FieldTitle
// ---------------------------------------------------------------------------

type FieldContentProps = React.ComponentProps<"div">;

/** Stacks a label and description beside a horizontal field's control. */
function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-1 leading-snug", className)}
      data-slot="field-content"
      {...props}
    />
  );
}

type FieldTitleProps = React.ComponentProps<"div">;

/** A label-styled heading that isn't a `<label>`, e.g. inside a choice card. */
function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 font-medium text-foreground text-sm leading-snug group-data-disabled/field:opacity-50",
        className
      )}
      data-slot="field-title"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FieldLabel
// ---------------------------------------------------------------------------

type FieldLabelProps = FieldPrimitive.Label.Props;

const fieldLabelClassName = cn(
  labelClassName,
  "w-fit leading-snug",
  "has-[>[data-slot=field]]:inset-shadow-neu-flat has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:items-stretch has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:bg-neu-convex has-[>[data-slot=field]]:shadow-neu has-[>[data-slot=field]]:transition-[box-shadow,background-color] has-[>[data-slot=field]]:duration-[var(--duration-base)] has-[>[data-slot=field]]:[&>*]:p-3",
  "has-data-checked:inset-shadow-neu-sm has-data-checked:bg-none has-data-checked:shadow-neu-flat has-data-checked:ring-1 has-data-checked:ring-primary/60"
);

/**
 * Names the field's control. Wrapping a whole `Field` turns it into a choice
 * card: raised, and pressed in with a primary edge once its checkbox or
 * radio is checked.
 */
function FieldLabel({ className, render, ...props }: FieldLabelProps) {
  const insideField = useContext(InsideFieldContext);
  if (!insideField) {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: a choice card's label wraps its control.
      <label
        className={cn(fieldLabelClassName, className as string)}
        data-slot="field-label"
        {...(props as React.ComponentProps<"label">)}
      />
    );
  }
  return (
    <FieldPrimitive.Label
      className={cn(fieldLabelClassName, className)}
      data-slot="field-label"
      render={render}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FieldDescription
// ---------------------------------------------------------------------------

type FieldDescriptionProps = FieldPrimitive.Description.Props;

const fieldDescriptionClassName =
  "font-normal text-muted-foreground text-sm leading-normal group-data-[orientation=horizontal]/field:text-balance [[data-variant=legend]+&]:-mt-4 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4";

/**
 * Describes the field's control. Outside a `Field` (under a `FieldLegend`,
 * or in a choice card) it's a plain paragraph.
 */
function FieldDescription({
  className,
  render,
  ...props
}: FieldDescriptionProps) {
  const insideField = useContext(InsideFieldContext);
  if (!insideField) {
    return (
      <p
        className={cn(fieldDescriptionClassName, className as string)}
        data-slot="field-description"
        {...(props as React.ComponentProps<"p">)}
      />
    );
  }
  return (
    <FieldPrimitive.Description
      className={cn(fieldDescriptionClassName, className)}
      data-slot="field-description"
      render={render}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FieldSeparator
// ---------------------------------------------------------------------------

interface FieldSeparatorProps extends React.ComponentProps<"div"> {
  /** Text over the groove, such as "Or continue with". */
  children?: React.ReactNode;
}

function FieldSeparator({
  children,
  className,
  ...props
}: FieldSeparatorProps) {
  return (
    <div
      className={cn("relative -my-2 h-5 text-sm", className)}
      data-content={children ? "" : undefined}
      data-slot="field-separator"
      {...props}
    >
      <Separator className="absolute inset-x-0 top-1/2" />
      {children ? (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FieldError
// ---------------------------------------------------------------------------

interface FieldErrorProps extends FieldPrimitive.Error.Props {
  /**
   * Messages from a form library (e.g. React Hook Form or TanStack Form).
   * Duplicates are dropped; several become a list.
   */
  errors?: ({ message?: string } | undefined)[];
}

function errorContent(errors: FieldErrorProps["errors"]) {
  const messages = [
    ...new Set(
      (errors ?? []).map((error) => error?.message).filter(Boolean) as string[]
    ),
  ];
  if (messages.length === 0) {
    return null;
  }
  if (messages.length === 1) {
    return messages[0];
  }
  return (
    <ul className="ms-4 flex list-disc flex-col gap-1">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}

/**
 * With `children` or `errors`, shows that message: render it while the
 * field is invalid, and set `invalid` on the `Field`. With neither, shows
 * the browser's message whenever native validation (`required`, `type`,
 * `pattern`, …) or `validate` fails. `match` limits it to one validity
 * state, e.g. `valueMissing`.
 */
function FieldError({
  className,
  children,
  errors,
  match,
  ...props
}: FieldErrorProps) {
  const fromErrors = errorContent(errors);
  const hasMessage = children != null || fromErrors != null;
  return (
    <FieldPrimitive.Error
      className={cn("font-normal text-destructive text-sm", className)}
      data-slot="field-error"
      match={match ?? (hasMessage ? true : undefined)}
      {...props}
    >
      {children ?? fromErrors ?? undefined}
    </FieldPrimitive.Error>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldTitleProps,
};
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  fieldVariants,
};
