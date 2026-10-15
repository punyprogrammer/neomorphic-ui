"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
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
import { useState } from "react";

export default function QuestionnaireInContext() {
  const [result, setResult] = useState<QuestionnaireValues | null>(null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Set up your workspace</CardTitle>
        <CardDescription>Three questions, about a minute.</CardDescription>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="grid gap-4 text-sm">
            <p>
              {result.name.text} is ready for{" "}
              {result.team.choices.includes("team") ? "your team" : "you"}.
            </p>
            <Button
              className="justify-self-start"
              onClick={() => setResult(null)}
              size="sm"
            >
              Start again
            </Button>
          </div>
        ) : (
          <Questionnaire onSubmit={setResult} shortcuts>
            <QuestionnaireProgress>
              {(step, total) => `Step ${step} of ${total}`}
            </QuestionnaireProgress>
            <QuestionnaireItem name="team" required>
              <QuestionnaireTitle>Who's it for?</QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="personal">
                  Just me
                  <QuestionnaireChoiceDescription>
                    Free for ever
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="team">
                  My team
                  <QuestionnaireChoiceDescription>
                    Up to 20 people
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="import">
              <QuestionnaireTitle>
                Bring in work from another app?
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="trello">Trello</QuestionnaireChoice>
                <QuestionnaireChoice value="asana">Asana</QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
            <QuestionnaireItem name="name" required>
              <QuestionnaireTitle>What should we call it?</QuestionnaireTitle>
              <QuestionnaireInput
                aria-label="Workspace name"
                placeholder="Acme design"
              />
              <QuestionnaireError>
                Give your workspace a name.
              </QuestionnaireError>
            </QuestionnaireItem>
            <QuestionnaireActions>
              <QuestionnairePrevious />
              <QuestionnaireSkip />
              <QuestionnaireNext />
              <QuestionnaireSubmit>Create workspace</QuestionnaireSubmit>
            </QuestionnaireActions>
          </Questionnaire>
        )}
      </CardContent>
    </Card>
  );
}
