
export default function AdminReviewsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="space-y-2">
        <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="mt-5 h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-7 w-16 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="h-11 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-11 w-full rounded-xl bg-slate-100 dark:bg-slate-800 sm:w-40" />
          <div className="h-11 w-full rounded-xl bg-slate-100 dark:bg-slate-800 sm:w-40" />
        </div>

        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 border-t border-slate-100 py-5 dark:border-slate-800"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="h-3 w-32 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
