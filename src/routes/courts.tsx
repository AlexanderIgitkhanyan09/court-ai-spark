import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search, Star } from "lucide-react";
import { toast } from "sonner";

import courtIndoor from "@/assets/court-indoor.jpg";
import courtOutdoor from "@/assets/court-outdoor.jpg";
import courtTraining from "@/assets/court-training.jpg";
import { SiteHeader } from "@/components/court-time/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/courts")({
  head: () => ({
    meta: [
      { title: "Book a Basketball Court — CourtTime" },
      {
        name: "description",
        content:
          "Search indoor and outdoor basketball courts by location, surface and price, check ratings and reserve an open time slot instantly.",
      },
      { property: "og:title", content: "Book a Basketball Court — CourtTime" },
      {
        property: "og:description",
        content: "Find and reserve rated indoor and outdoor basketball courts near you.",
      },
    ],
  }),
  component: Courts,
});

type Court = {
  id: string;
  name: string;
  city: string;
  type: "Indoor" | "Outdoor";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  slots: string[];
};

const courts: Court[] = [
  {
    id: "c1",
    name: "Neon Hardwood Arena",
    city: "Brooklyn",
    type: "Indoor",
    price: 42,
    rating: 4.9,
    reviews: 218,
    image: courtIndoor,
    slots: ["17:00", "18:30", "20:00", "21:30"],
  },
  {
    id: "c2",
    name: "Skyline Street Court",
    city: "Queens",
    type: "Outdoor",
    price: 18,
    rating: 4.6,
    reviews: 143,
    image: courtOutdoor,
    slots: ["16:00", "17:30", "19:00"],
  },
  {
    id: "c3",
    name: "Blue Line Training Lab",
    city: "Manhattan",
    type: "Indoor",
    price: 65,
    rating: 4.8,
    reviews: 96,
    image: courtTraining,
    slots: ["07:00", "12:00", "18:00", "20:30"],
  },
  {
    id: "c4",
    name: "Eastside Community Deck",
    city: "Brooklyn",
    type: "Outdoor",
    price: 12,
    rating: 4.3,
    reviews: 311,
    image: courtOutdoor,
    slots: ["15:00", "16:30", "18:00"],
  },
  {
    id: "c5",
    name: "Iron Rim Fieldhouse",
    city: "Queens",
    type: "Indoor",
    price: 35,
    rating: 4.7,
    reviews: 87,
    image: courtIndoor,
    slots: ["09:00", "13:00", "19:30"],
  },
  {
    id: "c6",
    name: "Sunset Glass Court",
    city: "Manhattan",
    type: "Indoor",
    price: 58,
    rating: 4.5,
    reviews: 64,
    image: courtTraining,
    slots: ["08:00", "14:00", "21:00"],
  },
];

function Courts() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState([70]);
  const [selected, setSelected] = useState<Court | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const results = useMemo(
    () =>
      courts.filter(
        (c) =>
          (city === "all" || c.city === city) &&
          (type === "all" || c.type === type) &&
          c.price <= maxPrice[0] &&
          (c.name + c.city).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, city, type, maxPrice],
  );

  function openCourt(court: Court) {
    setSelected(court);
    setSlot(court.slots[0]);
  }

  function confirm() {
    toast.success(`Booked ${selected?.name} at ${slot}`, {
      description: `${selected?.city} · $${selected?.price}/hr`,
    });
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-4xl font-extrabold uppercase">Book a Court</h1>
        <p className="mt-2 text-muted-foreground">
          {results.length} courts available near you tonight.
        </p>

        {/* Filters */}
        <div className="surface-panel mt-8 grid gap-4 rounded-2xl p-5 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-2">
            <Label htmlFor="q">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Court or neighborhood"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                <SelectItem value="Queens">Queens</SelectItem>
                <SelectItem value="Manhattan">Manhattan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Surface</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Indoor & outdoor</SelectItem>
                <SelectItem value="Indoor">Indoor</SelectItem>
                <SelectItem value="Outdoor">Outdoor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Max price · ${maxPrice[0]}/hr</Label>
            <Slider
              value={maxPrice}
              onValueChange={setMaxPrice}
              min={10}
              max={80}
              step={1}
              className="pt-3"
            />
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <Card key={c.id} className="interactive-card surface-panel overflow-hidden pt-0">
              <img
                src={c.image}
                alt={`${c.name} basketball court`}
                width={1024}
                height={768}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold uppercase">{c.name}</h2>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" /> {c.city}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {c.type}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-ember">
                    <Star className="size-4 fill-current" /> {c.rating}
                    <span className="text-muted-foreground">({c.reviews})</span>
                  </span>
                  <span className="font-display text-lg font-bold">${c.price}/hr</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.slots.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Button variant="ember" className="w-full" onClick={() => openCourt(c)}>
                  Reserve
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No courts match those filters. Try widening your price range.
          </p>
        )}
      </main>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display uppercase">Confirm booking</DialogTitle>
            <DialogDescription>
              {selected?.name} · {selected?.city} · ${selected?.price}/hr
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Label>Pick a time slot</Label>
            <div className="flex flex-wrap gap-2">
              {selected?.slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    slot === s
                      ? "border-ember bg-ember/20 text-ember"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-secondary/40 p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">1 hour + AI tracking</span>
                <span className="font-semibold">${(selected?.price ?? 0) + 5}.00</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="glass" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button variant="ember" onClick={confirm}>
              Confirm booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
