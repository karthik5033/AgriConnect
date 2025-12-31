import FeedCard from "@/components/feed/FeedCard";
import { getPosts } from "@/actions/post.actions";

export default async function FeedList() {
    // Simulate slight network delay for skeleton demo
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = await getPosts();
    const posts = result.success ? result.posts : [];

    return (
        <div className="space-y-6">
            {posts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No posts yet. Be the first to share an update! 🌾
                </div>
            ) : (
                posts.map((post) => (
                    <FeedCard key={post.id} post={post as any} />
                ))
            )}
        </div>
    );
}
