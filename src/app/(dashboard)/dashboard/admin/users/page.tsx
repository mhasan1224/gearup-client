
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Ban,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Shield,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

type UserRole = "Customer" | "Owner" | "Admin";
type UserStatus = "Active" | "Suspended";

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  location: string;
  phone: string;
  bookings: number;
  avatar: string;
};

const initialUsers: ManagedUser[] = [
  {
    id: "USR-1001",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    role: "Owner",
    status: "Active",
    joined: "Nov 19, 2026",
    location: "New York, USA",
    phone: "+1 212 555 0142",
    bookings: 12,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "USR-1002",
    name: "James Wilson",
    email: "james@example.com",
    role: "Customer",
    status: "Active",
    joined: "Nov 18, 2026",
    location: "London, UK",
    phone: "+44 7700 900123",
    bookings: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "USR-1003",
    name: "Sophia Chen",
    email: "sophia@example.com",
    role: "Owner",
    status: "Active",
    joined: "Nov 17, 2026",
    location: "Toronto, Canada",
    phone: "+1 416 555 0182",
    bookings: 21,
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: "USR-1004",
    name: "Noah Williams",
    email: "noah@example.com",
    role: "Customer",
    status: "Suspended",
    joined: "Nov 16, 2026",
    location: "Chicago, USA",
    phone: "+1 312 555 0190",
    bookings: 2,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "USR-1005",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Admin",
    status: "Active",
    joined: "Nov 15, 2026",
    location: "Manchester, UK",
    phone: "+44 7700 900456",
    bookings: 0,
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: "USR-1006",
    name: "William Brown",
    email: "william@example.com",
    role: "Owner",
    status: "Active",
    joined: "Nov 14, 2026",
    location: "Dallas, USA",
    phone: "+1 214 555 0123",
    bookings: 17,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "USR-1007",
    name: "Ava Thompson",
    email: "ava@example.com",
    role: "Customer",
    status: "Active",
    joined: "Nov 13, 2026",
    location: "Sydney, Australia",
    phone: "+61 412 345 678",
    bookings: 8,
    avatar: "https://i.pravatar.cc/150?img=49",
  },
  {
    id: "USR-1008",
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    role: "Customer",
    status: "Active",
    joined: "Nov 12, 2026",
    location: "Berlin, Germany",
    phone: "+49 151 23456789",
    bookings: 3,
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "USR-1009",
    name: "Isabella Anderson",
    email: "isabella@example.com",
    role: "Owner",
    status: "Suspended",
    joined: "Nov 11, 2026",
    location: "Lisbon, Portugal",
    phone: "+351 912 345 678",
    bookings: 9,
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    id: "USR-1010",
    name: "Lucas Martin",
    email: "lucas@example.com",
    role: "Customer",
    status: "Active",
    joined: "Nov 10, 2026",
    location: "Paris, France",
    phone: "+33 6 12 34 56 78",
    bookings: 4,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "USR-1011",
    name: "Mia Robinson",
    email: "mia@example.com",
    role: "Owner",
    status: "Active",
    joined: "Nov 09, 2026",
    location: "Melbourne, Australia",
    phone: "+61 423 456 789",
    bookings: 15,
    avatar: "https://i.pravatar.cc/150?img=50",
  },
  {
    id: "USR-1012",
    name: "Ethan Clark",
    email: "ethan@example.com",
    role: "Customer",
    status: "Active",
    joined: "Nov 08, 2026",
    location: "Amsterdam, Netherlands",
    phone: "+31 6 12345678",
    bookings: 6,
    avatar: "https://i.pravatar.cc/150?img=16",
  },
];

const PAGE_SIZE = 8;

