import { fireEvent, render, screen } from "@testing-library/react";
import { Home as HomeIcon, Inbox as InboxIcon } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "./sidebar";

const PROVIDER_ERROR = /SidebarProvider/;

function State() {
  const { state } = useSidebar();
  return <output aria-label="State">{state}</output>;
}

function App({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  return (
    <SidebarProvider onOpenChange={onOpenChange}>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive
                  render={<a href="#home" />}
                  tooltip="Home"
                >
                  <HomeIcon />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inbox">
                  <InboxIcon />
                  <span>Inbox</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>4</SidebarMenuBadge>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#unread">
                      Unread
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <State />
      </SidebarInset>
    </SidebarProvider>
  );
}

describe("Sidebar", () => {
  it("renders a raised desktop panel with menu rows", () => {
    render(<App />);
    const sidebar = document.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toHaveAttribute("data-state", "expanded");
    expect(sidebar).toHaveAttribute("data-variant", "sidebar");
    expect(document.querySelector('[data-slot="sidebar-inner"]')).toHaveClass(
      "bg-neu-convex",
      "shadow-neu-lg"
    );
    expect(screen.getByRole("main")).toHaveAttribute(
      "data-slot",
      "sidebar-inset"
    );
  });

  it("marks the active link and presses it in", () => {
    render(<App />);
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("aria-current", "page");
    expect(home).toHaveAttribute("data-active");
    expect(home).toHaveClass("data-active:inset-shadow-neu-sm");
    const inbox = screen.getByRole("button", { name: "Inbox" });
    expect(inbox).not.toHaveAttribute("data-active");
    expect(inbox).toHaveAttribute("type", "button");
  });

  it("collapses with the trigger and ⌘B, reporting the change", () => {
    const onOpenChange = vi.fn();
    render(<App onOpenChange={onOpenChange} />);
    const state = screen.getByRole("status", { name: "State" });
    fireEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(state).toHaveTextContent("collapsed");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(document.querySelector('[data-slot="sidebar"]')).toHaveAttribute(
      "data-collapsible",
      "icon"
    );
    fireEvent.keyDown(window, { key: "b", metaKey: true });
    expect(state).toHaveTextContent("expanded");
    fireEvent.keyDown(window, { key: "b", ctrlKey: true });
    expect(state).toHaveTextContent("collapsed");
    expect(document.cookie).toContain("sidebar_state=false");
  });

  it("hangs sub-rows off a groove", () => {
    render(<App />);
    const sub = document.querySelector('[data-slot="sidebar-menu-sub"]');
    expect(sub).toHaveClass("border-s", "border-[var(--neu-dark)]");
    expect(screen.getByRole("link", { name: "Unread" })).toHaveAttribute(
      "data-slot",
      "sidebar-menu-sub-button"
    );
  });

  it("opens as a Sheet below the md breakpoint", async () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      ...original(query),
      matches: true,
    })) as typeof window.matchMedia;
    try {
      render(<App />);
      expect(screen.queryByRole("link", { name: "Home" })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
      const sheet = await screen.findByRole("dialog", { name: "Sidebar" });
      expect(sheet).toHaveAttribute("data-mobile", "true");
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });

  it("throws outside a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<State />)).toThrow(PROVIDER_ERROR);
    spy.mockRestore();
  });
});
