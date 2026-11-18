
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  Globe2,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

type AdminProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  timezone: string;
  bio: string;
  joinedDate: string;
};

const initialProfile: AdminProfile = {
  name: "Alex Morgan",
  email: "admin@gearup.com",
  phone: "+1 415 555 0138",
  address: "San Francisco, California",
  country: "United States",
  timezone: "Pacific Standard Time (UTC-8)",
  bio: "Managing the GearUp marketplace, supporting platform operations, and maintaining a reliable rental experience for everyone.",
  joinedDate: "January 12, 2026",
};

const avatarFallback = "https://i.pravatar.cc/300?img=12";

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-100 p-4 dark:border-slate-800">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-slate-400">{label}</p>
        <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(avatarFallback);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof AdminProfile, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const startEditing = () => {
    setFormData(profile);
    setPreviewAvatar(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setFormData(profile);
    setPreviewAvatar(null);
    setIsEditing(false);
  };

  const saveProfile = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setProfile(formData);

    if (previewAvatar) {
      setAvatar(previewAvatar);
    }

    setPreviewAvatar(null);
    setIsEditing(false);
    toast.success("Profile updated successfully.");
  };

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewAvatar(imageUrl);
  };

  const currentAvatar = previewAvatar || avatar;

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  const labelClass =
    "text-[11px] font-semibold text-slate-600 dark:text-slate-300";

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <User size={15} />
            ACCOUNT MANAGEMENT
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal information and administrator identity.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            className="flex w-fit items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
          >
            <Edit3 size={15} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={cancelEditing}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X size={15} />
              Cancel
            </button>

            <button
              type="button"
              onClick={saveProfile}
              className="flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
            >
              <Save size={15} />
              Save Changes
            </button>
          </div>
        )}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-32 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green sm:h-40" />

            <div className="px-5 pb-6 sm:px-7">
              <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <Image
                    src={currentAvatar}
                    alt="Admin profile"
                    fill
                    unoptimized
                    sizes="112px"
                    className="rounded-2xl border-4 border-white object-cover shadow-lg dark:border-slate-900"
                  />

                  {isEditing && (
                    <>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Upload profile photo"
                        className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-brand-teal text-brand-navy shadow-md dark:border-slate-900"
                      >
                        <Camera size={16} />
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </>
                  )}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {profile.name}
                    </h2>
                    <span className="flex items-center gap-1 rounded-full bg-brand-teal/10 px-2.5 py-1 text-[9px] font-bold text-brand-green dark:text-brand-teal">
                      <ShieldCheck size={12} />
                      ADMIN
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {profile.email}
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-xs leading-6 text-slate-500 dark:text-slate-400">
                {profile.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                  <MapPin size={14} className="text-brand-teal" />
                  {profile.address}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                  <Clock3 size={14} className="text-brand-teal" />
                  Joined {profile.joinedDate}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <SectionHeading
                title="Personal Information"
                description="Your basic account and contact details."
              />

              {isEditing && (
                <span className="w-fit rounded-full bg-amber-500/10 px-3 py-1 text-[9px] font-bold text-amber-600">
                  EDITING MODE
                </span>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Full Name
                <input
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Email Address
                <input
                  type="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Enter your email"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Phone Number
                <input
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Location
                <input
                  value={formData.address}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="City, State"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Country
                <input
                  value={formData.country}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                  placeholder="Enter country"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Timezone
                <input
                  value={formData.timezone}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateField("timezone", event.target.value)
                  }
                  placeholder="Enter timezone"
                  className={inputClass}
                />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                About Me
                <textarea
                  value={formData.bio}
                  disabled={!isEditing}
                  onChange={(event) => updateField("bio", event.target.value)}
                  rows={4}
                  placeholder="Write a short introduction..."
                  className={`${inputClass} resize-none`}
                />
              </label>
            </div>

            {isEditing && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-blue-50 p-3 text-[10px] leading-5 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                <Shield size={14} className="mt-0.5 shrink-0" />
                Your changes are currently stored in this page only. Profile
                persistence and server-side validation will be added during API
                integration.
              </div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"
          >
            <SectionHeading
              title="Account Information"
              description="Your GearUp administrator account details."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoItem
                icon={ShieldCheck}
                label="Account Role"
                value="Administrator"
              />
              <InfoItem
                icon={CheckCircle2}
                label="Account Status"
                value="Active"
              />
              <InfoItem
                icon={KeyRound}
                label="Authentication"
                value="Email & Password"
              />
              <InfoItem
                icon={Clock3}
                label="Member Since"
                value={profile.joinedDate}
              />
            </div>
          </motion.section>
        </div>

        <aside className="space-y-5">
          <motion.section
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-green dark:text-brand-teal">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Administrator Access
                </h3>
                <p className="text-[10px] text-slate-400">
                  Platform management role
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Manage platform users",
                "Review equipment listings",
                "Monitor rental bookings",
                "Manage customer reviews",
                "Access platform analytics",
              ].map((permission) => (
                <div key={permission} className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-brand-green dark:text-brand-teal"
                  />
                  <p className="text-[10px] leading-5 text-slate-600 dark:text-slate-300">
                    {permission}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Shield size={14} />
                <span className="text-[10px] font-bold">
                  Protected Account
                </span>
              </div>
              <p className="mt-2 text-[10px] leading-5 text-amber-700/80 dark:text-amber-400/80">
                Administrative permissions should only be managed by an
                authorized platform administrator.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <SectionHeading
              title="Contact & Region"
              description="Your current account location."
            />

            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400">Email</p>
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Phone</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  <Globe2 size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Country</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {profile.country}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.26 }}
            className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue p-5 text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-teal">
              <ShieldCheck size={21} />
            </div>

            <h3 className="mt-4 font-bold">Security Matters</h3>
            <p className="mt-2 text-xs leading-6 text-slate-300">
              Keep your account information up to date and protect your
              administrator credentials.
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-[10px] text-slate-300">
                Account Security
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-brand-teal">
                <CheckCircle2 size={12} />
                Protected
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                toast.info("Password management will be connected with Better Auth.")
              }
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-semibold transition hover:bg-white/20"
            >
              <KeyRound size={14} />
              Manage Password
              <ChevronRight size={14} />
            </button>
          </motion.section>
        </aside>
      </div>
    </div>
  );
}
