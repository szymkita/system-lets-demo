"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn, formatMoney, formatMinutes } from "@/lib/utils";
import {
  mockDashboardKpi,
  mockMyFunctions,
  mockActivityTrend,
  mockActivities,
  mockTimeEntries,
  mockWorkTasks,
  mockProjectTasks,
  mockAllocations,
  mockVacations,
} from "@/lib/mock-data";
import {
  Code,
  CheckCircle,
  Zap,
  FolderKanban,
  Clock,
  Flame,
  BarChart3,
  Activity,
  GitCommit,
  FileEdit,
  Terminal,
  StickyNote,
  ListTodo,
  Palmtree,
  GitBranch,
  RotateCcw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const DAY_NAMES = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
const MONTH_NAMES = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

const typeIcons: Record<string, { icon: typeof GitCommit; color: string }> = {
  commit: { icon: GitCommit, color: "#5DCA80" },
  code_change: { icon: Code, color: "#0ea5e9" },
  file_edit: { icon: FileEdit, color: "#f59e0b" },
  command: { icon: Terminal, color: "#8b5cf6" },
  note: { icon: StickyNote, color: "#6b7280" },
};

const ROLE_LABELS: Record<string, string> = {
  pm: "PM", delivery: "Development", analysis: "Analiza", testing: "Testowanie", deployment: "Wdrożenie",
};
const SOURCE_LABELS: Record<string, string> = { timer: "Timer", manual: "Ręcznie", ai_tracked: "AI" };

const priorityConfig: Record<string, { label: string; color: string }> = {
  urgent: { label: "Pilne", color: "#ef4444" },
  high: { label: "Wysoki", color: "#f97316" },
  medium: { label: "Średni", color: "#f59e0b" },
  low: { label: "Niski", color: "#6b7280" },
};

const vacationTypeConfig: Record<string, { label: string; bg: string; text: string }> = {
  vacation: { label: "Urlop", bg: "#ecfdf5", text: "#047857" },
  sick: { label: "Chorobowe", bg: "#fef2f2", text: "#b91c1c" },
  personal: { label: "Osobiste", bg: "#eff6ff", text: "#1d4ed8" },
  other: { label: "Inne", bg: "#f3f4f6", text: "#4b5563" },
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "teraz";
  if (mins < 60) return `${mins}min temu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h temu`;
  return `${Math.floor(hours / 24)}d temu`;
}

function formatDateRange(start: string, end: string): string {
  const months = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
  const s = new Date(start);
  const e = new Date(end);
  if (start === end) return `${s.getDate()} ${months[s.getMonth()]}`;
  if (s.getMonth() === e.getMonth()) return `${s.getDate()}–${e.getDate()} ${months[s.getMonth()]}`;
  return `${s.getDate()} ${months[s.getMonth()]} – ${e.getDate()} ${months[e.getMonth()]}`;
}

export default function DashboardPage() {
  const kpi = mockDashboardKpi;
  const now = new Date();
  const dayName = DAY_NAMES[now.getDay()];
  const dateStr = `${now.getDate()} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
  const maxVal = Math.max(...kpi.dailyCompletions, 1);

  const statusCounts = {
    planned: mockMyFunctions.filter((f) => f.status === "planned").length,
    in_progress: mockMyFunctions.filter((f) => f.status === "in_progress").length,
    testing: mockMyFunctions.filter((f) => f.status === "testing").length,
    completed: mockMyFunctions.filter((f) => f.status === "completed").length,
  };
  const activeFunctions = mockMyFunctions.filter((f) => f.status !== "completed");

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dzień dobry, Szymon!</h1>
            <p className="mt-1 text-sm text-muted-foreground capitalize">{dayName}, {dateStr}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip>{kpi.functionsInProgress} funkcje w toku</Chip>
              {kpi.functionsTesting > 0 && <Chip>{kpi.functionsTesting} w testach</Chip>}
              <Chip>{kpi.todayActivityCount} aktywności dziś</Chip>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium hover:bg-muted/50 transition-colors">
              <Clock className="h-3.5 w-3.5" /> Zaloguj czas
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium hover:bg-muted/50 transition-colors">
              <Palmtree className="h-3.5 w-3.5" /> Zgłoś urlop
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KpiCard icon={<Code className="h-3.5 w-3.5" />} iconColor="#f59e0b" label="Funkcje w toku" value={String(kpi.functionsInProgress)} />
          <KpiCard icon={<CheckCircle className="h-3.5 w-3.5" />} iconColor="#5DCA80" label="Ukończone" value={String(kpi.functionsCompleted)} sub={`z ${kpi.totalFunctions}`} />
          <KpiCard icon={<Zap className="h-3.5 w-3.5" />} iconColor="#8b5cf6" label="Aktywność dziś" value={String(kpi.todayActivityCount)} />
          <KpiCard icon={<FolderKanban className="h-3.5 w-3.5" />} iconColor="#0ea5e9" label="Aktywne projekty" value={String(kpi.activeProjectCount)} />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Col 1: Functions + Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Functions */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Code className="h-4 w-4 text-amber-500" />
                  Moje funkcje
                  <span className="ml-auto text-xs font-normal text-muted-foreground">{mockMyFunctions.length} łącznie</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4">
                  <PipelineChip label="Zaplanowane" count={statusCounts.planned} color="#9ca3af" />
                  <PipelineChip label="W toku" count={statusCounts.in_progress} color="#f59e0b" />
                  <PipelineChip label="Testy" count={statusCounts.testing} color="#8b5cf6" />
                  <PipelineChip label="Gotowe" count={statusCounts.completed} color="#10b981" />
                </div>
                {mockMyFunctions.length > 0 && (
                  <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-muted mb-4">
                    {statusCounts.completed > 0 && <div className="h-full bg-emerald-500" style={{ width: `${(statusCounts.completed / mockMyFunctions.length) * 100}%` }} />}
                    {statusCounts.testing > 0 && <div className="h-full bg-violet-500" style={{ width: `${(statusCounts.testing / mockMyFunctions.length) * 100}%` }} />}
                    {statusCounts.in_progress > 0 && <div className="h-full bg-amber-400" style={{ width: `${(statusCounts.in_progress / mockMyFunctions.length) * 100}%` }} />}
                  </div>
                )}
                <div className="space-y-1">
                  {activeFunctions.map((fn) => (
                    <div key={fn._id} className="flex items-center gap-2 rounded-lg px-2.5 py-2 -mx-2.5 hover:bg-muted/50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0 bg-muted rounded px-1 py-0.5">{fn.code}</span>
                          <span className="text-sm font-medium truncate">{fn.name}</span>
                          {(fn.reopenedCount ?? 0) > 0 && (
                            <span className="flex items-center gap-0.5 text-[10px] text-blue-600 font-medium shrink-0">
                              <RotateCcw className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">{fn.projectName}</span>
                          <span className="text-[10px] text-muted-foreground">/</span>
                          <span className="text-[10px] text-muted-foreground">{fn.moduleName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {fn.githubBranch && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5 max-w-[120px]">
                            <GitBranch className="h-2.5 w-2.5 shrink-0" />
                            <span className="truncate">{fn.githubBranch}</span>
                          </span>
                        )}
                        <StatusBadge status={fn.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Chart */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-violet-500" />
                  Aktywność
                  <span className="ml-auto text-[10px] font-normal text-muted-foreground">ostatnie 14 dni</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockActivityTrend} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} vertical={false} />
                      <XAxis dataKey="dayLabel" fontSize={10} tick={{ fill: "#6b7280" }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                      <YAxis fontSize={10} tick={{ fill: "#6b7280" }} tickLine={false} axisLine={false} width={30} />
                      <RechartsTooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                        formatter={(value) => [`${value} aktywności`, "Aktywność"]}
                        labelFormatter={(l) => `Dzień ${l}`}
                      />
                      <Bar dataKey="activityCount" fill="#8b5cf6" radius={[3, 3, 0, 0]} maxBarSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* My Tasks */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ListTodo className="h-4 w-4 text-orange-500" />
                  Moje zadania
                  <span className="ml-auto text-xs font-normal text-muted-foreground">{mockWorkTasks.length + mockProjectTasks.length} aktywnych</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {mockWorkTasks.map((t) => {
                    const prio = priorityConfig[t.priority] ?? priorityConfig.medium;
                    return (
                      <div key={t._id} className="flex items-center gap-2 rounded-lg px-2.5 py-2 -mx-2.5 hover:bg-muted/50 transition-colors">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: prio.color }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm truncate">{t.title}</p>
                          <span className="text-[10px] text-muted-foreground">{t.projectName}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] rounded-full px-2 py-0.5 font-medium" style={{ backgroundColor: t.statusColor ? `${t.statusColor}20` : "#f3f4f6", color: t.statusColor ?? "#6b7280" }}>
                            {t.statusName}
                          </span>
                          {t.dueDate && (
                            <span className="text-[10px] text-muted-foreground tabular-nums">
                              {new Date(t.dueDate).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {mockProjectTasks.map((t) => {
                    const prio = priorityConfig[t.priority] ?? priorityConfig.medium;
                    return (
                      <div key={t._id} className="flex items-center gap-2 rounded-lg px-2.5 py-2 -mx-2.5 hover:bg-muted/50 transition-colors">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: prio.color }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm truncate">{t.title}</p>
                          <span className="text-[10px] text-muted-foreground">{t.projectName} · {t.type}</span>
                        </div>
                        <span className="text-[10px] rounded-full px-2 py-0.5 font-medium bg-muted text-muted-foreground shrink-0">
                          {t.status === "in_progress" ? "W trakcie" : "Do zrobienia"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Col 2: Sidebar cards */}
          <div className="space-y-6">
            {/* Streak */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Seria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tabular-nums tracking-tight text-orange-500">{kpi.streak}</span>
                  <span className="text-sm text-muted-foreground">dni</span>
                </div>
                <div className="mt-4 flex items-end gap-1 h-10">
                  {[...kpi.dailyCompletions].reverse().map((val, i) => (
                    <div key={i} className={cn("flex-1 rounded-sm min-h-[3px] transition-all", val > 0 ? "bg-orange-400" : "bg-muted")} style={{ height: val > 0 ? `${Math.max((val / maxVal) * 100, 20)}%` : "12%" }} />
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground text-center">ostatnie 7 dni roboczych</p>
              </CardContent>
            </Card>

            {/* Time Tracking */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  Czas pracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <ProgressRow label="Dziś" current={kpi.todayMinutes} target={kpi.todayAllocatedHours * 60} />
                  <ProgressRow label="Tydzień" current={kpi.weekMinutes} target={40 * 60} />
                  <ProgressRow label="Miesiąc" current={kpi.monthMinutes} target={160 * 60} />
                </div>
                <div className="space-y-1">
                  {mockTimeEntries.slice(0, 5).map((e) => (
                    <div key={e._id} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 -mx-2.5 hover:bg-muted/50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-medium truncate">{e.description || ROLE_LABELS[e.role]}</span>
                        <span className="text-[10px] text-muted-foreground ml-1.5">{e.projectName}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-muted-foreground">{SOURCE_LABELS[e.source]}</span>
                        <span className="text-xs font-semibold tabular-nums">{formatMinutes(e.durationMinutes)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-violet-500" />
                  Aktywność
                  <span className="ml-auto text-xs font-normal text-muted-foreground">ostatnie</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {mockActivities.map((item) => {
                    const typeConf = typeIcons[item.type] ?? typeIcons.note;
                    const Icon = typeConf.icon;
                    return (
                      <div key={item._id} className="flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 -mx-2.5 hover:bg-muted/50 transition-colors">
                        <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: typeConf.color }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs leading-relaxed line-clamp-2">{item.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-muted-foreground">{item.projectName}</span>
                            <span className="text-[10px] text-muted-foreground">{timeAgo(item.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* My Projects */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-sky-500" />
                  Moje projekty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {mockAllocations.map((a) => (
                    <div key={a._id} className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 -mx-2.5 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium truncate">{a.projectName}</span>
                        <StatusBadge status={a.projectStatus as "active"} />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs tabular-nums text-muted-foreground">{a.hoursPerDay}h/dzień</span>
                        {a.type === "placeholder" && (
                          <span className="text-[10px] text-amber-600 bg-amber-50 rounded px-1.5 py-0.5">wstępna</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vacations */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Palmtree className="h-4 w-4 text-emerald-500" />
                  Nadchodzące urlopy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {mockVacations.map((v) => {
                    const config = vacationTypeConfig[v.type] ?? vacationTypeConfig.other;
                    return (
                      <div key={v._id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap" style={{ backgroundColor: config.bg, color: config.text }}>
                            {config.label}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">{v.memberName}</span>
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap">{formatDateRange(v.startDate, v.endDate)}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{children}</span>;
}

function KpiCard({ icon, iconColor, label, value, sub }: { icon: React.ReactNode; iconColor: string; label: string; value: string; sub?: string }) {
  return (
    <Card className="rounded-xl py-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5">
          <span style={{ color: iconColor }}>{icon}</span>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-xl font-bold tabular-nums tracking-tight">{value}</span>
          {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

function PipelineChip({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-xs text-muted-foreground">{label} <span className="font-semibold text-foreground tabular-nums">{count}</span></span>
    </div>
  );
}

function ProgressRow({ label, current, target }: { label: string; current: number; target: number }) {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const overTarget = target > 0 && current > target;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs tabular-nums">
          <span className={cn("font-semibold", overTarget && "text-amber-600")}>{formatMinutes(current)}</span>
          {target > 0 && <span className="text-muted-foreground"> / {formatMinutes(target)}</span>}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", overTarget ? "bg-amber-400" : "bg-[#5DCA80]")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
