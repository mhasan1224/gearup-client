
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  CreditCard,
  CalendarCheck,
  CalendarX,
  PackageCheck,
  Trash2,
  ArrowRight,
  Filter,
  Settings2,
  BellRing,
  Inbox,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

type NotificationCategory =
  | "booking"
  | "payment"
  | "rental"
  | "system";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  date: string;
  time: string;
  read: boolean;
  icon: typeof Bell;
  color: string;
  background: string;
  href: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "NTF-1001",
    title: "Booking confirmed!",
    message:
      "Your booking for CAT Excavator 320D has been confirmed. Get ready for your upcoming rental.",
    category: "booking",
    date: "2026-11-18",
    time: "10:42 AM",
    read: false,
    icon: CalendarCheck,
    color: "text-[#087F68] dark:text-[#00D6A3]",
    background: "bg-[#00D6A3]/10",
    href: "/dashboard/customer/bookings",
  },
  {
    id: "NTF-1002",
    title: "Payment successful",
    message:
      "Your payment of $450.00 was successfully processed for the equipment rental.",
    category: "payment",
    date: "2026-11-18",
    time: "09:15 AM",
    read: false,
    icon: CreditCard,
    color: "text-blue-600 dark:text-blue-400",
    background: "bg-blue-50 dark:bg-blue-500/10",
    href: "/dashboard/customer/bookings",
  },
  {
    id: "NTF-1003",
    title: "Rental starts tomorrow",
    message:
      "Your DSLR Camera rental is scheduled to begin tomorrow. Contact the owner if you need assistance.",
    category: "rental",
    date: "2026-11-17",
    time: "04:30 PM",
    read: false,
    icon: Clock3,
    color: "text-amber-600 dark:text-amber-400",
    background: "bg-amber-50 dark:bg-amber-500/10",
    href: "/dashboard/customer/bookings",
  },
  {
    id: "NTF-1004",
    title: "Booking request declined",
    message:
      "Unfortunately, your booking request for the Professional Lighting Kit was declined by the owner.",
    category: "booking",
    date: "2026-11-16",
    time: "02:20 PM",
    read: true,
    icon: CalendarX,
    color: "text-red-600 dark:text-red-400",
    background: "bg-red-50 dark:bg-red-500/10",
    href: "/dashboard/customer/bookings",
  },
  {
    id: "NTF-1005",
    title: "Rental completed",
    message:
      "Your Honda Generator rental has been marked as completed. We hope you had a great experience!",
    category: "rental",
    date: "2026-11-15",
    time: "11:05 AM",
    read: true,
    icon: PackageCheck,
    color: "text-[#087F68] dark:text-[#00D6A3]",
    background: "bg-[#00D6A3]/10",
    href: "/dashboard/customer/bookings",
  },
  {
    id: "NTF-1006",
    title: "Welcome to GearUp!",
    message:
      "Thank you for joining GearUp. Discover equipment, connect with owners, and make your next project easier.",
    category: "system",
    date: "2026-11-12",
    time: "08:00 AM",
    read: true,
    icon: BellRing,
    color: "text-violet-600 dark:text-violet-400",
    background: "bg-violet-50 dark:bg-violet-500/10",
    href: "/equipment",
  },
];

const filterOptions = [
  { label: "All Notifications", value: "all" },
  { label: "Bookings", value: "booking" },
  { label: "Payments", value: "payment" },
  { label: "Rentals", value: "rental" },
  { label: "System", value: "system" },
];

