"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OPAL_COOKIE, accessToken, passwordMatches } from "./auth";

const ALLOWED_NEXT = new Set(["/prototypes/opal", "/projects/opal"]);

export async function unlockOpalPrototype(
  _prev: { error: string } | null,
  formData: FormData,
) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "That password isn’t right." };
  }

  const next = String(formData.get("next") ?? "/prototypes/opal");
  const destination = ALLOWED_NEXT.has(next) ? next : "/prototypes/opal";

  const store = await cookies();
  store.set(OPAL_COOKIE, accessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(destination);
}
