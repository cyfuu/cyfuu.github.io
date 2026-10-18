import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";
import { education, certifications, type Certification } from "../data/credentials";

function QrTile({ cert }: { cert: Certification }) {
  const [failed, setFailed] = useState(false);
  if (!cert.qrSrc || failed) return null;

  const image = (
    <img
      src={cert.qrSrc}
      alt={`QR code to verify ${cert.title}`}
      width={112}
      height={112}
      loading="lazy"
      className="h-full w-full object-contain"
      onError={() => setFailed(true)}
    />
  );

  return (
    <div className="shrink-0 sm:text-center">
      <div className="h-24 w-24 rounded-lg bg-white p-2 sm:h-28 sm:w-28">
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the verification page for ${cert.title}`}
            className="block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      <p className="mt-2 text-xs text-white/60">Scan to verify</p>
    </div>
  );
}

function ImageTile({
  cert,
  onView,
}: {
  cert: Certification;
  onView: (cert: Certification) => void;
}) {
  const [failed, setFailed] = useState(false);
  if (!cert.imageSrc || failed) return null;

  return (
    <div className="shrink-0 sm:text-center">
      <button
        type="button"
        onClick={() => onView(cert)}
        aria-label={`Enlarge the certificate image for ${cert.title}`}
        className="group relative block h-28 w-40 cursor-zoom-in overflow-hidden rounded-lg border border-white/15 bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <img
          src={cert.imageSrc}
          alt=""
          width={160}
          height={112}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          onError={() => setFailed(true)}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 right-1.5 rounded-full bg-black/60 p-1.5 text-white"
        >
          <ZoomIn size={14} />
        </span>
      </button>
      <p className="mt-2 text-xs text-white/60">Click to enlarge</p>
    </div>
  );
}

/** How many certifications are shown per page. Change this to show more or fewer. */
const CERTS_PER_PAGE = 2;

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

function CertificationRow({
  cert,
  onViewImage,
}: {
  cert: Certification;
  onViewImage: (cert: Certification) => void;
}) {
  return (
    <motion.li
      variants={itemVariants}
      className="flex flex-col gap-4 border-b border-white/10 py-5 first:pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
    >
      <div className="min-w-0">
        <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
        <p className="text-white/80">{cert.issuer}</p>
        <p className="mt-1 text-sm text-white/60">
          Issued {cert.issued}
        </p>

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Verify
            <ExternalLink size={15} aria-hidden="true" />
            <span className="sr-only">{cert.title}, opens in a new tab</span>
          </a>
        )}
      </div>

      {/* empty:hidden removes the wrapper (and its spacing) when neither tile has anything to show */}
      <div className="flex shrink-0 gap-4 empty:hidden">
        <ImageTile cert={cert} onView={onViewImage} />
        <QrTile cert={cert} />
      </div>
    </motion.li>
  );
}

export function CredentialsSection() {
  const [page, setPage] = useState(0);
  const [viewing, setViewing] = useState<Certification | null>(null);
  const [imageRatio, setImageRatio] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pages = chunk(certifications, CERTS_PER_PAGE);
  const lastPage = pages.length - 1;
  const pagesTooManyForPhone = pages.length > 4;
  const firstShown = page * CERTS_PER_PAGE + 1;
  const lastShown = Math.min((page + 1) * CERTS_PER_PAGE, certifications.length);

  // Native <dialog> gives us the focus trap, Escape to close, and focus return for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (viewing && !dialog.open) dialog.showModal();
    if (!viewing && dialog.open) dialog.close();
  }, [viewing]);

  function openImage(cert: Certification) {
    setImageRatio(null);
    setViewing(cert);
  }

  const pageButton =
    "h-9 min-w-8 items-center justify-center rounded-md px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-9";

  return (
    <motion.section
      id="credentials"
      className="snap-section snap-start min-h-[100dvh] flex flex-col pt-16 sm:pt-20 select-none relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Education &amp; Certifications
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          {/* Education */}
          <motion.div variants={itemVariants} className="border-t border-white/15 pt-4">
            <h3 className="text-sm text-white/60">Education</h3>

            <p className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {education.school}
            </p>
            <p className="mt-3 text-lg text-white/90">{education.degree}</p>
            <p className="mt-1 text-white/60">{education.period}</p>
            <p className="text-white/60">{education.status}</p>

            {education.highlights.length > 0 && (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-white/80 marker:text-primary">
                {education.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <motion.div variants={itemVariants} className="border-t border-white/15 pt-4">
              <h3 className="text-sm text-white/60">Certifications</h3>

              {/*
                Every page sits in the same grid cell, so the list is always as tall as the
                tallest page and flipping pages never changes the height of the section.
                Pages that aren't showing are invisible, which also removes them from tab order.
              */}
              <div className="mt-4 grid">
                {pages.map((group, i) => (
                  <motion.ul
                    key={i}
                    aria-hidden={i !== page}
                    className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
                      i === page ? "opacity-100" : "invisible opacity-0"
                    }`}
                    variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                  >
                    {group.map((cert) => (
                      <CertificationRow
                        key={`${cert.title}-${cert.issued}`}
                        cert={cert}
                        onViewImage={openImage}
                      />
                    ))}
                  </motion.ul>
                ))}
              </div>

              {pages.length > 1 && (
                <nav
                  aria-label="Certifications pages"
                  className="mt-4 flex items-center justify-between gap-3 sm:gap-4"
                >
                  {/* Never wraps: the text is short on phones and gives way before the controls do. */}
                  <p
                    className="min-w-0 truncate whitespace-nowrap text-sm tabular-nums text-white/60"
                    aria-live="polite"
                  >
                    <span className="hidden sm:inline">Showing </span>
                    {firstShown} to {lastShown} of {certifications.length}
                  </p>

                  <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
                    <button
                      type="button"
                      aria-label="Previous page"
                      disabled={page === 0}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      className={`${pageButton} inline-flex text-white/70 hover:text-white disabled:cursor-not-allowed disabled:text-white/30 disabled:hover:text-white/30`}
                    >
                      <ChevronLeft size={18} aria-hidden="true" />
                    </button>

                    {pagesTooManyForPhone && (
                      <span
                        aria-hidden="true"
                        className="px-1 text-sm tabular-nums text-white/60 sm:hidden"
                      >
                        {page + 1} / {pages.length}
                      </span>
                    )}

                    {pages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Page ${i + 1}`}
                        aria-current={i === page ? "page" : undefined}
                        onClick={() => setPage(i)}
                        className={`${pageButton} ${pagesTooManyForPhone ? "hidden sm:inline-flex" : "inline-flex"} ${
                          i === page
                            ? "bg-primary font-semibold text-primary-foreground"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      type="button"
                      aria-label="Next page"
                      disabled={page === lastPage}
                      onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                      className={`${pageButton} inline-flex text-white/70 hover:text-white disabled:cursor-not-allowed disabled:text-white/30 disabled:hover:text-white/30`}
                    >
                      <ChevronRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                </nav>
              )}
            </motion.div>
          )}
        </div>
      </div>
      {/*
        Certificate viewer: just the image and a close button. The image box is sized to the
        image's own aspect ratio so it fills the screen without empty margins, which also means
        a click anywhere around it lands on the dialog and closes it.
      */}
      <dialog
        ref={dialogRef}
        aria-label={viewing ? `Certificate: ${viewing.title}` : undefined}
        onClose={() => setViewing(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setViewing(null);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-transparent p-4 pt-14 backdrop:bg-black/95 open:flex open:items-center open:justify-center"
      >
        {viewing?.imageSrc && (
          <>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setViewing(null)}
              className="absolute right-3 top-3 rounded-md p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X size={26} aria-hidden="true" />
            </button>
            <img
              src={viewing.imageSrc}
              alt={`Certificate: ${viewing.title}`}
              draggable={false}
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalHeight > 0) setImageRatio(naturalWidth / naturalHeight);
              }}
              style={
                imageRatio
                  ? {
                      aspectRatio: imageRatio,
                      width: `min(calc(100vw - 2rem), calc((100dvh - 4.5rem) * ${imageRatio}))`,
                    }
                  : undefined
              }
              className={`block ${
                imageRatio ? "" : "max-h-[calc(100dvh-4.5rem)] max-w-[calc(100vw-2rem)]"
              }`}
            />
          </>
        )}
      </dialog>
    </motion.section>
  );
}