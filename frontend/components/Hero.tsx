import React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-extrabold bg-linear-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent drop-shadow-lg"
      >
        FixTheStack
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-orange-200/90"
      >
        Empowering students to build, connect, and innovate with IoT. Simplify
        the stack — fix it your way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-8 flex gap-4"
      >
        <Button
          size="lg"
          className="bg-orange-500 text-white font-semibold hover:bg-orange-400"
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-orange-400 text-orange-300 hover:bg-orange-500/10"
        >
          Learn More
        </Button>
      </motion.div>
    </section>
  );
}
