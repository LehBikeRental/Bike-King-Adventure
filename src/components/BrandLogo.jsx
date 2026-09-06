"use client";

import React from 'react';

export default function BrandLogo({ size = 48, showText = true, isLight = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
      {/* Brand Logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}
      >
        <defs>
          <clipPath id="circleClip">
            <circle cx="250" cy="220" r="145" />
          </clipPath>
          <path id="textArc" d="M 140 230 A 120 120 0 0 1 360 230" fill="none" />
        </defs>

        {/* Compass Star Points (N, S, E, W) */}
        {/* North Point */}
        <polygon points="250,20 266,120 250,110 234,120" fill="#090D16" />
        <polygon points="250,20 250,110 234,120" fill="#1E293B" />
        {/* South Point */}
        <polygon points="250,440 266,340 250,350 234,340" fill="#090D16" />
        <polygon points="250,440 250,350 266,340" fill="#1E293B" />
        {/* East Point */}
        <polygon points="460,230 360,246 370,230 360,214" fill="#090D16" />
        <polygon points="460,230 370,230 360,214" fill="#1E293B" />
        {/* West Point */}
        <polygon points="40,230 140,246 130,230 140,214" fill="#090D16" />
        <polygon points="40,230 130,230 140,246" fill="#1E293B" />

        {/* Outer Circle Rings */}
        <circle cx="250" cy="230" r="160" stroke="#090D16" strokeWidth="8" fill="none" />
        <circle cx="250" cy="230" r="152" stroke="#090D16" strokeWidth="2.5" fill="none" />

        {/* Inside Sky & Mountain Scene (Clipped in Circle) */}
        <g clipPath="url(#circleClip)">
          {/* Blue Sky Background */}
          <rect x="90" y="60" width="320" height="320" fill="#00A3E0" />

          {/* Mountains Silhouette */}
          {/* Back Mountains */}
          <polygon points="90,260 170,140 250,230 330,130 410,260" fill="#0F172A" />
          {/* Snow on Peaks */}
          <polygon points="170,140 150,175 165,170 170,180 185,165 190,175" fill="#FFFFFF" />
          <polygon points="330,130 310,165 325,160 330,172 348,158 355,168" fill="#FFFFFF" />

          {/* Foreground Big Central Mountain */}
          <polygon points="120,270 250,110 390,270" fill="#090D16" />
          {/* Snow on Central Peak */}
          <polygon points="250,110 220,155 240,150 250,165 265,148 285,160" fill="#FFFFFF" />

          {/* Curving Highway Road */}
          <path d="M 100 270 Q 200 215 320 240 T 410 270 L 410 300 L 90 300 Z" fill="#E2E8F0" />
          <path d="M 100 270 Q 200 215 320 240 T 410 270" stroke="#090D16" strokeWidth="6" fill="none" />
          <path d="M 120 290 Q 220 238 340 255" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 6" fill="none" />

          {/* Adventure Biker with Panniers */}
          <g transform="translate(195, 160) scale(0.95)">
            {/* Rider */}
            <circle cx="50" cy="20" r="11" fill="#FFFFFF" stroke="#090D16" strokeWidth="2" />
            <path d="M 42 30 Q 55 24 64 36 L 56 60 L 40 50 Z" fill="#FFFFFF" stroke="#090D16" strokeWidth="2" />
            
            {/* Motorcycle Body & Tank */}
            <path d="M 25 50 L 52 44 L 68 55 L 75 70 L 20 70 Z" fill="#090D16" />
            <path d="M 28 42 L 38 32 L 44 44 Z" fill="#FFFFFF" />
            
            {/* Wheels */}
            <circle cx="22" cy="72" r="14" fill="#090D16" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="22" cy="72" r="6" fill="#FFFFFF" />
            <circle cx="82" cy="72" r="14" fill="#090D16" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="82" cy="72" r="6" fill="#FFFFFF" />

            {/* Rear Pannier Boxes (Touring Luggage) */}
            <rect x="76" y="44" width="20" height="20" rx="3" fill="#FFFFFF" stroke="#090D16" strokeWidth="2.5" />
            <rect x="76" y="38" width="18" height="6" rx="2" fill="#090D16" />

            {/* Exhaust Pipe */}
            <path d="M 50 68 L 76 65" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Arched Red Text BIKER KING */}
          <text fill="#E11D48" fontSize="26" fontWeight="900" fontFamily="var(--font-display), sans-serif" letterSpacing="5">
            <textPath href="#textArc" startOffset="50%" textAnchor="middle">
              BIKER KING
            </textPath>
          </text>
        </g>

        {/* Lower Banner & Bold ADVENTURE Text */}
        <g transform="translate(0, 310)">
          {/* Background Cutout for Text */}
          <rect x="40" y="-12" width="420" height="74" fill={isLight ? '#0F172A' : '#FFFFFF'} rx="8" />
          
          <text
            x="250"
            y="44"
            textAnchor="middle"
            fill={isLight ? '#FFFFFF' : '#090D16'}
            fontFamily="var(--font-display), 'Arial Black', sans-serif"
            fontSize="64"
            fontWeight="950"
            letterSpacing="6"
            style={{ textTransform: 'uppercase' }}
          >
            ADVENTURE
          </text>
        </g>
      </svg>

      {/* Brand Typography Label Next to Logo (optional) */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: size > 40 ? '1.25rem' : '1.05rem',
            fontWeight: 950,
            letterSpacing: '0.04em',
            color: isLight ? 'var(--white)' : 'var(--slate-900)',
            lineHeight: 1,
            textTransform: 'uppercase'
          }}>
            BIKER KING
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: size > 40 ? '0.78rem' : '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: 'var(--primary-orange)',
            textTransform: 'uppercase',
            marginTop: '3px'
          }}>
            ADVENTURE
          </span>
        </div>
      )}
    </div>
  );
}