type FilterValue = "all" | NotificationCategory;

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications,
  );
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesCategory =
        activeFilter === "all" ||
        notification.category === activeFilter;

      const matchesTab =
        activeTab === "all" || !notification.read;

      return matchesCategory && matchesTab;
    });
  }, [notifications, activeFilter, activeTab]);

  const groupedNotifications = useMemo(() => {
    const groups: Record<string, NotificationItem[]> = {};

    filteredNotifications.forEach((notification) => {
      const label = new Date(
        `${notification.date}T00:00:00`,
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(notification);
    });

    return Object.entries(groups);
  }, [filteredNotifications]);

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );

    setSelectedIds((current) =>
      current.filter((selectedId) => selectedId !== id),
    );

    toast.success("Notification marked as read.");
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) {
      toast.info("You're all caught up!");
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );

    setSelectedIds([]);
    toast.success("All notifications marked as read.");
  };

  const deleteNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );

    setSelectedIds((current) =>
      current.filter((selectedId) => selectedId !== id),
    );

    toast.success("Notification deleted.");
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;

    setNotifications((current) =>
      current.filter(
        (notification) => !selectedIds.includes(notification.id),
      ),
    );

    setSelectedIds([]);
    toast.success("Selected notifications deleted.");
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredNotifications.map(
      (notification) => notification.id,
    );

    const allSelected = visibleIds.every((id) =>
      selectedIds.includes(id),
    );

    setSelectedIds((current) =>
      allSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : [
            ...new Set([
              ...current,
              ...visibleIds,
            ]),
          ],
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7 pb-10">
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Dashboard</span>
            <ChevronRight size={13} />
            <span className="text-[#087F68] dark:text-[#00D6A3]">
              Notifications
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#071827] dark:text-white sm:text-4xl">
            Notifications<span className="text-[#00D6A3]">.</span>
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Stay updated on your bookings, payments, and rental activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/customer/settings"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <Settings2 size={15} />
            Preferences
          </Link>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[#071827] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#102B40] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#00D6A3] dark:text-[#071827] dark:hover:bg-[#36e5bd]"
          >
            <CheckCheck size={15} />
            Mark all as read
          </button>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Notifications",
            value: notifications.length,
            icon: Bell,
            color: "text-[#087F68] dark:text-[#00D6A3]",
            background: "bg-[#00D6A3]/10",
          },
          {
            label: "Unread Notifications",
            value: unreadCount,
            icon: BellRing,
            color: "text-amber-600 dark:text-amber-400",
            background: "bg-amber-50 dark:bg-amber-500/10",
          },
          {
            label: "Read Notifications",
            value: notifications.length - unreadCount,
            icon: CheckCheck,
            color: "text-blue-600 dark:text-blue-400",
            background: "bg-blue-50 dark:bg-blue-500/10",
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#102B40]/70"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#071827] dark:text-white">
                  {item.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.background} ${item.color}`}
              >
                <item.icon size={22} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification Panel */}
      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#102B40]/70">
        {/* Tabs and Filters */}
        <div className="border-b border-slate-100 p-5 dark:border-white/10 sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5 border-b border-slate-100 dark:border-white/10 sm:border-0">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`relative pb-3 text-sm font-bold transition sm:pb-0 ${
                  activeTab === "all"
                    ? "text-[#071827] dark:text-white"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                All
                {activeTab === "all" && (
                  <motion.div
                    layoutId="notification-tab"
                    className="absolute -bottom-px left-0 h-0.5 w-full bg-[#00D6A3] sm:hidden"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={`relative flex items-center gap-2 pb-3 text-sm font-bold transition sm:pb-0 ${
                  activeTab === "unread"
                    ? "text-[#071827] dark:text-white"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Unread

                {unreadCount > 0 && (
                  <span className="rounded-full bg-[#00D6A3]/15 px-2 py-0.5 text-[10px] font-extrabold text-[#087F68] dark:text-[#00D6A3]">
                    {unreadCount}
                  </span>
                )}

                {activeTab === "unread" && (
                  <motion.div
                    layoutId="notification-tab"
                    className="absolute -bottom-px left-0 h-0.5 w-full bg-[#00D6A3] sm:hidden"
                  />
                )}
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={deleteSelected}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  <Trash2 size={14} />
                  Delete Selected ({selectedIds.length})
                </button>
              )}

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
                <Filter size={15} className="text-slate-400" />

                <select
                  value={activeFilter}
                  onChange={(event) =>
                    setActiveFilter(event.target.value as FilterValue)
                  }
                  className="w-full bg-transparent text-xs font-bold text-slate-600 outline-none dark:text-slate-300 sm:w-auto"
                  aria-label="Filter notifications by category"
                >
                  {filterOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-white text-slate-800"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filteredNotifications.length > 0 && (
            <div className="mt-5 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={filteredNotifications.every((item) =>
                    selectedIds.includes(item.id),
                  )}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded accent-[#00D6A3]"
                  aria-label="Select all visible notifications"
                />
                Select all visible
              </label>

              <span className="text-[11px] font-medium text-slate-400">
                Showing {filteredNotifications.length} notifications
              </span>
            </div>
          )}
        </div>

        {/* Notification List */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="popLayout">
            {groupedNotifications.length > 0 ? (
              <div className="space-y-7">
                {groupedNotifications.map(([date, items]) => (
                  <div key={date}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                        {date}
                      </span>
                      <div className="h-px flex-1 bg-slate-100 dark:bg-white/10" />
                    </div>

                    <div className="space-y-3">
                      {items.map((notification) => {
                        const Icon = notification.icon;

                        return (
                          <motion.article
                            layout
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className={`group relative flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-start sm:p-5 ${
                              notification.read
                                ? "border-slate-100 bg-white hover:border-slate-200 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/10"
                                : "border-[#00D6A3]/20 bg-[#00D6A3]/[0.045] hover:border-[#00D6A3]/40 dark:bg-[#00D6A3]/[0.04]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(notification.id)}
                              onChange={() => toggleSelect(notification.id)}
                              className="absolute right-4 top-4 h-4 w-4 rounded accent-[#00D6A3] sm:static sm:mt-3"
                              aria-label={`Select ${notification.title}`}
                            />

                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${notification.background} ${notification.color}`}
                            >
                              <Icon size={21} />
                            </div>

                            <div className="min-w-0 flex-1 pr-7 sm:pr-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-extrabold text-[#071827] dark:text-white">
                                  {notification.title}
                                </h3>

                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-[#00D6A3]" />
                                )}

                                <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-bold capitalize text-slate-500 dark:bg-white/10 dark:text-slate-400">
                                  {notification.category}
                                </span>
                              </div>

                              <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500 dark:text-slate-400">
                                {notification.message}
                              </p>

                              <div className="mt-3 flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                  <Clock3 size={12} />
                                  {notification.time}
                                </span>

                                <Link
                                  href={notification.href}
                                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#087F68] transition hover:gap-2 dark:text-[#00D6A3]"
                                >
                                  View Details
                                  <ArrowRight size={12} />
                                </Link>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              {!notification.read && (
                                <button
                                  type="button"
                                  onClick={() => markAsRead(notification.id)}
                                  title="Mark as read"
                                  aria-label={`Mark ${notification.title} as read`}
                                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-[#00D6A3]/10 hover:text-[#087F68] dark:hover:text-[#00D6A3]"
                                >
                                  <Check size={17} />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                title="Delete notification"
                                aria-label={`Delete ${notification.title}`}
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]">
                  {activeTab === "unread" ? (
                    <CheckCheck size={32} />
                  ) : (
                    <Inbox size={32} />
                  )}
                </div>

                <h3 className="mt-6 text-lg font-extrabold text-[#071827] dark:text-white">
                  {activeTab === "unread"
                    ? "You're all caught up!"
                    : "No notifications found"}
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500 dark:text-slate-400">
                  {activeTab === "unread"
                    ? "You have no unread notifications. We'll let you know when something important happens."
                    : "There are no notifications in this category right now."}
                </p>

                {activeTab === "unread" && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00D6A3] px-5 py-3 text-xs font-extrabold text-[#071827] transition hover:bg-[#36e5bd]"
                  >
                    View All Notifications
                    <ArrowRight size={14} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Summary */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-white/10 dark:bg-white/[0.02] sm:flex-row">
          <p className="text-[11px] text-slate-400">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </p>

          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#087F68] transition hover:gap-3 dark:text-[#00D6A3]"
          >
            Explore Equipment
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Notification Preference Note */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]">
            <BellRing size={18} />
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-[#071827] dark:text-white">
              Stay in the loop
            </h3>
            <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              Notification preferences and delivery options will be available in account settings.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/customer/settings"
          className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-[#087F68] transition hover:gap-3 dark:text-[#00D6A3]"
        >
          Manage Preferences
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
