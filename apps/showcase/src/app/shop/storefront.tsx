"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";
import { Avatar, AvatarImage } from "@neomorphic-react/ui/avatar";
import { Badge, BadgeAnchor } from "@neomorphic-react/ui/badge";
import { Button, buttonVariants } from "@neomorphic-react/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@neomorphic-react/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@neomorphic-react/ui/carousel";
import { Chip } from "@neomorphic-react/ui/chip";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@neomorphic-react/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neomorphic-react/ui/input-group";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@neomorphic-react/ui/progress";
import { Separator } from "@neomorphic-react/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@neomorphic-react/ui/sheet";
import { Surface } from "@neomorphic-react/ui/surface";
import { Tabs, TabsList, TabsTrigger } from "@neomorphic-react/ui/tabs";
import { toast } from "@neomorphic-react/ui/toast";
import { Toggle } from "@neomorphic-react/ui/toggle";
import { cn } from "@neomorphic-react/ui/utils";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Mail,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";

import {
  CATALOG,
  CATEGORIES,
  type Category,
  findProduct,
  type Product,
  usd,
} from "@/lib/catalog";
import { INTERIORS, PEOPLE, PRODUCTS } from "@/lib/photos";

const FREE_SHIPPING = 75;

const SLIDES = [
  {
    eyebrow: "The autumn edit",
    title: "Slow mornings, softly lit",
    body: "Lamps with warm, low glare light and the pieces that gather around them.",
    category: "lighting",
    photo: INTERIORS.armchair,
  },
  {
    eyebrow: "Linen season",
    title: "Bedding that breathes",
    body: "Stone-washed linen and merino throws, soft from the first night.",
    category: "textiles",
    photo: INTERIORS.bedroom,
  },
  {
    eyebrow: "Small-batch stoneware",
    title: "Made to be used",
    body: "Mugs, bowls and vases thrown by hand and glazed to take daily wear.",
    category: "ceramics",
    photo: INTERIORS.livingRoom,
  },
] satisfies {
  body: string;
  category: Category;
  eyebrow: string;
  photo: { alt: string; src: string };
  title: string;
}[];

const CATEGORY_PHOTOS: Record<Category, { alt: string; src: string }> = {
  ceramics: PRODUCTS.twinVases,
  lighting: PRODUCTS.taskLamp,
  textiles: PRODUCTS.cushions,
  living: PRODUCTS.tablePlant,
};

const PERKS = [
  {
    icon: Truck,
    title: "Free shipping",
    body: `On orders over $${FREE_SHIPPING}`,
  },
  { icon: RotateCcw, title: "30-day returns", body: "Free and no questions" },
  { icon: Leaf, title: "Responsibly made", body: "Small studios, fair pay" },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    body: "Cards, UPI and wallets",
  },
];

const REVIEWS = [
  {
    name: "Hana Sato",
    place: "Kyoto",
    photo: PEOPLE.hana,
    product: "Begin mug",
    quote:
      "Heavier than it looks and keeps coffee warm through a long email. I bought a second one within a week.",
  },
  {
    name: "Elena Ruiz",
    place: "Valencia",
    photo: PEOPLE.elena,
    product: "Moss knit throw",
    quote:
      "The colour is exactly as photographed, a quiet green that works with everything on our sofa.",
  },
  {
    name: "David Mensah",
    place: "Accra",
    photo: PEOPLE.david,
    product: "Arc desk lamp",
    quote:
      "Warm light without glare on the screen. Assembly took two minutes and the packaging was all paper.",
  },
];

const FAQ = [
  {
    question: "When will my order arrive?",
    answer:
      "Orders leave the studio within two working days. Standard delivery takes four to six days; express takes one to two.",
  },
  {
    question: "Can I return something?",
    answer:
      "Yes. Send anything back within 30 days, unused and in its packaging, and we refund the full price including shipping.",
  },
  {
    question: "Are the ceramics dishwasher safe?",
    answer:
      "Mugs, bowls and vases are fired to stoneware temperatures and are dishwasher and microwave safe. Hand washing keeps the glaze brighter for longer.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We ship to 32 countries. Duties are included in the price at checkout, so there is nothing to pay on delivery.",
  },
];

type Cart = Record<string, number>;
type Filter = "all" | Category;

