
export default function AdminOverviewLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="mt-5 h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-7 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
