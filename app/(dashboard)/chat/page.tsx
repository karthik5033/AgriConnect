'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        AI Assistant
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        Our intelligent farming assistant is currently being upgraded. Check back soon for AI-powered insights!
      </p>
      <div className="animate-pulse flex gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full delay-75"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full delay-150"></div>
      </div>
    </div>
  );
}
