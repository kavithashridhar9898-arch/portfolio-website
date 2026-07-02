import { cn } from "@/utils/cn";

export default function GlassCard({ children, className, ...props }) {
  return (
    <div 
      className={cn("glass-card rounded-3xl", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
