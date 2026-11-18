
export default function AdminReportsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="space-y-3">
          <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-80 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-11 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="mt-5 h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-7 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="h-[400px] rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-8 h-[280px] rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-[350px] rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-8 h-[250px] rounded-xl bg-slate-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
