import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { FloaIdoFusion } from "@/components/FloaIdoFusion";
import { Sparkles, ExternalLink } from "lucide-react";
import { FuturisticHeader } from "@/components/FuturisticHeader";
import banner from "@/assets/img/floa/banner.png";
import solgenLogo from "@/assets/img/floa/solgen+logo.png";
import { Partners } from "@/components/Partners";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  
  
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Futuristic animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-600/40 via-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-600/30 via-blue-600/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/60 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-cyan-400/60 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-blue-300/60 rounded-full animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-purple-300/60 rounded-full animate-float" style={{ animationDelay: "4s" }} />

        {/* Neural network lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path d="M100,100 Q300,200 500,100 T900,200" stroke="url(#neuralGradient)" strokeWidth="0.5" fill="none" className="animate-pulse" />
          <path d="M200,50 Q400,150 600,50 T1000,150" stroke="url(#neuralGradient)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{ animationDelay: "1s" }} />
        </svg>
      </div>

      {/* Futuristic Header */}
      <FuturisticHeader />

      {/* Futuristic Main content */}
      <main className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Stats Section with enhanced design */}
          {/* <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl blur-2xl" />
            <IdoStats
              targetAmount={targetAmount}
            />
          </div> */}

          {/* Revolutionary fusion layout with organic design */}
          <FloaIdoFusion />

          {/* Featured Showcase Section */}
          {/* <div className="relative animate-slide-in" style={{ animationDelay: "0.6s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 rounded-3xl blur-2xl" />
            <div className="relative border border-blue-500/30 rounded-3xl p-12 backdrop-blur-xl bg-black/40">
              <div className="text-center space-y-8">
               

                <h2 className="text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                   Ecosystem Partners
                  </span>
                </h2>

              
                 <Partners/>
              </div>
            </div>
          </div> */}
        </div>
      </main>
      {/* Partners */}
     
      {/* Footer */}
      {/* <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Floa. All rights reserved.</p>
            <p className="mt-2">Powered by BSC Chain</p>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
};

export default Index;
