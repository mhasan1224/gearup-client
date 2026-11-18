"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

const initialProfile: ProfileFormData = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 234-5678",
  address: "123 Equipment Street",
  city: "New York",
  country: "United States",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const completion = useMemo(() => {
    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.address,
      profile.city,
      profile.country,
    ];

    const completed = fields.filter((field) => field.trim().length > 0).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (
      !profile.name.trim() ||
      !profile.email.trim() ||
      !profile.phone.trim() ||
      !profile.address.trim() ||
      !profile.city.trim() ||
      !profile.country.trim()
    ) {
      toast.error("Please complete all profile fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(profile.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      setSavedProfile(profile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    toast.success("Profile image preview updated.");
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-[#071827] outline-none transition placeholder:text-slate-400 focus:border-[#00D6A3] focus:bg-white focus:ring-4 focus:ring-[#00D6A3]/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.07]";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[1500px] space-y-7 pb-10"
    >
      {/* Page Heading */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Dashboard</span>
            <ChevronRight size={13} />
            <span className="text-[#087F68] dark:text-[#00D6A3]">
              My Profile
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#071827] dark:text-white sm:text-4xl">
            My Profile<span className="text-[#00D6A3]">.</span>
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage your personal information and account preferences.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071827] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#071827]/10 transition hover:bg-[#102B40] dark:bg-[#00D6A3] dark:text-[#071827] dark:hover:bg-[#36e5bd]"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-5 py-3 text-sm font-bold text-[#071827] shadow-lg shadow-[#00D6A3]/20 transition hover:bg-[#36e5bd] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </motion.div>

      {/* Profile Overview */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-[#071827] p-6 shadow-xl shadow-[#071827]/10 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#00D6A3]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#087F68]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="group relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#00D6A3]/40 bg-white/10 text-3xl font-extrabold text-[#00D6A3] shadow-2xl shadow-black/20">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase() || "A"
                )}
              </div>

              <label
                htmlFor="profile-image"
                className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-2 border-[#071827] bg-[#00D6A3] text-[#071827] shadow-lg transition hover:scale-110"
                title="Change profile picture"
              >
                <Camera size={16} />
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleImageChange(event.target.files?.[0])}
              />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full border border-[#00D6A3]/30 bg-[#00D6A3]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#00D6A3]">
                  Customer Account
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                  <BadgeCheck size={14} className="text-[#00D6A3]" />
                  Member
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {profile.name || "Your Name"}
              </h2>

              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-slate-400 sm:justify-start">
                <Mail size={14} />
                {profile.email}
              </p>

              <p className="mt-3 text-xs font-medium text-slate-500">
                GearUp member since November 2026
              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl md:max-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                Profile completion
              </span>
              <span className="text-lg font-extrabold text-[#00D6A3]">
                {completion}%
              </span>
            </div>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Profile completion"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#087F68] to-[#00D6A3]"
              />
            </div>

            <p className="mt-3 text-[11px] leading-5 text-slate-400">
              {completion === 100
                ? "Your profile looks complete!"
                : "Complete your information to improve your rental experience."}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        {/* Personal Information */}
        <motion.section
          variants={itemVariants}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102B40]/70 sm:p-8"
        >
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]">
                  <UserRound size={19} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#071827] dark:text-white">
                    Personal Information
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Your basic personal details
                  </p>
                </div>
              </div>
            </div>

            {isEditing && (
              <span className="rounded-full bg-[#00D6A3]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#087F68] dark:text-[#00D6A3]">
                Editing
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="profile-name"
                className="text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={profile.name}
                onChange={(event) => handleChange("name", event.target.value)}
                disabled={!isEditing || isSaving}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-[26px] text-slate-400"
                />
                <input
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  disabled
                  className={`${inputClass} cursor-not-allowed pl-11`}
                />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                Email is managed by your authentication account.
              </p>
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-4 top-[26px] text-slate-400"
                />
                <input
                  id="profile-phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  disabled={!isEditing || isSaving}
                  placeholder="Enter phone number"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-city"
                className="text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                City
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-4 top-[26px] text-slate-400"
                />
                <input
                  id="profile-city"
                  type="text"
                  value={profile.city}
                  onChange={(event) => handleChange("city", event.target.value)}
                  disabled={!isEditing || isSaving}
                  placeholder="Enter city"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="profile-address"
                className="text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Street Address
              </label>
              <input
                id="profile-address"
                type="text"
                value={profile.address}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                disabled={!isEditing || isSaving}
                placeholder="Enter your street address"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="profile-country"
                className="text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Country
              </label>
              <input
                id="profile-country"
                type="text"
                value={profile.country}
                onChange={(event) =>
                  handleChange("country", event.target.value)
                }
                disabled={!isEditing || isSaving}
                placeholder="Enter your country"
                className={inputClass}
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-7 flex flex-col justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10 sm:flex-row">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              >
                Discard Changes
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-6 py-3 text-sm font-extrabold text-[#071827] transition hover:bg-[#36e5bd] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Check size={16} />
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          )}
        </motion.section>

        {/* Account Sidebar */}
        <motion.aside variants={itemVariants} className="space-y-5">
          {/* Account Status */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102B40]/70">
            <h3 className="text-base font-extrabold text-[#071827] dark:text-white">
              Account Status
            </h3>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#00D6A3]/10 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D6A3]/15 text-[#087F68] dark:text-[#00D6A3]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#071827] dark:text-white">
                  Active Account
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Your account is currently active.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Mail size={14} />
                  Email
                </span>
                <span className="text-xs font-bold text-[#087F68] dark:text-[#00D6A3]">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Phone size={14} />
                  Phone
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {profile.phone.trim() ? "Added" : "Not added"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin size={14} />
                  Location
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {profile.city.trim() ? "Added" : "Not added"}
                </span>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102B40] to-[#071827] p-6 text-white">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#00D6A3]/10 blur-2xl" />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D6A3]/15 text-[#00D6A3]">
                <LockKeyhole size={21} />
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Your security matters.
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                Keep your account information up to date. Your personal
                information should only be shared when necessary for a rental.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#00D6A3]">
                Secure Rental Experience
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#102B40]/70">
            <div className="flex items-center gap-2">
              <Clock3
                size={17}
                className="text-[#087F68] dark:text-[#00D6A3]"
              />
              <h3 className="text-sm font-extrabold text-[#071827] dark:text-white">
                Account Activity
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
              You can manage your personal information here. More account
              security options will be available soon.
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
              <span className="text-[11px] text-slate-400">
                Last profile update
              </span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                Not available
              </span>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 text-center dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:text-left"
      >
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Need help managing your account?
        </p>

        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#087F68] transition hover:gap-3 dark:text-[#00D6A3]"
        >
          Contact GearUp Support
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
