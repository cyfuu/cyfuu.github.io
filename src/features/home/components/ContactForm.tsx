import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "contact:lastSentAt";
const MIN_FILL_MS = 3_000;

type Status = "idle" | "sending" | "sent";

function secondsLeftInCooldown(): number {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY));
    if (!last) return 0;
    return Math.max(0, Math.ceil((COOLDOWN_MS - (Date.now() - last)) / 1000));
  } catch {
    return 0; // storage blocked: skip the cooldown rather than break the form
  }
}

function startCooldown() {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 " +
  "backdrop-blur-sm transition-colors hover:border-white/20 " +
  "focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ContactForm() {
  const openedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Honeypot filled, or submitted faster than a person can write: pretend it worked.
    if (data.get("botcheck") || Date.now() - openedAt.current < MIN_FILL_MS) {
      setSentTo(email);
      setStatus("sent");
      return;
    }

    const wait = secondsLeftInCooldown();
    if (wait > 0) {
      setError(`You just sent a message. You can send another in ${wait} seconds.`);
      return;
    }

    if (!ACCESS_KEY) {
      console.error("Contact form: VITE_WEB3FORMS_ACCESS_KEY is not set. See the README.");
      setError("The contact form isn't set up yet.");
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${name}`,
          from_name: "cyfuu.dev portfolio",
          name,
          email,
          message,
          botcheck: false,
        }),
      });
      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        throw new Error(result?.message ?? `Request failed (${res.status})`);
      }

      startCooldown();
      setSentTo(email);
      setStatus("sent");
    } catch (err) {
      console.error("Contact form:", err);
      setError("Your message didn't go through. Check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md select-text"
      >
        <CheckCircle2 aria-hidden="true" className="mb-4 text-primary" size={32} />
        <h3 className="text-xl font-semibold text-white select-none">Message sent</h3>
        <p className="mt-2 text-white/80 leading-relaxed select-none">
          Thanks for reaching out. I'll reply to {sentTo || "you"} as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => {
            openedAt.current = Date.now();
            setStatus("idle");
            setError(null);
          }}
          className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary select-none"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 select-text" aria-describedby={error ? "contact-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm text-white/80 select-none">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm text-white/80 select-none">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder="So I can reply"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm text-white/80 select-none">
          Send a message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot: off-screen, skipped by keyboard and screen readers. Humans never fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this unchecked
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p id="contact-error" role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-95 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden="true" size={18} className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send aria-hidden="true" size={17} />
          </>
        )}
      </button>
    </form>
  );
}
