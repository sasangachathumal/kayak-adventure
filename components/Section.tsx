import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  background?: ReactNode;
}

export default function Section({
  id,
  className,
  containerClassName,
  children,
  background,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden text-zinc-950 font-sans",
        className
      )}
    >
      {background}
      <div
        className={cn(
          "relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-10",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
