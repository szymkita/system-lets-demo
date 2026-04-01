// ── Mock Data for Demo ──────────────────────────────────────

export const mockUser = {
  name: "Szymon Kita",
  email: "szymon@letsautomate.pl",
  role: "admin",
};

export const mockTeamMembers = [
  { _id: "m1", name: "Szymon Kita", role: "PM / Delivery", email: "szymon@letsautomate.pl", color: "#5DCA80", hourlyRate: 25000, status: "active" },
  { _id: "m2", name: "Anna Kowalska", role: "Full-stack Developer", email: "anna@letsautomate.pl", color: "#8b5cf6", hourlyRate: 20000, status: "active" },
  { _id: "m3", name: "Michał Nowak", role: "Frontend Developer", email: "michal@letsautomate.pl", color: "#0ea5e9", hourlyRate: 18000, status: "active" },
  { _id: "m4", name: "Katarzyna Wiśniewska", role: "QA Engineer", email: "kasia@letsautomate.pl", color: "#f59e0b", hourlyRate: 16000, status: "active" },
  { _id: "m5", name: "Piotr Zieliński", role: "Backend Developer", email: "piotr@letsautomate.pl", color: "#ef4444", hourlyRate: 22000, status: "active" },
  { _id: "m6", name: "Magdalena Lewandowska", role: "UX Designer", email: "magda@letsautomate.pl", color: "#ec4899", hourlyRate: 17000, status: "on_leave" },
];

export const mockClients = [
  { _id: "c1", name: "TechCorp Sp. z o.o.", contactEmail: "kontakt@techcorp.pl", notes: "Klient strategiczny, duże projekty enterprise", projectCount: 3 },
  { _id: "c2", name: "MediSoft S.A.", contactEmail: "biuro@medisoft.pl", notes: "Sektor medyczny, wymaga certyfikacji", projectCount: 2 },
  { _id: "c3", name: "RetailPro Sp. z o.o.", contactEmail: "it@retailpro.pl", notes: "E-commerce i systemy POS", projectCount: 1 },
  { _id: "c4", name: "FinanceHub S.A.", contactEmail: "dev@financehub.pl", notes: "Fintech, wysoki standard bezpieczeństwa", projectCount: 2 },
  { _id: "c5", name: "EduTech Sp. z o.o.", contactEmail: "hello@edutech.pl", notes: "Platforma edukacyjna, startup", projectCount: 1 },
];

export const mockProjects = [
  {
    _id: "p1", name: "Portal Klienta TechCorp", clientId: "c1", clientName: "TechCorp Sp. z o.o.",
    status: "active" as const,
    totalValue: 28500000, totalCost: 15200000, progress: 0.65,
    functionsTotal: 24, functionsCompleted: 16, functionsInProgress: 5, functionsTesting: 3,
    devRate: 20000, pmRate: 25000, analystRate: 22000, testingRate: 16000,
  },
  {
    _id: "p2", name: "System Rezerwacji MediSoft", clientId: "c2", clientName: "MediSoft S.A.",
    status: "active" as const,
    totalValue: 42000000, totalCost: 22800000, progress: 0.38,
    functionsTotal: 36, functionsCompleted: 14, functionsInProgress: 8, functionsTesting: 2,
    devRate: 20000, pmRate: 25000, analystRate: 22000, testingRate: 16000,
  },
  {
    _id: "p3", name: "Aplikacja Mobilna RetailPro", clientId: "c3", clientName: "RetailPro Sp. z o.o.",
    status: "active" as const,
    totalValue: 18500000, totalCost: 9200000, progress: 0.82,
    functionsTotal: 18, functionsCompleted: 15, functionsInProgress: 2, functionsTesting: 1,
    devRate: 18000, pmRate: 25000, analystRate: 22000, testingRate: 16000,
  },
  {
    _id: "p4", name: "Dashboard Analityczny FinanceHub", clientId: "c4", clientName: "FinanceHub S.A.",
    status: "draft" as const,
    totalValue: 35000000, totalCost: 0, progress: 0,
    functionsTotal: 42, functionsCompleted: 0, functionsInProgress: 0, functionsTesting: 0,
    devRate: 22000, pmRate: 25000, analystRate: 22000, testingRate: 16000,
  },
  {
    _id: "p5", name: "Platforma E-learning EduTech", clientId: "c5", clientName: "EduTech Sp. z o.o.",
    status: "completed" as const,
    totalValue: 12000000, totalCost: 6800000, progress: 1.0,
    functionsTotal: 16, functionsCompleted: 16, functionsInProgress: 0, functionsTesting: 0,
    devRate: 18000, pmRate: 25000, analystRate: 22000, testingRate: 16000,
  },
  {
    _id: "p6", name: "API Gateway FinanceHub", clientId: "c4", clientName: "FinanceHub S.A.",
    status: "active" as const,
    totalValue: 22000000, totalCost: 11500000, progress: 0.52,
    functionsTotal: 28, functionsCompleted: 15, functionsInProgress: 6, functionsTesting: 3,
    devRate: 22000, pmRate: 25000, analystRate: 22000, testingRate: 16000,
  },
];

