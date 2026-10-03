import "./index.css";
import { useScrollProgress } from "@/hooks/useAnimations";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { AnimationsDemo } from "@/components/AnimationsDemo";

// Load Google Fonts
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap";
document.head.appendChild(link);

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
        <AnimationsDemo />
        <Process />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
