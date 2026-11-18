
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  BadgeCheck,
  Building2,
  Camera,
  Check,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Store,
  UserRound,
  X,
} from "lucide-react";

type OwnerProfile = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  country: string;
  bio: string;
  website: string;
};

const initialProfile: OwnerProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (415) 555-0138",
  businessName: "Morgan Equipment Rentals",
  businessType: "Construction Equipment Rental",
  address: "245 Market Street",
  city: "San Francisco",
  country: "United States",
  bio: "Equipment rental professional focused on providing reliable machinery and quality service. I help contractors and businesses find the right equipment for every project.",
  website: "www.morganequipment.com",
};

const accountStats = [
  { label: "Listed Equipment", value: "12" },
  { label: "Completed Rentals", value: "48" },
  { label: "Customer Rating", value: "4.9 / 5" },
];

export default function OwnerProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [originalProfile, setOriginalProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasChanges =
    JSON.stringify(profile) !== JSON.stringify(originalProfile) ||
    avatar !== previewAvatar;

  const updateField = (field: keyof OwnerProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewAvatar(imageUrl);
    setAvatar(imageUrl);
  };

  const handleSave = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setOriginalProfile(profile);
    setAvatar(previewAvatar);
    setIsEditing(false);
    setIsSaving(false);

    toast.success("Profile changes saved successfully.");
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setPreviewAvatar(avatar);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalProfile(profile);
    setPreviewAvatar(avatar);
    setIsEditing(true);
  };

  return (
    <div className="space-y-7 pb-10">
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <p className="mb-2 text-sm font-medium text-brand-teal">
            Account Management
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Owner Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal details and business information.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal hover:text-brand-navy"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-5 py-3 text-sm font-bold text-brand-navy transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </motion.div>

      {/* Profile Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-[#102B40] to-[#087F68] p-6 text-white sm:p-8"
      >
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-12 h-52 w-52 rounded-full border border-white/10" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-white/20 bg-white/10 sm:h-28 sm:w-28">
              {previewAvatar ? (
                <Image
                  src={previewAvatar}
                  alt={profile.name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-brand-teal">
                  {profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isEditing}
              aria-label="Upload profile photo"
              className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-brand-navy bg-brand-teal text-brand-navy transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Camera size={16} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {profile.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-brand-teal">
                <BadgeCheck size={13} />
                Equipment Owner
              </span>
            </div>

            <p className="mt-2 text-sm text-white/65">
              {profile.businessName}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {profile.city}, {profile.country}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail size={14} />
                {profile.email}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/10 p-4 sm:min-w-36">
            <div className="flex items-center gap-2 text-brand-teal">
              <ShieldCheck size={18} />
              <span className="text-xs font-semibold">Account Status</span>
            </div>
            <p className="mt-2 text-lg font-bold">Active</p>
            <p className="mt-1 text-[11px] text-white/55">
              Member since 2025
            </p>
          </div>
        </div>
      </motion.section>

      {/* Account Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {accountStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-brand-navy">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Profile Forms */}
      <div className="grid items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Personal Information */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-brand-teal">
                <UserRound size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-brand-navy">
                  Personal Information
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Your basic account information
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <ProfileField
                label="Full Name"
                value={profile.name}
                editing={isEditing}
                onChange={(value) => updateField("name", value)}
                icon={<UserRound size={16} />}
              />
              <ProfileField
                label="Email Address"
                value={profile.email}
                editing={false}
                icon={<Mail size={16} />}
                helper="Email is managed by your account settings."
              />
              <ProfileField
                label="Phone Number"
                value={profile.phone}
                editing={isEditing}
                onChange={(value) => updateField("phone", value)}
                icon={<Phone size={16} />}
              />
              <ProfileField
                label="Website"
                value={profile.website}
                editing={isEditing}
                onChange={(value) => updateField("website", value)}
                icon={<Globe size={16} />}
              />
            </div>
          </section>

          {/* Business Information */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-brand-navy">
                  Business Information
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Details about your rental business
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <ProfileField
                label="Business Name"
                value={profile.businessName}
                editing={isEditing}
                onChange={(value) => updateField("businessName", value)}
                icon={<Store size={16} />}
              />
              <ProfileField
                label="Business Type"
                value={profile.businessType}
                editing={isEditing}
                onChange={(value) => updateField("businessType", value)}
                icon={<Building2 size={16} />}
              />
              <ProfileField
                label="Street Address"
                value={profile.address}
                editing={isEditing}
                onChange={(value) => updateField("address", value)}
                icon={<MapPin size={16} />}
              />
              <ProfileField
                label="City"
                value={profile.city}
                editing={isEditing}
                onChange={(value) => updateField("city", value)}
                icon={<MapPin size={16} />}
              />
              <ProfileField
                label="Country"
                value={profile.country}
                editing={isEditing}
                onChange={(value) => updateField("country", value)}
                icon={<Globe size={16} />}
              />
            </div>
          </section>

          {/* About */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Store size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-brand-navy">
                  About Your Business
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Tell customers what makes your service special
                </p>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(event) => updateField("bio", event.target.value)}
                rows={5}
                maxLength={500}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10"
              />
            ) : (
              <p className="text-sm leading-7 text-slate-600">
                {profile.bio}
              </p>
            )}

            {isEditing && (
              <p className="mt-2 text-right text-xs text-slate-400">
                {profile.bio.length}/500 characters
              </p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="font-heading font-bold text-brand-navy">
              Account Information
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-50 p-2 text-brand-teal">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    Account Security
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Keep your account details and credentials secure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Clock3 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    Account Created
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    January 15, 2025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                  <Check size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    Profile Completion
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Your demo profile is fully filled out.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-teal shadow-sm">
              <BadgeCheck size={21} />
            </div>
            <h3 className="mt-4 font-heading font-bold text-brand-navy">
              Build Customer Trust
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A complete business profile helps customers understand your
              services and feel more confident when renting.
            </p>
          </section>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <X size={16} />
              Discard Changes
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (value: string) => void;
  icon: React.ReactNode;
  helper?: string;
};

function ProfileField({
  label,
  value,
  editing,
  onChange,
  icon,
  helper,
}: ProfileFieldProps) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-semibold text-slate-500">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition ${
          editing
            ? "border-slate-200 bg-white focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/10"
            : "border-transparent bg-slate-50"
        }`}
      >
        <span className="shrink-0 text-slate-400">{icon}</span>
        {editing ? (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-brand-navy outline-none"
          />
        ) : (
          <span className="min-w-0 flex-1 break-words text-sm font-medium text-brand-navy">
            {value}
          </span>
        )}
      </div>

      {helper && <p className="mt-1.5 text-[11px] text-slate-400">{helper}</p>}
    </div>
  );
}
