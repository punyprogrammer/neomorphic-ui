"use client";

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@neomorphic-react/ui/bubble";
import { useState } from "react";

const suggestions = ["Sounds good", "Can we do 7?", "I'll call you"];

export default function BubbleSuggestions() {
  const [reply, setReply] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble variant="secondary">
        <BubbleContent>Dinner at 6:30 before the show?</BubbleContent>
      </Bubble>
      {reply ? (
        <Bubble align="end">
          <BubbleContent>{reply}</BubbleContent>
        </Bubble>
      ) : (
        <BubbleGroup
          aria-label="Suggested replies"
          className="items-end"
          role="group"
        >
          {suggestions.map((suggestion) => (
            <Bubble align="end" key={suggestion} variant="outline">
              <BubbleContent
                onClick={() => setReply(suggestion)}
                render={<button type="button" />}
              >
                {suggestion}
              </BubbleContent>
            </Bubble>
          ))}
        </BubbleGroup>
      )}
    </div>
  );
}
