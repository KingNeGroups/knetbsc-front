import { useState, useEffect } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { ContributeSection } from "@/components/ContributeSection";
import { IdoStats } from "@/components/IdoStats";
import { ProjectInfo } from "@/components/ProjectInfo";
import { toast } from "sonner";
import { LogOut, Sparkles, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
import banner from "@/assets/img/floa/banner.png";
import solgenLogo from "@/assets/img/floa/solgen+logo.png";
import { Partners } from "@/components/Partners";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [userContribution, setUserContribution] = useState("0");
  const [totalRaised, setTotalRaised] = useState("0");
  const targetAmount = "30000";

  // Simulated contribution handler
  const handleContribute = (amount: string) => {
    // In a real implementation, this would interact with the smart contract
    const newUserContribution = (parseFloat(userContribution) + parseFloat(amount)).toString();
    const newTotalRaised = (parseFloat(totalRaised) + parseFloat(amount)).toString();

    setUserContribution(newUserContribution);
    setTotalRaised(newTotalRaised);

    toast.success(`Successfully contributed ${amount} KNET!`, {
      description: `Your total contribution: ${newUserContribution} KNET`,
    });
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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
      <header className="relative z-10 border-b border-blue-500/20 backdrop-blur-2xl bg-black/60">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse" />
                <img
                  src={logo}
                  alt="KINGNET AI Logo"
                  className="relative h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                />
              </div>
             
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://app.transporter.io/?from=solana&tab=token&to=bsc&token=KNET"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white bg-blue-900/20 hover:bg-blue-800/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="uppercase tracking-wider text-xs">Bridge</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {isConnected ? (
                <>
                  <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-50" />
                    </div>
                    <span className="text-sm font-mono font-medium text-blue-300">{formatAddress(address!)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnect()}
                    className="border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 backdrop-blur-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Disconnect</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => open()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 rounded-xl px-8 py-4 text-sm font-semibold hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Futuristic Main content */}
      <main className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Revolutionary Hero Section */}
          <div className="text-center space-y-8 animate-slide-in relative">
            {/* Holographic background effect with banner */}
            <div className="absolute inset-0 -m-20">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 rounded-3xl"
                style={{ backgroundImage: `url(${banner})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-cyan-600/20 rounded-3xl blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
            </div>

            <div className="relative space-y-8">
              {/* Status badges */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full border border-green-500/30 backdrop-blur-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 font-medium text-sm uppercase tracking-wider">Live IDO</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-blue-300 font-medium text-sm">KingNet AI Network</span>
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
              </div>

              {/* Main headline */}
              <div className="space-y-4">
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                      On-Chain AI
                    </span>
                  </div>
                  <div className="text-5xl md:text-6xl lg:text-7xl text-gray-200 font-bold">
                    <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                      Intelligence
                    </span>
                  </div>
                </h2>
                <div className="text-3xl md:text-4xl lg:text-5xl text-gray-300 font-medium">
                  Powered by <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent font-bold">KingNet AI</span>
                </div>
              </div>

              {/* Enhanced description */}
              <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                  Experience the future of decentralized artificial intelligence
                  <br className="hidden md:block" />
                  Join the <span className="text-blue-400 font-semibold">intelligent agent revolution</span> on blockchain
                </p>
                <div className="flex flex-wrap gap-3 justify-center items-center text-sm text-gray-500">
                  <span className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-300">• Train AI Agents</span>
                  <span className="px-3 py-1 bg-purple-900/30 rounded-full text-purple-300">• Join IDO</span>
                  <span className="px-3 py-1 bg-cyan-900/30 rounded-full text-cyan-300">• Earn KNET Rewards</span>
                </div>
              </div>

              {/* Futuristic CTA section */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <a
                  href="https://floahive.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="relative uppercase tracking-wider">Explore Ecosystem</span>
                  <ExternalLink className="relative w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <div className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                  </div>
                  <span className="text-gray-300 font-medium uppercase tracking-wider text-sm">Now Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section with enhanced design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl blur-2xl" />
            <IdoStats
              targetAmount={targetAmount}
            />
          </div>

          {/* Revolutionary two column layout with enhanced design */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
            <div className="space-y-12 relative">
              {/* Background accent for left column */}
              <div className="absolute -inset-8 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-3xl blur-2xl" />
              <div className="relative">
                <ContributeSection onContribute={handleContribute} />
              </div>
            </div>
            <div className="space-y-12 relative">
              {/* Background accent for right column */}
              <div className="absolute -inset-8 bg-gradient-to-bl from-purple-900/10 to-cyan-900/10 rounded-3xl blur-2xl" />
              <div className="relative">
                <ProjectInfo />
              </div>
            </div>
          </div>

          {/* Featured Showcase Section */}
          <div className="relative animate-slide-in" style={{ animationDelay: "0.6s" }}>
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
          </div>
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
