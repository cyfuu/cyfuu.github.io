import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  /** Current page, starting at 0. */
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  /** Accessible name for the navigation, e.g. "Projects pages". */
  label: string;
}

/** Numbered buttons stop fitting a phone-width row after about this many pages. */
const MAX_NUMBERED_ON_PHONE = 4;

/**
 * "Showing 1 to 3 of 8" on the left, previous / page numbers / next on the right.
 * Renders nothing when everything fits on one page.
 * Always stays on one line: the text is shorter on phones and gives way before the controls do,
 * and with many pages a phone shows "3 / 8" instead of numbered buttons.
 */
export function Pagination({ page, perPage, total, onPageChange, label }: PaginationProps) {
  const pageCount = Math.ceil(total / perPage);
  if (pageCount <= 1) return null;

  const firstShown = page * perPage + 1;
  const lastShown = Math.min((page + 1) * perPage, total);
  const tooManyForPhone = pageCount > MAX_NUMBERED_ON_PHONE;

  // No display utility here on purpose: `hidden` and `inline-flex` fight each other in the
  // generated CSS, so each button adds exactly one of them below.
  const base =
    "h-9 min-w-8 items-center justify-center rounded-md px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-9";
  const arrow = `${base} inline-flex text-white/70 hover:text-white disabled:cursor-not-allowed disabled:text-white/30 disabled:hover:text-white/30`;

  return (
    <nav aria-label={label} className="mt-4 flex items-center justify-between gap-3 sm:gap-4">
      <p
        className="min-w-0 truncate whitespace-nowrap text-sm tabular-nums text-white/60"
        aria-live="polite"
      >
        <span className="hidden sm:inline">Showing </span>
        {firstShown} to {lastShown} of {total}
      </p>

      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 0}
          onClick={() => onPageChange(Math.max(0, page - 1))}
          className={arrow}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        {tooManyForPhone && (
          <span aria-hidden="true" className="px-1 text-sm tabular-nums text-white/60 sm:hidden">
            {page + 1} / {pageCount}
          </span>
        )}

        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Page ${i + 1}`}
            aria-current={i === page ? "page" : undefined}
            onClick={() => onPageChange(i)}
            className={`${base} ${tooManyForPhone ? "hidden sm:inline-flex" : "inline-flex"} ${
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
          disabled={page === pageCount - 1}
          onClick={() => onPageChange(Math.min(pageCount - 1, page + 1))}
          className={arrow}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}