
export default function NotificationsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="space-y-3">
        <div className="h-9 w-64 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-2xl bg-slate-200 dark:bg-white/10"
          />
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 p-6 dark:border-white/10">
        <div className="mb-6 h-10 w-full rounded-xl bg-slate-200 dark:bg-white/10" />

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl bg-slate-200 dark:bg-white/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
