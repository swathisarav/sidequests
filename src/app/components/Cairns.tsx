import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/app/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Cairns - things I make along the way                              */
/*                                                                    */
/*  To add something, add one entry to `creations` below.            */
/*  `room` decides where it lives; writing also takes a `topic`.      */
/* ------------------------------------------------------------------ */

type RoomId = "vistas" | "campfire" | "summits" | "trail-maps";
type Topic = "guides" | "books" | "science";
type Status = "in progress" | "finished";

interface Creation {
  room: RoomId;
  /** Writing only: which shelf inside Trail Maps */
  topic?: Topic;
  title: string;
  description: string;
  /** "YYYY-MM" - used to sort newest first */
  date?: string;
  status?: Status;
  href?: string;
  cta?: string;
}

interface Room {
  id: RoomId;
  name: string;
  kind: string;
  blurb: string;
}

const rooms: Room[] = [
  {
    id: "vistas",
    name: "Vistas",
    kind: "Design",
    blurb: "Sketches, UI and visual work.",
  },
  {
    id: "campfire",
    name: "Campfire",
    kind: "Music",
    blurb: "Songs, practice and things I play.",
  },
  {
    id: "summits",
    name: "Summits",
    kind: "Builds",
    blurb: "Projects and tools I have built.",
  },
  {
    id: "trail-maps",
    name: "Trail Maps",
    kind: "Writing",
    blurb: "Guides and explainers - things I've figured out, mapped out for you.",
  },
];

const topics: { id: Topic; label: string }[] = [
  { id: "guides", label: "Guides" },
  { id: "books", label: "On books" },
  { id: "science", label: "On science" },
];

const creations: Creation[] = [
  {
    room: "summits",
    title: "Guitar Log",
    description: "A tool to plan and track your guitar practice.",
    href: "https://guitar-ilemnite.base44.app",
    cta: "Open it",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function formatDate(d: string) {
  const [y, m] = d.split("-").map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
}

const byNewest = (a: Creation, b: Creation) =>
  (b.date ?? "").localeCompare(a.date ?? "");

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function roomFromHash(): RoomId | null {
  const id = window.location.hash.replace("#", "");
  return rooms.some((r) => r.id === id) ? (id as RoomId) : null;
}

export function CairnsSection() {
  // Closed by default; a link like #trail-maps opens that room
  const [active, setActive] = useState<RoomId | null>(() => roomFromHash());
  const [topic, setTopic] = useState<Topic | "all">("all");

  // Opening the site at #vistas, #campfire, ... jumps straight into that room
  useEffect(() => {
    const fromHash = roomFromHash();
    if (fromHash) {
      document.getElementById("cairns")?.scrollIntoView({ behavior: "smooth" });
    }
    const onHash = () => {
      const r = roomFromHash();
      if (r) setActive(r);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const closeRoom = () => {
    setActive(null);
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  };

  // Clicking the open room again closes it
  const toggleRoom = (id: RoomId) => {
    if (id === active) return closeRoom();
    setActive(id);
    setTopic("all");
    history.replaceState(null, "", `#${id}`);
    // Google Analytics: count which rooms visitors open (no-op on localhost)
    window.gtag?.("event", "open_room", { room: id });
  };

  const room = rooms.find((r) => r.id === active);
  const items = creations
    .filter(
      (c) =>
        c.room === active &&
        (active !== "trail-maps" || topic === "all" || c.topic === topic),
    )
    .sort(byNewest);

  return (
    <section
      id="cairns"
      className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 bg-[var(--paper-2)] border-y border-[var(--line)]"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold text-[var(--accent)]">
              03
            </span>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-4xl">
              Cairns
            </h2>
          </div>
          <p className="mb-10 max-w-xl text-[var(--ink-soft)]">
            Things I make along the way - stacked one stone at a time.
          </p>
        </Reveal>

        {/* Room tiles */}
        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Cairns rooms"
            className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          >
            {rooms.map((r) => {
              const count = creations.filter((c) => c.room === r.id).length;
              const selected = r.id === active;
              return (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={selected}
                  aria-expanded={selected}
                  aria-controls="cairns-room"
                  onClick={() => toggleRoom(r.id)}
                  className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 md:p-5 ${
                    selected
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--line)] bg-[var(--card)] hover:-translate-y-1 hover:border-[var(--accent)]/40"
                  }`}
                >
                  <span className="font-display text-lg font-semibold text-[var(--ink)]">
                    {r.name}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    {r.kind}
                  </span>
                  <span className="mt-2 text-xs text-[var(--ink-soft)]">
                    {count === 0
                      ? "Coming soon"
                      : `${count} ${count === 1 ? "piece" : "pieces"}`}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Open room */}
        <div id="cairns-room" role="tabpanel">
          <AnimatePresence mode="wait">
            {room && (
              <motion.div
                className="mt-10"
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[var(--ink-soft)]">
                    <span className="font-display font-semibold text-[var(--ink)]">
                      {room.name}
                    </span>
                    {" - "}
                    {room.blurb}
                  </p>

                  <button
                    onClick={closeRoom}
                    aria-label={`Close ${room.name}`}
                    className="order-last ml-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--ink)]"
                  >
                    Close{" "}
                    <span aria-hidden className="text-sm leading-none">
                      ×
                    </span>
                  </button>

                  {active === "trail-maps" && (
                    <div className="flex flex-wrap gap-2">
                      {[{ id: "all" as const, label: "All" }, ...topics].map(
                        (t) => (
                          <button
                            key={t.id}
                            onClick={() => setTopic(t.id)}
                            aria-pressed={topic === t.id}
                            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                              topic === t.id
                                ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                                : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--accent)]/50 hover:text-[var(--ink)]"
                            }`}
                          >
                            {t.label}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[var(--line)] px-6 py-12 text-center">
                    <p className="font-display text-lg text-[var(--ink)]">
                      Nothing stacked here yet.
                    </p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">
                      The first stone is on its way.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {items.map((item) => (
                      <CreationCard key={item.title} item={item} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CreationCard({ item }: { item: Creation }) {
  const topicLabel = topics.find((t) => t.id === item.topic)?.label;
  const body = (
    <>
      {item.status && (
        <span className="mb-4 self-start rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[var(--ink-soft)]">
          {item.status}
        </span>
      )}
      {(topicLabel || item.date) && (
        <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--ink-faint)]">
          {[topicLabel, item.date && formatDate(item.date)]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}
      <h3 className="font-display text-lg font-semibold text-[var(--ink)] mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-[var(--ink-soft)] flex-1">
        {item.description}
      </p>
      {item.href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
          {item.cta ?? "Take a look"}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      )}
    </>
  );

  const cls =
    "group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]";

  return item.href ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
