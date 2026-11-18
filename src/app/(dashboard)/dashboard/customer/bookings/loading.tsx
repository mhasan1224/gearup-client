
export default function CustomerBookingsLoading() {
  return (
    <div className="animate-pulse space-y-8 pb-8">
      <div>
        <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100 dark:bg-white/5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#102b40]"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-white/10" />
            <div className="mt-5 h-4 w-28 rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-2 h-6 w-20 rounded bg-slate-200 dark:bg-white/10" />
          </div>
        ))}
      </div>

      <div className="h-[520px] rounded-2xl bg-slate-100 dark:bg-white/5" />
    </div>
  );
}
