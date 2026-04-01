"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { cn, formatMoney } from "@/lib/utils";
import { mockBillingEvents } from "@/lib/mock-data";
import { Receipt, CheckCircle, FileText, Clock, AlertCircle } from "lucide-react";

export default function BillingPage() {
  const paid = mockBillingEvents.filter((b) => b.status === "paid");
  const invoiced = mockBillingEvents.filter((b) => b.status === "invoiced");
  const ready = mockBillingEvents.filter((b) => b.status === "ready");
  const pending = mockBillingEvents.filter((b) => b.status === "pending");

  const totalPaid = paid.reduce((s, b) => s + b.amount, 0);
  const totalInvoiced = invoiced.reduce((s, b) => s + b.amount, 0);
  const totalReady = ready.reduce((s, b) => s + b.amount, 0);
  const totalPending = pending.reduce((s, b) => s + b.amount, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Rozliczenia</h1>
          <p className="mt-1 text-sm text-muted-foreground">Przegląd faktur i płatności</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /><p className="text-xs font-medium text-muted-foreground">Opłacone</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums text-emerald-600">{formatMoney(totalPaid)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-blue-500" /><p className="text-xs font-medium text-muted-foreground">Zafakturowane</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums text-blue-600">{formatMoney(totalInvoiced)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-amber-500" /><p className="text-xs font-medium text-muted-foreground">Do fakturowania</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums text-amber-600">{formatMoney(totalReady)}</p>
          </CardContent></Card>
          <Card className="rounded-xl py-0"><CardContent className="p-4">
            <div className="flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-gray-500" /><p className="text-xs font-medium text-muted-foreground">Oczekujące</p></div>
            <p className="mt-1 text-xl font-bold tabular-nums">{formatMoney(totalPending)}</p>
          </CardContent></Card>
        </div>

        {/* Billing Pipeline */}
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Receipt className="h-4 w-4 text-[#5DCA80]" />
              Pipeline rozliczeń
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-3 rounded-full overflow-hidden bg-muted mb-4">
              <div className="h-full bg-emerald-500" style={{ width: `${(totalPaid / (totalPaid + totalInvoiced + totalReady + totalPending)) * 100}%` }} title="Opłacone" />
              <div className="h-full bg-blue-500" style={{ width: `${(totalInvoiced / (totalPaid + totalInvoiced + totalReady + totalPending)) * 100}%` }} title="Zafakturowane" />
              <div className="h-full bg-amber-400" style={{ width: `${(totalReady / (totalPaid + totalInvoiced + totalReady + totalPending)) * 100}%` }} title="Do fakturowania" />
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Opłacone</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" />Zafakturowane</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" />Do fakturowania</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-300" />Oczekujące</span>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card className="rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Projekt</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Faktura</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Kwota</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {mockBillingEvents.map((b) => (
                  <tr key={b._id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{b.projectName}</td>
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{b.invoiceNumber ?? "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3 text-right"><MoneyDisplay amount={b.amount} size="sm" /></td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground tabular-nums">{b.date}</td>
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
