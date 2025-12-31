'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bell, Search, MessageSquare, Menu, X, LogOut, User, Settings, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { globalSearch, SearchResult } from "@/actions/search.actions";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DashboardNavbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notifications, setNotifications] = useState([
      { id: 1, text: "Dr. R.K. Gupta liked your post", time: "2m ago", read: false },
      { id: 2, text: "New connection request from Ravi", time: "1h ago", read: false },
      { id: 3, text: "Market update: Wheat prices up", time: "3h ago", read: true },
  ]);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Search Effect
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
        if (query.length >= 2) {
            setIsSearching(true);
            const data = await globalSearch(query);
            setResults(data);
            setIsSearching(false);
        } else {
            setResults([]);
        }
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleClearNotifications = () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
            <Link href="/feed" className="flex items-center gap-2 group">
              <motion.span 
                className="text-2xl"
                whileHover={{ rotate: 20 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                  🌱
              </motion.span>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Agri<span className="text-green-600">Connect</span>
              </span>
            </Link>
          </div>

          {/* Search Bar - Central */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full group">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${isSearching ? 'text-green-600 animate-pulse' : 'text-gray-400 group-focus-within:text-green-600'}`} />
              <Input
                placeholder="Search farmers, crops, posts..."
                className="pl-10 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all rounded-full h-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                  </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {(results.length > 0 || (query.length >=2 && isSearching)) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                    >
                        {isSearching ? (
                            <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                        ) : results.length > 0 ? (
                            results.map(result => (
                                <div 
                                    key={result.type + result.id}
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                                    onClick={() => {
                                        setQuery(''); 
                                        setResults([]);
                                        // router.push(result.url); // Use router if pages existed
                                        alert(`Navigating to ${result.type}: ${result.title}`);
                                    }}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={result.image} />
                                        <AvatarFallback>{result.title[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                                        <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors">
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-green-50 hover:text-green-700 relative transition-colors">
                        <Bell className="h-5 w-5" />
                        {notifications.some(n => !n.read) && (
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h4 className="font-semibold text-sm">Notifications</h4>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-green-600 hover:text-green-700" onClick={handleClearNotifications}>
                            Mark all read
                        </Button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                        {notifications.map(n => (
                            <div key={n.id} className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? 'bg-green-50/30' : ''}`}>
                                <div className="flex gap-3">
                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!n.read ? 'bg-green-500' : 'bg-transparent'}`} />
                                    <div>
                                        <p className={`text-sm ${!n.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                                            {n.text}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-green-200 transition-all select-none">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60" />
                        <AvatarFallback className="bg-green-600 text-white text-xs">RK</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Rajesh Kumar</p>
                            <p className="text-xs leading-none text-muted-foreground">rajesh@example.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile/create">
                      <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Create Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
