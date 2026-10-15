"use client";

import type * as React from "react";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button, type ButtonProps } from "./button";
import { Checkbox } from "./checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field";
import { Input, type InputProps } from "./input";
import { Kbd } from "./kbd";
import { Progress, ProgressLabel, type ProgressProps } from "./progress";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { cn } from "./utils";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

/** One question's answer: the chosen values and any typed answer. */
interface QuestionnaireAnswer {
  choices: string[];
  text: string;
}

type QuestionnaireValues = Record<string, QuestionnaireAnswer>;

interface ItemMeta {
  element: HTMLElement;
  enabled: boolean;
  name: string;
  required: boolean;
  validate: (answer: QuestionnaireAnswer) => string | undefined;
}

interface QuestionnaireContextValue {
  activeName: string | undefined;
  errors: Record<string, string>;
  isFirst: boolean;
  isLast: boolean;
  items: ItemMeta[];
  next: () => void;
  position: number;
  previous: () => void;
  register: (meta: ItemMeta) => () => void;
  setAnswer: (name: string, answer: QuestionnaireAnswer) => void;
  shortcuts: boolean;
  skip: () => void;
  submitted: boolean;
  values: QuestionnaireValues;
}

const EMPTY_ANSWER: QuestionnaireAnswer = { choices: [], text: "" };
const REQUIRED_MESSAGE = "Choose an answer to continue.";
const DIGIT = /^[1-9]$/;
const TEXT_ENTRY =
  "textarea, [contenteditable=true], input:not([type=hidden], [type=checkbox], [type=radio], [type=button], [type=submit])";
const CHOICE_CONTROL =
  "[data-slot=questionnaire-choice] :is([role=radio], [role=checkbox])";
const FOCUSABLE_CONTROL = `${CHOICE_CONTROL}, input:not([type=hidden])`;

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(
  null
);

function useQuestionnaireContext(part: string) {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(`${part} must be used within a Questionnaire`);
  }
  return context;
}

function answered(answer: QuestionnaireAnswer) {
  return answer.choices.length > 0 || answer.text.trim() !== "";
}

