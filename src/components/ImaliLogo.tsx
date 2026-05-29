/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface ImaliLogoProps {
  className?: string;
  size?: number | string;
}

export default function ImaliLogo({ className = "", size = 160 }: ImaliLogoProps) {
  return (
    <svg
      id="imali_vector_logo"
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none drop-shadow-[0_4px_16px_rgba(214,175,55,0.25)] ${className}`}
    >
      <defs>
        {/* Luxury Gold Glossy Gradient to match the exact metallic shine in the image */}
        <linearGradient id="goldGlossy" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#FFF5CC" />
          <stop offset="15%" stopColor="#ECC45C" />
          <stop offset="35%" stopColor="#C29221" />
          <stop offset="55%" stopColor="#7E580A" />
          <stop offset="75%" stopColor="#D8A82D" />
          <stop offset="90%" stopColor="#FCE78D" />
          <stop offset="100%" stopColor="#9C7311" />
        </linearGradient>

        {/* Outer Ring Gold Gradient */}
        <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA5" />
          <stop offset="50%" stopColor="#C5962B" />
          <stop offset="100%" stopColor="#8A620E" />
        </linearGradient>

        {/* Text Curved Paths - absolute concentric arcs to match the logo text curves */}
        {/* Top-Right Arc for "IMALI" */}
        <path
          id="topRightArcText"
          d="M 285,75 A 175,175 0 0,1 425,215"
          fill="none"
        />
        
        {/* Bottom-Left Arc for "Ngesizulu" */}
        <path
          id="bottomLeftArcText"
          d="M 75,285 A 175,175 0 0,0 215,425"
          fill="none"
        />

        {/* Drop shadow for central elements to increase separation */}
        <filter id="handShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* 1. SOLID BLACK INNER REGION (No white background behind the circle) */}
      <circle cx="250" cy="250" r="236" fill="#000000" stroke="url(#goldRingGrad)" strokeWidth="6" />

      {/* 2. INNER SYMMETRICAL GOLD CRESCENTS */}
      
      {/* Top-Left Crescent: sweeps 12 o'clock to 9 o'clock */}
      <path
        d="M 250,22 
           A 228,228 0 0,0 22,250 
           L 95,250 
           A 155,155 0 0,1 250,95 
           Z"
        fill="url(#goldGlossy)"
      />

      {/* Bottom-Right Crescent: sweeps 6 o'clock to 3 o'clock */}
      <path
        d="M 250,478 
           A 228,228 0 0,0 478,250 
           L 405,250 
           A 155,155 0 0,1 250,405 
           Z"
        fill="url(#goldGlossy)"
      />

      {/* 3. SOLID HANDS WITH VISIBLE GRAPHIC LINES */}
      {/* Recreating the hands from the logo exactly:
          left hand comes in, sleeve cutoff, thumb, knuckles.
          right hand wraps around from below, showing 4 distinct parallel gold fingers, 
          and extends rightwards to the outer gold edge. */}
      
      <g filter="url(#handShadow)">
        {/* Main combined gold layer of the handshake to act as standard silhouette backing */}
        <path
          d="M 22,250 
             L 120,250 
             C 130,220 160,180 200,180 
             C 215,180 225,190 230,205 
             L 280,205 
             C 290,205 320,210 350,225
             C 380,240 410,250 478,250
             L 478,280
             C 410,280 395,290 355,340 
             C 335,365 305,370 270,350
             L 220,390
             C 200,410 170,390 155,370
             C 140,350 110,310 95,280 
             L 22,280 Z"
          fill="url(#goldGlossy)"
        />

        {/* LEFT Sleeve/Wrist black cuff cutoff */}
        <path
          d="M 95,250 L 95,280"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* RIGHT Sleeve/Wrist black cuff cutoff */}
        <path
          d="M 405,250 L 405,280"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left hand THUMB detail - pointing diagonally upwards on the left side of handshake */}
        <path
          d="M 145,250 
             C 160,205 195,195 210,220 
             C 220,235 205,250 180,250"
          stroke="#000000"
          strokeWidth="6.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* The clenching center division where palm grips palm */}
        <path
          d="M 180,250 C 205,235 240,245 270,250"
          stroke="#000000"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Underneath: The FOUR DISTINCT FINGERS wrapping from bottom right up to center-left */}
        {/* Finger 1 (Topmost/index) */}
        <path
          d="M 190,280 L 250,220"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Finger 2 */}
        <path
          d="M 210,300 L 270,240"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Finger 3 */}
        <path
          d="M 230,320 L 290,260"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Finger 4 (Pinky) */}
        <path
          d="M 250,340 L 310,280"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Back of Right Hand outline curve */}
        <path
          d="M 270,350 C 310,345 340,310 365,280"
          stroke="#000000"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 4. HIGH-CONTRAST CURVED TYPOGRAPHY FOR HIGH VISIBILITY */}
      
      {/* "IMALI" following the top-right concentric arc */}
      <text fill="url(#goldGlossy)" fontSize="52" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="8">
        <textPath href="#topRightArcText" startOffset="50%" textAnchor="middle">
          IMALI
        </textPath>
      </text>

      {/* "Ngesizulu" following the bottom-left concentric arc */}
      <text fill="url(#goldGlossy)" fontSize="34" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="4">
        <textPath href="#bottomLeftArcText" startOffset="50%" textAnchor="middle">
          Ngesizulu
        </textPath>
      </text>
    </svg>
  );
}