export const mockEstimates = [
  { _id: "e1", number: "WYC-2026-001", title: "Portal Klienta v2", clientName: "TechCorp Sp. z o.o.", status: "accepted" as const, type: "value_based" as const, totalValue: 28500000, createdAt: Date.now() - 86400000 * 45 },
  { _id: "e2", number: "WYC-2026-002", title: "System Rezerwacji", clientName: "MediSoft S.A.", status: "accepted" as const, type: "detailed" as const, totalValue: 42000000, createdAt: Date.now() - 86400000 * 30 },
  { _id: "e3", number: "WYC-2026-003", title: "Moduł Płatności Online", clientName: "RetailPro Sp. z o.o.", status: "sent" as const, type: "value_based" as const, totalValue: 15500000, createdAt: Date.now() - 86400000 * 7 },
  { _id: "e4", number: "WYC-2026-004", title: "Dashboard Analityczny", clientName: "FinanceHub S.A.", status: "draft" as const, type: "detailed" as const, totalValue: 35000000, createdAt: Date.now() - 86400000 * 3 },
  { _id: "e5", number: "WYC-2026-005", title: "Integracja API Bankowe", clientName: "FinanceHub S.A.", status: "sent" as const, type: "hourly" as const, totalValue: 8500000, createdAt: Date.now() - 86400000 * 1 },
  { _id: "e6", number: "WYC-2026-006", title: "Chatbot AI dla Supportu", clientName: "TechCorp Sp. z o.o.", status: "draft" as const, type: "value_based" as const, totalValue: 19000000, createdAt: Date.now() - 86400000 * 2 },
  { _id: "e7", number: "WYC-2025-018", title: "Platforma E-learning", clientName: "EduTech Sp. z o.o.", status: "accepted" as const, type: "detailed" as const, totalValue: 12000000, createdAt: Date.now() - 86400000 * 90 },
  { _id: "e8", number: "WYC-2025-017", title: "Portal HR", clientName: "TechCorp Sp. z o.o.", status: "rejected" as const, type: "value_based" as const, totalValue: 22000000, createdAt: Date.now() - 86400000 * 60 },
];

