"use client";
import { useMemo } from "react";

export function Gauge({ value, size = 144, stroke = 10, label, color }: { value: number; size?: number; stroke?: number; label?: string; color?: "green" | "orange" | "red" }) {
  const clamped = Math.max(0, Math.min(1, value || 0));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = useMemo(() => circumference * clamped, [circumference, clamped]);
  const track = circumference;
  const cx = size / 2;
  const cy = size / 2;
  const arcColor = color === "red" ? "#DC143C" : color === "orange" ? "#FF8C00" : "#23C552";

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={label ? `${label}: ${Math.round(clamped * 100)}%` : `${Math.round(clamped * 100)}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cy} r={radius} stroke="#1f2937" strokeOpacity={0.6} strokeWidth={stroke} fill="none" />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={arcColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${track - dash}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-semibold tabular-nums">{Math.round(clamped * 100)}</div>
          <div className="text-xs text-muted-foreground">Impact</div>
        </div>
      </div>
      {label ? <div className="absolute -bottom-6 w-full text-center text-xs text-muted-foreground">{label}</div> : null}
    </div>
  );
}


