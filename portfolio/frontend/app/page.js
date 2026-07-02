"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import CustomCursor from "@/components/cursor/CustomCursor";
import ShaderBackground from "@/components/canvas/ShaderBackground";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import { fetchPortfolioData } from "@/lib/api";

export default function Home() {
  useLenis(); // Initialize smooth scrolling

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const portfolioData = await fetchPortfolioData();
      setData(portfolioData);
      setLoading(false);
    }
    loadData();
  }, []);

  // Show a geometric loading screen while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback to empty objects if backend is not reachable yet
  const d = data || {};

  return (
    <>
      <CustomCursor />
      <ShaderBackground />
      <Navbar 
        name={d.settings?.site_name} 
        avatarUrl={d.hero?.avatar_url || "/avatar.png"} 
      />
      
      <main className="flex-1 w-full relative z-10">
        <HeroSection heroData={d.hero} />
        <AboutSection aboutData={d.about} />
        <ProjectsSection projects={d.projects} />
        <SkillsSection skills={d.skills} />
        <ExperienceSection experience={d.experience} />
        <ContactSection />
      </main>

      <Footer socialLinks={d.social} settings={d.settings} />
    </>
  );
}
