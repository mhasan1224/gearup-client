
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Bell,
  CalendarCheck,
  Check,
  CheckCheck,
  Clock3,
  CreditCard,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Trash2,
  Truck,
  X,
} from "lucide-react";

type NotificationType =
  | "booking"
  | "payment"
  | "equipment"
  | "system";

type OwnerNotification = {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: NotificationType;
  read: boolean;
  details: string;
};

const initialNotifications: OwnerNotification[] = [
  {
    id: 1,
    title: "New rental request received",
    message:
      "Michael Anderson requested your CAT Hydraulic Excavator for 5 days.",
    date: "2026-11-19",
    time: "10:42 AM",
    type: "booking",
    read: false,
    details:
      "A new customer has submitted a rental request for your CAT Hydraulic Excavator. Review the requested rental dates, quantity and delivery details in your Rental Requests section.",
  },
  {
    id: 2,
    title: "Payment successfully received",
    message:
      "You received $12,500 for the CAT Hydraulic Excavator rental.",
    date: "2026-11-19",
    time: "09:15 AM",
    type: "payment",
    read: false,
    details:
      "The payment for the CAT Hydraulic Excavator rental was successfully processed. You can review the transaction information in your Earnings & Transactions section.",
  },
  {
    id: 3,
    title: "Equipment approved",
    message:
      "Your Canon EOS R5 Camera listing has been approved and is now visible.",
    date: "2026-11-18",
    time: "04:30 PM",
    type: "equipment",
    read: false,
    details:
      "Your equipment listing passed the demo review process. The listing is now marked as approved and can appear in the public marketplace.",
  },
  {
    id: 4,
    title: "Rental request accepted",
    message:
      "Sarah Williams confirmed the rental of your Industrial Generator.",
    date: "2026-11-18",
    time: "11:20 AM",
    type: "booking",
    read: true,
    details:
      "The customer has confirmed the rental arrangement. Check your Rental Requests section for the rental schedule and booking information.",
  },
  {
    id: 5,
    title: "Upcoming rental reminder",
    message:
      "Your Agricultural Tractor rental is scheduled to start tomorrow.",
    date: "2026-11-17",
    time: "02:00 PM",
    type: "booking",
    read: true,
    details:
      "An upcoming rental is scheduled to begin tomorrow. Please make sure the equipment is ready and coordinate the handover with the customer.",
  },
  {
    id: 6,
    title: "Payout information updated",
    message:
      "Your payout information was updated successfully.",
    date: "2026-11-16",
    time: "01:45 PM",
    type: "system",
    read: true,
    details:
      "Your payout settings were updated in this demo notification. Review your account settings before enabling real payment withdrawals.",
  },
  {
    id: 7,
    title: "Rental payment pending",
    message:
      "A payment of $4,500 is awaiting confirmation.",
    date: "2026-11-15",
    time: "08:30 AM",
    type: "payment",
    read: true,
    details:
      "A rental payment is currently pending. Payment confirmation should be verified by the payment provider webhook before treating the booking as paid.",
  },
  {
    id: 8,
    title: "Equipment listing needs attention",
    message:
      "Your Industrial Generator listing requires an information update.",
    date: "2026-11-14",
    time: "03:10 PM",
    type: "equipment",
    read: true,
    details:
      "One of your equipment listings requires an update. Review its description, images and rental information in the My Equipment section.",
  },
  {
    id: 9,
    title: "New customer review",
    message:
      "A customer left a 5-star review for your equipment rental service.",
    date: "2026-11-12",
    time: "12:15 PM",
    type: "system",
    read: true,
    details:
      "You received a positive customer review. Visit your Reviews section to read the feedback and learn more about the customer experience.",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Bookings", value: "booking" },
  { label: "Payments", value: "payment" },
  { label: "Equipment", value: "equipment" },
  { label: "System", value: "system" },
];

const typeConfig: Record<
  NotificationType,
  { icon: typeof Bell; color: string; background: string; label: string }
> = {
  booking: {
    icon: CalendarCheck,
    color: "text-blue-600",
    background: "bg-blue-50",
    label: "Booking",
  },
  payment: {
    icon: CreditCard,
    color: "text-emerald-600",
    background: "bg-emerald-50",
    label: "Payment",
  },
  equipment: {
    icon: Truck,
    color: "text-violet-600",
    background: "bg-violet-50",
    label: "Equipment",
  },
  system: {
    icon: ShieldCheck,
    color: "text-amber-600",
    background: "bg-amber-50",
    label: "System",
  },
};

export default function OwnerNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] =
    useState<OwnerNotification | null>(null);
  const [menuId, setMenuId] = useState<number | null>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "unread" && !notification.read) ||
        notification.type === activeFilter;

      const matchesSearch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [notifications, activeFilter, searchQuery]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) {
      toast.info("You are all caught up.");
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true }))
    );

    toast.success("All notifications marked as read.");
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );

    setMenuId(null);

    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }

    toast.success("Notification deleted.");
  };

  const openNotification = (notification: OwnerNotification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
    setMenuId(null);
  };

  const deleteAllRead = () => {
    const readCount = notifications.filter(
      (notification) => notification.read
    ).length;

    if (readCount === 0) {
      toast.info("There are no read notifications to clear.");
      return;
    }

    setNotifications((current) =>
      current.filter((notification) => !notification.read)
    );

    setSelectedNotification(null);
    toast.success(`${readCount} read notifications cleared.`);
  };

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <p className="mb-2 text-sm font-medium text-brand-teal">
            Stay Updated
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Notifications
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep track of rental requests, payments and equipment updates.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={Bell}
          label="Total Notifications"
          value={String(notifications.length)}
          color="bg-blue-50 text-blue-600"
        />
        <SummaryCard
          icon={Clock3}
          label="Unread Notifications"
          value={String(unreadCount)}
          color="bg-amber-50 text-amber-600"
        />
        <SummaryCard
          icon={CheckCheck}
          label="Read Notifications"
          value={String(notifications.length - unreadCount)}
          color="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Notification Center */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-navy">
                Activity Center
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                You have {unreadCount} unread notifications.
              </p>
            </div>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search notifications..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 sm:w-64"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  activeFilter === filter.value
                    ? "bg-brand-navy text-white"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {filter.label}
                {filter.value === "unread" && unreadCount > 0 && (
                  <span className="ml-2 rounded-full bg-brand-teal px-1.5 py-0.5 text-[10px] text-brand-navy">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* List Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recent Activity
          </p>
          <button
            type="button"
            onClick={deleteAllRead}
            disabled={!notifications.some((notification) => notification.read)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 size={14} />
            Clear read notifications
          </button>
        </div>

        {/* Notifications */}
        <div className="divide-y divide-slate-100">
          {filteredNotifications.map((notification, index) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.24) }}
                className={`group relative flex gap-3 p-4 transition hover:bg-slate-50/80 sm:gap-4 sm:p-5 ${
                  !notification.read ? "bg-emerald-50/20" : "bg-white"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.background} ${config.color}`}
                >
                  <Icon size={20} />
                </div>

                <button
                  type="button"
                  onClick={() => openNotification(notification)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-sm ${
                        notification.read
                          ? "font-semibold text-slate-700"
                          : "font-bold text-brand-navy"
                      }`}
                    >
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    )}
                  </div>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-semibold ${config.background} ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {notification.date} · {notification.time}
                    </span>
                  </div>
                </button>

                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setMenuId(
                        menuId === notification.id ? null : notification.id
                      )
                    }
                    aria-label="Notification actions"
                    className="rounded-lg p-2 text-slate-400 opacity-100 transition hover:bg-slate-100 hover:text-brand-navy sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <MoreHorizontal size={19} />
                  </button>

                  {menuId === notification.id && (
                    <div className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => {
                            markAsRead(notification.id);
                            setMenuId(null);
                            toast.success("Marked as read.");
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          <Check size={15} />
                          Mark as read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteNotification(notification.id)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 size={15} />
                        Delete notification
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Bell size={24} />
            </div>
            <h3 className="mt-4 font-heading font-bold text-brand-navy">
              No notifications found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another filter or search term.
            </p>
          </div>
        )}

        <div className="border-t border-slate-100 px-5 py-4 text-center text-xs text-slate-400">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </div>
      </section>

      {/* Details Modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedNotification(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-brand-navy">
                Notification Details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                aria-label="Close notification details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              {(() => {
                const config = typeConfig[selectedNotification.type];
                const Icon = config.icon;

                return (
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.background} ${config.color}`}
                  >
                    <Icon size={22} />
                  </div>
                );
              })()}

              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-brand-teal">
                  {typeConfig[selectedNotification.type].label}
                </span>
                <h3 className="mt-1 text-sm font-bold text-brand-navy">
                  {selectedNotification.title}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {selectedNotification.details}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 size={14} />
              {selectedNotification.date} · {selectedNotification.time}
            </div>

            <button
              type="button"
              onClick={() => setSelectedNotification(null)}
              className="mt-6 w-full rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal hover:text-brand-navy"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Click outside notification action menu */}
      {menuId !== null && (
        <button
          type="button"
          aria-label="Close notification menu"
          onClick={() => setMenuId(null)}
          className="fixed inset-0 z-10 cursor-default"
        />
      )}
    </div>
  );
}

type SummaryCardProps = {
  icon: typeof Bell;
  label: string;
  value: string;
  color: string;
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  color,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={21} />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-brand-navy">{value}</p>
    </div>
  );
}
