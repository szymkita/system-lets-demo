"use client";

import { useState } from "react";
import { AppLayout } from "@/app/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, Folder, ChevronRight, ChevronDown, Plus, Search } from "lucide-react";

const docTree = [
  {
    _id: "d1", title: "Architektura systemu", type: "folder", children: [
      { _id: "d1a", title: "Przegląd architektury", type: "doc", updatedAt: "2026-03-28" },
      { _id: "d1b", title: "Schemat bazy danych", type: "doc", updatedAt: "2026-03-25" },
      { _id: "d1c", title: "Decyzje architektoniczne (ADR)", type: "doc", updatedAt: "2026-03-20" },
    ],
  },
  {
    _id: "d2", title: "Procesy", type: "folder", children: [
      { _id: "d2a", title: "Onboarding nowego developera", type: "doc", updatedAt: "2026-03-15" },
      { _id: "d2b", title: "Proces wyceny", type: "doc", updatedAt: "2026-03-10" },
      { _id: "d2c", title: "Code review guidelines", type: "doc", updatedAt: "2026-02-28" },
    ],
  },
  {
    _id: "d3", title: "API Reference", type: "folder", children: [
      { _id: "d3a", title: "REST API — Portal Klienta", type: "doc", updatedAt: "2026-03-30" },
      { _id: "d3b", title: "WebSocket Events", type: "doc", updatedAt: "2026-03-22" },
    ],
  },
  { _id: "d4", title: "Notatki ze spotkań", type: "folder", children: [
    { _id: "d4a", title: "Sprint Review — 2026-03-28", type: "doc", updatedAt: "2026-03-28" },
    { _id: "d4b", title: "Planowanie Q2 2026", type: "doc", updatedAt: "2026-03-20" },
  ]},
];

export default function DokumentacjaPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["d1", "d2"]));
  const [selected, setSelected] = useState<string | null>("d1a");

  const toggleFolder = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectedDoc = docTree.flatMap((f) => f.children ?? []).find((d) => d._id === selected);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dokumentacja</h1>
            <p className="mt-1 text-sm text-muted-foreground">Baza wiedzy zespołu</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#5DCA80] px-4 py-2 text-sm font-medium text-white hover:bg-[#4db86e] transition-colors">
            <Plus className="h-4 w-4" /> Nowy dokument
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar tree */}
          <Card className="rounded-xl col-span-1">
            <CardContent className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input placeholder="Szukaj..." className="w-full rounded-lg border border-border bg-muted/30 pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#5DCA80]" />
              </div>
              <div className="space-y-0.5">
                {docTree.map((folder) => (
                  <div key={folder._id}>
                    <button
                      onClick={() => toggleFolder(folder._id)}
                      className="flex items-center gap-1.5 w-full rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      {expanded.has(folder._id) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      <Folder className="h-3.5 w-3.5 text-amber-500" />
                      <span className="truncate">{folder.title}</span>
                    </button>
                    {expanded.has(folder._id) && folder.children?.map((doc) => (
                      <button
                        key={doc._id}
                        onClick={() => setSelected(doc._id)}
                        className={cn(
                          "flex items-center gap-1.5 w-full rounded-lg pl-7 pr-2 py-1.5 text-xs transition-colors",
                          selected === doc._id ? "bg-[#5DCA80]/10 text-[#5DCA80] font-medium" : "text-muted-foreground hover:bg-muted/50"
                        )}
                      >
                        <FileText className="h-3 w-3 shrink-0" />
                        <span className="truncate">{doc.title}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document view */}
          <Card className="rounded-xl col-span-3">
            <CardContent className="p-6">
              {selectedDoc ? (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-[#5DCA80]" />
                    <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">Ostatnia edycja: {selectedDoc.updatedAt}</p>
                  <div className="prose prose-sm max-w-none text-sm text-muted-foreground leading-relaxed space-y-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <h3 className="text-foreground font-semibold text-base">Sekcja 1: Wprowadzenie</h3>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="rounded-lg bg-muted/50 border border-border p-4">
                      <code className="text-xs font-mono text-foreground">// Przykład kodu konfiguracyjnego{"\n"}const config = &#123;{"\n"}  database: &quot;postgresql&quot;,{"\n"}  port: 5432,{"\n"}  maxConnections: 20{"\n"}&#125;</code>
                    </div>
                    <h3 className="text-foreground font-semibold text-base">Sekcja 2: Szczegóły</h3>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mb-3" />
                  <p className="text-sm">Wybierz dokument z listy</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
