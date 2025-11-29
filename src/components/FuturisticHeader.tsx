import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { LogOut, ExternalLink, ChevronDown, Copy, Wallet, Coins } from "lucide-react";
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

  // Copy address to clipboard
  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
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
                <DropdownMenuContent align="end" className="bg-gray-900/95 backdrop-blur-xl border border-blue-500/20 min-w-[280px]">
                  <DropdownMenuLabel className="text-blue-300 font-mono text-xs">
                    Wallet Address
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => copyAddress(userAddress!)}
                    className="text-gray-300 hover:text-white hover:bg-blue-900/20 cursor-pointer py-3"
                  >
                    <Wallet className="w-4 h-4 mr-2 text-blue-400" />
                    <div className="flex-1 font-mono text-sm">
                      {userAddress}
                    </div>
                    <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-blue-500/20" />

                  <DropdownMenuLabel className="text-blue-300 font-mono text-xs">
                    Balances
                  </DropdownMenuLabel>

                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-blue-900/20 cursor-pointer py-3">
                    <Coins className="w-4 h-4 mr-2 text-yellow-400" />
                    <div className="flex-1">
                      <div className="font-semibold">BNB</div>
                      <div className="text-xs text-gray-400">Binance Smart Chain</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">
                        {formattedBnbBalance ? formattedBnbBalance.toFixed(4) : "0.0000"}
                      </div>
                    </div>
                  </DropdownMenuItem>

                  {formattedKnetBalance !== undefined && (
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-blue-900/20 cursor-pointer py-3">
                      <Coins className="w-4 h-4 mr-2 text-purple-400" />
                      <div className="flex-1">
                        <div className="font-semibold">KNET</div>
                        <div className="text-xs text-gray-400">Token</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm">
                          {formattedKnetBalance.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator className="bg-blue-500/20" />

                  <DropdownMenuItem
                    onClick={handleDisconnect}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
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