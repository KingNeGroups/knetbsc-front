import { useState, useEffect } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { ContributeSection } from "@/components/ContributeSection";
import { IdoStats } from "@/components/IdoStats";
import { ProjectInfo } from "@/components/ProjectInfo";
import { toast } from "sonner";
import { Wallet, LogOut, Sparkles, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-radial from-primary/30 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-radial from-secondary/25 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-2/3 left-1/3 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: "5s" }} />
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 border-b border-border/30 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="KINGNET AI Logo"
                  className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_20px_var(--primary)]"
                />
                <div className="absolute -inset-2 bg-gradient-primary opacity-20 blur-xl rounded-full animate-glow" />
              </div>
             
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://app.transporter.io/?from=solana&tab=token&to=bsc&token=KNET"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-card border border-border/30 rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="text-xs uppercase tracking-wider opacity-70">Bridge</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {isConnected ? (
                <>
                  <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 backdrop-blur-sm">
                    <div className="relative">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping" />
                    </div>
                    <span className="text-sm font-mono font-medium text-primary">{formatAddress(address!)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnect()}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Disconnect</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => open()}
                  className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 rounded-xl px-6 py-3 text-sm font-semibold hover:scale-105 hover:shadow-xl"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Enhanced Hero section - KingNet AI Branding */}
          <div className="text-center space-y-6 animate-slide-in mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-3xl" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 backdrop-blur-sm text-sm text-primary font-medium mx-auto mb-4">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>KingNet AI - Intelligent Agent Network</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>

              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <div className="mb-2">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-shimmer">
                    On-Chain AI Agents
                  </span>
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl text-foreground/90 font-medium">
                  Powered by <span className="text-primary font-bold">KingNet AI</span>
                </div>
              </h2>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                Decentralized intelligent agent platform powered by KingNet AI ecosystem
                <br className="hidden md:block" />
                Train your AI agents, join the IDO, and earn <span className="text-primary font-semibold">KNET ecosystem rewards</span>
              </p>

              {/* Hero CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <div className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl border border-primary/30 backdrop-blur-sm">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground font-medium">Live IDO</span>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                </div>

                <a
                  href="https://floahive.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-glow-primary hover:shadow-secondary"
                >
                  Learn More
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <IdoStats 
            userContribution={userContribution}
            totalRaised={totalRaised}
            targetAmount={targetAmount}
          />

          {/* Enhanced two column layout */}
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-10">
            <div className="space-y-8">
              <ContributeSection onContribute={handleContribute} />
            </div>
            <div className="space-y-8">
              <ProjectInfo />
            </div>
          </div>
        </div>
      </main>
      {/* Partners */}
      <Partners/>
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