export function Storefront() {
  const [cart, setCart] = useState<Cart>({ "begin-mug": 1 });
  const [saved, setSaved] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  function addToCart(product: Product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }));
    toast.success({ title: "Added to bag", description: product.name });
  }

  function setQuantity(id: string, quantity: number) {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }
      return next;
    });
  }

  function toggleSaved(id: string, pressed: boolean) {
    setSaved((current) =>
      pressed ? [...current, id] : current.filter((item) => item !== id)
    );
  }

  function browse(category: Filter) {
    setFilter(category);
    setQuery("");
    document
      .getElementById("shop")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="grid min-w-0 gap-16">
      <StoreHeader
        cart={cart}
        onBrowse={browse}
        onQuantity={setQuantity}
        query={query}
        saved={saved.length}
        setQuery={(value) => {
          setQuery(value);
          if (value) {
            setFilter("all");
          }
        }}
      />
      <Hero onBrowse={browse} />
      <Perks />
      <Categories onBrowse={browse} />
      <ProductGrid
        filter={filter}
        onAdd={addToCart}
        onFilter={setFilter}
        onSave={toggleSaved}
        query={query}
        saved={saved}
        setQuery={setQuery}
      />
      <NewArrivals onAdd={addToCart} />
      <Editorial onBrowse={browse} />
      <Reviews />
      <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Faq />
        <Newsletter />
      </div>
      <StoreFooter onBrowse={browse} />
    </div>
  );
}

function StoreHeader({
  cart,
  onBrowse,
  onQuantity,
  query,
  saved,
  setQuery,
}: {
  cart: Cart;
  onBrowse: (category: Filter) => void;
  onQuantity: (id: string, quantity: number) => void;
  query: string;
  saved: number;
  setQuery: (value: string) => void;
}) {
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);

  return (
    <header className="grid min-w-0 gap-5">
      <Surface
        className="flex w-full min-w-0 items-center justify-center gap-2 rounded-full px-3 py-2 text-center text-muted-foreground text-xs sm:px-4 sm:text-sm"
        depth="sm"
        elevation="inset"
      >
        <Truck aria-hidden="true" className="size-4 shrink-0" />
        <span className="sm:hidden">Free shipping over ${FREE_SHIPPING}</span>
        <span className="hidden sm:inline">
          Free shipping over ${FREE_SHIPPING} and free returns for 30 days
        </span>
      </Surface>

      <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8">
        <Link
          className="font-display font-semibold text-2xl text-foreground tracking-tight sm:text-3xl"
          href="/shop"
        >
          Kiln
          <span className="text-primary">.</span>
        </Link>

        <nav
          aria-label="Departments"
          className="order-last w-full lg:order-none lg:w-auto"
        >
          <ul className="flex flex-wrap gap-1">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Button
                  className="normal-case tracking-normal"
                  onClick={() => onBrowse(category.id)}
                  size="sm"
                  variant="ghost"
                >
                  {category.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex min-w-0 flex-1 basis-full items-center justify-end gap-2 sm:basis-auto sm:gap-3">
          <InputGroup className="min-w-0 max-w-none flex-1 sm:max-w-72">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search products"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onBrowse("all");
                  setQuery(event.currentTarget.value);
                }
              }}
              placeholder="Search vases, lamps…"
              type="search"
              value={query}
            />
          </InputGroup>

          <BadgeAnchor>
            <Button
              aria-label={`Saved items, ${saved}`}
              icon={<Heart />}
              variant="ghost"
            />
            <Badge
              count={saved}
              placement="top-end"
              size="sm"
              variant="primary"
            />
          </BadgeAnchor>

          <CartSheet cart={cart} count={count} onQuantity={onQuantity} />
        </div>
      </div>
    </header>
  );
}

