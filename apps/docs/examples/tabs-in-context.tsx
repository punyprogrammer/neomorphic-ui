"use client";

import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Field, FieldGroup, FieldLabel } from "@neomorphic-react/ui/field";
import { Input } from "@neomorphic-react/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neomorphic-react/ui/tabs";

export default function TabsInContext() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="profile">
      <TabsList aria-label="Account settings">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              How others see you in the workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input autoComplete="name" defaultValue="Amara Okafor" />
              </Field>
              <Field>
                <FieldLabel>Job title</FieldLabel>
                <Input defaultValue="Product designer" />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button variant="primary">Save profile</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              You'll be signed out on other devices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Current password</FieldLabel>
                <Input autoComplete="current-password" type="password" />
              </Field>
              <Field>
                <FieldLabel>New password</FieldLabel>
                <Input autoComplete="new-password" type="password" />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button variant="primary">Change password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
