
export default function EarningsLoading() {
  return (
    <div className="animate-pulse space-y-8 pb-10">
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-8 w-64 rounded-lg bg-slate-200" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="h-11 w-11 rounded-xl bg-slate-200" />
            <div className="mt-5 h-4 w-28 rounded bg-slate-200" />
            <div className="mt-3 h-7 w-32 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-36 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-[380px] rounded-2xl bg-slate-100 xl:col-span-2" />
        <div className="h-[380px] rounded-2xl bg-slate-200" />
      </div>

      <div className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6">
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="h-10 w-full rounded-xl bg-slate-100" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-14 rounded-lg bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
