"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";

const sections = [
  {
    value: "general",
    label: "General",
    text: "Workspace name, time zone and the language for emails.",
  },
  {
    value: "members",
    label: "Members",
    text: "8 members and 2 pending invitations.",
  },
  {
    value: "notifications",
    label: "Notifications",
    text: "Choose which updates reach you by email or push.",
  },
];

export default function TabsVertical() {
  return (
    <Tabs
      className="w-full max-w-lg"
      defaultValue="general"
      orientation="vertical"
    >
      <TabsList aria-label="Settings">
        {sections.map((section) => (
          <TabsTrigger
            className="justify-start"
            key={section.value}
            value={section.value}
          >
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent
          className="p-2 text-muted-foreground"
          key={section.value}
          value={section.value}
        >
          {section.text}
        </TabsContent>
      ))}
    </Tabs>
  );
}
