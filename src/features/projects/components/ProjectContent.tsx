import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { itemVariants } from "@shared/constants/animationVariants";
import { Pagination } from "@shared/components/Pagination";
import { projects, type Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { VideoViewer, type ViewerOrigin } from "./VideoViewer";

/** How many projects show per page. Page controls appear once there are more projects than this. */
const PROJECTS_PER_PAGE = 3;

export function ProjectContent() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  // Which card is showing its hover preview. Only one at a time, so videos never pile up.
  const [previewId, setPreviewId] = useState<number | null>(null);
  // Which project's video is open maximized, if any.
  const [viewing, setViewing] = useState<{ project: Project; origin: ViewerOrigin } | null>(null);
  // True from opening the viewer until it has fully faded out. The cards hold still meanwhile.
  const [viewerOpen, setViewerOpen] = useState(false);
  // Where the mouse last was, to tell whether it is resting on a card once the viewer is gone.
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function track(e: PointerEvent) {
      pointer.current = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
    }
    window.addEventListener("pointermove", track, { passive: true });
    return () => window.removeEventListener("pointermove", track);
  }, []);

  const pageCount = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount - 1);
  const visibleProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE,
  );

  function changePage(next: number) {
    setPreviewId(null);
    setPage(next);
    // Bring the top of the list back into view so the new page starts at its first project.
    listRef.current?.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
  }

  function openVideo(project: Project, origin: ViewerOrigin) {
    // The card keeps showing its preview frame behind the viewer, so nothing behind it changes
    // while it fades in. It settles in handleViewerExited, once the viewer is gone.
    setViewerOpen(true);
    setViewing({ project, origin });
  }

  function handleViewerExited() {
    setViewerOpen(false);
    // Keep the preview going only if the mouse is actually resting on that card (or it has
    // keyboard focus). Otherwise let the card settle back to its logo.
    setPreviewId((id) => {
      if (id === null) return null;
      const card = listRef.current?.querySelector<HTMLElement>(`[data-project-id="${id}"]`);
      if (!card) return null;
      const p = pointer.current;
      if (p) {
        const r = card.getBoundingClientRect();
        if (p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom) return id;
      }
      const active = document.activeElement as HTMLElement | null;
      if (active && card.contains(active) && active.matches(":focus-visible")) return id;
      return null;
    });
  }

  return (
    <motion.div className="w-full max-w-4xl mx-auto" variants={itemVariants}>
      <div ref={listRef} className="flex flex-col gap-8 scroll-mt-24">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            previewing={previewId === project.id}
            onPreviewChange={setPreviewId}
            onOpenVideo={openVideo}
            viewerOpen={viewerOpen}
          />
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          page={currentPage}
          perPage={PROJECTS_PER_PAGE}
          total={projects.length}
          onPageChange={changePage}
          label="Projects pages"
        />
      </div>

      <VideoViewer
        project={viewing?.project ?? null}
        origin={viewing?.origin ?? null}
        onClose={() => setViewing(null)}
        onExited={handleViewerExited}
      />
    </motion.div>
  );
}