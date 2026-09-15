import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Crosshair, Gauge, MoveUp, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppSidebar } from "@/components/court-time/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Player Analytics Dashboard — CourtTime" },
      {
        name: "description",
        content:
          "Track shot accuracy, max speed, vertical jump, shooting heatmaps and game-by-game performance trends in the CourtTime dashboard.",
      },
      { property: "og:title", content: "Player Analytics Dashboard — CourtTime" },
      {
        property: "og:description",
        content: "AI-powered basketball metrics, shooting heatmap and performance trends.",
      },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  { label: "Shot Accuracy", value: "64.2%", delta: "+4.1%", icon: Crosshair, hint: "Last 5 games" },
  { label: "Max Speed", value: "18.4 mph", delta: "+0.6", icon: Gauge, hint: "Season best" },
  { label: "Vertical Jump", value: "34.1 in", delta: "+1.3", icon: MoveUp, hint: "Measured Tue" },
  { label: "Efficiency", value: "21.8 PER", delta: "+2.4", icon: TrendingUp, hint: "Rolling avg" },
];

const trend = [
  { game: "G1", accuracy: 48, speed: 15.9 },
  { game: "G2", accuracy: 54, speed: 16.4 },
  { game: "G3", accuracy: 51, speed: 16.1 },
  { game: "G4", accuracy: 59, speed: 17.2 },
  { game: "G5", accuracy: 62, speed: 17.8 },
  { game: "G6", accuracy: 58, speed: 18.0 },
  { game: "G7", accuracy: 66, speed: 18.4 },
];

type Zone = { id: string; label: string; x: number; y: number; pct: number; att: number };

const zones: Zone[] = [
  { id: "z1", label: "Left corner 3", x: 10, y: 80, pct: 41, att: 58 },
  { id: "z2", label: "Right corner 3", x: 90, y: 80, pct: 38, att: 44 },
  { id: "z3", label: "Left wing 3", x: 20, y: 44, pct: 35, att: 71 },
  { id: "z4", label: "Right wing 3", x: 80, y: 44, pct: 44, att: 66 },
  { id: "z5", label: "Top of key", x: 50, y: 34, pct: 39, att: 92 },
  { id: "z6", label: "Left elbow", x: 33, y: 62, pct: 52, att: 48 },
  { id: "z7", label: "Right elbow", x: 67, y: 62, pct: 49, att: 53 },
  { id: "z8", label: "Paint", x: 50, y: 74, pct: 71, att: 140 },
  { id: "z9", label: "Restricted", x: 50, y: 87, pct: 79, att: 168 },
];

function zoneColor(pct: number) {
  if (pct >= 65) return "bg-ember/70 border-ember";
  if (pct >= 45) return "bg-ember/35 border-ember/60";
  return "bg-primary/35 border-primary/60";
}

function Dashboard() {
  const [active, setActive] = useState<Zone>(zones[8]);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold uppercase">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Marcus Ellison · Guard · last session 2 days ago
            </p>
          </div>
          <Badge variant="outline" className="border-ember/50 bg-ember/10 text-ember">
            Gold II · Top 8% in region
          </Badge>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label} className="interactive-card surface-panel">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {m.label}
                </CardTitle>
                <m.icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-success">{m.delta}</span> · {m.hint}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          {/* Heatmap */}
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle className="font-display uppercase">Shooting Heatmap</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tap a zone to inspect attempts and conversion.
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-surface)] grid-court">
                {/* court markings */}
                <div className="absolute inset-x-[8%] bottom-0 top-[6%] rounded-t-[50%/22%] border-2 border-border/70" />
                <div className="absolute bottom-0 left-1/2 h-[42%] w-[26%] -translate-x-1/2 border-2 border-b-0 border-border/70" />
                <div className="absolute bottom-[42%] left-1/2 size-[15%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border/70" />
                <div className="absolute bottom-[6%] left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-ember" />

                {zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setActive(z)}
                    aria-label={`${z.label}, ${z.pct}%`}
                    style={{ left: `${z.x}%`, top: `${z.y}%` }}
                    className={`absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-xs font-bold transition-transform hover:scale-110 ${zoneColor(
                      z.pct,
                    )} ${active.id === z.id ? "ring-2 ring-ring" : ""}`}
                  >
                    {z.pct}%
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                <div>
                  <p className="font-display text-sm font-bold uppercase">{active.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((active.att * active.pct) / 100)} made / {active.att} attempts
                  </p>
                </div>
                <p className="font-display text-2xl font-bold text-ember">{active.pct}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Trend chart */}
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle className="font-display uppercase">Performance Trend</CardTitle>
              <p className="text-sm text-muted-foreground">Accuracy and top speed, last 7 games.</p>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                    <XAxis dataKey="game" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        color: "var(--popover-foreground)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="var(--chart-1)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="Accuracy %"
                    />
                    <Line
                      type="monotone"
                      dataKey="speed"
                      stroke="var(--chart-2)"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="Top speed (mph)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
