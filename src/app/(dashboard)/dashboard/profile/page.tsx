
"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { getMyProfile, updateMyProfile } from "@/services/user-service";
import type { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const result = await getMyProfile();

        if (!isActive) return;

        const user = result.data.user;

        setProfile(user);
        setName(user.name || "");
        setImage(user.image || "");
        setPhone(user.phone || "");
        setAddress(user.address || "");
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your profile.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        name: name.trim(),
        ...(image.trim() ? { image: image.trim() } : {}),
        ...(phone.trim() ? { phone: phone.trim() } : {}),
        ...(address.trim() ? { address: address.trim() } : {}),
      };

      const result = await updateMyProfile(payload);

      setProfile(result.data.user);
      setName(result.data.user.name || "");
      setImage(result.data.user.image || "");
      setPhone(result.data.user.phone || "");
      setAddress(result.data.user.address || "");

      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3">
        <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center">
        <AlertCircle size={36} className="text-destructive" />
        <h2 className="mt-4 font-heading text-xl font-bold text-foreground">
          Unable to load profile
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-semibold text-primary">
          Account Settings
        </p>

        <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="bg-primary p-6 text-primary-foreground sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/15">
              {image.trim() ? (
                <img
                  src={image}
                  alt={name || "Profile"}
                  className="size-full object-cover"
                />
              ) : (
                <UserRound size={36} />
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="font-heading text-xl font-extrabold">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm opacity-80">
                {profile.email}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold capitalize">
                {profile.role === "admin" ? (
                  <ShieldCheck size={14} />
                ) : (
                  <UserRound size={14} />
                )}
                {profile.role} Account
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your profile details below.
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={100}
                  placeholder="Enter your full name"
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  readOnly
                  className="h-12 w-full cursor-not-allowed rounded-xl border border-border bg-muted pl-11 pr-4 text-sm text-muted-foreground outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Email address cannot be changed.
              </p>
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-image"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Profile Image URL
              </label>

              <div className="relative">
                <Camera
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="profile-image"
                  type="url"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="profile-address"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3.5 top-4 text-muted-foreground"
                />
                <textarea
                  id="profile-address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  rows={3}
                  placeholder="Enter your delivery address"
                  className="w-full resize-y rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-border pt-5 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
