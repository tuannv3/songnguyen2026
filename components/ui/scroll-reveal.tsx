"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";

type Direction = "left" | "right" | "up";

const hiddenClasses: Record<Direction, string> = {
  left: "-translate-x-16 opacity-0",
  right: "translate-x-16 opacity-0",
  up: "translate-y-10 opacity-0",
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Already on screen (or already scrolled past) by the time this effect runs,
    // e.g. a deep link or instant scroll restore — reveal immediately rather than
    // waiting on an observer callback that may never fire for it.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-x-0 translate-y-0 opacity-100" : hiddenClasses[direction],
        className
      )}
      style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
