import { Avatar, AvatarFallback } from "@neomorphic-react/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import { Separator } from "@neomorphic-react/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  type SidebarProps,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@neomorphic-react/ui/sidebar";
import { Skeleton } from "@neomorphic-react/ui/skeleton";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BookOpen as BookOpenIcon,
  Calendar as CalendarIcon,
  Compass as CompassIcon,
  Home as HomeIcon,
  Inbox as InboxIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
  TrainFront as TrainFrontIcon,
} from "lucide-react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

const MAIN = [
  { title: "Home", icon: HomeIcon, active: true },
  { title: "Inbox", icon: InboxIcon, badge: "4" },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Settings", icon: SettingsIcon },
];

const PROJECTS = ["Lisbon trip", "Porto weekend", "Rail pass"];

const GUIDES = ["Introduction", "Booking", "Refunds"];

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A raised side panel for an app's navigation. \`SidebarProvider\` owns the
open state and wraps the sidebar and the \`SidebarInset\` beside it.

\`\`\`tsx
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarInset,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider,
  SidebarTrigger,
} from "@neomorphic-react/ui/sidebar";

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive render={<a href="/" />} tooltip="Home">
              <HomeIcon /><span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset><SidebarTrigger />…</SidebarInset>
</SidebarProvider>
\`\`\`

- ⌘B / Ctrl+B toggles it; the state is kept in a \`sidebar_state\` cookie so
  a server render can pass \`defaultOpen\`.
- \`collapsible\`: \`offcanvas\` slides it away, \`icon\` narrows it to its
  icons with the labels in tooltips, \`none\` keeps it open.
- \`variant\`: \`sidebar\` is a raised slab against the edge, \`floating\` a
  raised card held off the edges, \`inset\` lies flat and raises the page.
- Rows rest flat, rise on hover, and the \`isActive\` row is pressed in and
  primary. Sub-menus hang off a groove; wrap them in a \`Collapsible\`.
- Below the \`md\` breakpoint the sidebar opens as a Sheet.
`,
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function AppSidebar(props: SidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="inset-shadow-neu-flat flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-neu-sm">
                <TrainFrontIcon className="size-4" />
              </span>
              <span className="grid leading-tight">
                <span className="font-semibold">Iberia Rail</span>
                <span className="text-muted-foreground text-xs">Planner</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarInput
          aria-label="Search the planner"
          className="group-data-[collapsible=icon]:hidden"
          placeholder="Search…"
        />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.active}
                    render={<a href={`#${item.title.toLowerCase()}`} />}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge ? (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
              <Collapsible render={<SidebarMenuItem />}>
                <CollapsibleTrigger render={<SidebarMenuButton />}>
                  <BookOpenIcon />
                  <span>Guides</span>
                  <CollapsibleIndicator className="ms-auto group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {GUIDES.map((guide) => (
                      <SidebarMenuSubItem key={guide}>
                        <SidebarMenuSubButton href={`#${guide.toLowerCase()}`}>
                          <span>{guide}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Add project" title="Add project">
            <PlusIcon />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {PROJECTS.map((project) => (
                <SidebarMenuItem key={project}>
                  <SidebarMenuButton tooltip={project}>
                    <CompassIcon />
                    <span>{project}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <SidebarMenuAction
                          aria-label={`More for ${project}`}
                          showOnHover
                        />
                      }
                    >
                      <MoreHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="right">
                      <DropdownMenuItem>Open</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Ana Sousa">
              <Avatar className="size-8">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="grid leading-tight">
                <span className="font-medium">Ana Sousa</span>
                <span className="text-muted-foreground text-xs">
                  ana@example.com
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function Page({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-3 px-4">
        <SidebarTrigger />
        <Separator className="h-5 self-center" orientation="vertical" />
        <span className="font-medium text-sm">Dashboard</span>
      </header>
      <div className="grid flex-1 gap-6 p-4 pt-0 md:grid-cols-3">
        {children ?? (
          <>
            <Skeleton className="aspect-video" />
            <Skeleton className="aspect-video" />
            <Skeleton className="aspect-video" />
            <Skeleton className="min-h-64 md:col-span-3" />
          </>
        )}
      </div>
    </SidebarInset>
  );
}

const sidebar = (canvasElement: HTMLElement) =>
  canvasElement.querySelector('[data-slot="sidebar"]') as HTMLElement;
const trigger = (canvasElement: HTMLElement) =>
  canvasElement.querySelector('[data-slot="sidebar-trigger"]') as HTMLElement;

/** Collapses to icons; the labels move into tooltips. */
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar collapsible="icon" />
      <Page />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const home = canvas.getByRole("link", { name: "Home" });
    await expect(home).toHaveAttribute("aria-current", "page");
    await expect(home).toHaveAttribute("data-active");

    await userEvent.click(canvas.getByRole("button", { name: "Guides" }));
    await waitFor(
      () => expect(canvas.getByRole("link", { name: "Refunds" })).toBeVisible(),
      { timeout: 4000 }
    );

    await userEvent.click(trigger(canvasElement));
    await expect(sidebar(canvasElement)).toHaveAttribute(
      "data-state",
      "collapsed"
    );
    await expect(sidebar(canvasElement)).toHaveAttribute(
      "data-collapsible",
      "icon"
    );

    await userEvent.hover(canvas.getByRole("link", { name: "Inbox" }));
    await waitFor(
      () => {
        const tip = document.querySelector('[data-slot="tooltip-content"]');
        expect(tip).toHaveTextContent("Inbox");
        expect(tip).toBeVisible();
      },
      { timeout: 4000 }
    );
    await userEvent.unhover(canvas.getByRole("link", { name: "Inbox" }));

    await userEvent.keyboard("{Meta>}b{/Meta}");
    await expect(sidebar(canvasElement)).toHaveAttribute(
      "data-state",
      "expanded"
    );
  },
};

/** Slides away entirely; the rail along its edge also toggles it. */
export const Offcanvas: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar />
      <Page />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(trigger(canvasElement));
    await expect(sidebar(canvasElement)).toHaveAttribute(
      "data-collapsible",
      "offcanvas"
    );
    await userEvent.keyboard("{Control>}b{/Control}");
    await expect(sidebar(canvasElement)).toHaveAttribute(
      "data-state",
      "expanded"
    );

    await userEvent.click(
      canvas.getByRole("button", { name: "More for Porto weekend" })
    );
    const archive = await screen.findByRole("menuitem", { name: "Archive" });
    await waitFor(() => expect(archive).toBeVisible(), { timeout: 4000 });
    await userEvent.keyboard("{Escape}");
  },
};

/** A raised card held off the screen edges. */
export const Floating: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar collapsible="icon" variant="floating" />
      <Page />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    await expect(sidebar(canvasElement)).toHaveAttribute(
      "data-variant",
      "floating"
    );
    await expect(
      canvasElement.querySelector('[data-slot="sidebar-inner"]')
    ).toHaveClass("rounded-2xl", "shadow-neu-lg");
  },
};

/** The sidebar lies flat and the page beside it is the raised card. */
export const Inset: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar collapsible="icon" variant="inset" />
      <Page />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const inset = within(canvasElement).getByRole("main");
    await expect(getComputedStyle(inset).borderRadius).not.toBe("0px");
    await expect(
      canvasElement.querySelector('[data-slot="sidebar-inner"]')
    ).not.toHaveClass("bg-neu-convex");
  },
};

/** Skeleton rows while the menu loads. */
export const Loading: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu aria-busy="true">
              {["70%", "55%", "80%", "62%"].map((width) => (
                <SidebarMenuItem key={width}>
                  <SidebarMenuSkeleton showIcon width={width} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Page />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelectorAll('[data-slot="sidebar-menu-skeleton"]')
    ).toHaveLength(4);
  },
};
