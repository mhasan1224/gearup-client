
export default function AdminSettingsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="space-y-3">
          <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-56 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-11 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_310px]">
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-2">
                  <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-52 rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>

              {Array.from({ length: index === 0 ? 4 : 3 }).map(
                (_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0 dark:border-slate-800"
                  >
                    <div className="space-y-2">
                      <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3 w-52 max-w-full rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                    <div className="h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700" />
                  </div>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
