import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@neomorphic-ui/react/combobox";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@neomorphic-ui/react/field";
import { InputGroupAddon } from "@neomorphic-ui/react/input-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapPin } from "lucide-react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const STATIONS = [
  "Lisbon Oriente",
  "Lisbon Santa Apolónia",
  "Porto Campanhã",
  "Coimbra-B",
  "Aveiro",
  "Braga",
  "Faro",
  "Évora",
];

interface Region {
  items: string[];
  value: string;
}

const REGIONS: Region[] = [
  { value: "North", items: ["Porto Campanhã", "Braga", "Viana do Castelo"] },
  { value: "Centre", items: ["Coimbra-B", "Aveiro", "Guarda"] },
  { value: "South", items: ["Lisbon Oriente", "Faro", "Évora"] },
];

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: `
A text field that filters a list as you type. The field is an \`InputGroup\`
well; the list is a raised card whose highlighted row sinks in, and the
chosen row takes a check and the primary colour.

\`\`\`tsx
import {
  Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem,
  ComboboxList,
} from "@neomorphic-ui/react/combobox";

<Combobox items={stations}>
  <ComboboxInput aria-label="From" placeholder="Search stations" showClear />
  <ComboboxContent>
    <ComboboxEmpty>No stations found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
\`\`\`

Pass \`items\` so the list filters and \`ComboboxEmpty\` knows when nothing
matches. Groups take their own \`items\` and a \`ComboboxCollection\`. With
\`multiple\`, show the values as \`ComboboxChip\`s in \`ComboboxChips\` and
anchor the list to it with \`useComboboxAnchor()\`. For a searchable select,
put a \`ComboboxValue\` in a \`ComboboxTrigger\` and the \`ComboboxInput\`
inside the content.
`,
      },
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const FARO_RE = /Faro/;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-96 items-start justify-center p-10">
      <Field className="w-72">
        <FieldLabel htmlFor="combobox-from">From</FieldLabel>
        <Combobox items={STATIONS}>
          <ComboboxInput
            id="combobox-from"
            placeholder="Search stations"
            showClear
          >
            <InputGroupAddon>
              <MapPin />
            </InputGroupAddon>
          </ComboboxInput>
          <ComboboxContent>
            <ComboboxEmpty>No stations found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldDescription>Type part of a name, then pick one.</FieldDescription>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("combobox", { name: "From" });
    await userEvent.type(input, "lis");
    const listbox = await screen.findByRole("listbox");
    await waitFor(() =>
      expect(within(listbox).getAllByRole("option")).toHaveLength(2)
    );
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    await expect(input).toHaveValue("Lisbon Santa Apolónia");
    await userEvent.clear(input);
    await userEvent.type(input, "zzz");
    await expect(await screen.findByText("No stations found.")).toBeVisible();
    await userEvent.keyboard("{Escape}");
  },
};

export const Grouped: Story = {
  render: () => (
    <div className="flex min-h-[28rem] items-start justify-center p-10">
      <Combobox items={REGIONS}>
        <ComboboxInput aria-label="Destination" placeholder="Where to?" />
        <ComboboxContent>
          <ComboboxEmpty>No stations found.</ComboboxEmpty>
          <ComboboxList>
            {(region: Region) => (
              <ComboboxGroup items={region.items} key={region.value}>
                <ComboboxLabel>{region.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("combobox", {
      name: "Destination",
    });
    await userEvent.click(
      within(canvasElement).getByRole("button", {
        name: "Show options",
      })
    );
    const south = await screen.findByRole("group", { name: "South" });
    await waitFor(() => expect(south).toBeVisible(), { timeout: 4000 });
    await userEvent.type(input, "fa");
    await waitFor(() =>
      expect(screen.queryByRole("group", { name: "North" })).toBeNull()
    );
    await userEvent.click(screen.getByRole("option", { name: FARO_RE }));
    await expect(input).toHaveValue("Faro");
  },
};

function MultipleStops() {
  const anchor = useComboboxAnchor();
  return (
    <Combobox defaultValue={["Coimbra-B"]} items={STATIONS} multiple>
      <ComboboxChips className="w-96" ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value} removeLabel={`Remove ${value}`}>
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                aria-label="Stops"
                placeholder={values.length ? "" : "Add stops"}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No stations found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const Multiple: Story = {
  render: () => (
    <div className="flex min-h-96 items-start justify-center p-10">
      <MultipleStops />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Stops" });
    await userEvent.type(input, "ave");
    await userEvent.click(
      await screen.findByRole("option", { name: "Aveiro" })
    );
    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "Remove Aveiro" })
      ).toBeVisible()
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove Coimbra-B" })
    );
    await waitFor(() => expect(canvas.queryByText("Coimbra-B")).toBeNull());
    await userEvent.keyboard("{Escape}");
  },
};

export const SearchableSelect: Story = {
  render: () => (
    <div className="flex min-h-[28rem] items-start justify-center p-10">
      <Combobox defaultValue="Braga" items={STATIONS}>
        <ComboboxTrigger aria-label="Station" className="w-60">
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput
            aria-label="Search stations"
            placeholder="Search"
            showTrigger={false}
            size="sm"
          />
          <ComboboxEmpty>No stations found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox", {
      name: "Station",
    });
    await expect(trigger).toHaveTextContent("Braga");
    await userEvent.click(trigger);
    const search = await screen.findByRole("combobox", {
      name: "Search stations",
    });
    await waitFor(() => expect(search).toHaveFocus());
    await userEvent.type(search, "evo");
    await userEvent.click(await screen.findByRole("option", { name: "Évora" }));
    await waitFor(() => expect(trigger).toHaveTextContent("Évora"));
  },
};
