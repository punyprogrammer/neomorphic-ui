import { asset } from "@/lib/base-path";
import { PEOPLE } from "@/lib/photos";

export interface Chapter {
  start: number;
  title: string;
}

export interface Episode {
  chapters: Chapter[];
  date: string;
  description: string;
  /** Seconds. */
  duration: number;
  /** Seconds already heard; equal to duration once played. */
  heard: number;
  id: string;
  showId: string;
  title: string;
}

export interface Show {
  category: string;
  cover: string;
  description: string;
  host: { avatar: string; bio: string; name: string };
  /** Hue of the cover, for the tinted header. */
  hue: number;
  id: string;
  publisher: string;
  rating: number;
  ratings: string;
  title: string;
}

type EpisodeSeed = [
  title: string,
  description: string,
  minutes: number,
  date: string,
  heard?: number,
];

const cover = (id: string) => asset(`/images/podcasts/${id}.jpg`);

export const SHOWS: Show[] = [
  {
    id: "slow-signal",
    title: "Slow Signal",
    publisher: "Northlight Media",
    category: "Design",
    hue: 40,
    rating: 4.8,
    ratings: "12K",
    cover: cover("slow-signal"),
    description:
      "Unhurried conversations with designers about the decisions nobody sees: defaults, empty states and the work of making software feel calm.",
    host: {
      name: "Noor Haddad",
      avatar: PEOPLE.noor,
      bio: "Design lead and occasional ceramicist. Noor has interviewed 140 designers since 2019.",
    },
  },
  {
    id: "headroom",
    title: "Headroom",
    publisher: "Calm Collective",
    category: "Wellness",
    hue: 180,
    rating: 4.9,
    ratings: "31K",
    cover: cover("headroom"),
    description:
      "Ten-minute resets for busy days: breathing, focus and the science of doing less, better.",
    host: {
      name: "Mira Patel",
      avatar: PEOPLE.mira,
      bio: "Clinical psychologist turned audio producer, Mira writes every script on paper first.",
    },
  },
  {
    id: "field-notes",
    title: "Field Notes",
    publisher: "Open Air Radio",
    category: "Nature",
    hue: 130,
    rating: 4.7,
    ratings: "8.4K",
    cover: cover("field-notes"),
    description:
      "Binaural walks through forests, wetlands and city parks, with the ecologists who know them best.",
    host: {
      name: "Kenji Mori",
      avatar: PEOPLE.kenji,
      bio: "Field recordist who has spent 300 nights in a tent with a microphone for company.",
    },
  },
  {
    id: "tidewater",
    title: "Tidewater",
    publisher: "Blue Hour Media",
    category: "Science",
    hue: 320,
    rating: 4.8,
    ratings: "19K",
    cover: cover("tidewater"),
    description:
      "The ocean, one question at a time: why waves break, where eels go and what the tide knows.",
    host: {
      name: "Lucía Ferrer",
      avatar: PEOPLE.lucia,
      bio: "Marine biologist and free diver, Lucía records most episodes within earshot of the sea.",
    },
  },
  {
    id: "after-hours",
    title: "After Hours",
    publisher: "Metro Stories",
    category: "Culture",
    hue: 255,
    rating: 4.6,
    ratings: "6.1K",
    cover: cover("after-hours"),
    description:
      "Stories from the people who keep cities running at night: bakers, nurses, tram drivers and the last DJ on air.",
    host: {
      name: "Theo Laurent",
      avatar: PEOPLE.theo,
      bio: "Former night-bus driver and radio producer from Lyon.",
    },
  },
  {
    id: "margins",
    title: "Margins",
    publisher: "Paper Lantern",
    category: "Books",
    hue: 70,
    rating: 4.7,
    ratings: "9.9K",
    cover: cover("margins"),
    description:
      "One book, one reader, one hour. We read the notes people leave in the margins and ask them why.",
    host: {
      name: "Elena Ruiz",
      avatar: PEOPLE.elena,
      bio: "Bookseller in Valencia with strong opinions about dog-eared pages.",
    },
  },
  {
    id: "groove-theory",
    title: "Groove Theory",
    publisher: "Wax & Wire",
    category: "Music",
    hue: 260,
    rating: 4.8,
    ratings: "14K",
    cover: cover("groove-theory"),
    description:
      "The stories behind the records that changed how we listen, played from the original vinyl.",
    host: {
      name: "David Mensah",
      avatar: PEOPLE.david,
      bio: "Collector of 6,000 records and counting, and a fair to middling drummer.",
    },
  },
  {
    id: "small-hours",
    title: "Small Hours",
    publisher: "Calm Collective",
    category: "Sleep",
    hue: 235,
    rating: 4.9,
    ratings: "42K",
    cover: cover("small-hours"),
    description:
      "Gentle stories that go nowhere in particular, read slowly, so you can drift off before the end.",
    host: {
      name: "Hana Sato",
      avatar: PEOPLE.hana,
      bio: "Voice actor and former night-shift librarian with a very slow reading voice.",
    },
  },
  {
    id: "dune",
    title: "Wander",
    publisher: "Far Places",
    category: "Travel",
    hue: 75,
    rating: 4.6,
    ratings: "5.2K",
    cover: cover("dune"),
    description:
      "Slow travel on foot, by rail and by boat, with the locals who would rather you stayed a week.",
    host: {
      name: "Ola Nordmann",
      avatar: PEOPLE.ola,
      bio: "Norwegian rail enthusiast who has crossed 40 countries without flying.",
    },
  },
  {
    id: "bloom",
    title: "Bloom",
    publisher: "Soil & Sun",
    category: "Gardening",
    hue: 350,
    rating: 4.8,
    ratings: "7.7K",
    cover: cover("bloom"),
    description:
      "Balcony gardens, allotments and the patience of growing things, one season at a time.",
    host: {
      name: "Priya Raman",
      avatar: PEOPLE.priya,
      bio: "Grows 30 kinds of chilli on a fourth-floor balcony in Chennai.",
    },
  },
  {
    id: "blueprint",
    title: "Blueprint",
    publisher: "Northlight Media",
    category: "Architecture",
    hue: 220,
    rating: 4.7,
    ratings: "4.9K",
    cover: cover("blueprint"),
    description:
      "How buildings shape the way we live, told by the architects, builders and residents inside them.",
    host: {
      name: "Marcus Hale",
      avatar: PEOPLE.marcus,
      bio: "Architect who now mostly draws on napkins.",
    },
  },
  {
    id: "static",
    title: "Static",
    publisher: "Signal Lab",
    category: "Technology",
    hue: 25,
    rating: 4.5,
    ratings: "3.6K",
    cover: cover("static"),
    description:
      "Technology news, minus the noise. Fifteen minutes on the one story that matters this week.",
    host: {
      name: "Sofia Brandt",
      avatar: PEOPLE.sofia,
      bio: "Tech reporter in Berlin who still keeps a paper diary.",
    },
  },
];

