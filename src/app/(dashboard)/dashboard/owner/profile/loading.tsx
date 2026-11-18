
export default function OwnerProfileLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-8 w-56 rounded-lg bg-slate-200" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
      </div>

      <div className="flex flex-col gap-5 rounded-2xl bg-slate-200 p-8 sm:flex-row sm:items-center">
        <div className="h-28 w-28 rounded-2xl bg-slate-300" />
        <div className="flex-1 space-y-3">
          <div className="h-7 w-48 rounded bg-slate-300" />
          <div className="h-4 w-64 max-w-full rounded bg-slate-300" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6"
            >
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="grid gap-5 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className="h-14 rounded-xl bg-slate-100"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="h-72 rounded-2xl bg-slate-100" />
      </div>
    </div>
  );
}
