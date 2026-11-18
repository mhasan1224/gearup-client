export default function CustomerDashboardLoading() {
  return (
    <section className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100 dark:bg-white/5" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5"
          >
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-5 h-8 w-32 rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-4 h-3 w-40 rounded bg-slate-100 dark:bg-white/5" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-72 rounded-2xl bg-slate-100 dark:bg-white/5 xl:col-span-2" />
        <div className="h-72 rounded-2xl bg-slate-100 dark:bg-white/5" />
      </div>
    </section>
  );
}