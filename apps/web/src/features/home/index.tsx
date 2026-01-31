import { useRef } from "react";
import { Header } from "./header";
import { Hero } from "./hero";
// import { Footer } from "./footer";
// import { CtaStrip } from "./cta";
// import { Features } from "./features";

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-svh overflow-hidden bg-[#fef9f0]">
      <Header />
      <Hero containerRef={containerRef} />
      {/* <Features />
      <CtaStrip />
      <Footer /> */}
    </div>
  );
};
