import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "romantic" | "ghost" | "outline";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const variants = {
    primary:
      "bg-cream text-background shadow-[0_12px_45px_rgba(198,161,91,.2)] hover:bg-white",
    romantic:
      "bg-gradient-to-r from-gold via-[#dab76f] to-dusty-rose text-background shadow-[0_16px_45px_rgba(198,161,91,.28)] hover:brightness-110 disabled:saturate-50 disabled:opacity-70",
    ghost: "bg-white/5 text-cream hover:bg-white/10",
    outline:
      "border border-gold/45 bg-background/30 text-cream hover:border-gold/80 hover:bg-gold/10",
  };

  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-55 sm:px-7 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
