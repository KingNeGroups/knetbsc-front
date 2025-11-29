import { Link } from "react-router-dom";
import { Twitter, Github, MessageSquare, Mail, Globe, Send } from "lucide-react";
import kingnetLogo from "@/assets/logo.png";
import solgenLogo from "@/assets/img/floa/solgen+logo.png";

export const Footer = () => {

  const socialLinks = [
    {
      href: "https://twitter.com",
      icon: Twitter,
      label: "Twitter"
    },
    {
      href: "https://github.com",
      icon: Github,
      label: "GitHub"
    },
    {
      href: "https://discord.com",
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      label: "Discord"
    },
    {
      href: "https://t.me",
      icon: Send,
      label: "Telegram"
    },
    {
      href: "mailto:contact@kingnet.ai",
      icon: Mail,
      label: "Email"
    }
  ];

  return (
    <footer className="relative border-t border-border/30 bg-gradient-to-br from-background via-background to-muted/10 mt-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container relative z-10">
        {/* Main Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-6 flex-wrap">
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <img
                    src={kingnetLogo}
                    alt="KINGNET AI Logo"
                    className="h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* <span className="text-2xl font-bold gradient-text">KINGNET AI</span> */}
                </Link>

                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs text-blue-300 font-medium">Powered by</span>
                  <img
                    src={solgenLogo}
                    alt="Solgen Logo"
                    className="h-8 object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 glass-card-light rounded-xl">
                <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground italic">
                  The next-generation decentralized token issuance platform, an AI-driven fair launch ecosystem providing the most reliable token creation and management solutions for global innovators.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div className="w-10 h-10 rounded-lg glass-card-light flex items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:scale-110 hover-lift">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
        
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 KINGNET AI Laboratory. All Rights Reserved
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {/* <span>由 ❤️ 和 AI 驱动</span> */}
              <Link
                to="/language"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                {/* <Globe className="w-4 h-4" /> */}
                <span>Content Copyright Agreement</span>
              </Link>
              <Link
                to="/language"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                {/* <Globe className="w-4 h-4" /> */}
                <span>Privacy Protection Framework</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};