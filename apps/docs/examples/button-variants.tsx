import { Button } from "@neomorphic-react/ui/button";
import { Bookmark, Download, Play, Trash2 } from "lucide-react";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button icon={<Download />}>Default</Button>
      <Button icon={<Play />} variant="primary">
        Primary
      </Button>
      <Button icon={<Trash2 />} variant="destructive">
        Delete
      </Button>
      <Button icon={<Bookmark />} variant="ghost">
        Ghost
      </Button>
    </div>
  );
}
