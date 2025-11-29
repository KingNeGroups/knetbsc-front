import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, BookOpen, Globe } from "lucide-react";

export function ProjectInfo() {
  return (
    <Card className="glass-card p-8 border-primary/30 animate-slide-in relative overflow-hidden group" style={{ animationDelay: "0.3s" }}>
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-secondary opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full border border-secondary/20 text-secondary text-sm font-medium mx-auto">
            <Globe className="w-4 h-4" />
            <span>KingNet AI Ecosystem</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Floa AI Agent
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent rounded-full mx-auto" />
          <div className="mt-2 text-xs text-secondary/60 font-medium uppercase tracking-wide">
            Powered by KingNet AI
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Floa is an open intelligent Agent ecosystem within KingNet AI, with its core product being cross-platform
          intelligent Agents that are creatable, trainable, verifiable, and monetizable.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Without requiring coding skills or professional expertise, users can train Agents through
          daily interactive tasks (e.g., conversational collaboration, task execution) to handle
          various digital affairs (e.g., asset allocation, scenario-specific service integration)
          and earn KingNet AI ecosystem rewards—serving as the "portable intelligent collaboration partner"
          for ordinary people to enter the era of intelligent Agents.
        </p>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground font-semibold mb-2">Fair Co-Creation Mechanism</p>
          <p className="text-sm text-muted-foreground">
            92% of tokens are exclusively generated through "intelligent Agent training," with no team
            allocations or private placements. All users (individuals/institutions) gain rights
            and interests through genuine participation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
            onClick={() => window.open("https://floahive.com/", "_blank")}
          >
            <Globe className="w-4 h-4 mr-2" />
            Official Website
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
            onClick={() => window.open("https://x.com/Floa_AI", "_blank")}
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
            onClick={() => window.open("https://docs.floahive.com/", "_blank")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Documentation
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-muted-foreground text-sm mb-1">Token Name</div>
            <div className="font-semibold text-primary">FLOA</div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">Network</div>
            <div className="font-semibold">BSC Chain</div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">Ecosystem Token</div>
            <div className="font-semibold text-secondary">KNET</div>
          </div>
          <div>
            <div className="text-muted-foreground text-sm mb-1">Powered by</div>
            <div className="font-semibold text-accent">KingNet AI</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
