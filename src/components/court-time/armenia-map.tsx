import { regions, type RegionId } from "@/lib/armenia";
import shapes from "@/lib/armenia-map-shapes.json";

export function ArmeniaMap({ active, onSelect }: { active: RegionId; onSelect: (id: RegionId) => void }) {
  return (
    <svg viewBox="40 40 940 940" className="mx-auto h-full max-h-[420px] w-full" role="group" aria-label="Map of Armenia">
      {regions.map((r) => {
        const on = r.id === active;
        const shape = shapes.find((s) => s.id === r.id);
        if (!shape) return null;
        return (
          <path
            key={r.id}
            d={shape.d}
            role="button"
            tabIndex={0}
            aria-label={r.name}
            aria-pressed={on}
            onClick={() => onSelect(r.id)}
            onMouseEnter={() => onSelect(r.id)}
            onFocus={() => onSelect(r.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(r.id);
              }
            }}
            className={`cursor-pointer stroke-background outline-none transition-colors motion-reduce:transition-none ${
              on ? "fill-ember" : "fill-primary/25 hover:fill-primary/50 focus:fill-primary/50"
            }`}
            strokeWidth={2}
            strokeLinejoin="round"
          >
            <title>{r.name}</title>
          </path>
        );
      })}
      <g className="pointer-events-none" aria-hidden="true">
        {regions.map((r) => {
          const shape = shapes.find((s) => s.id === r.id);
          if (!shape) return null;
          return (
            <text
              key={r.id}
              x={shape.x}
              y={shape.y}
              textAnchor="middle"
              dominantBaseline="middle"
              paintOrder="stroke"
              strokeWidth={3}
              strokeLinejoin="round"
              className={`fill-foreground font-sans font-semibold ${r.id === "yerevan" ? "text-[12px]" : "text-[15px]"} ${active === r.id ? "stroke-ember" : "stroke-background"}`}
            >
              {r.name}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