const SEEDS: Record<string, EpisodeSeed[]> = {
  "slow-signal": [
    [
      "The quiet interface",
      "Why the calmest products feel that way: fewer colours, softer motion and defaults you never have to change. With guests from three design teams.",
      52,
      "Oct 14",
      1260,
    ],
    [
      "Designing the empty state",
      "What a screen says when there is nothing to show yet, and why that first impression decides whether people come back.",
      44,
      "Oct 7",
      2640,
    ],
    [
      "Shadows, depth and soft UI",
      "A history of skeuomorphism, flat design and the neumorphic middle ground, from the people who built each era.",
      61,
      "Sep 30",
    ],
    [
      "Typography for tired eyes",
      "Line length, contrast and why your reading app looks better at night.",
      39,
      "Sep 23",
    ],
    [
      "Saying no to features",
      "Three product leads on the roadmap items they killed, and the ones they wish they had.",
      48,
      "Sep 16",
    ],
  ],
  headroom: [
    [
      "A reset for crowded afternoons",
      "A short guided practice for the 3 pm slump: breathe, stretch and pick one thing to finish.",
      12,
      "Oct 15",
    ],
    [
      "Why boredom is good for you",
      "The science of letting the mind wander, and how to make room for it in a day full of notifications.",
      18,
      "Oct 8",
      1080,
    ],
    [
      "Sleep starts at breakfast",
      "Light, caffeine and the morning habits that decide how you sleep tonight.",
      22,
      "Oct 1",
    ],
  ],
  "field-notes": [
    [
      "Dawn chorus in a beech wood",
      "Forty minutes of birdsong recorded in binaural audio, with notes on who is singing and why.",
      41,
      "Oct 12",
      600,
    ],
    [
      "The secret life of wetlands",
      "Frogs, reeds and the slow work of a marsh that cleans a city's water.",
      36,
      "Oct 5",
    ],
    [
      "Rain on a tin roof",
      "An overnight storm in the Western Ghats, recorded from a forest research station.",
      58,
      "Sep 28",
    ],
  ],
  tidewater: [
    [
      "Where do eels go?",
      "For two thousand years nobody knew where European eels were born. A story of patience, nets and the Sargasso Sea.",
      47,
      "Oct 13",
      1500,
    ],
    [
      "Why waves break",
      "Physics at the shoreline, explained by a surfer who became an oceanographer.",
      38,
      "Oct 6",
    ],
    [
      "The glow in the water",
      "Bioluminescent plankton, and the night swim that started a career.",
      42,
      "Sep 29",
    ],
  ],
  "after-hours": [
    [
      "The 3 am bakery",
      "Inside a neighbourhood bakery while the city sleeps, from the first proof to the first customer.",
      33,
      "Oct 11",
    ],
    [
      "Night tram number 7",
      "One driver, one route, and the regulars who ride it every night.",
      29,
      "Oct 4",
    ],
    [
      "The last DJ on air",
      "Late-night radio and the listeners who call in to keep the host company.",
      45,
      "Sep 27",
    ],
  ],
  margins: [
    [
      "A pencil note in a library copy",
      "A reader traces the stranger who annotated her library copy of Middlemarch in 1974.",
      55,
      "Oct 10",
    ],
    [
      "Books we lend and never get back",
      "Listeners call in about the books that left their shelves and the friends who kept them.",
      40,
      "Oct 3",
    ],
    [
      "Reading slowly on purpose",
      "One chapter a day, out loud, with a book club that has met for 31 years.",
      51,
      "Sep 26",
    ],
  ],
  "groove-theory": [
    [
      "The record that taught us to listen",
      "How one jazz album recorded in two afternoons became the most-played record in history.",
      64,
      "Oct 9",
      3840,
    ],
    [
      "Why vinyl came back",
      "Pressing plants, warm sound and the economics of a format that refused to die.",
      49,
      "Oct 2",
    ],
    [
      "Drum breaks that built hip-hop",
      "Six seconds of drums from 1970, and the decades of music built on them.",
      57,
      "Sep 25",
    ],
  ],
  "small-hours": [
    [
      "The lighthouse keeper's garden",
      "A slow story about a keeper, a windswept garden and a very patient cat.",
      45,
      "Oct 15",
    ],
    [
      "A night train to the coast",
      "Sleeper carriages, a cup of tea and the gentle rattle of the rails.",
      52,
      "Oct 8",
    ],
    [
      "Snow on a quiet village",
      "Nothing happens. It snows. Somebody bakes bread.",
      48,
      "Oct 1",
    ],
  ],
  dune: [
    [
      "Walking the salt road",
      "Five days on foot across the desert with a caravan that has followed the same route for centuries.",
      53,
      "Oct 9",
    ],
    [
      "The slowest train in Europe",
      "Six hours to travel 150 kilometres through the Alps, and nobody wants it to be faster.",
      46,
      "Oct 2",
    ],
    [
      "Island time",
      "A ferry, a bicycle and a week on an island without cars.",
      39,
      "Sep 25",
    ],
  ],
  bloom: [
    [
      "A balcony in October",
      "What to plant now for colour in spring, with a gardener who works in 4 square metres.",
      31,
      "Oct 12",
    ],
    [
      "Saving seeds",
      "Tomatoes, beans and the community seed libraries keeping old varieties alive.",
      37,
      "Oct 5",
    ],
    [
      "Cherry blossom season",
      "Why sakura matters so much in Japan, and how to grow a small tree in a pot.",
      34,
      "Sep 28",
    ],
  ],
  blueprint: [
    [
      "The kitchen table",
      "How one piece of furniture became the centre of the modern home.",
      42,
      "Oct 10",
    ],
    [
      "Buildings that breathe",
      "Thick walls, courtyards and the old ideas architects are borrowing to cool cities.",
      50,
      "Oct 3",
    ],
    [
      "White towers",
      "Why so many new buildings look the same, and the architects pushing back.",
      44,
      "Sep 26",
    ],
  ],
  static: [
    [
      "The quiet phone",
      "The new wave of minimal phones, and whether anyone can live with one.",
      16,
      "Oct 14",
    ],
    [
      "Batteries, explained",
      "Why your laptop lasts all day now, and what comes after lithium.",
      14,
      "Oct 7",
    ],
    [
      "The open web strikes back",
      "Small sites, RSS and the people building a slower internet.",
      17,
      "Sep 30",
    ],
  ],
};

