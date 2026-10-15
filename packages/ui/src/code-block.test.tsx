import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CodeBlockWrapButton,
} from "./code-block";
import { useHighlightedCode } from "./use-highlighted-code";

const CODE = "const a = 1;\n\nconsole.log(a);\n";

describe("CodeBlock", () => {
  it("is an inset well with a focusable, left-to-right code region", () => {
    render(
      <CodeBlock data-testid="block">
        <CodeBlockContent>{CODE}</CodeBlockContent>
      </CodeBlock>
    );
    expect(screen.getByTestId("block")).toHaveClass(
      "inset-shadow-neu",
      "shadow-neu-flat",
      "bg-background"
    );
    const pre = screen.getByText((_, element) => element?.tagName === "PRE");
    expect(pre).toHaveAttribute("tabindex", "0");
    expect(pre).toHaveAttribute("dir", "ltr");
  });

  it("splits a string into numbered lines from startLine", () => {
    const { container } = render(
      <CodeBlock>
        <CodeBlockContent lineNumbers startLine={10}>
          {CODE}
        </CodeBlockContent>
      </CodeBlock>
    );
    const lines = container.querySelectorAll("[data-slot=code-block-line]");
    // The trailing newline doesn't add a line; the blank line keeps a newline.
    expect(lines).toHaveLength(3);
    expect(lines[1]).toHaveTextContent("");
    const pre = container.querySelector("pre");
    expect(pre).toHaveAttribute("data-numbered");
    expect(pre?.style.counterReset).toBe("line 9");
  });

  it("marks diff and highlighted lines", () => {
    render(
      <CodeBlock>
        <CodeBlockContent>
          <CodeBlockLine variant="removed">old()</CodeBlockLine>
          <CodeBlockLine variant="added">fresh()</CodeBlockLine>
          <CodeBlockLine variant="highlighted">look()</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    );
    expect(screen.getByText("old()").parentElement).toHaveClass(
      "after:content-['−']"
    );
    expect(screen.getByText("fresh()").parentElement).toHaveClass(
      "after:content-['+']"
    );
    expect(screen.getByText("look()").parentElement).toHaveAttribute(
      "data-variant",
      "highlighted"
    );
  });

  it("copies the code and toggles wrapping", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const { container } = render(
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>app.ts</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockWrapButton />
            <CodeBlockCopyButton value={CODE} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>{CODE}</CodeBlockContent>
      </CodeBlock>
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith(CODE);
    expect(
      await screen.findByRole("button", { name: "Copied" })
    ).toHaveAttribute("data-copied", "true");

    const wrap = screen.getByRole("button", { name: "Wrap lines" });
    expect(wrap).toHaveAttribute("aria-pressed", "false");
    await user.click(wrap);
    expect(wrap).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector("pre")).toHaveAttribute("data-wrap");
  });

  it("clips long code behind a Show more button", async () => {
    const user = userEvent.setup();
    const long = Array.from({ length: 12 }, (_, i) => `line ${i + 1}`).join(
      "\n"
    );
    const { container } = render(
      <CodeBlock>
        <CodeBlockContent maxLines={5}>{long}</CodeBlockContent>
      </CodeBlock>
    );
    const pre = container.querySelector("pre");
    expect(pre).toHaveAttribute("data-clipped");
    const toggle = screen.getByRole("button", { name: "Show 7 more lines" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", pre?.id);
    await user.click(toggle);
    expect(pre).not.toHaveAttribute("data-clipped");
    expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});

describe("useHighlightedCode", () => {
  it("returns plain lines, then coloured tokens", async () => {
    const { result } = renderHook(() =>
      useHighlightedCode("const a = 1;\nlet b;", { language: "ts" })
    );
    expect(result.current.status).toBe("loading");
    expect(result.current.lines).toEqual(["const a = 1;", "let b;"]);
    await waitFor(() => expect(result.current.status).toBe("ready"), {
      timeout: 10_000,
    });
    expect(result.current.lines).toHaveLength(2);
    const { container } = render(<div>{result.current.lines[0]}</div>);
    const spans = container.querySelectorAll("span[style]");
    expect(spans.length).toBeGreaterThan(1);
    expect(container).toHaveTextContent("const a = 1;");
  });

  it("falls back to plain lines for an unknown language", async () => {
    const { result } = renderHook(() =>
      useHighlightedCode("x", { language: "not-a-language" })
    );
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.lines).toEqual(["x"]);
  });
});
