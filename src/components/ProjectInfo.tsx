import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, BookOpen, Globe } from "lucide-react";

export function ProjectInfo() {
  return (
    <Card className="glass-card p-10 border-purple-500/30 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/40" style={{ animationDelay: "0.3s" }}>
      {/* Futuristic background effects */}
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/20 via-cyan-900/10 to-black/50" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/30 to-cyan-600/20 rounded-full blur-3xl group-hover:opacity-60 transition-opacity duration-700" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/15 rounded-full blur-2xl group-hover:opacity-50 transition-opacity duration-700" />

      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Digital circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }} />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-4">
          {/* Futuristic ecosystem badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 rounded-full border border-purple-500/30 backdrop-blur-sm text-purple-300 text-sm font-medium mx-auto">
            <Globe className="w-4 h-4" />
            <span className="uppercase tracking-wider">KingNet AI Ecosystem</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              Floa AI Agent
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </div>

          <div className="mt-2 text-sm text-purple-300 font-medium uppercase tracking-wider">
            Powered by KingNet AI
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed text-lg">
            Floa is an open intelligent Agent ecosystem within KingNet AI, featuring cross-platform
            intelligent Agents that are <span className="text-purple-400 font-semibold">creatable, trainable, verifiable</span>, and monetizable.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            Without requiring coding skills or professional expertise, users can train Agents through
            daily interactive tasks (conversational collaboration, task execution) to handle
            various digital affairs (asset allocation, scenario-specific service integration)
            and earn KingNet AI ecosystem rewards—serving as <span className="text-cyan-400 font-semibold">"portable intelligent collaboration partners"</span>
            for everyone entering the era of intelligent Agents.
          </p>

          <div className="p-6 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-xl border border-purple-500/30 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <p className="text-purple-300 font-bold text-lg uppercase tracking-wider">Fair Co-Creation Mechanism</p>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              </div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-2xl font-bold text-purple-400">92%</span> of tokens are exclusively generated through "intelligent Agent training,"
                with no team allocations or private placements. All users gain rights
                and interests through genuine participation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="outline"
            className="border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/20 text-purple-300 hover:text-purple-200 rounded-xl px-6 py-3 transition-all duration-300 group relative overflow-hidden"
            onClick={() => window.open("https://floahive.com/", "_blank")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Globe className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Official Website</span>
            <ExternalLink className="w-3 h-3 ml-2 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            className="border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/20 text-cyan-300 hover:text-cyan-200 rounded-xl px-6 py-3 transition-all duration-300 group relative overflow-hidden"
            onClick={() => window.open("https://x.com/Floa_AI", "_blank")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Twitter className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Twitter</span>
            <ExternalLink className="w-3 h-3 ml-2 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            className="border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/20 text-blue-300 hover:text-blue-200 rounded-xl px-6 py-3 transition-all duration-300 group relative overflow-hidden"
            onClick={() => window.open("https://docs.floahive.com/", "_blank")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BookOpen className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Documentation</span>
            <ExternalLink className="w-3 h-3 ml-2 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-purple-500/30">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4 bg-black/30 rounded-lg border border-purple-500/20">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Token Name</div>
              <div className="font-bold text-purple-300 text-lg">FLOA</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4 bg-black/30 rounded-lg border border-cyan-500/20">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Network</div>
              <div className="font-bold text-cyan-300 text-lg">BSC Chain</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4 bg-black/30 rounded-lg border border-blue-500/20">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Ecosystem Token</div>
              <div className="font-bold text-blue-300 text-lg">KNET</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4 bg-black/30 rounded-lg border border-purple-500/20">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Powered by</div>
              <div className="font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent text-lg">KingNet AI</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
