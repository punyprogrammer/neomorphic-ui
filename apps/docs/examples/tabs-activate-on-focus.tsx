"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";

export default function TabsActivateOnFocus() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="day">
      <TabsList activateOnFocus aria-label="Period">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="day">6,240 steps today.</TabsContent>
      <TabsContent value="week">48,900 steps this week.</TabsContent>
      <TabsContent value="month">201,300 steps this month.</TabsContent>
    </Tabs>
  );
}
