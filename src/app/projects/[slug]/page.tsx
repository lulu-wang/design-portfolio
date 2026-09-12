import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { projects } from "@/data/site";

export function generateStaticParams() {
  return projects.filter((p) => p.slug !== "opal").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project — Lulu Wang" };
  return {
    title: `${project.name} — Lulu Wang`,
    description: project.description.replace(/\*\*|_/g, ""),
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || project.slug === "opal") notFound();

  return <ProjectCaseStudy project={project} />;
}
