import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "sonner";
import { Wallet, ArrowRight } from "lucide-react";

interface ContributeSectionProps {
  onContribute: (amount: string) => void;
}

export function ContributeSection({ onContribute }: ContributeSectionProps) {
  const [amount, setAmount] = useState("");
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > 30000) {
      toast.error("Maximum contribution is 30,000 KNET");
      return;
    }

    onContribute(amount);
  };

  return (
    <Card className="glass-card p-8 border-primary/20 animate-slide-in" style={{ animationDelay: "0.1s" }}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Contribute to IDO
          </h2>
          <p className="text-muted-foreground text-sm">
            Send KNET tokens to participate in the Floa IDO
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Amount (KNET)
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary border-border focus:border-primary transition-colors"
              disabled={!isConnected}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Maximum: 30,000 KNET
            </p>
          </div>

          {isConnected ? (
            <Button 
              onClick={handleContribute}
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all font-semibold"
              size="lg"
            >
              Contribute Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={() => open()}
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all font-semibold"
              size="lg"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Token Contract:</span>
            <span className="text-foreground font-mono">0x8b24...7a46</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Receiving Address:</span>
            <span className="text-foreground font-mono">0xf0B4...5Dc</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
