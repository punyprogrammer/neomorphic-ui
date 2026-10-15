"use client";

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
  SidebarProvider,
  SidebarTrigger,
} from "@neomorphic-react/ui/sidebar";
import { Calendar, Home, Inbox, Settings } from "lucide-react";

const items = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox, badge: 4 },
  { title: "Calendar", icon: Calendar },
  { title: "Settings", icon: Settings },
];

export default function SidebarDemo() {
  return (
    <SidebarProvider className="relative isolate h-96 min-h-0 overflow-hidden rounded-2xl border border-border/70">
      <Sidebar className="absolute h-full" collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.title === "Home"}
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
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />
          <span className="font-medium text-sm">Home</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
