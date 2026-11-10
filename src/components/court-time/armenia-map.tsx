import { regions, type RegionId } from "@/lib/armenia";

export function ArmeniaMap({ active, onSelect }: { active: RegionId; onSelect: (id: RegionId) => void }) {
  return (
    <svg viewBox="0 0 290 400" className="mx-auto h-full max-h-[420px] w-full" role="group" aria-label="Map of Armenia">
      {regions.map((r) => {
        const on = r.id === active;
        return (
          <polygon
            key={r.id}
            points={r.points}
            role="button"
            tabIndex={0}
            aria-label={r.name}
            onClick={() => onSelect(r.id)}
            onMouseEnter={() => onSelect(r.id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(r.id)}
            className={`cursor-pointer stroke-background outline-none transition-colors ${
              on ? "fill-ember" : "fill-primary/25 hover:fill-primary/50 focus:fill-primary/50"
            }`}
            strokeWidth={2}
            strokeLinejoin="round"
          >
            <title>{r.name}</title>
          </polygon>
        );
      })}
    </svg>
  );
}
