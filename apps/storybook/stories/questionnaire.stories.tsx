import {
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
  type QuestionnaireValues,
} from "@neomorphic-react/ui/questionnaire";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

const TRIP = /What kind of trip/;
const TRAVELLERS = /Who's coming/;
const KIDS = /How old are the children/;
const EXTRAS = /Anything to add/;
const NOTES = /Anything else/;
const BEACH = /Beach/;
const CITY = /City break/;

function withKids(values: QuestionnaireValues) {
  return "travellers" in values && values.travellers.choices.includes("family");
}

function lengthCheck(answer: { text: string }) {
  return answer.text.length > 120 ? "Keep it under 120 characters." : undefined;
}

function TripSurvey(props: Partial<ComponentProps<typeof Questionnaire>>) {
  return (
    <Questionnaire className="w-[26rem]" shortcuts {...props}>
      <QuestionnaireProgress />

      <QuestionnaireItem name="trip" required>
        <QuestionnaireTitle>
          What kind of trip are you planning?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          We'll suggest places that fit.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="beach">
            Beach
            <QuestionnaireChoiceDescription>
              Sun, sand and a book
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="city">
            City break
            <QuestionnaireChoiceDescription>
              Museums, food and late nights
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="mountains">Mountains</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireInput
          aria-label="Something else"
          placeholder="Something else…"
        />
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="travellers" required>
        <QuestionnaireTitle>Who's coming?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="solo">Just me</QuestionnaireChoice>
          <QuestionnaireChoice value="couple">Two of us</QuestionnaireChoice>
          <QuestionnaireChoice value="family">
            Family with children
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="kids" when={withKids}>
        <QuestionnaireTitle>How old are the children?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Pick all that apply.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="toddler">Under 4</QuestionnaireChoice>
          <QuestionnaireChoice value="child">4–11</QuestionnaireChoice>
          <QuestionnaireChoice value="teen">12–17</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem multiple name="extras">
        <QuestionnaireTitle>Anything to add?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick any, or skip.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="car">Car hire</QuestionnaireChoice>
          <QuestionnaireChoice value="insurance">
            Travel insurance
          </QuestionnaireChoice>
          <QuestionnaireChoice value="lounge">
            Lounge access
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="notes" validate={lengthCheck}>
        <QuestionnaireTitle>Anything else we should know?</QuestionnaireTitle>
        <QuestionnaireInput aria-label="Notes" placeholder="Optional" />
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Show suggestions</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}

const meta = {
  title: "Components/Questionnaire",
  component: Questionnaire,
  parameters: {
    docs: {
      description: {
        component: `
A multi-step form that asks one question at a time. Each
\`QuestionnaireItem\` is a \`<fieldset>\` named by its \`QuestionnaireTitle\`;
fixed answers are raised choice cards (a radio group, or checkboxes with
\`multiple\`) that press in when picked, and \`QuestionnaireInput\` takes a
typed answer. \`QuestionnaireProgress\` and \`QuestionnaireActions\` (previous,
skip, next, submit) sit around them.

\`\`\`tsx
import {
  Questionnaire, QuestionnaireActions, QuestionnaireChoice,
  QuestionnaireChoices, QuestionnaireError, QuestionnaireItem,
  QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress,
  QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle,
} from "@neomorphic-react/ui/questionnaire";

<Questionnaire onSubmit={(values) => save(values)} shortcuts>
  <QuestionnaireProgress />
  <QuestionnaireItem name="trip" required>
    <QuestionnaireTitle>What kind of trip?</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="beach">Beach</QuestionnaireChoice>
      <QuestionnaireChoice value="city">City break</QuestionnaireChoice>
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>
\`\`\`

- **Validation**: \`required\` questions need an answer before Next; add
  \`validate\` for your own rules. The message is announced and focus moves
  to the first choice.
- **Conditional steps**: \`when={(values) => …}\` asks a question only when
  earlier answers call for it; it's left out of the progress and the result.
- **Resuming**: \`defaultValues\` and \`defaultActiveItem\` pick up where the
  reader left off; \`onValuesChange\` lets you save as they go.
- **Keyboard**: with \`shortcuts\`, number keys pick choices (each card shows
  its key); arrow keys move between radios; Enter in a text answer moves on.
  Focus moves to each new question so its title is read.
`,
      },
    },
  },
  args: { onSubmit: fn(), onValuesChange: fn() },
} satisfies Meta<typeof Questionnaire>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Validation, a conditional step, number keys and submitting. */
export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <TripSurvey
        onSubmit={args.onSubmit}
        onValuesChange={args.onValuesChange}
      />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("progressbar", { name: "Question 1 of 4" })
    ).toBeInTheDocument();
    await expect(canvas.getByRole("group", { name: TRIP })).toBeVisible();

    // A required question blocks Next until answered.
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByText("Choose an answer to continue.")
    ).toBeVisible();
    await expect(canvas.getByRole("radio", { name: BEACH })).toHaveFocus();

    // Number keys pick a choice.
    await userEvent.keyboard("2");
    await expect(canvas.getByRole("radio", { name: CITY })).toBeChecked();
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));

    // "Family" adds the children question.
    await expect(canvas.getByRole("group", { name: TRAVELLERS })).toHaveFocus();
    await userEvent.keyboard("3");
    await expect(
      canvas.getByRole("progressbar", { name: "Question 2 of 5" })
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(canvas.getByRole("group", { name: KIDS })).toBeVisible();
    await userEvent.click(canvas.getByText("4–11"));
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));

    // Optional questions can be skipped.
    await expect(canvas.getByRole("group", { name: EXTRAS })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Skip" }));

    await expect(canvas.getByRole("group", { name: NOTES })).toBeVisible();
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Notes" }),
      "Quiet rooms please"
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Show suggestions" })
    );
    await expect(args.onSubmit).toHaveBeenCalledWith(
      {
        extras: { choices: [], text: "" },
        kids: { choices: ["child"], text: "" },
        notes: { choices: [], text: "Quiet rooms please" },
        travellers: { choices: ["family"], text: "" },
        trip: { choices: ["city"], text: "" },
      },
      expect.anything()
    );
    await expect(canvas.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100"
    );
  },
};

/** Resumed from saved answers, on the last question. */
export const Resumed: Story = {
  render: (args) => (
    <div className="p-10">
      <TripSurvey
        defaultActiveItem="notes"
        defaultValues={{
          trip: { choices: ["mountains"], text: "" },
          travellers: { choices: ["couple"], text: "" },
          extras: { choices: ["car", "insurance"], text: "" },
        }}
        onSubmit={args.onSubmit}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("progressbar", { name: "Question 4 of 4" })
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
    await expect(
      canvas.getByRole("checkbox", { name: "Car hire" })
    ).toBeChecked();
    await expect(
      canvas.getByRole("checkbox", { name: "Lounge access" })
    ).not.toBeChecked();
  },
};

/** A typed answer instead of the listed ones, and a custom rule. */
export const TypedAnswer: Story = {
  render: (args) => (
    <div className="p-10">
      <TripSurvey defaultActiveItem="trip" onSubmit={args.onSubmit} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Beach"));
    const other = canvas.getByRole("textbox", { name: "Something else" });
    await userEvent.type(other, "Road trip");
    // Typing replaces the picked card on a single-choice question.
    await expect(canvas.getByRole("radio", { name: BEACH })).not.toBeChecked();
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByRole("group", { name: TRAVELLERS })).toBeVisible();
  },
};
