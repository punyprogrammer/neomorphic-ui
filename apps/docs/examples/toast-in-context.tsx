"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import { toast } from "@neomorphic-react/ui/toast";
import { Copy } from "lucide-react";

const link = "https://northwind.studio/join/k7Q2-wP9x";

export default function ToastInContext() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied");
    } catch {
      toast.error({
        title: "Couldn't copy the link",
        description: "Select the link and copy it yourself.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md" size="sm">
      <CardHeader>
        <CardTitle>Invite your team</CardTitle>
        <CardDescription>
          Anyone with this link can join Northwind as a viewer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InputGroup>
          <InputGroupInput aria-label="Invite link" readOnly value={link} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy link"
              icon={<Copy />}
              onClick={copy}
            />
          </InputGroupAddon>
        </InputGroup>
      </CardContent>
    </Card>
  );
}
