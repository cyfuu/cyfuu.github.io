import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { CredentialsSection } from "./components/CredentialsSection";
import { ContactSection } from "./components/ContactSection";

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CredentialsSection />
      <ContactSection />
    </>
  );
}