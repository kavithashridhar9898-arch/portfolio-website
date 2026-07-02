"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const IMAGE_BASE_URL = API_URL.replace('/api', '');

const FEATURED_PROJECTS = [
  {
    title: "HiFix – AI-Powered Home Service Marketplace",
    slug: "hifix-home-service",
    description: "A full-stack cross-platform mobile app connecting homeowners with verified local service professionals. Features real-time chat, Face ID auth, email OTP verification, and AI-powered repair cost estimation.",
    tags: ["React Native", "Node.js", "Express.js", "MySQL", "JWT"],
    github_url: "https://github.com/kavithashridhar9898-arch",
    live_url: null,
    featured: true,
    emoji: "🚀",
  },
  {
    title: "TrueScan – AI-Powered Fake News Detection",
    slug: "truescan-fake-news",
    description: "A full-stack web platform leveraging BERT, LSTM and Logistic Regression models to detect fake news from URLs and articles. Interactive dashboard with confidence scores and analysis history.",
    tags: ["Node.js", "Python", "BERT", "LSTM", "TailwindCSS"],
    github_url: "https://github.com/kavithashridhar9898-arch",
    live_url: null,
    featured: true,
    emoji: "🤖",
  },
  {
    title: "Blockchain Academic Certificate Verification",
    slug: "blockchain-certificate-verification",
    description: "Eliminates certificate forgery using SHA-256 cryptographic hashing and blockchain concepts. Supports certificate issuance, QR code validation, and transparent verification for institutions.",
    tags: ["Node.js", "MySQL", "SHA-256", "Ethereum", "Web3"],
    github_url: "https://github.com/kavithashridhar9898-arch",
    live_url: null,
    featured: true,
    emoji: "🔐",
  }
];

export default function ProjectsSection({ projects }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.project-card');
    cards.forEach((card) => {
      gsap.set(card, { y: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        },
        once: true
      });
    });
  }, []);

  // Use passed projects from DB if available, else use hardcoded real ones
  const displayProjects = (projects && projects.length > 0)
    ? projects.filter(p => p.featured).map(p => ({
        ...p,
        emoji: p.title.includes('HiFix') ? '🚀' : p.title.includes('TrueScan') ? '🤖' : '🔐'
      }))
    : FEATURED_PROJECTS;

  return (
    <section id="projects" className="py-section-gap px-4 md:px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
          <span className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 block">Selected Works</span>
          <h2 className="font-headline text-headline-lg">Featured Projects</h2>
        </div>
        <a href="https://github.com/kavithashridhar9898-arch" target="_blank" rel="noreferrer">
          <Button variant="outline" className="mt-6 md:mt-0">View All on GitHub</Button>
        </a>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 gap-8">
        {displayProjects.map((project, idx) => (
          <GlassCard key={idx} className="project-card p-0 overflow-hidden group border-white/5 hover:border-primary/20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Content */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-subheading text-2xl mb-4 group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.tags || []).map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-4 flex-wrap">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer">
                      <Button variant="outline">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current mr-2"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48l-.01-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
                        Source Code
                      </Button>
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer">
                      <Button variant="ghost">Live Demo →</Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Visual panel */}
              <div className="relative h-56 lg:h-auto overflow-hidden bg-surface-container-highest min-h-[250px]">
                {project.image_url ? (
                  <>
                    <img 
                      src={`${IMAGE_BASE_URL}${project.image_url}`} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-background via-primary/5 to-transparent"></div>
                )}
                
                {/* Geometric decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border border-primary/10 rounded-full group-hover:border-primary/30 transition-colors duration-700"></div>
                    <div className="absolute inset-6 border border-primary/15 rounded-full group-hover:border-primary/45 transition-colors duration-700 animate-spin" style={{ animationDuration: '20s' }}></div>
                    <div className="absolute inset-12 border border-primary/20 rounded-full group-hover:border-primary/60 transition-colors duration-700"></div>
                  </div>
                </div>
                
                {/* Project number */}
                <div className="absolute bottom-6 right-6 font-display text-8xl text-primary/5 font-bold select-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
