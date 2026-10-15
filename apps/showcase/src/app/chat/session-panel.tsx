"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neomorphic-react/ui/alert";
import {
  BarMeter,
  BarMeterItem,
  BarMeterLabel,
  BarMeterValue,
} from "@neomorphic-react/ui/bar-meter";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Dial } from "@neomorphic-react/ui/dial";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@neomorphic-react/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import { RadioGroup, RadioGroupItem } from "@neomorphic-react/ui/radio-group";
import { ScrollArea } from "@neomorphic-react/ui/scroll-area";
import { Sidebar } from "@neomorphic-react/ui/sidebar";
import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";
import { Switch } from "@neomorphic-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { Textarea } from "@neomorphic-react/ui/textarea";
import { toast } from "@neomorphic-react/ui/toast";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@neomorphic-react/ui/toggle-group";
import { Brain, FolderOpen, Sparkle, X } from "lucide-react";
import { useState } from "react";

import {
  type ChatMessage,
  type Length,
  TOOLS,
  type Tone,
  type ToolId,
} from "@/lib/chat";

import { useChat } from "./chat-state";
import { Files } from "./transcript";

type Tab = "tune" | "files" | "memory";

const TABS: { value: Tab; label: string }[] = [
  { value: "tune", label: "Tune" },
  { value: "files", label: "Files" },
  { value: "memory", label: "Memory" },
];

const TONES: { value: Tone; label: string }[] = [
  { value: "gentle", label: "Gentle" },
  { value: "balanced", label: "Balanced" },
  { value: "direct", label: "Direct" },
];

const LENGTHS: { value: Length; title: string; description: string }[] = [
  { value: "brief", title: "Brief", description: "A sentence or two" },
  {
    value: "balanced",
    title: "Balanced",
    description: "A short paragraph or two",
  },
  {
    value: "detailed",
    title: "Detailed",
    description: "Steps, tables and code",
  },
];

