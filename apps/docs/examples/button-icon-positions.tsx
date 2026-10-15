import { Button } from "@neomorphic-react/ui/button";
import { ArrowRight, Download, LogIn, Mic } from "lucide-react";

export default function ButtonIconPositions() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button icon={<LogIn />} iconPosition="start">
        Start
      </Button>
      <Button icon={<ArrowRight />} iconPosition="end">
        End
      </Button>
      <Button icon={<Mic />} iconPosition="top" shape="rounded">
        Top
      </Button>
      <Button icon={<Download />} iconPosition="bottom" shape="rounded">
        Bottom
      </Button>
    </div>
  );
}