export const mockBillingEvents = [
  { _id: "b1", projectId: "p1", projectName: "Portal Klienta TechCorp", status: "paid" as const, amount: 8500000, invoiceNumber: "FV/2026/001", date: "2026-01-15" },
  { _id: "b2", projectId: "p1", projectName: "Portal Klienta TechCorp", status: "paid" as const, amount: 6000000, invoiceNumber: "FV/2026/005", date: "2026-02-15" },
  { _id: "b3", projectId: "p2", projectName: "System Rezerwacji MediSoft", status: "invoiced" as const, amount: 12000000, invoiceNumber: "FV/2026/008", date: "2026-03-01" },
  { _id: "b4", projectId: "p2", projectName: "System Rezerwacji MediSoft", status: "paid" as const, amount: 10000000, invoiceNumber: "FV/2026/003", date: "2026-02-01" },
  { _id: "b5", projectId: "p3", projectName: "Aplikacja Mobilna RetailPro", status: "paid" as const, amount: 9000000, invoiceNumber: "FV/2026/004", date: "2026-02-10" },
  { _id: "b6", projectId: "p3", projectName: "Aplikacja Mobilna RetailPro", status: "ready" as const, amount: 5500000, date: "2026-03-20" },
  { _id: "b7", projectId: "p6", projectName: "API Gateway FinanceHub", status: "invoiced" as const, amount: 8000000, invoiceNumber: "FV/2026/009", date: "2026-03-15" },
  { _id: "b8", projectId: "p6", projectName: "API Gateway FinanceHub", status: "pending" as const, amount: 6500000, date: "2026-04-01" },
  { _id: "b9", projectId: "p5", projectName: "Platforma E-learning EduTech", status: "paid" as const, amount: 12000000, invoiceNumber: "FV/2025/042", date: "2025-12-20" },
];

export const mockDashboardKpi = {
  functionsInProgress: 3,
  functionsTesting: 1,
  functionsCompleted: 18,
  totalFunctions: 32,
  todayActivityCount: 7,
  activeProjectCount: 4,
  todayMinutes: 285,
  weekMinutes: 1820,
  monthMinutes: 7340,
  todayAllocatedHours: 8,
  streak: 12,
  dailyCompletions: [3, 1, 4, 2, 5, 2, 3],
  tasksTodo: 6,
};

export const mockMyFunctions = [
  { _id: "f1", name: "Panel użytkownika", code: "TC-F001", status: "in_progress" as const, projectName: "Portal Klienta TechCorp", moduleName: "Użytkownicy", githubBranch: "feat/user-panel", reopenedCount: 0 },
  { _id: "f2", name: "Powiadomienia email", code: "TC-F002", status: "in_progress" as const, projectName: "Portal Klienta TechCorp", moduleName: "Komunikacja", reopenedCount: 1 },
  { _id: "f3", name: "Endpoint rezerwacji", code: "MS-F008", status: "testing" as const, projectName: "System Rezerwacji MediSoft", moduleName: "API", githubBranch: "feat/booking-api", reopenedCount: 0 },
  { _id: "f4", name: "Dashboard analytics", code: "FH-F003", status: "in_progress" as const, projectName: "API Gateway FinanceHub", moduleName: "Monitoring", reopenedCount: 0 },
  { _id: "f5", name: "Walidacja danych wejściowych", code: "MS-F009", status: "planned" as const, projectName: "System Rezerwacji MediSoft", moduleName: "Walidacja", reopenedCount: 0 },
  { _id: "f6", name: "Export do PDF", code: "TC-F012", status: "completed" as const, projectName: "Portal Klienta TechCorp", moduleName: "Raporty", reopenedCount: 0 },
];

export const mockActivityTrend = Array.from({ length: 14 }, (_, i) => ({
  dayLabel: `${14 - i}`,
  activityCount: Math.floor(Math.random() * 12) + 1,
  minutesLogged: Math.floor(Math.random() * 480) + 60,
}));

export const mockActivities = [
  { _id: "a1", type: "commit", description: "feat: dodano panel użytkownika z tabelą danych", projectName: "Portal Klienta TechCorp", timestamp: Date.now() - 1800000 },
  { _id: "a2", type: "code_change", description: "Refaktor serwisu powiadomień — wydzielenie kolejki", projectName: "Portal Klienta TechCorp", timestamp: Date.now() - 7200000 },
  { _id: "a3", type: "commit", description: "fix: poprawka walidacji formularza rezerwacji", projectName: "System Rezerwacji MediSoft", timestamp: Date.now() - 14400000 },
  { _id: "a4", type: "note", description: "Spotkanie z klientem — omówienie zmian w module raportów", projectName: "Portal Klienta TechCorp", timestamp: Date.now() - 28800000 },
  { _id: "a5", type: "code_change", description: "Implementacja middleware autoryzacji dla API Gateway", projectName: "API Gateway FinanceHub", timestamp: Date.now() - 43200000 },
];

