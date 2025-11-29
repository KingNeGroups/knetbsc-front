import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, BookOpen, Globe } from "lucide-react";
import img1 from "@/assets/img/floa/1.png";
import img2 from "@/assets/img/floa/2.jpg";
import img3 from "@/assets/img/floa/3.png";

export function ProjectInfo() {
  return (
    <div className="space-y-8">
      {/* Hero Section Card */}
      <Card className="glass-card p-8 border-purple-500/30 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: "0.3s" }}>
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/20" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-purple-500/25 to-cyan-600/15 rounded-full blur-3xl group-hover:opacity-70 transition-opacity duration-700" />
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/15 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-700" />

        {/* Animated accent border */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>

        {/* Enhanced circuit pattern */}
        <div className="absolute inset-0 opacity-4">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px), linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative z-10">
          {/* Modern ecosystem badge */}
          <div className="flex flex-col items-center space-y-6 mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-full border border-purple-500/30 backdrop-blur-md text-purple-300 text-sm font-medium shadow-lg">
              <Globe className="w-4 h-4" />
              <span className="uppercase tracking-[0.2em] font-semibold">KingNet AI Ecosystem</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                  Floa AI Agent
                </span>
              </h2>

              <div className="flex items-center justify-center gap-6">
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
              </div>

              <div className="text-sm text-purple-300 font-medium uppercase tracking-wider">
                Powered by KingNet AI
              </div>
            </div>
          </div>

          {/* Interactive Feature Gallery */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-3xl blur-xl" />
            <div className="relative grid grid-cols-3 gap-4 p-6 bg-black/20 rounded-3xl border border-purple-500/20 backdrop-blur-sm">
              <div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/40 hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={img1}
                  alt="Floa AI Feature 1"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-purple-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-300 rounded-full" />
                    AI Training
                    <div className="w-1.5 h-1.5 bg-purple-300 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-black/40 hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={img2}
                  alt="Floa AI Feature 2"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-cyan-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full" />
                    Smart Agents
                    <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-black/40 hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={img3}
                  alt="Floa AI Feature 3"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-blue-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                    Ecosystem
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Description Section */}
      <Card className="glass-card p-8 border-cyan-500/20 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500" style={{ animationDelay: "0.4s" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/10" />

        <div className="relative z-10 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Open Intelligent Agent Ecosystem
            </h3>
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-gray-300">
              Floa is an open intelligent Agent ecosystem within KingNet AI, featuring cross-platform
              intelligent Agents that are <span className="text-purple-400 font-semibold bg-purple-900/30 px-2 py-1 rounded">creatable</span>,
              <span className="text-cyan-400 font-semibold bg-cyan-900/30 px-2 py-1 rounded">trainable</span>,
              <span className="text-blue-400 font-semibold bg-blue-900/30 px-2 py-1 rounded">verifiable</span>, and monetizable.
            </p>

            <p className="text-gray-300">
              Without requiring coding skills or professional expertise, users can train Agents through
              daily interactive tasks (conversational collaboration, task execution) to handle
              various digital affairs (asset allocation, scenario-specific service integration)
              and earn KingNet AI ecosystem rewards—serving as
              <span className="text-cyan-400 font-semibold bg-cyan-900/30 px-2 py-1 rounded">"portable intelligent collaboration partners"</span>
              for everyone entering the era of intelligent Agents.
            </p>
          </div>
        </div>
      </Card>

      {/* Fair Mechanism Section */}
      <Card className="glass-card p-8 border-purple-500/25 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500" style={{ animationDelay: "0.5s" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/20" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            <h3 className="text-2xl font-bold text-purple-300 uppercase tracking-wider">Fair Co-Creation Mechanism</h3>
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
          </div>

          <div className="relative p-6 bg-black/30 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <p className="text-gray-300 leading-relaxed text-lg relative z-10">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">92%</span> of tokens are exclusively generated through "intelligent Agent training,"
              with no team allocations or private placements. All users gain rights
              and interests through genuine participation.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons Section */}
      <Card className="glass-card p-6 border-blue-500/20 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-500" style={{ animationDelay: "0.6s" }}>
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-transparent to-purple-900/10" />

        <div className="relative z-10 flex flex-wrap gap-4 justify-center">
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
      </Card>

      {/* Project Info Grid */}
      <Card className="glass-card p-6 border-purple-500/20 animate-slide-in relative overflow-hidden group backdrop-blur-xl bg-black/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all duration-500" style={{ animationDelay: "0.7s" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/10" />

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-5 bg-black/30 rounded-xl border border-purple-500/20 backdrop-blur-sm">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                Token Name
              </div>
              <div className="font-bold text-purple-300 text-xl">FLOA</div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-5 bg-black/30 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                Network
              </div>
              <div className="font-bold text-cyan-300 text-xl">BSC Chain</div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-5 bg-black/30 rounded-xl border border-blue-500/20 backdrop-blur-sm">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Ecosystem Token
              </div>
              <div className="font-bold text-blue-300 text-xl">KNET</div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-5 bg-black/30 rounded-xl border border-purple-500/20 backdrop-blur-sm">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                Powered by
              </div>
              <div className="font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent text-xl">KingNet AI</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
