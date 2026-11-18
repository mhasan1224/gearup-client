
export default function OwnerNotificationsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-8 w-56 rounded-lg bg-slate-200" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="h-10 w-64 rounded-xl bg-slate-100" />
        </div>

        <div className="mt-6 h-10 rounded-xl bg-slate-100" />

        <div className="mt-5 divide-y divide-slate-100">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex gap-4 py-5">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-52 max-w-full rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-32 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
