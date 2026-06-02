const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-700/50 rounded-lg ${className}`} />
);

export const SkeletonCard = () => (
  <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 space-y-3">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="h-7 w-32" />
    <Skeleton className="h-3 w-20" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-2">
    <Skeleton className="h-10 w-full rounded-xl" />
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full rounded-xl" />
    ))}
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 space-y-3">
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-40 w-full rounded-xl" />
    <div className="flex gap-2">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonChart key={i} />
      ))}
    </div>
    <SkeletonTable />
  </div>
);

export default Skeleton;
