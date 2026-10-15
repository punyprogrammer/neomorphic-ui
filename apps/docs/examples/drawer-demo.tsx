"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@neomorphic-react/ui/drawer";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Share playlist</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Share "Sunday morning"</DrawerTitle>
            <DrawerDescription>
              Anyone with the link can listen, but only you can edit it.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="primary" />}>
              Copy link
            </DrawerClose>
            <DrawerClose render={<Button variant="ghost" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
