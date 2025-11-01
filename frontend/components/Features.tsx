"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

export default function Features({
  f,
  i,
}: {
  f: {
    icon: ReactNode;
    title: string;
    desc: string;
  };
  i: number;
}) {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.2 }}
    >
      <Card className="bg-gray-800/80 border border-orange-500/20 hover:border-orange-400/40 hover:bg-gray-700/80 transition-all text-center p-6 rounded-2xl shadow-xl">
        <CardContent className="flex flex-col items-center gap-4">
          {f.icon}
          <h3 className="text-xl font-semibold text-orange-200">{f.title}</h3>
          <p className="text-sm text-orange-100/80">{f.desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
