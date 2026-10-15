import { Button } from "@neomorphic-react/ui/button";
import { Heart, Send } from "lucide-react";

export default function ButtonSizes() {
  return (
    <div className="grid gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex items-center gap-6" key={size}>
          <Button icon={<Send />} iconPosition="end" size={size}>
            Send
          </Button>
          <Button aria-label="Like" icon={<Heart />} size={size} />
          <Button aria-label="Like" icon={<Heart />} shape="pill" size={size} />
        </div>
      ))}
    </div>
  );
}
