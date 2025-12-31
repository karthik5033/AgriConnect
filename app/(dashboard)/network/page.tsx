'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NetworkCard from "@/components/network/NetworkCard";
import { Search, Filter, Sparkles, Loader2 } from "lucide-react";
import { getRecommendedUsers, getAllUsers, NetworkFilter } from "@/actions/network.actions";

export default function NetworkPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<NetworkFilter>("All");
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [discovery, setDiscovery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const [recs, disc] = await Promise.all([
            getRecommendedUsers(),
            getAllUsers(query, filter)
        ]);
        setRecommendations(recs);
        setDiscovery(disc);
        setLoading(false);
    };
    
    // Debounce search slightly
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [query, filter]);

  const CATEGORIES = [
      { label: "All", value: "All" },
      { label: "Farmers", value: "FARMER" },
      { label: "Key Experts", value: "EXPERT" },
      { label: "Buyers", value: "BUYER" },
      { label: "Agri-Companies", value: "COMPANY" },
      { label: "Local Agents", value: "AGENT" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Smart Matches Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
             <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    Recommended for you
                    <Sparkles className="text-amber-400 fill-amber-400" size={18} />
                </h2>
                <p className="text-sm text-gray-500 mt-1">Based on your activity and crop profile</p>
             </div>
             <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50 font-medium text-sm">See all</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendations.map(user => (
                <NetworkCard key={user.id} user={user} isRecommended />
            ))}
             {/* Filler to show grid look if needed */}
             {recommendations.length > 0 && recommendations.length < 4 && (
                <div className="hidden lg:block md:hidden border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-6 text-gray-400 text-sm font-medium">
                    Find more matches based on your profile
                </div>
             )}
        </div>
      </section>

      {/* Discovery Section */}
      <section>
        <div className="sticky top-[4.5rem] z-40 bg-gray-50/95 backdrop-blur-sm py-4 mb-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-gray-900">More People</h2>
                
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                     <div className="relative flex-1 md:w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                         <Input 
                            placeholder="Search by name, role..." 
                            className="pl-9 h-9 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500/20" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                         />
                     </div>
                     <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>
                     <Button variant="outline" size="sm" className="h-9 px-4 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                         <Filter size={14} className="mr-2" /> All Filters
                     </Button>
                </div>
            </div>
            
             {/* Categories */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat.value} 
                        onClick={() => setFilter(cat.value as NetworkFilter)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap
                        ${filter === cat.value 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-green-600" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {discovery.length > 0 ? (
                    discovery.map(user => (
                        <NetworkCard key={user.id} user={user} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        No users found matching "{query}"
                    </div>
                )}
            </div>
        )}
      </section>
    </div>
  );
}
