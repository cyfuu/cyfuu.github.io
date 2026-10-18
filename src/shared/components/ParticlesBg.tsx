import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: {
    enable: true,
    zIndex: -1, // stay behind content
  },
  background: {
    color: "transparent",
  },
  fpsLimit: 60,
  particles: {
    number: { value: 75, density: { enable: true } },
    color: { value: ["#ffffff", "#cfe8ff"] },
    links: { enable: true, distance: 130, color: "#ffffff", opacity: 0.2, width: 1.2 },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      outModes: { default: "out" },
    },
    opacity: {
      value: { min: 0.4, max: 0.8 },
      animation: { enable: true, speed: 0.3, sync: false },
    },
    size: {
      value: { min: 1.5, max: 4 },
      animation: { enable: true, speed: 1, sync: false },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: ["grab", "repulse"] },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.6 } },
      repulse: { distance: 80, duration: 1.0, factor: 0.3 },
    },
  },
  detectRetina: true,
};

function ParticlesInner() {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;
  return <Particles id="tsparticles" options={options} />;
}

export default function ParticlesBg() {
  return (
    <ParticlesProvider init={async (engine: Engine) => { await loadSlim(engine); }}>
      <ParticlesInner />
    </ParticlesProvider>
  );
}