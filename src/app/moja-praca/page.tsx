"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatMinutes } from "@/lib/utils";
import { mockWorkTasks, mockTimeEntries, mockDashboardKpi } from "@/lib/mock-data";
import { CheckSquare, Clock, Plus, GripVertical } from "lucide-react";

const priorityConfig: Record<string, { label: string; color: string }> = {
  urgent: { label: "Pilne", color: "#ef4444" },
  high: { label: "Wysoki", color: "#f97316" },
  medium: { label: "Średni", color: "#f59e0b" },
  low: { label: "Niski", color: "#6b7280" },
};

const columns = [
  { id: "todo", label: "Do zrobienia", color: "#6b7280" },
  { id: "in_progress", label: "W toku", color: "#f59e0b" },
  { id: "done", label: "Gotowe", color: "#10b981" },
];

const kanbanTasks = [
  ...mockWorkTasks,
  { _id: "wt5", title: "Przygotować prezentację sprintu", priority: "low", statusCategory: "done", statusName: "Gotowe", statusColor: "#10b981", projectName: "Portal Klienta TechCorp" },
  { _id: "wt6", title: "Wdrożyć logowanie OAuth", priority: "high", statusCategory: "todo", statusName: "Do zrobienia", statusColor: "#6b7280", projectName: "System Rezerwacji MediSoft" },
];

export default function MojaPracaPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Moja praca</h1>
            <p className="mt-1 text-sm text-muted-foreground">Zarządzaj swoimi zadaniami i czasem pracy</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium hover:bg-muted/50 transition-colors">
              <Clock className="h-3.5 w-3.5" /> Zaloguj czas
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#5DCA80] px-4 py-2 text-sm font-medium text-white hover:bg-[#4db86e] transition-colors">
              <Plus className="h-4 w-4" /> Nowe zadanie
            </button>
          </div>
        </div>

        {/* Time tracking summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Dziś</p>
            <p className="mt-1 text-xl font-bold tabular-nums">{formatMinutes(mockDashboardKpi.todayMinutes)}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-[#5DCA80]" style={{ width: `${Math.min((mockDashboardKpi.todayMinutes / (mockDashboardKpi.todayAllocatedHours * 60)) * 100, 100)}%` }} />
            </div>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Tydzień</p>
            <p className="mt-1 text-xl font-bold tabular-nums">{formatMinutes(mockDashboardKpi.weekMinutes)}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-[#0ea5e9]" style={{ width: `${Math.min((mockDashboardKpi.weekMinutes / (40 * 60)) * 100, 100)}%` }} />
            </div>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Miesiąc</p>
            <p className="mt-1 text-xl font-bold tabular-nums">{formatMinutes(mockDashboardKpi.monthMinutes)}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-[#8b5cf6]" style={{ width: `${Math.min((mockDashboardKpi.monthMinutes / (160 * 60)) * 100, 100)}%` }} />
            </div>
          </CardContent></Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-3 gap-4">
          {columns.map((col) => {
            const tasks = kanbanTasks.filter((t) => t.statusCategory === col.id);
            return (
              <div key={col.id}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{col.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{tasks.length}</span>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {tasks.map((t) => {
                    const prio = priorityConfig[t.priority] ?? priorityConfig.medium;
                    return (
                      <Card key={t._id} className="rounded-xl cursor-grab hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground/30 mt-0.5 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">{t.title}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] text-muted-foreground">{t.projectName}</span>
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: prio.color }} title={prio.label} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
