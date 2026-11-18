
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Laptop,
  LockKeyhole,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Save,
  Shield,
  ShieldAlert,
  Sun,
  Trash2,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

type ToggleSettingProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </p>
        <p className="mt-1 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand-teal" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Globe2;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
    >
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-green dark:text-brand-teal">
          <Icon size={19} />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-2">{children}</div>
    </motion.section>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </span>

      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-9 text-xs text-slate-700 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}

const initialSettings = {
  language: "en",
  timezone: "Asia/Dhaka",
  dateFormat: "DD MMM YYYY",
  currency: "USD",
  bookingAlerts: true,
  paymentAlerts: true,
  userAlerts: true,
  equipmentAlerts: true,
  reviewAlerts: false,
  securityAlerts: true,
  emailNotifications: true,
  pushNotifications: true,
  weeklySummary: false,
  loginAlerts: true,
  sessionTimeout: "30",
  twoFactorReminder: true,
  appearance: "system",
  compactMode: false,
  maintenanceNotice: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);

  const updateSetting = <K extends keyof typeof initialSettings>(
    key: K,
    value: (typeof initialSettings)[K],
  ) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const saveSettings = () => {
    setSavedSettings(settings);
    toast.success("Settings saved successfully.");
  };

  const resetSettings = () => {
    setSettings(savedSettings);
    toast.info("Unsaved changes have been reset.");
  };

  const restoreDefaults = () => {
    setSettings(initialSettings);
    setSavedSettings(initialSettings);
    toast.success("Default settings restored.");
  };

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <Wrench size={15} />
            ACCOUNT MANAGEMENT
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Admin Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Customize your dashboard, notifications and account preferences.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetSettings}
            disabled={!hasChanges}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw size={14} />
            Reset Changes
          </button>

          <button
            type="button"
            onClick={saveSettings}
            disabled={!hasChanges}
            className="flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </motion.div>

      {hasChanges && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
          <Clock3 size={15} />
          You have unsaved changes. Save them to keep your current settings.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_310px]">
        <div className="space-y-6">
          <SettingsSection
            icon={Globe2}
            title="General Preferences"
            description="Set your preferred language, region and display formats."
          >
            <div className="grid gap-5 pt-3 sm:grid-cols-2">
              <SelectField
                label="Dashboard Language"
                value={settings.language}
                onChange={(value) => updateSetting("language", value)}
                options={[
                  { label: "English", value: "en" },
                  { label: "বাংলা", value: "bn" },
                ]}
              />

              <SelectField
                label="Timezone"
                value={settings.timezone}
                onChange={(value) => updateSetting("timezone", value)}
                options={[
                  { label: "Dhaka (UTC+6)", value: "Asia/Dhaka" },
                  { label: "London (UTC+0)", value: "Europe/London" },
                  { label: "New York (UTC-5)", value: "America/New_York" },
                  { label: "Dubai (UTC+4)", value: "Asia/Dubai" },
                  { label: "Singapore (UTC+8)", value: "Asia/Singapore" },
                ]}
              />

              <SelectField
                label="Date Format"
                value={settings.dateFormat}
                onChange={(value) => updateSetting("dateFormat", value)}
                options={[
                  { label: "19 Nov 2026", value: "DD MMM YYYY" },
                  { label: "11/19/2026", value: "MM/DD/YYYY" },
                  { label: "19/11/2026", value: "DD/MM/YYYY" },
                  { label: "2026-11-19", value: "YYYY-MM-DD" },
                ]}
              />

              <SelectField
                label="Default Currency"
                value={settings.currency}
                onChange={(value) => updateSetting("currency", value)}
                options={[
                  { label: "US Dollar (USD)", value: "USD" },
                  { label: "Bangladeshi Taka (BDT)", value: "BDT" },
                  { label: "Euro (EUR)", value: "EUR" },
                  { label: "British Pound (GBP)", value: "GBP" },
                ]}
              />
            </div>
          </SettingsSection>

          <SettingsSection
            icon={Bell}
            title="Notification Preferences"
            description="Choose which platform events should generate notifications."
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <ToggleSetting
                title="Booking Notifications"
                description="New bookings, cancellations and rental updates."
                checked={settings.bookingAlerts}
                onChange={(value) => updateSetting("bookingAlerts", value)}
              />

              <ToggleSetting
                title="Payment Notifications"
                description="Successful payments, refunds and payment issues."
                checked={settings.paymentAlerts}
                onChange={(value) => updateSetting("paymentAlerts", value)}
              />

              <ToggleSetting
                title="User Activity"
                description="New registrations and account-related activities."
                checked={settings.userAlerts}
                onChange={(value) => updateSetting("userAlerts", value)}
              />

              <ToggleSetting
                title="Equipment Notifications"
                description="New equipment submissions and listing updates."
                checked={settings.equipmentAlerts}
                onChange={(value) => updateSetting("equipmentAlerts", value)}
              />

              <ToggleSetting
                title="Review Notifications"
                description="New customer reviews and reported feedback."
                checked={settings.reviewAlerts}
                onChange={(value) => updateSetting("reviewAlerts", value)}
              />

              <ToggleSetting
                title="Security Alerts"
                description="Suspicious activity and important security events."
                checked={settings.securityAlerts}
                onChange={(value) => updateSetting("securityAlerts", value)}
              />
            </div>
          </SettingsSection>

          <SettingsSection
            icon={Laptop}
            title="Delivery Preferences"
            description="Manage how administrative notifications reach you."
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <ToggleSetting
                title="Email Notifications"
                description="Receive important platform updates by email."
                checked={settings.emailNotifications}
                onChange={(value) => updateSetting("emailNotifications", value)}
              />

              <ToggleSetting
                title="Push Notifications"
                description="Receive browser notifications when available."
                checked={settings.pushNotifications}
                onChange={(value) => updateSetting("pushNotifications", value)}
              />

              <ToggleSetting
                title="Weekly Summary"
                description="Receive a weekly overview of marketplace activity."
                checked={settings.weeklySummary}
                onChange={(value) => updateSetting("weeklySummary", value)}
              />
            </div>
          </SettingsSection>

          <SettingsSection
            icon={Shield}
            title="Privacy & Security"
            description="Manage account security and administrative session preferences."
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <ToggleSetting
                title="New Login Alerts"
                description="Get notified when your account is accessed from a new session."
                checked={settings.loginAlerts}
                onChange={(value) => updateSetting("loginAlerts", value)}
              />

              <ToggleSetting
                title="Two-Factor Authentication Reminder"
                description="Show a reminder to enable an additional authentication factor."
                checked={settings.twoFactorReminder}
                onChange={(value) => updateSetting("twoFactorReminder", value)}
              />
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
              <SelectField
                label="Automatic Session Timeout"
                value={settings.sessionTimeout}
                onChange={(value) => updateSetting("sessionTimeout", value)}
                options={[
                  { label: "15 minutes", value: "15" },
                  { label: "30 minutes", value: "30" },
                  { label: "1 hour", value: "60" },
                  { label: "2 hours", value: "120" },
                ]}
              />

              <p className="mt-2 text-[10px] leading-5 text-slate-400">
                This is a preference preview. Actual session expiration will be
                enforced by the authentication system.
              </p>
            </div>
          </SettingsSection>

          <SettingsSection
            icon={Palette}
            title="Appearance"
            description="Choose how the GearUp admin dashboard looks."
          >
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {[
                {
                  value: "light",
                  label: "Light",
                  description: "Bright interface",
                  icon: Sun,
                },
                {
                  value: "dark",
                  label: "Dark",
                  description: "Low-light interface",
                  icon: Moon,
                },
                {
                  value: "system",
                  label: "System",
                  description: "Follow device settings",
                  icon: Monitor,
                },
              ].map((theme) => {
                const Icon = theme.icon;
                const selected = settings.appearance === theme.value;

                return (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() =>
                      updateSetting(
                        "appearance",
                        theme.value as typeof settings.appearance,
                      )
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-brand-teal bg-brand-teal/5 ring-1 ring-brand-teal"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        size={20}
                        className={
                          selected
                            ? "text-brand-green dark:text-brand-teal"
                            : "text-slate-400"
                        }
                      />

                      {selected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal text-brand-navy">
                          <Check size={12} />
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-xs font-bold text-slate-800 dark:text-white">
                      {theme.label}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {theme.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-2 dark:border-slate-800">
              <ToggleSetting
                title="Compact Dashboard Layout"
                description="Use a more condensed layout for dashboard sections."
                checked={settings.compactMode}
                onChange={(value) => updateSetting("compactMode", value)}
              />
            </div>
          </SettingsSection>

          <SettingsSection
            icon={Wrench}
            title="Platform Preferences"
            description="Administrative platform configuration overview."
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                  <Users size={17} className="text-slate-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      User Registration
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Public customer registration
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                  <Wallet size={17} className="text-slate-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Online Payments
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Stripe payment integration
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                  Test Mode
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Role-Based Access
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Customer, Owner and Admin roles
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  Configured
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-blue-50 p-3 text-[10px] leading-5 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              These are informational placeholders. Actual platform settings
              will be managed through protected admin APIs.
            </div>

            <div className="mt-3">
              <ToggleSetting
                title="Maintenance Announcements"
                description="Display maintenance notices to administrators."
                checked={settings.maintenanceNotice}
                onChange={(value) => updateSetting("maintenanceNotice", value)}
              />
            </div>
          </SettingsSection>
        </div>

        <aside className="space-y-5">
          <motion.section
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue p-5 text-white"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-teal">
              <Shield size={22} />
            </div>

            <h2 className="mt-4 text-lg font-bold">Security First</h2>

            <p className="mt-2 text-xs leading-6 text-slate-300">
              Your administrator account has access to sensitive platform
              information. Keep your credentials secure.
            </p>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-[10px] text-slate-300">
                <Check size={13} className="text-brand-teal" />
                Protected admin routes
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-300">
                <Check size={13} className="text-brand-teal" />
                Role-based permissions
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-300">
                <Check size={13} className="text-brand-teal" />
                Secure authentication planned
              </div>
            </div>
          </motion.section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                <ShieldAlert size={17} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Danger Zone
              </h3>
            </div>

            <p className="mt-3 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
              Sensitive account actions require additional security checks.
            </p>

            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Account deletion is disabled for administrator accounts.",
                )
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Delete Account
            </button>

            <p className="mt-3 text-[9px] leading-4 text-slate-400">
              Administrator accounts cannot be deleted from this settings
              page.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Restore Preferences
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
              Restore all settings to their initial default values.
            </p>

            <button
              type="button"
              onClick={restoreDefaults}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RotateCcw size={14} />
              Restore Defaults
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <LockKeyhole size={16} className="text-brand-teal" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Settings Privacy
              </h3>
            </div>

            <p className="mt-3 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
              These preferences are currently stored in local component state.
              Database persistence and secure server-side enforcement will be
              added during backend integration.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function ShieldCheckIcon() {
  return <Shield className="text-slate-400" size={17} />;
}
