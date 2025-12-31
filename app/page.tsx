import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Users, Tractor, BarChart3, CheckCircle2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  
  // If authenticated, redirect to dashboard/feed
  if (session?.user) {
    redirect("/feed");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Leaf className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">AgriConnect</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-green-700 transition-colors">Features</Link>
            <Link href="#network" className="hover:text-green-700 transition-colors">Network</Link>
            <Link href="#marketplace" className="hover:text-green-700 transition-colors">Marketplace</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-green-700 font-medium">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/20 rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Global Agricultural Network Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl">
          The Professional Network for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Modern Agriculture</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Connect with experts, rent advanced machinery, and track real-time crop health. Join the platform empowering millions of farmers worldwide.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/feed">
            <Button size="lg" className="h-14 px-8 text-lg bg-gray-900 hover:bg-gray-800 text-white rounded-full gap-2 shadow-xl hover:shadow-2xl transition-all">
              Join the Network <ArrowRight size={20} />
            </Button>
          </Link>
          <Link href="/equipment">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full">
              View Marketplace
            </Button>
          </Link>
        </div>

        {/* Hero Image / Stats */}
        <div className="mt-20 w-full relative">
           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { label: "Active Farmers", value: "2.4M+", icon: Users },
                { label: "Equipment Listed", value: "15k+", icon: Tractor },
                { label: "Successful Harvests", value: "98%", icon: CheckCircle2 },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center">
                   <div className="bg-green-50 p-3 rounded-full mb-4">
                     <stat.icon className="text-green-700" size={24} />
                   </div>
                   <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                   <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to grow</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From connecting with buyers to renting heavy machinery, AgriConnect brings the entire agricultural ecosystem to your fingertips.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <FeatureCard 
               icon={<Users className="text-blue-600" size={24} />}
               title="Professional Network"
               desc="Connect with agronomists, fellow farmers, and potential buyers. Share insights and troubleshoot issues together."
               color="bg-blue-50"
             />
             <FeatureCard 
               icon={<Tractor className="text-orange-600" size={24} />}
               title="Equipment Rental"
               desc="Don't let expensive machinery sit idle. Rent tractors and harvesters on-demand or list yours to earn extra income."
               color="bg-orange-50"
             />
             <FeatureCard 
               icon={<BarChart3 className="text-green-600" size={24} />}
               title="Smart Monitoring"
               desc="Track crop health, soil moisture, and weather patterns with our AI-driven dashboard to maximize yields."
               color="bg-green-50"
             />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1.5 rounded-lg">
              <Leaf className="text-gray-900" size={18} />
            </div>
            <span className="font-bold text-lg text-gray-900">AgriConnect</span>
           </div>
           <div className="text-gray-500 text-sm">
             © 2025 AgriConnect Inc. All rights reserved.
           </div>
           <div className="flex gap-6 text-sm text-gray-500">
             <a href="#" className="hover:text-gray-900">Privacy</a>
             <a href="#" className="hover:text-gray-900">Terms</a>
             <a href="#" className="hover:text-gray-900">Contact</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}
