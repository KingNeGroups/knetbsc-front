import { useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { LogOut, ExternalLink, Copy, Wallet, Coins, CheckCircle, ArrowUpRight, WalletCards, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useAllBalances } from "@/hooks/use-token-balance";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileNavigationProps {
  isConnected?: boolean;
  address?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const MobileNavigation = ({
  isConnected,
  address,
  onConnect,
  onDisconnect
}: MobileNavigationProps) => {
  const { open } = useAppKit();
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { formattedBnbBalance, formattedKnetBalance } = useAllBalances();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Use props if provided, otherwise use wagmi hooks
  const connected = isConnected ?? wagmiConnected;
  const userAddress = address ?? wagmiAddress;

  const handleConnect = () => {
    if (onConnect) {
      onConnect();
    } else {
      open();
    }
    setIsOpen(false);
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    } else {
      disconnect();
    }
    setIsOpen(false);
  };

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isMobile) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-300 hover:text-white hover:bg-blue-900/20 transition-all duration-300"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm bg-black/95 backdrop-blur-xl border border-blue-500/20">
        <SheetHeader className="border-b border-blue-500/20 pb-4 mb-4">
          <SheetTitle className="text-white flex items-center justify-between">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            KINGNFUN
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Connected</span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Bridge Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bridge</h3>
            <a
              href="https://app.transporter.io/?from=solana&tab=token&to=bsc&token=KNET"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Bridge Tokens</div>
                  <div className="text-xs text-gray-400">Cross-chain transfers</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>

          {/* Wallet Section */}
          {connected ? (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Wallet</h3>

              {/* Address Card */}
              <div className="relative p-4 bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-blue-900/30 rounded-xl border border-blue-500/20">
                <div className="flex items-center mb-3">
                  <WalletCards className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-blue-300 font-mono text-xs font-semibold">WALLET ADDRESS</span>
                </div>

                <div
                  onClick={() => copyAddress(userAddress!)}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 cursor-pointer group hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200"
                >
                  <div className="flex-1">
                    <div className="text-white font-mono text-sm group-hover:text-blue-300 transition-colors">
                      {formatAddress(userAddress!)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                      Click to copy full address
                    </div>
                  </div>
                  <div className="ml-3 flex items-center space-x-2">
                    {copiedAddress ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400 animate-pulse" />
                        <span className="text-green-400 text-xs font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Balances Card */}
              <div className="relative p-4 bg-gradient-to-r from-green-900/20 via-emerald-900/15 to-green-900/20 rounded-xl border border-green-500/20">
                <div className="flex items-center mb-3">
                  <Coins className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-green-300 font-mono text-xs font-semibold">BALANCES</span>
                </div>

                <div className="space-y-3">
                  {/* BNB Balance */}
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-yellow-900/10 hover:border-yellow-500/30 transition-all duration-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                        <Coins className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">BNB</div>
                        <div className="text-xs text-gray-400">Native Token</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-mono font-semibold text-sm">
                        {formattedBnbBalance ? formattedBnbBalance.toFixed(4) : "0.0000"}
                      </div>
                    </div>
                  </div>

                  {/* KNET Balance */}
                  {formattedKnetBalance !== undefined && (
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-purple-900/10 hover:border-purple-500/30 transition-all duration-200">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                          <Coins className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">KNET</div>
                          <div className="text-xs text-gray-400">Token</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono font-semibold text-sm">
                          {formattedKnetBalance.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Disconnect Button */}
              <button
                onClick={handleDisconnect}
                className="flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-red-900/40 to-red-800/30 rounded-xl border border-red-500/30 hover:from-red-800/50 hover:to-red-700/40 hover:border-red-400/50 transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                <span className="text-red-400 font-medium group-hover:text-red-300 transition-colors">
                  Disconnect Wallet
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Wallet</h3>
              <Button
                onClick={handleConnect}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 rounded-xl p-4 text-sm font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25"
              >
                <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
                Connect Wallet
              </Button>
            </div>
          )}

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="https://floahive.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-blue-900/20 hover:border-blue-500/50 transition-all duration-200"
              >
                <span className="text-gray-300 text-sm hover:text-white transition-colors">Explore Ecosystem</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;