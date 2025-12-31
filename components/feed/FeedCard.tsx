'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal, Sprout, Send, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { likePost, commentOnPost } from '@/actions/post.actions';

// Types
interface User {
  id: string;
  name: string | null;
  image: string | null;
  role: string | null;
}

interface CommentAuthor {
  id: string;
  name: string | null;
  image: string | null;
}

interface Comment {
    id: string;
    content: string;
    author: CommentAuthor;
    createdAt: string | Date;
}

interface Like {
  userId: string;
}

interface Post {
  id: string;
  content: string;
  createdAt: string | Date;
  author: User;
  images?: string[];
  cropName?: string;
  comments?: Comment[];
  likes?: Like[];
}

interface FeedCardProps {
  post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
      const isLiked = !liked;
      setLiked(isLiked);
      setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
      
      await likePost(post.id);
  };

  const handleShare = () => {
      navigator.clipboard.writeText(window.location.origin + `/post/${post.id}`);
      // Toast notification would go here
  };

  const handlePostComment = async () => {
      if (!commentText.trim()) return;
      
      const text = commentText;
      setCommentText(""); // Clear input immediately
      
      // Optimistic update could happen here, but we'll wait for server for comment ID
      const result = await commentOnPost(post.id, text);
      
      if (result.success && result.comment) {
        // Add the real comment from server (with correct ID/timestamp)
        setComments(prev => [result.comment!, ...prev]);
        if (!showComments) setShowComments(true);
      } else {
          // Revert if failed (add toast ideally)
          setCommentText(text);
      }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
        <Card className="glass-card mb-4 border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-start gap-4 p-4 pb-2">
            <Avatar className="w-12 h-12 border border-gray-100 cursor-pointer hover:opacity-90">
            <AvatarImage src={post.author.image || ''} alt={post.author.name || 'User'} />
            <AvatarFallback className="bg-green-600 text-white font-medium">
                {post.author.name?.[0] || 'U'}
            </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-gray-900 text-[15px] hover:text-green-700 transition-colors cursor-pointer truncate">
                            {post.author.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                            {post.author.role ? post.author.role.charAt(0) + post.author.role.slice(1).toLowerCase() : 'Member'}
                            {post.cropName && (
                                <> • <span className="text-green-700 font-medium">{post.cropName}</span></>
                            )}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-full">
                        <MoreHorizontal size={18} />
                    </Button>
                </div>
            </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-1 pb-2">
            <p className="text-gray-800 whitespace-pre-wrap text-[15px] leading-relaxed mb-3 font-normal">
            {post.content}
            </p>
            
            {post.images && post.images.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mt-3 group cursor-pointer">
                <div className="relative w-full aspect-video bg-gray-50 overflow-hidden">
                <Image 
                    src={post.images[0]} 
                    alt="Post content" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                </div>
            </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400 border-b border-gray-50 pb-2">
                <div className="flex items-center gap-1">
                    {likesCount > 0 && (
                    <motion.div 
                        key={likesCount}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1"
                    >
                        <div className="bg-green-100 p-1 rounded-full"><ThumbsUp size={10} className="text-green-600 fill-green-600" /></div>
                        <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
                    </motion.div>
                    )}
                </div>
                <div className="flex gap-3">
                    <span className="hover:underline cursor-pointer" onClick={() => setShowComments(!showComments)}>
                        {comments.length} comments
                    </span>
                    <span className="hover:underline cursor-pointer">Share</span>
                </div>
            </div>
        </CardContent>

        <CardFooter className="px-2 py-1 pb-2 flex flex-col gap-2">
            {/* Action Buttons */}
            <div className="flex items-center justify-between w-full">
                <motion.div whileTap={{ scale: 0.9 }}>
                <Button 
                    variant="ghost" 
                    onClick={handleLike}
                    className={`flex-1 gap-2 hover:bg-gray-50 h-10 rounded-lg transition-colors min-w-[100px] ${liked ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
                <span className="text-sm font-medium">Like</span>
                </Button>
                </motion.div>
                
                <Button 
                    variant="ghost" 
                    onClick={() => setShowComments(!showComments)}
                    className="flex-1 gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-10 rounded-lg"
                >
                <MessageSquare size={18} />
                <span className="text-sm font-medium">Comment</span>
                </Button>
                
                <Button 
                    variant="ghost" 
                    onClick={handleShare}
                    className="flex-1 gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-10 rounded-lg"
                >
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
                </Button>
            </div>

            {/* Comment Section (Collapsible) */}
            <AnimatePresence>
                {showComments && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full overflow-hidden"
                    >
                        {/* Comment Input */}
                        <div className="flex items-center gap-3 p-2 bg-gray-50/50 rounded-xl mb-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>Me</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 relative flex gap-2">
                                <Input 
                                    placeholder="Write a comment..." 
                                    className="h-9 bg-white border-gray-200 focus:bg-white transition-all rounded-full text-sm"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                                />
                                <Button 
                                    size="icon" 
                                    className="h-9 w-9 bg-green-600 hover:bg-green-700 text-white rounded-full shrink-0"
                                    disabled={!commentText.trim()}
                                    onClick={handlePostComment}
                                >
                                    <Send size={15} />
                                </Button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-3 px-2 pb-2 pl-4 border-l-2 border-gray-100 ml-4">
                            {comments.map((comment) => (
                                <motion.div 
                                    key={comment.id} 
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 border border-gray-200">
                                        {comment.author[0]}
                                    </div>
                                    <div className="bg-gray-50 p-2.5 rounded-r-xl rounded-bl-xl text-sm min-w-[200px]">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="font-semibold text-gray-900 text-xs">{comment.author}</span>
                                            <span className="text-[10px] text-gray-400">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-700 leading-snug">{comment.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CardFooter>
        </Card>
    </motion.div>
  );
}
