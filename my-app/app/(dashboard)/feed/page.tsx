import { Suspense } from "react";
import CreatePostWidget from "@/components/feed/CreatePostWidget";
import FeedList from "../../../components/feed/FeedList";
import FeedSkeleton from "@/components/feed/FeedSkeleton";

export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto">
        {/* Create Post Widget */}
        <CreatePostWidget />

        {/* Feed Stream with Suspense */}
        <Suspense fallback={<FeedSkeleton />}>
           <FeedList />
        </Suspense>
        
        {/* Infinite Scroll Trigger (Visual only for now) */}
        <div className="py-8 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-green-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    </div>
  );
}
