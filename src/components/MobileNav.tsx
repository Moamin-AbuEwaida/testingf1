import { NavLink } from "react-router-dom";
import { 
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
  { path: "/teams", label: "Teams", icon: CarFront },
  { path: "/tracks", label: "Tracks", icon: MapPin },
  { path: "/news", label: "News", icon: Newspaper },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050506] border-t border-[#2A2A2E] flex justify-around items-center z-50 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 transition-all duration-200 rounded",
                isActive ? "text-[#FF1801]" : "text-[#666666] hover:text-[#E0E0E0]"
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
