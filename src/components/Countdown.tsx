import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface CountdownProps {
  targetDate: Date;
  title?: string;
}

export function Countdown({ targetDate, title = "Countdown" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary/10 rounded-full blur-xl group-hover:bg-gradient-primary/20 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3 opacity-70">
          {title}
        </div>

        {!isExpired ? (
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-xs text-primary/60 mt-1">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-xs text-primary/60 mt-1">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-xs text-primary/60 mt-1">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-xs text-primary/60 mt-1">Seconds</div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500 animate-pulse">
              Ended
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              The countdown has ended
            </div>
          </div>
        )}

        {/* <div className="mt-3 text-xs text-muted-foreground text-center">
          Target: {targetDate.toLocaleString()}
        </div> */}
      </div>
    </Card>
  );
}