export function SessionPanel() {
  const { panelOpen, setPanelOpen } = useChat();
  const [tab, setTab] = useState<Tab>("tune");

  return (
    <Sidebar collapsible="offcanvas" side="right" variant="floating">
      <aside
        aria-label="Session"
        className="flex min-h-0 flex-1 flex-col gap-3 py-3"
        inert={!panelOpen}
      >
        <div className="flex items-center gap-1 px-3">
          <Tabs
            className="min-w-0 flex-1"
            onValueChange={(value) => setTab(value as Tab)}
            value={tab}
          >
            <TabsList className="w-full min-w-0">
              {TABS.map((t) => (
                <TabsTrigger
                  className="min-w-0 flex-1 px-2 text-xs"
                  key={t.value}
                  value={t.value}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            aria-label="Close session panel"
            icon={<X />}
            onClick={() => setPanelOpen(false)}
            size="sm"
            variant="ghost"
          />
        </div>
        <ScrollArea className="min-h-0 flex-1" fade>
          <div className="grid grid-cols-1 gap-5 px-4 pt-1 pb-4">
            {tab === "tune" ? <Tune /> : null}
            {tab === "files" ? <SessionFiles /> : null}
            {tab === "memory" ? <Memory /> : null}
          </div>
        </ScrollArea>
      </aside>
    </Sidebar>
  );
}

// ---------------------------------------------------------------------------
// Tune
// ---------------------------------------------------------------------------

function Tune() {
  const { active, settings, update, week } = useChat();
  const words = active.entries.reduce(
    (sum, e) =>
      e.type === "message" ? sum + (e.text?.split(/\s+/).length ?? 0) : sum,
    0
  );
  const context = Math.min(100, Math.round((words / 2400) * 100));

  return (
    <>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Voice</CardTitle>
          <CardDescription>How Still talks to you</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <ToggleGroup
            aria-label="Tone"
            className="grid w-full grid-cols-3"
            onValueChange={(next) => next[0] && update("tone", next[0] as Tone)}
            size="sm"
            value={[settings.tone]}
          >
            {TONES.map((tone) => (
              <ToggleGroupItem
                className="normal-case tracking-normal"
                key={tone.value}
                value={tone.value}
              >
                {tone.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="flex items-center gap-4">
            <Dial
              aria-label="Warmth"
              className="[--dial-fill:var(--color-primary)]"
              getAriaValueText={(value) => `${value} percent warm`}
              onValueChange={(value) => update("warmth", value)}
              size="sm"
              step={1}
              value={settings.warmth}
            >
              <span className="grid text-center leading-tight">
                <span className="font-semibold text-foreground tabular-nums">
                  {settings.warmth}
                </span>
                <span className="text-[0.625rem] text-muted-foreground uppercase tracking-wider">
                  warmth
                </span>
              </span>
            </Dial>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Above 60, replies close with a little reassurance.
            </p>
          </div>

          <Slider
            max={80}
            min={12}
            onValueChange={(next) => update("pace", next as number)}
            size="sm"
            step={2}
            value={settings.pace}
          >
            <div className="flex items-center justify-between text-sm">
              <SliderLabel>Reply pace</SliderLabel>
              <SliderValue className="text-muted-foreground text-xs">
                {(_, value) =>
                  (value[0] ?? 0) < 30
                    ? "Unhurried"
                    : (value[0] ?? 0) < 55
                      ? "Steady"
                      : "Brisk"
                }
              </SliderValue>
            </div>
          </Slider>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Reply length</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            aria-label="Reply length"
            className="grid gap-3"
            onValueChange={(value) => update("length", value as Length)}
            value={settings.length}
          >
            {LENGTHS.map((option) => (
              <FieldLabel key={option.value}>
                <Field orientation="horizontal">
                  <RadioGroupItem value={option.value} />
                  <FieldContent>
                    <FieldTitle>{option.title}</FieldTitle>
                    <FieldDescription>{option.description}</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Tools</CardTitle>
          <CardDescription>What Still may look at</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-4">
            {TOOLS.map((tool) => (
              <Field key={tool.id} orientation="horizontal">
                <Checkbox
                  checked={settings.tools.includes(tool.id)}
                  id={`tool-${tool.id}`}
                  onCheckedChange={(checked) =>
                    update(
                      "tools",
                      checked
                        ? [...settings.tools, tool.id]
                        : settings.tools.filter((t: ToolId) => t !== tool.id)
                    )
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor={`tool-${tool.id}`}>
                    {tool.label}
                  </FieldLabel>
                  <FieldDescription>{tool.description}</FieldDescription>
                </FieldContent>
              </Field>
            ))}
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="read-aloud">Read replies aloud</FieldLabel>
                <FieldDescription>
                  Uses your system voice, softly
                </FieldDescription>
              </FieldContent>
              <Switch
                checked={settings.speak}
                id="read-aloud"
                onCheckedChange={(checked) => update("speak", checked)}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Your week</CardTitle>
          <CardDescription>Rest from your evening check-ins</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <BarMeter
            aria-label="Rest this week"
            className="justify-between"
            size="sm"
          >
            {week.map((day) => (
              <BarMeterItem key={day.day} value={day.rest}>
                <BarMeterValue className="text-[0.625rem]">
                  {(formatted) => (day.rest ? formatted : "–")}
                </BarMeterValue>
                <BarMeterLabel>{day.day}</BarMeterLabel>
              </BarMeterItem>
            ))}
          </BarMeter>
          <Progress size="sm" value={context}>
            <div className="flex justify-between text-xs">
              <ProgressLabel>Conversation memory used</ProgressLabel>
              <ProgressValue />
            </div>
          </Progress>
        </CardContent>
      </Card>
    </>
  );
}

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

function SessionFiles() {
  const { active } = useChat();
  const files = active.entries.flatMap((e) =>
    e.type === "message" ? ((e as ChatMessage).files ?? []) : []
  );

  if (files.length === 0) {
    return (
      <Empty variant="inset">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderOpen />
          </EmptyMedia>
          <EmptyTitle>No files yet</EmptyTitle>
          <EmptyDescription>
            Anything you attach in this chat shows up here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <section aria-label="Files in this chat" className="grid gap-2">
      <p className="text-muted-foreground text-sm">
        {files.length} {files.length === 1 ? "file" : "files"} in this chat
      </p>
      <Files files={files} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Memory
// ---------------------------------------------------------------------------

function Memory() {
  const { memories, removeMemory, settings, update } = useChat();
  const [instructions, setInstructions] = useState(
    "Keep suggestions small and kind. I'd rather start with one change than five."
  );

  return (
    <>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="memory">Remember across chats</FieldLabel>
          <FieldDescription>
            Still recalls what you choose to keep
          </FieldDescription>
        </FieldContent>
        <Switch
          checked={settings.memory}
          id="memory"
          onCheckedChange={(checked) => update("memory", checked)}
        />
      </Field>

      {settings.memory ? (
        <Card size="sm">
          <CardHeader>
            <CardTitle>What Still remembers</CardTitle>
            <CardAction>
              <span className="text-muted-foreground text-xs tabular-nums">
                {memories.length}
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            {memories.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nothing yet.</p>
            ) : (
              <ItemGroup className="gap-2">
                {memories.map((memory) => (
                  <Item key={memory} size="sm" variant="inset">
                    <ItemMedia variant="icon">
                      <Sparkle />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="font-normal">{memory}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        aria-label={`Forget: ${memory}`}
                        className="size-7"
                        icon={<X />}
                        onClick={() => removeMemory(memory)}
                        size="sm"
                        variant="ghost"
                      />
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            )}
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <Brain />
          <AlertTitle>Memory is paused</AlertTitle>
          <AlertDescription>
            Still won't use or save anything from your chats until you turn it
            back on.
          </AlertDescription>
        </Alert>
      )}

      <Accordion defaultValue={["instructions"]}>
        <AccordionItem value="instructions">
          <AccordionTrigger>Custom instructions</AccordionTrigger>
          <AccordionContent className="grid gap-3">
            <Textarea
              aria-label="Custom instructions"
              autoResize
              className="min-h-24"
              onChange={(event) => setInstructions(event.target.value)}
              value={instructions}
            />
            <Button
              className="justify-self-end normal-case tracking-normal"
              onClick={() => toast.success({ title: "Instructions saved" })}
              size="sm"
              variant="primary"
            >
              Save
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>Privacy</AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
            This demo runs entirely in your browser. Nothing you type is sent
            anywhere, and it's all gone when you reload.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