function byDocumentOrder(a: ItemMeta, b: ItemMeta) {
  // biome-ignore lint/suspicious/noBitwiseOperators: compareDocumentPosition returns a bitmask
  return a.element.compareDocumentPosition(b.element) &
    Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

function errorFor(meta: ItemMeta, values: QuestionnaireValues) {
  const answer = values[meta.name] ?? EMPTY_ANSWER;
  if (meta.required && !answered(answer)) {
    return REQUIRED_MESSAGE;
  }
  return meta.validate(answer);
}

function focusFirstControl(element: HTMLElement | undefined) {
  element?.querySelector<HTMLElement>(FOCUSABLE_CONTROL)?.focus();
}

// ---------------------------------------------------------------------------
// Questionnaire
// ---------------------------------------------------------------------------

interface QuestionnaireProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  /** The visible question's `name`, when controlled. */
  activeItem?: string;
  /** The question to start on, e.g. to resume where the reader left off. */
  defaultActiveItem?: string;
  /** Answers to start with, e.g. saved from an earlier visit. */
  defaultValues?: QuestionnaireValues;
  onActiveItemChange?: (name: string) => void;
  /**
   * Called with the answers to every question that applies once all of
   * them pass validation. The form's native submit is prevented.
   */
  onSubmit?: (
    values: QuestionnaireValues,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  /** Called on every change, e.g. to save progress for later. */
  onValuesChange?: (values: QuestionnaireValues) => void;
  /**
   * Number keys 1–9 pick the matching choice (outside a text field), with
   * the key shown on each choice.
   * @default false
   */
  shortcuts?: boolean;
}

/**
 * A multi-step form, one `QuestionnaireItem` (a question) at a time, with
 * `QuestionnaireProgress` and `QuestionnaireActions` around them. Enter in
 * a text answer moves on.
 */
function Questionnaire({
  activeItem,
  children,
  className,
  defaultActiveItem,
  defaultValues,
  onActiveItemChange,
  onKeyDown,
  onSubmit,
  onValuesChange,
  shortcuts = false,
  ...props
}: QuestionnaireProps) {
  const [values, setValues] = useState<QuestionnaireValues>(
    defaultValues ?? {}
  );
  const [uncontrolledActive, setUncontrolledActive] =
    useState(defaultActiveItem);
  const [registry, setRegistry] = useState<ItemMeta[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const moved = useRef<boolean>(false);

  const items = useMemo(
    () => registry.filter((item) => item.enabled).sort(byDocumentOrder),
    [registry]
  );
  const requested = activeItem ?? uncontrolledActive;
  const position = Math.max(
    0,
    items.findIndex((item) => item.name === requested)
  );
  const active = items[position];

  const register = useCallback((meta: ItemMeta) => {
    setRegistry((current) => [
      ...current.filter((item) => item.name !== meta.name),
      meta,
    ]);
    return () =>
      setRegistry((current) => current.filter((item) => item !== meta));
  }, []);

  const setError = useCallback((name: string, error: string | undefined) => {
    setErrors((current) => {
      if (current[name] === error) {
        return current;
      }
      const next = { ...current };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  }, []);

  const setAnswer = useCallback(
    (name: string, answer: QuestionnaireAnswer) => {
      const next = { ...values, [name]: answer };
      setValues(next);
      setSubmitted(false);
      setError(name, undefined);
      onValuesChange?.(next);
    },
    [onValuesChange, setError, values]
  );

  const goTo = useCallback(
    (item: ItemMeta | undefined) => {
      if (!item) {
        return;
      }
      moved.current = true;
      setUncontrolledActive(item.name);
      onActiveItemChange?.(item.name);
    },
    [onActiveItemChange]
  );

  const next = useCallback(() => {
    if (!active) {
      return;
    }
    const error = errorFor(active, values);
    setError(active.name, error);
    if (error) {
      focusFirstControl(active.element);
      return;
    }
    goTo(items[position + 1]);
  }, [active, goTo, items, position, setError, values]);

  const previous = useCallback(() => {
    if (active) {
      setError(active.name, undefined);
    }
    goTo(items[position - 1]);
  }, [active, goTo, items, position, setError]);

  const skip = useCallback(() => {
    if (!active) {
      return;
    }
    setAnswer(active.name, EMPTY_ANSWER);
    goTo(items[position + 1]);
  }, [active, goTo, items, position, setAnswer]);

  // Move focus to the question just shown, so its legend is read.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when the question changes
  useEffect(() => {
    if (moved.current) {
      moved.current = false;
      active?.element.focus();
    }
  }, [active?.name]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      for (const item of items) {
        const error = errorFor(item, values);
        if (error) {
          setError(item.name, error);
          if (item === active) {
            focusFirstControl(item.element);
          } else {
            goTo(item);
          }
          return;
        }
      }
      setSubmitted(true);
      const answers: QuestionnaireValues = {};
      for (const item of items) {
        answers[item.name] = values[item.name] ?? EMPTY_ANSWER;
      }
      onSubmit?.(answers, event);
    },
    [active, goTo, items, onSubmit, setError, values]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !active) {
        return;
      }
      const target = event.target as HTMLElement;
      const typing = target.matches(TEXT_ENTRY);
      if (event.key === "Enter" && typing && target.tagName === "INPUT") {
        event.preventDefault();
        if (position === items.length - 1) {
          event.currentTarget.requestSubmit();
        } else {
          next();
        }
        return;
      }
      const modified = event.altKey || event.ctrlKey || event.metaKey;
      if (shortcuts && !typing && !modified && DIGIT.test(event.key)) {
        const controls =
          active.element.querySelectorAll<HTMLElement>(CHOICE_CONTROL);
        const control = controls[Number(event.key) - 1];
        if (control) {
          event.preventDefault();
          control.click();
          control.focus();
        }
      }
    },
    [active, items.length, next, onKeyDown, position, shortcuts]
  );

  const context = useMemo<QuestionnaireContextValue>(
    () => ({
      activeName: active?.name,
      errors,
      isFirst: position === 0,
      isLast: position >= items.length - 1,
      items,
      next,
      position,
      previous,
      register,
      setAnswer,
      shortcuts,
      skip,
      submitted,
      values,
    }),
    [
      active?.name,
      errors,
      items,
      next,
      position,
      previous,
      register,
      setAnswer,
      shortcuts,
      skip,
      submitted,
      values,
    ]
  );

  return (
    <QuestionnaireContext.Provider value={context}>
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: keys pressed in the question's controls bubble up here */}
      <form
        className={cn("flex w-full min-w-0 flex-col gap-6", className)}
        data-slot="questionnaire"
        noValidate
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </QuestionnaireContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// QuestionnaireProgress
// ---------------------------------------------------------------------------

interface QuestionnaireProgressProps
  extends Omit<ProgressProps, "value" | "children"> {
  /**
   * The label above the bar.
   * @default "Question {n} of {total}"
   */
  children?: (position: number, total: number) => React.ReactNode;
}

/** How far through the questions the reader is, as a labelled bar. */
function QuestionnaireProgress({
  children,
  className,
  size = "sm",
  ...props
}: QuestionnaireProgressProps) {
  const { items, position, submitted } = useQuestionnaireContext(
    "QuestionnaireProgress"
  );
  const total = items.length;
  const value = submitted || total === 0 ? 100 : (position / total) * 100;
  return (
    <Progress
      className={cn("gap-1.5", className)}
      data-slot="questionnaire-progress"
      size={size}
      value={value}
      {...props}
    >
      <ProgressLabel className="font-medium text-muted-foreground text-xs tabular-nums">
        {children
          ? children(position + 1, total)
          : `Question ${Math.min(position + 1, total)} of ${total}`}
      </ProgressLabel>
    </Progress>
  );
}

// ---------------------------------------------------------------------------
// QuestionnaireItem
// ---------------------------------------------------------------------------

interface ItemContextValue {
  active: boolean;
  answer: QuestionnaireAnswer;
  descriptionId: string;
  error: string | undefined;
  errorId: string;
  multiple: boolean;
  name: string;
  titleId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext(part: string) {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error(`${part} must be used within a QuestionnaireItem`);
  }
  return context;
}

interface QuestionnaireItemProps
  extends Omit<React.ComponentProps<"fieldset">, "name"> {
  /** Leave the question out, e.g. when an earlier answer makes it moot. */
  disabled?: boolean;
  /** Checkboxes instead of radios: any number of choices. */
  multiple?: boolean;
  /** The answer's key in the submitted values. */
  name: string;
  /** Needs a choice or a typed answer before moving on. */
  required?: boolean;
  /** Return a message to block moving on, or nothing to accept. */
  validate?: (answer: QuestionnaireAnswer) => string | undefined;
  /** Only ask this question when it returns `true` for the answers so far. */
  when?: (values: QuestionnaireValues) => boolean;
}

/**
 * One question: a `<fieldset>` named by its `QuestionnaireTitle`. Only the
 * current question is shown; the others stay in the form, hidden.
 */
function QuestionnaireItem({
  children,
  className,
  disabled = false,
  multiple = false,
  name,
  required = false,
  validate,
  when,
  ...props
}: QuestionnaireItemProps) {
  const { activeName, errors, register, values } =
    useQuestionnaireContext("QuestionnaireItem");
  const element = useRef<HTMLFieldSetElement>(null);
  const validateRef = useRef(validate);
  validateRef.current = validate;
  const id = useId();
  const enabled = !disabled && (when ? when(values) : true);
  const active = enabled && activeName === name;
  const error = errors[name];

  useLayoutEffect(() => {
    if (!element.current) {
      return;
    }
    return register({
      element: element.current,
      enabled,
      name,
      required,
      validate: (answer) => validateRef.current?.(answer),
    });
  }, [enabled, name, register, required]);

  const context = useMemo<ItemContextValue>(
    () => ({
      active,
      answer: values[name] ?? EMPTY_ANSWER,
      descriptionId: `${id}-description`,
      error,
      errorId: `${id}-error`,
      multiple,
      name,
      titleId: `${id}-title`,
    }),
    [active, error, id, multiple, name, values]
  );

  return (
    <ItemContext.Provider value={context}>
      <FieldSet
        aria-describedby={`${id}-description ${id}-error`}
        className={cn(
          "min-w-0 gap-4 border-0 p-0 outline-none [&[hidden]]:hidden",
          className
        )}
        data-active={active || undefined}
        data-invalid={error ? "" : undefined}
        data-slot="questionnaire-item"
        disabled={!enabled}
        hidden={!active}
        ref={element}
        tabIndex={-1}
        {...props}
      >
        {children}
      </FieldSet>
    </ItemContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Title and description
// ---------------------------------------------------------------------------

type QuestionnaireTitleProps = React.ComponentProps<typeof FieldLegend>;

/** The question, as the fieldset's `<legend>`. */
function QuestionnaireTitle({ className, ...props }: QuestionnaireTitleProps) {
  const { titleId } = useItemContext("QuestionnaireTitle");
  return (
    <FieldLegend
      className={cn(
        "mb-0 text-pretty font-medium text-base leading-snug",
        className
      )}
      data-slot="questionnaire-title"
      id={titleId}
      {...props}
    />
  );
}

type QuestionnaireDescriptionProps = React.ComponentProps<"p">;

/** Help under the question. */
function QuestionnaireDescription({
  className,
  ...props
}: QuestionnaireDescriptionProps) {
  const { descriptionId } = useItemContext("QuestionnaireDescription");
  return (
    <p
      className={cn(
        "-mt-2 text-pretty text-muted-foreground text-sm",
        className
      )}
      data-slot="questionnaire-description"
      id={descriptionId}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Choices
// ---------------------------------------------------------------------------

const ChoiceIndexContext = createContext(0);

type QuestionnaireChoicesProps = React.ComponentProps<"div">;

/**
 * The fixed answers, as raised choice cards: a radio group, or checkboxes
 * for a `multiple` question (grouped by the question's fieldset). Arrow
 * keys move between radios.
 */
function QuestionnaireChoices({
  children,
  className,
  ...props
}: QuestionnaireChoicesProps) {
  const { answer, error, multiple, name, titleId } = useItemContext(
    "QuestionnaireChoices"
  );
  const { setAnswer } = useQuestionnaireContext("QuestionnaireChoices");
  const handleValueChange = useCallback(
    (value: unknown) => {
      setAnswer(name, { choices: [String(value)], text: "" });
    },
    [name, setAnswer]
  );
  const choices = Children.toArray(children)
    .filter(isValidElement)
    .map((child, index) => (
      <ChoiceIndexContext.Provider key={child.key ?? index} value={index}>
        {child}
      </ChoiceIndexContext.Provider>
    ));
  const classes = cn("grid min-w-0 gap-3", className);

  if (multiple) {
    return (
      <div
        className={classes}
        data-invalid={error ? "" : undefined}
        data-slot="questionnaire-choices"
        {...props}
      >
        {choices}
      </div>
    );
  }
  return (
    <RadioGroup
      aria-invalid={error ? true : undefined}
      aria-labelledby={titleId}
      className={classes}
      data-slot="questionnaire-choices"
      name={name}
      onValueChange={handleValueChange}
      value={answer.choices[0] ?? null}
      {...(props as Omit<React.ComponentProps<typeof RadioGroup>, "value">)}
    >
      {choices}
    </RadioGroup>
  );
}

interface QuestionnaireChoiceProps
  extends Omit<React.ComponentProps<"label">, "children"> {
  children?: React.ReactNode;
  disabled?: boolean;
  /** The value recorded when this choice is picked. */
  value: string;
}

/**
 * One answer card. The first line of `children` is its label; add a
 * `QuestionnaireChoiceDescription` under it.
 */
function QuestionnaireChoice({
  children,
  className,
  disabled,
  value,
  ...props
}: QuestionnaireChoiceProps) {
  const { answer, error, multiple, name } = useItemContext(
    "QuestionnaireChoice"
  );
  const { setAnswer, shortcuts } = useQuestionnaireContext(
    "QuestionnaireChoice"
  );
  const index = useContext(ChoiceIndexContext);
  const checked = answer.choices.includes(value);
  const handleCheckedChange = useCallback(
    (next: boolean) => {
      const choices = next
        ? [...answer.choices, value]
        : answer.choices.filter((choice) => choice !== value);
      setAnswer(name, { ...answer, choices });
    },
    [answer, name, setAnswer, value]
  );
  const shortcut = shortcuts && index < 9 ? index + 1 : undefined;

  return (
    <FieldLabel
      className={cn(
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className as string
      )}
      data-slot="questionnaire-choice"
      {...(props as React.ComponentProps<typeof FieldLabel>)}
    >
      <Field disabled={disabled} orientation="horizontal">
        {multiple ? (
          <Checkbox
            aria-invalid={error ? true : undefined}
            checked={checked}
            name={name}
            onCheckedChange={handleCheckedChange}
            value={value}
          />
        ) : (
          <RadioGroupItem
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            value={value}
          />
        )}
        <FieldContent className="gap-0.5 font-medium text-foreground text-sm">
          {children}
        </FieldContent>
        {shortcut ? (
          <Kbd
            aria-hidden="true"
            className="ms-auto"
            data-slot="questionnaire-shortcut"
            size="sm"
          >
            {shortcut}
          </Kbd>
        ) : null}
      </Field>
    </FieldLabel>
  );
}

type QuestionnaireChoiceDescriptionProps = React.ComponentProps<"p">;

/** A muted line under a choice's label. */
function QuestionnaireChoiceDescription({
  className,
  ...props
}: QuestionnaireChoiceDescriptionProps) {
  return (
    <FieldDescription
      className={cn("font-normal", className)}
      data-slot="questionnaire-choice-description"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// QuestionnaireInput
// ---------------------------------------------------------------------------

type QuestionnaireInputProps = Omit<
  InputProps,
  "value" | "defaultValue" | "onValueChange"
>;

/**
 * A typed answer, alone or as "something else" beside choices. On a
 * single-choice question typing clears the picked choice, and picking a
 * choice clears the text. Name it with `aria-label`.
 */
function QuestionnaireInput({ className, ...props }: QuestionnaireInputProps) {
  const { answer, error, multiple, name } =
    useItemContext("QuestionnaireInput");
  const { setAnswer } = useQuestionnaireContext("QuestionnaireInput");
  const handleValueChange = useCallback(
    (text: string) => {
      const choices = multiple || text === "" ? answer.choices : [];
      setAnswer(name, { choices, text });
    },
    [answer.choices, multiple, name, setAnswer]
  );
  return (
    <Input
      aria-invalid={error ? true : undefined}
      className={className}
      data-slot="questionnaire-input"
      name={`${name}-text`}
      onValueChange={handleValueChange}
      value={answer.text}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// QuestionnaireError
// ---------------------------------------------------------------------------

type QuestionnaireErrorProps = React.ComponentProps<"p">;

/**
 * Why the question can't be left yet. It is a polite live region, so the
 * message is announced when it appears.
 */
function QuestionnaireError({
  children,
  className,
  ...props
}: QuestionnaireErrorProps) {
  const { error, errorId } = useItemContext("QuestionnaireError");
  return (
    <p
      aria-live="polite"
      className={cn("text-destructive text-sm empty:hidden", className)}
      data-slot="questionnaire-error"
      id={errorId}
      {...props}
    >
      {error ? (children ?? error) : null}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type QuestionnaireActionsProps = React.ComponentProps<"div">;

/** The navigation row: previous at the start; skip and next at the end. */
function QuestionnaireActions({
  className,
  ...props
}: QuestionnaireActionsProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3",
        className
      )}
      data-slot="questionnaire-actions"
      {...props}
    />
  );
}

type QuestionnaireButtonProps = Omit<ButtonProps, "type">;

/** Back to the previous question; kept in place but hidden on the first. */
function QuestionnairePrevious({
  children,
  className,
  onClick,
  ...props
}: QuestionnaireButtonProps) {
  const { isFirst, previous } = useQuestionnaireContext(
    "QuestionnairePrevious"
  );
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      previous();
    },
    [onClick, previous]
  );
  return (
    <Button
      className={cn(
        "col-start-1 row-start-1 justify-self-start",
        isFirst && "invisible",
        className
      )}
      data-slot="questionnaire-previous"
      inert={isFirst}
      onClick={handleClick}
      size="sm"
      type="button"
      {...props}
    >
      {children ?? "Previous"}
    </Button>
  );
}

/** Leaves an optional question unanswered and moves on. */
function QuestionnaireSkip({
  children,
  className,
  onClick,
  ...props
}: QuestionnaireButtonProps) {
  const { activeName, isLast, items, skip } =
    useQuestionnaireContext("QuestionnaireSkip");
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      skip();
    },
    [onClick, skip]
  );
  const required = items.find((item) => item.name === activeName)?.required;
  if (isLast || required !== false) {
    return null;
  }
  return (
    <Button
      className={cn("col-start-2 row-start-1", className)}
      data-slot="questionnaire-skip"
      onClick={handleClick}
      size="sm"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? "Skip"}
    </Button>
  );
}

/** Checks the answer and moves to the next question. */
function QuestionnaireNext({
  children,
  className,
  onClick,
  ...props
}: QuestionnaireButtonProps) {
  const { isLast, next } = useQuestionnaireContext("QuestionnaireNext");
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);
      next();
    },
    [next, onClick]
  );
  if (isLast) {
    return null;
  }
  return (
    <Button
      className={cn("col-start-3 row-start-1", className)}
      data-slot="questionnaire-next"
      onClick={handleClick}
      size="sm"
      type="button"
      variant="primary"
      {...props}
    >
      {children ?? "Next"}
    </Button>
  );
}

/** Submits, on the last question. */
function QuestionnaireSubmit({
  children,
  className,
  ...props
}: QuestionnaireButtonProps) {
  const { isLast } = useQuestionnaireContext("QuestionnaireSubmit");
  if (!isLast) {
    return null;
  }
  return (
    <Button
      className={cn("col-start-3 row-start-1", className)}
      data-slot="questionnaire-submit"
      size="sm"
      type="submit"
      variant="primary"
      {...props}
    >
      {children ?? "Submit"}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// useQuestionnaire
// ---------------------------------------------------------------------------

/** The answers so far and the current question, inside a `Questionnaire`. */
function useQuestionnaire() {
  const { activeName, items, position, submitted, values } =
    useQuestionnaireContext("useQuestionnaire");
  return {
    activeItem: activeName,
    position,
    submitted,
    total: items.length,
    values,
  };
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type {
  QuestionnaireActionsProps,
  QuestionnaireAnswer,
  QuestionnaireButtonProps,
  QuestionnaireChoiceDescriptionProps,
  QuestionnaireChoiceProps,
  QuestionnaireChoicesProps,
  QuestionnaireDescriptionProps,
  QuestionnaireErrorProps,
  QuestionnaireInputProps,
  QuestionnaireItemProps,
  QuestionnaireProgressProps,
  QuestionnaireProps,
  QuestionnaireTitleProps,
  QuestionnaireValues,
};
export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  useQuestionnaire,
};
