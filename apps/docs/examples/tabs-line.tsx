"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";

export default function TabsLine() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview">
      <TabsList aria-label="Project" variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger disabled value="billing">
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent className="text-muted-foreground" value="overview">
        4 open tasks, 2 due this week.
      </TabsContent>
      <TabsContent className="text-muted-foreground" value="activity">
        Priya moved "Launch checklist" to Done 2 hours ago.
      </TabsContent>
      <TabsContent className="text-muted-foreground" value="billing">
        Next invoice on 1 December.
      </TabsContent>
    </Tabs>
  );
}
