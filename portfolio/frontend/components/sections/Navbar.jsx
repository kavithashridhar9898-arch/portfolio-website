"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function Navbar({ avatarUrl, name }) {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-gutter py-4 rounded-full mt-4 mx-auto w-[90%] max-w-7xl bg-surface-container/60 backdrop-blur-xl border-t border-l border-white/10 shadow-2xl shadow-black/40">
      <div className="font-display text-subheading-md uppercase tracking-[0.2em] text-on-surface">
        {name || "Aether.OS"}
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <a href="#projects" className="text-primary font-bold border-b border-primary pb-1 hover:scale-105 transition-all duration-500 ease-out">Projects</a>
        <a href="#experience" className="text-on-surface-variant font-medium hover:scale-105 hover:text-primary transition-all duration-500 ease-out">Experience</a>
        <a href="#tech" className="text-on-surface-variant font-medium hover:scale-105 hover:text-primary transition-all duration-500 ease-out">Tech</a>
        <a href="#insights" className="text-on-surface-variant font-medium hover:scale-105 hover:text-primary transition-all duration-500 ease-out">Insights</a>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">notifications</span>
        <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">settings</span>
        <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-white/10 relative">
          {avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt="Architect Portrait" 
              fill
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <div className="w-full h-full bg-primary/20"></div>
          )}
        </div>
      </div>
    </nav>
  );
}
