"use client";

import { SidebarProvider } from "@/components/layout/sidebar-context";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { useSidebar } from "@/components/layout/sidebar-context";

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <TopBar />
      <main
        className="min-h-screen w-full pt-16 transition-[padding-left] duration-300 ease-in-out"
        style={{ paddingLeft: isCollapsed ? 64 : 264 }}
      >
        <div className="px-8 py-8 animate-fade-in-up">{children}</div>
      </main>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </SidebarProvider>
  );
}
