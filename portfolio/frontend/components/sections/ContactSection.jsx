"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reveal = sectionRef.current.querySelector(".reveal");
    ScrollTrigger.create({
      trigger: reveal,
      start: "top 85%",
      onEnter: () => reveal.classList.add("active"),
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", text: "Message transmitted successfully. I will reach out soon." });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", text: data.message || "Failed to transmit message. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Cannot establish link to system. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-section-gap px-4 md:px-gutter max-w-4xl mx-auto">
      <div className="reveal">
        <div className="text-center mb-12">
          <span className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 block">Connection Portal</span>
          <h2 className="font-headline text-headline-lg">Initiate Contact</h2>
        </div>

        <GlassCard className="p-8 md:p-12 border-white/5 bg-surface-container/30">
          {status.text && (
            <div className={`mb-8 px-4 py-3 rounded-lg text-sm ${status.type === "success" ? "bg-primary/10 border border-primary/30 text-primary" : "bg-error/10 border border-error/30 text-error"}`}>
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body placeholder:text-on-surface-variant/30 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body placeholder:text-on-surface-variant/30 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body placeholder:text-on-surface-variant/30 text-sm"
                placeholder="Collaboration Proposal"
              />
            </div>

            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body placeholder:text-on-surface-variant/30 text-sm resize-none"
                placeholder="Details of your project or proposal..."
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto px-12 py-4">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                    Transmitting...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
