import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import type { Project } from "../data/projects";

interface VideoViewerProps {
  /** The project whose video to show. null keeps the viewer closed. */
  project: Project | null;
  onClose: () => void;
}

export function VideoViewer({ project, onClose }: VideoViewerProps) {
  const reduceMotion = useReducedMotion() === true;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);

  const video = project?.video;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
      if (!reduceMotion) videoRef.current?.play().catch(() => {});
    }
    if (!project && dialog.open) dialog.close();
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
      aria-label={project ? `${project.title} promo video` : undefined}
      onClose={onClose}
      // The video box is sized to the video itself, so a click that lands on the dialog is a
      // click on the empty space around it.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-transparent p-4 pt-14 backdrop:bg-black/95 open:flex open:items-center open:justify-center"
    >
      {project && video && (
        <>
          <div className="absolute right-3 top-3 flex items-center gap-1">
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
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="rounded-md p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X size={26} aria-hidden="true" />
            </button>
          </div>

          <video
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
              const { videoWidth, videoHeight } = e.currentTarget;
              if (videoHeight > 0) setRatio(videoWidth / videoHeight);
            }}
            style={{
              aspectRatio: ratio,
              width: `min(calc(100vw - 2rem), calc((100dvh - 4.5rem) * ${ratio}))`,
            }}
            className="block cursor-pointer rounded-md bg-black"
          />
        </>
      )}
    </dialog>
  );
}