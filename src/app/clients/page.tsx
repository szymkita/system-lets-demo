"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { mockClients } from "@/lib/mock-data";
import { Building2, Plus, Mail, FolderKanban } from "lucide-react";

export default function ClientsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Klienci</h1>
            <p className="mt-1 text-sm text-muted-foreground">Zarządzaj bazą klientów</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#5DCA80] px-4 py-2 text-sm font-medium text-white hover:bg-[#4db86e] transition-colors">
            <Plus className="h-4 w-4" /> Nowy klient
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockClients.map((c) => (
            <Card key={c._id} className="rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5DCA80]/10">
                      <Building2 className="h-5 w-5 text-[#5DCA80]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{c.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{c.contactEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {c.notes && <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{c.notes}</p>}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FolderKanban className="h-3 w-3" />
                  <span>{c.projectCount} {c.projectCount === 1 ? "projekt" : "projektów"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
