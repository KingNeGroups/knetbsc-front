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
    <Card className="glass-card p-10 border-blue-500/30 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/40" style={{ animationDelay: "0.1s" }}>
      {/* Futuristic background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-full blur-3xl group-hover:opacity-60 transition-opacity duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-blue-600/15 rounded-full blur-2xl group-hover:opacity-50 transition-opacity duration-700" />

      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 2px), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 2px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-4">
          {/* Futuristic header badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-full border border-blue-500/30 backdrop-blur-sm text-blue-300 text-sm font-medium mx-auto">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="uppercase tracking-wider">KingNet AI IDO</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>

          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Join the Intelligent Revolution
            </span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
            Send KNET tokens to participate in Floa IDO and become a core member of the KingNet AI ecosystem
          </p>

          {/* Enhanced ecosystem badge */}
          <div className="mt-4 inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <div className="flex -space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
            </div>
            <span className="text-blue-300 font-medium text-sm uppercase tracking-wider">KNET Token Ecosystem</span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl blur-2xl" />
            <IdoStats/>
          </div>
        </div>

        <div className="space-y-6">
          {isConnected && (
            <div className="grid grid-cols-2 gap-4 p-5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">BNB Balance</p>
                <p className="text-xl font-bold text-blue-300">
                  {formattedBnbBalance.toFixed(4)}
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">KNET Balance</p>
                <p className="text-xl font-bold text-purple-300">
                  {formattedKnetBalance.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm text-gray-300 mb-3 block font-medium uppercase tracking-wider">Contribution Amount (KNET)</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter KNET amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 focus:border-blue-400 text-gray-200 placeholder-gray-500 transition-all duration-300 rounded-xl h-12 text-base backdrop-blur-sm pr-20"
                disabled={!isConnected || isPending || isConfirming}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                <button
                  onClick={handleMaxAmount}
                  disabled={!isConnected || !knetBalance || isPending || isConfirming}
                  className="px-3 py-1 bg-gradient-to-r from-blue-600/50 to-purple-600/50 hover:from-blue-500/60 hover:to-purple-500/60 disabled:from-gray-600/30 disabled:to-gray-600/30 text-blue-300 disabled:text-gray-500 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider border border-blue-500/30 disabled:border-gray-500/30"
                  title="Set maximum amount"
                >
                  MAX
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="text-gray-500">Max contribution: <span className="text-blue-400 font-bold"> {formattedKnetBalance.toFixed(2)} KNET</span></p>
              <div className="px-2 py-1 bg-blue-900/30 rounded-full text-blue-300 font-medium">
                Live
              </div>
            </div>
          </div>

          {isConnected ? (
            <Button
              onClick={handleContribute}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 font-bold text-lg rounded-xl h-14 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
              size="lg"
              disabled={isPending || isConfirming}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer" />
              <div className="relative flex items-center justify-center">
                {isPending || isConfirming ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Processing Transaction...
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 font-bold text-lg rounded-xl h-14 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
              size="lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer" />
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
                <span className="uppercase tracking-wider">Connect Wallet</span>
              </div>
            </Button>
          )}
        </div>

        <div className="p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30 backdrop-blur-sm space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-medium uppercase tracking-wider">Smart Contract Information</span>
          </div>

          <div className="flex justify-between items-center py-2 px-3 bg-black/30 rounded-lg border border-blue-500/20">
            <span className="text-gray-400 text-xs font-medium">Token Contract:</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-300 font-mono text-xs">0x8b24...7a46</span>
              <button
                onClick={handleCopyTokenContract}
                className="p-1.5 hover:bg-blue-800/30 rounded-lg transition-all duration-200 group"
                title="Copy token contract address"
              >
                {copiedTokenContract ? (
                  <CopyCheck className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-400 group-hover:text-blue-300 transition-colors" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 px-3 bg-black/30 rounded-lg border border-purple-500/20">
            <span className="text-gray-400 text-xs font-medium">Receiving Address:</span>
            <div className="flex items-center gap-2">
              <span className="text-purple-300 font-mono text-xs">0xf0B4...5Dc</span>
              <button
                onClick={handleCopyReceivingAddress}
                className="p-1.5 hover:bg-purple-800/30 rounded-lg transition-all duration-200 group"
                title="Copy receiving address"
              >
                {copiedReceivingAddress ? (
                  <CopyCheck className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-400 group-hover:text-purple-300 transition-colors" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
