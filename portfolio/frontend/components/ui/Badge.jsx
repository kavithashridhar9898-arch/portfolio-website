import { cn } from "@/utils/cn";

export default function Badge({ children, className, variant = "primary", ...props }) {
  return (
    <span
      className={cn(
        "text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter font-bold",
        variant === "primary" && "bg-primary/10 text-primary",
        variant === "secondary" && "bg-white/5 text-on-surface-variant",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
