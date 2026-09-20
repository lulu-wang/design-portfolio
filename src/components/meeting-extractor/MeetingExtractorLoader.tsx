"use client";

import dynamic from "next/dynamic";

const MeetingExtractorApp = dynamic(
  () => import("./MeetingExtractorApp"),
  {
    ssr: false,
    loading: () => <div className="min-h-dvh bg-[#f6f9fc]" />,
  },
);

export default function MeetingExtractorLoader() {
  return <MeetingExtractorApp />;
}
