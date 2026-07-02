export default function Footer({ socialLinks, settings }) {
  const links = socialLinks?.length > 0 ? socialLinks : [
    { platform: 'GitHub', url: 'https://github.com/kavithashridhar9898-arch' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/anshul-sn-katte-4068073b7' },
    { platform: 'Email', url: 'mailto:anshulnayak.9898@gmail.com' }
  ];

  return (
    <footer className="border-t border-white/10 py-16 px-4 md:px-gutter mt-section-gap relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl tracking-[0.2em] uppercase text-on-surface mb-2">
              Anshul S. Katte
            </div>
            <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-4">
              Full-Stack Developer
            </p>
            <p className="font-label text-xs text-on-surface-variant">
              📍 Mangalore, Karnataka, India
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a 
                  key={link.platform} 
                  href={link.url} 
                  target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="font-label text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  → {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Currently working on */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">Currently Building</h4>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              🚀 HiFix – AI-powered home service marketplace connecting homeowners with verified local professionals.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant/50 text-xs font-label">
            &copy; {new Date().getFullYear()} Anshul SridaraNayak Katte. All rights reserved.
          </p>
          <p className="text-on-surface-variant/30 text-xs font-label">
            Built with Next.js · Three.js · GSAP · MySQL
          </p>
        </div>
      </div>
    </footer>
  );
}
