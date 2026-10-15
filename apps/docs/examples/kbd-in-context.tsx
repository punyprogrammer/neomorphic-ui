"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neomorphic-react/ui/dialog";
import { Kbd, KbdGroup } from "@neomorphic-react/ui/kbd";
import { Separator } from "@neomorphic-react/ui/separator";
import { Keyboard } from "lucide-react";

const sections = [
  {
    title: "Navigation",
    shortcuts: [
      { action: "Search", keys: ["/"] },
      { action: "Go to inbox", keys: ["G", "I"], sequence: true },
      { action: "Close panel", keys: ["Esc"] },
    ],
  },
  {
    title: "Messages",
    shortcuts: [
      { action: "New message", keys: ["C"] },
      { action: "Reply", keys: ["R"] },
      { action: "Archive", keys: ["E"] },
    ],
  },
];

export default function KbdInContext() {
  return (
    <Dialog>
      <DialogTrigger render={<Button icon={<Keyboard />} />}>
        Keyboard shortcuts
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            Shortcuts work anywhere outside a text field.
          </DialogDescription>
        </DialogHeader>
        {sections.map(({ title, shortcuts }, index) => (
          <section className="grid gap-3" key={title}>
            {index > 0 ? <Separator /> : null}
            <h3 className="font-medium text-foreground text-sm">{title}</h3>
            <dl className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 text-sm">
              {shortcuts.map(({ action, keys, sequence }) => (
                <div className="contents" key={action}>
                  <dt className="text-muted-foreground">{action}</dt>
                  <dd>
                    <KbdGroup>
                      {keys.map((key, i) => (
                        <span className="contents" key={key}>
                          {sequence && i > 0 ? "then" : null}
                          <Kbd>{key}</Kbd>
                        </span>
                      ))}
                    </KbdGroup>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </DialogContent>
    </Dialog>
  );
}
