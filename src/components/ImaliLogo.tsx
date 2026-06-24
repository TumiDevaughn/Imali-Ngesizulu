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
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4uzEWWNy1jf56wz_ZrI_1tC3EV9jzmA2m6g&s";

  const hasSpin = className.includes("animate-spin");
  const finalClass = `relative select-none rounded-full bg-black overflow-hidden shadow-[0_4px_16px_rgba(214,175,55,0.25)] flex items-center justify-center ${hasSpin ? "" : "animate-spin-slow"} ${className}`;

  // Parse size to style object
  const sizeStyle = typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : { width: size, height: size };

  return (
    <div 
      id="imali_logo_container" 
      className={finalClass}
      style={sizeStyle}
    >
      <img 
        src={logoUrl} 
        alt="Imali Academy Logo" 
        className="w-[92%] h-[92%] rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* Outer elegant shiny gold ring border highlight */}
      <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] pointer-events-none opacity-90" />
    </div>
  );
}
