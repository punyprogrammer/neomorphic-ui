"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
  SidebarProvider,
  SidebarTrigger,
} from "@neomorphic-react/ui/sidebar";
import { Skeleton } from "@neomorphic-react/ui/skeleton";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { BarChart3, Home, Wallet } from "lucide-react";
import { useState } from "react";

type Variant = NonNullable<SidebarProps["variant"]>;

const items = [
  { title: "Dashboard", icon: Home },
  { title: "Reports", icon: BarChart3 },
  { title: "Billing", icon: Wallet },
];

export default function SidebarVariants() {
  const [variant, setVariant] = useState<Variant>("floating");

  return (
    <div className="grid w-full gap-4">
      <ToggleGroup
        aria-label="Variant"
        className="justify-self-center"
        onValueChange={(next) => {
          if (next.length > 0) {
            setVariant(next[0] as Variant);
          }
        }}
        size="sm"
        value={[variant]}
      >
        <ToggleGroupItem value="sidebar">sidebar</ToggleGroupItem>
        <ToggleGroupItem value="floating">floating</ToggleGroupItem>
        <ToggleGroupItem value="inset">inset</ToggleGroupItem>
      </ToggleGroup>
      <SidebarProvider className="relative isolate h-80 min-h-0 overflow-hidden rounded-2xl border border-border/70">
        <Sidebar
          className="absolute h-full"
          collapsible="icon"
          variant={variant}
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Finance</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.title === "Dashboard"}
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
          <header className="flex h-14 items-center px-4">
            <SidebarTrigger />
          </header>
          <div className="grid flex-1 grid-rows-[6rem_1fr] gap-4 p-4 pt-0">
            <Skeleton />
            <Skeleton />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