const CHAPTER_TITLES = [
  "Cold open",
  "Introductions",
  "The story so far",
  "What changed",
  "Listener questions",
  "Before you go",
];

function chaptersFor(duration: number): Chapter[] {
  const count = duration > 30 * 60 ? 6 : 4;
  const weights = [0, 0.04, 0.18, 0.42, 0.7, 0.9].slice(0, count);
  return weights.map((w, i) => ({
    start: Math.round(duration * w),
    title: CHAPTER_TITLES[count === 4 && i === 3 ? 5 : i],
  }));
}

export const EPISODES: Episode[] = SHOWS.flatMap((show) =>
  SEEDS[show.id].map(([title, description, minutes, date, heard], index) => {
    const duration = minutes * 60;
    return {
      id: `${show.id}-${index + 1}`,
      showId: show.id,
      title,
      description,
      duration,
      date,
      heard: heard ?? (index === 2 ? duration : 0),
      chapters: chaptersFor(duration),
    };
  })
);

export function getShow(id: string) {
  const show = SHOWS.find((item) => item.id === id);
  if (!show) {
    throw new Error(`Unknown show ${id}`);
  }
  return show;
}

export function getEpisode(id: string) {
  const episode = EPISODES.find((item) => item.id === id);
  if (!episode) {
    throw new Error(`Unknown episode ${id}`);
  }
  return episode;
}

export function episodesOf(showId: string) {
  return EPISODES.filter((episode) => episode.showId === showId);
}

/** 1:05:09 or 4:07. */
export function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rest = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${rest}` : `${m}:${rest}`;
}

/** "1 hr 4 min" or "52 min". */
export function length(seconds: number) {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)} hr ${m % 60} min` : `${m} min`;
}
