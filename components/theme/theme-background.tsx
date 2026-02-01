// components/theme-background.jsx
"use client";

import { ReactNode } from "react";

export function ThemeBackground({ children }: { children: ReactNode }) {
  return <div className="theme-background min-h-screen">{children}</div>;
}
