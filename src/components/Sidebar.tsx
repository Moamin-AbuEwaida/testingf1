import { NavLink } from "react-router-dom";
import { 
  Activity, 
  Users, 
  CarFront, 
  MapPin, 
  Newspaper,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard },
  { path: "/drivers", label: "Drivers", icon: Users },
  { path: "/teams", label: "Teams & Cars", icon: CarFront },
  { path: "/tracks", label: "Tracks", icon: MapPin },
  { path: "/news", label: "News", icon: Newspaper },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-[#050506] border-r border-[#2A2A2E] text-[#666666] flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <Activity className="w-8 h-8 text-[#FF1801]" />
        <h1 className="text-xl font-bold tracking-wider text-[#E0E0E0]">F1 TELEMETRY</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 py-3 transition-all duration-200 rounded",
                  "hover:text-[#E0E0E0]",
                  isActive ? "text-[#E0E0E0] border-l-4 border-[#FF1801] pl-3 pr-4 bg-[#141416]" : "text-[#666666] px-4"
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-6 mt-auto">
        <div className="bg-[#141416] rounded p-4 border border-[#2A2A2E]">
          <p className="text-[10px] text-[#666666] uppercase tracking-wider mb-2">Live Status</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4CAF50]"></span>
            </span>
            <span className="text-xs font-medium text-[#E0E0E0]">Connecting...</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
