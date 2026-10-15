"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neomorphic-react/ui/accordion";
import { Button } from "@neomorphic-react/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neomorphic-react/ui/card";
import { Checkbox } from "@neomorphic-react/ui/checkbox";
import { Label } from "@neomorphic-react/ui/label";
import { Slider, SliderLabel, SliderValue } from "@neomorphic-react/ui/slider";

const brands = ["Northpeak", "Fjordline", "Ridgeway", "Alder & Pine"];
const sizes = ["S", "M", "L", "XL"];

export default function AccordionInContext() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["price"]} multiple variant="flat">
          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent className="px-2">
              <Slider
                defaultValue={[80, 240]}
                format={{
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }}
                getAriaLabel={(index) =>
                  ["Minimum price", "Maximum price"][index] ?? ""
                }
                max={400}
                step={10}
              >
                <div className="flex items-center justify-between">
                  <SliderLabel className="sr-only">Price</SliderLabel>
                  <SliderValue />
                </div>
              </Slider>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand">
            <AccordionTrigger>Brand</AccordionTrigger>
            <AccordionContent className="grid gap-3 px-2">
              {brands.map((brand) => (
                <Label className="gap-3 font-normal" key={brand}>
                  <Checkbox name="brand" value={brand} />
                  {brand}
                </Label>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-3 px-2">
              {sizes.map((size) => (
                <Label className="gap-3 font-normal" key={size}>
                  <Checkbox name="size" value={size} />
                  {size}
                </Label>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button fullWidth variant="primary">
          Show 128 jackets
        </Button>
      </CardFooter>
    </Card>
  );
}
