import { useState } from "react";
import { players, regionName, type RegionId } from "@/lib/armenia";

export function ArmeniaLeaderboard({ region }: { region: RegionId }) {
  const [mode, setMode] = useState<"national" | "regional">("national");
  const list = players
    .filter((p) => mode === "national" || p.region === region)
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  return (
    <div>
      <div className="mb-4 inline-flex rounded-xl border border-border bg-secondary/40 p-1 text-sm">
        {(["national", "regional"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "national" ? "All-Armenia Leaderboard" : `Regional · ${regionName(region)}`}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-2 pr-2">Rank</th>
              <th className="py-2 pr-2">Player</th>
              <th className="py-2 pr-2">Region</th>
              <th className="py-2 pr-2 text-right">Points</th>
              <th className="py-2 text-right">Games</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={p.name} className="border-t border-border/60">
                <td className={`py-2.5 pr-2 font-display font-bold ${i < 3 ? "text-ember" : ""}`}>#{i + 1}</td>
                <td className="py-2.5 pr-2">
                  <span className="flex items-center gap-2">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      {p.name.split(" ").map((s) => s[0]).join("")}
                    </span>
                    {p.name}
                  </span>
                </td>
                <td className="py-2.5 pr-2 text-muted-foreground">{regionName(p.region)}</td>
                <td className="py-2.5 pr-2 text-right font-semibold">{p.points.toLocaleString("en-US")}</td>
                <td className="py-2.5 text-right text-muted-foreground">{p.games}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="py-6 text-center text-muted-foreground">No ranked players yet.</p>}
      </div>
    </div>
  );
}
