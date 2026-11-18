
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Filter,
  Package,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";

type NotificationCategory =
  | "Booking"
  | "Payment"
  | "User"
  | "Equipment"
  | "System";

type AdminNotification = {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  date: string;
  time: string;
  read: boolean;
  priority: "High" | "Medium" | "Low";
  reference: string;
};

const initialNotifications: AdminNotification[] = [
  {
    id: "ADM-2001",
    title: "New equipment approval request",
    description:
      "Robert Johnson submitted a new CAT 320 Excavator listing. The equipment is waiting for admin review and approval.",
    category: "Equipment",
    date: "Nov 19, 2026",
    time: "10:42 AM",
    read: false,
    priority: "High",
    reference: "EQP-1024",
  },
  {
    id: "ADM-2002",
    title: "New owner registration",
    description:
      "A new equipment owner, Michael Anderson, has registered on GearUp and completed the initial profile setup.",
    category: "User",
    date: "Nov 19, 2026",
    time: "09:18 AM",
    read: false,
    priority: "Medium",
    reference: "USR-3051",
  },
  {
    id: "ADM-2003",
    title: "Payment dispute reported",
    description:
      "A customer has reported a payment-related issue for booking BK-2048. The transaction requires administrative attention.",
    category: "Payment",
    date: "Nov 19, 2026",
    time: "08:35 AM",
    read: false,
    priority: "High",
    reference: "PAY-8842",
  },
  {
    id: "ADM-2004",
    title: "Booking cancellation request",
    description:
      "A customer requested cancellation of a confirmed equipment rental. Please review the booking and its cancellation terms.",
    category: "Booking",
    date: "Nov 18, 2026",
    time: "04:20 PM",
    read: true,
    priority: "Medium",
    reference: "BK-2045",
  },
  {
    id: "ADM-2005",
    title: "Platform security alert",
    description:
      "Multiple unsuccessful login attempts were detected for an account. Review the security activity if necessary.",
    category: "System",
    date: "Nov 18, 2026",
    time: "02:15 PM",
    read: false,
    priority: "High",
    reference: "SEC-1092",
  },
  {
    id: "ADM-2006",
    title: "New customer registered",
    description:
      "Olivia Martin successfully created a new customer account on the GearUp marketplace.",
    category: "User",
    date: "Nov 18, 2026",
    time: "11:40 AM",
    read: true,
    priority: "Low",
    reference: "USR-3048",
  },
  {
    id: "ADM-2007",
    title: "Equipment listing rejected",
    description:
      "An equipment listing was rejected after the review process because some required listing information was incomplete.",
    category: "Equipment",
    date: "Nov 17, 2026",
    time: "05:10 PM",
    read: true,
    priority: "Medium",
    reference: "EQP-1019",
  },
  {
    id: "ADM-2008",
    title: "Successful payment received",
    description:
      "A rental payment was successfully processed through the payment gateway. The transaction record has been updated.",
    category: "Payment",
    date: "Nov 17, 2026",
    time: "03:25 PM",
    read: true,
    priority: "Low",
    reference: "PAY-8836",
  },
  {
    id: "ADM-2009",
    title: "Booking marked as completed",
    description:
      "A rental booking has reached its completion stage. Review the associated transaction and booking information.",
    category: "Booking",
    date: "Nov 16, 2026",
    time: "01:45 PM",
    read: false,
    priority: "Low",
    reference: "BK-2038",
  },
  {
    id: "ADM-2010",
    title: "Scheduled maintenance notice",
    description:
      "A scheduled platform maintenance window is planned. Check the system maintenance schedule before the event.",
    category: "System",
    date: "Nov 15, 2026",
    time: "10:00 AM",
    read: true,
    priority: "Medium",
    reference: "SYS-0102",
  },
  {
    id: "ADM-2011",
    title: "New equipment submitted",
    description:
      "Emma Davis submitted a Canon EOS R5 Camera listing. The submission is waiting for administrative review.",
    category: "Equipment",
    date: "Nov 14, 2026",
    time: "04:12 PM",
    read: true,
    priority: "Medium",
    reference: "EQP-1015",
  },
  {
    id: "ADM-2012",
    title: "New owner profile updated",
    description:
      "An existing equipment owner updated their business profile and contact information.",
    category: "User",
    date: "Nov 13, 2026",
    time: "12:30 PM",
    read: true,
    priority: "Low",
    reference: "USR-3021",
  },
];

