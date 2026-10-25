import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Code2, Maximize2, Play } from "lucide-react";
import { itemVariants } from "@shared/constants/animationVariants";
import type { Project } from "../data/projects";
import type { ViewerOrigin } from "./VideoViewer";

/** How long the mouse has to rest on a card before its video starts, so brushing past does nothing. */
const HOVER_INTENT_MS = 250;

interface ProjectCardProps {
  project: Project;
  /** True while this card is the one showing its hover preview. Only one card at a time. */
  previewing: boolean;
  onPreviewChange: (id: number | null) => void;
  onOpenVideo: (project: Project, origin: ViewerOrigin) => void;
  viewerOpen: boolean;
}

export function ProjectCard({
  project,
  previewing,
  onPreviewChange,
  onOpenVideo,
  viewerOpen,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion() === true;
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  const video = project.video;
  const showPreview = previewing && !reduceMotion;

  // The preview plays only while previewing, and starts over each time. While the maximized
  // video is open the preview holds its current frame, so the card behind it doesn't change.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    if (showPreview && !viewerOpen) {
      el.play().catch(() => {});
    } else if (showPreview) {
      el.pause();
    } else {
      el.pause();
      if (el.readyState > 0) el.currentTime = 0;
    }
  }, [showPreview, viewerOpen]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  function handlePointerEnter(e: React.PointerEvent) {
    // Mouse only. On touch screens a tap goes straight to the maximized video instead.
    if (!video || viewerOpen || e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => onPreviewChange(project.id), HOVER_INTENT_MS);
  }

  function handlePointerLeave() {
    window.clearTimeout(hoverTimer.current);
    // The viewer covers the page, which counts as the mouse leaving. Don't reset the card for that.
    if (previewing && !viewerOpen) onPreviewChange(null);
  }

  function handleClick(e: React.MouseEvent) {
    if (!video) return;
    // The GitHub and live-site links keep doing their own thing.
    if ((e.target as HTMLElement).closest("a")) return;
    window.clearTimeout(hoverTimer.current);
    // The maximized video carries on from where the preview had got to.
    onOpenVideo(project, {
      el: panelRef.current,
      startTime: showPreview && videoRef.current ? videoRef.current.currentTime : 0,
    });
  }

  return (
    <motion.div
      variants={itemVariants}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      data-project-id={project.id}
      className={`group relative w-full bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[--color-primary]/40 hover:bg-white/[0.04] transition-all duration-500 ${
        video ? "cursor-pointer lg:h-[250px]" : "md:h-[250px]"
      }`}
    >
      {/*
        A video card's media panel is 444px wide on desktop: at the card's 250px height that is
        exactly 16:9, so the preview fills it with no cropping. Below lg it stacks on top of the text.
      */}
      <div
        className={`grid grid-cols-1 h-full ${
          video ? "lg:grid-cols-[444px_1fr]" : "md:grid-cols-[300px_1fr]"
        }`}
      >
        {video ? (
          <button
            ref={panelRef}
            type="button"
            aria-label={`Watch the ${project.title} promo video`}
            // Keyboard focus previews just like hovering does. A click or Enter opens the video
            // through the card's click handler above.
            onFocus={(e) => {
              if (e.currentTarget.matches(":focus-visible")) onPreviewChange(project.id);
            }}
            onBlur={() => {
              if (!viewerOpen) onPreviewChange(null);
            }}
            className="relative block cursor-pointer aspect-video w-full overflow-hidden border-b border-white/10 bg-gradient-to-br from-primary/5 to-primary/15 lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
          >
            {/*
              Idle: the project's image. It doesn't zoom on hover like the cards without a video,
              because the video fades in over it and the zoom would show through the fade.
            */}
            {project.image ? (
              <div
                className={`flex h-full w-full items-center justify-center p-8 transition-opacity duration-300 ${
                  showPreview ? "opacity-0" : "opacity-100"
                }`}
              >
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
            ) : (
              <img src={video.poster} alt="" className="h-full w-full object-cover" />
            )}

            {/*
              Preview: fades in over the image. preload="none" means nothing is downloaded until
              the first hover, so several video cards cost nothing on page load.
            */}
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                showPreview ? "opacity-100" : "opacity-0"
              }`}
            />

            <span
              aria-hidden="true"
              className="absolute bottom-2 right-2 rounded-full bg-black/60 p-2 text-white"
            >
              {showPreview ? <Maximize2 size={14} /> : <Play size={14} />}
            </span>
          </button>
        ) : (
          <div className="h-[200px] md:h-full w-full md:w-[300px] bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 p-8 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Code2
                size={48}
                className="text-white/40 group-hover:scale-110 group-hover:text-[--color-primary] transition-all duration-500"
              />
            )}
          </div>
        )}

        {/* Project Info */}
        <div className={`flex flex-col h-full bg-transparent z-10 ${video ? "p-6" : "p-6 md:p-8"}`}>
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight">
                {project.title}
              </h3>
              <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wide uppercase">
                {project.subtitle}
              </span>
            </div>

            <div className="flex gap-4 text-white/80 pt-1">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="hover:text-[--color-primary] transition-colors p-1"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={20} />
              </motion.a>

              <motion.a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live site`}
                className="hover:text-[--color-primary] transition-colors p-1"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={20} />
              </motion.a>
            </div>
          </div>

          <p
            className={`text-white/90 text-sm sm:text-base mt-3 mb-4 leading-relaxed ${
              video ? "lg:line-clamp-2" : "md:line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}