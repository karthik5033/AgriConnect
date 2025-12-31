'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import { Search, Filter, Tractor, Settings2, CalendarRange, MapPin } from "lucide-react";

// Mock Data
const EQUIPMENT_LIST = [
  {
    id: "e1",
    name: "John Deere 5310 4WD",
    type: "Tractor",
    image: "https://images.unsplash.com/photo-1592860956971-45d614132fa8?w=800&auto=format&fit=crop&q=60",
    rateRaw: 850,
    rateUnit: 'hour' as const,
    location: "Ludhiana, Punjab",
    rating: 4.8,
    reviews: 24,
    availability: 'Available' as const,
    owner: {
      name: "Vikram Singh",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
      isVerified: true
    }
  },
  {
    id: "e2",
    name: "Mahindra Harvester",
    type: "Harvester",
    image: "https://images.unsplash.com/photo-1595116701633-85f2658a5286?w=800&auto=format&fit=crop&q=60",
    rateRaw: 2500,
    rateUnit: 'hour' as const,
    location: "Karnal, Haryana",
    rating: 4.9,
    reviews: 12,
    availability: 'Booked' as const,
    owner: {
      name: "AgriMechanics Co",
      image: undefined,
      isVerified: true
    }
  },
  {
    id: "e3",
    name: "Laser Land Leveler",
    type: "Attachment",
    image: "https://images.unsplash.com/photo-1530968934440-1017df88cb21?w=800&auto=format&fit=crop&q=60",
    rateRaw: 500,
    rateUnit: 'hour' as const,
    location: "Bathinda, Punjab",
    rating: 4.5,
    reviews: 8,
    availability: 'Available' as const,
    owner: {
      name: "Ramesh Kumar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      isVerified: false
    }
  },
  {
    id: "e4",
    name: "Drone Sprayer (10L)",
    type: "Drone",
    image: "https://images.unsplash.com/photo-1508614589041-895b8c9d7ef5?w=800&auto=format&fit=crop&q=60",
    rateRaw: 400,
    rateUnit: 'hour' as const,
    location: "Amritsar, Punjab",
    rating: 5.0,
    reviews: 5,
    availability: 'Available' as const,
    owner: {
      name: "SmartFarm Tech",
      image: undefined,
      isVerified: true
    }
  }
];

export default function EquipmentPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Equipment Rental</h1>
            <p className="text-gray-500">Rent modern machinery or list your own to earn extra income.</p>
        </div>
        <div className="flex gap-3">
             <Button variant="outline" className="gap-2">
                <CalendarRange size={18} />
                My Bookings
             </Button>
             <Button className="bg-gray-900 hover:bg-gray-800 text-white gap-2">
                <Tractor size={18} />
                List Equipment
             </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-[4.5rem] z-40 bg-gray-50/95 backdrop-blur-sm py-4 border-b border-gray-200 -mx-4 px-4 md:mx-0 md:px-0 md:bg-transparent md:border-0 md:static">
         <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-2">
             <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <Input 
                    placeholder="Search for tractors, harvesters, etc..." 
                    className="pl-10 border-0 shadow-none focus-visible:ring-0 bg-transparent h-11" 
                 />
             </div>
             <div className="h-px md:h-8 w-full md:w-px bg-gray-200 my-auto"></div>
             <div className="flex gap-2">
                 <Button variant="ghost" className="flex-1 md:flex-none text-gray-600 font-medium">
                    <MapPin size={18} className="mr-2 text-gray-400" />
                    Ludhiana, PB
                 </Button>
                 <Button variant="ghost" className="flex-1 md:flex-none text-gray-600 font-medium">
                    <Settings2 size={18} className="mr-2 text-gray-400" />
                    Filters
                 </Button>
                 <Button className="md:px-8 bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20">
                    Search
                 </Button>
             </div>
         </div>
         
         {/* Categories */}
         <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none md:justify-center">
            {["All", "Tractors", "Harvesters", "Implements", "Drones", "Irrigation", "Transport"].map((cat, i) => (
                <button 
                    key={cat} 
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
                    ${i === 0 ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                    {cat}
                </button>
            ))}
         </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {EQUIPMENT_LIST.map(item => (
             <EquipmentCard key={item.id} item={item} />
         ))}
      </div>
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-green-900/20">
         <div>
            <h2 className="text-2xl font-bold mb-2">Own a tractor sitting idle?</h2>
            <p className="text-green-100 max-w-lg">List your equipment on AgriConnect and earn up to ₹25,000/month. We handle insurance and bookings.</p>
         </div>
         <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 font-bold whitespace-nowrap">
            Start Earning
         </Button>
      </div>
    </div>
  );
}
