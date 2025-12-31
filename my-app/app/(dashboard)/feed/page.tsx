import FeedCard from "@/components/feed/FeedCard";
import CreatePostModal from "@/components/forms/CreatePostModal";

// Mock data for demo
const MOCK_POSTS = [
  {
    id: "1",
    content: "Just finished harvesting 5 acres of wheat. Yield looks promising this season despite the early rains. 🌾🚜 #Harvest2024\n\nLooking for buyers in the Mandi, expected rate is ₹2200/quintal.",
    createdAt: new Date().toISOString(),
    author: {
        id: "u1",
        name: "Rajesh Kumar",
        role: "FARMER",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
    },
    cropName: "Wheat",
    images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60"]
  },
  {
    id: "2",
    content: "⚠️ ALERT: Observing heavy pest attack (Pink Bollworm) in Cotton fields near Bhatinda. \n\nPlease spray Emamectin Benzoate 5% SG immediately if you see signs. Check your flowers today! 🔍🦠",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    author: {
        id: "u3",
        name: "Dr. Amit Verma",
        role: "EXPERT",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60"
    },
    cropName: "Cotton",
    images: []
  },
  {
    id: "3",
    content: "Observing some yellowing on my paddy leaves. Is this nitrogen deficiency or bacterial leaf blight? Any experts here? 🧪🌱",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    author: {
        id: "u2",
        name: "Priya Singh",
        role: "STUDENT",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60"
    },
    cropName: "Rice",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=60"]
  },
  {
    id: "4",
    content: "🚜 AVAILABLE FOR RENT: John Deere 5310 4WD Tractor with Rotavator.\n\nAvailable in Ludhiana district. Rates: ₹800/hour. Contact me for booking next week.",
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    author: {
        id: "u4",
        name: "Vikram Patel",
        role: "OWNER",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60"
    },
    cropName: null,
    images: ["https://images.unsplash.com/photo-1595116701633-85f2658a5286?w=800&auto=format&fit=crop&q=60"]
  },
  {
    id: "5",
    content: "Successfully shifted to Organic Farming 2 years ago. Today my soil is softer, darker, and full of earthworms. \n\nStop burning stubble! Use waste decomposer instead. 🌿♻️ #OrganicRevolution",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: {
        id: "u5",
        name: "Anita Desai",
        role: "FARMER",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60"
    },
    cropName: "Soil Health",
    images: ["https://images.unsplash.com/photo-1625246333195-5840b9571eb2?w=800&auto=format&fit=crop&q=60"]
  },
  {
    id: "6",
    content: "Market Update: Tomato prices surged to ₹80/kg in Nashik market today due to heavy rains disrupting supply. \n\nGood time for farmers with standing crop to harvest! 🍅📈",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    author: {
        id: "u6",
        name: "Suresh Reddy",
        role: "AGENT",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
    },
    cropName: "Tomato",
    images: []
  }
];

export default async function FeedPage() {
  // Using mock data for now (Prisma will be connected later)
  const posts = MOCK_POSTS;
  
  return (
    <div className="max-w-2xl mx-auto">
        {/* Create Post Widget */}
        <div className="glass-card p-4 mb-6 flex items-center gap-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 ring-2 ring-transparent group-hover:ring-green-100 transition-all">
                <span className="text-sm font-bold">RK</span>
            </div>
            <CreatePostModal />
        </div>

        {/* Feed Stream */}
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
    </div>
  );
}
