'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  MessageSquare, 
  Bell, 
  Briefcase, 
  Settings, 
  LogOut, 
  Sprout,
  Tractor
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/feed" },
  { icon: Users, label: "Network", href: "/network" },
  { icon: Sprout, label: "My Crops", href: "/crops" }, 
  { icon: Tractor, label: "Equipment", href: "/equipment" },
  { icon: MessageSquare, label: "Messaging", href: "/messaging" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-gray-100 bg-white pt-20 px-4 pb-4">
      
      {/* User Mini Profile */}
      <div className="flex items-center gap-3 p-3 mb-6 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
        <Avatar className="h-10 w-10 ring-2 ring-gray-100 group-hover:ring-green-100 transition-all">
             <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
             <AvatarFallback className="bg-gray-100 text-gray-700 font-medium">RK</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
            <h4 className="font-semibold text-sm truncate text-gray-900">Rajesh Kumar</h4>
            <p className="text-xs text-gray-500 truncate">Farmer • Punjab</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-gray-500 font-medium h-10 px-4 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-green-600 text-white shadow-sm hover:bg-green-700 hover:text-white" 
                    : "hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={18} className={cn(isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600")} />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            <Settings size={18} />
            Settings
        </Button>
      </div>
    </div>
  );
}
