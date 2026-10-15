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
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Input } from "@neomorphic-react/ui/input";
import { Label } from "@neomorphic-react/ui/label";

export default function LabelInContext() {
  return (
    <Card
      className="w-full max-w-sm"
      render={<form onSubmit={(event) => event.preventDefault()} />}
    >
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back to your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="sign-in-email">Email</Label>
          <Input
            autoComplete="email"
            id="sign-in-email"
            name="email"
            placeholder="you@company.com"
            type="email"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="sign-in-password">Password</Label>
            <a
              className="text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground"
              href="#forgot-password"
            >
              Forgot password?
            </a>
          </div>
          <Input
            autoComplete="current-password"
            id="sign-in-password"
            name="password"
            type="password"
          />
        </div>
        <Label className="gap-3 font-normal">
          <Checkbox name="remember" />
          Keep me signed in on this device
        </Label>
      </CardContent>
      <CardFooter>
        <Button fullWidth type="submit" variant="primary">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
