"use client";

import { Button } from "@neomorphic-react/ui/button";
import { Download, Heart, Send } from "lucide-react";
import { useState } from "react";

export default function ButtonStates() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button
        aria-pressed={liked}
        icon={<Heart fill={liked ? "currentColor" : "none"} />}
        onClick={() => setLiked((value) => !value)}
      >
        {liked ? "Liked" : "Like"}
      </Button>
      <Button isLoading>Saving</Button>
      <Button icon={<Download />} isLoading variant="primary">
        Download
      </Button>
      <Button disabled icon={<Send />}>
        Disabled
      </Button>
    </div>
  );
}
