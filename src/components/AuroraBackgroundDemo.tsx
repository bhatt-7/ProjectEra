"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.7, y: 30 }} // Initial state of the animation
        whileInView={{ opacity: 1, y: 0 }} // Animation state when the component comes into view
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }} // Transition configuration
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold dark:text-white text-center mb-8">
          Welcome To
        </h1>
        <h2 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold dark:text-white text-center text-shadow-custom">
          ProjectEra
        </h2>
        <p className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center">
          A Project Management Site
        </p>
      </motion.div>
    </AuroraBackground>
  );
}
