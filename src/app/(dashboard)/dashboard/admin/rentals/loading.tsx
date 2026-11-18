
export default function AdminRentalsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="space-y-2">
        <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-800" />
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
            <div className="mt-2 h-7 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="h-11 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-11 w-full rounded-xl bg-slate-100 dark:bg-slate-800 sm:w-44" />
          <div className="h-11 w-full rounded-xl bg-slate-100 dark:bg-slate-800 sm:w-40" />
        </div>

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-t border-slate-100 py-4 dark:border-slate-800"
          >
            <div className="h-12 w-14 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-48 max-w-full rounded bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="hidden h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-800 sm:block" />
            <div className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
