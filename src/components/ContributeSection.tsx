/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "sonner";
import { Wallet, ArrowRight, Copy, CopyCheck } from "lucide-react";
import { parseUnits } from "viem";
import { bsc } from "@reown/appkit/networks";
import { useAllBalances, KNET_TOKEN_ADDRESS, ERC20_ABI } from "@/hooks/use-token-balance";
import { IdoStats } from "./IdoStats";

interface ContributeSectionProps {
  onContribute: (amount: string) => void;
}

const RECEIVING_ADDRESS = "0xf0B47977fD55C9c329433064A3f85707119e95Dc" as const;

export function ContributeSection({ onContribute }: ContributeSectionProps) {
  const [amount, setAmount] = useState("");
  const [hasNotified, setHasNotified] = useState(false);
  const [copiedTokenContract, setCopiedTokenContract] = useState(false);
  const [copiedReceivingAddress, setCopiedReceivingAddress] = useState(false);

  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  // 使用全局 hooks 获取所有余额
  const { bnbBalance, formattedBnbBalance, knetBalance, knetDecimals, formattedKnetBalance, refetchKnetBalance } = useAllBalances();

  // 写入合约
  const { writeContract, data: txHash, isPending } = useWriteContract();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  // 成功通知
  useEffect(() => {
    if (isSuccess && txHash && !hasNotified) {
      toast.success(`Successfully contributed ${amount} KNET!`, {
        description: `Tx: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`,
      });
      onContribute(amount);
      setAmount("");
      setHasNotified(true);
      refetchKnetBalance?.();
    }
  }, [isSuccess, txHash, amount, onContribute, hasNotified, refetchKnetBalance]);

  // hash 改变时重置通知
  useEffect(() => {
    setHasNotified(false);
  }, [txHash]);

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) return toast.error("Please enter a valid amount");
    if (parseFloat(amount) > 30000) return toast.error("Maximum contribution is 30,000 KNET");

    if (!address) return toast.error("Please connect your wallet");

    const decimals = knetDecimals || 18;
    const balance = formattedKnetBalance;

    if (balance < parseFloat(amount)) return toast.error("Insufficient KNET balance");

    try {
      writeContract({
        account: address,
        chain: bsc,
        address: KNET_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [RECEIVING_ADDRESS, parseUnits(amount, decimals)],
      });
    } catch (err: any) {
      toast.error(err?.message || "Transaction failed");
    }
  };

  const handleCopyTokenContract = async () => {
    try {
      await navigator.clipboard.writeText(KNET_TOKEN_ADDRESS);
      setCopiedTokenContract(true);
      toast.success("Token contract address copied!");
      setTimeout(() => setCopiedTokenContract(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const handleCopyReceivingAddress = async () => {
    try {
      await navigator.clipboard.writeText(RECEIVING_ADDRESS);
      setCopiedReceivingAddress(true);
      toast.success("Receiving address copied!");
      setTimeout(() => setCopiedReceivingAddress(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const handleMaxAmount = () => {
    if (formattedKnetBalance > 0) {
      const maxAllowed = Math.min(formattedKnetBalance, 30000); // 不超过30,000 KNET的限制
      setAmount(maxAllowed.toString());
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Contribution Card - Modern Floating Design */}
      <Card className="glass-card p-8 border-blue-500/30 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: "0.1s" }}>
        {/* Enhanced background effects with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/20" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-3xl group-hover:opacity-70 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-700" />

        {/* Animated accent border */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>

        {/* Neural network pattern with improved opacity */}
        <div className="absolute inset-0 opacity-3">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 3px), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.4) 0%, transparent 3px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10">
          {/* Header with modern badge */}
          <div className="flex flex-col items-center space-y-6 mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full border border-blue-500/30 backdrop-blur-md text-blue-300 text-sm font-medium shadow-lg">
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="uppercase tracking-[0.2em] font-semibold">Live Participation</span>
              <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  Join the AI Revolution
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Participate in the KingNet AI IDO and help shape the future of intelligent agents
              </p>
            </div>
          </div>

          {/* Stats Integration - Floating Design */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl blur-xl" />
            <div className="relative p-6 bg-black/30 rounded-3xl border border-blue-500/20 backdrop-blur-sm">
              <IdoStats/>
            </div>
          </div>

                {/* Modern Input Section */}
          <div className="space-y-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl blur-xl" />
              <div className="relative p-6 bg-black/20 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <label className="block text-sm font-medium text-gray-300 mb-4 uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Contribution Amount
                  </span>
                </label>

                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter KNET amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-blue-500/30 focus:border-blue-400 text-gray-200 placeholder-gray-500 transition-all duration-300 rounded-xl h-14 text-base backdrop-blur-sm pr-24 shadow-inner"
                    disabled={!isConnected || isPending || isConfirming}
                  />

                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_4px_rgba(59,130,246,0.8)]" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_4px_rgba(139,92,246,0.8)]" style={{ animationDelay: "0.5s" }} />
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_4px_rgba(6,182,212,0.8)]" style={{ animationDelay: "1s" }} />
                    </div>
                    <button
                      onClick={handleMaxAmount}
                      disabled={!isConnected || !knetBalance || isPending || isConfirming}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-600/60 to-purple-600/60 hover:from-blue-500/70 hover:to-purple-500/70 disabled:from-gray-600/40 disabled:to-gray-600/40 text-blue-300 disabled:text-gray-500 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider border border-blue-500/30 disabled:border-gray-500/30 shadow-lg"
                      title="Set maximum amount"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-gray-500 text-sm">
                    Available: <span className="text-blue-400 font-bold">{formattedKnetBalance.toFixed(2)} KNET</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                    <span className="text-green-400 text-xs font-medium uppercase tracking-wider">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {isConnected ? (
            <Button
              onClick={handleContribute}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 font-bold text-lg rounded-xl h-16 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
              size="lg"
              disabled={isPending || isConfirming}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer" />
              <div className="relative flex items-center justify-center">
                {isPending || isConfirming ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    <span>Processing Transaction...</span>
                  </>
                ) : (
                  <>
                    <span className="uppercase tracking-wider">Contribute Now</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </Button>
          ) : (
            <Button
              onClick={() => open()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 font-bold text-lg rounded-xl h-16 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
              size="lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer" />
              <div className="relative flex items-center justify-center">
                <Wallet className="w-5 h-5 mr-3" />
                <span className="uppercase tracking-wider">Connect Wallet</span>
              </div>
            </Button>
          )}
        </div>
      </Card>

      {/* Separate Contract Info Card */}
      <Card className="glass-card p-6 border-purple-500/20 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-500" style={{ animationDelay: "0.2s" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/10" />

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(139,92,246,0.6)]" />
          <span className="text-purple-300 text-sm font-medium uppercase tracking-wider">
            Contract Information
          </span>
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
        </div>

        <div className="space-y-4 relative z-10">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex justify-between items-center p-4 bg-black/30 rounded-xl border border-purple-500/20 backdrop-blur-sm">
              <span className="text-gray-400 text-sm font-medium">Token Contract:</span>
              <div className="flex items-center gap-3">
                <span className="text-purple-300 font-mono text-sm bg-black/40 px-2 py-1 rounded">0x8b24...7a46</span>
                <button
                  onClick={handleCopyTokenContract}
                  className="p-2 hover:bg-purple-800/30 rounded-lg transition-all duration-200 group/copy"
                  title="Copy token contract address"
                >
                  {copiedTokenContract ? (
                    <CopyCheck className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover/copy:text-purple-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex justify-between items-center p-4 bg-black/30 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
              <span className="text-gray-400 text-sm font-medium">Receiving Address:</span>
              <div className="flex items-center gap-3">
                <span className="text-cyan-300 font-mono text-sm bg-black/40 px-2 py-1 rounded">0xf0B4...5Dc</span>
                <button
                  onClick={handleCopyReceivingAddress}
                  className="p-2 hover:bg-cyan-800/30 rounded-lg transition-all duration-200 group/copy"
                  title="Copy receiving address"
                >
                  {copiedReceivingAddress ? (
                    <CopyCheck className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover/copy:text-cyan-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
