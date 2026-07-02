"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// Devicon CDN base URL
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SKILL_ICONS = {
  // Languages
  "C": `${DEVICON_BASE}/c/c-original.svg`,
  "C++": `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
  "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "Java": `${DEVICON_BASE}/java/java-original.svg`,
  "Python": `${DEVICON_BASE}/python/python-original.svg`,
  "TypeScript": `${DEVICON_BASE}/typescript/typescript-original.svg`,
  "HTML5/CSS3": `${DEVICON_BASE}/html5/html5-original.svg`,
  "R": `${DEVICON_BASE}/r/r-original.svg`,
  "LaTeX": `${DEVICON_BASE}/latex/latex-original.svg`,
  // Frameworks/Libraries
  "React Native": `${DEVICON_BASE}/react/react-original.svg`,
  "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Express.js": `${DEVICON_BASE}/express/express-original.svg`,
  "TailwindCSS": `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "Flutter": `${DEVICON_BASE}/flutter/flutter-original.svg`,
  "FastAPI": `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  "SASS": `${DEVICON_BASE}/sass/sass-original.svg`,
  "Socket.io": `${DEVICON_BASE}/socketio/socketio-original.svg`,
  // Databases
  "MySQL": `${DEVICON_BASE}/mysql/mysql-original.svg`,
  "MongoDB": `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  "Postgres": `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  "Supabase": `${DEVICON_BASE}/supabase/supabase-original.svg`,
  "Neo4J": `${DEVICON_BASE}/neo4j/neo4j-original.svg`,
  // Cloud/DevOps
  "AWS": `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "Docker": `${DEVICON_BASE}/docker/docker-original.svg`,
  "Kubernetes": `${DEVICON_BASE}/kubernetes/kubernetes-original.svg`,
  "Jenkins": `${DEVICON_BASE}/jenkins/jenkins-original.svg`,
  "Nginx": `${DEVICON_BASE}/nginx/nginx-original.svg`,
  "Ansible": `${DEVICON_BASE}/ansible/ansible-original.svg`,
  // Tools
  "Git": `${DEVICON_BASE}/git/git-original.svg`,
  "GitHub": `${DEVICON_BASE}/github/github-original.svg`,
  "GitLab": `${DEVICON_BASE}/gitlab/gitlab-original.svg`,
  "Figma": `${DEVICON_BASE}/figma/figma-original.svg`,
  "Canva": `${DEVICON_BASE}/canva/canva-original.svg`,
  // Other
  "Unity": `${DEVICON_BASE}/unity/unity-original.svg`,
  "Unreal Engine": `${DEVICON_BASE}/unrealengine/unrealengine-original.svg`,
};

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

const FULL_SKILL_LIST = [
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React Native", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TailwindCSS", category: "Frontend" },
  { name: "HTML5/CSS3", category: "Frontend" },
  { name: "Flutter", category: "Frontend" },
  { name: "SASS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "C", category: "Backend" },
  { name: "C++", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Socket.io", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Postgres", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Neo4J", category: "Database" },
  { name: "AWS", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Jenkins", category: "DevOps" },
  { name: "Nginx", category: "DevOps" },
  { name: "Ansible", category: "DevOps" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "GitLab", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Canva", category: "Tools" },
  { name: "Unity", category: "Tools" },
  { name: "Unreal Engine", category: "Tools" },
  { name: "R", category: "Backend" },
  { name: "LaTeX", category: "Tools" },
];

export default function SkillsSection({ skills }) {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (!sectionRef.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(".skill-chip",
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.03, ease: "back.out(1.5)" }
        );
      },
      once: true
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(".skill-chip",
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.02, ease: "back.out(1.5)" }
    );
  }, [activeCategory]);

  const displaySkills = FULL_SKILL_LIST.filter(s => activeCategory === "All" || s.category === activeCategory);

  return (
    <section ref={sectionRef} id="tech" className="py-section-gap px-4 md:px-gutter max-w-container-max mx-auto">
      <div className="text-center mb-12">
        <span className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 block">Stack & Expertise</span>
        <h2 className="font-headline text-headline-lg mb-8">Technologies I Work With</h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-label text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
                  : "border-white/10 text-on-surface-variant hover:border-primary/40 hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {displaySkills.map((skill, i) => (
          <GlassCard
            key={`${skill.name}-${activeCategory}`}
            className="skill-chip p-4 flex flex-col items-center gap-3 text-center border-white/5 hover:border-primary/30 hover:bg-primary/5 cursor-default !rounded-2xl"
          >
            {SKILL_ICONS[skill.name] ? (
              <img
                src={SKILL_ICONS[skill.name]}
                alt={skill.name}
                className="w-8 h-8 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span className="text-2xl">⚙️</span>
            )}
            <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant leading-tight">{skill.name}</span>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
