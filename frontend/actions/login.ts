"use server";

import { createSession, deleteSession } from "@/lib/session";
import { ActionResult } from ".";
import { redirect } from "next/navigation";

export async function loginAction(
  previousState: ActionResult,
  actionPayload: FormData,
): Promise<ActionResult> {
  const username = actionPayload.get("username");
  const password = actionPayload.get("password");

  // 0.5 초 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (username === "admin" && password === "password") {
    await createSession({ username });
    redirect("/protected");

    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid username or password" };
  }
}

export async function logoutAction() {
  // 0.5 초 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  await deleteSession();
  redirect("/login");
}
