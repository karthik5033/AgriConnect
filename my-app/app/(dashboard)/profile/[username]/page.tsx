import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Link as LinkIcon, Users, Sprout } from "lucide-react";
import FeedCard from "@/components/feed/FeedCard";

// Mock User Data
const MOCK_USER = {
  name: "Rajesh Kumar",
  handle: "@rajesh_farmer",
  role: "FARMER",
  bio: "Sustainable farming enthusiast. Growing Wheat, Rice, and Mustard in Punjab. Experimenting with organic fertilizers. 🌾🚜",
  location: "Amritsar, Punjab",
  joined: "January 2024",
  website: "agriconnect.in",
  followers: 1250,
  following: 45,
  crops: ["Wheat", "Rice", "Mustard", "Sugarcane"],
  image: null
};

const MOCK_POSTS = [
  {
    id: "1",
    content: "Just finished harvesting 5 acres of wheat. Yield looks promising this season despite the early rains. 🌾🚜 #Harvest2024",
    createdAt: new Date().toISOString(),
    author: { ...MOCK_USER, id: "u1", image: null },
    cropName: "Wheat",
    images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60"]
  }
];

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-green-600 to-emerald-800 relative">
        <div className="absolute -bottom-12 left-8">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900 shadow-md">
                <AvatarImage src="" />
                <AvatarFallback className="text-4xl bg-yellow-200 text-yellow-800">RK</AvatarFallback>
            </Avatar>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-14 px-8 flex justify-between items-start">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{MOCK_USER.name}</h1>
            <p className="text-gray-500">{MOCK_USER.handle}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {MOCK_USER.role}
            </span>
        </div>
        <div className="flex gap-3">
             <Button variant="outline" className="rounded-full">Message</Button>
             <Button className="rounded-full bg-green-700 hover:bg-green-800">Follow</Button>
        </div>
      </div>

      <div className="px-8 mt-4 space-y-4">
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
            {MOCK_USER.bio}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
                <MapPin size={16} />
                {MOCK_USER.location}
            </div>
            <div className="flex items-center gap-1">
                <LinkIcon size={16} />
                <a href="#" className="text-blue-600 hover:underline">{MOCK_USER.website}</a>
            </div>
            <div className="flex items-center gap-1">
                <Calendar size={16} />
                Joined {MOCK_USER.joined}
            </div>
        </div>

        <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 dark:text-gray-100">{MOCK_USER.following}</span>
                <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 dark:text-gray-100">{MOCK_USER.followers}</span>
                <span className="text-gray-500">Followers</span>
            </div>
        </div>
        
        {/* Crops Badge */}
        <div className="flex flex-wrap gap-2 mt-2">
            {MOCK_USER.crops.map(crop => (
                <div key={crop} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400">
                    <Sprout size={12} />
                    {crop}
                </div>
            ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200 dark:border-gray-800">
         <div className="flex px-8 gap-8">
            <button className="py-3 text-sm font-semibold border-b-2 border-green-600 text-green-600">Posts</button>
            <button className="py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Media</button>
            <button className="py-3 text-sm font-medium text-gray-500 hover:text-gray-700">About</button>
         </div>
      </div>

      {/* Feed Area */}
      <div className="px-4 md:px-8 py-6 max-w-2xl bg-gray-50/50 dark:bg-black/20 min-h-[400px]">
         {MOCK_POSTS.map(post => (
             <FeedCard key={post.id} post={post} />
         ))}
      </div>

    </div>
  );
}
