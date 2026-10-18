import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";
import { engagements } from "../data/engagements";

const PHOTOS = engagements;
const COUNT = PHOTOS.length;
const LABEL = "Most Memorable Engagements";
const AUTOPLAY_MS = 5000;
const SWIPE_DISTANCE = 50; // px dragged before it counts as a swipe
const SWIPE_VELOCITY = 400; // px/s, for quick flicks

/** Shortest signed distance from the current slide, wrapping around the ends. */
function offsetFrom(index: number, current: number) {
  let d = (((index - current) % COUNT) + COUNT) % COUNT;
  if (d > COUNT / 2) d -= COUNT;
  return d;
}

function poseFor(d: number) {
  if (d === 0) return { x: "0%", scale: 1, opacity: 1, filter: "brightness(1)" };
  if (Math.abs(d) === 1) {
    return { x: `${d * 17}%`, scale: 0.88, opacity: 0.75, filter: "brightness(0.55)" };
  }
  return { x: "0%", scale: 0.76, opacity: 0, filter: "brightness(0.4)" };
}

export function Portrait() {
  const reduceMotion = useReducedMotion();
  const labelId = useId();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragging = useRef(false);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [failed, setFailed] = useState<boolean[]>(() => PHOTOS.map(() => false));

  const next = useCallback(() => setIndex((i) => (i + 1) % COUNT), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + COUNT) % COUNT), []);

  // Auto-advance. Restarts after every change of slide, so any manual interaction
  // gives the visitor a full interval before the next automatic move.
  const autoplayOn = playing && !hovering && !focused && !viewerOpen && !reduceMotion;
  useEffect(() => {
    if (!autoplayOn) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, autoplayOn, next]);

  // Native <dialog> gives us the focus trap, Escape to close, and focus return for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (viewerOpen && !dialog.open) dialog.showModal();
    if (!viewerOpen && dialog.open) dialog.close();
  }, [viewerOpen]);

  function handleDragStart() {
    dragging.current = true;
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) next();
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) prev();
    // Let the click that follows a drag pass before clicks count again.
    setTimeout(() => (dragging.current = false), 0);
  }

  function handleStageKeyDown(e: ReactKeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
      e.preventDefault();
      setViewerOpen(true);
    }
  }

  function handleDialogKeyDown(e: ReactKeyboardEvent) {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  }

  const transition = reduceMotion
    ? { duration: 0 }
    : {
        x: { type: "spring" as const, stiffness: 220, damping: 30 },
        scale: { type: "spring" as const, stiffness: 220, damping: 30 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.4 },
      };

  const iconButton =
    "rounded-md p-2 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const overlayButton =
    "rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const current = PHOTOS[index];

  return (
    <motion.figure
      className="w-full max-w-xl mx-auto sm:mx-0 min-[1024px]:w-[28rem] min-[1280px]:w-[33rem] min-[1400px]:w-[40rem] min-[1536px]:w-[42rem] min-[1024px]:max-w-none"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      // Only keyboard focus pauses; a tap on a button shouldn't freeze the carousel on touch screens.
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        tabIndex={0}
        onKeyDown={handleStageKeyDown}
        className="relative aspect-[1.83/1] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {/* Dragging moves the whole row of slides, then it snaps back and the carousel advances */}
        <motion.div
          className="absolute inset-0 active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {PHOTOS.map((photo, i) => {
            const d = offsetFrom(i, index);
            return (
              <motion.div
                key={photo.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${COUNT}`}
                aria-hidden={d !== 0}
                data-offset={d}
                className={`absolute inset-y-0 left-[9%] w-[82%] overflow-hidden rounded-2xl bg-white/5 shadow-lg cursor-pointer`}
                style={{
                  zIndex: 3 - Math.abs(d),
                  pointerEvents: Math.abs(d) > 1 ? "none" : "auto",
                }}
                initial={false}
                animate={poseFor(d)}
                transition={transition}
                onClick={() => {
                  if (dragging.current) return;
                  if (d === 0) setViewerOpen(true);
                  else if (d === 1) next();
                  else if (d === -1) prev();
                }}
              >
                {failed[i] ? (
                  <div
                    role="img"
                    aria-label={photo.alt}
                    className="flex h-full w-full items-center justify-center text-6xl font-semibold tracking-tight text-white/25"
                  >
                    BJ
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={800}
                    draggable={false}
                    decoding="async"
                    className="h-full w-full select-none object-cover object-[center_30%]"
                    onError={() =>
                      setFailed((prevFailed) => prevFailed.map((f, j) => (j === i ? true : f)))
                    }
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Label and controls, lined up with the edges of the current photo */}
      <figcaption id={labelId} className="mt-3 px-[9%] text-sm font-medium text-white/80">
        {LABEL}
      </figcaption>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 px-[9%]">
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose a photo">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${COUNT}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="group py-3 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
            >
              <span
                className={`block h-0.5 w-5 transition-colors ${
                  i === index ? "bg-primary" : "bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <button type="button" aria-label="Previous photo" onClick={prev} className={iconButton}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          {!reduceMotion && (
            <button
              type="button"
              aria-label={playing ? "Pause automatic slideshow" : "Start automatic slideshow"}
              onClick={() => setPlaying((p) => !p)}
              className={iconButton}
            >
              {playing ? (
                <Pause size={18} aria-hidden="true" />
              ) : (
                <Play size={18} aria-hidden="true" />
              )}
            </button>
          )}
          <button type="button" aria-label="Next photo" onClick={next} className={iconButton}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Photo viewer. A modal <dialog> renders in the browser's top layer, so the hero can't clip it. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setViewerOpen(false)}
        onKeyDown={handleDialogKeyDown}
        // The dialog fills its own box, so a click that lands on the dialog itself is a click on the backdrop.
        onClick={(e) => {
          if (e.target === e.currentTarget) setViewerOpen(false);
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-background p-0 text-white shadow-2xl select-text backdrop:bg-black/80"
      >
        {viewerOpen && (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <div className="relative bg-black">
              {failed[index] ? (
                <div
                  role="img"
                  aria-label={current.alt}
                  className="flex aspect-[3/2] w-full items-center justify-center text-7xl font-semibold text-white/25"
                >
                  BJ
                </div>
              ) : (
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[62dvh] w-full object-contain select-none"
                />
              )}

              <button
                type="button"
                aria-label="Close"
                onClick={() => setViewerOpen(false)}
                className={`absolute right-3 top-3 ${overlayButton}`}
              >
                <X size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={prev}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${overlayButton}`}
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={next}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${overlayButton}`}
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6 select-none">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={titleId} className="text-xl font-semibold">
                  {current.title}
                </h2>
                <span className="shrink-0 text-sm text-white/60">
                  {index + 1} of {COUNT}
                </span>
              </div>
              <p className="mt-2 max-w-prose leading-relaxed text-white/80">
                {current.description}
              </p>
            </div>
          </motion.div>
        )}
      </dialog>
    </motion.figure>
  );
}