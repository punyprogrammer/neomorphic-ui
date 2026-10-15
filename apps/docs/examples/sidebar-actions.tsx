"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@neomorphic-react/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@neomorphic-react/ui/sidebar";
import { Folder, Inbox, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";

export default function SidebarActions() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Lisbon trip" },
    { id: 2, name: "Porto weekend" },
  ]);

  const addProject = () =>
    setProjects((current) => {
      const id = Math.max(0, ...current.map((project) => project.id)) + 1;
      return [...current, { id, name: `New project ${id}` }];
    });

  return (
    <SidebarProvider className="h-96 min-h-0 justify-center bg-transparent">
      <Sidebar className="rounded-2xl" collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Mail</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Inbox />
                  <span>Inbox</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>12</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Add project" onClick={addProject}>
              <Plus />
            </SidebarGroupAction>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton>
                    <Folder />
                    <span>{project.name}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <SidebarMenuAction
                          aria-label={`More for ${project.name}`}
                          showOnHover
                        />
                      }
                    >
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="right">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setProjects((current) =>
                            current.filter((item) => item.id !== project.id)
                          )
                        }
                        variant="destructive"
                      >
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
