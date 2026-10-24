import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { itemVariants } from "@shared/constants/animationVariants";
import { Pagination } from "@shared/components/Pagination";
import { projects, type Project } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { VideoViewer } from "./VideoViewer";

/** How many projects show per page. Page controls appear once there are more projects than this. */
const PROJECTS_PER_PAGE = 3;

export function ProjectContent() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  // Which card is showing its hover preview. Only one at a time, so videos never pile up.
  const [previewId, setPreviewId] = useState<number | null>(null);
  // Which project's video is open maximized, if any.
  const [viewing, setViewing] = useState<Project | null>(null);

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

  function openVideo(project: Project) {
    setPreviewId(null);
    setViewing(project);
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

      <VideoViewer project={viewing} onClose={() => setViewing(null)} />
    </motion.div>
  );
}