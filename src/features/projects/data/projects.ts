import reframe from "@shared/assets/images/reframe.svg";
import pulso from "@shared/assets/images/pulso.svg";
import enah from "@shared/assets/images/enah.svg";

const BASE = (import.meta.env as { BASE_URL?: string }).BASE_URL ?? "/";

export interface ProjectVideo {
  /** Put the file in public/projects/ and use `${BASE}projects/your-file.mp4`. */
  src: string;
  /** Still image shown before the video loads. Put it in public/projects/ too. */
  poster: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  live?: string;
  /** Logo or screenshot shown in the card's left panel when there is no video. */
  image?: string;
  /** Optional. When set, an autoplaying muted video replaces the image in the card. */
  video?: ProjectVideo;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Reframe",
    subtitle: "Developer Changelog Workspace",
    description:
      "A developer workspace that transforms raw GitHub commits into beautiful, human-readable changelogs.",
    tech: ["React", "TypeScript", "Tailwind", "Vite", "Framer Motion"],
    link: "https://github.com/cyfuu/reframe",
    image: reframe,
    video: {
      src: `${BASE}projects/reframe-promo.mp4`,
      poster: `${BASE}projects/reframe-poster.jpg`,
    },
    live: "https://cyfuu.github.io/reframe/",
  },
  {
    id: 2,
    title: "Pulso",
    subtitle: "Mobile Community Social App",
    description:
      "A mobile community social app built with Flutter and powered by Supabase as its cloud backend.",
    tech: ["Flutter", "Dart", "Riverpod", "Supabase"],
    link: "https://github.com/cyfuu/pulso",
    image: pulso,
    video: {
      src: `${BASE}projects/pulso-promo.mp4`,
      poster: `${BASE}projects/pulso-poster.png`,
    }
  },
  {
    id: 3,
    title: "Enah's Gift",
    subtitle: "Personalized Game for a Loved One",
    description:
      "A personalized game made as a gift. A little virtual world just for us.",
    tech: ["Phaser 3", "React", "TypeScript", "Vite", "Supabase"],
    link: "https://github.com/cyfuu/enah",
    image: enah,
    video: {
      src: `${BASE}projects/enah-showcase.mp4`,
      poster: `${BASE}projects/enah-poster.png`,
    }
  },
];