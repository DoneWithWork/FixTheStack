"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
export default function Cta() {
  return (
    <section className="py-24 text-center bg-linear-to-r from-gray-900 to-gray-800 border-t border-orange-500/20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent"
      >
        Ready to Build Something Brilliant?
      </motion.h2>
      <p className="text-orange-200/80 max-w-xl mx-auto mb-8">
        Join thousands of students learning IoT the fun way — with a platform
        designed to help you grow.
      </p>
      <Button
        size="lg"
        className="bg-orange-500 text-white font-semibold hover:bg-orange-400"
      >
        Join the Beta
      </Button>
    </section>
  );
}
