"use client";

import { Button } from "@neomorphic-react/ui/button";
import { toast } from "@neomorphic-react/ui/toast";

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button onClick={() => toast("Draft saved")}>Default</Button>
      <Button
        onClick={() =>
          toast.success({
            title: "Payment received",
            description: "£42.00 from Priya Patel",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.info({
            title: "New version available",
            description: "Reload to get the latest changes.",
          })
        }
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toast.warning({
            title: "Storage almost full",
            description: "You've used 9.2 GB of 10 GB.",
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Couldn't send message",
            description: "Check your connection and try again.",
          })
        }
      >
        Error
      </Button>
      <Button onClick={() => toast.loading("Syncing contacts…")}>
        Loading
      </Button>
    </div>
  );
}
