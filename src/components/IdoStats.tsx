import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface IdoStatsProps {
  userContribution: string;
  totalRaised: string;
  targetAmount: string;
}

export function IdoStats({ userContribution, totalRaised, targetAmount }: IdoStatsProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const raised = parseFloat(totalRaised);
    const target = parseFloat(targetAmount);
    const percentage = (raised / target) * 100;
    setProgress(Math.min(percentage, 100));
  }, [totalRaised, targetAmount]);

  return (
    <div className="grid gap-4 md:grid-cols-3 animate-slide-in" style={{ animationDelay: "0.2s" }}>
      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all">
        <div className="text-muted-foreground text-sm mb-2">Your Contribution</div>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {userContribution} KNET
        </div>
      </Card>

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all">
        <div className="text-muted-foreground text-sm mb-2">Total Raised</div>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {totalRaised} KNET
        </div>
      </Card>

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all">
        <div className="text-muted-foreground text-sm mb-2">Target Amount</div>
        <div className="text-3xl font-bold text-foreground">
          {targetAmount} KNET
        </div>
      </Card>

      <Card className="glass-card p-6 md:col-span-3 border-primary/20">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-semibold">{progress.toFixed(2)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-secondary">
            <div className="h-full bg-gradient-primary rounded-full transition-all duration-500 shadow-glow-primary" />
          </Progress>
        </div>
      </Card>
    </div>
  );
}
