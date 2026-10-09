import "./index.css";
import { useScrollProgress } from "@/hooks/useAnimations";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

function App() {
  useScrollProgress();

  return (
    <>
      {/* Scroll progress bar */}
      <div id="progress-bar" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <CTA />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
