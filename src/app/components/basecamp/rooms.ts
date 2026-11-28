/* ------------------------------------------------------------------ */
/*  Basecamp: things I make along the way                             */
/*                                                                    */
/*  To add something, add one entry to `creations` below.            */
/*  `room` decides where it lives; writing also takes a `topic`.      */
/*  Every creation also shows up in The Cairn (the "everything" room).*/
/* ------------------------------------------------------------------ */

/** Each room is a landmark in the 3D scene. Ids double as URL hashes (#summits). */
export type RoomId = "summits" | "vistas" | "campfire" | "trail-maps" | "the-cairn";
export type Topic = "guides" | "books" | "science";
export type Status = "in progress" | "finished";

export interface Creation {
  room: Exclude<RoomId, "the-cairn">;
  /** Writing only: which shelf inside Trail Maps */
  topic?: Topic;
  title: string;
  description?: string;
  /** "YYYY-MM" - used to sort newest first */
  date?: string;
  status?: Status;
  href?: string;
  cta?: string;
}

export interface Room {
  id: RoomId;
  name: string;
  kind: string;
  /** What you click in the scene to open this room */
  landmark: string;
  blurb: string;
}

export const rooms: Room[] = [
  {
    id: "summits",
    name: "Summits",
    kind: "Builds",
    landmark: "The mountains",
    blurb: "Projects and tools I have built.",
  },
  {
    id: "vistas",
    name: "Vistas",
    kind: "Design",
    landmark: "The archway",
    blurb: "Sketches, UI and visual work.",
  },
  {
    id: "campfire",
    name: "Campfire",
    kind: "Music",
    landmark: "The camper & fire",
    blurb: "Songs, practice and things I play.",
  },
  {
    id: "trail-maps",
    name: "Trail Maps",
    kind: "Writing",
    landmark: "The board",
    blurb: "Guides and explainers: things I've figured out, mapped out for you.",
  },
  {
    id: "the-cairn",
    name: "The Cairn",
    kind: "Everything",
    landmark: "The stone stack",
    blurb: "Every stone stacked so far, newest first.",
  },
];

export const topics: { id: Topic; label: string }[] = [
  { id: "guides", label: "Guides" },
  { id: "books", label: "On books" },
  { id: "science", label: "On science" },
];

export const creations: Creation[] = [
  {
    room: "summits",
    title: "Guitar Log",
    description: "Plan and track your guitar practice.",
    date: "2026-02",
    href: "https://guitar-ilemnite.base44.app",
    cta: "Open it",
  },
  {
    room: "summits",
    title: "CasePartner",
    description: "Practise case interviews out loud with an AI interviewer.",
    date: "2026-07",
    href: "https://github.com/swathisarav/CasePartner",
    cta: "See the code",
  },
  {
    room: "summits",
    title: "Oratory",
    description: "A tool to practice yapping.",
    date: "2026-07",
    status: "in progress",
  },
];

export const inRoom = (id: RoomId) =>
  id === "the-cairn" ? creations : creations.filter((c) => c.room === id);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatDate(d: string) {
  const [y, m] = d.split("-").map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
}

export const byNewest = (a: Creation, b: Creation) =>
  (b.date ?? "").localeCompare(a.date ?? "");
