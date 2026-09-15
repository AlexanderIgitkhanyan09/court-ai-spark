import { createFileRoute, Link } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { AppSidebar } from "@/components/court-time/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/matchmaking")({
  head: () => ({
    meta: [
      { title: "Matchmaking — CourtTime" },
      {
        name: "description",
        content:
          "Get matched into tier-balanced pickup runs near you with players at your CourtTime skill level.",
      },
      { property: "og:title", content: "Matchmaking — CourtTime" },
      {
        property: "og:description",
        content: "Tier-balanced pickup runs matched to your CourtTime rating.",
      },
    ],
  }),
  component: Matchmaking,
});

const runs = [
  { name: "Downtown Night Run", tier: "Gold II", players: "8/10", time: "Tonight · 8:00 PM" },
  { name: "Sunrise 3v3 Ladder", tier: "Gold I", players: "5/6", time: "Tomorrow · 7:00 AM" },
  { name: "Westside Competitive 5s", tier: "Platinum", players: "9/10", time: "Thu · 6:30 PM" },
];

function Matchmaking() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 px-4 py-8 sm:px-8">
        <h1 className="font-display text-3xl font-extrabold uppercase">Matchmaking</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Open runs balanced to your Gold II rating.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {runs.map((r) => (
            <Card key={r.name} className="interactive-card surface-panel">
              <CardHeader>
                <Badge variant="outline" className="w-fit border-primary/40 text-primary">
                  {r.tier}
                </Badge>
                <CardTitle className="font-display text-lg uppercase">{r.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{r.time}</p>
                <p className="flex items-center gap-2">
                  <Users className="size-4 text-ember" /> {r.players} players
                </p>
                <Button variant="neon" className="w-full">
                  Join run
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button asChild variant="glass">
            <Link to="/courts">Browse courts instead</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
