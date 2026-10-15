"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";
import { BedDouble, Plane, TrainFront } from "lucide-react";

export default function TabsIcons() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="trains">
      <TabsList aria-label="Search">
        <TabsTrigger value="flights">
          <Plane aria-hidden="true" />
          Flights
        </TabsTrigger>
        <TabsTrigger value="trains">
          <TrainFront aria-hidden="true" />
          Trains
        </TabsTrigger>
        <TabsTrigger value="stays">
          <BedDouble aria-hidden="true" />
          Stays
        </TabsTrigger>
      </TabsList>
      <TabsContent value="flights">12 flights from Lisbon today.</TabsContent>
      <TabsContent value="trains">34 trains from Lisbon today.</TabsContent>
      <TabsContent value="stays">210 places to stay in Porto.</TabsContent>
    </Tabs>
  );
}
