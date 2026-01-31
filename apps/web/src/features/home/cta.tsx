import { Button } from "@/components/ui";
import { motion } from "motion/react";
import { Link } from "react-router";

export const CtaStrip = () => {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-3xl bg-[#1e3a5f] p-10 text-center text-white shadow-xl"
      >
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to message without the mess?
        </h2>
        <p className="mt-2 text-white/90">
          Create your account and start chatting in minutes.
        </p>
        <Link to="/signup" className="mt-6 inline-block">
          <Button
            size="lg"
            className="rounded-full bg-white text-[#1e3a5f] hover:bg-white/90"
          >
            Get started free
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};
