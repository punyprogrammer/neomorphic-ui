"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@neomorphic-react/ui/sidebar";
import { CalendarDays, Home, Inbox, Ticket, TrainFront } from "lucide-react";

const nav = [
  { title: "Overview", icon: Home },
  { title: "Bookings", icon: Ticket, badge: 3 },
  { title: "Messages", icon: Inbox, badge: 12 },
  { title: "Timetable", icon: CalendarDays },
];

const stats = [
  { label: "Trips this month", value: "14" },
  { label: "Seats reserved", value: "38" },
  { label: "On-time rate", value: "96%" },
];

export default function SidebarInContext() {
  return (
    <SidebarProvider className="relative isolate h-[28rem] min-h-0 overflow-hidden rounded-2xl border border-border/70">
      <Sidebar className="absolute h-full" collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Iberia Rail">
                <TrainFront className="text-primary" />
                <span className="font-semibold">Iberia Rail</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarInput
            aria-label="Search bookings"
            className="group-data-[collapsible=icon]:hidden"
            placeholder="Search bookings"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Operations</SidebarGroupLabel>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.title === "Overview"}
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
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />
          <h3 className="font-medium text-foreground text-sm">Overview</h3>
        </header>
        <div className="grid gap-4 p-4 pt-0 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} size="sm">
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
