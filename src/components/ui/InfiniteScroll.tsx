"use client";

import { ReactNode, useEffect, useRef } from "react";

import { cn } from "../../utils/cn";

interface TestimonialProps {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  children: ReactNode;
}

export const InfiniteScroll = ({
  direction,
  speed,
  pauseOnHover,
  children,
  className,
}: TestimonialProps) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    getDirection();
    getSpeed();
    // no setState here
  }, [direction, speed]);

  return (
    <div
      className="overflow-hidden w-full scroller mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)"
      ref={containerRef}
    >
      <ul
        className={cn(
          "flex items-center justify-center gap-4 flex-nowrap shrink-0 w-max animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          className
        )}
        ref={scrollerRef}
      >
        {children}
      </ul>
    </div>
  );
};
