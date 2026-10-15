import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@neomorphic-react/ui/navigation-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const PORTO_RE = /Porto/;
const REFUNDS_RE = /Refunds/;

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Site navigation: triggers that open raised panels of links. Moving between
triggers resizes and slides the one panel rather than closing and reopening
it. The open trigger presses in and takes the primary colour.

\`\`\`tsx
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@neomorphic-react/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/lisbon">Lisbon</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
\`\`\`

Mark the current page with \`active\` on its link. Pass
\`render={<Link … />}\` for a router link, and give a plain top-level link
\`className={navigationMenuTriggerStyle()}\` so it lines up with the triggers.
`,
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const DESTINATIONS = [
  { href: "#lisbon", title: "Lisbon", text: "Hills, trams and the river." },
  { href: "#porto", title: "Porto", text: "Port cellars and the Douro." },
  { href: "#faro", title: "Faro", text: "Gateway to the Algarve." },
  { href: "#coimbra", title: "Coimbra", text: "The old university town." },
];

const HELP = [
  { href: "#bags", title: "Luggage", text: "What you can bring on board." },
  { href: "#refunds", title: "Refunds", text: "Changes and cancellations." },
];

export const Default: Story = {
  render: (args) => (
    <div className="min-h-96 p-10">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 sm:w-[28rem] sm:grid-cols-2">
                {DESTINATIONS.map((d) => (
                  <li key={d.href}>
                    <NavigationMenuLink href={d.href}>
                      <span className="font-medium">{d.title}</span>
                      <span className="text-muted-foreground">{d.text}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Help</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 sm:w-64">
                {HELP.map((d) => (
                  <li key={d.href}>
                    <NavigationMenuLink href={d.href}>
                      <span className="font-medium">{d.title}</span>
                      <span className="text-muted-foreground">{d.text}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              active
              className={navigationMenuTriggerStyle()}
              href="#deals"
            >
              Deals
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: "Deals" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    const trigger = canvas.getByRole("button", { name: "Destinations" });
    await userEvent.click(trigger);
    const porto = await screen.findByRole("link", { name: PORTO_RE });
    await waitFor(() => expect(porto).toBeVisible(), { timeout: 4000 });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(canvas.getByRole("button", { name: "Help" }));
    await expect(
      await screen.findByRole("link", { name: REFUNDS_RE })
    ).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Help" })).toHaveAttribute(
        "aria-expanded",
        "false"
      )
    );
  },
};
