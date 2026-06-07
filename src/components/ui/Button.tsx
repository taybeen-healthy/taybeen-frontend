/**
 * Reusable Button component with multiple variants and sizes.
 *
 * Variants: primary | outline | ghost | dark
 * Sizes: sm | md | lg
 */

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  /* Base styles shared by all button variants */
  const baseStyles =
    "inline-flex items-center justify-center font-poppins leading-none transition-all duration-200 rounded-lg";

  /* Visual variant styles */
  const variants = {
    primary: "bg-brand-brown text-white hover:bg-opacity-90",
    outline:
      "border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white",
    ghost: "text-brand-brown hover:bg-brand-brown hover:bg-opacity-5",
    dark: "bg-brand-green text-white hover:bg-opacity-90",
  };

  /* Size-based padding and font sizes */
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-10 py-3.5 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
