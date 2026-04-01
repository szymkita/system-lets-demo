"use client";

import { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/app/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { cn, formatMoney } from "@/lib/utils";
import { mockProjects } from "@/lib/mock-data";
import {
  FolderKanban,
  Plus,
  Zap,
  CheckCircle2,
  TrendingUp,
  Search,
} from "lucide-react";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "completed">("all");
  const [search, setSearch] = useState("");

  const projects = mockProjects.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalValue = mockProjects.reduce((s, p) => s + p.totalValue, 0);
  const totalCost = mockProjects.reduce((s, p) => s + p.totalCost, 0);
  const activeCount = mockProjects.filter((p) => p.status === "active").length;
  const avgProgress = mockProjects.filter((p) => p.status === "active").reduce((s, p) => s + p.progress, 0) / Math.max(activeCount, 1);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projekty</h1>
            <p className="mt-1 text-sm text-muted-foreground">Zarządzaj projektami i śledź rentowność</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#5DCA80] px-4 py-2 text-sm font-medium text-white hover:bg-[#4db86e] transition-colors">
            <Plus className="h-4 w-4" /> Nowy projekt
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="rounded-xl py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5">
                <FolderKanban className="h-3.5 w-3.5 text-[#5DCA80]" />
                <p className="text-xs font-medium text-muted-foreground">Aktywne projekty</p>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums">{activeCount}</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <p className="text-xs font-medium text-muted-foreground">Wartość portfela</p>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums">{formatMoney(totalValue)}</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-sky-500" />
                <p className="text-xs font-medium text-muted-foreground">Marża portfela</p>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums">{totalCost > 0 ? Math.round(((totalValue - totalCost) / totalValue) * 100) : 0}%</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-500" />
                <p className="text-xs font-medium text-muted-foreground">Śr. postęp</p>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums">{Math.round(avgProgress * 100)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj projektu..."
              className="w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5DCA80]/30 focus:border-[#5DCA80]"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "active", "draft", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === f ? "bg-[#5DCA80]/10 text-[#5DCA80]" : "text-muted-foreground hover:bg-muted"
                )}
              >
                {f === "all" ? "Wszystkie" : f === "active" ? "Aktywne" : f === "draft" ? "Szkice" : "Ukończone"}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Table */}
        <Card className="rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Projekt</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Klient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Wartość</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Marża</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Postęp</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Funkcje</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const margin = p.totalCost > 0 ? Math.round(((p.totalValue - p.totalCost) / p.totalValue) * 100) : null;
                  return (
                    <tr key={p._id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/projects/${p._id}`} className="text-sm font-medium text-foreground hover:text-[#5DCA80] transition-colors">
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{p.clientName}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-right"><MoneyDisplay amount={p.totalValue} size="sm" /></td>
                      <td className="px-4 py-3 text-right">
                        {margin !== null ? (
                          <span className={cn("text-sm font-semibold tabular-nums", margin >= 40 ? "text-emerald-600" : margin >= 20 ? "text-amber-600" : "text-red-600")}>
                            {margin}%
                          </span>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-[#5DCA80]" style={{ width: `${p.progress * 100}%` }} />
                          </div>
                          <span className="text-xs font-medium tabular-nums text-muted-foreground">{Math.round(p.progress * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm tabular-nums">
                          <span className="font-semibold text-emerald-600">{p.functionsCompleted}</span>
                          <span className="text-muted-foreground">/{p.functionsTotal}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
