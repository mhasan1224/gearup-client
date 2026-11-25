
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Monitor, Moon, Sun } from "lucide-react";

const themeOptions = [
  {
    value: "light",
    label: "Light Mode",
    description: "Use the light appearance across GearUp.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark Mode",
    description: "Use the dark appearance across GearUp.",
    icon: Moon,
  },
  {
    value: "system",
    label: "System Default",
    description: "Automatically follow your device appearance.",
    icon: Monitor,
  },
] as const;

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your GearUp preferences.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how GearUp looks on your device.
          </p>
        </div>

        <div className="space-y-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = mounted && theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                aria-pressed={isSelected}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/60"
                }`}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon size={21} className="text-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{option.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>

                <div
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  {isSelected && <Check size={14} />}
                </div>
              </button>
            );
          })}
        </div>

        {mounted && theme === "system" && (
          <p className="mt-5 text-sm text-muted-foreground">
            Your device is currently using{" "}
            <span className="font-semibold capitalize text-foreground">
              {resolvedTheme}
            </span>{" "}
            mode.
          </p>
        )}
      </section>
    </div>
  );
}
