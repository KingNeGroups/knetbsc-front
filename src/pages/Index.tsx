import { useState, useEffect } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { ContributeSection } from "@/components/ContributeSection";
import { IdoStats } from "@/components/IdoStats";
import { ProjectInfo } from "@/components/ProjectInfo";
import { toast } from "sonner";
import { Wallet, LogOut, Sparkles } from "lucide-react";

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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Floa IDO
                </h1>
                <p className="text-xs text-muted-foreground">Train & Earn with AI Agents</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border">
                    <div className="w-2 h-2 bg-primary rounded-full animate-glow" />
                    <span className="text-sm font-mono">{formatAddress(address!)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnect()}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => open()}
                  className="bg-gradient-primary hover:shadow-glow-primary transition-all"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero section */}
          <div className="text-center space-y-4 animate-slide-in mb-12">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                On-Chain AI Agent
              </span>
              <br />
              <span className="text-foreground">Twin for Everyone</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the future of intelligent collaboration. Train your AI Agent and earn rewards.
            </p>
          </div>

          {/* Stats */}
          <IdoStats 
            userContribution={userContribution}
            totalRaised={totalRaised}
            targetAmount={targetAmount}
          />

          {/* Two column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            <ContributeSection onContribute={handleContribute} />
            <ProjectInfo />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Floa. All rights reserved.</p>
            <p className="mt-2">Powered by BSC Chain</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
