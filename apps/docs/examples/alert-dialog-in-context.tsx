"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@neomorphic-react/ui/alert-dialog";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@neomorphic-react/ui/item";
import { useState } from "react";

const initialKeys = [
  { id: "prod", name: "Production", hint: "sk_…4f9a", used: "Used today" },
  { id: "staging", name: "Staging", hint: "sk_…b21c", used: "Used Monday" },
  { id: "ci", name: "CI pipeline", hint: "sk_…07de", used: "Never used" },
];

export default function AlertDialogInContext() {
  const [keys, setKeys] = useState(initialKeys);

  return (
    <Card className="w-full max-w-md" size="sm">
      <CardHeader>
        <CardTitle>API keys</CardTitle>
        <CardDescription>Full access to this workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {keys.map((key) => (
            <Item key={key.id} size="sm">
              <ItemContent>
                <ItemTitle>{key.name}</ItemTitle>
                <ItemDescription>
                  {key.hint} · {key.used}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button aria-label={`Revoke ${key.name} key`} size="sm" />
                    }
                  >
                    Revoke
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Revoke the {key.name} key?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Requests using {key.hint} will fail straight away. Apps
                        that use it need a new key to keep working.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep key</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          setKeys((current) =>
                            current.filter((item) => item.id !== key.id)
                          )
                        }
                        variant="destructive"
                      >
                        Revoke key
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
