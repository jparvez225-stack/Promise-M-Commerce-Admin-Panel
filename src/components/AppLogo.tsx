import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  className = "w-9 h-9", 
  size,
  showText = false,
  textClassName = "text-base font-black text-neutral-900"
}) => {
  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={size ? { width: size, height: size } : undefined}
      >
        <defs>
          {/* Vibrant Blue Gradient for Frame */}
          <linearGradient id="appLogoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#007ACC" />
            <stop offset="100%" stopColor="#004B8D" />
          </linearGradient>

          {/* Light Orange Top Fold */}
          <linearGradient id="appLogoOrangeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA726" />
            <stop offset="100%" stopColor="#FB8C00" />
          </linearGradient>

          {/* Dark Orange/Red Bottom Fold */}
          <linearGradient id="appLogoOrangeBottomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4511E" />
            <stop offset="100%" stopColor="#D84315" />
          </linearGradient>
        </defs>

        {/* Outer Blue Rounded Frame with Cutout */}
        <path
          d="M 28 10 H 70 A 18 18 0 0 1 88 28 V 70 A 18 18 0 0 1 70 88 H 54 C 50 88 48 85 48 81 C 48 77 50 74 54 74 H 68 A 6 6 0 0 0 74 68 V 30 A 6 6 0 0 0 68 24 H 30 A 6 6 0 0 0 24 30 V 44 C 24 48 21 50 17 50 C 13 50 10 48 10 44 V 28 A 18 18 0 0 1 28 10 Z"
          fill="url(#appLogoBlueGrad)"
        />

        {/* Paper Plane - Top Wing */}
        <path
          d="M 2 54 L 68 30 L 46 62 Z"
          fill="url(#appLogoOrangeTopGrad)"
        />

        {/* Paper Plane - Bottom Wing */}
        <path
          d="M 2 54 L 46 62 L 38 96 Z"
          fill="url(#appLogoOrangeBottomGrad)"
        />
      </svg>

      {showText && (
        <span className={textClassName}>
          Promise Mart Ltd
        </span>
      )}
    </div>
  );
};
