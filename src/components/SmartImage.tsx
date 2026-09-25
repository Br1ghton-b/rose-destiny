import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  palette?: string[];
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function SmartImage({ src, alt, palette, className = '', loading = 'lazy' }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [c1, c2, c3] = palette && palette.length >= 1
    ? [palette[0], palette[1] ?? palette[0], palette[2] ?? '#0A0A0A']
    : ['#C9A24C', '#8E1B2A', '#0A0A0A'];

  if (failed) {
    return (
      <div className={`relative ${className}`}>
        <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id={`g-${alt}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c1} stopOpacity="0.95" />
              <stop offset="60%" stopColor={c2} stopOpacity="0.85" />
              <stop offset="100%" stopColor={c3} stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id={`r-${alt}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={`url(#g-${alt})`} />
          <rect width="400" height="500" fill={`url(#r-${alt})`} />
          {/* Stylised rose silhouette */}
          <g transform="translate(200 250)" opacity="0.92">
            <circle r="62" fill="#fff" fillOpacity="0.06" />
            <circle r="44" fill="#fff" fillOpacity="0.10" />
            <circle r="28" fill="#fff" fillOpacity="0.14" />
            <circle r="14" fill="#fff" fillOpacity="0.18" />
            <path d="M0 64 L 0 130" stroke="#C9A24C" strokeWidth="1.5" />
            <path d="M-2 100 q -28 -6 -34 -28" stroke="#C9A24C" strokeWidth="1.5" fill="none" />
            <path d="M2 110 q 28 -6 34 -28" stroke="#C9A24C" strokeWidth="1.5" fill="none" />
          </g>
          <text x="200" y="450" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" letterSpacing="6" fill="#FAF7F0" opacity="0.9">
            ROSE DESTINY
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(135deg, ${c1}40, ${c2}40, ${c3}40)`,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