function CartSheet({
  cart,
  count,
  onQuantity,
}: {
  cart: Cart;
  count: number;
  onQuantity: (id: string, quantity: number) => void;
}) {
  const lines = Object.entries(cart).map(([id, quantity]) => ({
    product: findProduct(id),
    quantity,
  }));
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0
  );
  const toFree = Math.max(FREE_SHIPPING - subtotal, 0);

  return (
    <Sheet>
      <BadgeAnchor>
        <SheetTrigger
          render={
            <Button aria-label={`Bag, ${count} items`} icon={<ShoppingBag />} />
          }
        />
        <Badge count={count} placement="top-end" size="sm" variant="primary" />
      </BadgeAnchor>
      <SheetContent className="flex flex-col" size="sm">
        <SheetHeader>
          <SheetTitle>Your bag</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Nothing here yet."
              : `${count} ${count === 1 ? "item" : "items"}`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <Empty className="flex-1" variant="inset">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingBag />
              </EmptyMedia>
              <EmptyTitle>Your bag is empty</EmptyTitle>
              <EmptyDescription>
                Start with a best seller: the Begin mug.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => onQuantity("begin-mug", 1)}
                size="sm"
                variant="primary"
              >
                Add the mug
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <ul className="grid flex-1 content-start gap-5 overflow-y-auto px-(--sheet-spacing,1.5rem) py-2">
            {lines.map(({ product, quantity }) => (
              <li className="flex items-center gap-4" key={product.id}>
                <Surface className="p-1" depth="sm">
                  <span className="relative block size-16 overflow-hidden rounded-[calc(var(--radius)*0.8)]">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="64px"
                      src={product.photo.src}
                    />
                  </span>
                </Surface>
                <div className="grid min-w-0 flex-1 gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="truncate text-muted-foreground text-xs">
                        {product.variant}
                      </p>
                    </div>
                    <span className="font-medium text-foreground tabular-nums">
                      {usd.format(product.price * quantity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <ButtonGroup aria-label={`Quantity of ${product.name}`}>
                      <Button
                        aria-label="Decrease"
                        icon={<Minus />}
                        onClick={() => onQuantity(product.id, quantity - 1)}
                        size="sm"
                      />
                      <ButtonGroupText className="min-w-8 justify-center tabular-nums">
                        {quantity}
                      </ButtonGroupText>
                      <Button
                        aria-label="Increase"
                        icon={<Plus />}
                        onClick={() => onQuantity(product.id, quantity + 1)}
                        size="sm"
                      />
                    </ButtonGroup>
                    <Button
                      aria-label={`Remove ${product.name}`}
                      icon={<Trash2 />}
                      onClick={() => onQuantity(product.id, 0)}
                      size="sm"
                      variant="ghost"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 ? (
          <SheetFooter className="grid gap-4">
            <Progress
              max={FREE_SHIPPING}
              value={Math.min(subtotal, FREE_SHIPPING)}
            >
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <ProgressLabel>
                  {toFree > 0
                    ? `${usd.format(toFree)} away from free shipping`
                    : "Free shipping unlocked"}
                </ProgressLabel>
                <ProgressValue className="sr-only" />
              </div>
            </Progress>
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground text-xl tabular-nums">
                {usd.format(subtotal)}
              </span>
            </div>
            <Link
              className={buttonVariants({
                variant: "primary",
                fullWidth: true,
              })}
              href="/checkout"
            >
              Checkout
            </Link>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function HeroAutoplay({ paused }: { paused: boolean }) {
  const { api } = useCarousel();

  useEffect(() => {
    if (
      !api ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => api.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return null;
}

function Hero({ onBrowse }: { onBrowse: (category: Filter) => void }) {
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  return (
    <Carousel
      aria-label="Featured collections"
      className="min-w-0 overflow-hidden"
      gap="3rem"
      onBlurCapture={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      opts={{ loop: true }}
    >
      <HeroAutoplay paused={!playing || hovered} />
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem
            aria-label={`${index + 1} of ${SLIDES.length}`}
            key={slide.title}
          >
            <Card className="grid items-center gap-8 p-6 md:grid-cols-[1fr_1.2fr] md:p-10">
              <div className="grid content-center gap-5 md:ps-10">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  {slide.eyebrow}
                </p>
                <h2 className="text-balance font-display text-3xl text-foreground leading-tight sm:text-4xl md:text-5xl">
                  {slide.title}
                </h2>
                <p className="max-w-sm text-muted-foreground leading-relaxed">
                  {slide.body}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    icon={<ArrowRight />}
                    iconPosition="end"
                    onClick={() => onBrowse(slide.category)}
                    variant="primary"
                  >
                    Shop {slide.category}
                  </Button>
                  <Button onClick={() => onBrowse("all")}>View all</Button>
                </div>
              </div>
              <Surface className="p-2" elevation="inset">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*0.85)]">
                  <Image
                    alt={slide.photo.alt}
                    className="object-cover"
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    src={slide.photo.src}
                  />
                </div>
              </Surface>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="group-data-[orientation=horizontal]/carousel:start-3 max-md:hidden" />
      <CarouselNext className="group-data-[orientation=horizontal]/carousel:end-3 max-md:hidden" />
      <div className="mt-6 flex items-center justify-center gap-4">
        <CarouselIndicator className="mt-0" />
        <Toggle
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          onPressedChange={(pressed) => setPlaying(!pressed)}
          pressed={!playing}
          size="sm"
        >
          {playing ? <Pause /> : <Play />}
        </Toggle>
      </div>
    </Carousel>
  );
}

function Perks() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PERKS.map(({ icon: Icon, title, body }) => (
        <li key={title}>
          <Surface className="flex h-full items-center gap-4 p-4" depth="sm">
            <Surface
              className="grid size-11 shrink-0 place-items-center text-primary"
              elevation="inset"
              shape="circle"
            >
              <Icon aria-hidden="true" className="size-5" />
            </Surface>
            <div>
              <p className="font-medium text-foreground">{title}</p>
              <p className="text-muted-foreground text-sm">{body}</p>
            </div>
          </Surface>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({
  action,
  description,
  id,
  title,
}: {
  action?: ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="grid gap-1">
        <h2
          className="font-display text-2xl text-foreground sm:text-3xl"
          id={id}
        >
          {title}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function Categories({ onBrowse }: { onBrowse: (category: Filter) => void }) {
  return (
    <section aria-labelledby="categories" className="grid gap-6">
      <SectionHeading
        description="Four rooms' worth of things, made slowly."
        id="categories"
        title="Shop by category"
      />
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => {
          const photo = CATEGORY_PHOTOS[category.id];
          const count = CATALOG.filter(
            (product) => product.category === category.id
          ).length;
          return (
            <li key={category.id}>
              <Card
                className="group h-full cursor-pointer gap-4 p-3 transition-transform hover:-translate-y-0.5"
                render={
                  <button
                    aria-label={`${category.label}, ${count} products`}
                    onClick={() => onBrowse(category.id)}
                    type="button"
                  />
                }
              >
                <Surface className="p-1.5" elevation="inset">
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-[calc(var(--radius)*0.8)]">
                    <Image
                      alt=""
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 260px, 45vw"
                      src={photo.src}
                    />
                  </span>
                </Surface>
                <span className="flex items-center justify-between gap-2 px-2 pb-1 text-start">
                  <span>
                    <span className="block font-medium text-foreground">
                      {category.label}
                    </span>
                    <span className="block text-muted-foreground text-sm">
                      {category.blurb}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Rating({ product }: { product: Product }) {
  return (
    <span
      className="flex items-center gap-1.5 text-muted-foreground text-xs"
      role="img"
      aria-label={`Rated ${product.rating} out of 5 from ${product.reviews} reviews`}
    >
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            className={cn(
              "size-3.5",
              n <= Math.round(product.rating)
                ? "fill-amber-400 text-amber-400"
                : "text-border"
            )}
            key={n}
          />
        ))}
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {product.rating} ({product.reviews})
      </span>
    </span>
  );
}

function Price({ product }: { product: Product }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-semibold text-foreground text-lg tabular-nums">
        {usd.format(product.price)}
      </span>
      {product.compareAt ? (
        <s className="text-muted-foreground text-sm tabular-nums">
          <span className="sr-only">was </span>
          {usd.format(product.compareAt)}
        </s>
      ) : null}
    </span>
  );
}

function ProductCard({
  onAdd,
  onSave,
  product,
  saved,
}: {
  onAdd: (product: Product) => void;
  onSave?: (id: string, pressed: boolean) => void;
  product: Product;
  saved?: boolean;
}) {
  const onSale = product.compareAt !== undefined;

  return (
    <Card
      className="h-full gap-4 p-3"
      render={<article aria-label={product.name} />}
    >
      <Surface className="relative p-1.5" elevation="inset">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*0.8)]">
          <Image
            alt={product.photo.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            src={product.photo.src}
          />
        </span>
        {product.badge || onSale ? (
          <Chip
            className="absolute start-3.5 top-3.5 bg-background/90"
            size="sm"
          >
            {onSale ? "Sale" : product.badge}
          </Chip>
        ) : null}
        {onSave ? (
          <Toggle
            aria-label={`Save ${product.name}`}
            className="absolute end-3.5 top-3.5 bg-background/90 aria-pressed:text-rose-500"
            iconFill
            onPressedChange={(pressed) => onSave(product.id, pressed)}
            pressed={saved}
            size="sm"
          >
            <Heart />
          </Toggle>
        ) : null}
      </Surface>
      <div className="grid gap-1.5 px-2">
        <Rating product={product} />
        <h3 className="font-medium text-foreground leading-snug">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm">{product.variant}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 px-2 pb-1">
        <Price product={product} />
        <Button
          aria-label={`Add ${product.name} to bag`}
          icon={<Plus />}
          onClick={() => onAdd(product)}
          size="sm"
        />
      </div>
    </Card>
  );
}

function ProductGrid({
  filter,
  onAdd,
  onFilter,
  onSave,
  query,
  saved,
  setQuery,
}: {
  filter: Filter;
  onAdd: (product: Product) => void;
  onFilter: (filter: Filter) => void;
  onSave: (id: string, pressed: boolean) => void;
  query: string;
  saved: string[];
  setQuery: (value: string) => void;
}) {
  const needle = query.trim().toLowerCase();
  const products = CATALOG.filter(
    (product) =>
      (filter === "all" || product.category === filter) &&
      (!needle ||
        `${product.name} ${product.variant} ${product.category}`
          .toLowerCase()
          .includes(needle))
  );

  return (
    <section
      aria-labelledby="shop-title"
      className="grid scroll-mt-6 gap-6"
      id="shop"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h2 className="font-display text-3xl text-foreground" id="shop-title">
            {needle ? `Results for “${query.trim()}”` : "Best loved"}
          </h2>
          <p className="text-muted-foreground" aria-live="polite">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <Tabs
          className="min-w-0 max-w-full"
          onValueChange={(value) => onFilter(value as Filter)}
          value={filter}
        >
          <div className="overflow-x-auto">
            <TabsList aria-label="Category" className="min-w-max">
              <TabsTrigger value="all">All</TabsTrigger>
              {CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {products.length === 0 ? (
        <Empty variant="inset">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>Nothing matches yet</EmptyTitle>
            <EmptyDescription>
              Try a broader word, or browse everything.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => {
                setQuery("");
                onFilter("all");
              }}
              size="sm"
            >
              Clear search
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                onAdd={onAdd}
                onSave={onSave}
                product={product}
                saved={saved.includes(product.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function NewArrivals({ onAdd }: { onAdd: (product: Product) => void }) {
  const [api, setApi] = useState<CarouselApi>();
  const [edges, setEdges] = useState({ prev: false, next: false });
  const arrivals = CATALOG.filter((product) => product.badge === "New").concat(
    CATALOG.filter((product) => product.compareAt)
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    const sync = () =>
      setEdges({ prev: api.canScrollPrev(), next: api.canScrollNext() });
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  return (
    <section aria-labelledby="arrivals" className="grid gap-6">
      <SectionHeading
        action={
          <div className="flex gap-3">
            <Button
              aria-label="Previous products"
              disabled={!edges.prev}
              icon={<ChevronLeft />}
              onClick={() => api?.scrollPrev()}
              size="sm"
            />
            <Button
              aria-label="Next products"
              disabled={!edges.next}
              icon={<ChevronRight />}
              onClick={() => api?.scrollNext()}
              size="sm"
            />
          </div>
        }
        description="Fresh from the kiln, and a few pieces on sale."
        id="arrivals"
        title="New this week"
      />
      <Carousel
        aria-label="New this week"
        opts={{ align: "start" }}
        setApi={setApi}
      >
        <CarouselContent>
          {arrivals.map((product) => (
            <CarouselItem
              className="basis-[80%] sm:basis-1/2 lg:basis-1/4"
              key={product.id}
            >
              <ProductCard onAdd={onAdd} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function Editorial({ onBrowse }: { onBrowse: (category: Filter) => void }) {
  return (
    <Card className="grid items-center gap-8 overflow-hidden p-6 md:grid-cols-2 md:p-8">
      <Surface className="p-2" elevation="inset">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*0.85)]">
          <Image
            alt={INTERIORS.galleryWall.alt}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            src={INTERIORS.galleryWall.src}
          />
        </div>
      </Surface>
      <div className="grid gap-5 md:pe-6">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
          Journal
        </p>
        <h2 className="text-balance font-display text-4xl text-foreground leading-tight">
          The slow living edit
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Fewer, better things: a lamp you switch on at dusk, a mug you reach
          for first, a plant that asks for very little. We visited six homes to
          see how they live with less.
        </p>
        <dl className="grid grid-cols-3 gap-4">
          {[
            ["6", "homes visited"],
            ["14", "makers"],
            ["1", "rule: keep it"],
          ].map(([value, label]) => (
            <Surface
              className="flex flex-col-reverse gap-1 p-3 text-center"
              depth="sm"
              elevation="inset"
              key={label}
            >
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd className="font-display text-2xl text-foreground">{value}</dd>
            </Surface>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => onBrowse("living")} variant="primary">
            Shop the edit
          </Button>
          <Button variant="ghost">Read the story</Button>
        </div>
      </div>
    </Card>
  );
}

function Reviews() {
  return (
    <section aria-labelledby="reviews" className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h2 className="font-display text-3xl text-foreground" id="reviews">
            Lived with, and loved
          </h2>
          <p className="text-muted-foreground">
            4.8 average from 1,240 verified reviews
          </p>
        </div>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <li key={review.name}>
            <Card className="h-full" render={<figure />}>
              <CardContent className="grid h-full gap-5">
                <span aria-hidden="true" className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      className="size-4 fill-amber-400 text-amber-400"
                      key={n}
                    />
                  ))}
                </span>
                <blockquote className="flex-1 text-foreground leading-relaxed">
                  “{review.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt="" src={review.photo} />
                  </Avatar>
                  <span className="grid text-sm">
                    <span className="font-medium text-foreground">
                      {review.name}
                    </span>
                    <span className="text-muted-foreground">
                      {review.place} · bought the {review.product}
                    </span>
                  </span>
                </figcaption>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Faq() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Questions</CardTitle>
        <CardDescription>Shipping, returns and care</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion variant="flat">
          {FAQ.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
    toast.success({
      title: "You're on the list",
      description: `Look out for 10% off at ${email}.`,
    });
  }

  return (
    <Card className="lg:sticky lg:top-6">
      <CardHeader>
        <CardTitle className="font-display text-2xl">
          Ten percent off your first order
        </CardTitle>
        <CardDescription>
          One letter a month: new pieces, studio visits, no noise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {joined ? (
          <Surface
            className="flex items-center gap-3 p-4 text-foreground"
            elevation="inset"
          >
            <Mail aria-hidden="true" className="size-5 text-primary" />
            Thanks. Your code is on its way.
          </Surface>
        ) : (
          <form className="grid gap-3" onSubmit={subscribe}>
            <InputGroup>
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Email address"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton type="submit">Join</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <p className="text-muted-foreground text-xs">
              Unsubscribe whenever you like.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

function StoreFooter({ onBrowse }: { onBrowse: (category: Filter) => void }) {
  const columns = [
    { title: "Help", links: ["Shipping", "Returns", "Care guides", "Contact"] },
    {
      title: "Studio",
      links: ["Our makers", "Journal", "Stockists", "Careers"],
    },
  ];

  return (
    <footer className="grid gap-8">
      <Separator />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <p className="font-display font-semibold text-2xl text-foreground">
            Kiln<span className="text-primary">.</span>
          </p>
          <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
            Homeware from small studios, shipped in paper and built to last.
          </p>
        </div>
        <nav aria-label="Shop" className="grid content-start gap-2 text-sm">
          <p className="font-medium text-foreground">Shop</p>
          {CATEGORIES.map((category) => (
            <button
              className="w-fit text-muted-foreground hover:text-foreground"
              key={category.id}
              onClick={() => onBrowse(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </nav>
        {columns.map((column) => (
          <nav
            aria-label={column.title}
            className="grid content-start gap-2 text-sm"
            key={column.title}
          >
            <p className="font-medium text-foreground">{column.title}</p>
            {column.links.map((link) => (
              <a
                className="w-fit text-muted-foreground hover:text-foreground"
                href="#shop"
                key={link}
              >
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 text-muted-foreground text-xs">
        <p>© 2026 Kiln Studio. A demo store, nothing ships.</p>
        <p>
          Photography: CC0 from StockSnap.{" "}
          <Link
            className="underline underline-offset-2 hover:text-foreground"
            href="/credits"
          >
            Credits
          </Link>
        </p>
      </div>
    </footer>
  );
}
