import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "sonner";
import { Wallet, ArrowRight, Copy, CopyCheck, ExternalLink, Twitter, BookOpen, Globe } from "lucide-react";
import { parseUnits } from "viem";
import { bsc } from "@reown/appkit/networks";
import { useAllBalances, KNET_TOKEN_ADDRESS, ERC20_ABI } from "@/hooks/use-token-balance";
import { IdoStats } from "./IdoStats";
import { Partners } from "./Partners";
import img1 from "@/assets/img/floa/1.png";
import img2 from "@/assets/img/floa/2.jpg";
import img3 from "@/assets/img/floa/3.png";

const RECEIVING_ADDRESS = "0xf0B47977fD55C9c329433064A3f85707119e95Dc" as const;

export function FloaIdoFusion() {
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
      setAmount("");
      setHasNotified(true);
      refetchKnetBalance?.();
    }
  }, [isSuccess, txHash, amount, hasNotified, refetchKnetBalance]);

  // hash 改变时重置通知
  useEffect(() => {
    setHasNotified(false);
  }, [txHash]);

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) return toast.error("Please enter a valid amount");
    // if (parseFloat(amount) > 30000) return toast.error("Maximum contribution is 30,000 KNET");

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
      // const maxAllowed = Math.min(formattedKnetBalance, 30000);
      const maxAllowed = formattedKnetBalance;
      setAmount(maxAllowed.toString());
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-32 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 p-6 lg:p-12">
        {/* Hero Section with Organic Shape */}
        <div className="relative mb-16">
          {/* Irregular organic background shape */}
          <div className="absolute -inset-8 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20 backdrop-blur-3xl rounded-[3rem_1rem_2rem_1rem/1rem_2rem_3rem_1rem] transform rotate-1" />

          <div className="relative">
            <div className="text-center mb-12">
              {/* Floating ecosystem badge */}
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-900/60 to-cyan-900/60 rounded-full border border-purple-500/40 backdrop-blur-md text-purple-300 font-medium shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                <span className="uppercase tracking-[0.3em] font-bold">Floa</span>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
              </div>
{/* 
              <h1 className="mt-8 text-6xl lg:text-8xl font-bold leading-none">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                  FLOA
                </span>
              </h1> */}

              <h2 className="mt-4 text-3xl lg:text-4xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
               The first project launched on KingnetFun with $KNET
                </span>
              </h2>

              <div className="mt-8 flex items-center justify-center gap-8">
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transform -rotate-2" />
                <div className="flex -space-x-2">
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "0.5s" }} />
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ animationDelay: "1s" }} />
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transform rotate-1" />
              </div>
            </div>

            {/* Stats Integration - Irregular Shape */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-[2rem_4rem_2rem_4rem] transform -rotate-1 blur-2xl" />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-[2rem_4rem_2rem_4rem] border border-purple-500/30 p-8">
                <IdoStats />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Organic Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start relative">
          {/* Contribute Section - Left Column - Irregular Shape */}
          <div className="lg:col-span-7 transform lg:-rotate-1">
            <div className="relative">
              {/* Organic background blob */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30 backdrop-blur-2xl rounded-[4rem_1rem_3rem_2rem] blur-xl" />

             
              <Card className="relative bg-black/40 backdrop-blur-2xl border border-purple-500/30 rounded-[3rem_1rem_4rem_1rem] p-8 overflow-hidden">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    About Floa
                    </h3>
                  </div>

                  {/* Asymmetric image grid */}
                  <div className="grid grid-cols-3 gap-4 transform rotate-1">
                    <div className="col-span-2 row-span-1 group relative overflow-hidden rounded-3xl border border-purple-500/40 bg-black/30 hover:scale-[1.03] transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={img1}
                        alt="AI Training"
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-purple-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-purple-300 rounded-full" />
                          AI Training
                          <div className="w-2 h-2 bg-purple-300 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 row-span-2 group relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-black/30 hover:scale-[1.03] transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={img2}
                        alt="Smart Agents"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-cyan-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-cyan-300 rounded-full" />
                          Smart
                          <br />
                          Agents
                          <div className="w-2 h-2 bg-cyan-300 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 row-span-1 group relative overflow-hidden rounded-3xl border border-blue-500/40 bg-black/30 hover:scale-[1.03] transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={img3}
                        alt="Ecosystem"
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-blue-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-blue-300 rounded-full" />
                          Ecosystem
                          <div className="w-2 h-2 bg-blue-300 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

            {/* Fair Mechanism Section */}
            <div className="relative transform -rotate-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 backdrop-blur-2xl rounded-[4rem_2rem_3rem_1rem] blur-xl" />
              <Card className="relative bg-black/40 backdrop-blur-2xl border border-cyan-500/30 rounded-[2rem_3rem_1rem_3rem] p-8">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-gray-300">
                    Floa is an open intelligent Agent ecosystem featuring cross-platform agents that are
                    <span className="text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded-xl">creatable</span>,
                    <span className="text-cyan-400 font-semibold bg-cyan-900/30 px-2 py-1 rounded-xl">trainable</span>,
                    <span className="text-blue-400 font-semibold bg-blue-900/30 px-2 py-1 rounded-xl">and monetizable</span>
                  </p>

                  <p className="text-gray-300">
                  users train Agents through daily interaction to handle digital tasks—from asset management to service integration—while earning ecosystem rewards. 
                    <span className="text-cyan-400 font-semibold bg-cyan-900/30 px-2 py-1 rounded-xl">Your personal AI partner, powered by blockchain.</span>
                  </p>
                </div>
              </Card>
            </div>
            </div>
          </div>

          {/* Content Section - Middle Column - Staggered Layout */}
          <div className="lg:col-span-5 space-y-8 transform lg:rotate-1">
            {/* Feature Gallery - Organic Grid */}
            <div className="relative transform -rotate-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-900/30 via-cyan-900/20 to-blue-900/30 backdrop-blur-2xl rounded-[3rem_1rem_4rem_1rem] blur-xl" />
              <Card className="relative bg-black/40 backdrop-blur-2xl border border-blue-500/30 rounded-[4rem_1rem_3rem_2rem] p-8 overflow-hidden hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-700 hover:-translate-y-2">
                {/* Floating elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 rounded-full blur-xl" />

                <div className="relative z-10 space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full border border-blue-500/40 backdrop-blur-md text-blue-300 font-medium shadow-lg">
                      <Wallet className="w-4 h-4" />
                      <span className="uppercase tracking-[0.2em] font-semibold">Join</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Amount
                      </span>
                    </label>

                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-gradient-to-r from-blue-950/60 to-purple-950/60 border-blue-500/40 focus:border-blue-400 text-gray-200 placeholder-gray-500 transition-all duration-500 rounded-2xl h-16 text-base backdrop-blur-sm pr-28 shadow-inner"
                        disabled={!isConnected || isPending || isConfirming}
                      />

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(139,92,246,0.8)]" style={{ animationDelay: "0.5s" }} />
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" style={{ animationDelay: "1s" }} />
                        </div>
                        <button
                          onClick={handleMaxAmount}
                          disabled={!isConnected || !knetBalance || isPending || isConfirming}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600/70 to-purple-600/70 hover:from-blue-500/80 hover:to-purple-500/80 disabled:from-gray-600/50 disabled:to-gray-600/50 text-blue-300 disabled:text-gray-500 text-sm font-bold rounded-xl transition-all duration-300 uppercase tracking-wider border border-blue-500/40 disabled:border-gray-500/40 shadow-xl"
                          title="Set maximum amount"
                        >
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">
                        balance: <span className="text-blue-400 font-bold">{formattedKnetBalance.toFixed(2)} $KNET</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        <span className="text-green-400 text-xs font-medium uppercase tracking-wider"></span>
                      </div>
                    </div>
                  </div>

                  {isConnected ? (
                    <Button
                      onClick={handleContribute}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-500 font-bold text-lg rounded-2xl h-16 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden group"
                      size="lg"
                      disabled={isPending || isConfirming}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer" />
                      <div className="relative flex items-center justify-center">
                        {isPending || isConfirming ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span className="uppercase tracking-wider">Donate</span>
                            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => open()}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-500 font-bold text-lg rounded-2xl h-16 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden group"
                      size="lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer" />
                      <div className="relative flex items-center justify-center">
                        <Wallet className="w-5 h-5 mr-3" />
                        <span className="uppercase tracking-wider">Connect Wallet</span>
                      </div>
                    </Button>
                  )}
                </div>
              </Card>
              
            </div>

            {/* Description Section */}
            <div className="relative transform rotate-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-purple-900/30 backdrop-blur-2xl rounded-[2rem_3rem_1rem_3rem] blur-xl" />
             
               <Card className="relative bg-black/40 backdrop-blur-2xl border border-purple-500/40 rounded-[4rem_2rem_3rem_1rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  <h3 className="text-2xl font-bold text-purple-300 uppercase tracking-wider">$FLOA Token Generation Event</h3>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                </div>

                <div className="relative p-6 bg-black/30 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                    1.Mechanism: Proof-of-Burn Access (PoBA)
                  </p>
                  <p>
                    2.Supply: 
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">1.5% </span> 
                    of total $FLOA(1,500,000)
                  </p>
                  <p>3.Donated $KNET to receive $FLOA tokens. </p>
                  <p>4.All $KNET collected will be permanently burned after the event.</p>
                  <p>5.The official $FLOA liquidity pool will be deployed on PancakeSwap following the event conclusion.</p>
                </div>
              </Card>
            </div>

          </div>
        </div>

        {/* Bottom Section - Contract Info & Links - Organic Layout */}
        <div className="mt-16 relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-900/20 via-purple-900/15 to-cyan-900/20 backdrop-blur-3xl rounded-[3rem_4rem_2rem_4rem] transform -rotate-1 blur-2xl" />

          <Card className="relative bg-black/40 backdrop-blur-2xl border border-blue-500/30 rounded-[3rem_4rem_2rem_4rem] p-8">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Links Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  <h4 className="text-xl font-bold text-blue-300 uppercase tracking-wider">Connect</h4>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    className="border-purple-500/40 hover:border-purple-400 hover:bg-purple-900/30 text-purple-300 hover:text-purple-200 rounded-2xl px-6 py-3 transition-all duration-500 group relative overflow-hidden"
                    onClick={() => window.open("https://floahive.com/", "_blank")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Globe className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">Website</span>
                    <ExternalLink className="w-3 h-3 ml-2 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/30 text-cyan-300 hover:text-cyan-200 rounded-2xl px-6 py-3 transition-all duration-500 group relative overflow-hidden"
                    onClick={() => window.open("https://x.com/Floa_AI", "_blank")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Twitter className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">Twitter</span>
                    <ExternalLink className="w-3 h-3 ml-2 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-blue-500/40 hover:border-blue-400 hover:bg-blue-900/30 text-blue-300 hover:text-blue-200 rounded-2xl px-6 py-3 transition-all duration-500 group relative overflow-hidden"
                    onClick={() => window.open("https://docs.floahive.com/", "_blank")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <BookOpen className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">Docs</span>
                    <ExternalLink className="w-3 h-3 ml-2 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        {/* Roadmap Section - Organic Flow Design */}
        <div className="relative mt-16 mb-16">
          {/* Flowing organic background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5 rounded-full filter blur-3xl animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-cyan-500/8 via-transparent to-purple-500/4 rounded-full filter blur-2xl animate-blob animation-delay-2000" />
          </div>

          <div className="relative">
            {/* Organic section header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 rounded-3xl blur-xl transform rotate-1" />
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-full border border-purple-500/40 backdrop-blur-md text-purple-300 font-medium shadow-2xl transform -rotate-1 hover:rotate-0 transition-all duration-500">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  <span className="uppercase tracking-[0.3em] font-bold">Roadmap</span>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                </div>

                <div className="flex items-center justify-center gap-8 mt-6">
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform -rotate-2" />
                  <div className="flex -space-x-2">
                    <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ animationDelay: "0.5s" }} />
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1s" }} />
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform rotate-1" />
                </div>
              </div>
            </div>

            {/* Roadmap Phases - Organic Layout */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8">
                <div className="space-y-8">
                  {/* Phase 1 */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 transform hover:scale-[1.02] transition-all duration-500">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-purple-300">Phase 1 (0-6 Months)</h3>
                            <div className="px-3 py-1 bg-purple-900/40 rounded-full">
                              <span className="text-purple-300 text-sm font-medium">Basic Ecosystem Construction</span>
                            </div>
                          </div>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Multi-terminal DApp launch</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Initial liquidity injection</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Opening of Level 1-6 Agent training functions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Launch of the basic Plugin Marketplace</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 transform hover:scale-[1.02] transition-all duration-500">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-blue-300">Phase 2 (6-18 Months)</h3>
                            <div className="px-3 py-1 bg-blue-900/40 rounded-full">
                              <span className="text-blue-300 text-sm font-medium">Ecosystem Collaboration Expansion</span>
                            </div>
                          </div>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Launch of the Developer Incentive Program</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Integration of vertical applications across multiple fields</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Launch of the Agent Collaborative Task System</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6 transform hover:scale-[1.02] transition-all duration-500">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-cyan-300">Phase 3 (18+ Months)</h3>
                            <div className="px-3 py-1 bg-cyan-900/40 rounded-full">
                              <span className="text-cyan-300 text-sm font-medium">Commercial Value Closed Loop</span>
                            </div>
                          </div>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Launch of DAO Governance Mechanism</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Launch of the Commercial Task Matching Platform</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              <span>Realization of full-ecosystem open collaboration</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating connection dots */}
            <div className="absolute top-1/2 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <div className="absolute top-1/3 right-12 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ animationDelay: "0.7s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1.4s" }} />
            <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ animationDelay: "2.1s" }} />
          </div>
        </div>

        {/* Team Section - Organic Flow Design */}
        <div className="relative mt-16 mb-16">
          {/* Flowing organic background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/5 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/8 via-transparent to-cyan-500/4 rounded-full filter blur-2xl animate-blob animation-delay-4000" />
          </div>

          <div className="relative">
            {/* Organic section header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30 rounded-3xl blur-xl transform -rotate-1" />
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-900/60 to-purple-900/60 rounded-full border border-blue-500/40 backdrop-blur-md text-blue-300 font-medium shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  <span className="uppercase tracking-[0.3em] font-bold">Team</span>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                </div>

                <div className="flex items-center justify-center gap-8 mt-6">
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform rotate-2" />
                  <div className="flex -space-x-2">
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ animationDelay: "0.5s" }} />
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1s" }} />
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transform -rotate-1" />
                </div>
              </div>
            </div>

            {/* Team Content - Organic Layout */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-purple-900/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl border border-blue-500/20 p-8">
                <div className="max-w-4xl mx-auto">

                  <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8">
                    <div className="space-y-6 text-lg leading-relaxed">
                    

                     

                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
                        <p className="text-gray-300 text-center">
                        Floa is built by a team with experience from Google, Tencent, ByteDance, and BNB Chain. We bring together expertise in AI development, scalable product engineering, and Web3 protocol design.
                        </p>
                        <p className="text-gray-300 text-center italic">
                          "This cross-disciplinary background enables us to create accessible AI applications while building robust decentralized ecosystems."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating connection dots */}
            <div className="absolute top-1/4 left-12 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            <div className="absolute top-2/3 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ animationDelay: "0.8s" }} />
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1.6s" }} />
            <div className="absolute bottom-1/2 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ animationDelay: "2.3s" }} />
          </div>
        </div>

        {/* Tokenomics Section - Organic Flow Design */}
        <div className="relative mt-16 mb-16">
          {/* Flowing organic background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/5 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/8 via-transparent to-yellow-500/4 rounded-full filter blur-2xl animate-blob animation-delay-4000" />
          </div>

          <div className="relative">
            {/* Organic section header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/30 via-transparent to-purple-900/30 rounded-3xl blur-xl transform -rotate-1" />
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-900/60 to-purple-900/60 rounded-full border border-yellow-500/40 backdrop-blur-md text-yellow-300 font-medium shadow-2xl transform -rotate-1 hover:rotate-0 transition-all duration-500">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                  <span className="uppercase tracking-[0.3em] font-bold">Tokenomics</span>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                </div>

                <div className="flex items-center justify-center gap-8 mt-6">
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-full transform -rotate-2" />
                  <div className="flex -space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                    <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ animationDelay: "0.5s" }} />
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1s" }} />
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transform rotate-1" />
                </div>
              </div>
            </div>

            {/* Tokenomics Content - Organic Layout */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/15 via-transparent to-purple-900/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl border border-yellow-500/20 p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      Token Distribution
                    </h3>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-900/40 to-yellow-900/40 rounded-full border border-purple-500/30">
                      <span className="text-purple-300 font-medium">Total Supply:</span>
                      <span className="text-2xl font-bold text-yellow-300">100,000,000</span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Pie Chart */}
                    <div className="relative">
                      <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-8">
                        <div className="relative w-64 h-64 mx-auto">
                          {/* SVG Pie Chart - Using path segments for perfect closure */}
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Train to Earn - 92% - Path segment */}
                            <path
                              d="M 50 50 L 50 10 A 40 40 0 1 1 21.2 78.8 Z"
                              fill="url(#gradient1)"
                              className="drop-shadow-lg"
                            />

                            {/* Public Sale - 5% - Path segment */}
                            <path
                              d="M 50 50 L 21.2 78.8 A 40 40 0 0 1 13.6 69.3 Z"
                              fill="url(#gradient2)"
                              className="drop-shadow-lg"
                            />

                            {/* Liquidity Pools - 3% - Path segment */}
                            <path
                              d="M 50 50 L 13.6 69.3 A 40 40 0 0 1 10 50 Z"
                              fill="url(#gradient3)"
                              className="drop-shadow-lg"
                            />

                            {/* Complete the circle back to start */}
                            <path
                              d="M 50 50 L 10 50 A 40 40 0 0 1 50 10 Z"
                              fill="url(#gradient1)"
                              className="drop-shadow-lg"
                            />

                            <defs>
                              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#7c3aed" />
                              </linearGradient>
                              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#2563eb" />
                              </linearGradient>
                              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#0891b2" />
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Center text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-yellow-300">100M</div>
                              <div className="text-sm text-gray-400">$FLOA</div>
                            </div>
                          </div>

                          {/* Legend indicators around the chart */}
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg" />
                          </div>
                          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg" />
                          </div>
                          <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-8">
                            <div className="w-3 h-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Token Details */}
                    <div className="space-y-4">
                      {/* Train to Earn */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full" />
                              <div>
                                <h4 className="text-purple-300 font-semibold">Train to Earn</h4>
                                <p className="text-gray-400 text-sm">Community rewards & ecosystem incentives</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-300">92%</div>
                              <div className="text-sm text-gray-400">92,000,000</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Public Sale */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full" />
                              <div>
                                <h4 className="text-cyan-300 font-semibold">Public Sale</h4>
                                <p className="text-gray-400 text-sm">Initial token offering & community distribution</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-cyan-300">5%</div>
                              <div className="text-sm text-gray-400">5,000,000</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Liquidity Pools */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />

                              <div>
                                <h4 className="text-blue-300 font-semibold">Liquidity Pools</h4>
                                <p className="text-gray-400 text-sm">DEX liquidity & trading stability</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-300">3%</div>
                              <div className="text-sm text-gray-400">3,000,000</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating connection dots */}
            <div className="absolute top-1/3 right-12 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            <div className="absolute top-2/3 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ animationDelay: "0.9s" }} />
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1.8s" }} />
            <div className="absolute bottom-1/2 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]" style={{ animationDelay: "2.5s" }} />
          </div>
        </div>

        {/* Ecosystem Partners Showcase - Organic Flow Design */}
        <div className="relative mt-16 mb-16">
          {/* Flowing organic background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5 rounded-full filter blur-3xl animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-cyan-500/8 via-transparent to-purple-500/4 rounded-full filter blur-2xl animate-blob animation-delay-2000" />
          </div>

          <div className="relative">
            {/* Organic section header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 rounded-3xl blur-xl transform rotate-1" />
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-900/60 to-blue-900/60 rounded-full border border-purple-500/40 backdrop-blur-md text-purple-300 font-medium shadow-2xl transform -rotate-1 hover:rotate-0 transition-all duration-500">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  <span className="uppercase tracking-[0.3em] font-bold">Partners</span>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                </div>

                {/* <h2 className="mt-8 text-4xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                    Web3 Alliance
                  </span>
                </h2> */}

                <div className="flex items-center justify-center gap-8 mt-6">
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform -rotate-2" />
                  <div className="flex -space-x-2">
                    <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ animationDelay: "0.5s" }} />
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1s" }} />
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform rotate-1" />
                </div>

                {/* <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
                  Building decentralized intelligent ecosystem together with industry leaders
                </p> */}
              </div>
            </div>

            {/* Partners Grid with Organic Layout */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8">
                <Partners />
              </div>
            </div>

            {/* Floating connection dots */}
            <div className="absolute top-1/2 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <div className="absolute top-1/3 right-12 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ animationDelay: "0.7s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "1.4s" }} />
            <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" style={{ animationDelay: "2.1s" }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}