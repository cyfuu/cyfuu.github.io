import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}