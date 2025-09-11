interface QuietGoBrandProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function QuietGoBrand({ className = "", size = "md" }: QuietGoBrandProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <span className={`quietgo-brand font-serif font-semibold ${sizeClasses[size]} ${className}`} data-testid="brand-quietgo">
      <span className="quiet">Quiet</span>
      <span className="go">Go</span>
    </span>
  );
}