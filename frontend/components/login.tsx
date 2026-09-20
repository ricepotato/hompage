"use client";

import { useActionState } from "react";
import clsx from "clsx";
import { loginAction } from "@/actions/login";
import { type ActionResult } from "@/actions/index";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, dispatchAction, isPending] = useActionState<
    ActionResult,
    FormData
  >(loginAction, {
    success: false,
  });
  return (
    <form action={dispatchAction} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="username"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:text-zinc-50 dark:focus:border-zinc-50"
          defaultValue={"admin"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:text-zinc-50 dark:focus:border-zinc-50"
          defaultValue={"password"}
        />
      </div>

      <p
        aria-live="polite"
        className={clsx("h-5 text-sm", {
          "text-emerald-600 dark:text-emerald-400": state.success,
          "text-red-600 dark:text-red-400": state.message && !state.success,
        })}
      >
        {state.message}
      </p>

      <Button type="submit" disabled={isPending} size="lg" className="mt-2">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
