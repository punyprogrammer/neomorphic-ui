"use client";

import { Card, CardContent } from "@neomorphic-react/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";

const panels = [
  { value: "flights", label: "Flights", text: "12 flights from Lisbon today." },
  { value: "trains", label: "Trains", text: "34 trains from Lisbon today." },
  { value: "stays", label: "Stays", text: "210 places to stay in Porto." },
];

export default function TabsDemo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="flights">
      <TabsList aria-label="Search">
        {panels.map((panel) => (
          <TabsTrigger key={panel.value} value={panel.value}>
            {panel.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value}>
          <Card size="sm">
            <CardContent>{panel.text}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
