"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Cpu, Rocket, Wifi } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-orange-100">
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-6 bg-linear-to-br from-gray-900 to-gray-800 border-t border-orange-500/20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-300">
          Why Students Love FixTheStack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Sparkles className="w-10 h-10 text-orange-400" />,
              title: "Intuitive Dashboard",
              desc: "Easily manage projects, devices, and data streams in a clean, futuristic interface.",
            },
            {
              icon: <Cpu className="w-10 h-10 text-orange-400" />,
              title: "IoT Made Simple",
              desc: "No complex setup — just connect, visualize, and control your devices effortlessly.",
            },
            {
              icon: <Rocket className="w-10 h-10 text-orange-400" />,
              title: "Built for Innovators",
              desc: "Perfect for students, makers, and developers who want to push the limits of creativity.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="bg-gray-800/80 border border-orange-500/20 hover:border-orange-400/40 hover:bg-gray-700/80 transition-all text-center p-6 rounded-2xl shadow-xl">
                <CardContent className="flex flex-col items-center gap-4">
                  {f.icon}
                  <h3 className="text-xl font-semibold text-orange-200">
                    {f.title}
                  </h3>
                  <p className="text-sm text-orange-100/80">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-orange-100/70 bg-gray-950 border-t border-orange-500/20">
        <p>
          © {2025} FixTheStack. Built by students, for students.{" "}
          <Wifi className="inline w-4 h-4 ml-1 text-orange-400" />
        </p>
      </footer>
    </main>
  );
}
