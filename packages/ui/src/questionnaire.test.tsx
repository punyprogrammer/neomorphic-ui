import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

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
} from "./questionnaire";

const ROLE = /What do you do/;
const TOOLS = /Which tools/;
const TEAM = /How big is your team/;
const NOTES = /Anything else/;
const DESIGN = /Design/;
const LEAD = /Team lead/;

function isLead(values: QuestionnaireValues) {
  return "role" in values && values.role.choices.includes("lead");
}

function Survey({
  onSubmit,
  ...props
}: Partial<React.ComponentProps<typeof Questionnaire>>) {
  return (
    <Questionnaire onSubmit={onSubmit} shortcuts {...props}>
      <QuestionnaireProgress />
      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What do you do?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick the closest.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="design">
            Design
            <QuestionnaireChoiceDescription>
              Product and visual
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="lead">Team lead</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireInput aria-label="Something else" />
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="team" when={isLead}>
        <QuestionnaireTitle>How big is your team?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="small">2–5</QuestionnaireChoice>
          <QuestionnaireChoice value="large">6+</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem multiple name="tools">
        <QuestionnaireTitle>Which tools do you use?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="figma">Figma</QuestionnaireChoice>
          <QuestionnaireChoice value="code">Code</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="notes">
        <QuestionnaireTitle>Anything else?</QuestionnaireTitle>
        <QuestionnaireInput aria-label="Notes" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  );
}

describe("Questionnaire", () => {
  it("asks one question at a time and blocks a required one", async () => {
    const user = userEvent.setup();
    render(<Survey />);
    expect(screen.getByRole("group", { name: ROLE })).toBeVisible();
    expect(screen.queryByRole("group", { name: TOOLS })).toBeNull();
    expect(
      screen.getByRole("progressbar", { name: "Question 1 of 3" })
    ).toBeInTheDocument();
    // Required questions can't be skipped, and there's nothing before them.
    expect(screen.queryByRole("button", { name: "Skip" })).toBeNull();
    expect(
      screen.getByRole("button", { hidden: true, name: "Previous" })
    ).toHaveAttribute("inert");

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(
      screen.getByText("Choose an answer to continue.")
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: DESIGN })).toHaveFocus();

    await user.click(screen.getByText("Design"));
    expect(screen.queryByText("Choose an answer to continue.")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Next" }));
    const tools = screen.getByRole("group", { name: TOOLS });
    expect(tools).toHaveFocus();
    expect(
      screen.getByRole("progressbar", { name: "Question 2 of 3" })
    ).toBeInTheDocument();
  });

  it("picks choices with number keys, showing each key", async () => {
    const user = userEvent.setup();
    render(<Survey defaultActiveItem="tools" />);
    const tools = screen.getByRole("group", { name: TOOLS });
    expect(tools).toHaveTextContent("1");
    tools.focus();
    await user.keyboard("12");
    expect(screen.getByRole("checkbox", { name: "Figma" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Code" })).toBeChecked();
    await user.keyboard("1");
    expect(screen.getByRole("checkbox", { name: "Figma" })).not.toBeChecked();
  });

  it("asks a conditional question only when it applies", async () => {
    const user = userEvent.setup();
    render(<Survey />);
    await user.click(screen.getByText("Team lead"));
    expect(
      screen.getByRole("progressbar", { name: "Question 1 of 4" })
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("group", { name: TEAM })).toBeVisible();
    // Optional: it can be skipped, and the previous question kept its answer.
    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByRole("radio", { name: LEAD })).toBeChecked();
  });

  it("swaps a picked choice for a typed answer", async () => {
    const user = userEvent.setup();
    render(<Survey />);
    await user.click(screen.getByText("Design"));
    await user.type(
      screen.getByRole("textbox", { name: "Something else" }),
      "Research{Enter}"
    );
    // Enter in the text field moves on.
    expect(screen.getByRole("group", { name: TOOLS })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByRole("radio", { name: DESIGN })).not.toBeChecked();
  });

  it("resumes and submits the answers that apply", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const saved: QuestionnaireValues = {
      role: { choices: ["design"], text: "" },
      tools: { choices: ["code"], text: "" },
    };
    render(
      <Survey
        defaultActiveItem="notes"
        defaultValues={saved}
        onSubmit={onSubmit}
      />
    );
    expect(screen.getByRole("group", { name: NOTES })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Next" })).toBeNull();
    await user.type(screen.getByRole("textbox", { name: "Notes" }), "Thanks");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith(
      {
        notes: { choices: [], text: "Thanks" },
        role: { choices: ["design"], text: "" },
        tools: { choices: ["code"], text: "" },
      },
      expect.anything()
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100"
    );
  });
});
