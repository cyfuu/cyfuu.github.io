import reframe from "@shared/assets/images/reframe.svg";

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
  live: string;
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
];