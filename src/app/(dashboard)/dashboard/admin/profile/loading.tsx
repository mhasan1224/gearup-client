
export default function AdminProfileLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="space-y-3">
          <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-56 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-11 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="h-32 bg-slate-200 dark:bg-slate-800 sm:h-40" />
            <div className="px-6 pb-6">
              <div className="-mt-12 h-24 w-24 rounded-2xl border-4 border-white bg-slate-300 dark:border-slate-900 dark:bg-slate-700" />
              <div className="mt-5 h-5 w-48 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-3 h-3 w-64 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="mt-6 h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
