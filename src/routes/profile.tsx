import { createFileRoute } from "@tanstack/react-router";
import { Award, Flame, Medal, Target, Trophy, Zap } from "lucide-react";

import avatar from "@/assets/player-avatar.jpg";
import { AppSidebar } from "@/components/court-time/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Player Profile — CourtTime" },
      {
        name: "description",
        content:
          "View your CourtTime player profile: tier badge, skill attributes, match history with scores and unlocked achievements.",
      },
      { property: "og:title", content: "Player Profile — CourtTime" },
      {
        property: "og:description",
        content: "Tier rank, skill attributes, match history and achievements.",
      },
    ],
  }),
  component: Profile,
});

const attributes = [
  { name: "Shooting", value: 84 },
  { name: "Speed", value: 78 },
  { name: "Vertical", value: 71 },
  { name: "Defense", value: 66 },
  { name: "Playmaking", value: 80 },
  { name: "Stamina", value: 74 },
];

const matches = [
  { opp: "Harbor Hawks", score: "88 – 81", result: "W", line: "24 pts · 7 ast · 5 reb" },
  { opp: "Eastside Kings", score: "72 – 79", result: "L", line: "18 pts · 4 ast · 6 reb" },
  { opp: "Skyline Runners", score: "94 – 70", result: "W", line: "31 pts · 9 ast · 3 reb" },
  { opp: "Iron Rim Crew", score: "65 – 68", result: "L", line: "12 pts · 6 ast · 8 reb" },
  { opp: "Neon Vipers", score: "101 – 96", result: "W", line: "27 pts · 5 ast · 4 reb" },
];

const achievements = [
  { icon: Trophy, title: "Season MVP", note: "Spring league 2026" },
  { icon: Target, title: "Sniper", note: "50 threes in 10 games" },
  { icon: Zap, title: "Speed Demon", note: "Hit 18+ mph" },
  { icon: Medal, title: "Iron Man", note: "30 sessions logged" },
  { icon: Flame, title: "Hot Streak", note: "5 wins in a row" },
  { icon: Award, title: "Gold Tier", note: "Reached Gold II" },
];

function Profile() {
  const overall = Math.round(attributes.reduce((s, a) => s + a.value, 0) / attributes.length);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
        {/* Header card */}
        <Card className="surface-panel glow-neon overflow-hidden">
          <CardContent className="flex flex-wrap items-center gap-6 pt-6">
            <img
              src={avatar}
              alt="Marcus Ellison"
              width={640}
              height={640}
              loading="lazy"
              className="size-28 rounded-2xl border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-extrabold uppercase">Marcus Ellison</h1>
                <Badge className="bg-[image:var(--gradient-ember)] text-ember-foreground">
                  Gold II
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Guard · 6'2" · Brooklyn · 142 tracked sessions
              </p>
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <span>
                  <span className="text-muted-foreground">Record </span>
                  <span className="font-semibold">38–17</span>
                </span>
                <span>
                  <span className="text-muted-foreground">PPG </span>
                  <span className="font-semibold">22.4</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Region rank </span>
                  <span className="font-semibold text-ember">#128</span>
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-5xl font-extrabold text-gradient-neon">{overall}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Overall</p>
              <Button variant="glass" size="sm" className="mt-3">
                Share profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
          {/* Attributes */}
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle className="font-display uppercase">Skill Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {attributes.map((a) => (
                <div key={a.name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{a.name}</span>
                    <span className="font-semibold">{a.value}</span>
                  </div>
                  <Progress value={a.value} className="mt-2 h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Match history */}
          <Card className="surface-panel">
            <CardHeader>
              <CardTitle className="font-display uppercase">Match History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {matches.map((m) => (
                <div
                  key={m.opp}
                  className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-9 place-items-center rounded-lg font-display font-bold ${
                        m.result === "W"
                          ? "bg-success/15 text-success"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {m.result}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">vs {m.opp}</p>
                      <p className="text-xs text-muted-foreground">{m.line}</p>
                    </div>
                  </div>
                  <span className="font-display text-lg font-bold">{m.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="surface-panel mt-6">
          <CardHeader>
            <CardTitle className="font-display uppercase">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="interactive-card flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-ember/15 text-ember">
                  <a.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.note}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
