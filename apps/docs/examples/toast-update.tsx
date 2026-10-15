"use client";

import { Button } from "@neomorphic-react/ui/button";
import { toast } from "@neomorphic-react/ui/toast";

export default function ToastUpdate() {
  const upload = () => {
    const id = toast.loading({
      title: "Uploading 3 photos",
      description: "Keep this tab open until it's done.",
      dismissible: false,
    });
    setTimeout(() => {
      toast.success({
        id,
        title: "Photos uploaded",
        description: "Added to the Lisbon album.",
      });
    }, 2500);
  };

  return <Button onClick={upload}>Upload photos</Button>;
}
