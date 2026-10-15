"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@neomorphic-react/ui/sidebar";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { FileText, Home, Users } from "lucide-react";
import { useState } from "react";

type Mode = NonNullable<SidebarProps["collapsible"]>;

const items = [
  { title: "Overview", icon: Home },
  { title: "Documents", icon: FileText },
  { title: "Team", icon: Users },
];

function SidebarState() {
  const { state } = useSidebar();
  return <span className="text-muted-foreground text-sm">Sidebar {state}</span>;
}

export default function SidebarCollapsible() {
  const [mode, setMode] = useState<Mode>("icon");

  return (
    <div className="grid w-full gap-4">
      <ToggleGroup
        aria-label="Collapsible mode"
        className="justify-self-center"
        onValueChange={(next) => {
          if (next.length > 0) {
            setMode(next[0] as Mode);
          }
        }}
        size="sm"
        value={[mode]}
      >
        <ToggleGroupItem value="offcanvas">offcanvas</ToggleGroupItem>
        <ToggleGroupItem value="icon">icon</ToggleGroupItem>
        <ToggleGroupItem value="none">none</ToggleGroupItem>
      </ToggleGroup>
      <SidebarProvider className="relative isolate h-80 min-h-0 overflow-hidden rounded-2xl border border-border/70">
        <Sidebar
          className={mode === "none" ? undefined : "absolute h-full"}
          collapsible={mode}
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.title === "Overview"}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 px-4">
            <SidebarTrigger />
            <SidebarState />
          </header>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
