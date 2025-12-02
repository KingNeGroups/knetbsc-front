import { Card } from "@/components/ui/card";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { Wallet, Trophy, Star, TrendingUp, Users, Award } from "lucide-react";
import { getUserParticipation, getAllParticipants, getTotalParticipation } from "@/data/userParticipation";

export function UserParticipationDisplay() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  // Get user's participation data
  const userParticipation = address ? getUserParticipation(address) : null;
  const allParticipants = getAllParticipants();
  const totalStats = getTotalParticipation();

  // Find user's rank
  const userRank = userParticipation
    ? allParticipants.findIndex(p => p.address.toLowerCase() === address?.toLowerCase()) + 1
    : null;

  // Get top participants
  const topParticipants = allParticipants.slice(0, 5);

  if (!isConnected) {
    return (
      <div className="relative transform -rotate-1">
        <div className="absolute -inset-4 bg-gradient-to-br from-purple-900/30 via-cyan-900/20 to-blue-900/30 backdrop-blur-2xl rounded-[3rem_1rem_4rem_1rem] blur-xl" />
        <Card className="relative bg-black/40 backdrop-blur-2xl border border-blue-500/30 rounded-[4rem_1rem_3rem_2rem] p-8 overflow-hidden hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-700 hover:-translate-y-2">
          {/* Floating elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 rounded-full blur-xl" />

          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full border border-blue-500/40 backdrop-blur-md text-blue-300 font-medium shadow-lg">
                <Trophy className="w-4 h-4" />
                <span className="uppercase tracking-[0.2em] font-semibold">Your Rewards</span>
              </div>
            </div>

            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full flex items-center justify-center">
                <Wallet className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-400 mb-6">View your FLOA token rewards from the generation event</p>

              <button
                onClick={() => open()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-500 font-bold text-lg rounded-2xl h-16 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center">
                  <Wallet className="w-5 h-5 mr-3" />
                  <span className="uppercase tracking-wider">Connect Wallet</span>
                </div>
              </button>
            </div>

            {/* Total stats */}
            {/* <div className="border-t border-blue-500/20 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-blue-300">{allParticipants.length}</div>
                  <div className="text-xs text-gray-400">Participants</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20">
                  <Star className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-300">{totalStats.totalFloa.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Total FLOA</div>
                </div>
              </div>
            </div> */}
          </div>
        </Card>
      </div>
    );
  }

  if (!userParticipation) {
    return (
      <div className="relative transform -rotate-1">
        <div className="absolute -inset-4 bg-gradient-to-br from-purple-900/30 via-cyan-900/20 to-blue-900/30 backdrop-blur-2xl rounded-[3rem_1rem_4rem_1rem] blur-xl" />
        <Card className="relative bg-black/40 backdrop-blur-2xl border border-blue-500/30 rounded-[4rem_1rem_3rem_2rem] p-8 overflow-hidden hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-700 hover:-translate-y-2">
          {/* Floating elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 rounded-full blur-xl" />

          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full border border-blue-500/40 backdrop-blur-md text-blue-300 font-medium shadow-lg">
                <Award className="w-4 h-4" />
                <span className="uppercase tracking-[0.2em] font-semibold">Participation Status</span>
              </div>
            </div>

            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-500/20 to-gray-600/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">No Participation Found</h3>
              <p className="text-gray-400">This wallet address did not participate in the FLOA token generation event</p>
            </div>

            {/* Total stats */}
            {/* <div className="border-t border-blue-500/20 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-blue-300">{allParticipants.length}</div>
                  <div className="text-xs text-gray-400">Participants</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20">
                  <Star className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-300">{totalStats.totalFloa.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Total FLOA</div>
                </div>
              </div>
            </div> */}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative transform -rotate-1">
      <div className="absolute -inset-4 bg-gradient-to-br from-purple-900/30 via-cyan-900/20 to-blue-900/30 backdrop-blur-2xl rounded-[3rem_1rem_4rem_1rem] blur-xl" />
      <Card className="relative bg-black/40 backdrop-blur-2xl border border-blue-500/30 rounded-[4rem_1rem_3rem_2rem] p-8 overflow-hidden hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-700 hover:-translate-y-2">
        {/* Floating elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 rounded-full blur-xl" />

        <div className="relative z-10 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full border border-blue-500/40 backdrop-blur-md text-blue-300 font-medium shadow-lg">
              <Trophy className="w-4 h-4" />
              <span className="uppercase tracking-[0.2em] font-semibold">Your Rewards</span>
            </div>
          </div>

          {/* User's participation status */}
          <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                <span className="text-green-400 text-sm font-medium uppercase tracking-wider">Participant</span>
              </div>
              {/* {userRank && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Rank #{userRank}</span>
                </div>
              )} */}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-black/30 rounded-xl border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-300">{userParticipation.knetAmountFormatted}</div>
                <div className="text-sm text-gray-400">$KNET Contributed</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-xl border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-300">{userParticipation.floaAmountFormatted}</div>
                <div className="text-sm text-gray-400">$FLOA Rewards</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500">
              Conversion Rate: 1 KNET = 0.12588 FLOA
            </div>
          </div>

          {/* Top participants */}
          {/* <div className="border-t border-blue-500/20 pt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              <h4 className="text-lg font-bold text-gray-300">Top Participants</h4>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>

            <div className="space-y-2">
              {topParticipants.slice(0, 3).map((participant, index) => (
                <div key={participant.address} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-500/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                      index === 1 ? 'bg-gray-500/20 text-gray-400 border border-gray-500/40' :
                      'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">
                        {participant.address.slice(0, 6)}...{participant.address.slice(-4)}
                      </div>
                      <div className="text-xs text-gray-500">{participant.knetAmountFormatted} KNET</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-300">{participant.floaAmountFormatted}</div>
                    <div className="text-xs text-gray-500">FLOA</div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Total event stats */}
          {/* <div className="border-t border-blue-500/20 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
                <Users className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <div className="text-lg font-bold text-blue-300">{allParticipants.length}</div>
                <div className="text-xs text-gray-400">Total Participants</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <div className="text-lg font-bold text-purple-300">{totalStats.totalFloa.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total FLOA</div>
              </div>
            </div>
          </div> */}
        </div>
      </Card>
    </div>
  );
}