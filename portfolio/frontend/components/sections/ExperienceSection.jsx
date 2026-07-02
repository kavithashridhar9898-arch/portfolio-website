"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const ANSHUL_EXPERIENCE = [
  {
    title: "Independent Full-Stack Developer",
    company: "Self-Employed",
    period: "January 2025 – Present",
    description: "Designing and developing full-stack web and mobile applications including HiFix (AI-powered home service marketplace), TrueScan (AI fake news detector), and a Blockchain Certificate Verification platform. Work includes AI integrations, JWT authentication, RESTful APIs, React Native, and cloud deployment.",
    highlights: ["HiFix Mobile App", "TrueScan AI Platform", "Blockchain Certificate System"],
    icon: "💻",
  }
];

export default function ExperienceSection({ experience }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll('.exp-node');
    nodes.forEach((node) => {
      gsap.set(node, { x: -40, opacity: 0 });
      ScrollTrigger.create({
        trigger: node,
        start: "top 85%",
        onEnter: () => {
          gsap.to(node, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
        },
        once: true
      });
    });
  }, []);

  const displayExp = (experience && experience.length > 0) ? experience : ANSHUL_EXPERIENCE;

  return (
    <section id="experience" className="py-section-gap px-4 md:px-gutter max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 block">Trajectory</span>
        <h2 className="font-headline text-headline-lg">Professional Journey</h2>
      </div>

      <div ref={containerRef} className="relative">
        {/* Timeline bar */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent"></div>

        {displayExp.map((exp, idx) => (
          <div key={idx} className="exp-node ml-16 mb-16 relative">
            {/* Timeline dot */}
            <div className="absolute -left-[2.75rem] top-1 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/40 border-2 border-background ring-4 ring-primary/10"></div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
              <div>
                <h3 className="font-subheading text-2xl text-on-surface">{exp.title}</h3>
                <div className="font-body text-lg text-primary/80 mt-1">{exp.company}</div>
              </div>
              <span className="font-label text-xs uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-full bg-primary/5 flex-shrink-0 self-start">
                {exp.period}
              </span>
            </div>

            <p className="font-body text-on-surface-variant leading-relaxed mb-4">{exp.description}</p>

            {exp.highlights && (
              <div className="flex flex-wrap gap-2">
                {exp.highlights.map(h => (
                  <span key={h} className="font-label text-xs px-3 py-1 rounded-full bg-white/5 text-on-surface-variant border border-white/10">
                    → {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Open to work CTA */}
        <div className="ml-16 mt-4">
          <p className="font-body text-on-surface-variant mb-4">
            🤝 Open to collaborating on <strong className="text-on-surface">Salesforce, Full-Stack, React Native</strong> and Open Source projects.
          </p>
          <a href="mailto:anshulnayak.9898@gmail.com">
            <Button variant="outline">Get In Touch</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
