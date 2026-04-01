"use client";

import { useSidebar } from "@/components/layout/sidebar-context";
import { cn } from "@/lib/utils";
import { Search, Bell, Star, Timer, Zap } from "lucide-react";

export function TopBar() {
  const { isCollapsed } = useSidebar();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-20 flex h-16 items-center justify-between border-b border-[#e5e7eb] bg-[#f8faf9]/80 backdrop-blur-sm px-8 transition-[left] duration-300 ease-in-out",
        isCollapsed ? "left-16" : "left-[264px]"
      )}
    >
      {/* Search trigger */}
      <button className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#6b7280] hover:border-[#d1d5db] hover:text-[#111827] transition-colors w-full max-w-sm">
        <Search className="h-4 w-4 shrink-0" />
        <span>Szukaj...</span>
        <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-[#f3f4f6] px-1.5 font-mono text-[10px] font-medium text-[#6b7280] sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Right side actions */}
      <div className="flex items-center gap-1 ml-4">
        {/* Timer indicator */}
        <button className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#5DCA80] bg-[#5DCA80]/10 hover:bg-[#5DCA80]/15 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DCA80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5DCA80]" />
          </span>
          <Timer className="h-3.5 w-3.5" />
          <span className="tabular-nums">2:15:32</span>
        </button>

        {/* Favorites */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors">
          <Star className="h-4 w-4" />
        </button>

        {/* Quick tasks */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors">
          <Zap className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#ef4444]" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#e5e7eb]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5DCA80]/15 text-[#5DCA80] text-xs font-semibold">
            S
          </div>
        </div>
      </div>
    </header>
  );
}
