import { cn } from "@/lib/utils";

type Status = "draft" | "active" | "completed" | "archived" | "planned" | "in_progress" | "testing" | "deployed"
  | "todo" | "done" | "not_ready" | "ready" | "invoiced" | "paid" | "pending"
  | "sent" | "accepted" | "rejected" | "expired" | "change_request";

const statusConfig: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  draft:          { label: "Szkic",            bg: "#f3f4f6", text: "#4b5563", dot: "#9ca3af" },
  planned:        { label: "Zaplanowane",      bg: "#f3f4f6", text: "#4b5563", dot: "#9ca3af" },
  active:         { label: "Aktywny",          bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
  in_progress:    { label: "W trakcie",        bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  testing:        { label: "W testach",        bg: "#ede9fe", text: "#6d28d9", dot: "#8b5cf6" },
  deployed:       { label: "Wdrożone",         bg: "#f0f9ff", text: "#0369a1", dot: "#0ea5e9" },
  todo:           { label: "Do zrobienia",     bg: "#f3f4f6", text: "#4b5563", dot: "#9ca3af" },
  done:           { label: "Gotowe",           bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
  completed:      { label: "Ukończone",        bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
  archived:       { label: "Archiwum",         bg: "#f3f4f6", text: "#6b7280", dot: "#9ca3af" },
  not_ready:      { label: "Nie gotowe",       bg: "#f3f4f6", text: "#6b7280", dot: "#9ca3af" },
  ready:          { label: "Do fakturowania",  bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  invoiced:       { label: "Zafakturowane",    bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  paid:           { label: "Opłacone",         bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
  pending:        { label: "Oczekujące",       bg: "#f3f4f6", text: "#6b7280", dot: "#9ca3af" },
  sent:           { label: "Wysłane",          bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  accepted:       { label: "Zaakceptowane",    bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
  rejected:       { label: "Odrzucone",        bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
  expired:        { label: "Wygasłe",          bg: "#f3f4f6", text: "#6b7280", dot: "#9ca3af" },
  change_request: { label: "Zmiana",           bg: "#fff7ed", text: "#c2410c", dot: "#f97316" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const config = statusConfig[status] ?? statusConfig.draft;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        className
      )}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ backgroundColor: config.dot }}
      />
      {config.label}
    </span>
  );
}
