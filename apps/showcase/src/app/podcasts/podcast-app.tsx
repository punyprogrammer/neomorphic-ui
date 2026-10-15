"use client";

import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@neomorphic-react/ui/sidebar";
import { cn } from "@neomorphic-react/ui/utils";
import { type CSSProperties, useEffect } from "react";

import { Library } from "./library";
import { MainView } from "./main-view";
import { PlayerBar } from "./player-bar";
import { PlayerProvider, usePlayer } from "./player-context";
import { SidePanel } from "./side-panel";

export function PodcastApp() {
  return (
    <PlayerProvider>
      <SidebarProvider
        className="[--player-h:10.5rem] md:[--player-h:7rem]"
        style={
          {
            "--sidebar-width": "19rem",
            "--sidebar-width-icon": "4.5rem",
          } as CSSProperties
        }
      >
        <Shell />
      </SidebarProvider>
    </PlayerProvider>
  );
}

const TYPING = "input, textarea, button, [role='slider'], [contenteditable]";

function Shell() {
  const { panel, setPanel, toggle } = usePlayer();
  const library = useSidebar();
  const { setOpen: setLibraryOpen } = library;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.code === "Space" && !target.closest(TYPING)) {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Start roomy on narrower desktops: the main view needs the width more.
  useEffect(() => {
    if (window.matchMedia("(max-width: 1279px)").matches) {
      setPanel(null);
    }
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setLibraryOpen(false);
    }
  }, [setLibraryOpen, setPanel]);

  return (
    <>
      <Library />
      {/* The queue panel keeps its own open state; ⌘B only toggles the library. */}
      <SidebarProvider
        className="min-w-0 flex-1"
        onOpenChange={() => undefined}
        open={panel !== null}
        style={{ "--sidebar-width": "21rem" } as CSSProperties}
      >
        <SidebarInset
          className={cn(
            "h-svh min-w-0 ps-3 pt-3 pb-[calc(var(--player-h)+--spacing(3))] md:ps-0",
            !panel && "pe-3"
          )}
          data-theme="cloud"
        >
          <h1 className="sr-only">Lull, a calm podcast player</h1>
          <div className="min-h-0 flex-1">
            <MainView
              onOpenLibrary={
                library.isMobile ? () => library.setOpenMobile(true) : undefined
              }
            />
          </div>
        </SidebarInset>
        <SidePanel />
        <div className="fixed inset-x-0 bottom-0 z-(--z-sticky) h-(--player-h) px-3 pb-3">
          <PlayerBar
            onFullscreen={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement
                  .requestFullscreen()
                  .catch(() => undefined);
              }
            }}
          />
        </div>
      </SidebarProvider>
    </>
  );
}
