
export default function OwnerRequestsLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div>
        <div className="h-3 w-32 rounded bg-slate-200" />
        <div className="mt-3 h-8 w-64 rounded-lg bg-slate-200" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div>
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="mt-3 h-7 w-12 rounded bg-slate-200" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <div className="h-5 w-44 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-64 rounded bg-slate-100" />
          </div>
          <div className="h-11 w-full rounded-xl bg-slate-100 sm:w-64" />
        </div>

        <div className="mb-6 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-20 shrink-0 rounded-full bg-slate-100"
            />
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 xl:flex-row xl:items-center"
            >
              <div className="flex flex-1 items-center gap-3">
                <div className="h-16 w-20 rounded-lg bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded bg-slate-200" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                  <div className="h-3 w-32 rounded bg-slate-100" />
                </div>
              </div>
              <div className="h-12 w-full rounded-lg bg-slate-100 xl:w-80" />
              <div className="h-9 w-full rounded-lg bg-slate-100 xl:w-36" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
