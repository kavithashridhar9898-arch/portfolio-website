import { cn } from "@/utils/cn";

export default function Button({ children, className, variant = "primary", onClick, type = "button", href, ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "px-10 py-4 bg-primary text-background rounded-full shadow-lg hover:shadow-primary/40 hover:scale-105 hover:bg-primary/90",
    outline: "px-6 py-2 border border-outline-variant/50 text-on-surface-variant rounded-full hover:bg-white/5 hover:border-primary/50 hover:text-on-surface text-sm uppercase tracking-widest",
    ghost: "px-4 py-2 text-on-surface-variant hover:text-on-surface text-sm rounded-lg hover:bg-white/5",
  };

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
