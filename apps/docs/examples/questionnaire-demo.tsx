"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@neomorphic-react/ui/questionnaire";

export default function QuestionnaireDemo() {
  return (
    <Questionnaire className="max-w-sm">
      <QuestionnaireProgress />
      <QuestionnaireItem name="trip" required>
        <QuestionnaireTitle>
          What kind of trip are you planning?
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="beach">Beach</QuestionnaireChoice>
          <QuestionnaireChoice value="city">City break</QuestionnaireChoice>
          <QuestionnaireChoice value="mountains">Mountains</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="when">
        <QuestionnaireTitle>When would you like to go?</QuestionnaireTitle>
        <QuestionnaireInput aria-label="Dates" placeholder="e.g. late June" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  );
}
