
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  BellRing,
  Check,
  ChevronRight,
  Eye,
  Globe,
  LockKeyhole,
  Moon,
  Monitor,
  Palette,
  Save,
  ShieldCheck,
  Sun,
  Trash2,
  UserRound,
  Wallet,
} from "lucide-react";

type ToggleProps = {
  label: string;
  description: string;
  defaultChecked?: boolean;
};

function SettingToggle({
  label,
  description,
  defaultChecked = true,
}: ToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <div>
        <h4 className="text-sm font-bold text-[#071827] dark:text-white">
          {label}
        </h4>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={() => setEnabled((current) => !current)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-[#00D6A3]" : "bg-slate-300 dark:bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]">
        <Icon size={19} />
      </div>
      <div>
        <h2 className="text-base font-extrabold text-[#071827] dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function CustomerSettingsPage() {
  const [appearance, setAppearance] = useState("system");
  const [language, setLanguage] = useState("English");
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!", {
      description: "Your preferences have been updated in this demo.",
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087F68] dark:text-[#00D6A3]">
            <span className="h-2 w-2 rounded-full bg-[#00D6A3]" />
            Account Preferences
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#071827] sm:text-3xl dark:text-white">
            Settings & Preferences
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Customize your GearUp experience, manage notifications and
            control your account preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-5 py-3 text-sm font-bold text-[#071827] shadow-lg shadow-[#00D6A3]/15 transition hover:bg-[#00bd90]"
        >
          <Save size={17} />
          Save Preferences
        </button>
      </div>

      {/* Account Summary */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#071827] via-[#102B40] to-[#087F68] p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-extrabold">
              A
            </div>
            <div>
              <p className="text-lg font-extrabold">Alex Morgan</p>
              <p className="mt-1 text-sm text-white/65">
                alex.morgan@example.com
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#00D6A3]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00D6A3]">
                <ShieldCheck size={12} />
                Customer Account
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-xs text-white/60">Account Status</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-bold">
              <span className="h-2 w-2 rounded-full bg-[#00D6A3]" />
              Active Account
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
            <SectionHeading
              icon={BellRing}
              title="Notification Preferences"
              description="Choose which updates you want to receive."
            />

            <div className="divide-y divide-slate-100 dark:divide-white/10">
              <SettingToggle
                label="Booking Updates"
                description="Get updates when your bookings are confirmed or changed."
              />
              <SettingToggle
                label="Payment Notifications"
                description="Receive payment receipts and transaction updates."
              />
              <SettingToggle
                label="Rental Reminders"
                description="Get reminders before your rental starts or ends."
              />
              <SettingToggle
                label="Promotional Offers"
                description="Receive special offers, deals and announcements."
                defaultChecked={false}
              />
              <SettingToggle
                label="Email Notifications"
                description="Receive important updates through email."
              />
            </div>
          </section>

          {/* Privacy */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
            <SectionHeading
              icon={LockKeyhole}
              title="Privacy & Security"
              description="Manage your account privacy preferences."
            />

            <div className="divide-y divide-slate-100 dark:divide-white/10">
              <SettingToggle
                label="Profile Visibility"
                description="Allow equipment owners to view your public profile."
              />
              <SettingToggle
                label="Show Contact Information"
                description="Share your contact details with owners after booking."
                defaultChecked={false}
              />
              <SettingToggle
                label="Login Activity Alerts"
                description="Get notified about unusual account login activity."
              />
            </div>

            <div className="mt-4 space-y-1">
              <button
                type="button"
                onClick={() =>
                  toast.info("Security settings will be available after authentication integration.")
                }
                className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-[#071827] dark:text-white">
                  <ShieldCheck size={18} className="text-[#087F68] dark:text-[#00D6A3]" />
                  Account Security
                </span>
                <ChevronRight size={17} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.info("Active sessions management will be added with backend authentication.")
                }
                className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-[#071827] dark:text-white">
                  <Eye size={18} className="text-[#087F68] dark:text-[#00D6A3]" />
                  Active Sessions
                </span>
                <ChevronRight size={17} className="text-slate-400" />
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Appearance */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
            <SectionHeading
              icon={Palette}
              title="Appearance"
              description="Choose your preferred visual experience."
            />

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ].map((option) => {
                const Icon = option.icon;
                const selected = appearance === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAppearance(option.value)}
                    className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition ${
                      selected
                        ? "border-[#00D6A3] bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]"
                        : "border-slate-200 text-slate-500 hover:border-[#00D6A3]/50 dark:border-white/10 dark:text-slate-400"
                    }`}
                  >
                    <Icon size={22} />
                    <span className="text-xs font-bold">{option.label}</span>
                    {selected && <Check size={14} />}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Appearance selection is a frontend preview preference for now.
              Theme persistence will be connected later.
            </p>
          </section>

          {/* Language */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
            <SectionHeading
              icon={Globe}
              title="Regional Preferences"
              description="Customize your language and regional settings."
            />

            <label
              htmlFor="language"
              className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300"
            >
              Display Language
            </label>

            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-[#071827] outline-none transition focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
            >
              <option>English</option>
              <option>বাংলা</option>
            </select>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#071827] dark:text-white">
                <Wallet size={17} className="text-[#087F68] dark:text-[#00D6A3]" />
                Currency
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Bangladeshi Taka (BDT)
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Currency display is currently fixed for this demo.
              </p>
            </div>
          </section>

          {/* Account Actions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
            <SectionHeading
              icon={UserRound}
              title="Account Actions"
              description="Manage your GearUp account."
            />

            <button
              type="button"
              onClick={() =>
                toast.info("Account deletion requests will be connected to the backend later.")
              }
              className="flex w-full items-center justify-between rounded-xl border border-red-200 p-4 text-left transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/5"
            >
              <span>
                <span className="block text-sm font-bold text-red-600">
                  Delete Account
                </span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  Request permanent account deletion.
                </span>
              </span>
              <Trash2 size={19} className="text-red-500" />
            </button>
          </section>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-white/10">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-6 py-3 text-sm font-bold text-[#071827] shadow-lg shadow-[#00D6A3]/15 transition hover:bg-[#00bd90]"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
