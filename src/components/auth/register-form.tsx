
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  LoaderCircle,
  Image as ImageIcon,
} from "lucide-react";

import { signIn, signUp } from "@/lib/auth-client";

type UserRole = "customer" | "owner";

const passwordRules = [
  {
    label: "At least 6 characters",
    test: (value: string) => value.length >= 6,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "One number",
    test: (value: string) => /\d/.test(value),
  },
  {
    label: "One special character",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isBusy = isLoading || isGoogleLoading;
  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(password),
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
        role,
      };

      const result = await signUp.email(registrationData);

      if (result.error) {
        setError(result.error.message || "Registration failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/",
      });

      if (result.error) {
        setError(result.error.message || "Google sign-up failed.");
        setIsGoogleLoading(false);
      }
    } catch {
      setError("Unable to sign up with Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-[#071827]">
          Full Name
        </label>

        <div className="relative">
          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            disabled={isBusy}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-[#071827] outline-none transition placeholder:text-slate-400 focus:border-[#00D6A3] focus:ring-2 focus:ring-[#00D6A3]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#071827]">
          Email Address
        </label>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={isBusy}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-[#071827] outline-none transition placeholder:text-slate-400 focus:border-[#00D6A3] focus:ring-2 focus:ring-[#00D6A3]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      {/* Profile Image */}
      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-semibold text-[#071827]">
          Profile Image URL
          <span className="ml-2 font-normal text-slate-400">(Optional)</span>
        </label>

        <div className="relative">
          <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="image"
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com/profile.jpg"
            disabled={isBusy}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-[#071827] outline-none transition placeholder:text-slate-400 focus:border-[#00D6A3] focus:ring-2 focus:ring-[#00D6A3]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      {/* Account Role */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#071827]">
          I want to join as
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("customer")}
            disabled={isBusy}
            aria-pressed={role === "customer"}
            className={`rounded-xl border p-4 text-left transition ${
              role === "customer"
                ? "border-[#00D6A3] bg-[#00D6A3]/10 ring-2 ring-[#00D6A3]/20"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="block text-sm font-bold text-[#071827]">
              Customer
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">
              Find and rent equipment
            </span>
          </button>

          <button
            type="button"
            onClick={() => setRole("owner")}
            disabled={isBusy}
            aria-pressed={role === "owner"}
            className={`rounded-xl border p-4 text-left transition ${
              role === "owner"
                ? "border-[#00D6A3] bg-[#00D6A3]/10 ring-2 ring-[#00D6A3]/20"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="block text-sm font-bold text-[#071827]">
              Equipment Owner
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">
              List equipment for rent
            </span>
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-[#071827]"
        >
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
            autoComplete="new-password"
            required
            disabled={isBusy}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-[#071827] outline-none transition placeholder:text-slate-400 focus:border-[#00D6A3] focus:ring-2 focus:ring-[#00D6A3]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={isBusy}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#071827]"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold text-[#071827]"
        >
          Confirm Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
            disabled={isBusy}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-[#071827] outline-none transition placeholder:text-slate-400 focus:border-[#00D6A3] focus:ring-2 focus:ring-[#00D6A3]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((previous) => !previous)}
            disabled={isBusy}
            aria-label={
              showConfirmPassword ? "Hide password" : "Show password"
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#071827]"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isBusy || !isPasswordValid}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-5 text-sm font-bold text-[#071827] shadow-lg shadow-[#00D6A3]/20 transition hover:bg-[#00c493] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="w-full border-t border-slate-200" />
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-medium text-slate-400">
          OR CONTINUE WITH
        </span>
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isBusy}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-[#071827] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGoogleLoading ? (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        ) : (
          <svg
            viewBox="0 0 48 48"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#FFC107"
              d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
            />
            <path
              fill="#FF3D00"
              d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
            />
            <path
              fill="#4CAF50"
              d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
            />
            <path
              fill="#1976D2"
              d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.8 6.1-8.3 11.4-8.3Z"
            />
          </svg>
        )}

        {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-[#087F68] transition hover:text-[#00a982]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
