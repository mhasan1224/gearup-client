
export default function SettingsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-7 pb-10">
      <div className="space-y-3">
        <div className="h-3 w-36 rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-9 w-72 max-w-full rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-96 max-w-full rounded bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="h-36 rounded-3xl bg-slate-200 dark:bg-white/10" />

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#102B40]"
          >
            <div className="h-10 w-48 rounded-lg bg-slate-200 dark:bg-white/10" />
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="h-3 w-36 rounded bg-slate-200 dark:bg-white/10" />
                  <div className="h-3 w-52 max-w-full rounded bg-slate-200 dark:bg-white/10" />
                </div>
                <div className="h-6 w-11 rounded-full bg-slate-200 dark:bg-white/10" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