export const mockTimeEntries = [
  { _id: "t1", role: "delivery", description: "Implementacja panelu użytkownika", projectName: "Portal Klienta TechCorp", durationMinutes: 120, source: "timer" as const },
  { _id: "t2", role: "pm", description: "Daily standup + planning", projectName: "Portal Klienta TechCorp", durationMinutes: 45, source: "manual" as const },
  { _id: "t3", role: "delivery", description: "Code review — moduł rezerwacji", projectName: "System Rezerwacji MediSoft", durationMinutes: 60, source: "timer" as const },
  { _id: "t4", role: "analysis", description: "Analiza wymagań dashboard", projectName: "API Gateway FinanceHub", durationMinutes: 90, source: "manual" as const },
  { _id: "t5", role: "delivery", description: "Testy integracyjne API", projectName: "API Gateway FinanceHub", durationMinutes: 75, source: "timer" as const },
];

export const mockWorkTasks = [
  { _id: "wt1", title: "Dokończyć panel użytkownika", priority: "high", statusCategory: "in_progress", statusName: "W toku", statusColor: "#f59e0b", projectName: "Portal Klienta TechCorp", dueDate: "2026-04-05" },
  { _id: "wt2", title: "Review PR #142 — powiadomienia", priority: "medium", statusCategory: "todo", statusName: "Do zrobienia", statusColor: "#6b7280", projectName: "Portal Klienta TechCorp", dueDate: "2026-04-03" },
  { _id: "wt3", title: "Naprawić testy E2E dla rezerwacji", priority: "urgent", statusCategory: "in_progress", statusName: "W toku", statusColor: "#f59e0b", projectName: "System Rezerwacji MediSoft", dueDate: "2026-04-02" },
  { _id: "wt4", title: "Aktualizacja dokumentacji API", priority: "low", statusCategory: "todo", statusName: "Do zrobienia", statusColor: "#6b7280", projectName: "API Gateway FinanceHub" },
];

export const mockProjectTasks = [
  { _id: "pt1", title: "Konfiguracja CI/CD pipeline", priority: "high", status: "in_progress" as const, type: "devops", projectName: "System Rezerwacji MediSoft" },
  { _id: "pt2", title: "Optymalizacja zapytań SQL", priority: "medium", status: "todo" as const, type: "development", projectName: "API Gateway FinanceHub" },
];

export const mockAllocations = [
  { _id: "al1", projectId: "p1", projectName: "Portal Klienta TechCorp", projectStatus: "active", hoursPerDay: 4, type: "confirmed" as const },
  { _id: "al2", projectId: "p2", projectName: "System Rezerwacji MediSoft", projectStatus: "active", hoursPerDay: 2, type: "confirmed" as const },
  { _id: "al3", projectId: "p6", projectName: "API Gateway FinanceHub", projectStatus: "active", hoursPerDay: 2, type: "placeholder" as const },
];

export const mockVacations = [
  { _id: "v1", memberName: "Anna Kowalska", type: "vacation", startDate: "2026-04-14", endDate: "2026-04-18", notes: "Urlop wielkanocny" },
  { _id: "v2", memberName: "Piotr Zieliński", type: "personal", startDate: "2026-04-07", endDate: "2026-04-07", notes: "Dzień wolny" },
  { _id: "v3", memberName: "Magdalena Lewandowska", type: "sick", startDate: "2026-03-28", endDate: "2026-04-02", notes: "" },
];

export const mockPlanningMilestones = [
  { _id: "ms1", projectId: "p1", projectName: "Portal Klienta TechCorp", name: "MVP Launch", date: "2026-04-30", status: "on_track" },
  { _id: "ms2", projectId: "p2", projectName: "System Rezerwacji MediSoft", name: "Beta Release", date: "2026-05-15", status: "at_risk" },
  { _id: "ms3", projectId: "p3", projectName: "Aplikacja Mobilna RetailPro", name: "Final Delivery", date: "2026-04-10", status: "on_track" },
  { _id: "ms4", projectId: "p6", projectName: "API Gateway FinanceHub", name: "Security Audit", date: "2026-06-01", status: "on_track" },
];
