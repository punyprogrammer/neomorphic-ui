// CC0 photographs from StockSnap (found through Openverse), stored in
// public/images. Credits and source links live in photo-credits.json.

import { asset } from "@/lib/base-path";

export interface Photo {
  alt: string;
  src: string;
}

function photo(path: string, alt: string): Photo {
  return { src: asset(`/images/${path}.jpg`), alt };
}

const person = (name: string) => asset(`/images/people/${name}.jpg`);

export const PRODUCTS = {
  mug: photo("products/mug", "White stoneware mug on a wooden table"),
  budVase: photo("products/bud-vase", "Blush bud vase holding dried grass"),
  twinVases: photo("products/twin-vases", "Two white vases with pink blossom"),
  deskLamp: photo("products/desk-lamp", "Matte desk lamp against a sage wall"),
  taskLamp: photo("products/task-lamp", "Black task lamp beside a small plant"),
  knitThrow: photo(
    "products/knit-throw",
    "Folded knit throws in moss and grey"
  ),
  cushions: photo("products/cushions", "Linen cushions on a white bed"),
  planter: photo("products/planter", "Small plant in a white planter"),
  tablePlant: photo("products/table-plant", "Leafy plant on a wooden table"),
  candle: photo("products/candle", "White soy candle in a ceramic jar"),
  teaSet: photo("products/tea-set", "Brass teapot with matching cups"),
  bowl: photo("products/bowl", "Cream ceramic bowl holding lemons"),
  loungeChair: photo(
    "products/lounge-chair",
    "Canvas lounge chair by a window"
  ),
} satisfies Record<string, Photo>;

export const INTERIORS = {
  armchair: photo("interiors/armchair", "Mustard armchair beside a floor lamp"),
  livingRoom: photo("interiors/living-room", "Bright living room, white sofa"),
  whiteSofa: photo("interiors/white-sofa", "White sofa with grey cushions"),
  bedroom: photo("interiors/bedroom", "Sunlit bedroom with linen bedding"),
  bedroomCalm: photo("interiors/bedroom-calm", "Minimal white bedroom"),
  kitchen: photo("interiors/kitchen", "Bright galley kitchen"),
  galleryWall: photo("interiors/gallery-wall", "Framed print above a plant"),
} satisfies Record<string, Photo>;

export const SCENES = {
  ridgeSunrise: photo(
    "scenes/ridge-sunrise",
    "Layered mountain ridges at dawn"
  ),
  marketBasket: photo(
    "scenes/market-basket",
    "Basket of peaches, grapes and bananas"
  ),
} satisfies Record<string, Photo>;

export const MUSIC = {
  piano: photo("music/piano", "Ivory piano keys fading into warm light"),
} satisfies Record<string, Photo>;

export const WORKOUTS = {
  run: photo("fitness/run", "Runners on a tree-lined road"),
  swim: photo("fitness/swim", "Lane lines in a swimming pool"),
  strength: photo("fitness/strength", "Blue dumbbells on a white floor"),
} satisfies Record<string, Photo>;

/** Portraits for avatars; alt is empty where the name is shown beside it. */
export const PEOPLE = {
  amardeep: person("amardeep"),
  noor: person("noor"),
  kenji: person("kenji"),
  lucia: person("lucia"),
  ola: person("ola"),
  theo: person("theo"),
  mira: person("mira"),
  amara: person("amara"),
  priya: person("priya"),
  marcus: person("marcus"),
  sofia: person("sofia"),
  hana: person("hana"),
  elena: person("elena"),
  david: person("david"),
} satisfies Record<string, string>;
