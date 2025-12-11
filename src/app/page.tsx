import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import FunStats from "@/components/FunStats";
import Timeline from "@/components/Timeline";
import { Portfolio } from "@/utils/interface";
import WhatICanBuild from "@/components/WhatICanBuild";

export default async function Home() {
  const portfolio = (await import("@/profile.json")).default;

  const {
    about,
    funStats,
    services,
    skills,
    projects,
    social_handles,
    timeline,
    email,
  } = portfolio as Portfolio;

  return (
    <main className="relative">
      <Header social={social_handles} />
      <Hero about={about} />
      <About about={about} timeline={timeline} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <WhatICanBuild services={services} />
      <Timeline timeline={timeline} />
      <FunStats funStats={funStats} />
      <Contact email={email} social_handle={social_handles} about={about} />
    </main>
  );
}