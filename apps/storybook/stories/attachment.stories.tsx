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
} from "@neomorphic-react/ui/attachment";
import { Spinner } from "@neomorphic-react/ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FileText,
  FileWarning,
  ImageIcon,
  Paperclip,
  RotateCw,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { landscape } from "../blocks/images";

const meta = {
  title: "Components/Attachment",
  component: Attachment,
  parameters: {
    docs: {
      description: {
        component: `
A file tile for a composer or a message: \`AttachmentMedia\` (an icon,
\`Spinner\` or thumbnail in a small well), \`AttachmentContent\` with a title
and description, and \`AttachmentActions\`. An \`AttachmentTrigger\` covers
the tile so a click anywhere opens the file; actions stay above it.

\`\`\`tsx
import {
  Attachment, AttachmentAction, AttachmentActions, AttachmentContent,
  AttachmentDescription, AttachmentMedia, AttachmentTitle,
} from "@neomorphic-react/ui/attachment";

<Attachment state="uploading">
  <AttachmentMedia><Spinner aria-hidden className="size-4" /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>report.pdf</AttachmentTitle>
    <AttachmentDescription>Uploading… 40%</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Cancel upload" icon={<X />} />
  </AttachmentActions>
</Attachment>
\`\`\`

\`state\` is \`idle\` (picked, not sent: pressed in), \`uploading\` and
\`processing\` (the title shimmers), \`error\` or \`done\`. Say what went wrong
in the description, not only with colour. \`AttachmentProgress\` adds a thin
bar; \`AttachmentGroup\` is a sideways-scrolling row that snaps to each tile.
`,
      },
    },
  },
  args: { state: "done", size: "default", orientation: "horizontal" },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
    size: { control: "inline-radio", options: ["default", "sm", "xs"] },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10">
      <Attachment {...args}>
        <AttachmentMedia>
          <FileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction
            aria-label="Remove quarterly-report.pdf"
            icon={<X />}
          />
        </AttachmentActions>
      </Attachment>
    </div>
  ),
};

/** Each state, with its text saying what is happening. */
export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4 p-10">
      <Attachment state="idle">
        <AttachmentMedia>
          <Paperclip />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>notes.txt</AttachmentTitle>
          <AttachmentDescription>Ready to send</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>holiday.mov</AttachmentTitle>
          <AttachmentDescription>Uploading… 40%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentProgress aria-label="Uploading holiday.mov" value={40} />
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <Spinner aria-hidden="true" className="size-4" size="sm" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>budget.xlsx</AttachmentTitle>
          <AttachmentDescription>Reading the sheet…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <FileWarning />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>raw-footage.mov</AttachmentTitle>
          <AttachmentDescription>
            Too large: the limit is 100 MB
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction
            aria-label="Retry raw-footage.mov"
            icon={<RotateCw />}
          />
        </AttachmentActions>
      </Attachment>
      <Attachment state="done">
        <AttachmentMedia>
          <FileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>contract.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 180 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("progressbar", { name: "Uploading holiday.mov" })
    ).toHaveAttribute("aria-valuenow", "40");
    await expect(
      canvas.getByText("Too large: the limit is 100 MB")
    ).toBeVisible();
  },
};

/** `sm` and `xs`, for tighter rows. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 p-10">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia>
            <FileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{`brief-${size}.pdf`}</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  ),
};

const PHOTOS = [
  ["beach.jpg", landscape("#9cc9e8", "#f1dfb2", "#7aa98c")],
  ["dunes.jpg", landscape("#f3c58c", "#f6e3c0", "#c98b5b")],
  ["lake.jpg", landscape("#b7d4f2", "#d6e7d0", "#5f8f78")],
  ["hills.jpg", landscape("#d7c4ef", "#efe2cf", "#8c7aa8")],
  ["coast.jpg", landscape("#a8d8dc", "#f2e6c9", "#6b9a9e")],
] as const;

function RemovableTile({
  name,
  onRemove,
  onOpen,
  src,
}: {
  name: string;
  onOpen: (name: string) => void;
  onRemove: (name: string) => void;
  src: string;
}) {
  const remove = useCallback(() => onRemove(name), [name, onRemove]);
  const open = useCallback(() => onOpen(name), [name, onOpen]);
  return (
    <Attachment orientation="vertical">
      <AttachmentTrigger aria-label={`Open ${name}`} onClick={open} />
      <AttachmentMedia variant="image">
        <img alt="" height={96} src={src} width={96} />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{name}</AttachmentTitle>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Remove ${name}`}
          icon={<X />}
          onClick={remove}
        />
      </AttachmentActions>
    </Attachment>
  );
}

function Composer({ onOpen }: { onOpen: (name: string) => void }) {
  const [names, setNames] = useState<string[]>(PHOTOS.map(([name]) => name));
  const remove = useCallback(
    (name: string) => setNames((current) => current.filter((n) => n !== name)),
    []
  );
  return (
    <div className="w-[26rem] p-8">
      <AttachmentGroup aria-label="Attached photos" role="list">
        {PHOTOS.filter(([name]) => names.includes(name)).map(([name, src]) => (
          <div className="flex-none snap-start" key={name} role="listitem">
            <RemovableTile
              name={name}
              onOpen={onOpen}
              onRemove={remove}
              src={src}
            />
          </div>
        ))}
      </AttachmentGroup>
    </div>
  );
}

/**
 * Vertical thumbnails in an `AttachmentGroup`: the row scrolls sideways and
 * snaps. Each tile opens on click; the remove button sits above that.
 */
export const Group: Story = {
  args: { onClick: fn() },
  render: ({ onClick }) => (
    <Composer onOpen={onClick as unknown as (name: string) => void} />
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list", { name: "Attached photos" });
    await expect(within(list).getAllByRole("listitem")).toHaveLength(5);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open beach.jpg" })
    );
    await expect(args.onClick).toHaveBeenCalledWith("beach.jpg");
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove dunes.jpg" })
    );
    await expect(within(list).getAllByRole("listitem")).toHaveLength(4);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** An image while it uploads: dimmed until done. */
export const ImageUploading: Story = {
  render: () => (
    <div className="p-10">
      <Attachment orientation="vertical" state="uploading">
        <AttachmentMedia variant="image">
          <img alt="" height={96} src={PHOTOS[2][1]} width={96} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>lake.jpg</AttachmentTitle>
          <AttachmentDescription>
            <ImageIcon aria-hidden="true" className="me-1 inline size-3" />
            68%
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentProgress aria-label="Uploading lake.jpg" value={68} />
      </Attachment>
    </div>
  ),
};
