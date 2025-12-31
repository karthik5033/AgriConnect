import { Skeleton } from "@/components/ui/skeleton"

export default function FeedSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Create Post Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex gap-4 mb-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="flex-1 h-12 rounded-full" />
        </div>
        <div className="flex justify-between px-2">
            <Skeleton className="w-20 h-8 rounded-lg" />
            <Skeleton className="w-20 h-8 rounded-lg" />
            <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
      </div>

      {/* Post Skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
             <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-3" />
                </div>
             </div>
             <Skeleton className="w-full h-24 rounded-lg" />
             <div className="flex justify-between pt-2">
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-20 h-8" />
             </div>
        </div>
      ))}
    </div>
  )
}
