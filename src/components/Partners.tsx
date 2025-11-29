import { useState, useEffect } from 'react';
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

const partners = [
    { img: kingnetHK, url: "https://x.com/KingnetCapital", name: "Kingnet Capital" },
    { img: kingnetWL, url: "https://kingnet.com", name: "Kingnet" },
    { img: smile, url: "https://x.com/SmileCobra_GAME", name: "Smile Cobra" },
    { img: sol, url: "https://x.com/solana", name: "Solana" },
    { img: bnb, url: "https://x.com/BNBCHAIN", name: "BNB Chain" },
    { img: ton, url: "https://x.com/ton_blockchain", name: "TON Blockchain" },
    { img: delp, url: "https://x.com/DelphinusLab", name: "Delphinus Lab" },
    { img: coco, url: "https://x.com/CocosStudioWeb3", name: "Cocos Studio" },
    { img: dbx, url: "https://x.com/swarms_corp", name: "DBX" },
    { img: abga, url: "https://x.com/ABGAasia", name: "ABGA" },
    { img: second, url: "https://x.com/SecondLiveReal", name: "Second Live" },
    { img: renwu, url: "https://x.com/The_StarAI", name: "The Star AI" },
    { img: arai, url: "https://x.com/ARAI_Systems", name: "ARAI Systems" },
    { img: zypher, url: "https://x.com/zypher_network", name: "Zypher Network" },
  ];

export const Partners = () => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = partners.map(async (partner) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => {
            setImageErrors(prev => new Set(prev).add(partner.img));
            resolve();
          };
          img.src = partner.img;
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    preloadImages();
  }, []);

  // Check if image has error and show fallback
  const hasImageError = (imgSrc: string) => imageErrors.has(imgSrc);

  const handlePartnerClick = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent, url: string, name: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePartnerClick(url, name);
    }
  };

  return (
    <section className="relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* <div className="text-center mb-6 md:mb-8 animate-slide-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-primary">
           Ecosystem Partners
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Building the Web3 ecosystem together with industry leaders
          </p>
        </div> */}

        <div className="relative">
          {/* Infinite Scroll Animation Container */}
          <div className="overflow-x-hidden pt-8 md:pt-10">
            <div className="flex animate-scroll">
              {/* First Set */}
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  onClick={() => handlePartnerClick(partner.url, partner.name)}
                  onKeyDown={(e) => handleKeyDown(e, partner.url, partner.name)}
                  className="flex-shrink-0 mx-2 md:mx-4 w-32 md:w-40 h-20 md:h-24 partner-card rounded-xl flex items-center justify-center p-3 md:p-4 cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  aria-label={`Visit ${partner.name} website`}
                >
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    {hasImageError(partner.img) ? (
                      <div className="text-xs text-muted-foreground text-center px-2">{partner.name}</div>
                    ) : (
                      <img
                        src={partner.img}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(partner.img));
                        }}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              ))}
              {/* Duplicate Set for Seamless Loop */}
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  onClick={() => handlePartnerClick(partner.url, partner.name)}
                  onKeyDown={(e) => handleKeyDown(e, partner.url, partner.name)}
                  className="flex-shrink-0 mx-2 md:mx-4 w-32 md:w-40 h-20 md:h-24 partner-card rounded-xl flex items-center justify-center p-3 md:p-4 cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  aria-label={`Visit ${partner.name} website`}
                >
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    {hasImageError(partner.img) ? (
                      <div className="text-xs text-muted-foreground text-center px-2">{partner.name}</div>
                    ) : (
                      <img
                        src={partner.img}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                        onError={() => {
                          setImageErrors(prev => new Set(prev).add(partner.img));
                        }}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays for fade effect - responsive widths */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
};
