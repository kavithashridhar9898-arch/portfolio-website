"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const QUICK_FACTS = [
  { icon: "🔭", label: "Currently Building", value: "HiFix – AI Home Service Marketplace" },
  { icon: "🌱", label: "Currently Learning", value: "Salesforce, Cloud Computing, AI" },
  { icon: "📍", label: "Location", value: "Mangalore, Karnataka, India" },
  { icon: "💬", label: "Ask Me About", value: "React Native, Node.js, MySQL, JWT" },
];

export default function AboutSection({ aboutData }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reveals = sectionRef.current.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => el.classList.add('active'),
        once: true
      });
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-section-gap px-4 md:px-gutter max-w-container-max mx-auto">
      
      <div className="text-center mb-16 reveal">
        <span className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 block">
          {aboutData?.section_label || "The Mission"}
        </span>
        <h2 className="font-headline text-headline-lg">
          {aboutData?.headline || "Turning real-world problems into software products."}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

        {/* Avatar + Status Card */}
        <GlassCard className="md:col-span-4 p-8 reveal flex flex-col items-center text-center gap-4">
          <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10 relative">
            <Image
              src="/avatar.png"
              alt="Anshul SridaraNayak Katte"
              fill
              className="object-cover object-top"
              sizes="160px"
            />
          </div>
          <div>
            <h3 className="font-subheading text-xl mb-1 text-on-surface">Anshul SridaraNayak Katte</h3>
            <p className="font-label text-xs uppercase tracking-widest text-primary mb-3">Full-Stack Developer</p>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">📍 Mangalore, Karnataka, India</p>
          </div>
          <div className="flex gap-3 mt-2">
            <a href="https://www.linkedin.com/in/anshul-sn-katte-4068073b7" target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all text-xs font-bold">in</a>
            <a href="https://github.com/kavithashridhar9898-arch" target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48l-.01-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
            </a>
            <a href="mailto:anshulnayak.9898@gmail.com"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all text-xs">✉</a>
          </div>
        </GlassCard>

        {/* Bio + Quick Facts Grid */}
        <div className="md:col-span-8 flex flex-col gap-6">

          {/* Bio Card */}
          <GlassCard className="p-8 reveal">
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
              {aboutData?.body?.split('\n\n')[0] || "Driven by curiosity and a passion for solving real-world problems, I design and develop full-stack web and mobile applications."}
            </p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="font-body text-body-md text-on-surface-variant/70 leading-relaxed">
                ⚡ I enjoy turning real-world problems into software products. I&apos;m a lifelong learner who genuinely enjoys exploring new ideas—whether they&apos;re technical, business-related, or completely outside technology.
              </p>
            </div>
          </GlassCard>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_FACTS.map((fact, i) => (
              <GlassCard key={i} className="p-5 reveal flex items-start gap-4 border-white/5">
                <span className="text-2xl flex-shrink-0">{fact.icon}</span>
                <div>
                  <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">{fact.label}</div>
                  <div className="font-body text-sm text-on-surface">{fact.value}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stat Cards */}
        <GlassCard className="md:col-span-6 p-10 reveal flex flex-col justify-center text-center">
          <div className="font-display text-6xl text-primary mb-2">
            {aboutData?.stat_value || "15+"}
          </div>
          <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            {aboutData?.stat_label || "Technologies Learning"}
          </div>
        </GlassCard>

        <GlassCard className="md:col-span-6 p-10 reveal flex flex-col justify-center text-center">
          <div className="font-display text-6xl text-primary mb-2">3+</div>
          <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            AI-Integrated Projects
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
