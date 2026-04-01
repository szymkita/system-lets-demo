"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { mockTeamMembers } from "@/lib/mock-data";
import { UsersRound, Mail, Plus } from "lucide-react";
import { cn, formatMoney } from "@/lib/utils";

export default function ZespolPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Zespół</h1>
            <p className="mt-1 text-sm text-muted-foreground">Zarządzaj członkami zespołu</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#5DCA80] px-4 py-2 text-sm font-medium text-white hover:bg-[#4db86e] transition-colors">
            <Plus className="h-4 w-4" /> Dodaj osobę
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockTeamMembers.map((m) => (
            <Card key={m._id} className="rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-semibold shrink-0" style={{ backgroundColor: m.color }}>
                    {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate">{m.name}</h3>
                      {m.status === "on_leave" && (
                        <span className="text-[10px] rounded-full px-2 py-0.5 bg-amber-50 text-amber-600 font-medium">Na urlopie</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{m.email}</span>
                    </div>
                    <div className="mt-2 text-xs tabular-nums text-muted-foreground">
                      Stawka: <span className="font-semibold text-foreground">{formatMoney(m.hourlyRate)}</span>/h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
