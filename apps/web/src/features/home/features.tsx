import { assets } from "@/config";
import { cn } from "@/lib";
import { motion } from "motion/react";

export const Features = () => {
  const data = [
    {
      title: "Private",
      desc: "Your chats stay between you and your contacts. No public feeds or discovery.",
      img: assets.illu_private,
      bg: "bg-[#ffd6a5]/40",
      border: "border-[#ffd6a5]",
    },
    {
      title: "Secure",
      desc: "Verification, encryption, and controls so your account stays yours.",
      img: assets.illu_secure,
      bg: "bg-[#b8e0d2]/40",
      border: "border-[#b8e0d2]",
    },
    {
      title: "Direct",
      desc: "One-on-one and small groups. Real conversations, not algorithms.",
      img: assets.illu_direct,
      bg: "bg-[#e8d5f2]/40",
      border: "border-[#e8d5f2]",
    },
  ];
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-[#1e3a5f] sm:text-4xl"
        >
          Why DMs?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-2 max-w-xl text-center text-[#5c6b73]"
        >
          Built for people who care about privacy and simplicity.
        </motion.p>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {data.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-3xl border-2 p-6 shadow-sm",
                card.bg,
                card.border,
              )}
            >
              <img
                src={card.img}
                alt=""
                className="mb-4 h-20 w-20 object-contain object-left"
              />
              <h3 className="text-xl font-bold text-[#1e3a5f]">{card.title}</h3>
              <p className="mt-2 text-[#5c6b73]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
