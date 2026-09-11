import type { Metadata } from "next";
import { cookies } from "next/headers";
import MeetingExtractorLoader from "@/components/meeting-extractor/MeetingExtractorLoader";
import UnlockForm from "./UnlockForm";
import { OPAL_COOKIE, isValidToken } from "./auth";

export const metadata: Metadata = {
  title: "Opal — Meeting notes",
  description:
    "Interactive prototype: meeting notes, transcription, task extraction, and a task board.",
};

export default async function MeetingDecisionExtractorPage() {
  const token = (await cookies()).get(OPAL_COOKIE)?.value;
  if (!isValidToken(token)) {
    return <UnlockForm />;
  }

  return <MeetingExtractorLoader />;
}
