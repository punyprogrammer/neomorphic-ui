"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  type QuestionnaireValues,
} from "@neomorphic-react/ui/questionnaire";

function hasPets(values: QuestionnaireValues) {
  return "pets" in values && values.pets.choices.includes("yes");
}

export default function QuestionnaireConditional() {
  return (
    <Questionnaire className="max-w-sm">
      <QuestionnaireProgress />
      <QuestionnaireItem name="pets" required>
        <QuestionnaireTitle>Will any pets be staying?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="yes">Yes</QuestionnaireChoice>
          <QuestionnaireChoice value="no">No</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem multiple name="petTypes" required when={hasPets}>
        <QuestionnaireTitle>Which pets?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="dog">Dog</QuestionnaireChoice>
          <QuestionnaireChoice value="cat">Cat</QuestionnaireChoice>
          <QuestionnaireChoice value="other">
            Something else
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="arrival" required>
        <QuestionnaireTitle>When will you arrive?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="morning">Before noon</QuestionnaireChoice>
          <QuestionnaireChoice value="afternoon">
            12:00 to 18:00
          </QuestionnaireChoice>
          <QuestionnaireChoice value="evening">After 18:00</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Book</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
