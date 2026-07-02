"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

// ──────────────────────────────────────────────────────────
// Parallax Hero — background.png with mouse depth effect
// ──────────────────────────────────────────────────────────
export default function HeroSection({ heroData }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statusRef = useRef(null);
  const ctaRef = useRef(null);
  const canvasRef = useRef(null);

  // Parallax layer refs (different depth multipliers)
  const imgRef = useRef(null);       // furthest back — moves least
  const midRef = useRef(null);       // mid layer
  const frontRef = useRef(null);     // foreground badges — moves most

  // ── Entry animations ──────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(statusRef.current,
      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(titleRef.current,
      { y: 50, opacity: 0, filter: "blur(20px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, "-=0.3"
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6"
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(canvasRef.current,
      { y: 80, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" }, "-=0.8"
    );
  }, []);

  // ── Mouse Parallax ────────────────────────────────────────
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let animFrame;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalize to -1 → 1
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      // Lerp for smooth follow
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Background image — moves more dynamically and starts slightly zoomed out
      if (imgRef.current) {
        imgRef.current.style.transform = `
          translate3d(${currentX * -45}px, ${currentY * -35}px, 0)
          scale(1.05)
        `;
      }

      // Mid layer gradients/vignette — moves medium
      if (midRef.current) {
        midRef.current.style.transform = `
          translate3d(${currentX * 15}px, ${currentY * 10}px, 0)
        `;
      }

      // Front floating badges — moves most (depth: close)
      if (frontRef.current) {
        frontRef.current.style.transform = `
          translate3d(${currentX * 35}px, ${currentY * 25}px, 0)
        `;
      }

      animFrame = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    animate();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const nameParts = (heroData?.title || "ANSHUL SRIDARANAYAK KATTE").split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 px-4 md:px-gutter relative overflow-hidden">

      {/* ── Status Badge ─────────────────────────────────── */}
      <div ref={statusRef} style={{ opacity: 0 }} className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span className="font-label text-xs uppercase tracking-widest text-primary">
          {heroData?.status_text || "Available for Work"}
        </span>
      </div>

      {/* ── Name & Subtitle ───────────────────────────────── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          style={{ opacity: 0, fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          className="font-display tracking-tighter mb-4 leading-none"
        >
          <span className="block text-on-surface">{firstName}</span>
          <span className="block text-primary">{lastName}</span>
        </h1>
        <p
          ref={subtitleRef}
          style={{ opacity: 0 }}
          className="font-body text-xl md:text-2xl text-on-surface-variant mb-10 max-w-2xl mx-auto"
        >
          {heroData?.subtitle || "Full-Stack Developer & AI Enthusiast"}
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-primary text-background font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {heroData?.cta_text || "Explore Projects"}
          </button>
          <a
            href="https://www.linkedin.com/in/anshul-sn-katte-4068073b7"
            target="_blank"
            rel="noreferrer"
            className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border-b border-white/10 hover:border-primary pb-1"
          >
            LinkedIn Profile →
          </a>
        </div>
      </div>

      {/* ── Parallax Depth Panel ──────────────────────────── */}
      <div
        ref={canvasRef}
        style={{ opacity: 0 }}
        className="mt-16 w-full max-w-6xl mx-auto rounded-2xl overflow-hidden h-[50vh] md:h-[62vh] relative z-10 border border-white/8 cursor-crosshair"
        style={{
          opacity: 0,
          perspective: '1200px',
          background: '#08081a',
        }}
      >

        {/* ── LAYER 1: Background image (moves least) ── */}
        <div
          ref={imgRef}
          className="absolute will-change-transform"
          style={{ 
            transition: 'transform 0s', 
            transformOrigin: 'center center',
            width: '116%',
            height: '116%',
            top: '-8%',
            left: '-8%'
          }}
        >
          <Image
            src="/background.png"
            alt="Developer Workspace"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* ── LAYER 2: Atmospheric overlays (mid depth) ── */}
        <div ref={midRef} className="absolute inset-0 will-change-transform pointer-events-none">
          {/* Dark vignette edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,26,0.85)_100%)]"></div>
          {/* Color grade — cool teal tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-900/20 mix-blend-color"></div>
          {/* Bottom dark fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"></div>
          {/* Top dark fade */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-background/60 to-transparent"></div>
          {/* Scanline effect */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
              backgroundSize: '100% 3px',
            }}
          ></div>
        </div>

        {/* ── LAYER 3: Floating badges (moves most — closest) ── */}
        <div ref={frontRef} className="absolute inset-0 will-change-transform pointer-events-none">

          {/* Tech Stack Badges — floating in different positions */}
          {[
            { label: 'React Native', color: '#61dafb', x: '8%', y: '15%' },
            { label: 'Node.js', color: '#339933', x: '72%', y: '10%' },
            { label: 'MySQL', color: '#00758F', x: '80%', y: '72%' },
            { label: 'Next.js', color: '#ffffff', x: '5%', y: '70%' },
            { label: 'AWS', color: '#ff9900', x: '88%', y: '40%' },
            { label: 'HiFix AI', color: '#a855f7', x: '40%', y: '80%' },
          ].map((badge, i) => (
            <div
              key={badge.label}
              className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border"
              style={{
                left: badge.x,
                top: badge.y,
                borderColor: `${badge.color}33`,
                backgroundColor: `${badge.color}15`,
                animation: `float-${i % 3} ${3.5 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.color, boxShadow: `0 0 6px ${badge.color}` }}></span>
              <span className="font-label text-[10px] uppercase tracking-widest" style={{ color: badge.color }}>{badge.label}</span>
            </div>
          ))}

          {/* Corner accent lines */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/40 rounded-tr"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/40 rounded-bl"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br"></div>

          {/* Center crosshair HUD hint */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse"></span>
            <span className="font-label text-[9px] uppercase tracking-widest text-primary/50">Move mouse for depth</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse"></span>
          </div>
        </div>

      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
}
