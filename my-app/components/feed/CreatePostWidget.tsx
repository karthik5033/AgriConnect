'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreatePostModal from '@/components/forms/CreatePostModal';
import { Image as ImageIcon, Calendar, Newspaper } from 'lucide-react';

export default function CreatePostWidget() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-6">
      <div className="flex gap-4 mb-3">
        <Avatar className="w-12 h-12 border border-gray-100">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <CreatePostModal 
            trigger={
                <button className="flex-1 text-left bg-gray-100/80 hover:bg-gray-100 text-gray-500 font-medium rounded-full px-5 h-12 border border-transparent hover:border-gray-200 transition-all">
                    Start a post, share a crop update...
                </button>
            }
        />
      </div>

      <div className="flex items-center justify-between pt-2 px-2">
        <CreatePostModal 
            trigger={
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors">
                    <ImageIcon size={20} className="text-blue-500" />
                    <span className="text-sm font-medium">Media</span>
                </button>
            }
        />
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors">
            <Calendar size={20} className="text-amber-600" />
            <span className="text-sm font-medium">Event</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors">
            <Newspaper size={20} className="text-orange-600" />
            <span className="text-sm font-medium">Article</span>
        </button>
      </div>
    </div>
  );
}
