import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Crosshair,
  Gauge,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";

import heroImage from "@/assets/hero-court.jpg";
import { SiteHeader } from "@/components/court-time/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CourtTime — AI Basketball Analytics & Court Booking" },
      {
        name: "description",
        content:
          "CourtTime tracks every shot, sprint and jump with AI, then books you the court to train on. Real-time basketball analytics for serious hoopers.",
      },
      { property: "og:title", content: "CourtTime — AI Basketball Analytics & Court Booking" },
      {
        property: "og:description",
        content:
          "AI shot tracking, player speed analytics and instant court reservations in one platform.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Crosshair,
    title: "AI Shot Tracking",
    stat: "98.4% accuracy",
    body: "Computer vision logs every attempt, arc and release angle — no wearables, no manual stat sheets.",
  },
  {
    icon: Gauge,
    title: "Player Speed Analytics",
    stat: "Sprint + load data",
    body: "Top speed, acceleration bursts and fatigue curves mapped across all four quarters.",
  },
  {
    icon: CalendarCheck,
    title: "Court Reservations",
    stat: "1,200+ courts",
    body: "Find indoor and outdoor courts near you, compare pricing and lock a slot in seconds.",
  },
  {
    icon: LineChart,
    title: "Progress Timeline",
    stat: "Game over game",
    body: "Trend lines for accuracy, vertical and minutes so you can see the work paying off.",
  },
  {
    icon: Users,
    title: "Smart Matchmaking",
    stat: "Tier-balanced runs",
    body: "Get matched with players at your tier for pickup games that actually stay competitive.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Venues",
    stat: "Rated by players",
    body: "Every court is reviewed on floor quality, lighting and hoop condition before it lists.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Basketball player dunking under arena lights with AI analytics overlays"
            width={1600}
            height={1008}
            className="absolute inset-0 size-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,transparent,var(--background)_75%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
            <div>
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Live AI tracking in 1,200+ gyms
              </Badge>
              <h1 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
                Every bucket
                <br />
                <span className="text-gradient-ember">measured.</span>
                <br />
                Every run <span className="text-gradient-neon">booked.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                CourtTime turns any court into a lab. AI cameras track your shooting, speed and
                vertical in real time — then find you the floor to train on tonight.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="ember" size="xl">
                  <Link to="/dashboard">
                    Get Started <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="xl">
                  <Link to="/courts">Book a Court</Link>
                </Button>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
                {[
                  { k: "Shots tracked", v: "48M+" },
                  { k: "Active hoopers", v: "210K" },
                  { k: "Avg. booking time", v: "22s" },
                ].map((s) => (
                  <div key={s.k} className="surface-panel rounded-xl px-4 py-3">
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{s.k}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative hidden lg:block">
              <div className="surface-panel glow-neon absolute right-0 top-6 w-full max-w-sm rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Live session</span>
                  <span className="flex items-center gap-2 text-xs text-primary">
                    <span className="size-2 animate-pulse rounded-full bg-primary" /> Tracking
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    { label: "Shot accuracy", value: "64%", w: "64%" },
                    { label: "Top speed", value: "18.4 mph", w: "82%" },
                    { label: "Vertical", value: "34.1 in", w: "71%" },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{m.label}</span>
                        <span className="font-semibold">{m.value}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-[image:var(--gradient-neon)]"
                          style={{ width: m.w }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-ember/10 p-3 text-sm text-ember">
                  <Activity className="size-4" /> Release angle trending +3.2°
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid-court border-y border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-extrabold uppercase">
                Built for players who
                <span className="text-gradient-neon"> chase numbers</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Hover any card to preview what CourtTime captures during a session.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title} className="interactive-card surface-panel group border-border/70">
                  <CardHeader className="gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-ember/15 group-hover:text-ember">
                      <f.icon className="size-5" />
                    </span>
                    <CardTitle className="font-display text-xl uppercase">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary transition-colors group-hover:text-ember">
                      {f.stat}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="surface-panel glow-ember relative overflow-hidden rounded-3xl px-8 py-16 text-center">
            <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
              Your next run starts tonight
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create a free profile, link a court camera and watch your first session break down in
              under five minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="ember" size="xl">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/courts">Book a Court</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CourtTime. Train loud.
      </footer>
    </div>
  );
}
