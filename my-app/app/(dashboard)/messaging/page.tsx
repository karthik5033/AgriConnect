'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Video, MoreVertical, Paperclip, CheckCheck } from "lucide-react";

// Types matching our API
interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  users: { name: string; image: string | null }[];
  lastMessage: { content: string; createdAt: string; read: boolean };
}

export default function MessagingPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch Conversations on Load
  useEffect(() => {
    fetch('/api/conversations')
      .then(res => res.json())
      .then(data => {
        setConversations(data);
        if (data.length > 0) setSelectedChat(data[0].id);
      });
  }, []);

  // Fetch Messages when Chat Selected
  useEffect(() => {
    if (!selectedChat) return;
    
    // In a real app, fetch `/api/conversations/${selectedChat}`
    // For demo, we just hit the mock endpoint which ignores ID but returns structure
    fetch(`/api/conversations/${selectedChat}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Optimistic Update
    const tempMsg = {
        id: "temp_" + Date.now(),
        content: newMessage,
        senderId: "me",
        createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);
    setNewMessage("");

    // API Call
    await fetch(`/api/conversations/${selectedChat}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tempMsg.content })
    });
  };

  const activeUser = conversations.find(c => c.id === selectedChat)?.users[0];

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input placeholder="Search chats..." className="pl-9 bg-gray-100 border-0 focus-visible:ring-1" />
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
            {conversations.map(chat => (
                <div 
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-100 ${selectedChat === chat.id ? 'bg-white border-l-4 border-l-green-600 shadow-sm' : 'border-l-4 border-l-transparent'}`}
                >
                    <Avatar className="h-12 w-12 border border-gray-100">
                        <AvatarImage src={chat.users[0].image || undefined} />
                        <AvatarFallback>{chat.users[0].name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className={`font-semibold text-sm truncate ${selectedChat === chat.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                {chat.users[0].name}
                            </h3>
                            <span className="text-[10px] text-gray-400">
                                {new Date(chat.lastMessage.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className={`text-xs truncate ${!chat.lastMessage.read && selectedChat !== chat.id ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                            {chat.lastMessage.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedChat ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={activeUser?.image || undefined} />
                        <AvatarFallback>{activeUser?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-gray-900">{activeUser?.name}</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                            <span className="text-xs text-gray-500">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600"><Phone size={20} /></Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600"><Video size={20} /></Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></Button>
                </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                {messages.map((msg) => {
                    const isMe = msg.senderId === 'me';
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm relative group ${
                                isMe 
                                ? 'bg-green-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                            }`}>
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-green-100' : 'text-gray-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    {isMe && <CheckCheck size={12} />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-100 transition-all">
                    <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 rounded-full h-10 w-10">
                        <Paperclip size={20} />
                    </Button>
                    <Input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..." 
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 shadow-none px-2" 
                    />
                    <Button 
                        type="submit" 
                        size="icon" 
                        className={`rounded-full h-10 w-10 transition-all ${newMessage.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 text-gray-400'}`}
                        disabled={!newMessage.trim()}
                    >
                        <Send size={18} className={newMessage.trim() ? 'ml-0.5' : ''} />
                    </Button>
                </form>
            </div>
          </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col text-gray-400 bg-gray-50/30">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Send size={32} className="opacity-20" />
             </div>
             <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}
