import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { projects } from "@/data/site";

const project = projects.find((p) => p.slug === "opal");

export const metadata: Metadata = {
  title: project ? `${project.name} — Lulu Wang` : "Opal — Lulu Wang",
  description: project?.description.replace(/\*\*|_/g, "") ?? "",
};

export default function OpalProjectPage() {
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
