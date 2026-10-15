import { type Photo, PRODUCTS } from "@/lib/photos";

export type Category = "ceramics" | "lighting" | "textiles" | "living";

export interface Product {
  badge?: "New" | "Bestseller";
  category: Category;
  /** Price before a sale, shown struck through. */
  compareAt?: number;
  id: string;
  name: string;
  photo: Photo;
  price: number;
  rating: number;
  reviews: number;
  variant: string;
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "ceramics", label: "Ceramics", blurb: "Thrown, glazed, used daily" },
  { id: "lighting", label: "Lighting", blurb: "Warm light for long evenings" },
  { id: "textiles", label: "Textiles", blurb: "Linen, wool and cotton" },
  { id: "living", label: "Living", blurb: "Plants, scent and seating" },
];

export const CATALOG: Product[] = [
  {
    id: "begin-mug",
    name: "Begin mug",
    variant: "Chalk · 350 ml",
    category: "ceramics",
    price: 28,
    rating: 4.8,
    reviews: 212,
    badge: "Bestseller",
    photo: PRODUCTS.mug,
  },
  {
    id: "bud-vase",
    name: "Blush bud vase",
    variant: "Rose clay · 18 cm",
    category: "ceramics",
    price: 34,
    rating: 4.7,
    reviews: 86,
    badge: "New",
    photo: PRODUCTS.budVase,
  },
  {
    id: "arc-lamp",
    name: "Arc desk lamp",
    variant: "Sage · matte steel",
    category: "lighting",
    price: 89,
    rating: 4.9,
    reviews: 154,
    badge: "Bestseller",
    photo: PRODUCTS.deskLamp,
  },
  {
    id: "moss-throw",
    name: "Moss knit throw",
    variant: "Merino blend · 130 × 170",
    category: "textiles",
    price: 72,
    rating: 4.6,
    reviews: 64,
    photo: PRODUCTS.knitThrow,
  },
  {
    id: "linen-cushions",
    name: "Linen cushion pair",
    variant: "Oat · 45 × 45",
    category: "textiles",
    price: 48,
    compareAt: 60,
    rating: 4.5,
    reviews: 97,
    photo: PRODUCTS.cushions,
  },
  {
    id: "shelf-planter",
    name: "Shelf planter",
    variant: "White glaze · 12 cm",
    category: "living",
    price: 22,
    rating: 4.7,
    reviews: 131,
    photo: PRODUCTS.planter,
  },
  {
    id: "fig-candle",
    name: "Fig and cedar candle",
    variant: "Soy wax · 40 hours",
    category: "living",
    price: 26,
    rating: 4.8,
    reviews: 188,
    badge: "New",
    photo: PRODUCTS.candle,
  },
  {
    id: "brass-tea-set",
    name: "Brass tea set",
    variant: "Teapot and two cups",
    category: "ceramics",
    price: 118,
    compareAt: 140,
    rating: 4.6,
    reviews: 42,
    photo: PRODUCTS.teaSet,
  },
  {
    id: "citrus-bowl",
    name: "Citrus bowl",
    variant: "Cream glaze · 22 cm",
    category: "ceramics",
    price: 38,
    rating: 4.7,
    reviews: 58,
    badge: "New",
    photo: PRODUCTS.bowl,
  },
  {
    id: "studio-lamp",
    name: "Studio task lamp",
    variant: "Ink · adjustable arm",
    category: "lighting",
    price: 96,
    rating: 4.6,
    reviews: 37,
    badge: "New",
    photo: PRODUCTS.taskLamp,
  },
  {
    id: "lounge-chair",
    name: "Canvas lounge chair",
    variant: "Natural canvas · oak",
    category: "living",
    price: 340,
    rating: 4.9,
    reviews: 29,
    photo: PRODUCTS.loungeChair,
  },
  {
    id: "twin-vases",
    name: "Twin bud vases",
    variant: "Set of two · white",
    category: "ceramics",
    price: 42,
    rating: 4.5,
    reviews: 73,
    photo: PRODUCTS.twinVases,
  },
];

export function findProduct(id: string) {
  const product = CATALOG.find((item) => item.id === id);
  if (!product) {
    throw new Error(`Unknown product ${id}`);
  }
  return product;
}

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
