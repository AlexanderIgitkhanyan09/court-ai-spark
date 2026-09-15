import { Link } from "@tanstack/react-router";
import { CalendarCheck, Flame, LayoutDashboard, User, Users } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courts", label: "Bookings", icon: CalendarCheck },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/matchmaking", label: "Matchmaking", icon: Users },
] as const;

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2 py-1">
        <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary glow-neon">
          <Flame className="size-5" />
        </span>
        <span className="font-display text-lg font-extrabold uppercase">
          Court<span className="text-gradient-ember">Time</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeProps={{
              className: "bg-sidebar-accent text-sidebar-accent-foreground glow-neon",
            }}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="surface-panel rounded-xl p-4 text-sm">
        <p className="font-display text-sm font-bold uppercase">Pro Season Pass</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Unlimited AI sessions and priority court slots.
        </p>
      </div>
    </aside>
  );
}
