import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import type { Project } from "../data/projects";

export interface ViewerOrigin {
  el: HTMLElement | null;
  startTime: number;
}

interface VideoViewerProps {
  /** The project whose video to show. null keeps the viewer closed. */
  project: Project | null;
  origin: ViewerOrigin | null;
  /** Asks to close. The viewer fades out first, then closes for real. */
  onClose: () => void;
  /** Called once the viewer has finished fading out and is completely gone. */
  onExited?: () => void;
}

const BACKDROP_IN_S = 0.2;
const CONTENT_IN_S = 0.25;
const CONTENT_DELAY_S = 0.12;
const CONTENT_OUT_S = 0.12;
const BACKDROP_OUT_S = 0.2;

export function VideoViewer({ project, origin, onClose, onExited }: VideoViewerProps) {
  const reduceMotion = useReducedMotion() === true;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastProject = useRef<Project | null>(null);
  const originRef = useRef(origin);
  originRef.current = origin;
  const [playing, setPlaying] = useState(false);
  const [ratios, setRatios] = useState<Record<number, number>>({});

  if (project) lastProject.current = project;
  const video = project?.video;
  const ratio = (project && ratios[project.id]) || 16 / 9;

  // With reduced motion every fade collapses to nothing.
  const s = (seconds: number) => (reduceMotion ? 0 : seconds);

  useEffect(() => {
    if (!project) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      dialog.focus();
    }
    if (!reduceMotion) videoRef.current?.play().catch(() => {});
  }, [project, reduceMotion]);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={lastProject.current ? `${lastProject.current.title} promo video` : undefined}
      tabIndex={-1}
      onClose={onClose}
      // Escape would close the dialog instantly. Take over, so it fades out like everything else.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-transparent p-0 outline-none backdrop:bg-transparent"
    >
      <AnimatePresence
        onExitComplete={() => {
          dialogRef.current?.close();
          onExited?.();
        }}
      >
        {project && video && (
          <div
            key="viewer"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            className="absolute inset-0 flex items-center justify-center p-4 pt-14"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: s(BACKDROP_IN_S), ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: s(BACKDROP_OUT_S), ease: "easeIn" } }}
            />

            <motion.div
              className="absolute right-3 top-3 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: s(CONTENT_IN_S), delay: s(CONTENT_DELAY_S) },
              }}
              exit={{ opacity: 0, transition: { duration: s(CONTENT_OUT_S) } }}
            >
              <button
                type="button"
                aria-label={playing ? "Pause video" : "Play video"}
                onClick={togglePlay}
                className="rounded-md p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {playing ? (
                  <Pause size={24} aria-hidden="true" />
                ) : (
                  <Play size={24} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="rounded-md p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X size={26} aria-hidden="true" />
              </button>
            </motion.div>

            <motion.video
              key={project.id}
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              onClick={togglePlay}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onLoadedMetadata={(e) => {
                const el = e.currentTarget;
                // Carry on from where the hover preview had got to.
                const start = originRef.current?.startTime ?? 0;
                if (start > 0 && start < el.duration) el.currentTime = start;
                if (el.videoHeight > 0) {
                  const next = el.videoWidth / el.videoHeight;
                  setRatios((r) => (r[project.id] === next ? r : { ...r, [project.id]: next }));
                }
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: s(CONTENT_IN_S), delay: s(CONTENT_DELAY_S) },
              }}
              exit={{ opacity: 0, transition: { duration: s(CONTENT_OUT_S) } }}
              style={{
                aspectRatio: ratio,
                width: `min(calc(100vw - 2rem), calc((100dvh - 4.5rem) * ${ratio}))`,
              }}
              className="relative block cursor-pointer rounded-md bg-black"
            />
          </div>
        )}
      </AnimatePresence>
    </dialog>
  );
}