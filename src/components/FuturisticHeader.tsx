import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { LogOut, ExternalLink } from "lucide-react";
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
              <>
                <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                  <div className="relative">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-50" />
                  </div>
                  <span className="text-sm font-mono font-medium text-blue-300">{formatAddress(userAddress!)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                  className="border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Disconnect</span>
                </Button>
              </>
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