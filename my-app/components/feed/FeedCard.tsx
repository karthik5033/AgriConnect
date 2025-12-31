'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal, Sprout } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

// Types (Ideally move to types/index.ts)
interface User {
  id: string;
  name: string | null;
  image: string | null;
  role: string | null; // "FARMER" | "STUDENT" etc.
}

interface Post {
  id: string;
  content: string;
  createdAt: string | Date;
  author: User;
  images?: string[];
  likesCount?: number;
  commentsCount?: number;
  cropName?: string;
  growthStage?: string;
}

interface FeedCardProps {
  post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
  return (
    <Card className="glass-card mb-4 border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 p-5 pb-3">
        <Avatar className="w-11 h-11 border border-gray-100">
          <AvatarImage src={post.author.image || ''} alt={post.author.name || 'User'} />
          <AvatarFallback className="bg-green-600 text-white font-medium">
            {post.author.name?.[0] || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-900 text-[15px] hover:text-green-700 transition-colors cursor-pointer">
                {post.author.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                 <span className="font-medium">
                    {post.author.role ? post.author.role.charAt(0) + post.author.role.slice(1).toLowerCase() : 'Member'}
                 </span>
                 {post.cropName && (
                   <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                     <Sprout size={10} /> {post.cropName}
                   </span>
                 )}
                 <span>• {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
             <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                <MoreHorizontal size={18} />
             </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 pt-1">
        <p className="text-gray-700 whitespace-pre-wrap text-[15px] leading-relaxed mb-4 font-normal">
          {post.content}
        </p>
        
        {post.images && post.images.length > 0 && (
          <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mt-2">
             <div className="relative w-full h-[320px] bg-gray-50">
               <Image 
                 src={post.images[0]} 
                 alt="Post content" 
                 fill 
                 className="object-cover"
               />
             </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-2 py-1 border-t border-gray-50 grid grid-cols-3 gap-1">
        <Button variant="ghost" className="w-full text-gray-500 hover:text-green-600 hover:bg-green-50/50 py-4 h-auto rounded-xl">
          <ThumbsUp size={18} className="mr-2" />
          <span className="text-sm font-medium">Like</span>
        </Button>
        <Button variant="ghost" className="w-full text-gray-500 hover:text-green-600 hover:bg-green-50/50 py-4 h-auto rounded-xl">
          <MessageSquare size={18} className="mr-2" />
          <span className="text-sm font-medium">Comment</span>
        </Button>
        <Button variant="ghost" className="w-full text-gray-500 hover:text-green-600 hover:bg-green-50/50 py-4 h-auto rounded-xl">
          <Share2 size={18} className="mr-2" />
          <span className="text-sm font-medium">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
