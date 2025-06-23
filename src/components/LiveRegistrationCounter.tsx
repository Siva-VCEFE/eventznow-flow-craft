
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface LiveRegistrationCounterProps {
  count: number;
}

const LiveRegistrationCounter = ({ count }: LiveRegistrationCounterProps) => {
  const [currentCount, setCurrentCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate live count updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsAnimating(true);
        setCurrentCount(prev => prev + 1);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge 
      variant="outline" 
      className={`bg-green-50 text-green-700 border-green-200 animate-pulse ${
        isAnimating ? 'scale-110 transition-transform duration-300' : ''
      }`}
    >
      <TrendingUp className="w-3 h-3 mr-1" />
      Live: +{currentCount}
    </Badge>
  );
};

export default LiveRegistrationCounter;
