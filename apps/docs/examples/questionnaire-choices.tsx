"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@neomorphic-react/ui/questionnaire";

export default function QuestionnaireChoicesExample() {
  return (
    <Questionnaire className="max-w-sm">
      <QuestionnaireProgress />
      <QuestionnaireItem name="plan">
        <QuestionnaireTitle>How will you use the workspace?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="personal">
            On my own
            <QuestionnaireChoiceDescription>
              Notes, plans and side projects
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="team">
            With my team
            <QuestionnaireChoiceDescription>
              Shared docs, tasks and reviews
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireInput
          aria-label="Something else"
          placeholder="Something else…"
        />
      </QuestionnaireItem>
      <QuestionnaireItem multiple name="tools">
        <QuestionnaireTitle>Which tools should we connect?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Pick any that apply.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="calendar">Calendar</QuestionnaireChoice>
          <QuestionnaireChoice value="email">Email</QuestionnaireChoice>
          <QuestionnaireChoice value="chat">Team chat</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Finish</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
