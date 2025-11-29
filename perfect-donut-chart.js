// Perfect Donut Chart Component - No Gaps Guaranteed
import React from 'react';

export const PerfectDonutChart = () => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer ring with conic gradient - perfect closure guaranteed */}
      <div
        className="absolute inset-0 rounded-full shadow-2xl"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #8b5cf6 0deg, #8b5cf6 331.2deg, #3b82f6 331.2deg, #3b82f6 349.2deg, #06b6d4 349.2deg, #06b6d4 360deg, #8b5cf6 360deg)',
        }}
      />

      {/* Inner circle to create donut effect */}
      <div
        className="absolute inset-4 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-yellow-500/20 shadow-inner"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">100M</div>
          <div className="text-sm text-gray-300">$FLOA</div>
        </div>
      </div>

      {/* Animated dots for each segment */}
      <div
        className="absolute w-3 h-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg animate-pulse shadow-purple-400/50"
        style={{
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />

      <div
        className="absolute w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg animate-pulse shadow-blue-400/50"
        style={{
          top: '50%',
          right: '8px',
          transform: 'translateY(-50%)',
          animationDelay: '0.5s'
        }}
      />

      <div
        className="absolute w-3 h-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-lg animate-pulse shadow-cyan-400/50"
        style={{
          bottom: '20px',
          right: '32px',
          animationDelay: '1s'
        }}
      />
    </div>
  );
};