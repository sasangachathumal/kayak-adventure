'use client';

import * as React from 'react';

export interface SegmentOption<T extends string | number> {
  value: T;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  activeColor?: string;
  className?: string;
}

export default function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  activeColor = 'bg-zinc-900',
  className = '',
}: SegmentedControlProps<T>) {
  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const updateIndicator = React.useCallback(() => {
    const activeEl = itemRefs.current[String(value)];
    if (activeEl) {
      setIndicator({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [value]);

  React.useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center p-1 bg-white border border-zinc-200/80 rounded-full shadow-xs ${className}`}
    >
      {/* Gliding animated background indicator */}
      {indicator && (
        <div
          className={`absolute top-1 bottom-1 rounded-full ${activeColor} shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none`}
          style={{
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
          }}
        />
      )}

      {options.map((opt) => {
        const isActive = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={String(opt.value)}
            ref={(el) => {
              itemRefs.current[String(opt.value)] = el;
            }}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              isActive ? 'text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
