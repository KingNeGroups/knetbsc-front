/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "sonner";
import { Wallet, ArrowRight, Copy, CopyCheck } from "lucide-react";
import { parseUnits, formatUnits } from "viem";
import { bsc } from "@reown/appkit/networks";

interface ContributeSectionProps {
  onContribute: (amount: string) => void;
}

const KNET_TOKEN_ADDRESS = "0x8b24bf9fe8bb1d4d9dea81eebc9fed6f0fc67a46" as const;
const RECEIVING_ADDRESS = "0xf0B47977fD55C9c329433064A3f85707119e95Dc" as const;

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
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
] as const;

export function ContributeSection({ onContribute }: ContributeSectionProps) {
  const [amount, setAmount] = useState("");
  const [hasNotified, setHasNotified] = useState(false);
  const [copiedTokenContract, setCopiedTokenContract] = useState(false);
  const [copiedReceivingAddress, setCopiedReceivingAddress] = useState(false);

  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  // 获取 BNB balance
  const { data: bnbBalance } = useBalance({ address });

  // 获取 KNET balance
  const { data: knetBalance, refetch: refetchKnetBalance } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    watch: true, // 自动监听更新
  });

  // 获取 KNET decimals
  const { data: knetDecimals } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
  });

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
    const balance = knetBalance ? parseFloat(formatUnits(knetBalance as bigint, decimals)) : 0;

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
          {isConnected && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">BNB Balance</p>
                <p className="text-lg font-semibold text-foreground">
                  {bnbBalance ? parseFloat(formatUnits(bnbBalance.value, bnbBalance.decimals)).toFixed(4) : "0.0000"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">KNET Balance</p>
                <p className="text-lg font-semibold text-foreground">
                  {knetBalance ? parseFloat(formatUnits(knetBalance as bigint, knetDecimals || 18)).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Amount (KNET)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary border-border focus:border-primary transition-colors"
              disabled={!isConnected || isPending || isConfirming}
            />
            <p className="text-xs text-muted-foreground mt-2">Maximum: 30,000 KNET</p>
          </div>

          {isConnected ? (
            <Button
              onClick={handleContribute}
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all font-semibold"
              size="lg"
              disabled={isPending || isConfirming}
            >
              {isPending || isConfirming ? "Processing..." : "Contribute Now"}
              {!isPending && !isConfirming && <ArrowRight className="w-4 h-4 ml-2" />}
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
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Token Contract:</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground font-mono">0x8b24...7a46</span>
              <button
                onClick={handleCopyTokenContract}
                className="p-1 hover:bg-secondary/80 rounded transition-colors"
                title="Copy token contract address"
              >
                {copiedTokenContract ? (
                  <CopyCheck className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Receiving Address:</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground font-mono">0xf0B4...5Dc</span>
              <button
                onClick={handleCopyReceivingAddress}
                className="p-1 hover:bg-secondary/80 rounded transition-colors"
                title="Copy receiving address"
              >
                {copiedReceivingAddress ? (
                  <CopyCheck className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
