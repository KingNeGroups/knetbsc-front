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
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all md:col-span-1 xl:col-span-1">
        <div className="text-muted-foreground text-sm mb-2">Your Contribution</div>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {userContribution} KNET
        </div>
      </Card>

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all md:col-span-1 xl:col-span-1">
        <div className="text-muted-foreground text-sm mb-2">Total Raised</div>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {totalRaised} KNET
        </div>
      </Card>

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all md:col-span-2 lg:col-span-2 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary/10 rounded-full blur-xl group-hover:bg-gradient-primary/20 transition-all duration-500"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-muted-foreground text-sm font-medium"> 30,000 USDT Equivalent</div>
            {knetData.loading && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary">Updating...</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-3 mb-3">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-none">
              {knetData.loading ? (
                <div className="h-10 w-32 bg-muted/50 rounded-lg animate-pulse"></div>
              ) : (
                formatNumber(knetData.amount, 0)
              )}
            </div>
            <span className="text-lg font-semibold text-primary/80">KNET</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-mono font-bold text-primary">
                ${knetData.price ? knetData.price.toFixed(8) : '0.00000000'}
              </span>
            </div>
            <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
              Live Update
            </div>
          </div>

          {/* {!knetData.loading && knetData.amount > 0 && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>1 KNET = {(knetData.price).toFixed(6)} USDT</span>
                <span className="text-primary font-medium">
                  ≈ {(knetData.amount * knetData.price).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })} USDT
                </span>
              </div>
            </div>
          )} */}
        </div>
      </Card>

      <Card className="glass-card p-6 md:col-span-3 xl:col-span-4 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Fundraising Progress</span>
              <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                Live Update
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {totalRaised} / {formatNumber(knetData.amount, 0)} KNET
              </span>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                {progress.toFixed(1)}%
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-4 bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-700 shadow-glow-primary relative overflow-hidden"
              style={{
                width: `${progress}%`,
                boxShadow: progress > 0 ? '0 0 20px rgba(var(--primary), 0.5)' : 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </Progress>
          {progress >= 100 && (
            <div className="text-center text-sm font-medium text-primary animate-pulse">
              🎉 Fundraising Goal Completed!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
