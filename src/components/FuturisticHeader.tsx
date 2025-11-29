import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, ExternalLink, ChevronDown, Copy, Wallet, Coins, CheckCircle, ArrowUpRight, WalletCards } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAllBalances } from "@/hooks/use-token-balance";
import { MobileNavigation } from "@/components/MobileNavigation";
import logo from "@/assets/logo.png";

interface FuturisticHeaderProps {
  isConnected?: boolean;
  address?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const FuturisticHeader = ({
  isConnected,
  address,
  onConnect,
  onDisconnect
}: FuturisticHeaderProps) => {
  const { open } = useAppKit();
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Use the custom hook to get all balances
  const { formattedBnbBalance, formattedKnetBalance } = useAllBalances();

  // Use props if provided, otherwise use wagmi hooks
  const connected = isConnected ?? wagmiConnected;
  const userAddress = address ?? wagmiAddress;

  const handleConnect = () => {
    if (onConnect) {
      onConnect();
    } else {
      open();
    }
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    } else {
      disconnect();
    }
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Copy address to clipboard with visual feedback
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopiedAddress(false), 2000); // Reset after 2 seconds
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  return (
    <header className="relative z-10 border-b border-blue-500/20 backdrop-blur-2xl bg-black/60">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse" />
              <img
                src={logo}
                alt="KINGNET AI Logo"
                className="relative h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Navigation */}
            <MobileNavigation
              isConnected={isConnected}
              address={address}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
            />

            {/* Desktop Bridge Button */}
            <a
              href="https://app.transporter.io/?from=solana&tab=token&to=bsc&token=KNET"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white bg-blue-900/20 hover:bg-blue-800/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="uppercase tracking-wider text-xs">Bridge</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {connected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl border border-blue-500/30 backdrop-blur-sm cursor-pointer hover:border-blue-400/50 transition-all duration-300">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-50" />
                    </div>
                    <span className="text-sm font-mono font-medium text-blue-300">{formatAddress(userAddress!)}</span>
                    <ChevronDown className="w-4 h-4 text-blue-300" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900/98 backdrop-blur-2xl border border-blue-500/30 min-w-[320px] p-2 shadow-2xl shadow-blue-500/10">
                  {/* Address Section with Gradient Border */}
                  <div className="relative mb-3 p-3 bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-blue-900/30 rounded-xl border border-blue-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-sm"></div>
                    <div className="relative">
                      <div className="flex items-center mb-2">
                        <WalletCards className="w-4 h-4 mr-2 text-blue-400" />
                        <span className="text-blue-300 font-mono text-xs font-semibold">WALLET ADDRESS</span>
                      </div>

                      <div
                        onClick={() => copyAddress(userAddress!)}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 cursor-pointer group hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        <div className="flex-1">
                          <div className="text-white font-mono text-sm group-hover:text-blue-300 transition-colors duration-200">
                            {userAddress}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-200">
                            Click to copy
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
                              <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                              <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Balances Section */}
                  <div className="relative mb-3 p-3 bg-gradient-to-r from-green-900/20 via-emerald-900/15 to-green-900/20 rounded-xl border border-green-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/3 to-emerald-500/3 rounded-xl blur-sm"></div>
                    <div className="relative">
                      <div className="flex items-center mb-2">
                        <Coins className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-green-300 font-mono text-xs font-semibold">BALANCES</span>
                      </div>

                      <div className="space-y-2">
                        {/* BNB Balance */}
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-yellow-900/10 hover:border-yellow-500/30 transition-all duration-200 group">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-yellow-500/30 transition-colors duration-200">
                              <Coins className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors duration-200">BNB</div>
                              <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Native Token</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-mono font-semibold text-sm">
                              {formattedBnbBalance ? formattedBnbBalance.toFixed(4) : "0.0000"}
                            </div>
                            {/* <div className="text-xs text-gray-400">
                              {formattedBnbBalance && formattedBnbBalance > 0 ? "$" + (formattedBnbBalance * 600).toFixed(2) : "$0.00"}
                            </div> */}
                          </div>
                        </div>

                        {/* KNET Balance */}
                        {formattedKnetBalance !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-purple-900/10 hover:border-purple-500/30 transition-all duration-200 group">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-500/30 transition-colors duration-200">
                                <Coins className="w-4 h-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors duration-200">KNET</div>
                                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Token</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-mono font-semibold text-sm">
                                {formattedKnetBalance.toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2
                                })}
                              </div>
                              {/* <div className="text-xs text-gray-400">
                                {formattedKnetBalance && formattedKnetBalance > 0 ? "~$" + (formattedKnetBalance * 0.1).toFixed(2) : "$0.00"}
                              </div> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleDisconnect}
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-red-900/40 to-red-800/30 rounded-lg border border-red-500/30 hover:from-red-800/50 hover:to-red-700/40 hover:border-red-400/50 transition-all duration-200 group"
                    >
                      <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
                      <span className="text-red-400 font-medium text-sm group-hover:text-red-300 transition-colors duration-200">
                        Disconnect
                      </span>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleConnect}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 rounded-xl px-8 py-4 text-sm font-semibold hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default FuturisticHeader;