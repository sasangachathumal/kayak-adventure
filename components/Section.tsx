import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  as?: ElementType;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  background?: ReactNode;
}

export default function Section({
  as: Tag = "section",
  id,
  className,
  containerClassName,
  children,
  background,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative w-full overflow-hidden text-zinc-950 font-sans",
        className
      )}
    >
      {background}
      <div
        className={cn(
          "relative z-10 max-w-[1440px] w-full mx-auto px-8 md:px-16",
          containerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
