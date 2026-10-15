"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
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
import { MoonStar } from "lucide-react";
import { useState } from "react";

import { useChat } from "./chat-state";

const REST = [
  { value: "well", label: "Well rested", note: "Clear and steady", score: 85 },
  { value: "okay", label: "Okay", note: "Fine, a little flat", score: 60 },
  {
    value: "tired",
    label: "A little tired",
    note: "Heavy by evening",
    score: 40,
  },
  {
    value: "empty",
    label: "Running on empty",
    note: "Hard to focus",
    score: 20,
  },
];

const BARRIERS = ["Phone", "Work", "Racing thoughts", "Noise"];

const QUIET = "normal-case tracking-normal";

export function Checkin() {
  const { busy, submitCheckin } = useChat();
  const [saved, setSaved] = useState<string | null>(null);

  if (saved) {
    return (
      <Alert variant="success">
        <MoonStar />
        <AlertTitle>Check-in saved</AlertTitle>
        <AlertDescription>
          Tonight's rest is on your week chart. {saved}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-lg" size="sm">
      <CardHeader>
        <CardTitle>Evening check-in</CardTitle>
        <CardDescription>
          Three quick questions, all optional but the first
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Questionnaire
          onSubmit={(values) => {
            const rest =
              REST.find((r) => r.value === values.rest?.choices[0]) ??
              (REST[1] as (typeof REST)[number]);
            const barriers = [
              ...(values.barriers?.choices ?? []),
              values.barriers?.text.trim(),
            ].filter(Boolean);
            const intention = values.intention?.text.trim();
            const summary = [
              `Check-in: feeling ${rest.label.toLowerCase()}.`,
              barriers.length
                ? `What got in the way: ${barriers.join(", ").toLowerCase()}.`
                : "",
              intention ? `Tomorrow I'd like to: ${intention}.` : "",
            ]
              .filter(Boolean)
              .join(" ");
            setSaved(rest.note);
            submitCheckin(summary, rest.score);
          }}
          shortcuts
        >
          <QuestionnaireProgress />

          <QuestionnaireItem name="rest" required>
            <QuestionnaireTitle>
              How rested do you feel tonight?
            </QuestionnaireTitle>
            <QuestionnaireChoices className="sm:grid-cols-2">
              {REST.map((option) => (
                <QuestionnaireChoice key={option.value} value={option.value}>
                  {option.label}
                  <QuestionnaireChoiceDescription>
                    {option.note}
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
              ))}
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem multiple name="barriers">
            <QuestionnaireTitle>What got in the way?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Pick any that fit.
            </QuestionnaireDescription>
            <QuestionnaireChoices className="sm:grid-cols-2">
              {BARRIERS.map((barrier) => (
                <QuestionnaireChoice key={barrier} value={barrier}>
                  {barrier}
                </QuestionnaireChoice>
              ))}
            </QuestionnaireChoices>
            <QuestionnaireInput
              aria-label="Something else"
              placeholder="Something else…"
            />
          </QuestionnaireItem>

          <QuestionnaireItem name="intention">
            <QuestionnaireTitle>
              One small intention for tomorrow?
            </QuestionnaireTitle>
            <QuestionnaireInput
              aria-label="Intention for tomorrow"
              placeholder="e.g. a walk before lunch"
            />
          </QuestionnaireItem>

          <QuestionnaireActions>
            <QuestionnairePrevious className={QUIET} />
            <QuestionnaireSkip className={QUIET} />
            <QuestionnaireNext className={QUIET} />
            <QuestionnaireSubmit className={QUIET} disabled={busy}>
              Save check-in
            </QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      </CardContent>
    </Card>
  );
}
