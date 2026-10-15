import { Button } from "@neomorphic-react/ui/button";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Heart,
  House,
  Play,
  User,
} from "lucide-react";

export default function ButtonIconOnly() {
  return (
    <div className="grid justify-items-center gap-8">
      <div className="flex items-center gap-6">
        <Button aria-label="Profile" icon={<User />} size="lg" />
        <Button aria-label="Notifications" icon={<Bell />} size="lg" />
        <Button aria-label="Home" icon={<House />} size="lg" />
      </div>
      <div className="flex items-center gap-6">
        <Button aria-label="Previous" icon={<ChevronLeft />} size="sm" />
        <Button
          aria-label="Play"
          icon={<Play />}
          shape="pill"
          size="lg"
          variant="primary"
        />
        <Button aria-label="Next" icon={<ChevronRight />} size="sm" />
        <Button aria-label="Favourite" icon={<Heart />} variant="ghost" />
      </div>
    </div>
  );
}
