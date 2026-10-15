import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentProgress,
  AttachmentTitle,
  AttachmentTrigger,
} from "./attachment";

describe("Attachment", () => {
  it("is a raised, done, horizontal tile by default", () => {
    render(
      <Attachment data-testid="tile">
        <AttachmentMedia>PDF</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>report.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    );
    const tile = screen.getByTestId("tile");
    expect(tile).toHaveAttribute("data-state", "done");
    expect(tile).toHaveAttribute("data-orientation", "horizontal");
    expect(tile).toHaveAttribute("data-size", "default");
    expect(tile).toHaveClass(
      "bg-neu-convex",
      "shadow-neu-sm",
      "inset-shadow-neu-flat"
    );
  });

  it("shimmers the title while uploading and shows progress", () => {
    render(
      <Attachment state="uploading">
        <AttachmentContent>
          <AttachmentTitle>photo.jpg</AttachmentTitle>
          <AttachmentDescription>Uploading… 40%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentProgress aria-label="Uploading photo.jpg" value={40} />
      </Attachment>
    );
    expect(screen.getByText("photo.jpg")).toHaveClass(
      "group-data-[state=uploading]/attachment:neu-shimmer-text"
    );
    expect(
      screen.getByRole("progressbar", { name: "Uploading photo.jpg" })
    ).toHaveAttribute("aria-valuenow", "40");
  });

  it("keeps actions clickable above a full-tile trigger", async () => {
    const user = userEvent.setup();
    const open = vi.fn();
    const remove = vi.fn();
    render(
      <AttachmentGroup data-testid="group">
        <Attachment orientation="vertical" size="sm">
          <AttachmentTrigger aria-label="Open notes.txt" onClick={open} />
          <AttachmentMedia variant="image">
            <img alt="" height={40} src="data:," width={40} />
          </AttachmentMedia>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove notes.txt" onClick={remove} />
          </AttachmentActions>
        </Attachment>
      </AttachmentGroup>
    );
    const trigger = screen.getByRole("button", { name: "Open notes.txt" });
    expect(trigger).toHaveAttribute("type", "button");
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Remove notes.txt" }));
    expect(open).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledOnce();
    expect(screen.getByTestId("group")).toHaveClass(
      "snap-x",
      "overflow-x-auto"
    );
  });

  it("states errors in text as well as colour", () => {
    render(
      <Attachment data-testid="tile" state="error">
        <AttachmentContent>
          <AttachmentTitle>video.mov</AttachmentTitle>
          <AttachmentDescription>Too large to upload</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    );
    expect(screen.getByTestId("tile")).toHaveAttribute("data-state", "error");
    expect(screen.getByText("Too large to upload")).toHaveClass(
      "group-data-[state=error]/attachment:text-destructive"
    );
  });
});
