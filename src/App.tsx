import "./index.css";
import { useEffect } from "react";
import { useScrollProgress } from "@/hooks/useAnimations";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CasePage } from "@/components/CasePage";

function App({ caseSlug }: { caseSlug: string | null }) {
  useScrollProgress();

  // Chegando de outra página com #secao: rola depois que as seções existem.
  useEffect(() => {
    if (!caseSlug && window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }
  }, [caseSlug]);

  return (
    <>
      {/* Scroll progress bar */}
      <div id="progress-bar" aria-hidden="true" />

      <Navbar />

      {caseSlug ? (
        <CasePage slug={caseSlug} />
      ) : (
        <main>
          <Hero />
          <Services />
          <Projects />
          <Process />
          <CTA />
        </main>
      )}

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
