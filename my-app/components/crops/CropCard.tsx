'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Droplets, Calendar, Sprout, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Crop {
  id: string;
  name: string;
  variety: string;
  sownDate: string;
  harvestDate: string;
  progress: number; // 0 to 100
  status: 'Good' | 'Needs Attention' | 'Critical';
  healthScore: number;
  nextTask: string;
  image: string;
}

interface CropCardProps {
  crop: Crop;
}

export default function CropCard({ crop }: CropCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'text-green-600 bg-green-50 border-green-100';
      case 'Needs Attention': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const daysRemaining = Math.max(0, Math.ceil((new Date(crop.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <Card className="flex flex-col h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      
      {/* Header Image Area */}
      <div className="relative h-48 w-full">
         <Image 
            src={crop.image} 
            alt={crop.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
         <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold tracking-tight">{crop.name}</h3>
            <p className="text-white/80 text-sm font-medium">{crop.variety}</p>
         </div>
         <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide backdrop-blur-md shadow-sm ${getStatusColor(crop.status)}`}>
            {crop.status}
         </div>
      </div>

      <CardContent className="flex-1 p-5 space-y-6">
         {/* Progress Section */}
         <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Growth Stage</span>
                <span className="text-green-600">{crop.progress}%</span>
            </div>
            <Progress value={crop.progress} className="h-2.5 bg-gray-100" indicatorClassName="bg-green-600" />
            <p className="text-xs text-gray-400 text-right">Harvest in approx {daysRemaining} days</p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-50">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Droplets size={16} />
                    <span className="text-xs font-bold uppercase">Moisture</span>
                </div>
                <p className="text-gray-900 font-semibold">Adequate</p>
                <p className="text-xs text-gray-400">Last watered 2d ago</p>
            </div>
             <div className="bg-green-50/50 p-3 rounded-xl border border-green-50">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                    <Sprout size={16} />
                    <span className="text-xs font-bold uppercase">Health</span>
                </div>
                <p className="text-gray-900 font-semibold">{crop.healthScore}/10</p>
                <p className="text-xs text-gray-400"> NDVI Index</p>
            </div>
         </div>

         {/* Next Task Alert */}
         <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="mt-0.5 bg-white p-1.5 rounded-lg shadow-sm border border-gray-100 text-orange-500">
                <AlertCircle size={18} />
            </div>
            <div>
                <p className="text-xs text-gray-400 font-medium uppercase mb-0.5">Next Activity</p>
                 <p className="text-sm font-semibold text-gray-800">{crop.nextTask}</p>
            </div>
         </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-gray-50 mt-auto">
         <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-green-700 hover:border-green-200 justify-between group-hover:border-green-300 transition-all">
            View Details
            <ArrowRight size={16} className="text-gray-400 group-hover:text-green-600 transition-colors" />
         </Button>
      </CardFooter>
    </Card>
  );
}
