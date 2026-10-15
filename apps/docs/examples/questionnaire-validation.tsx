"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  type QuestionnaireAnswer,
  QuestionnaireChoice,
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
} from "@neomorphic-react/ui/questionnaire";

function shortEnough(answer: QuestionnaireAnswer) {
  return answer.text.length > 80 ? "Keep it under 80 characters." : undefined;
}

export default function QuestionnaireValidation() {
  return (
    <Questionnaire className="max-w-sm">
      <QuestionnaireProgress />
      <QuestionnaireItem name="rating" required>
        <QuestionnaireTitle>How was your delivery?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="great">
            On time and intact
          </QuestionnaireChoice>
          <QuestionnaireChoice value="late">Late</QuestionnaireChoice>
          <QuestionnaireChoice value="damaged">Damaged</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="courier">
        <QuestionnaireTitle>
          Would you use this courier again?
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="yes">Yes</QuestionnaireChoice>
          <QuestionnaireChoice value="no">No</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="comment" validate={shortEnough}>
        <QuestionnaireTitle>Anything we should pass on?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Up to 80 characters.
        </QuestionnaireDescription>
        <QuestionnaireInput aria-label="Comment" placeholder="Optional" />
        <QuestionnaireError />
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
