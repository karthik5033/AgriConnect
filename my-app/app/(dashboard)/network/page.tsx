import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NetworkCard from "@/components/network/NetworkCard";
import { Search, Filter, Sparkles } from "lucide-react";

// Mock Data
const SMART_MATCHES = [
  {
    id: "m1",
    name: "Agro Foods Ltd",
    role: "BUYER",
    location: "Mumbai, Maharashtra",
    specialty: "Buying Wheat & Rice",
    mutual: 12,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "m2",
    name: "Dr. R.K. Gupta",
    role: "EXPERT",
    location: "Pau, Ludhiana",
    specialty: "Wheat Disease Expert",
    mutual: 8,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "m3",
    name: "Greenfield Equipments",
    role: "COMPANY",
    location: "Karnal, Haryana",
    specialty: "Farm Machinery Rental",
    mutual: 15,
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&auto=format&fit=crop&q=60"
  }
];

const DISCOVER_PEOPLE = [
  {
    id: "d1",
    name: "Vikram Singh",
    role: "FARMER",
    location: "Amritsar, Punjab",
    specialty: "Organic Wheat, Potato",
    mutual: 4,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "d2",
    name: "Sunita Devi",
    role: "FARMER",
    location: "Hisar, Haryana",
    specialty: "Cotton, Mustard",
    mutual: 2,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "d3",
    name: "Global Exports",
    role: "EXPORTER",
    location: "New Delhi",
    specialty: "Basmati Rice Export",
    mutual: 23,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "d4",
    name: "Ramesh Pawar",
    role: "AGENT",
    location: "Nashik, Maharashtra",
    specialty: "Onion, Tomato Trader",
    mutual: 7,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60"
  },
    {
    id: "d5",
    name: "Organic Fertilizers Co",
    role: "COMPANY",
    location: "Pune, Maharashtra",
    specialty: "Bio-Fertilizers",
    mutual: 11,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "d6",
    name: "Prof. Anil Kumar",
    role: "EXPERT",
    location: "IARI, Delhi",
    specialty: "Soil Scientist",
    mutual: 19,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
  }
];

export default function NetworkPage() {
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
            {SMART_MATCHES.map(user => (
                <NetworkCard key={user.id} user={user} />
            ))}
             {/* Filler to show grid look */}
             <div className="hidden lg:block md:hidden border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-6 text-gray-400 text-sm font-medium">
                Find more matches based on your profile
             </div>
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
                         <Input placeholder="Search by name, role..." className="pl-9 h-9 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500/20" />
                     </div>
                     <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>
                     <Button variant="outline" size="sm" className="h-9 px-4 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                         <Filter size={14} className="mr-2" /> All Filters
                     </Button>
                </div>
            </div>
            
             {/* Categories */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
                {["All", "Farmers", "Key Experts", "Buyers", "Agri-Companies", "Local Agents"].map((cat, i) => (
                    <button 
                        key={cat} 
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap
                        ${i === 0 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {DISCOVER_PEOPLE.map(user => (
                <NetworkCard key={user.id} user={user} />
            ))}
        </div>
      </section>
    </div>
  );
}
