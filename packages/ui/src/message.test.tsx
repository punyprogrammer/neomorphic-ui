import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Bubble, BubbleContent } from "./bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./message";

describe("Message", () => {
  it("lays out an avatar beside the content", () => {
    render(
      <MessageGroup data-testid="group">
        <Message data-testid="message">
          <MessageAvatar data-testid="avatar">MC</MessageAvatar>
          <MessageContent>
            <MessageHeader>Maya Chen</MessageHeader>
            <Bubble variant="secondary">
              <BubbleContent>Morning!</BubbleContent>
            </Bubble>
            <MessageFooter>09:12</MessageFooter>
          </MessageContent>
        </Message>
      </MessageGroup>
    );
    const message = screen.getByTestId("message");
    expect(message).toHaveAttribute("data-slot", "message");
    expect(message).toHaveAttribute("data-align", "start");
    expect(screen.getByTestId("avatar")).toHaveClass("self-end");
    expect(screen.getByText("Maya Chen")).toHaveAttribute(
      "data-slot",
      "message-header"
    );
    expect(screen.getByText("09:12")).toHaveAttribute(
      "data-slot",
      "message-footer"
    );
    expect(screen.getByTestId("group")).toHaveAttribute(
      "data-slot",
      "message-group"
    );
  });

  it("mirrors your own messages", () => {
    render(
      <Message align="end" data-testid="message">
        <MessageContent>
          <Bubble>
            <BubbleContent>Yes, row F.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    );
    const message = screen.getByTestId("message");
    expect(message).toHaveAttribute("data-align", "end");
    expect(message).toHaveClass("data-[align=end]:flex-row-reverse");
  });
});
