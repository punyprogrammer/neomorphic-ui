import { Card, CardContent } from "@neomorphic-react/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@neomorphic-react/ui/carousel";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

const TRIPS = ["Lisbon", "Porto", "Faro", "Évora", "Sintra"];

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: `
Slides in a scrolling track, built on Embla, with raised round
previous/next buttons and a \`PageIndicator\`.

\`\`\`tsx
import {
  Carousel, CarouselContent, CarouselIndicator, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "@neomorphic-react/ui/carousel";

<Carousel aria-label="Featured trips">
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselIndicator />
</Carousel>
\`\`\`

- The root is a labelled \`region\` with \`aria-roledescription="carousel"\`;
  each slide is a \`group\` described as a "slide".
- Arrow keys move between slides while focus is inside (mirrored in RTL);
  the indicator's dots pick a slide.
- \`opts\` reach Embla (\`loop\`, \`align\`); \`plugins\` add autoplay, which is
  off unless you add it. \`gap\` sets the space between slides.
- \`basis-1/2\` or \`basis-1/3\` on \`CarouselItem\` shows several at once.
`,
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Slide = ({ name, index }: { name: string; index: number }) => (
  <Card className="h-full">
    <CardContent className="flex aspect-[4/3] flex-col items-center justify-center gap-1">
      <span className="font-semibold text-3xl">{name}</span>
      <span className="text-muted-foreground text-xs">Day {index + 1}</span>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: () => (
    <div className="flex justify-center px-20 py-10">
      <Carousel aria-label="Featured trips" className="w-full max-w-sm">
        <CarouselContent>
          {TRIPS.map((trip, index) => (
            <CarouselItem key={trip}>
              <Slide index={index} name={trip} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicator />
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByRole("region", { name: "Featured trips" });
    await expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    const previous = canvas.getByRole("button", { name: "Previous slide" });
    const next = canvas.getByRole("button", { name: "Next slide" });
    await waitFor(() => expect(next).toBeEnabled(), { timeout: 4000 });
    await expect(previous).toBeDisabled();

    await userEvent.click(next);
    await waitFor(
      () =>
        expect(
          canvas.getByRole("button", { name: "Slide 2 of 5" })
        ).toHaveAttribute("aria-current", "true"),
      { timeout: 4000 }
    );
    await expect(previous).toBeEnabled();

    await userEvent.click(canvas.getByRole("button", { name: "Slide 4 of 5" }));
    await waitFor(
      () =>
        expect(
          canvas.getByRole("button", { name: "Slide 4 of 5" })
        ).toHaveAttribute("aria-current", "true"),
      { timeout: 4000 }
    );

    next.focus();
    await userEvent.keyboard("{ArrowLeft}");
    await waitFor(
      () =>
        expect(
          canvas.getByRole("button", { name: "Slide 3 of 5" })
        ).toHaveAttribute("aria-current", "true"),
      { timeout: 4000 }
    );
  },
};

export const Several: Story = {
  render: () => (
    <div className="flex justify-center px-20 py-10">
      <Carousel
        aria-label="Weekend ideas"
        className="w-full max-w-2xl"
        gap="1rem"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {TRIPS.map((trip, index) => (
            <CarouselItem className="basis-1/2 md:basis-1/3" key={trip}>
              <Slide index={index} name={trip} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("group")).toHaveLength(5);
    // Looping, so both directions stay open.
    await waitFor(
      () =>
        expect(
          canvas.getByRole("button", { name: "Previous slide" })
        ).toBeEnabled(),
      { timeout: 4000 }
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex justify-center px-10 py-20">
      <Carousel
        aria-label="Departures"
        className="w-full max-w-xs"
        gap="1rem"
        opts={{ align: "start" }}
        orientation="vertical"
      >
        <CarouselContent className="h-64">
          {TRIPS.map((trip, index) => (
            <CarouselItem className="basis-1/2" key={trip}>
              <Card className="h-full">
                <CardContent className="flex h-full items-center justify-between">
                  <span className="font-medium">{trip}</span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    0{index + 8}:15
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByRole("region", { name: "Departures" });
    await expect(carousel).toHaveAttribute("data-orientation", "vertical");
    const next = canvas.getByRole("button", { name: "Next slide" });
    await waitFor(() => expect(next).toBeEnabled(), { timeout: 4000 });
    next.focus();
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(
      () =>
        expect(
          canvas.getByRole("button", { name: "Previous slide" })
        ).toBeEnabled(),
      { timeout: 4000 }
    );
  },
};
