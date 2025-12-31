'use client';

import Link from "next/link";
import { Bell, Search, MessageSquare, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardNavbar() {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
            <Link href="/feed" className="flex items-center gap-2 group">
              <span className="text-2xl transition-transform group-hover:rotate-12">🌱</span>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Agri<span className="text-green-600">Connect</span>
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-12">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:bg-white focus:ring-0 transition-all rounded-lg h-9"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-white hover:ring-green-100 transition-all">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback className="bg-green-600 text-white text-xs">RK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
