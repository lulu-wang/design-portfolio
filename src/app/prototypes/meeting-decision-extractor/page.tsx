import type { Metadata } from "next";
import MeetingExtractorLoader from "@/components/meeting-extractor/MeetingExtractorLoader";

export const metadata: Metadata = {
  title: "Opal — Meeting notes",
  description:
    "Interactive prototype: meeting notes, transcription, task extraction, and a task board.",
};

export default function MeetingDecisionExtractorPage() {
  return <MeetingExtractorLoader />;
}
