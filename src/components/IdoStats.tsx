import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateKnetForTargetUsdt, formatNumber } from "@/lib/utils";

interface IdoStatsProps {
  userContribution: string;
  totalRaised: string;
  targetAmount: string;
}

export function IdoStats({ userContribution, totalRaised, targetAmount }: IdoStatsProps) {
  const [progress, setProgress] = useState(0);
  const [knetData, setKnetData] = useState({
    amount: 0,
    price: 0,
    targetUsdt: 30000,
    loading: true
  });

  useEffect(() => {
    const raised = parseFloat(totalRaised);
    const target = parseFloat(targetAmount);
    const percentage = (raised / target) * 100;
    setProgress(Math.min(percentage, 100));
  }, [totalRaised, targetAmount]);

  useEffect(() => {
    const fetchKnetData = async () => {
      try {
        setKnetData(prev => ({ ...prev, loading: true }));
        const data = await calculateKnetForTargetUsdt();
        setKnetData({
          amount: data.knetAmount,
          price: data.price,
          targetUsdt: data.targetUsdt,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch KNET data:', error);
        setKnetData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchKnetData();

    // 每30秒刷新一次价格
    const interval = setInterval(fetchKnetData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
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

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all">
        <div className="text-muted-foreground text-sm mb-2">30,000 USDT = KNET</div>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {knetData.loading ? (
            "Loading..."
          ) : (
            formatNumber(knetData.amount, 2)
          )} KNET
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Price: ${knetData.price ? knetData.price.toFixed(8) : '0.00000000'}
        </div>
      </Card>

      <Card className="glass-card p-6 md:col-span-2 lg:col-span-4 border-primary/20">
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
