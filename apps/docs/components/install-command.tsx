"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@neomorphic-react/ui/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";
import { useSyncExternalStore } from "react";

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type Manager = (typeof MANAGERS)[number];

const STORAGE_KEY = "docs:package-manager";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getManager(): Manager {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return MANAGERS.includes(stored as Manager) ? (stored as Manager) : "pnpm";
}

function setManager(manager: Manager) {
  window.localStorage.setItem(STORAGE_KEY, manager);
  for (const listener of listeners) {
    listener();
  }
}

function command(manager: Manager, packages: string, dev: boolean) {
  const flag = dev ? " -D" : "";
  switch (manager) {
    case "npm":
      return `npm install${flag} ${packages}`;
    case "yarn":
      return `yarn add${flag} ${packages}`;
    case "bun":
      return `bun add${flag} ${packages}`;
    default:
      return `pnpm add${flag} ${packages}`;
  }
}

interface InstallCommandProps {
  /** Install as a dev dependency. */
  dev?: boolean;
  /** Space-separated package names. */
  packages: string;
}

/**
 * The install command for each package manager, in tabs. The choice is
 * remembered and shared by every install block on the site.
 */
export function InstallCommand({ dev = false, packages }: InstallCommandProps) {
  const manager = useSyncExternalStore(subscribe, getManager, () => "pnpm");
  return (
    <Tabs
      className="not-prose my-6 gap-0"
      onValueChange={(value) => setManager(value as Manager)}
      value={manager}
    >
      <CodeBlock>
        <div className="px-3 pt-1.5">
          <TabsList aria-label="Package manager" variant="line">
            {MANAGERS.map((item) => (
              <TabsTrigger
                className="h-9 font-mono text-xs"
                key={item}
                value={item}
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {MANAGERS.map((item) => {
          const text = command(item, packages, dev);
          return (
            <TabsContent key={item} value={item}>
              <CodeBlockActions className="absolute end-2 top-2">
                <CodeBlockCopyButton value={text} />
              </CodeBlockActions>
              <CodeBlockContent className="text-[0.8125rem]">
                {text}
              </CodeBlockContent>
            </TabsContent>
          );
        })}
      </CodeBlock>
    </Tabs>
  );
}
