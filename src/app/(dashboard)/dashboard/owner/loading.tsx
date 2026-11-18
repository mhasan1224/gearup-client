
export default function OwnerDashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-7 pb-10">
      <div className="h-64 rounded-3xl bg-slate-200 dark:bg-white/10" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl bg-slate-200 dark:bg-white/10"
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="h-96 rounded-2xl bg-slate-200 dark:bg-white/10" />
        <div className="h-96 rounded-2xl bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="h-72 rounded-2xl bg-slate-200 dark:bg-white/10" />
    </div>
  );
}
