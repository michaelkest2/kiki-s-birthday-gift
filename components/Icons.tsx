import React from 'react';

export const PandaIcon: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Panda face icon">
    <defs>
      <radialGradient id="headGradient" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="white" />
        <stop offset="100%" stopColor="#dcdcdc" />
      </radialGradient>
    </defs>

    {/* Head */}
    <circle cx="50" cy="50" r="40" fill="url(#headGradient)" stroke="#4a4a4a" strokeWidth="0.5" />

    {/* Ears */}
    <path d="M22,38 C12,18 42,15 42,30 Z" fill="#2a2a2a" />
    <path d="M78,38 C88,18 58,15 58,30 Z" fill="#2a2a2a" />
    <path d="M27,35 C22,25 38,23 38,32 Z" fill="#1a1a1a" />
    <path d="M73,35 C78,25 62,23 62,32 Z" fill="#1a1a1a" />

    {/* Eye Patches */}
    <path d="M32,58 C25,40 50,42 48,52 Q40,65 32,58 Z" fill="#2a2a2a" transform="rotate(-10 38 50)" />
    <path d="M68,58 C75,40 50,42 52,52 Q60,65 68,58 Z" fill="#2a2a2a" transform="rotate(10 62 50)" />

    {/* Eyes */}
    <circle cx="41" cy="51" r="3" fill="#111" />
    <circle cx="59" cy="51" r="3" fill="#111" />
    <circle cx="42" cy="50" r="0.8" fill="white" />
    <circle cx="60" cy="50" r="0.8" fill="white" />

    {/* Muzzle */}
    <ellipse cx="50" cy="69" rx="16" ry="11" fill="#f0f0f0" />

    {/* Nose */}
    <path d="M50,65 C46,65 46,70 50,70 C54,70 54,65 50,65 Z" fill="#1a1a1a" />
    <path d="M50 70 L 50 73" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />

    {/* Mouth */}
    <path d="M44 76 Q 50 80 56 76" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);


export const BirthdayCakeIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Flame */}
        <path d="M 50 15 Q 55 5, 50 0 Q 45 5, 50 15 Z" fill="#FBBF24" className="animate-pulse" />
        {/* Candle */}
        <rect x="47" y="20" width="6" height="20" fill="#F87171" />
        {/* Top Layer */}
        <rect x="25" y="40" width="50" height="20" rx="5" fill="#F472B6" />
        {/* Bottom Layer */}
        <rect x="15" y="60" width="70" height="25" rx="5" fill="#EC4899" />
        {/* Drip */}
        <path d="M 25 50 C 30 60, 40 60, 45 50" stroke="#F9A8D4" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 55 50 C 60 60, 70 60, 75 50" stroke="#F9A8D4" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
);

export const EvilCarrotIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Carrot Body */}
        <polygon points="50,10 70,80 30,80" fill="#F97316" />
        <path d="M 50 25 C 55 40, 55 60, 50 75" stroke="#EA580C" strokeWidth="3" fill="none" />
        <path d="M 50 25 C 45 40, 45 60, 50 75" stroke="#EA580C" strokeWidth="3" fill="none" />

        {/* Leaves */}
        <path d="M 50 15 C 30 5, 40 5, 45 10" fill="#16A34A" />
        <path d="M 50 15 C 70 5, 60 5, 55 10" fill="#16A34A" />

        {/* Evil Face */}
        <polygon points="38,40 48,35 45,45" fill="#DC2626" transform="rotate(-10 43 40)" />
        <polygon points="62,40 52,35 55,45" fill="#DC2626" transform="rotate(10 57 40)" />
        <path d="M 40 65 Q 50 55 60 65" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
);

export const BroccoliIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full text-red-500">
        <rect x="45" y="60" width="10" height="30" fill="#A5D6A7" />
        <circle cx="50" cy="45" r="25" fill="#4CAF50" />
        <circle cx="35" cy="50" r="15" fill="#388E3C" />
        <circle cx="65"cy="50" r="15" fill="#388E3C" />
    </svg>
);

export const SafeIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
        <rect x="10" y="10" width="80" height="80" rx="5" fill="#757575"/>
        <circle cx="50" cy="50" r="25" fill="#424242"/>
        <circle cx="50" cy="50" r="20" fill="#616161"/>
        <rect x="48" y="30" width="4" height="20" fill="#BDBDBD"/>
    </svg>
);

export const IceCreamIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 20 40 L 50 90 L 80 40 Z" fill="#F59E0B" />
        <circle cx="50" cy="30" r="30" fill="#EC4899" />
        <circle cx="30" cy="35" r="15" fill="#EC4899" />
        <circle cx="70" cy="35" r="15" fill="#EC4899" />
    </svg>
);

export const DeerIcon: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Deer face icon">
    {/* Head */}
    <path d="M 50 30 C 30 30, 20 70, 25 90 Q 50 100, 75 90 C 80 70, 70 30, 50 30 Z" fill="#C68E5D" />
    {/* Muzzle */}
    <path d="M 50 75 C 40 75, 35 90, 40 95 Q 50 100, 60 95 C 65 90, 60 75, 50 75 Z" fill="#A4704C" />
    {/* Nose */}
    <circle cx="50" cy="85" r="5" fill="#4E342E" />
    {/* Eyes */}
    <circle cx="38" cy="60" r="6" fill="#4E342E" />
    <circle cx="62" cy="60" r="6" fill="#4E342E" />
    <circle cx="40" cy="58" r="1.5" fill="white" />
    <circle cx="60" cy="58" r="1.5" fill="white" />
    {/* Ears */}
    <path d="M 25 35 C 10 20, 35 15, 35 30 Z" fill="#C68E5D" />
    <path d="M 75 35 C 90 20, 65 15, 65 30 Z" fill="#C68E5D" />
    <path d="M 28 35 C 20 28, 35 25, 35 32 Z" fill="#A4704C" />
    <path d="M 72 35 C 80 28, 65 25, 65 32 Z" fill="#A4704C" />
    {/* Antlers */}
    <path d="M 35 15 C 25 -10, 5 5, 20 20" stroke="#8D6E63" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <path d="M 65 15 C 75 -10, 95 5, 80 20" stroke="#8D6E63" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <path d="M 28 5 C 18 -5, 20 10, 25 10" stroke="#8D6E63" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M 72 5 C 82 -5, 80 10, 75 10" stroke="#8D6E63" strokeWidth="4" fill="none" strokeLinecap="round"/>
  </svg>
);

export const DumbbellIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor" color="#e2e8f0">
        <rect x="10" y="40" width="25" height="20" rx="5" />
        <rect x="65" y="40" width="25" height="20" rx="5" />
        <rect x="30" y="47" width="40" height="6" rx="3" />
    </svg>
);
