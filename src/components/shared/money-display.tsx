"use client";

import { cn } from "@/lib/utils";

export function MoneyDisplay({
  amount,
  className,
  size = "default",
}: {
  amount: number;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const zl = amount / 100;
  const formatted = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(zl);

  return (
    <span
      className={cn(
        "tabular-nums font-semibold",
        size === "sm" && "text-xs",
        size === "default" && "text-sm",
        size === "lg" && "text-lg",
        className
      )}
    >
      {formatted}
    </span>
  );
}
