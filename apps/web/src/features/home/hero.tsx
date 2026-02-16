import { Button } from "@/components/ui";
import { assets } from "@/config";
import { motion, useScroll, useTransform } from "motion/react";
import { type RefObject } from "react";
import { Link } from "react-router";

function useParallax(
  value: ReturnType<typeof useScroll>["scrollYProgress"],
  distance: number,
) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
};
export const Hero = ({ containerRef }: Props) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useParallax(scrollYProgress, 80);
  const y2 = useParallax(scrollYProgress, 120);
  const y3 = useParallax(scrollYProgress, 60);
  const y4 = useParallax(scrollYProgress, 100);
  const y5 = useParallax(scrollYProgress, 50);

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-24">
      {/* Parallax decorative blobs */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute left-[10%] top-[20%] h-24 w-24 rounded-full bg-[#ffd6a5]/80 blur-sm"
        aria-hidden
      />
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute right-[15%] top-[30%] h-32 w-32 rounded-full bg-[#b8e0d2]/70 blur-sm"
        aria-hidden
      />
      <motion.div
        style={{ y: y3 }}
        className="pointer-events-none absolute left-[20%] bottom-[25%] h-20 w-20 rounded-full bg-[#e8d5f2]/80 blur-sm"
        aria-hidden
      />
      <motion.div
        style={{ y: y4 }}
        className="pointer-events-none absolute right-[8%] bottom-[15%] h-28 w-28 rounded-full bg-[#ffecd2]/90 blur-sm"
        aria-hidden
      />

      {/* Parallax illustration floats */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute left-[8%] top-[18%] opacity-30"
        aria-hidden
      >
        <img
          src={assets.illu_float_chat}
          alt=""
          className="h-20 w-20 object-contain"
        />
      </motion.div>
      <motion.div
        style={{ y: y5 }}
        className="pointer-events-none absolute right-[12%] top-[32%] opacity-25"
        aria-hidden
      >
        <img
          src={assets.illu_float_lock}
          alt=""
          className="h-16 w-16 object-contain"
        />
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="pointer-events-none absolute left-[22%] bottom-[26%] opacity-25"
        aria-hidden
      >
        <img
          src={assets.illu_float_chat}
          alt=""
          className="h-14 w-14 object-contain"
        />
      </motion.div>

      <div className="z-10 flex max-w-4xl flex-col items-center text-center md:flex-row md:gap-12 md:text-left">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight text-[#1e3a5f] sm:text-5xl md:text-6xl"
          >
            Private. Secure. <span className="text-[#e07a5f]">Direct.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-lg text-[#5c6b73] sm:text-xl"
          >
            Messaging that stays between you and the people you trust. No ads,
            no noise—just real conversations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <Link to="/signup">
              <Button
                size="lg"
                className="rounded-full bg-[#1e3a5f] px-8 text-white shadow-lg hover:bg-[#2a4a75]"
              >
                Get started free
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-[#1e3a5f]/40 text-[#1e3a5f] hover:bg-[#1e3a5f]/10"
              >
                Sign in
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex-1 md:mt-0"
        >
          <img
            src={assets.illu_hero}
            alt=""
            className="mx-auto max-h-64 w-full max-w-sm object-contain md:max-h-80"
          />
        </motion.div>
      </div>
    </section>
  );
};
