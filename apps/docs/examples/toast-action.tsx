"use client";

import { Button } from "@neomorphic-react/ui/button";
import { toast } from "@neomorphic-react/ui/toast";
import { useState } from "react";

export default function ToastAction() {
  const [archived, setArchived] = useState(false);

  const archive = () => {
    setArchived(true);
    const id = toast("Conversation archived", {
      action: {
        label: "Undo",
        onClick: () => {
          setArchived(false);
          toast({ id, description: "Conversation moved back to your inbox" });
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={archive}>Archive conversation</Button>
      <p className="text-muted-foreground text-sm">
        {archived ? "Archived" : "In your inbox"}
      </p>
    </div>
  );
}
