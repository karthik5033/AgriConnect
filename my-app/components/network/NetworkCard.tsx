'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, UserPlus, Users } from "lucide-react";

interface NetworkUser {
  id: string;
  name: string;
  role: string;
  location: string;
  image?: string;
  specialty?: string;
  mutual?: number;
}

interface NetworkCardProps {
  user: NetworkUser;
}

export default function NetworkCard({ user }: NetworkCardProps) {
  return (
    <Card className="flex flex-col h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden relative group">
      {/* Banner */}
      <div className="h-16 bg-gradient-to-r from-slate-100 to-slate-200 relative">
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>
      
      <CardContent className="flex-1 flex flex-col items-center pt-0 px-4 pb-2 text-center relative">
        <div className="-mt-10 mb-3 relative">
            <Avatar className="h-20 w-20 border-4 border-white shadow-sm bg-white">
                <AvatarImage src={user.image} className="object-cover" />
                <AvatarFallback className="bg-slate-100 text-slate-600 font-semibold text-xl">
                    {user.name[0]}
                </AvatarFallback>
            </Avatar>
        </div>

        <h3 className="font-semibold text-gray-900 text-base mb-0.5 line-clamp-1 hover:underline cursor-pointer decoration-slate-400">
            {user.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1 font-medium">{user.role}</p>
        
        <div className="text-xs text-gray-500 mb-4 space-y-1">
             {user.specialty && (
                <p className="line-clamp-1">{user.specialty}</p>
             )}
             <div className="flex items-center justify-center gap-1 text-gray-400">
                <MapPin size={12} />
                <span>{user.location}</span>
             </div>
        </div>

        {user.mutual && user.mutual > 0 && (
            <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-500 py-2">
                <Users size={12} className="text-gray-400" />
                <span>{user.mutual} mutual connections</span>
            </div>
        )}
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 font-medium h-8 rounded-full text-xs">
            Connect
        </Button>
      </CardFooter>
      
      {/* Close button usually X specific, but keeping it clean for now */}
    </Card>
  );
}
