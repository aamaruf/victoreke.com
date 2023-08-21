import Image from "next/image";
import { Metadata } from "next";
import { getProfile } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile } from "react-icons/bi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";

export const metadata: Metadata = {
  title: "About | Victor Eke",
  metadataBase: new URL("https://victoreke.com/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Victor Eke",
    url: "https://victoreke.com/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692635746/victoreke/og.png",
  },
};

export default async function About() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
              <div className="order-2 lg:order-none">
                <Slide>
                  <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                    I&apos;m {data.fullName}. I live in {data.location}, where I
                    build the future.
                  </h1>

                  <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    <PortableText
                      value={data.fullBio}
                      components={CustomPortableText}
                    />
                  </div>
                </Slide>
              </div>

              <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
                <Slide delay={0.1}>
                  <div className="sticky top-10">
                    <Image
                      className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                      src={data.profileImage.image}
                      width={400}
                      height={400}
                      quality={100}
                      alt={data.profileImage.alt}
                      placeholder="blur"
                      blurDataURL={data.profileImage.lqip}
                      priority
                    />

                    <ul className="flex flex-col gap-y-4">
                      <li>
                        <a
                          href={`${data.resumeURL}?dl=${data.fullName}_resume`}
                          className="flex items-center justify-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-center text-lg cursor-cell font-incognito font-semibold"
                        >
                          <BiFile className="text-base" /> Download Résumé
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${data.email}`}
                          className="flex items-center gap-x-2 hover:text-primary-color"
                        >
                          <BiEnvelope className="text-lg" />
                          {data.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Slide>
              </aside>
            </section>
            <Slide delay={0.14}>
              <Usage />
            </Slide>
            <Heroes />
          </div>
        ))}
    </main>
  );
}