"use client";

import { AppLayout } from "@/app/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, Users, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ustawienia</h1>
          <p className="mt-1 text-sm text-muted-foreground">Konfiguracja systemu i uprawnień</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5DCA80]/10">
                  <Settings className="h-5 w-5 text-[#5DCA80]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Ogólne</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Nazwa firmy, waluta, stawki domyślne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
                  <Shield className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Role i uprawnienia</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Zarządzaj rolami RBAC</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
                  <Users className="h-5 w-5 text-sky-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Grupy uprawnień</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Definiuj grupy uprawnień</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Key className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Nadpisania użytkowników</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Indywidualne nadpisania uprawnień</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
