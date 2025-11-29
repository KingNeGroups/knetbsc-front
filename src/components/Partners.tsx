import kingnetHK from '@/assets/img/partner/kingnethk.png';
import kingnetWL from '@/assets/img/partner/kingnetwl.png';
import smile from '@/assets/img/partner/smile.png';
import sol from '@/assets/img/partner/sol.png';
import bnb from '@/assets/img/partner/bnb.png';
import ton from '@/assets/img/partner/ton.png';
import delp from '@/assets/img/partner/delp.png';
import coco from '@/assets/img/partner/coco.png';
import dbx from '@/assets/img/partner/dbx.png';
import abga from '@/assets/img/partner/abga.png';
import second from '@/assets/img/partner/second.png';
import renwu from '@/assets/img/partner/renwu.png';
import arai from '@/assets/img/partner/arai.png';
import zypher from '@/assets/img/partner/zypher.png';

export const Partners = () => {
  const partners = [
    { img: kingnetHK, url: "https://x.com/KingnetCapital" },
    { img: kingnetWL, url: "https://kingnet.com" },
    { img: smile, url: "https://x.com/SmileCobra_GAME" },
    { img: sol, url: "https://x.com/solana" },
    { img: bnb, url: "https://x.com/BNBCHAIN" },
    { img: ton, url: "https://x.com/ton_blockchain" },
    { img: delp, url: "https://x.com/DelphinusLab" },
    { img: coco, url: "https://x.com/CocosStudioWeb3" },
    { img: dbx, url: "https://x.com/swarms_corp" },
    { img: abga, url: "https://x.com/ABGAasia" },
    { img: second, url: "https://x.com/SecondLiveReal" },
    { img: renwu, url: "https://x.com/The_StarAI" },
    { img: arai, url: "https://x.com/ARAI_Systems" },
    { img: zypher, url: "https://x.com/zypher_network" },
  ];

  const handlePartnerClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
           Ecosystem Partners
          </h2>
          <p className="text-muted-foreground text-lg">
            Building the Web3 ecosystem together with industry leaders
          </p>
        </div>
        
        <div className="relative">
          {/* Infinite Scroll Animation Container */}
          <div className="overflow-x-hidden pt-10">
            <div className="flex animate-scroll">
              {/* First Set */}
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  onClick={() => handlePartnerClick(partner.url)}
                  className="flex-shrink-0 mx-4 w-40 h-24 gaming-card group cursor-pointer cyber-border  flex items-center justify-center p-4 transition-all duration-300 group "
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={partner.img}
                      alt={`partner ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="text-xs text-muted-foreground">Logo</div>`;
                        }
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate Set for Seamless Loop */}
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  onClick={() => handlePartnerClick(partner.url)}
                  className="flex-shrink-0 mx-4 w-40 h-24 bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 flex items-center justify-center p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={partner.img}
                      alt={`partner ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="text-xs text-muted-foreground">Logo</div>`;
                        }
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
