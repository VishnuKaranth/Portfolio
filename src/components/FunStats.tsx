"use client";

import { motion } from "motion/react";
import { SectionHeading } from "./ui/Typography";
import { SlideIn } from "./ui/Transitions";
import { IFunStat } from "../utils/interface";

const FunStats = ({ funStats }: { funStats: IFunStat[] }) => {
  return (
    <section className="py-20 relative" id="stats">
      {/* Background blob */}
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[120px] opacity-50 pointer-events-none" />

      {/* Heading */}
      <SectionHeading className="md:pl-28">
        <SlideIn className="text-white/40">Some Fun</SlideIn> <br />
        <SlideIn>Stats About Me</SlideIn>
      </SectionHeading>

      {/* Static Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-20 mt-10">
        {funStats.map((stat, i) => (
          <motion.div
            key={stat._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg
                       flex flex-col gap-3 hover:scale-[1.03] transition-transform duration-300"
          >
            <span className="text-5xl">{stat.icon}</span>
            <h3 className="text-3xl font-semibold text-white">{stat.value}</h3>
            <p className="text-white/60 text-lg">{stat.label}</p>

            {/* subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-10 transition-opacity duration-300 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FunStats;
