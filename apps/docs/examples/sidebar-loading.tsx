"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@neomorphic-react/ui/sidebar";

const widths = ["70%", "55%", "80%", "62%"];

export default function SidebarLoading() {
  return (
    <SidebarProvider className="h-72 min-h-0 justify-center bg-transparent">
      <Sidebar className="rounded-2xl" collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu aria-busy="true" aria-label="Projects">
              {widths.map((width) => (
                <SidebarMenuItem key={width}>
                  <SidebarMenuSkeleton showIcon width={width} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
