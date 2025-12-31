'use client';

import { Button } from "@/components/ui/button";
import CropCard from "@/components/crops/CropCard";
import { Plus, CloudSun, CalendarDays, BarChart3 } from "lucide-react";

// Mock Data
const MY_CROPS = [
  {
    id: "c1",
    name: "Wheat (Rabi Season)",
    variety: "HD-2967",
    sownDate: "2024-11-15",
    harvestDate: "2025-04-10",
    progress: 45,
    status: "Good",
    healthScore: 9,
    nextTask: "Analyze nitrogen levels for top dressing",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "c2",
    name: "Mustard Field A",
    variety: "Pusa Bold",
    sownDate: "2024-10-20",
    harvestDate: "2025-03-15",
    progress: 70,
    status: "Needs Attention",
    healthScore: 6,
    nextTask: "Spray for Aphid control immediately",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "c3",
    name: "Potato (Kufri Jyoti)",
    variety: "Early Maturing",
    sownDate: "2024-12-01",
    harvestDate: "2025-02-28",
    progress: 25,
    status: "Good",
    healthScore: 8,
    nextTask: "Earthing up to be done next week",
    image: "https://images.unsplash.com/photo-1518977676651-71f6480aeef9?w=800&auto=format&fit=crop&q=60"
  }
];

export default function MyCropsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header & Weather Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">My Crops</h1>
            <p className="text-gray-500">Monitor your field health, track progress, and plan activities.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 rounded-full px-6">
            <Plus size={18} className="mr-2" /> Add New Crop
        </Button>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 opacity-90">
                    <CloudSun size={20} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Field Weather</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">24°C</span>
                    <span className="text-lg opacity-80">Sunny</span>
                </div>
                <p className="mt-2 text-sm opacity-80">Humidity: 65% • Rain: 0% chance</p>
            </div>
            {/* Decor */}
            <CloudSun size={120} className="absolute -right-6 -bottom-6 opacity-20" />
         </div>

         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4 text-green-600">
                <BarChart3 size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Total Yield Est.</span>
            </div>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">42.5</span>
                <span className="text-lg text-gray-500 font-medium">Quintals</span>
            </div>
            <p className="mt-2 text-sm text-green-600 font-medium">+12% vs last season</p>
         </div>

         <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4 text-orange-500">
                <CalendarDays size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Upcoming Tasks</span>
            </div>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">3</span>
                <span className="text-lg text-gray-500 font-medium">Pending</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Next: Aphid Spray (Tomorrow)</p>
         </div>
      </div>

      {/* Crops Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Active Cultivations <span className="text-gray-400 font-normal text-sm ml-2">({MY_CROPS.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MY_CROPS.map(crop => (
                <div key={crop.id} className="h-[500px]"> {/* Fixed height wrapper for consistency */}
                    <CropCard crop={crop as any} /> 
                </div> 
            ))}
             
             {/* Add New Placeholder */}
            <div className="h-[500px] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-green-300 hover:bg-green-50/10 transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-green-100 flex items-center justify-center mb-4 transition-colors">
                    <Plus size={32} className="text-gray-300 group-hover:text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-600 group-hover:text-green-700">Add New Field</h3>
                <p className="text-sm mt-1">Start tracking another crop</p>
            </div>
        </div>
      </div>
    </div>
  );
}
