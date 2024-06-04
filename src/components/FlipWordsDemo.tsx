import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["better", "innovative", "tech", "modern"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-white dark:text-neutral-400">
        Collaborate
        <FlipWords words={words} /> <br />
        projects on ProjectEra
      </div>
    </div>
  );
}
