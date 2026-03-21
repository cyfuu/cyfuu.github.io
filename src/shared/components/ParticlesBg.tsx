import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: "transparent" },
    fpsLimit: 60,

    particles: {
      number: { value: 75, density: { enable: true } },
      color: { value: ["#ffffff", "#cfe8ff"] },
      links: { enable: true, distance: 130, color: "#ffffff", opacity: 0.25, width: 1.2 },
      move: {
        enable: true,
        speed: 0.4,        // slow movement
        direction: "none",
        outModes: { default: "out" },
      },
      opacity: {
        value: { min: 0.5, max: 1 },
        animation: { enable: true, speed: 0.3, sync: false },
      },
      size: {
        value: { min: 1.5, max: 4 },
        animation: { enable: true, speed: 1, sync: false },
      },
    },

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "repulse"], // combine grab + soft push
        },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.6 },  // visible line linking cursor and particles
        },
        repulse: {
          distance: 80,
          duration: 1.0,            // smooth delayed push
          factor: 0.3,               // gentle force
        },
      },
    },

    detectRetina: true,
  };

  if (!init) return null;
  return <Particles id="tsparticles" options={options} />;
}