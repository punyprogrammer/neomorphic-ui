import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Label } from "@neomorphic-react/ui/label";
import { Slider } from "@neomorphic-react/ui/slider";
import { Switch } from "@neomorphic-react/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";

export default function IntroductionDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what we send you, and how often.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <Label className="flex items-center justify-between">
          Weekly digest
          <Switch defaultChecked />
        </Label>
        <Label className="flex items-center justify-between">
          Mentions
          <Switch />
        </Label>
        <div className="grid gap-3">
          <Label id="frequency">Frequency</Label>
          <ToggleGroup
            aria-labelledby="frequency"
            defaultValue={["daily"]}
            size="sm"
          >
            <ToggleGroupItem value="live">Live</ToggleGroupItem>
            <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="grid gap-3">
          <Label id="volume">Sound</Label>
          <Slider aria-labelledby="volume" defaultValue={60} size="sm" />
        </div>
      </CardContent>
      <CardFooter className="gap-3">
        <Button variant="primary">Save</Button>
        <Button variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  );
}
