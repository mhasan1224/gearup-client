
export default function SavedEquipmentLoading() {
  return (
    <div className="animate-pulse space-y-8 pb-8">
      <div>
        <div className="h-8 w-56 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100 dark:bg-white/5" />
      </div>

      <div className="h-44 rounded-2xl bg-slate-100 dark:bg-white/5" />

      <div className="h-11 max-w-xs rounded-xl bg-slate-100 dark:bg-white/5" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#102b40]"
          >
            <div className="h-52 bg-slate-200 dark:bg-white/10" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-slate-100 dark:bg-white/5" />
              <div className="h-10 rounded-xl bg-slate-100 dark:bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
