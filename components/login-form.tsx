"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-[2px] after:bg-foreground/20">Sign in</h1>
        <p className="text-sm text-muted-foreground/60">
          Sign in to your account using your credentials
        </p>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="yourmom@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="h-8"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
           
            </div>
            <Input
              id="password"
              placeholder="follow-me?"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              className="h-8"
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
               <Link
                href="/auth/forgot-password"
                className="text-xs underline underline-offset-4 text-muted-foreground/60"
              >
                Forgot your password?
              </Link>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={isLoading} className="h-8">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="flex flex-col gap-4 text-sm">
        <div className="text-muted-foreground/60">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
        <p className="text-muted-foreground/60">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
