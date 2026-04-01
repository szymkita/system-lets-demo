"use client";

import { useState } from "react";
import { AppLayout } from "@/app/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { cn, formatMoney } from "@/lib/utils";
import { mockEstimates } from "@/lib/mock-data";
import { FileText, Plus, Send, CheckCircle2, Clock, Search } from "lucide-react";

const typeLabels: Record<string, string> = { value_based: "Value-based", detailed: "Szczegółowa", hourly: "Godzinowa" };

export default function WycenyPage() {
  const [filter, setFilter] = useState<"all" | "draft" | "sent" | "accepted" | "rejected">("all");
  const [search, setSearch] = useState("");

  const estimates = mockEstimates.filter((e) => {
    if (filter !== "all" && e.status !== filter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalValue = mockEstimates.reduce((s, e) => s + e.totalValue, 0);
  const acceptedValue = mockEstimates.filter((e) => e.status === "accepted").reduce((s, e) => s + e.totalValue, 0);
  const sentCount = mockEstimates.filter((e) => e.status === "sent").length;
  const conversionRate = mockEstimates.length > 0
    ? Math.round((mockEstimates.filter((e) => e.status === "accepted").length / mockEstimates.length) * 100)
    : 0;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Wyceny</h1>
            <p className="mt-1 text-sm text-muted-foreground">Twórz i zarządzaj wycenami projektów</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#5DCA80] px-4 py-2 text-sm font-medium text-white hover:bg-[#4db86e] transition-colors">
            <Plus className="h-4 w-4" /> Nowa wycena
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-[#5DCA80]" /><p className="text-xs font-medium text-muted-foreground">Łączna wartość</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums">{formatMoney(totalValue)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /><p className="text-xs font-medium text-muted-foreground">Zaakceptowane</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums">{formatMoney(acceptedValue)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><Send className="h-3.5 w-3.5 text-sky-500" /><p className="text-xs font-medium text-muted-foreground">Oczekujące</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums">{sentCount}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-violet-500" /><p className="text-xs font-medium text-muted-foreground">Konwersja</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums">{conversionRate}%</p>
          </CardContent></Card>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj wyceny..." className="w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5DCA80]/30 focus:border-[#5DCA80]" />
          </div>
          <div className="flex gap-1">
            {(["all", "draft", "sent", "accepted", "rejected"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-colors", filter === f ? "bg-[#5DCA80]/10 text-[#5DCA80]" : "text-muted-foreground hover:bg-muted")}>
                {f === "all" ? "Wszystkie" : f === "draft" ? "Szkice" : f === "sent" ? "Wysłane" : f === "accepted" ? "Zaakceptowane" : "Odrzucone"}
              </button>
            ))}
          </div>
        </div>

        <Card className="rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Numer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Tytuł</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Klient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Typ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Wartość</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((e) => (
                  <tr key={e._id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{e.number}</td>
                    <td className="px-4 py-3 text-sm font-medium">{e.title}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{e.clientName}</td>
                    <td className="px-4 py-3"><span className="text-xs rounded-full px-2 py-0.5 bg-muted text-muted-foreground font-medium">{typeLabels[e.type]}</span></td>
                    <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                    <td className="px-4 py-3 text-right"><MoneyDisplay amount={e.totalValue} size="sm" /></td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground tabular-nums">{new Date(e.createdAt).toLocaleDateString("pl-PL")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
