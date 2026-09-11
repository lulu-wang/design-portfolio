"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OPAL_COOKIE, accessToken, passwordMatches } from "./auth";

export async function unlockOpalPrototype(
  _prev: { error: string } | null,
  formData: FormData,
) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "That password isn’t right." };
  }

  const store = await cookies();
  store.set(OPAL_COOKIE, accessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/prototypes/meeting-decision-extractor");
}
