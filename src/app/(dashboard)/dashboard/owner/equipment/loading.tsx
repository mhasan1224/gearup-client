
export default function OwnerEquipmentLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-7 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="space-y-3">
          <div className="h-3 w-40 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-9 w-64 rounded-lg bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-80 max-w-full rounded bg-slate-200 dark:bg-white/10" />
        </div>
        <div className="h-12 w-40 rounded-xl bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-2xl bg-slate-200 dark:bg-white/10"
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#102B40]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="h-11 flex-1 rounded-xl bg-slate-200 dark:bg-white/10" />
          <div className="h-11 w-40 rounded-xl bg-slate-200 dark:bg-white/10" />
          <div className="h-11 w-32 rounded-xl bg-slate-200 dark:bg-white/10" />
        </div>

        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-t border-slate-100 py-5 sm:flex-row sm:items-center dark:border-white/10"
          >
            <div className="h-20 w-28 rounded-xl bg-slate-200 dark:bg-white/10" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-48 rounded bg-slate-200 dark:bg-white/10" />
              <div className="h-3 w-36 rounded bg-slate-200 dark:bg-white/10" />
              <div className="h-3 w-56 rounded bg-slate-200 dark:bg-white/10" />
            </div>
            <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
