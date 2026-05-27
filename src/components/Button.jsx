import clsx from "clsx";

export default function Button({
  as: As = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <As
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium",
        "transition-all duration-300 ease-out will-change-transform",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--mbm-bg))]",
        variant === "primary" &&
          "bg-black text-[rgb(var(--mbm-bg))] shadow-sm hover:-translate-y-0.5 hover:bg-black/90",
        variant === "ghost" &&
          "bg-transparent text-black ring-1 ring-[rgb(var(--mbm-line))] hover:-translate-y-0.5 hover:bg-black/5",
        variant === "soft" &&
          "bg-black/5 text-black ring-1 ring-black/10 hover:-translate-y-0.5 hover:bg-black/8",
        variant === "inverse" &&
          "bg-[rgb(var(--mbm-bg))] text-[rgb(var(--mbm-ink))] shadow-sm hover:-translate-y-0.5 hover:bg-white",
        variant === "inverse-ghost" &&
          "bg-transparent text-white ring-1 ring-white/35 hover:-translate-y-0.5 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}

