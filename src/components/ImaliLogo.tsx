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
  const logoUrl = "https://scontent.fcpt2-1.fna.fbcdn.net/v/t39.30808-6/460159941_9270901779592139_1621337630295969111_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x1586&ctp=p526x296&_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGK5nRtwjg_XACTNe6I77M8pR_RmW4WOZGlH9GZbhY5kZdpci1KsoHURlTEeM_OVjg9pws-5fRvcO8IxnKoIYmK&_nc_ohc=iJeCDA2jeDMQ7kNvwExEPyA&_nc_oc=Adq63CXyKzuMI5CuI6r0wmuE9duwI-QCSx80kIHTs6VnpE1PHBnZb0W1MQ_AAxSdPM0&_nc_zt=23&_nc_ht=scontent.fcpt2-1.fna&_nc_gid=GSde9I6u0JwCpIP05QVDiQ&_nc_ss=7b2a8&oh=00_Af_NXFuhklu94h7V6B8rraPkBgmVT8Gb5P_m7dRG8i6y-Q&oe=6A36B750";

  const hasSpin = className.includes("animate-spin");
  const finalClass = `select-none drop-shadow-[0_4px_16px_rgba(214,175,55,0.25)] rounded-full ${hasSpin ? "" : "animate-spin-slow"} ${className}`;

  return (
    <svg
      id="imali_vector_logo"
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={finalClass}
    >
      <defs>
        {/* Clip path to force a perfect circular shape and cut out all white corners */}
        <clipPath id="circle-clip">
          <circle cx="250" cy="250" r="242" />
        </clipPath>

        {/* Chroma-key filter that mathematically maps white background to transparent while keeping gold/yellow opaque */}
        <filter id="remove-white-bg" x="0%" y="0%" width="100%" height="100%">
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -1.4 -1.4 -1.4 3.8 0"
          />
        </filter>
      </defs>

      {/* Solid black circle backing to ensure transparency gaps within the circle are rich black */}
      <circle cx="250" cy="250" r="242" fill="#000000" />

      {/* Render the user logo image clipped inside the circle with the filter applied */}
      <g clipPath="url(#circle-clip)">
        <image
          href={logoUrl}
          width="508"
          height="508"
          x="-4"
          y="-4"
          filter="url(#remove-white-bg)"
          referrerPolicy="no-referrer"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>

      {/* Luxury thin gold outer circle ring to frame the brand identity */}
      <circle cx="250" cy="250" r="242" stroke="#D4AF37" strokeWidth="8" fill="none" className="opacity-90" />
    </svg>
  );
}
