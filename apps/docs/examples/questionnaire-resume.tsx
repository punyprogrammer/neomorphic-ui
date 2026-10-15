"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  type QuestionnaireValues,
} from "@neomorphic-react/ui/questionnaire";
import { useState } from "react";

const saved: QuestionnaireValues = {
  size: { choices: ["medium"], text: "" },
  frequency: { choices: ["fortnightly"], text: "" },
};

export default function QuestionnaireResume() {
  const [savedAt, setSavedAt] = useState<string | null>(null);

  return (
    <Questionnaire
      className="max-w-sm"
      defaultActiveItem="notes"
      defaultValues={saved}
      onValuesChange={() => setSavedAt(new Date().toLocaleTimeString())}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="size" required>
        <QuestionnaireTitle>How big should your veg box be?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="small">
            Small, for 1 to 2 people
          </QuestionnaireChoice>
          <QuestionnaireChoice value="medium">
            Medium, for 3 to 4
          </QuestionnaireChoice>
          <QuestionnaireChoice value="large">
            Large, for 5 or more
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="frequency" required>
        <QuestionnaireTitle>How often should it arrive?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="weekly">Every week</QuestionnaireChoice>
          <QuestionnaireChoice value="fortnightly">
            Every two weeks
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="notes">
        <QuestionnaireTitle>Anything you'd rather not get?</QuestionnaireTitle>
        <QuestionnaireInput
          aria-label="Foods to leave out"
          placeholder="e.g. no mushrooms"
        />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Save preferences</QuestionnaireSubmit>
      </QuestionnaireActions>
      <p className="text-muted-foreground text-xs" role="status">
        {savedAt ? `Draft saved at ${savedAt}` : "Picked up where you left off"}
      </p>
    </Questionnaire>
  );
}
