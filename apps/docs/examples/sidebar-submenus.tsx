"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@neomorphic-react/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@neomorphic-react/ui/sidebar";
import { BookOpen, Rocket, Settings2 } from "lucide-react";

const sections = [
  {
    title: "Getting started",
    icon: Rocket,
    pages: ["Introduction", "Installation", "Theming"],
  },
  {
    title: "Guides",
    icon: BookOpen,
    pages: ["Forms", "Dark surfaces", "Accessibility"],
  },
  { title: "Configuration", icon: Settings2, pages: ["Tokens", "Motion"] },
];

export default function SidebarSubmenus() {
  return (
    <SidebarProvider className="h-[26rem] min-h-0 overflow-hidden rounded-2xl border border-border/70">
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Documentation</SidebarGroupLabel>
            <SidebarMenu>
              {sections.map((section) => (
                <Collapsible
                  defaultOpen={section.title === "Getting started"}
                  key={section.title}
                  render={<SidebarMenuItem />}
                >
                  <CollapsibleTrigger render={<SidebarMenuButton />}>
                    <section.icon />
                    <span>{section.title}</span>
                    <CollapsibleIndicator className="ms-auto" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {section.pages.map((page) => (
                        <SidebarMenuSubItem key={page}>
                          <SidebarMenuSubButton
                            href={`#${page.toLowerCase()}`}
                            isActive={page === "Installation"}
                          >
                            {page}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-6">
        <h3 className="font-semibold text-foreground text-lg">Installation</h3>
        <p className="mt-2 text-muted-foreground text-sm">
          Add the package, then import the theme once at the root of your app.
        </p>
      </SidebarInset>
    </SidebarProvider>
  );
}
