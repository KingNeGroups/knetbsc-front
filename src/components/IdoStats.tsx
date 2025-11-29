import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateKnetForTargetUsdt, formatNumber } from "@/lib/utils";
import { useAccount, useReadContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { bsc } from "@reown/appkit/networks";
import { Countdown } from "./Countdown";

const KNET_TOKEN_ADDRESS = "0x8b24bf9fe8bb1d4d9dea81eebc9fed6f0fc67a46";
const RECEIVING_ADDRESS = "0xf0B47977fD55C9c329433064A3f85707119e95Dc";

const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
] as const;



export function IdoStats() {
  const { address } = useAccount();
  const [userContribution, setUserContribution] = useState("0");
  const [totalRaised, setTotalRaised] = useState("0");
  const [targetAmount, setTargetAmount] = useState(0);
  const [decimals, setDecimals] = useState(18);

  const [progress, setProgress] = useState(0);
  const [knetData, setKnetData] = useState({
    amount: 0,
    price: 0,
    targetUsdt: 30000,
    loading: true
  });

   // 读取 KNET decimals
  const { data: knetDecimals } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
  });

  // 读取收款地址余额 = Total Raised
  const { data: totalKnet } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [RECEIVING_ADDRESS],
    // watch: true,
  });

  // 读取用户贡献 = 当前钱包向收款地址的余额增量
  const { data: userKnet } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    // watch: true,
  });

  useEffect(() => {
    if (knetDecimals) setDecimals(Number(knetDecimals));

    if (totalKnet) {
      const total = parseFloat(formatUnits(totalKnet as bigint, knetDecimals || 18));
      setTotalRaised(total.toFixed(2));
      const target = parseFloat(targetAmount.toString());
      const percentage = target > 0 ? (total / target) * 100 : 0;
      setProgress(Math.min(percentage, 100));
    }

    if (userKnet && totalKnet) {
      const userBalance = parseFloat(formatUnits(userKnet as bigint, knetDecimals || 18));
      const totalBalance = parseFloat(formatUnits(totalKnet as bigint, knetDecimals || 18));
      const contribution = userBalance > totalBalance ? totalBalance : userBalance; // 防止显示超过总额
      setUserContribution(contribution.toFixed(2));
    }
  }, [knetDecimals, totalKnet, userKnet, targetAmount]);

  useEffect(() => {
    const raised = parseFloat(totalRaised);
    const target = parseFloat(targetAmount.toString());
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
        setTargetAmount(data.knetAmount)
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

  // 设置截止日期为 2025/12/1 21:00:00
  const targetDate = new Date("2025-12-01T21:00:00");

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2  animate-slide-in" style={{ animationDelay: "0.2s" }}>
      {/* <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-primary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
        <div className="relative z-10">
          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3 opacity-70">Your Contribution</div>
          <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            {userContribution} <span className="text-lg font-medium text-primary/80">KNET</span>
          </div>
          <div className="mt-2 text-xs text-primary/60">
            {userContribution && parseFloat(userContribution) > 0 ? "Active Contributor" : "Not Started"}
          </div>
        </div>
      </Card> */}

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-secondary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
        <div className="relative z-10">
          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3 opacity-70">Total</div>
          <div className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            {totalRaised}
             {/* <span className="text-lg font-medium text-secondary/80">KNET</span> */}
          </div>
          <div className="mt-2 text-xs text-secondary/60">
            {totalRaised && parseFloat(totalRaised) > 0 ? `${progress.toFixed(4)}% Complete` : "Not Started"}
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all  relative overflow-hidden group">
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
            {/* <span className="text-lg font-semibold text-primary/80">KNET</span> */}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-mono font-bold text-primary">
                ${knetData.price ? knetData.price.toFixed(8) : '0.00000000'}
              </span>
            </div>
            {/* <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
              Live Update
            </div> */}
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

      <Card className="glass-card p-6 md:col-span-2 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <span className="text-muted-foreground">Fundraising Progress</span> */}
              <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
              Percentage
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {totalRaised} / {formatNumber(knetData.amount, 0)} KNET
              </span>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                {progress.toFixed(4)}%
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
       
      <div className="col-span-1 md:col-span-2">
      {/* 倒计时组件 */}
      <Countdown targetDate={targetDate} title="Countdown" />
      </div>

    </div>
  );
}
