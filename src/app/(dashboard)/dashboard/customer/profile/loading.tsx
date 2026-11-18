
export default function ProfileLoading() {
  return (
    <div className="animate-pulse space-y-7 pb-10">
      <div className="space-y-3">
        <div className="h-9 w-48 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="h-52 rounded-3xl bg-slate-200 dark:bg-white/10" />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="h-[520px] rounded-3xl bg-slate-200 dark:bg-white/10" />
        <div className="space-y-5">
          <div className="h-64 rounded-3xl bg-slate-200 dark:bg-white/10" />
          <div className="h-48 rounded-3xl bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
