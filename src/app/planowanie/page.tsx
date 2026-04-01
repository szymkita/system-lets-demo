"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils";
import { mockPlanningMilestones, mockAllocations, mockProjects, mockTeamMembers } from "@/lib/mock-data";
import { CalendarRange, Milestone, Users, FolderKanban, ChevronRight } from "lucide-react";

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  on_track: { bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
  at_risk: { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  delayed: { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
};

const months = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"];

export default function PlanowaniePage() {
  const activeProjects = mockProjects.filter((p) => p.status === "active");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Planowanie</h1>
          <p className="mt-1 text-sm text-muted-foreground">Harmonogram projektów i kamienie milowe</p>
        </div>

        {/* Timeline visualization */}
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-[#5DCA80]" />
              Oś czasu projektów
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Month headers */}
            <div className="flex mb-4">
              <div className="w-48 shrink-0" />
              <div className="flex-1 grid grid-cols-6 gap-0">
                {months.slice(0, 6).map((m) => (
                  <div key={m} className="text-center text-xs font-medium text-muted-foreground border-l border-border/50 py-1">{m}</div>
                ))}
              </div>
            </div>

            {/* Project rows */}
            <div className="space-y-3">
              {activeProjects.map((p) => {
                const milestone = mockPlanningMilestones.find((ms) => ms.projectId === p._id);
                return (
                  <div key={p._id} className="flex items-center">
                    <div className="w-48 shrink-0 pr-4">
                      <span className="text-sm font-medium truncate block">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground">{p.clientName}</span>
                    </div>
                    <div className="flex-1 relative h-8 bg-muted/30 rounded-lg">
                      {/* Progress bar */}
                      <div
                        className="absolute inset-y-0 left-0 rounded-lg bg-[#5DCA80]/20 border border-[#5DCA80]/30"
                        style={{ width: `${Math.min(p.progress * 100, 100)}%` }}
                      >
                        <div className="absolute inset-y-0 left-0 rounded-lg bg-[#5DCA80]/40" style={{ width: `${p.progress * 100}%` }} />
                      </div>
                      {/* Milestone marker */}
                      {milestone && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1"
                          style={{ left: `${Math.min(((new Date(milestone.date).getMonth()) / 6) * 100, 95)}%` }}
                        >
                          <div className={cn("h-3 w-3 rounded-full border-2 border-white shadow-sm", milestone.status === "on_track" ? "bg-emerald-500" : "bg-amber-500")} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Milestone className="h-4 w-4 text-violet-500" />
                Kamienie milowe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPlanningMilestones.map((ms) => {
                  const sc = statusColors[ms.status] ?? statusColors.on_track;
                  return (
                    <div key={ms._id} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 -mx-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: sc.dot }} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{ms.name}</p>
                          <p className="text-[10px] text-muted-foreground">{ms.projectName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: sc.bg, color: sc.text }}>
                          {ms.status === "on_track" ? "Na czas" : ms.status === "at_risk" ? "Zagrożone" : "Opóźnione"}
                        </span>
                        <span className="text-xs tabular-nums text-muted-foreground">{new Date(ms.date).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Team allocation summary */}
          <Card className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-sky-500" />
                Alokacja zespołu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTeamMembers.filter((m) => m.status === "active").slice(0, 5).map((m) => (
                  <div key={m._id} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full text-white text-[10px] font-semibold shrink-0" style={{ backgroundColor: m.color }}>
                      {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium truncate">{m.name}</span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">{Math.floor(Math.random() * 4 + 5)}h/8h</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 40 + 60)}%`, backgroundColor: m.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
