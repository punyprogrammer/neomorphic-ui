import { Button } from "@neomorphic-react/ui/button";
import { Check, Heart, Star, Trash2, TriangleAlert } from "lucide-react";

export default function ButtonColors() {
  return (
    <div className="grid justify-items-center gap-8">
      <div className="flex flex-wrap justify-center gap-6">
        <Button className="text-primary" icon={<Star fill="currentColor" />}>
          Starred
        </Button>
        <Button icon={<Heart className="text-destructive" />}>Like</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <Button
          className="bg-destructive text-destructive-foreground"
          icon={<Trash2 />}
        >
          Delete
        </Button>
        <Button className="bg-success text-success-foreground" icon={<Check />}>
          Approve
        </Button>
        <Button
          className="bg-warning text-warning-foreground"
          icon={<TriangleAlert />}
        >
          Review
        </Button>
      </div>
    </div>
  );
}
