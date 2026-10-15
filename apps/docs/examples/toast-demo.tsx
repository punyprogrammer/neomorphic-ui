"use client";

import { Button } from "@neomorphic-react/ui/button";
import { toast } from "@neomorphic-react/ui/toast";

export default function ToastDemo() {
  return (
    <Button
      onClick={() =>
        toast({
          title: "Event created",
          description: "Team lunch, Friday 14 March at 12:30",
        })
      }
    >
      Add to calendar
    </Button>
  );
}
