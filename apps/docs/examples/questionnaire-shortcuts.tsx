"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@neomorphic-react/ui/questionnaire";

export default function QuestionnaireShortcuts() {
  return (
    <Questionnaire className="max-w-sm" shortcuts>
      <QuestionnaireProgress />
      <QuestionnaireItem name="role">
        <QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Press a number to choose.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
          <QuestionnaireChoice value="engineering">
            Engineering
          </QuestionnaireChoice>
          <QuestionnaireChoice value="product">Product</QuestionnaireChoice>
          <QuestionnaireChoice value="research">Research</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem multiple name="topics">
        <QuestionnaireTitle>
          What would you like to hear about?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Press a number to turn a topic on or off.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="releases">
            New releases
          </QuestionnaireChoice>
          <QuestionnaireChoice value="events">
            Events near you
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tips">
            Tips and guides
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  );
}
