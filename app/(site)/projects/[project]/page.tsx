import Image from "next/image";
import { Metadata } from "next";
import { getSingleProject } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableTextComponent } from "@/app/(site)/components/shared/PortableText";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1690824172/victoreke/og-project.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return {
    title: `${project.name} | Project`,
    description: project.tagline,
    openGraph: {
      images: project.coverImage?.image || fallbackImage,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="lg:text-5xl text-3xl lg:leading-tight mb-4 max-w-sm">
            {project.name}
          </h1>

          <a
            href={project.projectUrl}
            rel="noreferrer noopener"
            target="_blank"
            className={`bg-[#1d1d20] text-white hover:border-zinc-700 border border-transparent rounded-md px-4 py-2 ${
              !project.projectUrl ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {project.projectUrl ? "Explore" : "Coming Soon"}
          </a>
        </div>

        <Image
          className="rounded-xl border dark:border-zinc-800 border-zinc-100"
          width={900}
          height={460}
          src={project.coverImage?.image || fallbackImage}
          alt={project.coverImage?.alt || project.name}
          quality={100}
        />

        <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
          <PortableText
            value={project.description}
            components={CustomPortableTextComponent}
          />
        </div>
      </div>
    </main>
  );
}
