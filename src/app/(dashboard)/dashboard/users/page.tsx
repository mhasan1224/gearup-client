
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  Save,
} from "lucide-react";

import {
  getAllUsers,
  updateUserRole,
} from "@/services/admin-user-service";

import type { AdminUser } from "@/types/admin-user";

type EditableRole = "customer" | "owner";

const formatDate = (date?: string) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const roleStyles: Record<string, string> = {
  admin: "bg-purple-500/10 text-purple-600",
  owner: "bg-primary/10 text-primary",
  customer: "bg-blue-500/10 text-blue-600",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<
    Record<string, EditableRole>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(
    null,
  );

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setLoadingError("");

    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      setLoadingError(
        error instanceof Error
          ? error.message
          : "Failed to load users.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search),
    );
  }, [users, searchTerm]);

  const handleRoleUpdate = async (user: AdminUser) => {
    const newRole = selectedRoles[user._id];

    if (!newRole || newRole === user.role) return;

    setUpdatingUserId(user._id);
    setActionError("");
    setSuccessMessage("");

    try {
      const response = await updateUserRole(user._id, {
        role: newRole,
      });

      setUsers((previousUsers) =>
        previousUsers.map((item) =>
          item._id === user._id ? response.data.user : item,
        ),
      );

      setSuccessMessage(
        `${user.name}'s role updated to ${newRole}.`,
      );
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Failed to update user role.",
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const totalCustomers = users.filter(
    (user) => user.role === "customer",
  ).length;

  const totalOwners = users.filter(
    (user) => user.role === "owner",
  ).length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin",
  ).length;

  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
              User Management
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              View registered users and manage their account roles.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadUsers()}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Users
            </p>
            <Users className="text-primary" size={20} />
          </div>
          <p className="mt-4 font-heading text-2xl font-extrabold text-foreground">
            {users.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Registered platform accounts
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Customers
            </p>
            <UserRound className="text-blue-600" size={20} />
          </div>
          <p className="mt-4 font-heading text-2xl font-extrabold text-foreground">
            {totalCustomers}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Customer accounts
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Owners
            </p>
            <Users className="text-primary" size={20} />
          </div>
          <p className="mt-4 font-heading text-2xl font-extrabold text-foreground">
            {totalOwners}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Equipment owner accounts
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Admins
            </p>
            <ShieldCheck className="text-purple-600" size={20} />
          </div>
          <p className="mt-4 font-heading text-2xl font-extrabold text-foreground">
            {totalAdmins}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Platform administrators
          </p>
        </div>
      </section>

      <section className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              Registered Users
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {filteredUsers.length} of {users.length} users
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, email or role..."
              className="h-11 w-full rounded-xl border border-border bg-background pr-4 pl-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>

        {actionError && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{actionError}</p>
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-primary">
            {successMessage}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center">
            <div className="size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          </div>
        ) : loadingError ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">{loadingError}</p>

            <button
              type="button"
              onClick={() => void loadUsers()}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Try Again
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center rounded-xl bg-muted/40 px-4 text-center">
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "No users found matching your search."
                : "No registered users found."}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-4">User</th>
                    <th className="px-4 py-4">Joined</th>
                    <th className="px-4 py-4">Current Role</th>
                    <th className="px-4 py-4">Change Role</th>
                    <th className="px-4 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const isAdmin = user.role === "admin";
                    const selectedRole =
                      selectedRoles[user._id] ?? user.role;

                    return (
                      <tr
                        key={user._id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name}
                                className="size-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {user.name}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyles[user.role]}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={selectedRole}
                            disabled={isAdmin || updatingUserId === user._id}
                            onChange={(event) =>
                              setSelectedRoles((previous) => ({
                                ...previous,
                                [user._id]: event.target.value as EditableRole,
                              }))
                            }
                            className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="customer">Customer</option>
                            <option value="owner">Owner</option>
                          </select>
                        </td>

                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => void handleRoleUpdate(user)}
                            disabled={
                              isAdmin ||
                              selectedRole === user.role ||
                              updatingUserId === user._id
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {updatingUserId === user._id ? (
                              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                              <Save size={14} />
                            )}
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {filteredUsers.map((user) => {
                const isAdmin = user.role === "admin";
                const selectedRole =
                  selectedRoles[user._id] ?? user.role;

                return (
                  <div
                    key={user._id}
                    className="space-y-4 rounded-xl border border-border p-4"
                  >
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="size-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Joined
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={selectedRole}
                          disabled={isAdmin || updatingUserId === user._id}
                          onChange={(event) =>
                            setSelectedRoles((previous) => ({
                              ...previous,
                              [user._id]: event.target.value as EditableRole,
                            }))
                          }
                          className="h-10 rounded-lg border border-border bg-background px-2 text-sm text-foreground outline-none focus:border-primary disabled:opacity-50"
                        >
                          <option value="customer">Customer</option>
                          <option value="owner">Owner</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => void handleRoleUpdate(user)}
                          disabled={
                            isAdmin ||
                            selectedRole === user.role ||
                            updatingUserId === user._id
                          }
                          aria-label={`Save role for ${user.name}`}
                          className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {updatingUserId === user._id ? (
                            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          ) : (
                            <Save size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
