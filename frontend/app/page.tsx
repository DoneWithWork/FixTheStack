import Cta from "@/components/Cta";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { SignIn } from "@/components/SignInButton";
import { Cpu, Rocket, Sparkles, Wifi } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-orange-100">
      <Hero>
        <SignIn />
      </Hero>
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
            <Features f={f} i={i} key={i} />
          ))}
        </div>
      </section>

      <Cta />

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
