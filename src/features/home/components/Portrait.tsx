import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";
import { engagements } from "../data/engagements";

const PHOTOS = engagements;
const COUNT = PHOTOS.length;
const LABEL = "Most Memorable Engagements";
const AUTOPLAY_MS = 5000;
const SPRING = { type: "spring" as const, stiffness: 220, damping: 30 };
const SIDE_SHIFT = 0.17; // neighbour offset as a fraction of the slide width
const FLING_SECONDS = 0.2; // how far ahead a flick's velocity is projected
const DRAG_SPAN = 0.4; // fraction of the stage width you drag to move one full slide
const MAX_FLING_SLIDES = 2; // most extra slides a single flick can carry

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Signed distance of a slide from the (fractional) carousel position, wrapping around the ends. */
function wrapOffset(index: number, position: number) {
  let d = (((index - position) % COUNT) + COUNT) % COUNT;
  if (d > COUNT / 2) d -= COUNT;
  return d;
}

/** Continuous look of a slide at distance `a` (0 = centre, 1 = neighbour, 2+ = hidden behind). */
function poseAt(a: number) {
  if (a <= 1) {
    return {
      shift: SIDE_SHIFT * 100 * a,
      scale: lerp(1, 0.88, a),
      opacity: lerp(1, 0.75, a),
      brightness: lerp(1, 0.55, a),
    };
  }
  const t = Math.min(1, a - 1);
  return {
    shift: SIDE_SHIFT * 100 * (1 - t),
    scale: lerp(0.88, 0.76, t),
    opacity: lerp(0.75, 0, t),
    brightness: lerp(0.55, 0.4, t),
  };
}

type Photo = (typeof PHOTOS)[number];

interface SlideProps {
  photo: Photo;
  slideIndex: number;
  position: MotionValue<number>;
  /** Offset from the current slide, used for accessibility and clicks only. */
  d: number;
  failed: boolean;
  onFail: () => void;
  onClick: () => void;
}

/** One slide. Its pose is derived from the shared position, so it follows the drag frame by frame. */
function Slide({ photo, slideIndex, position, d, failed, onFail, onClick }: SlideProps) {
  const x = useTransform(position, (p) => {
    const off = wrapOffset(slideIndex, p);
    return `${Math.sign(off) * poseAt(Math.abs(off)).shift}%`;
  });
  const scale = useTransform(position, (p) => poseAt(Math.abs(wrapOffset(slideIndex, p))).scale);
  const opacity = useTransform(position, (p) => poseAt(Math.abs(wrapOffset(slideIndex, p))).opacity);
  const filter = useTransform(
    position,
    (p) => `brightness(${poseAt(Math.abs(wrapOffset(slideIndex, p))).brightness})`,
  );
  const zIndex = useTransform(position, (p) =>
    Math.round(3 - Math.min(2, Math.abs(wrapOffset(slideIndex, p)))),
  );

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${slideIndex + 1} of ${COUNT}`}
      aria-hidden={d !== 0}
      data-offset={d}
      className="absolute inset-y-0 left-[9%] w-[82%] overflow-hidden rounded-2xl bg-white/5 shadow-lg cursor-pointer"
      style={{
        x,
        scale,
        opacity,
        filter,
        zIndex,
        pointerEvents: Math.abs(d) > 1 ? "none" : "auto",
      }}
      onClick={onClick}
    >
      {failed ? (
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
          onError={onFail}
        />
      )}
    </motion.div>
  );
}

export function Portrait() {
  const reduceMotion = useReducedMotion();
  const labelId = useId();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragging = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const target = useRef(0); // unbounded whole-number slide the carousel is heading to
  const position = useMotionValue(0); // fractional, unbounded carousel position

  // Whichever slide is nearest the front right now, updated live while scrolling.
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [panning, setPanning] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [failed, setFailed] = useState<boolean[]>(() => PHOTOS.map(() => false));

  /** Glide (or jump, with reduced motion) to a whole-number position. */
  const moveTo = useCallback(
    (to: number, velocity = 0) => {
      target.current = to;
      controls.current?.stop();
      if (reduceMotion) position.set(to);
      else controls.current = animate(position, to, { ...SPRING, velocity });
    },
    [position, reduceMotion],
  );

  const next = useCallback(() => moveTo(target.current + 1), [moveTo]);
  const prev = useCallback(() => moveTo(target.current - 1), [moveTo]);
  const goTo = useCallback(
    (i: number) => moveTo(target.current + wrapOffset(i, target.current)),
    [moveTo],
  );

  useMotionValueEvent(position, "change", (p) => {
    const nearest = (((Math.round(p) % COUNT) + COUNT) % COUNT);
    setIndex((prevIndex) => (prevIndex === nearest ? prevIndex : nearest));
  });

  useEffect(() => () => controls.current?.stop(), []);

  // Auto-advance. Restarts after every change of slide, so any manual interaction
  // gives the visitor a full interval before the next automatic move.
  const autoplayOn = playing && !hovering && !focused && !panning && !viewerOpen && !reduceMotion;
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

  /** Pixels of dragging that equal one full slide step. */
  function stepPx() {
    const width = stageRef.current?.offsetWidth ?? 1;
    return width * DRAG_SPAN;
  }

  function handlePanStart() {
    dragging.current = true;
    setPanning(true);
    controls.current?.stop();
  }

  function handlePan(_: unknown, info: PanInfo) {
    position.set(position.get() - info.delta.x / stepPx());
  }

  function handlePanEnd(_: unknown, info: PanInfo) {
    const velocity = -info.velocity.x / stepPx(); // slides per second
    const carry = Math.max(-MAX_FLING_SLIDES, Math.min(MAX_FLING_SLIDES, velocity * FLING_SECONDS));
    // Settle on whichever slide is in front once the flick's momentum is added.
    moveTo(Math.round(position.get() + carry), velocity);
    setPanning(false);
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
        {/* Dragging scrubs the carousel position directly, so every slide moves with it and settles on release */}
        <motion.div
          ref={stageRef}
          className="absolute inset-0 active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          {PHOTOS.map((photo, i) => {
            const d = wrapOffset(i, index);
            return (
              <Slide
                key={photo.src}
                photo={photo}
                slideIndex={i}
                position={position}
                d={d}
                failed={failed[i]}
                onFail={() => setFailed((f) => f.map((v, j) => (j === i ? true : v)))}
                onClick={() => {
                  if (dragging.current) return;
                  if (d === 0) setViewerOpen(true);
                  else if (d === 1) next();
                  else if (d === -1) prev();
                }}
              />
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
              onClick={() => goTo(i)}
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