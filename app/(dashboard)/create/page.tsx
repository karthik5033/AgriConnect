'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function CreatePostPage() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!text && !image) {
      setError("Please provide text or an image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Post upload failed");
      }

      router.push("/");
      router.refresh(); // Refresh to show new post
    } catch (e) {
      console.error("Post creation failed:", e);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Post</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Text Area */}
          <div>
            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening in your agricultural world?"
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none text-lg placeholder-gray-400"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden group">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full max-h-[400px] object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-green-500 transition-colors group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400 group-hover:text-green-500 transition-colors" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4">
             <div className="flex gap-2">
                 <button type="button" className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                    <ImageIcon size={24} />
                 </button>
             </div>
             
             <div className="flex gap-3">
                 <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:hover:text-gray-300"
                 >
                    Cancel
                 </button>
                 <button
                    type="submit"
                    disabled={loading || (!text && !image)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                 >
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? 'Posting...' : 'Post'}
                 </button>
             </div>
          </div>

        </form>
      </div>
    </div>
  );
}
