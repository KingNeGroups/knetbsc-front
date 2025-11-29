import { Link } from "react-router-dom";
import { Twitter, Github, MessageSquare, Mail, Globe, Send, ExternalLink } from "lucide-react";
import kingnetLogo from "@/assets/logo.png";
import solgenLogo from "@/assets/img/floa/solgen+logo.png";
import DexIcon from "@/assets/img/dex4.svg"

export const Footer = () => {

  const socialLinks = [
    {
      href: "https://x.com/Kingnet_AI",
      icon: Twitter,
      label: "Twitter"
    },
    {
      href: "",
      icon: Github,
      label: "GitHub"
    },
    // {
    //   href: "",
    //   icon: () => (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    //     </svg>
    //   ),
    //   label: "Discord"
    // },
    { image: DexIcon, href: 'https://dexscreener.com/solana/CfVs3waH2Z9TM397qSkaipTDhA9wWgtt8UchZKfwkYiu', label:'Dexscreener'},
    {
      href: "https://dexscreener.com/solana/b1jkxqh1yvtqtravmastwoy2pu54ssjlqfwphl9vwpgu",
      icon: Send,
      label: "Telegram"
    },
    {
      href: "",
      icon: Mail,
      label: "Email"
    }
  ];

  return (
    <footer className="relative border-t border-border/30 bg-gradient-to-br from-background via-background to-muted/10  overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container relative z-10">
        {/* Main Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Brand Section - Left Column */}
            <div className="lg:col-span-1 space-y-8 transform -rotate-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-[3rem_1rem_4rem_1rem] blur-xl" />

              <div className="relative space-y-6">
                <Link to="/" className="inline-flex items-center gap-4 group">
                  <div className="relative">
                    <img
                      src={kingnetLogo}
                      alt="KINGNET AI Logo"
                      className="h-14 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                <div className="relative transform rotate-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/20 backdrop-blur-xl rounded-[2rem_1rem_3rem_1rem] blur-lg" />
                  <div className="relative p-6 glass-card-light rounded-[2rem_1rem_3rem_1rem] border border-purple-500/20">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <MessageSquare className="w-6 h-6 text-primary mt-1 flex-shrink-0 transform -rotate-3" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/20 rounded-full blur-md" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The next-generation decentralized token issuance platform, an AI-driven fair launch ecosystem providing the most reliable token creation and management solutions for global innovators.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links - Asymmetric Layout */}
                <div className="relative transform -rotate-2">
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative transform hover:scale-110 transition-all duration-300"
                          style={{
                            transform: `rotate(${index % 2 === 0 ? index * 3 : -index * 3}deg)`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          
                          <div className="w-12 h-12 rounded-xl glass-card-light flex items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/20 hover-lift border border-primary/10 hover:border-primary/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {social.icon ? (
      
                            <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-300 relative z-10 transform group-hover:rotate-6" />

                            ) : (
                              <img src={social.image} alt={social.label} className="w-5 h-5 fill-current opacity-70" />
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Spacer - Floating Elements */}
            <div className="lg:col-span-1 relative hidden lg:block">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/10 rounded-full w-32 h-32 blur-xl animate-pulse" />
                  <div className="relative flex items-center justify-center w-32 h-32 rounded-full border border-purple-500/20 glass-card-light transform rotate-6 animate-float">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/10 backdrop-blur-xl flex items-center justify-center transform -rotate-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400/30 to-cyan-400/30 backdrop-blur-md animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Connection Elements */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.6)] transform rotate-12" />
              <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)] transform -rotate-6" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)] transform rotate-3" style={{ animationDelay: "1s" }} />
            </div>

            {/* Links Section - Right Column */}
            <div className="lg:col-span-1 space-y-6 transform rotate-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-l from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-[1rem_3rem_2rem_4rem] blur-xl" />

              <div className="relative space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full border border-blue-500/30 backdrop-blur-md text-blue-300 text-sm font-medium shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-500">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    <span className="uppercase tracking-[0.2em] font-bold">Legal & Policy</span>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative transform -rotate-1 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                    <Link
                      to="/"
                      className="flex items-center justify-between p-5 glass-card-light rounded-[2rem_1rem_3rem_1rem] border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group-hover:scale-[1.02] relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Globe className="w-5 h-5 text-blue-400 transform group-hover:rotate-12 transition-all duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-blue-300 font-medium group-hover:text-blue-200 transition-colors">Copyright</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300 transform group-hover:translate-x-1">
                        <ExternalLink className="w-3 h-3 text-blue-400" />
                      </div>
                    </Link>
                  </div>

                  <div className="relative transform rotate-2 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                    <Link
                      to="/"
                      className="flex items-center justify-between p-5 glass-card-light rounded-[1rem_3rem_2rem_1rem] border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group-hover:scale-[1.02] relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg transform group-hover:rotate-12 transition-all duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-cyan-400/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-purple-300 font-medium group-hover:text-purple-200 transition-colors">Privacy</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all duration-300 transform group-hover:translate-x-1">
                        <ExternalLink className="w-3 h-3 text-purple-400" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Copyright - Floating Badge */}
                <div className="relative transform -rotate-1 mt-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-blue-900/20 backdrop-blur-xl rounded-[3rem_1rem_2rem_1rem] blur-lg" />
                  <div className="relative p-4 glass-card-light rounded-[3rem_1rem_2rem_1rem] border border-gray-500/20 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                      <span>© 2025 KINGNFUN</span>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 opacity-80">
                      All Rights Reserved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};