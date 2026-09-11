import { createHmac, timingSafeEqual } from "crypto";

export const OPAL_COOKIE = "opal_access";

function prototypePassword() {
  return process.env.OPAL_PROTOTYPE_PASSWORD ?? "opal";
}

export function accessToken() {
  return createHmac("sha256", prototypePassword())
    .update("opal-prototype-access")
    .digest("hex");
}

export function isValidToken(token: string | undefined) {
  if (!token) return false;
  const expected = Buffer.from(accessToken());
  const actual = Buffer.from(token);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export function passwordMatches(input: string) {
  const expected = Buffer.from(prototypePassword());
  const actual = Buffer.from(input);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}
