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
  const logoUrl = "https://scontent.fcpt2-1.fna.fbcdn.net/v/t39.30808-6/460159941_9270901779592139_1621337630295969111_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=f_GWWllXejkQ7kNvwGyzTSK&_nc_oc=AdrNJS5QQEbJ5V-nWn_hONO61ltv7vK3hysl5NS5Rap2Cvn7xCqpsvHzUAcuyBD4zO8&_nc_zt=23&_nc_ht=scontent.fcpt2-1.fna&_nc_gid=Ii_cf9yILmLGBoAXs3oZyw&_nc_ss=7b289&oh=00_Af8r8aD4xPuTbcvf8QgBM7bG60R9An9pXuwWNSmJtdqjnQ&oe=6A286F10";

  return (
    <svg
      id="imali_vector_logo"
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none drop-shadow-[0_4px_16px_rgba(214,175,55,0.25)] rounded-full ${className}`}
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
