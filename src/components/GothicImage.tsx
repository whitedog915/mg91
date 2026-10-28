import React, { useState } from 'react';
import { getImageUrl } from '../data/loreData';
import { ShieldAlert, Sparkles } from 'lucide-react';

interface GothicImageProps {
  code: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  showCodeBadge?: boolean;
}

export const GothicImage: React.FC<GothicImageProps> = ({
  code,
  alt,
  className = '',
  aspectRatio = 'auto',
  showCodeBadge = true,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'wide'
      ? 'aspect-[16/9]'
      : '';

  const imageUrl = getImageUrl(code);

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-[#3d1a24]/60 bg-[#121118] ${aspectClass} ${className} group`}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#15131b] animate-pulse">
          <div className="w-6 h-6 border-2 border-[#b45309] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!error ? (
        <img
          src={imageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1c1318] to-[#0e0c10] text-center">
          <div className="w-10 h-10 mb-2 rounded-full border border-[#8b1524]/50 bg-[#2a1016] flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </div>
          <span className="text-xs font-serif-kr text-[#d4af37] font-semibold">{alt}</span>
          <span className="text-[10px] font-mono-code text-[#8b1524] mt-0.5">[{code}] 마계 각인 인장</span>
        </div>
      )}

      {/* Subtle vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Code badge in the corner */}
      {showCodeBadge && (
        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs border border-[#4a1c28] text-[10px] font-mono-code text-[#d4af37]/90 tracking-wider">
          {code}
        </div>
      )}
    </div>
  );
};
