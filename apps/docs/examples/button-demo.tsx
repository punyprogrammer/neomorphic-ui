import { Button } from "@neomorphic-react/ui/button";
import { ArrowRight, Share2 } from "lucide-react";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button icon={<ArrowRight />} iconPosition="end">
        Sign in
      </Button>
      <Button icon={<Share2 />}>Share</Button>
    </div>
  );
}
