"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/layout/sidebar-context";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  FolderKanban,
  Building2,
  UsersRound,
  Receipt,
  FileText,
  CalendarRange,
  CheckSquare,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Moja praca", href: "/moja-praca", icon: CheckSquare },
  { name: "Wyceny", href: "/wyceny", icon: FileText },
  { name: "Projekty", href: "/projects", icon: FolderKanban },
  { name: "Planowanie", href: "/planowanie", icon: CalendarRange },
  { name: "Rozliczenia", href: "/billing", icon: Receipt },
  { name: "Klienci", href: "/clients", icon: Building2 },
  { name: "Zespół", href: "/zespol", icon: UsersRound },
  { name: "Dokumentacja", href: "/dokumentacja", icon: BookOpen },
  { name: "Ustawienia", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-[#0f1a14] border-r border-[#1e3a2a] transition-[width] duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-[264px]"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-[#1e3a2a] transition-[padding] duration-300",
          isCollapsed ? "justify-center px-0" : "px-6"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5DCA80]">
            <span className="text-sm font-bold text-white">L</span>
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-white tracking-tight">
              System LETS
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 space-y-1 py-5 transition-[padding] duration-300",
          isCollapsed ? "px-2" : "px-3"
        )}
      >
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const linkElement = (
            <Link
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-150",
                isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                isActive
                  ? "bg-[#5DCA80]/15 text-[#5DCA80]"
                  : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors duration-150",
                  isActive
                    ? "text-[#5DCA80]"
                    : "text-[#64748b] group-hover:text-white"
                )}
              />
              {!isCollapsed && (
                <>
                  <span className="truncate">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#5DCA80]" />
                  )}
                </>
              )}
            </Link>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger render={linkElement} />
                <TooltipContent side="right" sideOffset={8}>
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.name}>{linkElement}</div>;
        })}
      </nav>

      {/* Collapse toggle */}
      <div
        className={cn(
          "border-t border-[#1e3a2a] p-3",
          isCollapsed && "flex justify-center"
        )}
      >
        <button
          onClick={toggle}
          className={cn(
            "flex items-center rounded-lg py-2 text-sm text-[#94a3b8] hover:bg-white/5 hover:text-white transition-colors",
            isCollapsed ? "justify-center px-2" : "gap-2 px-3"
          )}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-[18px] w-[18px]" />
          ) : (
            <>
              <PanelLeftClose className="h-[18px] w-[18px]" />
              <span>Zwiń</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
