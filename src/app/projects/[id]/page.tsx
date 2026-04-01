"use client";

import { use } from "react";
import Link from "next/link";
import { AppLayout } from "@/app/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { cn, formatMoney } from "@/lib/utils";
import { mockProjects } from "@/lib/mock-data";
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  CheckCircle2,
  Code,
  Clock,
  Receipt,
  FileText,
  Settings,
  Activity,
  BarChart3,
  CalendarRange,
  BookOpen,
  Layers,
  Target,
} from "lucide-react";

const tabs = [
  { id: "kokpit", label: "Kokpit", icon: Target },
  { id: "struktura", label: "Struktura", icon: Layers },
  { id: "przeglad", label: "Przegląd", icon: BarChart3 },
  { id: "wycena", label: "Wycena", icon: FileText },
  { id: "rozliczenia", label: "Rozliczenia", icon: Receipt },
  { id: "planowanie", label: "Planowanie", icon: CalendarRange },
  { id: "dokumentacja", label: "Dokumentacja", icon: BookOpen },
  { id: "aktywnosc", label: "Aktywność", icon: Activity },
  { id: "ustawienia", label: "Ustawienia", icon: Settings },
];

// Mock increments/modules/functions for this project
const mockIncrements = [
  {
    _id: "inc1", name: "MVP — Moduł podstawowy", sortOrder: 1,
    modules: [
      {
        _id: "mod1", name: "Użytkownicy", sortOrder: 1,
        functions: [
          { _id: "fn1", code: "TC-F001", name: "Rejestracja użytkownika", status: "completed" as const, priceFixed: 350000 },
          { _id: "fn2", code: "TC-F002", name: "Panel użytkownika", status: "in_progress" as const, priceFixed: 500000 },
          { _id: "fn3", code: "TC-F003", name: "Zarządzanie profilem", status: "planned" as const, priceFixed: 280000 },
        ],
      },
      {
        _id: "mod2", name: "Komunikacja", sortOrder: 2,
        functions: [
          { _id: "fn4", code: "TC-F004", name: "Powiadomienia email", status: "in_progress" as const, priceFixed: 420000 },
          { _id: "fn5", code: "TC-F005", name: "Powiadomienia push", status: "planned" as const, priceFixed: 380000 },
        ],
      },
    ],
  },
  {
    _id: "inc2", name: "Inkrement 2 — Raporty", sortOrder: 2,
    modules: [
      {
        _id: "mod3", name: "Raporty", sortOrder: 1,
        functions: [
          { _id: "fn6", code: "TC-F010", name: "Export do PDF", status: "completed" as const, priceFixed: 450000 },
          { _id: "fn7", code: "TC-F011", name: "Dashboard analityczny", status: "testing" as const, priceFixed: 650000 },
          { _id: "fn8", code: "TC-F012", name: "Raporty okresowe", status: "in_progress" as const, priceFixed: 520000 },
        ],
      },
    ],
  },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = mockProjects.find((p) => p._id === id) ?? mockProjects[0];
  const margin = project.totalCost > 0 ? Math.round(((project.totalValue - project.totalCost) / project.totalValue) * 100) : 0;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Back + Header */}
        <div>
          <Link href="/projects" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3">
            <ArrowLeft className="h-3 w-3" /> Powrót do projektów
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
                <StatusBadge status={project.status} />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{project.clientName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Wartość projektu</p>
            <p className="mt-1 text-lg font-bold tabular-nums">{formatMoney(project.totalValue)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Koszt wewnętrzny</p>
            <p className="mt-1 text-lg font-bold tabular-nums">{formatMoney(project.totalCost)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Marża</p>
            <p className={cn("mt-1 text-lg font-bold tabular-nums", margin >= 40 ? "text-emerald-600" : margin >= 20 ? "text-amber-600" : "text-red-600")}>{margin}%</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Postęp</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg font-bold tabular-nums">{Math.round(project.progress * 100)}%</span>
              <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-[#5DCA80]" style={{ width: `${project.progress * 100}%` }} />
              </div>
            </div>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Funkcje</p>
            <p className="mt-1 text-lg font-bold tabular-nums">
              <span className="text-emerald-600">{project.functionsCompleted}</span>
              <span className="text-muted-foreground font-normal">/{project.functionsTotal}</span>
            </p>
          </CardContent></Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto pb-0">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap",
                i === 0 ? "border-[#5DCA80] text-[#5DCA80]" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Kokpit Tab Content — Structure View */}
        <div className="space-y-4">
          {mockIncrements.map((inc) => (
            <Card key={inc._id} className="rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{inc.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inc.modules.map((mod) => (
                    <div key={mod._id}>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{mod.name}</h4>
                      <div className="space-y-1">
                        {mod.functions.map((fn) => (
                          <div key={fn._id} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                            <span className="text-[10px] font-mono text-muted-foreground bg-muted rounded px-1.5 py-0.5 shrink-0">{fn.code}</span>
                            <span className="text-sm font-medium flex-1">{fn.name}</span>
                            <MoneyDisplay amount={fn.priceFixed} size="sm" className="text-muted-foreground" />
                            <StatusBadge status={fn.status} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
