"use client";

import { InfiniteScroll } from "./ui/InfiniteScroll";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { IFunStat } from "../utils/interface";

const FunStats = ({ funStats }: { funStats: IFunStat[] }) => {
  // Split into two rows (half-half)
  const middle = Math.ceil(funStats.length / 2);
  const row1 = funStats.slice(0, middle);
  const row2 = funStats.slice(middle);

  return (
    <section className="py-20 relative" id="stats">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />

      <SectionHeading className="md:pl-28">
        <SlideIn className="text-white/40">Some Fun</SlideIn> <br />
        <SlideIn>Stats About Me</SlideIn>
      </SectionHeading>

      <StatScroller stats={row1} speed="normal" />
      <StatScroller stats={row2} speed="normal" direction="left" />
    </section>
  );
};

export default FunStats;

interface ScrollerProps {
  stats: IFunStat[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
}

const StatScroller = ({ stats, direction, speed }: ScrollerProps) => {
  return (
    <Transition viewport={{ once: true }}>
      <InfiniteScroll
        direction={direction}
        speed={speed}
        pauseOnHover
        className="pb-4"
      >
        {stats.map((stat) => (
          <li
            key={stat._id}
            className="md:p-6 p-4 bg-secondary md:w-[350px] w-[250px] 
                       rounded-2xl space-y-2 relative overflow-hidden z-0 
                       flex flex-col items-start"
          >
            <span className="text-4xl">{stat.icon}</span>
            <h3 className="md:text-3xl text-2xl font-semibold opacity-90">
              {stat.value}
            </h3>
            <p className="md:text-lg text-sm opacity-70">{stat.label}</p>
          </li>
        ))}
      </InfiniteScroll>
    </Transition>
  );
};
