import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/app/components/Reveal";
import {
  byNewest,
  formatDate,
  inRoom,
  rooms,
  topics,
  type Creation,
  type RoomId,
  type Topic,
} from "./rooms";

// three.js is large: fetch it in the background once the page is idle, and only mount
// the scene when it's about to scroll into view.
const loadScene = () => import("./BasecampScene");
const BasecampScene = lazy(loadScene);

/** Tracks whether the scene box is on screen, and whether it has ever come close. */
function useInView(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNear(true),
      { rootMargin: "800px 0px" },
    );
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, [ref, enabled]);
  return { near, visible };
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setMatch(mql.matches);
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, [query]);
  return match;
}

function roomFromHash(): RoomId | null {
  const id = window.location.hash.replace("#", "");
  return rooms.some((r) => r.id === id) ? (id as RoomId) : null;
}

export function BasecampSection() {
  // The 3D scene shows from tablet width up; phones get tiles only.
  const showScene = useMedia("(min-width: 768px)");
  // From laptop width up, an open room sits beside the scene; below that, under it.
  const sideways = useMedia("(min-width: 1024px)");

  // Closed by default; a link like #trail-maps opens that room
  const [active, setActive] = useState<RoomId | null>(() => roomFromHash());
  const [topic, setTopic] = useState<Topic | "all">("all");
  const panelRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { near, visible } = useInView(sceneRef, showScene);

  // Warm up the 3D code while the browser is idle, so it's ready before anyone scrolls down.
  useEffect(() => {
    if (!showScene) return;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const id = ric(() => void loadScene());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, [showScene]);

  // Opening the site at #summits, #campfire, ... jumps straight into that room
  useEffect(() => {
    if (roomFromHash()) {
      document.getElementById("basecamp")?.scrollIntoView({ behavior: "smooth" });
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
    history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRoom();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const openRoom = (id: RoomId) => {
    setActive(id);
    setTopic("all");
    history.replaceState(null, "", `#${id}`);
    // Google Analytics: count which rooms visitors open (no-op on localhost)
    window.gtag?.("event", "open_room", { room: id });
    // When the room opens below the scene (tablets, phones), bring it into view
    if (!(showScene && sideways)) {
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 350);
    }
  };

  // Clicking the open room's tile again closes it
  const toggleRoom = (id: RoomId) => (id === active ? closeRoom() : openRoom(id));


  const roomPanel = (
          <div
            ref={panelRef}
            id="basecamp-room"
            role="region"
            aria-live="polite"
            className={
              showScene && sideways
                ? // The empty box must not block the scene underneath; only the open panel takes the mouse.
                  `lg:absolute lg:inset-y-0 lg:right-0 lg:w-[400px] z-10 ${active ? "" : "pointer-events-none"}`
                : ""
            }
          >
            <AnimatePresence mode="wait">
              {active && (
                <RoomPanel
                  key={active}
                  id={active}
                  topic={topic}
                  setTopic={setTopic}
                  onClose={closeRoom}
                  sideways={showScene && sideways}
                />
              )}
            </AnimatePresence>
          </div>
  );

  return (
    <section
      id="basecamp"
      className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 bg-[var(--paper-2)] border-y border-[var(--line)] overflow-hidden"
    >
      {/* Old links to #cairns still land here */}
      <span id="cairns" className="block -translate-y-20" aria-hidden />
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold text-[var(--accent)]">03</span>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-4xl">
              Basecamp
            </h2>
          </div>
          <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
            Things I make along the way, one stone at a time. Each landmark is a room:
            the mountains hold builds, the archway design, the campfire music, the board
            writing, and the cairn stacks up all of it.
          </p>
        </Reveal>

        <div className="relative">
          {showScene && (
            <Reveal delay={0.05}>
              <div ref={sceneRef} className="relative h-[520px] lg:h-[600px]">
                {/* The canvas bleeds past its box (it is transparent) so tilting never clips the scene. */}
                <div className="absolute -top-2 -bottom-8 -inset-x-12 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
                  <Suspense
                    fallback={
                      <div className="flex h-full items-center justify-center text-sm text-[var(--ink-faint)]">
                        Setting up camp…
                      </div>
                    }
                  >
                    {(near || active) && (
                      <BasecampScene selected={active} onSelect={openRoom} sideways={sideways} paused={!visible} />
                    )}
                  </Suspense>
                </div>
                <p className="pointer-events-none absolute bottom-2 left-0 text-xs uppercase tracking-[0.14em] text-[var(--ink-faint)]">
                  {active ? "Esc or close to step back" : "Drag to look around · click a landmark"}
                </p>
              </div>
            </Reveal>
          )}

          {showScene && roomPanel}
        </div>

        {/* Room tiles: the same rooms as the landmarks, for quick jumping (and phones) */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Basecamp rooms"
            className={`relative z-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4 ${showScene ? "mt-10" : ""}`}
          >
            {rooms.map((r) => {
              const count = inRoom(r.id).length;
              const selected = r.id === active;
              return (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={selected}
                  aria-expanded={selected}
                  aria-controls="basecamp-room"
                  onClick={() => toggleRoom(r.id)}
                  className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 md:p-5 ${
                    r.id === "the-cairn" ? "col-span-2 md:col-span-1" : ""
                  } ${
                    selected
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--line)] bg-[var(--card)] hover:-translate-y-1 hover:border-[var(--accent)]/40"
                  }`}
                >
                  <span className="font-display text-lg font-semibold text-[var(--ink)]">{r.name}</span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    {r.kind}
                  </span>
                  <span className="mt-2 text-xs text-[var(--ink-soft)]">
                    {count === 0 ? "Coming soon" : `${count} ${count === 1 ? "piece" : "pieces"}`}
                    {showScene && <span className="text-[var(--ink-faint)]"> · {r.landmark.toLowerCase()}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Phones: the open room expands under the tiles */}
        {!showScene && roomPanel}
      </div>
    </section>
  );
}

function RoomPanel({
  id,
  topic,
  setTopic,
  onClose,
  sideways,
}: {
  id: RoomId;
  topic: Topic | "all";
  setTopic: (t: Topic | "all") => void;
  onClose: () => void;
  sideways: boolean;
}) {
  const room = rooms.find((r) => r.id === id)!;
  const hasWriting = id === "trail-maps" || id === "the-cairn";
  const items = inRoom(id)
    .filter((c) => !hasWriting || topic === "all" || c.topic === topic)
    .sort(byNewest);

  return (
    <motion.div
      initial={sideways ? { opacity: 0, x: 40 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={sideways ? { opacity: 0, x: 40 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: sideways ? 0.15 : 0 }}
      className={
        sideways
          ? "flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)]/95 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur"
          : "mt-8"
      }
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            {room.kind} · {room.landmark}
          </p>
          <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">{room.name}</h3>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{room.blurb}</p>
        </div>
        <button
          onClick={onClose}
          aria-label={`Close ${room.name}`}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--ink)]"
        >
          Close <span aria-hidden className="text-sm leading-none">×</span>
        </button>
      </div>

      {id === "trail-maps" && (
        <div className="mb-5 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: "All" }, ...topics].map((t) => (
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
          ))}
        </div>
      )}

      <div className={sideways ? "-mr-3 flex-1 overflow-y-auto pr-3 scrollbar-thin" : ""}>
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line)] px-6 py-12 text-center">
            <p className="font-display text-lg text-[var(--ink)]">Nothing stacked here yet.</p>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">The first stone is on its way.</p>
          </div>
        ) : (
          <div className={sideways ? "grid gap-4" : "grid gap-6 sm:grid-cols-2 md:grid-cols-3"}>
            {items.map((item) => (
              <CreationCard key={item.title} item={item} showRoom={id === "the-cairn"} inset={sideways} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CreationCard({ item, showRoom, inset }: { item: Creation; showRoom: boolean; inset: boolean }) {
  const topicLabel = topics.find((t) => t.id === item.topic)?.label;
  const roomName = showRoom ? rooms.find((r) => r.id === item.room)?.name : undefined;
  const meta = [roomName, topicLabel, item.date && formatDate(item.date)].filter(Boolean).join(" · ");
  const body = (
    <>
      {item.status && (
        <span className="mb-4 self-start rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[var(--ink-soft)]">
          {item.status}
        </span>
      )}
      {meta && <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--ink-faint)]">{meta}</p>}
      <h3 className="font-display text-lg font-semibold text-[var(--ink)] mb-2">{item.title}</h3>
      {item.description ? (
        <p className="text-sm text-[var(--ink-soft)] flex-1">{item.description}</p>
      ) : (
        <div className="flex-1" />
      )}
      {item.href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
          {item.cta ?? "Take a look"}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      )}
    </>
  );

  const cls =
    `${inset ? "bg-[var(--paper-2)] p-5" : "bg-[var(--card)] p-6"} group flex h-full flex-col rounded-2xl border border-[var(--line)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]`;

  return item.href ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