const PAGE_SIZE = 6;

const categoryStyles: Record<
  NotificationCategory,
  { icon: typeof Bell; color: string; background: string }
> = {
  Booking: {
    icon: Activity,
    color: "text-blue-600 dark:text-blue-400",
    background: "bg-blue-500/10",
  },
  Payment: {
    icon: CreditCard,
    color: "text-emerald-600 dark:text-emerald-400",
    background: "bg-emerald-500/10",
  },
  User: {
    icon: UserPlus,
    color: "text-violet-600 dark:text-violet-400",
    background: "bg-violet-500/10",
  },
  Equipment: {
    icon: Package,
    color: "text-amber-600 dark:text-amber-400",
    background: "bg-amber-500/10",
  },
  System: {
    icon: Settings,
    color: "text-slate-600 dark:text-slate-300",
    background: "bg-slate-500/10",
  },
};

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Bell;
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
        <Bell size={15} className="text-slate-300" />
      </div>
      <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-[10px] text-slate-400">{description}</p>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: AdminNotification["priority"];
}) {
  const styles = {
    High: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    Medium:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${styles[priority]}`}
    >
      {priority} Priority
    </span>
  );
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] =
    useState<AdminNotification | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<AdminNotification | null>(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const summary = useMemo(
    () => ({
      total: notifications.length,
      unread: notifications.filter((item) => !item.read).length,
      read: notifications.filter((item) => item.read).length,
      highPriority: notifications.filter(
        (item) => item.priority === "High" && !item.read,
      ).length,
    }),
    [notifications],
  );

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const value = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(value) ||
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.reference.toLowerCase().includes(value);

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Unread" && !item.read) ||
        (statusFilter === "Read" && item.read);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [notifications, search, categoryFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / PAGE_SIZE),
  );

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateReadStatus = (id: string, read: boolean) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read } : item)),
    );

    toast.success(read ? "Marked as read." : "Marked as unread.");

    setSelectedNotification((current) =>
      current?.id === id ? { ...current, read } : current,
    );
  };

  const markAllAsRead = () => {
    if (summary.unread === 0) {
      toast.info("All notifications are already read.");
      return;
    }

    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true })),
    );

    toast.success("All notifications marked as read.");
  };

  const deleteNotification = () => {
    if (!deleteTarget) return;

    setNotifications((current) =>
      current.filter((item) => item.id !== deleteTarget.id),
    );

    setSelectedNotification((current) =>
      current?.id === deleteTarget.id ? null : current,
    );

    toast.success("Notification deleted.");
    setDeleteTarget(null);
  };

  const clearReadNotifications = () => {
    const readCount = notifications.filter((item) => item.read).length;

    if (readCount === 0) {
      toast.info("There are no read notifications to clear.");
      setShowClearConfirmation(false);
      return;
    }

    setNotifications((current) => current.filter((item) => !item.read));

    setSelectedNotification((current) =>
      current?.read ? null : current,
    );

    toast.success(`${readCount} read notifications cleared.`);
    setShowClearConfirmation(false);
    setCurrentPage(1);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <Bell size={15} />
            PLATFORM ACTIVITY
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Notifications Center
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Stay informed about platform events and administrative activities.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          className="flex w-fit items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
        >
          <CheckCheck size={16} />
          Mark All as Read
        </button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Notifications"
          value={String(summary.total)}
          description="All platform notifications"
          icon={Bell}
          color="bg-blue-500/10 text-blue-500"
        />
        <SummaryCard
          title="Unread Notifications"
          value={String(summary.unread)}
          description="Waiting for your attention"
          icon={AlertTriangle}
          color="bg-amber-500/10 text-amber-500"
        />
        <SummaryCard
          title="Read Notifications"
          value={String(summary.read)}
          description="Previously reviewed"
          icon={CheckCheck}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <SummaryCard
          title="High Priority"
          value={String(summary.highPriority)}
          description="Unread high-priority alerts"
          icon={ShieldCheck}
          color="bg-red-500/10 text-red-500"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Notifications
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Review and manage your platform alerts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowClearConfirmation(true)}
              className="flex w-fit items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-[10px] font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
            >
              <Trash2 size={13} />
              Clear Read Notifications
            </button>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search notification, reference or message..."
                className={`${inputClass} pl-10`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="relative">
                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={categoryFilter}
                  onChange={(event) => {
                    setCategoryFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${inputClass} appearance-none pl-9 pr-8 sm:w-40`}
                >
                  <option value="All">All Categories</option>
                  <option value="Booking">Booking</option>
                  <option value="Payment">Payment</option>
                  <option value="User">User</option>
                  <option value="Equipment">Equipment</option>
                  <option value="System">System</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${inputClass} appearance-none pr-8 sm:w-36`}
                >
                  <option value="All">All Status</option>
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {paginatedNotifications.map((item, index) => {
            const category = categoryStyles[item.category];
            const Icon = category.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.035 }}
                className={`flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30 sm:flex-row sm:items-start sm:p-6 ${
                  !item.read ? "bg-brand-teal/[0.025]" : ""
                }`}
              >
                <div
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.background} ${category.color}`}
                >
                  <Icon size={20} />
                  {!item.read && (
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-teal dark:border-slate-900" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-xs ${
                        item.read
                          ? "font-semibold text-slate-700 dark:text-slate-200"
                          : "font-bold text-slate-900 dark:text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="rounded-full bg-brand-teal/10 px-2 py-0.5 text-[9px] font-bold text-brand-green dark:text-brand-teal">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {item.category}
                    </span>
                    <PriorityBadge priority={item.priority} />
                    <span className="text-[10px] text-slate-400">
                      {item.reference}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.date} · {item.time}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
                  <button
                    type="button"
                    title="View details"
                    aria-label="View notification details"
                    onClick={() => setSelectedNotification(item)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    title={item.read ? "Mark as unread" : "Mark as read"}
                    aria-label={item.read ? "Mark as unread" : "Mark as read"}
                    onClick={() => updateReadStatus(item.id, !item.read)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10"
                  >
                    {item.read ? (
                      <Bell size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    title="Delete notification"
                    aria-label="Delete notification"
                    onClick={() => setDeleteTarget(item)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {paginatedNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Bell size={25} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
              No notifications found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing{" "}
            <strong className="text-slate-800 dark:text-white">
              {filteredNotifications.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              -
              {Math.min(
                currentPage * PAGE_SIZE,
                filteredNotifications.length,
              )}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-800 dark:text-white">
              {filteredNotifications.length}
            </strong>{" "}
            notifications
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
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
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {selectedNotification && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-details-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-brand-teal">
                  NOTIFICATION DETAILS
                </p>
                <h2
                  id="notification-details-title"
                  className="mt-1 font-bold text-slate-900 dark:text-white"
                >
                  {selectedNotification.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                aria-label="Close notification details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = categoryStyles[selectedNotification.category].icon;

                  return (
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        categoryStyles[selectedNotification.category].background
                      } ${
                        categoryStyles[selectedNotification.category].color
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                  );
                })()}

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedNotification.title}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {selectedNotification.date} · {selectedNotification.time}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {selectedNotification.description}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Category", selectedNotification.category],
                ["Priority", selectedNotification.priority],
                ["Reference", selectedNotification.reference],
                ["Status", selectedNotification.read ? "Read" : "Unread"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
                >
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                updateReadStatus(
                  selectedNotification.id,
                  !selectedNotification.read,
                )
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
            >
              {selectedNotification.read ? (
                <>
                  <Bell size={15} />
                  Mark as Unread
                </>
              ) : (
                <>
                  <Check size={15} />
                  Mark as Read
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-notification-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Trash2 size={22} />
            </div>

            <h2
              id="delete-notification-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              Delete Notification?
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Are you sure you want to delete{" "}
              <strong className="text-slate-800 dark:text-white">
                {deleteTarget.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteNotification}
                className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirmation && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-notifications-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Trash2 size={22} />
            </div>

            <h2
              id="clear-notifications-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              Clear Read Notifications?
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              This will remove all{" "}
              <strong className="text-slate-800 dark:text-white">
                {summary.read} read notifications
              </strong>
              . Unread notifications will remain.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirmation(false)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={clearReadNotifications}
                className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Clear All Read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
