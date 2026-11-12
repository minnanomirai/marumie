import type { ReactNode } from "react";
interface TypographyProps {
  children: ReactNode;
  className?: string;
}

// Using Tailwind font classes for consistency

export const Title = ({ children, className = "" }: TypographyProps) => (
  <h1
    className={`text-[20px] sm:text-[27px] leading-[1.52] tracking-[0.08em] font-japanese font-black ${className}`}
  >
    {children}
  </h1>
);

export const Subtitle = ({ children, className = "" }: TypographyProps) => (
  <p
    className={`text-[14px] leading-[1.5] tracking-[0.06em] font-japanese font-medium text-[var(--color-black-500)] ${className}`}
  >
    {children}
  </p>
);
