'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, UserPlus, Info, Check, PackageOpen } from "lucide-react";
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'SYSTEM' | 'ORDER_UPDATE';
  content: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      });
  }, []);

  const markAsRead = async (id: string) => {
    // Optimistic update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    
    await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
  };

  const markAllRead = () => {
      setNotifications(prev => prev.map(n => ({...n, read: true})));
      // Call API to mark all
  };

  const getIcon = (type: string) => {
    switch (type) {
        case 'LIKE': return <Heart className="text-pink-500 fill-pink-500" size={18} />;
        case 'COMMENT': return <MessageCircle className="text-blue-500 fill-blue-50" size={18} />;
        case 'FOLLOW': return <UserPlus className="text-green-500" size={18} />;
        case 'ORDER_UPDATE': return <PackageOpen className="text-orange-500" size={18} />;
        default: return <Info className="text-gray-500" size={18} />;
    }
  };

  if (loading) {
      return (
          <div className="max-w-2xl mx-auto pt-10 text-center text-gray-400">
              Loading notifications...
          </div>
      );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-500">You have {unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" onClick={markAllRead} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                Mark all as read
            </Button>
          )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">No notifications yet</p>
            </div>
        ) : (
            notifications.map((notification) => (
                <div 
                    key={notification.id} 
                    className={`relative p-5 rounded-xl border transition-all duration-200 flex gap-4 items-start group
                    ${notification.read ? 'bg-white border-gray-100' : 'bg-green-50/40 border-green-100 shadow-sm'}`}
                >
                    <div className="mt-1 p-2 rounded-full bg-white border border-gray-100 shadow-sm">
                        {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                        <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                            {notification.content}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>{new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            {notification.link && (
                                <Link href={notification.link} className="text-green-600 hover:underline font-medium">
                                    View Details
                                </Link>
                            )}
                        </div>
                    </div>

                    {!notification.read && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                        >
                            <Check size={16} />
                        </Button>
                    )}
                </div>
            ))
        )}
      </div>
    </div>
  );
}
