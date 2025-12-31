'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
  trigger?: React.ReactNode;
}

export default function CreatePostModal({ trigger }: CreatePostModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [content, setContent] = useState('');
  const [crop, setCrop] = useState('');
  const [type, setType] = useState('PLANTATION_UPDATE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Post content cannot be empty');
      return;
    }
    
    setLoading(true);
    
    try {
        const { createPost } = await import("@/actions/post.actions");
        const { getServerSession } = await import("next-auth");
        const { authOptions } = await import("@/lib/auth");
        
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
          alert("Please log in to create a post");
          setLoading(false);
          return;
        }

        const result = await createPost({
          authorId: session.user.id,
          content,
          cropName: crop || undefined,
          type,
        });

        if (result.success) {
          setIsOpen(false);
          setContent("");
          setCrop("");
          setType('PLANTATION_UPDATE');
        } else {
          alert(result.error || 'Failed to create post');
        }
    } catch (error) {
        console.error("Failed to post", error);
        alert("Failed to create post. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : (
            <Button className="w-full justify-start text-gray-500 bg-gray-100 hover:bg-gray-200 border-none justify-items-start pl-4 rounded-full h-12">
                Start a post, share a crop update...
            </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
            {/* Type Selection */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['PLANTATION_UPDATE', 'QUESTION', 'HARVEST'].map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition ${type === t ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-500'}`}
                    >
                        {t.replace('_', ' ')}
                    </button>
                ))}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="content">Update Details</Label>
                <Textarea 
                    id="content" 
                    placeholder="Describe your crop progress, pest issue, or harvest result..." 
                    className="min-h-[120px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="crop">Crop Name</Label>
                    <Input 
                        id="crop" 
                        placeholder="e.g. Rice, Wheat" 
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="stage">Growth Stage</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sowing">Sowing</SelectItem>
                            <SelectItem value="vegetative">Vegetative</SelectItem>
                            <SelectItem value="flowering">Flowering</SelectItem>
                            <SelectItem value="harvesting">Harvesting</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Media Upload Placeholder */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition cursor-pointer">
                <ImageIcon className="h-8 w-8 mb-2" />
                <span className="text-sm">Add photos or videos</span>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Post Update
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
