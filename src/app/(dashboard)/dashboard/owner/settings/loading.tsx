
export default function OwnerSettingsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <div className="mb-6 h-10 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
              {Array.from({ length: 3 }).map((__, row) => (
                <div
                  key={row}
                  className="mb-5 h-12 rounded-lg bg-slate-100 dark:bg-slate-800"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
