"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function BackgroundParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-lux-gold/10 blur-3xl"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute left-[5%] top-[60%] h-96 w-96 rounded-full bg-lux-gold/5 blur-3xl"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[20%] top-[80%] h-48 w-48 rounded-full bg-lux-gold/15 blur-3xl"
      />
    </div>
  );
}