function RoleBadge({ role }: { role: UserRole }) {
  const styles: Record<UserRole, string> = {
    Customer:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    Owner:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    Admin:
      "bg-brand-teal/10 text-brand-teal",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[role]}`}
    >
      {role === "Admin" && <ShieldCheck size={11} />}
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        status === "Active"
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active" ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  description: string;
  icon: typeof Users;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={21} />
        </div>
        <span className="text-[10px] font-medium text-slate-400">
          Platform
        </span>
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value.toLocaleString("en-US")}
      </p>
      <p className="mt-1 text-[11px] text-slate-400">{description}</p>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [menuUserId, setMenuUserId] = useState<string | null>(null);
  const [roleUser, setRoleUser] = useState<ManagedUser | null>(null);
  const [newRole, setNewRole] = useState<UserRole>("Customer");
  const [confirmUser, setConfirmUser] = useState<ManagedUser | null>(null);

  const summary = useMemo(
    () => ({
      total: users.length,
      customers: users.filter((user) => user.role === "Customer").length,
      owners: users.filter((user) => user.role === "Owner").length,
      admins: users.filter((user) => user.role === "Admin").length,
    }),
    [users],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase());

      const roleMatch = roleFilter === "All" || user.role === roleFilter;
      const statusMatch =
        statusFilter === "All" || user.status === statusFilter;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateUserRole = () => {
    if (!roleUser) return;

    if (roleUser.role === "Admin" && newRole !== "Admin") {
      const adminCount = users.filter((user) => user.role === "Admin").length;

      if (adminCount <= 1) {
        toast.error("At least one admin account must remain.");
        return;
      }
    }

    setUsers((current) =>
      current.map((user) =>
        user.id === roleUser.id ? { ...user, role: newRole } : user,
      ),
    );

    toast.success(`${roleUser.name}'s role updated.`);
    setRoleUser(null);
  };

  const toggleUserStatus = (user: ManagedUser) => {
    const nextStatus = user.status === "Active" ? "Suspended" : "Active";

    setUsers((current) =>
      current.map((item) =>
        item.id === user.id ? { ...item, status: nextStatus } : item,
      ),
    );

    toast.success(
      `${user.name}'s account is now ${nextStatus.toLowerCase()}.`,
    );
    setConfirmUser(null);
    setMenuUserId(null);
  };

  const handleFilterChange = (
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <Users size={15} />
            ADMINISTRATION
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            User Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage marketplace members, account roles and access.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <UserPlus size={17} className="text-brand-teal" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {users.length} Registered Users
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Users"
          value={summary.total}
          description="All registered accounts"
          icon={Users}
          color="bg-blue-500/10 text-blue-500"
        />
        <SummaryCard
          title="Customers"
          value={summary.customers}
          description="People renting equipment"
          icon={UserCheck}
          color="bg-cyan-500/10 text-cyan-500"
        />
        <SummaryCard
          title="Equipment Owners"
          value={summary.owners}
          description="People listing equipment"
          icon={Shield}
          color="bg-purple-500/10 text-purple-500"
        />
        <SummaryCard
          title="Administrators"
          value={summary.admins}
          description="Platform management accounts"
          icon={ShieldCheck}
          color="bg-brand-teal/10 text-brand-teal"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              All Members
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Search, filter and manage all registered users.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, email or user ID..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="relative">
                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={roleFilter}
                  onChange={(event) =>
                    handleFilterChange(setRoleFilter, event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-brand-teal dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:w-36"
                >
                  <option value="All">All Roles</option>
                  <option value="Customer">Customer</option>
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    handleFilterChange(setStatusFilter, event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-3 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-brand-teal dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:w-36"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 dark:bg-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Member</th>
                <th className="px-4 py-4 font-semibold">Role</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Joined</th>
                <th className="px-4 py-4 font-semibold">Bookings</th>
                <th className="px-4 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.035 }}
                  className="border-t border-slate-100 transition hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        unoptimized
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-white">
                          {user.name}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {user.email}
                        </p>
                        <p className="mt-1 text-[9px] text-slate-400">
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-4 text-[11px] text-slate-500 dark:text-slate-400">
                    {user.joined}
                  </td>
                  <td className="px-4 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {user.bookings}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() =>
                          setMenuUserId(
                            menuUserId === user.id ? null : user.id,
                          )
                        }
                        aria-label={`Actions for ${user.name}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuUserId === user.id && (
                        <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl dark:border-slate-700 dark:bg-slate-900">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setMenuUserId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRoleUser(user);
                              setNewRole(user.role);
                              setMenuUserId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <Shield size={14} />
                            Change Role
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmUser(user);
                              setMenuUserId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            {user.status === "Active" ? (
                              <>
                                <Ban size={14} />
                                Suspend Account
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={14} />
                                Activate Account
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Users size={25} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
              No users found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredUsers.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              -
              {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredUsers.length}
            </span>{" "}
            users
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-16 text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {selectedUser && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-details-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h2
                id="user-details-title"
                className="font-bold text-slate-900 dark:text-white"
              >
                User Details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <Image
                src={selectedUser.avatar}
                alt={selectedUser.name}
                width={72}
                height={72}
                unoptimized
                className="h-18 w-18 rounded-full object-cover"
              />
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {selectedUser.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {selectedUser.email}
              </p>
              <div className="mt-3 flex gap-2">
                <RoleBadge role={selectedUser.role} />
                <StatusBadge status={selectedUser.status} />
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              {[
                ["User ID", selectedUser.id],
                ["Phone", selectedUser.phone],
                ["Location", selectedUser.location],
                ["Joined", selectedUser.joined],
                ["Bookings", String(selectedUser.bookings)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="text-right font-semibold text-slate-800 dark:text-slate-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="mt-5 w-full rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {roleUser && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-role-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <h2
                id="change-role-title"
                className="font-bold text-slate-900 dark:text-white"
              >
                Change User Role
              </h2>
              <button
                type="button"
                onClick={() => setRoleUser(null)}
                aria-label="Close role dialog"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Select a new role for{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                {roleUser.name}
              </span>
              . Admin privileges should only be assigned to trusted accounts.
            </p>

            <div className="mt-5 space-y-2">
              {(["Customer", "Owner", "Admin"] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setNewRole(role)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    newRole === role
                      ? "border-brand-teal bg-brand-teal/5"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {role}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {role === "Customer"
                        ? "Browse and rent equipment"
                        : role === "Owner"
                          ? "List and manage equipment"
                          : "Manage the GearUp platform"}
                    </p>
                  </div>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      newRole === role
                        ? "border-brand-teal bg-brand-teal text-brand-navy"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {newRole === role && <CheckCircle2 size={14} />}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setRoleUser(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateUserRole}
                disabled={newRole === roleUser.role}
                className="flex-1 rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-50"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmUser && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-status-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Ban size={22} />
            </div>
            <h2
              id="account-status-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              {confirmUser.status === "Active"
                ? "Suspend this account?"
                : "Activate this account?"}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {confirmUser.status === "Active"
                ? `Are you sure you want to suspend ${confirmUser.name}'s account?`
                : `Do you want to restore ${confirmUser.name}'s account access?`}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmUser(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => toggleUserStatus(confirmUser)}
                className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {menuUserId && (
        <button
          type="button"
          aria-label="Close user action menu"
          onClick={() => setMenuUserId(null)}
          className="fixed inset-0 z-20 cursor-default"
        />
      )}
    </div>
  );
}
