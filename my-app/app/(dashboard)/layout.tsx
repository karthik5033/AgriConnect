import AppSidebar from "@/components/layout/AppSidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="flex">
        {/* Sidebar - Desktop */}
        <AppSidebar />
        
        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           {children}
        </main>

        {/* Right Sidebar (Optional - Trending/Suggestions) */}
        <div className="hidden xl:block w-80 p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto space-y-6">
           <div className="glass-card p-5 border border-gray-100/50 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Trending Crops</h3>
              <div className="space-y-4">
                  {['#WheatHarvest', '#OrganicFarming', '#DronesInAgri', '#MSPUpdate'].map(tag => (
                      <div key={tag} className="group cursor-pointer">
                          <div className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
                              {tag}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">2.4k posts</p>
                      </div>
                  ))}
              </div>
              <Button variant="link" className="w-full mt-2 text-green-600 text-xs p-0 h-auto font-medium hover:no-underline hover:text-green-700">
                  Show more
              </Button>
           </div>

           <div className="glass-card p-5 border border-gray-100/50 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">Who to follow</h3>
              <div className="space-y-4">
                  {[
                    { name: "AgriCorp Ltd", type: "Company", initials: "AC", color: "bg-blue-100 text-blue-700" },
                    { name: "Dr. Swaminathan", type: "Expert", initials: "DS", color: "bg-green-100 text-green-700" },
                    { name: "Punjab Kissan Union", type: "Organization", initials: "PK", color: "bg-yellow-100 text-yellow-700" },
                    { name: "Organic India", type: "Brand", initials: "OI", color: "bg-emerald-100 text-emerald-700" },
                    { name: "Mahindra Tractors", type: "Brand", initials: "MT", color: "bg-red-100 text-red-700" },
                    { name: "IARI Delhi", type: "Institute", initials: "IA", color: "bg-indigo-100 text-indigo-700" },
                    { name: "Kisan Call Center", type: "Service", initials: "KC", color: "bg-orange-100 text-orange-700" },
                    { name: "Ravi's Hydroponics", type: "Farmer", initials: "RH", color: "bg-teal-100 text-teal-700" },
                    { name: "Soil Health Labs", type: "Service", initials: "SH", color: "bg-gray-100 text-gray-700" },
                    { name: "Sustain NGO", type: "Organization", initials: "SN", color: "bg-lime-100 text-lime-700" },
                  ].map((acc, i) => (
                      <div key={i} className="flex items-center gap-3 group cursor-pointer">
                          <div className={`w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-black/5 transition-all flex items-center justify-center text-xs font-bold ${acc.color}`}>
                             {acc.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-gray-900 truncate">{acc.name}</h4>
                              <p className="text-xs text-gray-500 truncate">{acc.type}</p>
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs font-medium text-green-700 bg-green-50 border-green-100 hover:bg-green-100 hover:text-green-800 rounded-full px-3 shadow-none">
                              Follow
                          </Button>
                      </div>
                  ))}
              </div>
           </div>
           
           <div className="text-xs text-gray-400 px-2 leading-relaxed">
              © 2025 AgriConnect Inc. • Privacy • Terms • Cookies
           </div>
        </div>
      </div>
    </div>
  );
}
