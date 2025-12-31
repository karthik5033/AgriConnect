'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star, Calendar, Clock, DollarSign, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Equipment {
  id: string;
  name: string;
  type: string;
  image: string;
  rateRaw: number;
  rateUnit: 'hour' | 'day';
  location: string;
  rating: number;
  reviews: number;
  owner: {
    name: string;
    image?: string;
    isVerified: boolean;
  };
  availability: 'Available' | 'Booked';
}

interface EquipmentCardProps {
  item: Equipment;
}

export default function EquipmentCard({ item }: EquipmentCardProps) {
  return (
    <Card className="glass-card overflow-hidden group hover:border-green-200 transition-all duration-300 flex flex-col h-full">
      {/* Image Area */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
         <Image 
            src={item.image} 
            alt={item.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
         />
         <div className="absolute top-3 left-3">
             <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm border-0 font-medium">
                {item.type}
             </Badge>
         </div>
         <div className="absolute top-3 right-3">
             <Badge className={item.availability === 'Available' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}>
                {item.availability}
             </Badge>
         </div>
      </div>

      <CardContent className="p-4 pt-5 flex-1">
         <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-green-700 transition-colors">
                    {item.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin size={14} />
                    {item.location}
                </div>
            </div>
            <div className="text-right">
                <div className="text-lg font-bold text-green-700 flex items-center justify-end">
                    ₹{item.rateRaw}
                    <span className="text-xs text-gray-500 font-normal ml-1">/{item.rateUnit}</span>
                </div>
                <div className="flex items-center justify-end gap-1 text-xs text-amber-500 font-medium mt-0.5">
                    <Star size={12} fill="currentColor" />
                    {item.rating} ({item.reviews})
                </div>
            </div>
         </div>

         <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-gray-100">
                    <AvatarImage src={item.owner.image} />
                    <AvatarFallback className="text-xs">{item.owner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Owner</span>
                    <span className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                        {item.owner.name}
                        {item.owner.isVerified && <ShieldCheck size={12} className="text-blue-500" />}
                    </span>
                </div>
            </div>
         </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-gray-900 hover:bg-green-600 text-white transition-colors">
            Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
