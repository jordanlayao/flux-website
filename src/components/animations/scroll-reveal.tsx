"use client";

/**
 * Reusable scroll-triggered animation wrapper using Framer Motion
 * and react-intersection-observer.
 *
 * Usage:
 *   <ScrollReveal>
 *     <YourComponent />
 *   </ScrollReveal>
 *
 * Props:
 *   - variant: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale"
 *   - delay: stagger delay in seconds (useful for lists)
 *   - duration: animation duration in seconds
 *   - once: if true (default), animates only on first entrance
 *   - threshold: visibility ratio to trigger (0-1)
 *
 * For complex timeline animations, use GSAP directly with useGSAP() hook.
 */

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.2,
  className,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
