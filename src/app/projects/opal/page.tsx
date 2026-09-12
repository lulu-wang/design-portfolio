import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import UnlockForm from "@/app/prototypes/opal/UnlockForm";
import { OPAL_COOKIE, isValidToken } from "@/app/prototypes/opal/auth";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { projects } from "@/data/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const project = projects.find((p) => p.slug === "opal");

export const metadata: Metadata = {
  title: project ? `${project.name} — Lulu Wang` : "Opal — Lulu Wang",
  description: project?.description.replace(/\*\*|_/g, "") ?? "",
};

export default async function OpalProjectPage() {
  if (!project) notFound();

  const token = (await cookies()).get(OPAL_COOKIE)?.value;
  if (!isValidToken(token)) {
    return <UnlockForm redirectTo="/projects/opal" />;
  }

  return <ProjectCaseStudy project={project} />;
}
