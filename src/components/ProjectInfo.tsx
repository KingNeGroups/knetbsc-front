import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Twitter, BookOpen, Globe } from "lucide-react";

export function ProjectInfo() {
  return (
    <Card className="glass-card p-8 border-primary/20 animate-slide-in" style={{ animationDelay: "0.3s" }}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            About Floa
          </h2>
          <div className="h-1 w-24 bg-gradient-primary rounded-full" />
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Floa is an open intelligent Agent ecosystem, with its core product being cross-platform 
          intelligent Agents that are creatable, trainable, verifiable, and monetizable.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Without requiring coding skills or professional expertise, users can train Agents through 
          daily interactive tasks (e.g., conversational collaboration, task execution) to handle 
          various digital affairs (e.g., asset allocation, scenario-specific service integration) 
          and earn ecosystem rewards—serving as the "portable intelligent collaboration partner" 
          for ordinary people to enter the era of intelligent Agents.
        </p>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground font-semibold mb-2">Fair Co-Creation:</p>
          <p className="text-sm text-muted-foreground">
            92% of tokens are exclusively generated through "Agent training," with no team 
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
            Website
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
        </div>
      </div>
    </Card>
  );
}
