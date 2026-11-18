
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Globe,
  LockKeyhole,
  Monitor,
  Moon,
  Save,
  Shield,
  Sun,
  Trash2,
  UserRound,
  Wallet,
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
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
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
          checked ? "bg-brand-teal" : "bg-slate-300 dark:bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

type SettingsSectionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
};

function SettingsSection({
  icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
      <div className="px-5 sm:px-6">{children}</div>
    </section>
  );
}

const initialPreferences = {
  bookingUpdates: true,
  paymentAlerts: true,
  equipmentUpdates: true,
  marketingEmails: false,
  profileVisibility: true,
  showContact: true,
  twoFactor: false,
};

export default function OwnerSettingsPage() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("Asia/Dhaka");

  const updatePreference = (
    key: keyof typeof initialPreferences,
    value: boolean,
  ) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    setPreferences(initialPreferences);
    setTheme("system");
    setLanguage("English");
    setCurrency("USD");
    setTimezone("Asia/Dhaka");
    toast.success("Settings restored to default.");
  };

  const selectClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <div className="space-y-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-brand-teal">
            <Shield size={15} />
            ACCOUNT CONTROL CENTER
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your account preferences, privacy and security.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-lg shadow-brand-teal/15 transition hover:bg-brand-green"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <SettingsSection
            icon={<Bell size={20} />}
            title="Notification Preferences"
            description="Choose which updates you want to receive."
          >
            <ToggleSetting
              title="Booking updates"
              description="Receive updates about new booking requests and rental activity."
              checked={preferences.bookingUpdates}
              onChange={(value) => updatePreference("bookingUpdates", value)}
            />
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <ToggleSetting
              title="Payment notifications"
              description="Get notified when payments are received or processed."
              checked={preferences.paymentAlerts}
              onChange={(value) => updatePreference("paymentAlerts", value)}
            />
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <ToggleSetting
              title="Equipment updates"
              description="Receive alerts about equipment status and availability."
              checked={preferences.equipmentUpdates}
              onChange={(value) => updatePreference("equipmentUpdates", value)}
            />
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <ToggleSetting
              title="Marketing emails"
              description="Occasional product news, tips and GearUp announcements."
              checked={preferences.marketingEmails}
              onChange={(value) => updatePreference("marketingEmails", value)}
            />
          </SettingsSection>

          <SettingsSection
            icon={<Globe size={20} />}
            title="Language & Region"
            description="Customize your regional preferences."
          >
            <div className="grid gap-5 py-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Language
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className={selectClass}
                >
                  <option>English</option>
                  <option>বাংলা</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Currency
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className={selectClass}
                >
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 sm:col-span-2">
                Timezone
                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className={selectClass}
                >
                  <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/Lisbon">Europe/Lisbon</option>
                </select>
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            icon={<Monitor size={20} />}
            title="Appearance"
            description="Choose how GearUp looks on your device."
          >
            <div className="grid grid-cols-3 gap-3 py-5">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ].map((option) => {
                const Icon = option.icon;
                const active = theme === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
                      active
                        ? "border-brand-teal bg-brand-teal/5 text-brand-teal"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
                    }`}
                  >
                    <Icon size={21} />
                    <span className="text-xs font-semibold">{option.label}</span>
                    {active && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </SettingsSection>

          <SettingsSection
            icon={<UserRound size={20} />}
            title="Privacy & Visibility"
            description="Control what other people can see."
          >
            <ToggleSetting
              title="Public owner profile"
              description="Allow customers to discover your owner profile."
              checked={preferences.profileVisibility}
              onChange={(value) => updatePreference("profileVisibility", value)}
            />
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <ToggleSetting
              title="Show contact information"
              description="Allow customers with active bookings to view your contact details."
              checked={preferences.showContact}
              onChange={(value) => updatePreference("showContact", value)}
            />
          </SettingsSection>

          <SettingsSection
            icon={<LockKeyhole size={20} />}
            title="Security"
            description="Protect your GearUp owner account."
          >
            <div className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Password
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Keep your account secure with a strong password.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.info("Password management will be available soon.")
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-brand-teal hover:text-brand-teal dark:border-slate-700 dark:text-slate-300"
              >
                Change Password
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <ToggleSetting
              title="Two-factor authentication"
              description="Add an extra layer of protection to your account."
              checked={preferences.twoFactor}
              onChange={(value) => {
                updatePreference("twoFactor", value);
                toast.info("Two-factor authentication setup is not connected yet.");
              }}
            />
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <div className="flex items-center justify-between gap-3 py-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Active sessions
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Review devices signed in to your account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => toast.info("Session management will be available soon.")}
                className="text-xs font-semibold text-brand-teal hover:underline"
              >
                Manage
              </button>
            </div>
          </SettingsSection>

          <SettingsSection
            icon={<Trash2 size={20} />}
            title="Danger Zone"
            description="Actions that affect your account permanently."
          >
            <div className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-semibold text-red-600">
                  Deactivate account
                </h3>
                <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Temporarily disable your owner account. Your equipment and
                  rental history may become unavailable.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.info("Account deactivation is not connected yet.")
                }
                className="shrink-0 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
              >
                Deactivate Account
              </button>
            </div>
          </SettingsSection>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue p-5 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-teal">
              <Shield size={23} />
            </div>
            <h3 className="mt-4 text-lg font-bold">Your account matters</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Keep your profile updated and review your privacy preferences
              regularly to make the most of GearUp.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-brand-teal">
              <Check size={15} />
              Account settings
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Wallet size={17} className="text-brand-teal" />
              Payout preferences
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Manage how you receive your rental earnings.
            </p>
            <button
              type="button"
              onClick={() => toast.info("Payout setup will be available soon.")}
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-brand-teal/10 hover:text-brand-teal dark:bg-slate-800 dark:text-slate-300"
            >
              Payment methods
              <CreditCard size={16} />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Need help?
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Have questions about your account or settings?
            </p>
            <button
              type="button"
              onClick={() => toast.info("Support center will be available soon.")}
              className="mt-3 text-xs font-semibold text-brand-teal hover:underline"
            >
              Contact support
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
