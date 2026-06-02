/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Award, 
  BookOpen, 
  Users, 
  Terminal, 
  Settings, 
  MessageSquare, 
  Video, 
  Globe, 
  Activity, 
  FileText, 
  CheckCircle2, 
  XSquare, 
  Plus, 
  Search, 
  Send, 
  Lock, 
  Sparkles, 
  Zap, 
  Download, 
  Tv, 
  UserPlus, 
  RefreshCw, 
  Play, 
  CheckCircle,
  HelpCircle,
  Shield,
  Eye,
  Trash,
  Radio,
  Music,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import { Role, User, Course, Lesson, Language, ChatMessage, Notification } from "./types";
import { coursesData } from "./data/courses";
import { translateText } from "./data/translations";
import ImaliLogo from "./components/ImaliLogo";
import PatternScreener from "./components/PatternScreener";

export interface RadioStation {
  id: string;
  name: string;
  category: "news" | "music";
  subCategory: string;
  url: string;
  description: string;
  descriptionZu: string;
  accent: string;
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "bloomberg",
    name: "Bloomberg Financial Radio (US)",
    category: "news",
    subCategory: "Financial News Line",
    url: "https://bloomberg-wbbr.leanstream.co/bloomberg_wbbr-AM",
    description: "Live global business news, currency ticker alerts, and enterprise analytics from NYSE / Nasdaq floors.",
    descriptionZu: "Izindaba zebhizinisi zomhlaba wonke, imibiko wezezimali, nezingxoxo zomhlaba wonke zezezimali.",
    accent: "from-amber-600 to-yellow-500"
  },
  {
    id: "bbc",
    name: "BBC World Service News Feed",
    category: "news",
    subCategory: "Global Politics & Macroeconomy",
    url: "https://icecast.walm.org/bbc.mp3",
    description: "International intelligence, macro trends, central bank policies, and global event bulletins.",
    descriptionZu: "Ezodaba lomhlaba wonke, izindaba zezepolitiki, nezeluleko zezezimali zaseLondon.",
    accent: "from-red-600 to-rose-500"
  },
  {
    id: "news_radio_finance",
    name: "NPR USA Markets & News",
    category: "news",
    subCategory: "Global General & Macro Analysis",
    url: "https://npr-ice.streamguys1.com/live.mp3",
    description: "Real-time global market insights, Wall Street desks bulletins, and core macroeconomics analytics.",
    descriptionZu: "Imibiko eqondile yezimakethe zomhlaba, ezodaba nezokusakaza wezezimali zase-New York.",
    accent: "from-sky-600 to-blue-500"
  },
  {
    id: "study_lofi",
    name: "Lofi Focus Brainwave Beats",
    category: "music",
    subCategory: "SomaFM Groove Salad",
    url: "https://ice1.somafm.com/groovesalad-128-mp3",
    description: "Relaxed low-fidelity ambient beat stream customized to reduce cortisol and increase cognitive focus.",
    descriptionZu: "Amanani womculo opholile nonyakazayo ukukusiza ube nomoya ozo wezemfundo.",
    accent: "from-purple-600 to-pink-500"
  },
  {
    id: "deep_house",
    name: "Deep House Learning Lounge",
    category: "music",
    subCategory: "SomaFM Fluid Progressive",
    url: "https://ice1.somafm.com/fluid-128-mp3",
    description: "Atmospheric, deep vocal house sequences and progressive rhythms suitable for analytical focus.",
    descriptionZu: "Umculo ohamba kahle, obanzi we-Deep house ofanele ukuqinisekisa ukusebenza kwe-logic.",
    accent: "from-emerald-600 to-teal-500"
  },
  {
    id: "soul_gold",
    name: "Classic Soul & Motown Hits",
    category: "music",
    subCategory: "SomaFM 7 Inch Soul",
    url: "https://ice1.somafm.com/7inchsoul-128-mp3",
    description: "Golden era of retro soul tracks, vintage blues elements, and R&B classics for cognitive rest.",
    descriptionZu: "Amaculo akudala aretro ne-soul azolile asiza ukuphumula ukhumbule kahle.",
    accent: "from-indigo-600 to-violet-500"
  },
  {
    id: "rnb_chill",
    name: "Neo-Soul & Ambient R&B Core",
    category: "music",
    subCategory: "SomaFM Lush Ambient",
    url: "https://ice1.somafm.com/lush-128-mp3",
    description: "Silky vocals and smooth lounge neo-soul elements to promote mental calm and logical focus.",
    descriptionZu: "Amazinga womculo we-R&B omnandi kakhulu asiza ukupholisa inyongo namandla omkhondo.",
    accent: "from-fuchsia-600 to-purple-500"
  },
  {
    id: "swiss_groove",
    name: "Premium Jazz Radio Swiss",
    category: "music",
    subCategory: "Traditional Jazz",
    url: "https://stream.srg-ssr.ch/m/rsj/mp3_128",
    description: "Acoustic basslines, brass melodies, and world-class smooth jazz from the Swiss Broadcast Corporation.",
    descriptionZu: "Umsindo we-jazz omnandi kakhulu osezingeni eliphezulu ozwakalayo emakhasini onke.",
    accent: "from-cyan-600 to-indigo-500"
  }
];

export const AUDIO_CLASS_TYPES = [
  { 
    id: "candlestick", 
    name_en: "Quick Candlestick Drill", 
    name_zu: "Ukuzilonga Kwekhandlela Okusheshayo", 
    duration: "30 Min", 
    maxHours: 0.5,
    desc_en: "Interactive candlestick pattern breakout analysis on simulated currency pairs.",
    desc_zu: "Ukuhlaziywa kwamamodeli wamakhandlela asheshayo emicimbini yezimali."
  },
  { 
    id: "forex_liquid", 
    name_en: "Forex Liquidity Session", 
    name_zu: "isikhathi se-Liquidity ye-Forex", 
    duration: "45 Min", 
    maxHours: 0.75,
    desc_en: "Interbank order blocks & central bank zones price action triggers.",
    desc_zu: "Amaphuzu abalulekile we-liquidity ne-interbank order blocks."
  },
  { 
    id: "futures_scalper", 
    name_en: "Futures Scalper Workshop", 
    name_zu: "Sifundo Se-Futures Scalping", 
    duration: "1 Hour", 
    maxHours: 1.0,
    desc_en: "Depth of Market (DOM) order flow tape reading and dynamic volume spread profiling.",
    desc_zu: "Ukufundwa kwebhokisi le-order flow kanye nokuhlaziywa kwe-volume futures."
  },
  { 
    id: "commodity_spread", 
    name_en: "Commodities Spread Masterclass", 
    name_zu: "I-Masterclass Ye-Commodities", 
    duration: "1.5 Hours", 
    maxHours: 1.5,
    desc_en: "Seasonality cycles charting across metals, agriculture, and energy futures contracts.",
    desc_zu: "Amashadi we-seasonality across metals, ezolimo, namandla e-futures."
  },
  { 
    id: "macro_position", 
    name_en: "Macro Portfolio Positioning", 
    name_zu: "Ukuma Kwe-Macro Portfolio", 
    duration: "2 Hours", 
    maxHours: 2.0,
    desc_en: "Global macroeconomic yield curve differentials, interest rate hedges & bond pairing.",
    desc_zu: "Izifundo ze-economics yomhlaba jikelele, amabhondi, kanye ne-interest rates."
  },
  { 
    id: "syndicate_warroom", 
    name_en: "Syndicate War Room Core Drill", 
    name_zu: "Ukuzijwayeza Kwe-War Room Syndicate", 
    duration: "3 Hours", 
    maxHours: 3.0,
    desc_en: "Advanced algorithmic stress-testing & historic flashback backtesting workspace.",
    desc_zu: "Ukuhlaziywa kwe-backtesting okunzulu nezinqumo zokuhweba eziqinile."
  }
];

function StepChartGraphic({ lessonId, stepIndex, language }: { lessonId: string; stepIndex: number; language: string }) {
  const isZulu = language === "zu";
  const isPa = lessonId.includes("pa_") || lessonId.includes("price_") || lessonId.includes("candlestick");
  const isPsych = lessonId.includes("psych_") || lessonId.includes("mind") || lessonId.includes("plan");
  const isRisk = lessonId.includes("risk_") || lessonId.includes("leverage") || lessonId.includes("formula");
  const isOrderflow = lessonId.includes("orderflow_") || lessonId.includes("delta") || lessonId.includes("footprint");

  if (isPa) {
    if (stepIndex === 0) {
      // Step 1: Identifying Institutional Liquidity Pools
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">📊 INSTITUTIONAL PRICE GEOMETRY</span>
            <span className="text-[#D4AF37] font-bold">1H HIGH-FRAME ANALYSIS</span>
          </div>
          <svg viewBox="0 0 500 200" className="w-full h-auto text-[#D4AF37]">
            {/* Grid Lines */}
            <line x1="10" y1="50" x2="490" y2="50" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="10" y1="100" x2="490" y2="100" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="10" y1="150" x2="490" y2="150" stroke="#18181b" strokeDasharray="3,3" />
            
            {/* Double Top Resistance Line */}
            <line x1="30" y1="70" x2="470" y2="70" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="40" y="62" fill="#D4AF37" className="text-[9px] uppercase font-bold tracking-widest">
              {isZulu ? "UMGQA RESISTANCE LEVEL (CELLING RESISTANCE)" : "DOUBLE TOP CEILING RESISTANCE LEVEL - 1.15000"}
            </text>

            {/* Dotted Liquidity Pool Block */}
            <rect x="180" y="32" width="140" height="30" fill="url(#goldGradient)" fillOpacity="0.05" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <text x="250" y="44" fill="#ef4444" textAnchor="middle" className="text-[8px] font-bold tracking-widest">
              {isZulu ? "💰 LIQUIDITY POOL / IZINKUMBI ZEMALI" : "💰 LIQUIDITY POOL / RETAIL STOP LOSSES"}
            </text>
            <text x="250" y="54" fill="#ef4444" textAnchor="middle" className="text-[7px] tracking-wide opacity-80">
              $$$ RESTING BUY STOP ORDERS $$$
            </text>

            {/* Candlesticks Consolidating below resistance */}
            {/* Candle 1 (Green) */}
            <line x1="80" y1="110" x2="80" y2="180" stroke="#10b981" strokeWidth="1" />
            <rect x="74" y="120" width="12" height="40" fill="#10b981" rx="1" />

            {/* Candle 2 (Red) */}
            <line x1="120" y1="100" x2="120" y2="160" stroke="#ef4444" strokeWidth="1" />
            <rect x="114" y="110" width="12" height="35" fill="#ef4444" rx="1" />

            {/* Peak 1 (Green) - Touches resistance */}
            <line x1="200" y1="70" x2="200" y2="150" stroke="#10b981" strokeWidth="1" />
            <rect x="194" y="75" width="12" height="60" fill="#10b981" rx="1" />
            <text x="200" y="145" fill="#10b981" textAnchor="middle" className="text-[8px] font-bold">Peak 1</text>

            {/* Retrace (Red) */}
            <line x1="250" y1="105" x2="250" y2="175" stroke="#ef4444" strokeWidth="1" />
            <rect x="244" y="115" width="12" height="45" fill="#ef4444" rx="1" />

            {/* Peak 2 (Green) - Touches resistance */}
            <line x1="300" y1="70" x2="300" y2="160" stroke="#10b981" strokeWidth="1" />
            <rect x="294" y="73" width="12" height="50" fill="#10b981" rx="1" />
            <text x="300" y="135" fill="#10b981" textAnchor="middle" className="text-[8px] font-bold">Peak 2</text>
            
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
          <div className="mt-2 text-center text-zinc-500 text-[9px] border-t border-zinc-900 pt-2 flex justify-between">
            <span>{isZulu ? "Iphoyinti: Abahwebi abancane balindele ukuthi intengo iwe phezulu, babeke izivikelo ngaphezu komugqa." : "Notice: Retail sellers expect price to crash from Double Top, setting stop losses above."}</span>
            <span className="text-[#D4AF37] font-bold">100% PRECISE ANALYSIS</span>
          </div>
        </div>
      );
    } else if (stepIndex === 1) {
      // Step 2: Waiting for the Wick Liquidity Sweep
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-950 pb-2 mb-4 bg-[#D4AF37]/5 p-2 rounded border border-[#D4AF37]/20">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1">
              💥 {isZulu ? "UKUSHANELEKA KWEMALI EMBI (ACTIVE INSTANT SWEEP)" : "ACTIVE LIQUIDITY PURGE / ENGINE INGESTION"}
            </span>
            <span className="text-red-500 font-bold">SWEEP CANDLE FORMING</span>
          </div>
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            {/* Grid & Reference lines */}
            <line x1="10" y1="50" x2="490" y2="50" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="10" y1="100" x2="490" y2="100" stroke="#18181b" strokeDasharray="3,3" />

            {/* Sweep Limit line */}
            <line x1="30" y1="70" x2="470" y2="70" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2,2" />
            
            {/* Liquidated pool zone */}
            <rect x="180" y="32" width="140" height="38" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="1,2" />
            <text x="250" y="45" fill="#ef4444" textAnchor="middle" className="text-[9px] font-bold uppercase">
              {isZulu ? "❌ IMALI IYAQEDWA (STOP LOSSES TRIGGERED)" : "💥 LIQUIDITY TRIGGERED / STOPS CLEANED"}
            </text>

            {/* Previous Double Peak Structure */}
            <rect x="194" y="75" width="12" height="60" fill="gray" fillOpacity="0.15" stroke="gray" strokeWidth="1" />
            <rect x="294" y="73" width="12" height="50" fill="gray" fillOpacity="0.15" stroke="gray" strokeWidth="1" />

            {/* The SWEEP Candlestick - Explosive Wick */}
            {/* Extended Wick through the resistance/liquidity zone */}
            <line x1="244" y1="36" x2="244" y2="160" stroke="#10b981" strokeWidth="3" />
            {/* Real-time wick highlighting */}
            <circle cx="244" cy="36" r="3" fill="#D4AF37" />
            <circle cx="244" cy="36" r="2" fill="#ef4444" />
            
            {/* Candle Body - wicking down, indicating dynamic absorption */}
            <rect x="238" y="75" width="12" height="55" fill="#10b981" rx="1" />

            <path d="M 238 36 L 270 20 L 290 35 L 250 80 Z" fill="rgba(212, 175, 55, 0.05)" stroke="#D4AF37" strokeWidth="0.5" />
            
            {/* Dynamic callout labels */}
            <text x="310" y="32" fill="#D4AF37" className="text-[9px] font-bold uppercase">
              {isZulu ? " umsila wokushanela (72% WICK RATIO)" : "THE SWEEP WICK - INSTITUTIONAL REJECTION"}
            </text>
            <text x="310" y="42" fill="zinc-500" className="text-[7px]">
              TRAPPED BUY BREAKOUTS ABSORBED BY SYSTEM ORDERS
            </text>

            {/* Candle body close indicator label */}
            <line x1="120" y1="130" x2="230" y2="120" stroke="#3f3f46" strokeWidth="0.5" />
            <text x="50" y="136" fill="zinc-400" className="text-[8px]">
              REJECTION BODY CLOSURE
            </text>
          </svg>
          <div className="mt-2 text-center text-zinc-500 text-[9px] border-t border-zinc-900 pt-2 flex justify-between">
            <span>{isZulu ? "Gada: Umnyakazo wephutha wokuphakama uphelile ngqo!" : "Observe: Massive volumes executed inside the red area, transferring retail funds to institutional blocks."}</span>
            <span className="text-red-500 font-bold uppercase tracking-wider">PURGE ACTIVE</span>
          </div>
        </div>
      );
    } else if (stepIndex === 2) {
      // Step 3: Market Structure Shift
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">🔬 LOWER TIMEFRAME (5M) ZOOM ANALYSIS</span>
            <span className="text-emerald-500 font-bold">MSS CONCURRENT DISPLACEMENT</span>
          </div>
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            {/* Splicing structure zigzag lines */}
            <polyline points="20,40 60,110 90,80 140,150 170,120 220,170 250,50" fill="none" stroke="#27272a" strokeWidth="1.5" />
            <polyline points="250,50 280,100 315,85 360,165 375,145 420,190" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

            {/* Recommencing Sweep Line */}
            <line x1="230" y1="50" x2="270" y2="50" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2,2" />
            <text x="250" y="38" fill="#D4AF37" textAnchor="middle" className="text-[7px] font-bold">HIGH FRAME SWEEP POINT</text>

            {/* Prior Swing Low validation corridor */}
            <line x1="170" y1="120" x2="330" y2="120" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="290" y="112" width="40" height="15" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="310" y="122" fill="#ef4444" textAnchor="middle" className="text-[7px] font-bold">MSS LEVEL</text>

            {/* Gold highlight at break point */}
            <circle cx="295" cy="120" r="3" fill="#ef4444" />
            <text x="310" y="105" fill="#ef4444" className="text-[8px] font-bold uppercase tracking-wider">
              {isZulu ? "USHINTSHO LWESAKHIWO (BOS/MSS)" : "DISPLACEMENT STRUCTURE SHIFT"}
            </text>

            {/* Heavy Bearish Displacement Candlestick */}
            <line x1="360" y1="110" x2="360" y2="180" stroke="#ef4444" strokeWidth="1" />
            <rect x="354" y="125" width="12" height="35" fill="#ef4444" rx="1" />
            
            {/* Directional support arrow */}
            <path d="M 390 140 L 410 170" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
          <div className="mt-2 text-center text-zinc-500 text-[9px] border-t border-zinc-900 pt-2 flex justify-between">
            <span>{isZulu ? "Ubufakazi: Isakhiwo sokuqala sintengantengile kwi-5-Minute chart." : "Structure Shift confirmed when candidate swing low fails under high impulse selling blocks."}</span>
            <span className="text-emerald-500 font-bold uppercase tracking-wider">STRUCTURE SHIFT CONFIRMED</span>
          </div>
        </div>
      );
    } else if (stepIndex === 3) {
      // Step 4: Mitigation Entry & Risk Management
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-800 pb-2 mb-4 bg-emerald-950/10 p-2 rounded border border-emerald-900/30">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">🎯 MITIGATION ENTRY PLACEMENT CONFIGURATION</span>
            <span className="text-emerald-500 font-bold">1:5 RISK-REWARD ACTIVE</span>
          </div>
          <svg viewBox="0 0 500 200" className="w-full h-auto">
            {/* Horizontal entry level */}
            <line x1="10" y1="100" x2="490" y2="100" stroke="#10b981" strokeWidth="1.5" strokeDasharray="1,1" />
            <rect x="360" y="93" width="110" height="15" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="0.5" />
            <text x="415" y="103" fill="#10b981" textAnchor="middle" className="text-[7.5px] font-bold uppercase">
              {isZulu ? "INDLELA YOKUNGENA (LIMIT ENTRY LEVEL)" : "FVG MITIGATION LIMIT ENTRY LEVEL"}
            </text>

            {/* Horizontal stop loss safety level */}
            <line x1="10" y1="40" x2="490" y2="40" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="360" y="32" width="110" height="15" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="415" y="42" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-bold uppercase">
              {isZulu ? "ISIVIKELO SESIKHUNDLA (STOP LOSS LINE)" : "STOP LOSS SAFETY BOUNDARY (SL)"}
            </text>

            {/* Target reward exit boundary */}
            <line x1="10" y1="190" x2="490" y2="190" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" />
            <rect x="360" y="172" width="110" height="15" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.5" />
            <text x="415" y="182" fill="#3b82f6" textAnchor="middle" className="text-[7.5px] font-bold uppercase">
              {isZulu ? "INZUZO YE-TRADE (TAKE PROFIT / R1:5)" : "TAKE PROFIT EXTREMITY (TP) - 1:5 R"}
            </text>

            {/* High level Candle traces */}
            {/* The absolute Sweep Candle high wick */}
            <line x1="100" y1="40" x2="100" y2="120" stroke="#D4AF37" strokeWidth="1" />
            <rect x="94" y="60" width="12" height="50" fill="#ef4444" rx="1" />
            <text x="100" y="32" fill="#ef4444" textAnchor="middle" className="text-[7px]">SWEEP HIGH CAP</text>

            {/* The Fair Value Gap (shaded zone) */}
            <rect x="150" y="80" width="180" height="40" fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" />
            <text x="240" y="103" fill="#D4AF37" textAnchor="middle" className="text-[9px] font-bold uppercase tracking-widest">
              {isZulu ? "⚡ I-FAIR VALUE GAP (FVG ZONE)" : "⚡ SHADED FAIR VALUE GAP (FVG) CORRIDOR"}
            </text>

            {/* Elegant mitigation retest candlestick returning up */}
            <line x1="220" y1="75" x2="220" y2="140" stroke="#10b981" strokeWidth="1" />
            <rect x="214" y="90" width="12" height="30" fill="#10b981" rx="1" stroke="#D4AF37" strokeWidth="1" />
            
            <text x="180" y="145" fill="#10b981" className="text-[8px] font-bold">RETEST & RUN TRIGGERED</text>
          </svg>
          <div className="mt-2 text-center text-zinc-500 text-[9px] border-t border-zinc-900 pt-2 flex justify-between">
            <span>{isZulu ? "Indlela: Misa isivikelo ngaphezu komugqa womsila we-sweep, faka i-trade kwi-gap." : "Formula: Entry executed as price taps upper edge of Fair Value Gap box. Absolute risk secured."}</span>
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">RISK RATIO: 1 TO 5 CLEAR</span>
          </div>
        </div>
      );
    }
  }

  if (isPsych) {
    if (stepIndex === 0) {
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">🧠 PSYCHOLOGICAL EQUILIBRIUM ENGINE</span>
            <span className="text-[#D4AF37] font-bold">STATUS: STABLE BASELINE</span>
          </div>
          <svg viewBox="0 0 500 150" className="w-full h-auto">
            {/* Heartrate wave */}
            <path d="M 20,75 L 120,75 L 130,55 L 140,95 L 150,75 L 220,75 L 230,25 L 243,125 L 253,75 L 350,75 L 360,60 L 370,90 L 380,75 L 480,75" 
                  fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            
            {/* Diagnostic panel */}
            <rect x="50" y="105" width="400" height="35" fill="rgba(24, 24, 27, 0.8)" stroke="#27272a" rx="4" />
            <text x="65" y="118" fill="zinc-400" className="text-[7px]">HEART RATE: 64 BPM</text>
            <text x="180" y="118" fill="zinc-400" className="text-[7px]">CORTISOL DISSIPATION: LEVEL 0.2</text>
            <text x="320" y="118" fill="zinc-400" className="text-[7px]">DETACHMENT BASELINE: EXCELLENT</text>
            <text x="250" y="132" fill="#D4AF37" textAnchor="middle" className="text-[8px] font-bold">
              {isZulu ? "ISIQINISEKISO SENTENGO NEGCOZI EMZIMBENI NOSUKU ZOMSEBENZI" : "EMOTIONAL BIOMETRICS VERIFIED • RULE MATRIX READINESS LOADED"}
            </text>
          </svg>
        </div>
      );
    } else if (stepIndex === 1) {
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-red-950/20 p-2 rounded">
            <span className="text-red-500 font-bold uppercase tracking-wider">🚨 AUTOMATED EQUITY PROTECTOR LIMITS</span>
            <span className="text-red-400 font-mono">2.0% LIMIT CEILING LOCK</span>
          </div>
          <svg viewBox="0 0 500 120" className="w-full h-auto">
            {/* Drawdown bar graph */}
            <rect x="40" y="30" width="420" height="20" fill="#18181b" stroke="#3f3f46" rx="4" />
            {/* Drawdown active level */}
            <rect x="40" y="30" width="280" height="20" fill="gray" rx="4" />
            <line x1="320" y1="20" x2="320" y2="60" stroke="#ef4444" strokeWidth="2" />
            
            <text x="120" y="16" fill="#ef4444" className="text-[8px] font-bold">CURRENT FLOATING EQUITY PEAK: -1.45%</text>
            <text x="450" y="65" fill="#ef4444" textAnchor="end" className="text-[8px] font-bold">2.0% AUTOMATIC EMERGENCY SHUTDOWN</text>

            <text x="250" y="95" fill="zinc-400" textAnchor="middle" className="text-[8px]">
              {isZulu ? "Isifundo: Uma umkhawulo ka-2.0% uthintwa, isevisi ihoxisa konke." : "Dynamic Anchor ensures no single session can destroy the equity curve under high volatile periods."}
            </text>
          </svg>
        </div>
      );
    }
  }

  if (isRisk) {
    if (stepIndex === 2) {
      // Step 3: Sizing Safe Mathematical Lots
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">🧮 LIVE ACCOUNT MATHEMATICAL RISK MATRIX</span>
            <span className="text-emerald-500 font-bold">STABILITY CONSTANT METRICS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-center">
            <div className="bg-black/40 p-2 rounded border border-zinc-900">
              <span className="text-zinc-500 text-[8px] uppercase">PORTFOLIO DEPOSIT CAPITAL</span>
              <p className="text-sm font-bold text-white font-mono">$10,000.00 USD</p>
            </div>
            <div className="bg-black/40 p-2 rounded border border-zinc-900">
              <span className="text-zinc-500 text-[8px] uppercase">CAPITAL VALUE AT RISK</span>
              <p className="text-sm font-bold text-[#D4AF37] font-mono">1.0% ($100 USD)</p>
            </div>
            <div className="bg-black/40 p-2 rounded border border-zinc-900">
              <span className="text-zinc-500 text-[8px] uppercase">STOP LOSS DISTANCE</span>
              <p className="text-sm font-bold text-red-500 font-mono">10 PIPS (100 Ticks)</p>
            </div>
          </div>
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-xl text-center">
            <p className="text-[9px] text-[#D4AF37] tracking-widest uppercase font-bold mb-1">
              {isZulu ? "I-FORMULA YOKUBALA (DYNAMIC LOT RATIO)" : "DYNAMIC POSITION SIZING EQUATION MATRIX"}
            </p>
            <p className="font-serif text-lg text-white font-bold tracking-wide italic my-2">
              Lot Sizing = $100 Risk / (10 Pips * $10 per Lot Value) = <span className="text-[#D4AF37] underline">1.00 Standard Lot</span>
            </p>
            <p className="text-zinc-500 text-[8px] font-mono">
              Preserves account balance perfectly even if price volatility breaches stop loss parameters.
            </p>
          </div>
        </div>
      );
    }
  }

  // Fallback beautiful styled generic Candlestick / Chart Technical Grid
  return (
    <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
      <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
        <span className="text-zinc-500 font-bold uppercase tracking-wider">📈 PORTFOLIO TECHNICAL CHART GRID</span>
        <span className="text-[#D4AF37] font-bold">REAL-TIME GRAPHICS ENGINE</span>
      </div>
      <svg viewBox="0 0 500 180" className="w-full h-auto text-[#D4AF37]">
        {/* Grids */}
        <line x1="10" y1="30" x2="490" y2="30" stroke="#101012" />
        <line x1="10" y1="70" x2="490" y2="70" stroke="#101012" />
        <line x1="10" y1="110" x2="490" y2="110" stroke="#101012" />
        <line x1="10" y1="150" x2="490" y2="150" stroke="#101012" />

        {/* Diagonal Golden Trend Channel */}
        <line x1="40" y1="140" x2="440" y2="40" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="70" y1="160" x2="470" y2="60" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />
        <text x="380" y="32" fill="#D4AF37" className="text-[8px] uppercase tracking-widest font-bold">GOLDEN CHANNEL BULLISH CORRIDOR</text>

        {/* Floating candlesticks following the channel path */}
        {/* Candle 1 (Green) */}
        <line x1="80" y1="110" x2="80" y2="160" stroke="#10b981" />
        <rect x="74" y="120" width="12" height="30" fill="#10b981" rx="1" />
        
        {/* Candle 2 (Green) */}
        <line x1="160" y1="90" x2="160" y2="140" stroke="#10b981" />
        <rect x="154" y="95" width="12" height="35" fill="#10b981" rx="1" />

        {/* Candle 3 (Red) */}
        <line x1="240" y1="80" x2="240" y2="120" stroke="#ef4444" />
        <rect x="234" y="90" width="12" height="20" fill="#ef4444" rx="1" />

        {/* Candle 4 (Green) */}
        <line x1="320" y1="50" x2="320" y2="100" stroke="#10b981" />
        <rect x="314" y="60" width="12" height="30" fill="#10b981" rx="1" />

        {/* Candle 5 (Green) */}
        <line x1="400" y1="30" x2="400" y2="80" stroke="#10b981" />
        <rect x="394" y="40" width="12" height="30" fill="#10b981" rx="1" />
      </svg>
      <div className="mt-2 text-center text-zinc-500 text-[10px] border-t border-zinc-900 pt-2 flex justify-between">
        <span>{isZulu ? "I-Aesthetic Chart Matrix: Izifundo Zemakethe ze-Elite Courses" : "Accredited Technical Education Concept Chart - Elite Courses Executive Unit"}</span>
        <span className="text-[#D4AF37] font-bold">ELITE GRAPHICS v4.1</span>
      </div>
    </div>
  );
}

function getLessonSteps(lesson: any, language: string) {
  const isZulu = language === "zu";
  
  if (lesson.id?.includes("pa_")) {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubeka Imingcele ye-Institutional Liquidity Pools" : "Step 1: Identifying Institutional Liquidity Pools",
        description: isZulu 
          ? "Bona izindawo eziphezulu nezaphansi (swing highs & lows) lapho amakhasimende amaningi abeke khona ama-stop loss abo (equal highs, resistance clusters)." 
          : "Identify extreme swing highs and lows where massive clusters of retail resting stop-losses are accumulated. These are prime targets for banks.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukulinda i-Candlestick Price Sweep violently" : "Step 2: Waiting for the Wick Liquidity Sweep",
        description: isZulu 
          ? "Ungathengi kulezo zindawo zezibalo ngqo! Linda ikhandlela lezeqophelo eliphezulu lihambe phezulu lidlule leyo ndawo bese lishiya umsila omude (wick/sweep)." 
          : "Do not enter yet. Wait for a high-momentum candlestick to pierce cleanly past the liquidity limit, trapping retail breakout traders, then rapidly wick back.",
        imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Uhlu Lokuqinisekisa Isakhiwo (Market Structure Shift)" : "Step 3: Confirming Market Structure Shift (MSS)",
        description: isZulu 
          ? "Kuleli zinga, khonza isiqinisekiso sokuthi intengo ishintshe indlela kwi-lower timeframe (e.g. 1-minute or 5-minute chart) ngokususa intengo yokuqala." 
          : "Zoom in to a lower execution timeframe (like the 1m or 5m) and witness a clean displacement break of the local swing low, confirming institutional reversal.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukufaka i-Limit Order kwi-Fair Value Gap nokuSetha i-Stop Loss" : "Step 4: Executing Mitigation Entry & Sizing Risk",
        description: isZulu 
          ? "Faka i-limit order yakho kulandela umugqa we-imbalance (Fair Value Gap) evulekileyo. Beka i-Stop Loss yakho ngale kwendawo ye-sweep wick uvikele imali." 
          : "Set a passive limit entry order at the open boundary of the Fair Value Gap (imbalance). Place your absolute Stop Loss cushion safely beyond the sweep wick peak.",
        imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id?.includes("psych_")) {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubhaliswa Kwempilo Nematapo Ngaphambi Kohwebo" : "Step 1: Pre-Session Physiological Assessment",
        description: isZulu 
          ? "Hlola isimo sakho somzimba nengqondo. Bhala phansi ukuthi uzizwa unjani, gcina ingqondo yakho izinzile kude nezindaba ne-drawdown engadingeki." 
          : "Audit your emotional and physiological baseline. Log your status: check heart rate, sleep quality, and confirm absolute detachment from raw trade wins/losses.",
        imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukulandela Umthetho We-Max Loss we-2% per session" : "Step 2: Activating Technical Drawdown Anchors",
        description: isZulu 
          ? "Misa isilinganiso esiphezulu seloss sosuku. Uma u-2% entengo yakho eyimali unyamalele, vala le platform execution ngenkani ungangabazi." 
          : "Pre-program your maximum daily threshold. If floating equity declines by 2.0% in a single day, commit to a strict, non-negotiable shutdown protocol.",
        imageUrl: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Uhlelo Lokubhalisa Izicathulo (Journaling Matrix)" : "Step 3: Multi-Variable Checklist Scoring",
        description: isZulu 
          ? "Yonke i-trade oyivulayo kumele ibhalwe kwi-diary enesizathu se-technical reference kuphela, kungenjalo uhlawuliswa inhlawulo ngengqondo." 
          : "Never touch order entry without scoring. Ensure every transaction aligns with a structural mitigation of institutional sweeps, or refuse to click.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuhoxisa Amaprosesa ne-Terminal Step away" : "Step 4: Executing post-session shutdown & detachment",
        description: isZulu 
          ? "Ngemuva kosuku lokuhweba, vala i-screen yakho ngokushesha! Gxila ekuphileni impilo enhle ukuze ugcine ingqondo yakho entsha isilungele ikusasa." 
          : "Immediately disable target screens after your designated session window closes. Separate self-worth from portfolio curves to preserve executive clarity.",
        imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id?.includes("risk_")) {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubala Ibhalansi negugu le-Equity ye-Account" : "Step 1: Querying Live Balance & Available Equity",
        description: isZulu 
          ? "Amathuba wokuwina ohwebeni amane kakhulu kodwa kudingeka uhlole inani lezezimali onazo kwi-balance ngaphambi kokuvula isikhundla size." 
          : "Load active account benchmarks. Establish the actual hard value of your liquid capital, separating floating gains from hard equity balances.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukamisa Isihlangu Se-Stop loss in Pips" : "Step 2: Defining Pip stop-loss distances mathematically",
        description: isZulu 
          ? "Hlola ishadi lakho layo unqume ukuthi i-Stop Loss okumele uyibeke kufanele ibe pips ezingaki ukusuka lapho intengo ivuleka khona." 
          : "Reference the visual framework of the chart. Establish the exact visual stop-loss buffer in absolute ticks (pips) based on structural sweep low wicks.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Uhlelo Lwesibalo Se-Lot size Sizing Formula" : "Step 3: Calculating Safe Mathematical Lot Sizing",
        description: isZulu 
          ? "Sebenzisa lo mthetho onesiqiniseko: Lot Size = (Balance * 1% Risk%) / (Stop Loss distance * Pip value). Lokhu kukunika usayizi ophephile." 
          : "Run the position equation script: Lot Size = (Balance * RiskMultiplier) / (StopLossPips * PipValue). Securely lock the risk percentage below 1.0%.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukukhipha Amakhodi ne-Drawdown protection checks" : "Step 4: Confirming Margin Level remains above 1000%",
        description: isZulu 
          ? "Uma isandla sivuleka kwi-MT4, hlola i-Terminal bar uqinisekise ukuthi i-Margin Level % yakho ingaphezu kuka 1000% njalo njalo." 
          : "Check the terminal status display upon order submission. Verify that your available margin is clear and Margin Level remains above 1000% limits.",
        imageUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id?.includes("orderflow_")) {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukuvuzwa kwe-Passive Limit orders kwi-Order Book" : "Step 1: Mapping Passive Limit Order Depth",
        description: isZulu 
          ? "Hlola iDatha emakethe eyi-Orderbook lapho ubona khona ama-buy limits nama-sell limits amaningi omlando namabhange (Mitigation zones)." 
          : "Query the passive orderbook depth levels. Trace the thickest liquidity thresholds where institutions have placed passive limit buy or sell blocks.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuhlaziya i-Volume Profile POC (Point Of Control)" : "Step 2: Identifying the Volume Profile Point of Control",
        description: isZulu 
          ? "Isisekelo sethu yithuluzi le Volume Profile. Thola indawo lapho kwasetshenziswa khona umthamo omkhulu wentengo ngaleso sikhathi (Point Of Control)." 
          : "Plot the horizontal Volume Profile on the screen. Pinpoint the absolute Point of Control (POC) cluster representing massive raw execution blocks.",
        imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Uhambo Lokungena nge Delta Confirmation Delta Analysis" : "Step 3: Calculating Session Delta & Imbalance shifts",
        description: isZulu 
          ? "Bona umehluko phakathi kwabathengi nabathengisi usebenzisa i-delta node. Uma abathengisi bephelile, isilinganiso siyashintsha." 
          : "Inspect session Delta to cross-examine current transaction forces. Spot aggressive market buy absorptions at institutional bid prices.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuthengiselana Ngama-Order blocks we-POC" : "Step 4: Executing entries seamlessly under low drawdowns",
        description: isZulu 
          ? "Faka inzuzo yakho ngokujoyina imikhankaso yamakhasimende wokuthenga amakhulu. Beka i-Stop loss yakho phesheya kwemingcele ye-POC." 
          : "Submit pending orders directly inside the high-volume node POC range. Anchor your exit guidelines safely to maintain minimal drawdown ratios.",
        imageUrl: "https://images.unsplash.com/photo-1638274553228-69cdbe509449?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukulungiselela Isakhiwo Sezezinhlaka (Structural Setup)" : "Step 1: Setting Up the Structural Template Layout",
        description: isZulu 
          ? "Vula amashadi wezintengo kwi-forex terminal yakho. Susa ama-grid nazo zonke izinkomba ezidala visual fatigue, beka imibala yesobholo." 
          : "Initialize the premium off-white design structure. Disable default chart gridlines to reduce cognitive strain, establishing pristine focus bounds.",
        imageUrl: lesson.imageUrl || "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuhlaziya Amabhange Namakhodi We-High-Impact Economic News" : "Step 2: Monitoring Macro News Events & Liquidity Shifts",
        description: isZulu 
          ? "Hlola i-economic calendar ngewindi lezindaba. Thola izikhathi zenamani lentela yesinqumo (Interest rates) ne CPI kule seshini." 
          : "Scan high-impact economic indicators on your calendar. Trace major interest rate indices, CPI figures, and central bank announcement sessions.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Uhambo Lokuqinisekisa Liquidity nemikhombo Yentengo" : "Step 3: Pinpointing Key Support/Resistance Intersections",
        description: isZulu 
          ? "Gada indawo lapho intengo eyenza khona ukuhlangana okuzenzakalelayo (confluence zone). Qinisekisa ukuthi uyazivikela esilinganisongweni." 
          : "Observe market behavior as a dynamic, interactive model. Plot support and resistance zones where institutional capital is gathered.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuthatha i-Order Nokugcina Izingodo ze-Capital Preservation" : "Step 4: Placing Safe Pending Entries under strict Risk Controls",
        description: isZulu 
          ? "Faka imiyalelo yakho elinde phezulu noma phansi (limit orders) ngale kwentengo yamanje. Hlola i-Margin Level layout phezulu kuka 1000%." 
          : "Open your passive pending limit position with absolute lot calculation values. Ensure Stop loss cushions lock to prevent emotional drawdowns.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  }
}

export default function App() {
  // Global States
  const [language, setLanguage] = useState<Language>("en");
  const [activeRole, setActiveRole] = useState<Role>(Role.STUDENT);
  const [visibleProfileTab, setVisibleProfileTab] = useState<Role>(Role.STUDENT);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showReferences, setShowReferences] = useState<boolean>(() => {
    return localStorage.getItem("imali_show_references") === "true";
  });
  
  // Audio Radio State Engine
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [radioVolume, setRadioVolume] = useState<number>(0.7);
  const [radioMuted, setRadioMuted] = useState<boolean>(false);
  const [isRadioModalOpen, setIsRadioModalOpen] = useState<boolean>(false);
  const [radioActiveCategory, setRadioActiveCategory] = useState<"news" | "music" | "all">("all");
  const [radioLoading, setRadioLoading] = useState<boolean>(false);
  const [radioError, setRadioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Help Centre / Contact Us Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>("");
  const [contactSurname, setContactSurname] = useState<string>("");
  const [contactTel, setContactTel] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSending, setContactSending] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [contactFormError, setContactFormError] = useState<string>("");

  // Initialize and synchronize HTMLAudioElement
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handlePlaying = () => {
      setIsPlaying(true);
      setRadioLoading(false);
      setRadioError(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setRadioLoading(false);
    };
    const handleLoadStart = () => {
      setRadioLoading(true);
      setRadioError(false);
    };
    const handleWaiting = () => {
      setRadioLoading(true);
    };
    const handleError = () => {
      setIsPlaying(false);
      setRadioLoading(false);
      setRadioError(true);
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Update volume & muted states whenever they change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = radioMuted ? 0 : radioVolume;
    }
  }, [radioVolume, radioMuted]);

  const playStation = (station: RadioStation) => {
    if (!audioRef.current) return;
    
    if (currentStation?.id === station.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
      return;
    }

    audioRef.current.pause();
    setCurrentStation(station);
    setIsPlaying(false);
    audioRef.current.src = station.url;
    audioRef.current.load();
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn("Playback initialization stream sync:", err);
        setIsPlaying(false);
      });
  };

  // Help Centre / Contact Us Portal Form Handlers
  const handleContactSubmit = async (e: any) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactFormError(language === "zu" ? "Sicela ugcwalise amabhokisi adingekayo (Igama, I-imeyili, nomlayezo)." : "Please fill in all required fields (Name, Email, and Message).");
      return;
    }
    
    setContactSending(true);
    setContactFormError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          surname: contactSurname,
          tel: contactTel,
          email: contactEmail,
          message: contactMessage
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setContactSuccess(true);
      } else {
        setContactFormError(data.error || "Failed to submit request.");
      }
    } catch (err: any) {
      console.error(err);
      setContactFormError(language === "zu" ? "Sibe nenkinga yokuxhumana neseva. Sicela uzame futhi." : "Technical error connecting to server. Please try again or use direct email.");
    } finally {
      setContactSending(false);
    }
  };

  const resetContactForm = () => {
    setContactName("");
    setContactSurname("");
    setContactTel("");
    setContactEmail("");
    setContactMessage("");
    setContactSuccess(false);
    setContactFormError("");
    setIsContactModalOpen(false);
  };
  
  // Courses & Student states
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // --- STUDENT PROFILES STATE ENGINE (100% IN-BROWSER SECURE WORKSPACE) ---
  const [studentDetails, setStudentDetails] = useState(() => {
    const local = localStorage.getItem("imali_student_profile");
    return local ? JSON.parse(local) : {
      name: "Thomas Mthembu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      specialty: "Forex & Candlesticks",
      experience: "Intermediate",
      bio: "Focusing on major USD currency pairs, price action breakout cues, and tight risk protocols."
    };
  });

  const [instructorDetails, setInstructorDetails] = useState(() => {
    const local = localStorage.getItem("imali_instructor_profile");
    return local ? JSON.parse(local) : {
      name: "Dr. Thabo Cele",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      specialty: "Futures & Pattern Technicals",
      experience: "Expert Lead",
      bio: "Chartered Market Technician with 15+ years formulating institution-level candlestick models.",
      classCode: "FOREX101"
    };
  });

  const [adminDetails, setAdminDetails] = useState(() => {
    const local = localStorage.getItem("imali_admin_profile");
    return local ? JSON.parse(local) : {
      name: "Sarah Cele",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      title: "Academic Dean",
      email: "Travelwildshow@gmail.com",
      bio: "Chief of learning resources, student registry directories, and session authorizations."
    };
  });

  // Class Unlock States
  const [classroomUnlocked, setClassroomUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("imali_classroom_unlocked") === "true";
  });
  const [enteredClassCode, setEnteredClassCode] = useState("");
  const [classCodeError, setClassCodeError] = useState("");

  // In-Session Push Alarm / missed lessons reminder simulation banner state
  const [activePushAlert, setActivePushAlert] = useState<{
    title_en: string;
    title_zu: string;
    message_en: string;
    message_zu: string;
    courseId?: string;
  } | null>(null);

  // Preference switches for reminders alerts
  const [reminderPrefs, setReminderPrefs] = useState(() => {
    const local = localStorage.getItem("imali_reminder_prefs");
    return local ? JSON.parse(local) : {
      forexAlerts: true,
      futuresAlerts: true,
      screenerAlerts: false,
      recurrence: "Daily"
    };
  });

  useEffect(() => {
    localStorage.setItem("imali_reminder_prefs", JSON.stringify(reminderPrefs));
  }, [reminderPrefs]);

  // Deep student progress state tracking for courses, completed chapters, and scores
  const [studentProgress, setStudentProgress] = useState(() => {
    const local = localStorage.getItem("imali_student_progress");
    return local ? JSON.parse(local) : {
      enrolledCourses: ["price_action_fundamentals", "chart_patterns_mastery"],
      completedCourses: [],
      progress: {
        "price_action_fundamentals": 45,
        "chart_patterns_mastery": 0,
      },
      quizScores: {}
    };
  });

  useEffect(() => {
    localStorage.setItem("imali_student_progress", JSON.stringify(studentProgress));
  }, [studentProgress]);

  // Keep scholarName initialized for reverse compatibility
  const [scholarName, setScholarName] = useState(() => studentDetails.name);

  // Keep studentDetails name synced with local states
  useEffect(() => {
    localStorage.setItem("imali_student_profile", JSON.stringify(studentDetails));
    localStorage.setItem("imali_instructor_profile", JSON.stringify(instructorDetails));
    localStorage.setItem("imali_admin_profile", JSON.stringify(adminDetails));
  }, [studentDetails, instructorDetails, adminDetails]);

  // Derived user details depending on current active role simulation
  const getSimulatedUser = (): User => {
    if (activeRole === Role.STUDENT) {
      return {
        id: "usr_exec_01",
        name: studentDetails.name,
        email: "thomas@elitecourses.edu",
        role: Role.STUDENT,
        avatar: studentDetails.avatar,
        enrolledCourses: studentProgress.enrolledCourses,
        completedCourses: studentProgress.completedCourses,
        progress: studentProgress.progress,
        quizScores: studentProgress.quizScores,
        attendanceCount: 4,
      };
    } else if (activeRole === Role.INSTRUCTOR) {
      return {
        id: "usr_inst_01",
        name: instructorDetails.name,
        email: "thabo.cele@elitecourses.edu",
        role: Role.INSTRUCTOR,
        avatar: instructorDetails.avatar,
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        quizScores: {},
        attendanceCount: 30,
      };
    } else {
      return {
        id: "usr_admin_01",
        name: adminDetails.name,
        email: "sarah.admin@elitecourses.edu",
        role: Role.ADMIN,
        avatar: adminDetails.avatar,
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        quizScores: {},
        attendanceCount: 15,
      };
    }
  };

  const currentUser = getSimulatedUser();

  // Admin users state (Simulated Ledger Registry)
  const [usersRegistry, setUsersRegistry] = useState<User[]>([
    {
      id: "usr_exec_01",
      name: studentDetails.name,
      email: "thomas@elitecourses.edu",
      role: Role.STUDENT,
      avatar: studentDetails.avatar,
      enrolledCourses: ["price_action_fundamentals", "chart_patterns_mastery"],
      completedCourses: [],
      progress: { "price_action_fundamentals": 45, "chart_patterns_mastery": 0 },
      quizScores: {},
      attendanceCount: 4,
    },
    {
      id: "usr_admin_01",
      name: adminDetails.name,
      email: "sarah.admin@elitecourses.edu",
      role: Role.ADMIN,
      avatar: adminDetails.avatar,
      enrolledCourses: [],
      completedCourses: [],
      progress: {},
      quizScores: {},
      attendanceCount: 15,
    },
    {
      id: "usr_inst_01",
      name: instructorDetails.name,
      email: "thabo.cele@elitecourses.edu",
      role: Role.INSTRUCTOR,
      avatar: instructorDetails.avatar,
      enrolledCourses: [],
      completedCourses: [],
      progress: {},
      quizScores: {},
      attendanceCount: 30,
    }
  ]);

  // Maintain sync of users list
  useEffect(() => {
    setUsersRegistry([
      {
        id: "usr_exec_01",
        name: studentDetails.name,
        email: "thomas@elitecourses.edu",
        role: Role.STUDENT,
        avatar: studentDetails.avatar,
        enrolledCourses: ["price_action_fundamentals", "chart_patterns_mastery"],
        completedCourses: [],
        progress: { "price_action_fundamentals": 45, "chart_patterns_mastery": 0 },
        quizScores: {},
        attendanceCount: 4,
      },
      {
        id: "usr_admin_01",
        name: adminDetails.name,
        email: "sarah.admin@elitecourses.edu",
        role: Role.ADMIN,
        avatar: adminDetails.avatar,
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        quizScores: {},
        attendanceCount: 15,
      },
      {
        id: "usr_inst_01",
        name: instructorDetails.name,
        email: "thabo.cele@elitecourses.edu",
        role: Role.INSTRUCTOR,
        avatar: instructorDetails.avatar,
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        quizScores: {},
        attendanceCount: 30,
      }
    ]);
  }, [studentDetails, instructorDetails, adminDetails]);

  // Notifications List
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n_1",
      title_en: "Live Lecture Starting",
      title_zu: "Isifundo Esibukhoma Siyaqala",
      message_en: "Thabiso Khumalo is preparing the Candlestick Mechanics Live Stream.",
      message_zu: "UThabiso Khumalo ulungiselela ukusakaza kwe-Candlestick Mechanics.",
      time: "Just Now",
      unread: true,
      type: "live"
    },
    {
      id: "n_2",
      title_en: "Breakout Screener Alert",
      title_zu: "Isixwayiso Se-Breakout",
      message_en: "Bullish double bottom breakout detected on simulated GBP/USD model chart.",
      message_zu: "Amandla amashadi e-reversal akhuphuka phezulu thola intengo.",
      time: "2h ago",
      unread: false,
      type: "grade"
    },
    {
      id: "n_3",
      title_en: "Zulu Translation Sync Active",
      title_zu: "Ukuhumusha kwesiZulu Kuvunyelanisiwe",
      message_en: "Dual-language terminology dictionaries are loaded in this secure browser sandbox.",
      message_zu: "Datha thola isivele layisha kahle ukuhamba ngomshini okhuluma nawe.",
      time: "1 day ago",
      unread: false,
      type: "system"
    }
  ]);

  // Academic Lounge Chat State - Split into Tokyo, China, Germany, London, South Africa, and New York channels
  const [activeChatRoom, setActiveChatRoom] = useState<string>("asian");
  const [chatSessions, setChatSessions] = useState<{ [room: string]: ChatMessage[] }>(() => {
    const local = localStorage.getItem("imali_chat_sessions_v2");
    if (local) return JSON.parse(local);
    return {
      asian: [
        {
          id: "msg_as_1",
          senderName: "Dr. Thabo Cele",
          senderRole: Role.INSTRUCTOR,
          content: "Welcome to the Tokyo Session Chat. Tokyo and Sydney markets are currently driving JPY and AUD liquidity pools.",
          timestamp: "02:15 UTC",
          language: "en"
        },
        {
          id: "msg_as_2",
          senderName: "Patricia Naidoo",
          senderRole: Role.STUDENT,
          content: "Yes, Doctor! Standard AUD/JPY carries are showing support. Perfect time for candle drills.",
          timestamp: "02:22 UTC",
          language: "en"
        },
        {
          id: "msg_as_3",
          senderName: "Sipho Khosi",
          senderRole: Role.STUDENT,
          content: "Sanibonani nonke! I-Tokyo session isetha kahle kakhulu ekuhwebeni namhlanje ekuseni.",
          timestamp: "02:30 UTC",
          language: "zu"
        }
      ],
      china: [
        {
          id: "msg_ch_1",
          senderName: "Dr. Thabo Cele",
          senderRole: Role.INSTRUCTOR,
          content: "Welcome to the China Session Chat. Hong Kong and Shanghai are actively driving USD/CNH liquidity.",
          timestamp: "03:10 UTC",
          language: "en"
        },
        {
          id: "msg_ch_2",
          senderName: "Patricia Naidoo",
          senderRole: Role.STUDENT,
          content: "We are tracking HSI index breakouts today. Crucial support being swept.",
          timestamp: "03:32 UTC",
          language: "en"
        }
      ],
      germany: [
        {
          id: "msg_ge_1",
          senderName: "Dr. Thabo Cele",
          senderRole: Role.INSTRUCTOR,
          content: "Frankfurt Session is active. German DAX index and Euro pairs are showing high volatility open gaps.",
          timestamp: "07:12 UTC",
          language: "en"
        },
        {
          id: "msg_ge_2",
          senderName: "Lerato Molefe",
          senderRole: Role.STUDENT,
          content: "DAX liquidity sweeps are forming inside the European morning corridor.",
          timestamp: "07:44 UTC",
          language: "en"
        }
      ],
      london: [
        {
          id: "msg_lo_1",
          senderName: "Dr. Thabo Cele",
          senderRole: Role.INSTRUCTOR,
          content: "Welcome to the active London Session chat. We are tracking interbank orders on GBP/USD and dynamic Euro triggers.",
          timestamp: "08:10 UTC",
          language: "en"
        },
        {
          id: "msg_lo_2",
          senderName: "Lerato Molefe",
          senderRole: Role.STUDENT,
          content: "GBP/USD swept the previous day high. Reversal setups look imminent inside the European discount zone.",
          timestamp: "08:24 UTC",
          language: "en"
        }
      ],
      southafrica: [
        {
          id: "msg_sa_1",
          senderName: "Dr. Thabo Cele",
          senderRole: Role.INSTRUCTOR,
          content: "Welcome to the South Africa JNB Session Chat! Let us track USD/ZAR carry-trade interest rate deltas.",
          timestamp: "09:05 UTC",
          language: "en"
        },
        {
          id: "msg_sa_2",
          senderName: "Sipho Khosi",
          senderRole: Role.STUDENT,
          content: "Ngiyaqhathanisa ama-pips e-USD/ZAR. Imakethe yakithi inyakaza ngamandla kakhulu namhlanje.",
          timestamp: "09:20 UTC",
          language: "zu"
        }
      ],
      newyork: [
        {
          id: "msg_ny_1",
          senderName: "Admin Assistant",
          senderRole: Role.ADMIN,
          content: "New York Session chat room is live. High-volatility scalpings expected during US morning core.",
          timestamp: "13:02 UTC",
          language: "en"
        },
        {
          id: "msg_ny_2",
          senderName: "Dr. Thabo Cele",
          senderRole: Role.INSTRUCTOR,
          content: "Gold cleared the buy-side pool elegantly. Secure your profits and protect capital hedges.",
          timestamp: "13:20 UTC",
          language: "en"
        },
        {
          id: "msg_ny_3",
          senderName: "Ken Zulu",
          senderRole: Role.STUDENT,
          content: "Ngivumelana nawe Professor, ngena isikhundla eside kule FVG yezemali.",
          timestamp: "13:35 UTC",
          language: "zu"
        }
      ]
    };
  });

  // Safe persist for session chats
  useEffect(() => {
    localStorage.setItem("imali_chat_sessions_v2", JSON.stringify(chatSessions));
  }, [chatSessions]);

  // Gatekeeper state to check if students have filled profiles and entered the special passwords
  const [unlockedChats, setUnlockedChats] = useState<{ [room: string]: boolean }>({
    asian: false,
    china: false,
    germany: false,
    london: false,
    southafrica: false,
    newyork: false
  });

  const [enteredChatPasscode, setEnteredChatPasscode] = useState<{ [room: string]: string }>({
    asian: "",
    china: "",
    germany: "",
    london: "",
    southafrica: "",
    newyork: ""
  });

  const [chatPasscodeError, setChatPasscodeError] = useState<{ [room: string]: string }>({
    asian: "",
    china: "",
    germany: "",
    london: "",
    southafrica: "",
    newyork: ""
  });

  // Countdown timer controls + real-time clock tickers
  const [systimeUtc, setSystimeUtc] = useState<Date>(new Date());
  const [activePdfResource, setActivePdfResource] = useState<any | null>(null);
  const [userTimezone] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        if (tz.includes("Johannesburg") || tz.includes("Harare") || tz === "Africa/Johannesburg") {
          return "Cape Town, SA (GMT+2)";
        }
        return tz.split("/").pop()?.replace("_", " ") || tz;
      }
    } catch (e) {}
    return "Cape Town, SA (GMT+2)";
  });
  const [simulatedTimeRemaining, setSimulatedTimeRemaining] = useState<{ [sess: string]: number | null }>({
    asian: null,
    china: null,
    germany: null,
    london: null,
    southafrica: null,
    newyork: null
  });
  const [showExpiryWarning, setShowExpiryWarning] = useState<string | null>(null);

  // Live ticking interval for clocks & simulated count downs
  useEffect(() => {
    const t = setInterval(() => {
      setSystimeUtc(new Date());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setSimulatedTimeRemaining(prev => {
        const next = { ...prev };
        let updated = false;
        
        for (const sess of ["asian", "china", "germany", "london", "southafrica", "newyork"]) {
          if (next[sess] !== null && next[sess]! > 0) {
            next[sess] = next[sess]! - 1;
            updated = true;
            
            // Trigger 5-min warning (below 300 seconds)
            if (next[sess]! === 299 && showExpiryWarning !== sess) {
              setShowExpiryWarning(sess);
            }
            
            if (next[sess]! === 0) {
              // Reset/delete volatile messages on expiration!
              setChatSessions(chats => ({
                ...chats,
                [sess]: [
                  {
                    id: "sys_purge_" + Date.now(),
                    senderName: "Secure Gateway",
                    senderRole: Role.ADMIN,
                    content: `🕒 Session closed! Volatile chat messages have been permanently purged and wiped in-browser.`,
                    timestamp: "SYSTEM",
                    language: "en"
                  }
                ]
              }));
              next[sess] = null;
              setShowExpiryWarning(null);
            }
          }
        }
        return updated ? next : prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [showExpiryWarning]);

  const [inputMessage, setInputMessage] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Virtual Classroom Simulation state
  const [isClassroomStreaming, setIsClassroomStreaming] = useState(false);
  const [whiteboardDrawings, setWhiteboardDrawings] = useState<string[]>([
    "M01: Neural Decision Network Matrix [IMALI Ngesizulu System]",
    "--- STATS: 1.28k Nodes Dynamic ---",
    "Gold Liquidity Index = (Commodity Reserves * 1.618) / Decentralized Leverage"
  ]);
  const [whiteboardInput, setWhiteboardInput] = useState("");
  const [classroomCamActive, setClassroomCamActive] = useState(true);
  const [classroomMicActive, setClassroomMicActive] = useState(true);

  // Clubhouse Drop-In Audio Suite States
  const [selectedAudioClassIndex, setSelectedAudioClassIndex] = useState<number>(0);
  const [isAudioSessionActive, setIsAudioSessionActive] = useState<boolean>(false);
  const [isClassThankYouPopupOpen, setIsClassThankYouPopupOpen] = useState<boolean>(false);
  const [audioSessionSeconds, setAudioSessionSeconds] = useState<number>(0);
  const [raisedHand, setRaisedHand] = useState<boolean>(false);

  // Quiz interactive state
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Admin Create/Manage Panel Form States
  const [newCourseTitleEn, setNewCourseTitleEn] = useState("");
  const [newCourseTitleZu, setNewCourseTitleZu] = useState("");
  const [newCourseDescEn, setNewCourseDescEn] = useState("");
  const [newCourseDescZu, setNewCourseDescZu] = useState("");
  const [newCourseCategoryEn, setNewCourseCategoryEn] = useState("Wealth Tech");
  const [newCourseDifficultyEn, setNewCourseDifficultyEn] = useState("Executive");

  const [newUserNm, setNewUserNm] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<Role>(Role.STUDENT);

  // AI Insights State
  const [aiInsightsReport, setAiInsightsReport] = useState<string>("");
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  // AI Arbitrary custom translation box state
  const [arbitraryText, setArbitraryText] = useState("");
  const [arbitraryTranslation, setArbitraryTranslation] = useState("");
  const [isTranslationBoxLoading, setIsTranslationBoxLoading] = useState(false);

  // Auto Scroll ref for chat
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatSessions, activeChatRoom]);

  useEffect(() => {
    let interval: any = null;
    if (isAudioSessionActive) {
      interval = setInterval(() => {
        setAudioSessionSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setAudioSessionSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAudioSessionActive]);



  // Functions & Handlers
  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "zu" : "en"));
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      senderName: currentUser.name,
      senderRole: currentUser.role,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: language
    };

    setChatSessions(prev => {
      const roomMsgs = prev[activeChatRoom] || [];
      return {
        ...prev,
        [activeChatRoom]: [...roomMsgs, userMsg]
      };
    });

    const currentText = inputMessage;
    setInputMessage("");

    // Simulate real classmate / instructor replies to make chats highly alive and realistic
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      
      let replyContent = "";
      let replierName = "Patricia Naidoo";
      let replierRole = Role.STUDENT;

      const normText = currentText.toLowerCase();
      if (activeChatRoom === "asian") {
        if (normText.includes("buy") || normText.includes("long") || normText.includes("aud") || normText.includes("jpy")) {
          replyContent = language === "en"
            ? "Agreed. The Yen carry trade is squeezing standard liquidities. Keep your buy alerts tight."
            : "Ngivumelana nawe. Ukuhweba nge-Yen carry kukhulisa amandla emakethe kuleli zinga.";
          replierName = "Sipho Khosi";
        } else {
          replyContent = language === "en"
            ? "The Tokyo volume spike is looking extremely clean on the 15-minute timeframe!"
            : "Ukuphakama kwe-volume e-Tokyo kubonakala kahle kakhulu emizuzwini eyi-15!";
          replierName = "Dr. Thabo Cele";
          replierRole = Role.INSTRUCTOR;
        }
      } else if (activeChatRoom === "china") {
        if (normText.includes("buy") || normText.includes("cnh") || normText.includes("hsi")) {
          replyContent = language === "en"
            ? "Indeed, the Hang Seng indexes are testing major support blocks right now."
            : "Impela, izinkomba ze-Hang Seng zihlola amazinga abalulekile okusekela manje.";
          replierName = "Sipho Khosi";
        } else {
          replyContent = language === "en"
            ? "Liquidity is flowing into Hong Kong equities during this session's peak."
            : "Ukuhamba kwemali kungena kakhulu kwi-Hong Kong equities kulesi sikhathi.";
          replierName = "Dr. Thabo Cele";
          replierRole = Role.INSTRUCTOR;
        }
      } else if (activeChatRoom === "germany") {
        if (normText.includes("dax") || normText.includes("short") || normText.includes("sell")) {
          replyContent = language === "en"
            ? "The German DAX index is attempting a clean breakout above daily resistance."
            : "I-German DAX izama ukuphuma kahle ngaphezu kokumelana kwansuku zonke.";
          replierName = "Lerato Molefe";
        } else {
          replyContent = language === "en"
            ? "Frankfurt open always sets European session direction. Watch out for false sweeps!"
            : "Ukuvula kwe-Frankfurt kuhlala kusetha indlela yeseshini yase-Europe.";
          replierName = "Dr. Thabo Cele";
          replierRole = Role.INSTRUCTOR;
        }
      } else if (activeChatRoom === "london") {
        if (normText.includes("sell") || normText.includes("gbp") || normText.includes("short")) {
          replyContent = language === "en"
            ? "I am holding a short contract from the premium discount zone. Targeting the daily low."
            : "Ngifake i-short contract kusuka phezulu lapha. Ngibheke inani eliphansi lanamuhla.";
          replierName = "Lerato Molefe";
        } else {
          replyContent = language === "en"
            ? "GBP/USD is showing heavy institutional accumulation right on the London open."
            : "I-GBP/USD ikhombisa ukuqoqwa okukhulu kwezikhungo kahle ekuvulweni kwe-London.";
          replierName = "Dr. Thabo Cele";
          replierRole = Role.INSTRUCTOR;
        }
      } else if (activeChatRoom === "southafrica") {
        if (normText.includes("zar") || normText.includes("rand") || normText.includes("usd")) {
          replyContent = language === "en"
            ? "The South African Rand is trending strongly against the USD due to local carry demand."
            : "UKheshi weRand unamandla amakhulu namhlanje ngenxa yezidingo zemali yakithi.";
          replierName = "Patricia Naidoo";
        } else {
          replyContent = language === "en"
            ? "USD/ZAR spreads are widening inside the JNB morning order flow corridors."
            : "Izilinganiso ze-USD/ZAR zikhulisa amandla emizileni yasekuseni ye-JNB.";
          replierName = "Dr. Thabo Cele";
          replierRole = Role.INSTRUCTOR;
        }
      } else {
        // New York
        if (normText.includes("gold") || normText.includes("xau") || normText.includes("profit")) {
          replyContent = language === "en"
            ? "Excellent profits locked! Gold is heading into the primary consolidation bracket now."
            : "Inzuzo enhle kakhulu ivaliwe! Igolide manje selingena ebangeni lokuhlanganisa.";
          replierName = "Ken Zulu";
        } else {
          replyContent = language === "en"
            ? "The US economic yield reports are creating heavy volatility ticks. Keep margins safe!"
            : "Imibiko yezezimali yaseMelika idala ukuyaluza okukhulu. Gcina izimali zakho ziphephile!";
          replierName = "Admin Assistant";
          replierRole = Role.ADMIN;
        }
      }

      const replyMsg: ChatMessage = {
        id: "reply_" + Date.now(),
        senderName: replierName,
        senderRole: replierRole,
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: language
      };

      setChatSessions(prev => {
        const roomMsgs = prev[activeChatRoom] || [];
        return {
          ...prev,
          [activeChatRoom]: [...roomMsgs, replyMsg]
        };
      });
    }, 1500);
  };

  // Run AI Arbitrary Translation Box
  const executeArbitraryTranslation = async () => {
    if (!arbitraryText.trim()) return;
    setIsTranslationBoxLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: arbitraryText,
          targetLang: language === "en" ? "zu" : "en"
        })
      });
      const data = await res.json();
      setArbitraryTranslation(data.translatedText || "Translation unavailable.");
    } catch (e) {
      console.error(e);
      setArbitraryTranslation("Error contacting digital translator.");
    } finally {
      setIsTranslationBoxLoading(false);
    }
  };

  // Generate Strategic Audit Analytics report using Gemini model insights
  const fetchAiGlobalReport = async () => {
    setIsInsightsLoading(true);
    setAiInsightsReport("");
    try {
      // Package active parameters to feed the model audit
      const metricsPackage = {
        scholarsCount: usersRegistry.length,
        coursesCount: courses.length,
        completionRateAverage: "94.2%",
        attendanceRateAverage: "89.5%",
        currentActiveLanguage: language,
        registeredPaths: courses.map(c => ({ id: c.id, title: c.title_en, students: c.studentsCount }))
      };

      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metrics: metricsPackage,
          language: language
        })
      });
      const data = await res.json();
      setAiInsightsReport(data.insights || "Unable to extract premium metrics report.");
    } catch (e) {
      console.error("Audit Generation Failed", e);
      setAiInsightsReport("Standard communication protocol was disrupted. Check network nodes.");
    } finally {
      setIsInsightsLoading(false);
    }
  };

  // Add course program code
  const handleAddNewCourse = () => {
    if (!newCourseTitleEn || !newCourseTitleZu) return;
    const uid = "course_" + Date.now();
    const mockCourse: Course = {
      id: uid,
      title_en: newCourseTitleEn,
      title_zu: newCourseTitleZu,
      category_en: newCourseCategoryEn,
      category_zu: newCourseCategoryEn === "Wealth Tech" ? "ezesayensi Yezimali" : "ingqalasizinda",
      difficulty_en: newCourseDifficultyEn,
      difficulty_zu: newCourseDifficultyEn === "Executive" ? "abaPhathi" : "okuthuthukile",
      duration_en: "12 Hours",
      duration_zu: "Amahora angu-12",
      description_en: newCourseDescEn || "New elite path registered inside master curriculum archives.",
      description_zu: newCourseDescZu || "Isifundo esisha emanzini e-Imperial.",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
      instructorName: currentUser.name,
      rating: 5.0,
      studentsCount: 1,
      modules: [
        {
          id: uid + "_m1",
          title_en: "Advanced Corporate Mechanics",
          title_zu: "Imiqondo Enzulu Yamabhizinisi",
          lessons: [
            {
              id: uid + "_l1",
              title_en: "Imperial Standards 101",
              title_zu: "Ngezamaza Ikhwalithi",
              duration: "30 mins",
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              content_en: "Full introduction to system execution benchmarks.",
              content_zu: "Ukubalela isisekelo somnyango wentuthuko eyisisekelo.",
              resources: []
            }
          ]
        }
      ]
    };

    setCourses(prev => [mockCourse, ...prev]);
    setNewCourseTitleEn("");
    setNewCourseTitleZu("");
    setNewCourseDescEn("");
    setNewCourseDescZu("");
    alert("New Course Commissioned Successfully!");
  };

  const handleAddNewUser = () => {
    if (!newUserNm || !newUserEmail) return;
    const mockUser: User = {
      id: "usr_" + Date.now(),
      name: newUserNm,
      email: newUserEmail,
      role: newUserRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUserNm)}&background=D4AF37&color=000`,
      enrolledCourses: ["fintech_blockchain"],
      completedCourses: [],
      progress: { "fintech_blockchain": 0 },
      quizScores: {},
      attendanceCount: 1
    };

    setUsersRegistry(prev => [...prev, mockUser]);
    setNewUserNm("");
    setNewUserEmail("");
    alert("New Scholar Registered in ledger successfully.");
  };

  const handleDownloadAudioSim = (classIndex: number) => {
    const selectedClass = AUDIO_CLASS_TYPES[classIndex] || AUDIO_CLASS_TYPES[0];
    const dummyAudioData = new Uint8Array(4096);
    for (let i = 0; i < dummyAudioData.length; i++) {
      dummyAudioData[i] = Math.floor(Math.random() * 256);
    }
    const blob = new Blob([dummyAudioData], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IMALI_ACADEMY_${selectedClass.id.toUpperCase()}_RECORDING_${selectedClass.duration.replace(" ", "")}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEnroll = (courseId: string) => {
    setStudentProgress(prev => {
      if (prev.enrolledCourses.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId],
        progress: {
          ...prev.progress,
          [courseId]: 0
        }
      };
    });
  };

  const updateCourseProgressFully = (courseId: string) => {
    setStudentProgress(prev => {
      const isCompleted = prev.completedCourses.includes(courseId);
      const isEnrolled = prev.enrolledCourses.includes(courseId);
      
      let nextEnrolled = [...prev.enrolledCourses];
      if (!isEnrolled) {
        nextEnrolled.push(courseId);
      }

      let nextCompleted = [...prev.completedCourses];
      if (!isCompleted) {
        nextCompleted.push(courseId);
      }

      return {
        ...prev,
        enrolledCourses: nextEnrolled,
        completedCourses: nextCompleted,
        progress: {
          ...prev.progress,
          [courseId]: 100
        }
      };
    });
    alert(language === "en" 
      ? "Course Completed! Your certificate is now unlocked." 
      : "Isifundo siphothuliwe! Isitifiketi sakho sesivuliwe.");
  };

  const handleSubmitQuiz = (courseId: string) => {
    // Grade calculation simulation
    setQuizSubmitted(true);
    setQuizScore(100); // Exec level clears!
    setStudentProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [courseId]: 100
      }
    }));
  };

  return (
    <div id="luxe_root" className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* Dynamic Gold liquid background ambient canvas glows */}
      <div className="absolute top-[-250px] right-[-150px] w-[600px] h-[600px] bg-gradient-to-br from-[#D4AF37]/15 to-[#996515]/0 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-tr from-[#996515]/10 to-[#AA771C]/0 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-gradient-to-l from-[#D4AF37]/5 to-[#000000]/0 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-[#D4AF37]/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ImaliLogo size={46} className="shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-light tracking-[0.2em] uppercase text-[#D4AF37] font-serif">
                {translateText("brand_name", language)}
              </span>
              <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-1.5 py-0.2 rounded font-sans tracking-widest">
                PROV
              </span>
            </div>
            <p className="text-[9px] text-[#D4AF37] tracking-[0.3em] font-medium opacity-80 uppercase leading-none mt-0.5">
              {translateText("brand_subtitle", language)}
            </p>
          </div>
        </div>

        {/* Global Control Station (Role Switcher and English/Zulu translation toggler) */}
        <div className="flex items-center flex-wrap gap-4 z-50">
          
          {/* Quick Language Switcher Banner */}
          <button 
            id="lang_switch_btn"
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-gradient-to-r from-black/80 to-zinc-900 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 text-xs text-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] transition-all cursor-pointer font-medium"
          >
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="uppercase text-[10px] tracking-widest font-black">
              {language === "en" ? "EN ↔ ZU" : "ZU ↔ EN"}
            </span>
          </button>

          {/* Quick Simulated Role Toggle */}
          <div className="flex items-center bg-black/80 border border-zinc-800 rounded-full p-1 text-[11px] gap-1">
            <span className="text-[9px] text-zinc-500 uppercase px-2 font-mono tracking-tighter">Role:</span>
            <button 
              id="role_student_btn"
              onClick={() => setActiveRole(Role.STUDENT)}
              className={`px-3 py-1 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider ${activeRole === Role.STUDENT ? "bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_10px_rgba(212,175,55,0.25)]" : "text-zinc-400 hover:text-white"}`}
            >
              STUDENT
            </button>
            <button 
              id="role_instructor_btn"
              onClick={() => setActiveRole(Role.INSTRUCTOR)}
              className={`px-3 py-1 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider ${activeRole === Role.INSTRUCTOR ? "bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_10px_rgba(212,175,55,0.25)]" : "text-zinc-400 hover:text-white"}`}
            >
              INSTR
            </button>
            <button 
              id="role_admin_btn"
              onClick={() => setActiveRole(Role.ADMIN)}
              className={`px-3 py-1 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider ${activeRole === Role.ADMIN ? "bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_10px_rgba(212,175,55,0.25)]" : "text-zinc-400 hover:text-white"}`}
            >
              ADMIN
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">Active Session:</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-emerald-900"></div>
          </div>
        </div>
      </header>

      {/* Missed Class or Course Reminder Sim Push Alert Banner */}
      {activePushAlert && (
        <div id="simulated_push_alert" className="z-50 bg-[#D4AF37] text-black font-semibold text-xs py-3.5 px-6 shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex flex-wrap items-center justify-between gap-4 border-b border-black/10 transition-all font-sans">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-lg shrink-0">
              🔔
            </div>
            <div>
              <p className="font-bold tracking-widest uppercase text-[10px] text-zinc-900/80">
                {language === "en" ? activePushAlert.title_en : activePushAlert.title_zu}
              </p>
              <p className="text-zinc-950 font-bold text-xs sm:text-sm mt-0.5">
                {language === "en" ? activePushAlert.message_en : activePushAlert.message_zu}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (activePushAlert.courseId) {
                  const testCourse = courses.find(c => c.id === activePushAlert.courseId);
                  if (testCourse) {
                    setSelectedCourse(testCourse);
                  }
                }
                setActiveTab("courses");
                setActivePushAlert(null);
              }}
              className="bg-black hover:bg-zinc-900 border border-black text-white px-4 py-2 rounded-xl text-[10px] uppercase font-mono hover:scale-105 transition-all text-center tracking-wider"
            >
              {language === "en" ? "Review Study Room" : "Hlola Igumbi Lokufunda"}
            </button>
            <button 
              onClick={() => setActivePushAlert(null)}
              className="bg-black/10 hover:bg-black/20 text-black px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div id="main_layout_body" className="flex-1 flex flex-col md:flex-row relative z-10">

        {/* Liquid Frosted Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-black/40 backdrop-blur-xl border-r border-[#D4AF37]/15 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            
            {/* Quick Profile Summary Card */}
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/5 backdrop-blur-md p-4 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#D4AF37]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 overflow-hidden relative">
                  <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide truncate max-w-[120px]">{currentUser.name}</h4>
                  <p className="text-[9px] text-[#D4AF37] uppercase font-mono tracking-widest mt-0.5">
                    {activeRole === Role.STUDENT && translateText("role_student", language)}
                    {activeRole === Role.INSTRUCTOR && translateText("role_instructor", language)}
                    {activeRole === Role.ADMIN && translateText("role_admin", language)}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-[8px] text-zinc-400 font-mono">STATUS REGISTRY:</span>
                <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">ACTIVE</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-2">
              <button
                id="nav_dashboard"
                onClick={() => { setActiveTab("dashboard"); setSelectedCourse(null); }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${activeTab === "dashboard" ? "bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_dashboard", language)}
                  </span>
                </div>
                <span className="text-[9px] opacity-40 font-serif font-black">M04</span>
              </button>

              <button
                id="nav_courses"
                onClick={() => { setActiveTab("courses"); }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${activeTab === "courses" ? "bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_courses", language)}
                  </span>
                </div>
                <span className="text-[9px] opacity-40 font-mono font-black">{courses.length}</span>
              </button>

              <button
                id="nav_classroom"
                onClick={() => { setActiveTab("classroom"); }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${activeTab === "classroom" ? "bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_classroom", language)}
                  </span>
                </div>
                <span className="text-[9px] bg-red-600/20 text-red-400 border border-red-500/30 px-1 rounded uppercase tracking-tighter text-[8px] animate-pulse">LIVE</span>
              </button>

              <button
                id="nav_chat"
                onClick={() => { setActiveTab("chat"); }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${activeTab === "chat" ? "bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_chat", language)}
                  </span>
                </div>
                <span className="text-[9px] bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-tight">ROOMS</span>
              </button>

              <button
                id="nav_blueprints"
                onClick={() => { setActiveTab("blueprints"); }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${activeTab === "blueprints" ? "bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_blueprints", language)}
                  </span>
                </div>
                <span className="text-[9px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-1 py-0.2 rounded font-mono font-bold animate-pulse">FM</span>
              </button>

              <button
                id="nav_contact_us"
                onClick={() => { setIsContactModalOpen(true); }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-transparent text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {language === "zu" ? "Xhumana Nathi / SoSizo" : "Help Centre • Contact"}
                  </span>
                </div>
                <span className="text-[9px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-1 py-0.2 rounded font-mono font-bold">HELP</span>
              </button>

              {activeRole === Role.ADMIN && (
                <button
                  id="nav_admin"
                  onClick={() => { setActiveTab("admin"); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${activeTab === "admin" ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]" : "bg-transparent border-transparent text-[#D4AF37]/70 hover:bg-white/5 hover:text-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold tracking-widest uppercase font-mono">
                      {translateText("nav_admin", language)}
                    </span>
                  </div>
                  <span className="text-[9px] bg-[#D4AF37] text-black px-1 rounded uppercase font-bold text-[8px]">SYS</span>
                </button>
              )}
            </nav>

            {/* Sidebar Sponsor Banner (XM) */}
            <div id="sidebar_affiliate_banner" className="pt-4 mt-4 border-t border-[#D4AF37]/15 flex flex-col items-center justify-center">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3">
                STATION SPONSOR
              </span>
              <a 
                href="https://clicks.pipaffiliates.com/c?m=150420&amp;c=662032" 
                target="_blank" 
                rel="noopener noreferrer" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="block transition-transform duration-300 hover:scale-[1.03] max-w-[120px]"
              >
                <img 
                  src="https://ads.pipaffiliates.com/i/150420?c=662032" 
                  width="120" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  alt="Partner Sponsor" 
                  className="border border-zinc-850 rounded-xl shadow-[0_12px_44px_rgba(0,0,0,0.8)]" 
                />
              </a>
            </div>

          </div>

          {/* Sidebar footer padding */}
          <div className="mt-auto h-4"></div>
        </aside>

        {/* Content Viewer viewport */}
        <main id="curriculum_viewport" className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* HEADER CONVERSATION & TOP BRIEF */}
          <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-neutral-950 to-[#0d0d0d] border border-white/5 p-6 rounded-2xl">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
                {translateText("brand_subtitle", language)}
              </p>
              <h1 className="text-3xl font-light tracking-tight mt-1 text-white uppercase font-serif">
                {activeTab === "dashboard" && "Executive Academy Central Portal"}
                {activeTab === "courses" && "Financial Education Curriculum"}
                {activeTab === "classroom" && "Interactive Live Lecture Suite"}
                {activeTab === "chat" && "Academic Discussion Forum"}
                {activeTab === "blueprints" && "Curriculum Roadmap & Framework"}
                {activeTab === "admin" && "Academy Management Console"}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                {language === "en" 
                  ? "Premium training portal for certified learning and interactive financial education."
                  : "Uhlelo lwemfundo oluphezulu lokudlulisa ulwazi olunolaka le-Premium."}
              </p>
            </div>
            
            {/* Real-time system announcement notifier */}
            <div className="flex items-center gap-2.5 bg-black/60 border border-[#D4AF37]/30 px-4 py-2 rounded-xl">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
              <div>
                <p className="text-[8px] text-[#D4AF37] font-mono tracking-widest font-black uppercase">LATEST COMMUNIQUE:</p>
                <p className="text-[10px] text-zinc-300 font-bold max-w-[180px] truncate">
                  {language === "en" ? "Sustainable energy computational micro-grid active." : "Ukusakaza okusha kukaThabo Cele kuthunyelwe."}
                </p>
              </div>
            </div>
          </section>

          {/* ================= ROYAL TRADING SESSIONS DESK (ANALOG & DIGITAL CODES) ================= */}
          <section id="sessions_trading_desk_clocks" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950/40 p-4 px-5 rounded-2xl border border-zinc-900">
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Financial Clocks
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
                <span className="text-[10.5px] font-mono text-zinc-400 flex flex-wrap items-center gap-1.5">
                  <span className="whitespace-nowrap">📍 DETECTED LOCATION:</span>
                  <strong className="text-zinc-100 bg-zinc-900/60 px-2.5 py-1 rounded border border-zinc-800/60 whitespace-nowrap">{userTimezone}</strong>
                </span>
                <span className="text-[10.5px] font-mono text-[#D4AF37] flex flex-wrap items-center gap-1.5">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                    <span>YOUR LOCAL TIME:</span>
                  </span>
                  <strong className="text-white bg-zinc-900 px-2.5 py-1 rounded border border-[#D4AF37]/30 font-mono whitespace-nowrap">
                    {systimeUtc.toLocaleTimeString()}
                  </strong>
                </span>
              </div>
            </div>

            {/* Clocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: "asian",
                  nameEn: "Tokyo Session (TYO)",
                  nameZu: "isikhathi se-Tokyo",
                  openHour: 0,
                  closeHour: 9,
                  offset: 9, // Tokyo UTC+9
                  symbol: "USDJPY, N225, AUDJPY",
                  participants: 24,
                  color: "#D4AF37",
                  bgGradiant: "from-[#1a150b] to-black"
                },
                {
                  id: "china",
                  nameEn: "China Session (PEK/SHA)",
                  nameZu: "isikhathi se-Beijing",
                  openHour: 1,
                  closeHour: 10,
                  offset: 8, // China UTC+8
                  symbol: "USDCNH, HSI, AUDCNH",
                  participants: 32,
                  color: "#f43f5e",
                  bgGradiant: "from-[#1c0c0e] to-black"
                },
                {
                  id: "germany",
                  nameEn: "Germany Session (FRA)",
                  nameZu: "isikhathi se-Frankfurt",
                  openHour: 7,
                  closeHour: 16,
                  offset: 2, // Frankfurt UTC+2
                  symbol: "DAX40, EURGBP, EURCHF",
                  participants: 40,
                  color: "#a855f7",
                  bgGradiant: "from-[#160b1c] to-black"
                },
                {
                  id: "london",
                  nameEn: "London Session (LND)",
                  nameZu: "isikhathi se-London",
                  openHour: 8,
                  closeHour: 17,
                  offset: 1, // London UTC+1
                  symbol: "GBPUSD, EURUSD, FTSE",
                  participants: 48,
                  color: "#38bdf8",
                  bgGradiant: "from-[#08151f] to-black"
                },
                {
                  id: "southafrica",
                  nameEn: "South Africa Session (JNB)",
                  nameZu: "isikhathi se-Johannesburg",
                  openHour: 7,
                  closeHour: 16,
                  offset: 2, // JNB UTC+2
                  symbol: "USDZAR, EURZAR, J200",
                  participants: 28,
                  color: "#10b981",
                  bgGradiant: "from-[#0b1c14] to-black"
                },
                {
                  id: "newyork",
                  nameEn: "New York Session (NY)",
                  nameZu: "isikhathi se-New York",
                  openHour: 13,
                  closeHour: 22,
                  offset: -4, // New York UTC-4
                  symbol: "XAUUSD, SPX500, NAS100",
                  participants: 65,
                  color: "#f59e0b",
                  bgGradiant: "from-[#1c120c] to-black"
                }
              ].map(sess => {
                // Determine active state & countdowns
                const utcHours = systimeUtc.getUTCHours();
                const utcMinutes = systimeUtc.getUTCMinutes();
                const utcSeconds = systimeUtc.getUTCSeconds();
                const totalCurrentSecs = utcHours * 3600 + utcMinutes * 60 + utcSeconds;

                const openSecs = sess.openHour * 3600;
                const closeSecs = sess.closeHour * 3600;

                let isActive = false;
                let secsLeft = 0;

                if (sess.openHour < sess.closeHour) {
                  if (utcHours >= sess.openHour && utcHours < sess.closeHour) {
                    isActive = true;
                    secsLeft = closeSecs - totalCurrentSecs;
                  } else {
                    isActive = false;
                    secsLeft = (openSecs > totalCurrentSecs) 
                      ? (openSecs - totalCurrentSecs) 
                      : (openSecs + 24 * 3600 - totalCurrentSecs);
                  }
                } else {
                  // Overlap midnight
                  if (utcHours >= sess.openHour || utcHours < sess.closeHour) {
                    isActive = true;
                    if (utcHours >= sess.openHour) {
                      secsLeft = (24 * 3600 - totalCurrentSecs) + closeSecs;
                    } else {
                      secsLeft = closeSecs - totalCurrentSecs;
                    }
                  } else {
                    isActive = false;
                    secsLeft = openSecs - totalCurrentSecs;
                  }
                }

                // If user simulated time remaining, use that instead!
                const isUnderSimulation = simulatedTimeRemaining[sess.id] !== null;
                const activeTimeRemaining = isUnderSimulation ? simulatedTimeRemaining[sess.id]! : secsLeft;
                const activeIsActive = isUnderSimulation ? true : isActive;

                const hr = Math.floor(activeTimeRemaining / 3600);
                const mn = Math.floor((activeTimeRemaining % 3600) / 60);
                const sc = activeTimeRemaining % 60;
                const countdownStr = `${hr.toString().padStart(2, "0")}h ${mn.toString().padStart(2, "0")}m ${sc.toString().padStart(2, "0")}s`;

                // Calculate Analog Hands
                const localHour = (utcHours + sess.offset + 24) % 24;
                const secDeg = utcSeconds * 6;
                const minDeg = utcMinutes * 6 + utcSeconds * 0.1;
                const hrDeg = (localHour % 12) * 30 + utcMinutes * 0.5;

                const ampm = localHour >= 12 ? "PM" : "AM";
                const displayHour = localHour % 12 === 0 ? 12 : localHour % 12;
                const localTimeDisplay = `${displayHour.toString().padStart(2, "0")}:${utcMinutes.toString().padStart(2, "0")}:${utcSeconds.toString().padStart(2, "0")} ${ampm}`;

                return (
                  <div 
                    key={sess.id}
                    className={`bg-gradient-to-b ${sess.bgGradiant} border ${activeIsActive ? "border-[#D4AF37]/45" : "border-zinc-900"} rounded-3xl p-5 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-4 transition-all hover:scale-[1.01]`}
                  >
                    {/* Analog Clock Column */}
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="relative w-16 h-16 shrink-0 bg-black rounded-full p-0.5 border border-zinc-800 shadow-inner">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="46" fill="none" stroke={sess.color} strokeWidth="2" className="opacity-20"></circle>
                          {/* Hour lines */}
                          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                            <line 
                              key={deg}
                              x1="50" y1="10"
                              x2="50" y2="15"
                              stroke={deg % 90 === 0 ? sess.color : "#3f3f46"}
                              strokeWidth={deg % 90 === 0 ? "2.5" : "1"}
                              transform={`rotate(${deg} 50 50)`}
                            />
                          ))}
                          {/* Hour hand */}
                          <line 
                            x1="50" y1="50"
                            x2="50" y2="28"
                            stroke="#ffffff"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            transform={`rotate(${hrDeg} 50 50)`}
                          />
                          {/* Minute hand */}
                          <line 
                            x1="50" y1="50"
                            x2="50" y2="18"
                            stroke={sess.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            transform={`rotate(${minDeg} 50 50)`}
                          />
                          {/* Second hand */}
                          <line 
                            x1="50" y1="50"
                            x2="50" y2="15"
                            stroke="#ef4444"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            transform={`rotate(${secDeg} 50 50)`}
                          />
                          <circle cx="50" cy="50" r="3.5" fill={sess.color}></circle>
                        </svg>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded font-mono text-zinc-450 block w-fit whitespace-nowrap">
                          {sess.openHour.toString().padStart(2, "0")}:00 - {sess.closeHour.toString().padStart(2, "0")}:00 UTC
                        </span>
                        <h4 className="text-xs font-bold text-white tracking-wide uppercase font-sans">
                          {language === "en" ? sess.nameEn : sess.nameZu}
                        </h4>
                        <p className="text-[10.5px] text-zinc-400 font-mono tracking-wide leading-relaxed select-all" title={sess.symbol}>
                          Pairs: {sess.symbol}
                        </p>
                      </div>
                    </div>

                    {/* Clock Digital Details & Countdown */}
                    <div className="text-left xs:text-right space-y-1 shrink-0 pt-3 xs:pt-0 border-t xs:border-t-0 border-zinc-900 flex xs:block justify-between items-center gap-2">
                      <p className="text-xs font-mono font-bold text-white">{localTimeDisplay}</p>
                      
                      <div className={`text-[9px] font-mono rounded px-2 py-0.5 inline-block font-black tracking-widest leading-none ${activeIsActive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-zinc-900 text-zinc-500 border border-zinc-850"}`}>
                        {activeIsActive ? "● ACTIVE" : "○ CLOSED"}
                      </div>

                      <div className="text-[10px] font-mono text-zinc-400 leading-normal block">
                        {activeIsActive ? (
                          <span className={isUnderSimulation || mn < 5 ? "text-amber-400 font-bold" : "text-zinc-400"}>
                            🔒 Close: {countdownStr}
                          </span>
                        ) : (
                          <span className="text-zinc-500">
                            🔑 Open: {countdownStr}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          
          {/* 1. ACADEMY DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div id="tab_dashboard" className="space-y-6">

              {/* 100% Offline Privacy Shield Warning Banner */}
              <div className="bg-gradient-to-r from-[#111] via-zinc-900 to-black border border-[#D4AF37]/30 p-6 rounded-3xl relative overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
                <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2 max-w-2xl text-left">
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Certified Private Local Session Active
                    </span>
                    <h3 className="text-xl font-light tracking-wide text-white uppercase font-serif">
                      Your Financial Education remains <span className="text-[#D4AF37] italic font-serif">Securely Yours</span>
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {language === "en"
                        ? "IMALI Academy operates entirely within your secure browser. Student files, lesson interactions, custom portfolios, and session codes are saved locally on your device and are never sent to external servers."
                        : "Leli gumbi lokufunda lisebenzisa izinhlelo ezivikelekile kwi-browser yakho kuphela. Yonke imininingwane yakho ayithunyelwa kuma-database angaphandle asindayo."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Profiles Workspace & Class Alarms Reminders Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 2-Col Profile Workspace */}
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-6 space-y-6 text-left">
                  
                  {/* Header of Profiles editor */}
                  <div className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-base font-light tracking-wide uppercase font-serif">
                        Academic <span className="text-[#D4AF37] italic">Profiles Manager</span>
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Fill and manage credentials for all three academic roles. Switch roles below to simulate student, instructor, or admin workspaces.
                      </p>
                    </div>
                    
                    {/* Active simulated role status */}
                    <div className="flex items-center gap-2 bg-black/60 border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] text-zinc-350 font-mono tracking-widest uppercase">
                        Current Active Role: <span className="text-[#D4AF37] font-black">{activeRole}</span>
                      </span>
                    </div>
                  </div>

                  {/* Sub-Tabs Selector inside Workspace */}
                  <div className="grid grid-cols-3 gap-2 bg-black/40 p-1.5 rounded-2xl border border-zinc-900">
                    <button
                      onClick={() => setVisibleProfileTab(Role.STUDENT)}
                      className={`py-3 px-1 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                        visibleProfileTab === Role.STUDENT
                          ? "bg-zinc-900 border border-zinc-800 text-[#D4AF37] shadow-inner"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="text-sm">👤</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
                        Student
                        {activeRole === Role.STUDENT && <span className="text-[7px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-mono font-bold">ACTIVE</span>}
                      </span>
                    </button>

                    <button
                      onClick={() => setVisibleProfileTab(Role.INSTRUCTOR)}
                      className={`py-3 px-1 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                        visibleProfileTab === Role.INSTRUCTOR
                          ? "bg-zinc-900 border border-zinc-800 text-[#D4AF37] shadow-inner"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="text-sm">🎓</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
                        Instructor
                        {activeRole === Role.INSTRUCTOR && <span className="text-[7px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-mono font-bold">ACTIVE</span>}
                      </span>
                    </button>

                    <button
                      onClick={() => setVisibleProfileTab(Role.ADMIN)}
                      className={`py-3 px-1 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                        visibleProfileTab === Role.ADMIN
                          ? "bg-zinc-900 border border-zinc-800 text-[#D4AF37] shadow-inner"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="text-sm">🛡️</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
                        Admin
                        {activeRole === Role.ADMIN && <span className="text-[7px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-mono font-bold">ACTIVE</span>}
                      </span>
                    </button>
                  </div>

                  {/* Tab Pages */}
                  <div className="bg-black/20 p-5 rounded-2xl border border-zinc-900/60 transition-all duration-205">
                    
                    {visibleProfileTab === Role.STUDENT && (
                      <div className="space-y-6 text-left">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-zinc-800/40">
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shrink-0">
                              <img src={studentDetails.avatar} alt="Student Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white font-serif">{studentDetails.name || "Thomas Mthembu"}</p>
                              <p className="text-[10px] text-[#D4AF37] font-mono uppercase mt-0.5">{studentDetails.experience || "Intermediate"} Student • {studentDetails.specialty || "Forex & Candlesticks"} Focus</p>
                              <p className="text-[11px] text-zinc-400 mt-1 italic leading-relaxed">"{studentDetails.bio || "What are your trading goals?"}"</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1 items-end shrink-0">
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-mono font-bold uppercase tracking-wider">
                              Status: READY TO JOIN
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Student Name</label>
                            <input 
                              type="text" 
                              value={studentDetails.name}
                              onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                              placeholder="e.g. Thomas Mthembu"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Trading Specialty</label>
                            <select 
                              value={studentDetails.specialty}
                              onChange={(e) => setStudentDetails({ ...studentDetails, specialty: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                            >
                              <option value="Forex & Candlesticks">Forex & Candlesticks</option>
                              <option value="Indices Breakouts">Indices Breakouts</option>
                              <option value="Futures Spreads">Futures Spreads</option>
                              <option value="Crypto Speculation">Crypto Speculation</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Experience Level</label>
                            <select 
                              value={studentDetails.experience}
                              onChange={(e) => setStudentDetails({ ...studentDetails, experience: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                            >
                              <option value="Novice">Novice (Getting Started)</option>
                              <option value="Intermediate">Intermediate (Practicing Setups)</option>
                              <option value="Master Portfolio Analyst">Master Portfolio Analyst</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Profile Avatar URL</label>
                            <input 
                              type="text" 
                              value={studentDetails.avatar}
                              onChange={(e) => setStudentDetails({ ...studentDetails, avatar: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-[10px] text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-400 font-mono uppercase block">Custom Student Bio / Focus Outline</label>
                          <textarea 
                            value={studentDetails.bio}
                            onChange={(e) => setStudentDetails({ ...studentDetails, bio: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-zinc-300 outline-none h-20 focus:border-[#D4AF37]"
                            placeholder="What is your trading goal?"
                          />
                        </div>

                        {/* Direct action links to simulated role join */}
                        <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-950/40 p-4 rounded-xl">
                          <div className="text-left">
                            <p className="text-xs text-zinc-400 font-medium">To join class as student, you will need the passcode:</p>
                            <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Active Class Passcode: <strong className="text-[#D4AF37] font-mono">{instructorDetails.classCode || "FOREX101"}</strong></p>
                          </div>
                          
                          <div className="flex gap-2 w-full sm:w-auto justify-end">
                            {activeRole !== Role.STUDENT && (
                              <button
                                onClick={() => {
                                  setActiveRole(Role.STUDENT);
                                  localStorage.setItem("imali_student_profile", JSON.stringify(studentDetails));
                                  alert("System role switched to student! Now heading to live audio room.");
                                  setActiveTab("classroom");
                                }}
                                className="py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest rounded-xl transition cursor-pointer"
                              >
                                Switch Role
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setActiveRole(Role.STUDENT);
                                setEnteredClassCode(instructorDetails.classCode || "FOREX101");
                                localStorage.setItem("imali_student_profile", JSON.stringify(studentDetails));
                                alert("Entering the dynamic audio classroom as Thomas Mthembu!");
                                setActiveTab("classroom");
                              }}
                              className="py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:brightness-110 text-black text-[10px] font-mono font-black uppercase tracking-widest rounded-xl transition shadow cursor-pointer"
                            >
                              🔑 Auto-Fill Code & Join
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {visibleProfileTab === Role.INSTRUCTOR && (
                      <div className="space-y-6 text-left">
                        <div className="bg-amber-500/10 border border-[#D4AF37]/30 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <p className="text-xs text-[#D4AF37] font-mono font-bold uppercase tracking-wider">🎓 REPRESENTING TEACHER / SPEAKER</p>
                            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                              Configure academic bio, and edit your private Class Access Code below. This code locks/unlocks the audio suit lobby for your students.
                            </p>
                          </div>
                          
                          <button
                            onClick={() => {
                              const randomCodes = ["GOLD777", "BTC360", "FOREX101", "SCALP05", "ZULU99", "IMALI888"];
                              const randomSel = randomCodes[Math.floor(Math.random() * randomCodes.length)];
                              setInstructorDetails({ ...instructorDetails, classCode: randomSel });
                              alert(`Successfully issued new classroom passcode: '${randomSel}'! Give this code to students.`);
                            }}
                            className="py-1.5 px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/45 text-[#D4AF37] text-[10px] font-mono tracking-wider font-bold uppercase rounded-lg shrink-0 cursor-pointer"
                          >
                            🎲 Generate New Code
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-black/40 p-4 rounded-2xl border border-zinc-900/50">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shrink-0">
                            <img src={instructorDetails.avatar} alt="Instructor Avatar" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white font-serif">{instructorDetails.name}</p>
                            <p className="text-[10px] text-[#D4AF37] font-mono uppercase mt-0.5">{instructorDetails.specialty} • Active Code: <code className="bg-[#D4AF37]/15 px-1.5 py-0.5 rounded text-[#D4AF37] font-mono font-bold">{instructorDetails.classCode}</code></p>
                            <p className="text-[11px] text-zinc-400 mt-1 italic leading-relaxed">"{instructorDetails.bio}"</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Instructor Name</label>
                            <input 
                              type="text" 
                              value={instructorDetails.name}
                              onChange={(e) => setInstructorDetails({ ...instructorDetails, name: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                              placeholder="e.g. Dr. Thabo Cele"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-[#D4AF37] font-mono uppercase block font-bold">Define Private Class Access Code</label>
                            <input 
                              type="text" 
                              value={instructorDetails.classCode}
                              onChange={(e) => {
                                const nextCode = e.target.value.toUpperCase();
                                setInstructorDetails({ ...instructorDetails, classCode: nextCode });
                              }}
                              className="w-full bg-[#1e1a0b] border-2 border-[#D4AF37]/40 p-3 rounded-xl text-xs text-[#D4AF37] font-bold outline-none focus:border-[#D4AF37] transition-all"
                              placeholder="e.g. FOREX101"
                            />
                            <span className="text-[9px] text-zinc-500 block">Students will have to type this passcode to enter the Clubhouse space.</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Academic Specialty</label>
                            <input 
                              type="text" 
                              value={instructorDetails.specialty}
                              onChange={(e) => setInstructorDetails({ ...instructorDetails, specialty: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Instructor Title</label>
                            <input 
                              type="text" 
                              value={instructorDetails.experience}
                              onChange={(e) => setInstructorDetails({ ...instructorDetails, experience: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-400 font-mono uppercase block">Instructor Biography & Credentials</label>
                          <textarea 
                            value={instructorDetails.bio}
                            onChange={(e) => setInstructorDetails({ ...instructorDetails, bio: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-zinc-300 outline-none h-20 focus:border-[#D4AF37]"
                          />
                        </div>

                        {/* Direct action links to simulated role join */}
                        <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center bg-zinc-950/40 p-4 rounded-xl">
                          <p className="text-[11px] text-zinc-400 max-w-sm">
                            Switching to instructor role will let you act as the host on stage, muting/unmuting and presenting lessons.
                          </p>
                          
                          <div className="flex gap-2">
                            {activeRole !== Role.INSTRUCTOR && (
                              <button
                                onClick={() => {
                                  setActiveRole(Role.INSTRUCTOR);
                                  localStorage.setItem("imali_instructor_profile", JSON.stringify(instructorDetails));
                                  alert("Designated as current live instructor. Entering the classroom!");
                                  setActiveTab("classroom");
                                }}
                                className="py-2.5 px-4 bg-[#D4AF37] hover:bg-amber-400 text-black text-[10px] font-mono uppercase font-black tracking-widest rounded-xl transition cursor-pointer"
                              >
                                🎓 Activate Role & Open Class
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {visibleProfileTab === Role.ADMIN && (
                      <div className="space-y-6 text-left">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                          <p className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">🛡️ DEAN / ADMINISTRATOR PROFILE</p>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                            Chief operating officer oversees schedules, registers students, and keeps study records securely running in local volatile storage.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-black/40 p-4 rounded-2xl border border-zinc-900/50">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shrink-0">
                            <img src={adminDetails.avatar} alt="Admin Avatar" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white font-serif">{adminDetails.name}</p>
                            <p className="text-[10px] text-[#D4AF37] font-mono uppercase mt-0.5">{adminDetails.title} • Chief Administrator</p>
                            <p className="text-[11px] text-zinc-400 mt-1 italic leading-relaxed">"{adminDetails.bio}"</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Administrator Name</label>
                            <input 
                              type="text" 
                              value={adminDetails.name}
                              onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Dean Operations Title</label>
                            <input 
                              type="text" 
                              value={adminDetails.title}
                              onChange={(e) => setAdminDetails({ ...adminDetails, title: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-400 font-mono uppercase block">Dean Contact & Sync Email</label>
                          <input 
                            type="email" 
                            value={adminDetails.email || ""}
                            onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                            placeholder="e.g. dean@executiveacademy.com"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-400 font-mono uppercase block">Dean Biography & Directives</label>
                          <textarea 
                            value={adminDetails.bio}
                            onChange={(e) => setAdminDetails({ ...adminDetails, bio: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-zinc-300 outline-none h-20 focus:border-[#D4AF37]"
                          />
                        </div>

                        {/* Direct action links to admin */}
                        <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-950/40 p-4 rounded-xl">
                          <p className="text-[11px] text-zinc-400 max-w-sm">
                            Switching to administrator role activates the exclusive 'Administrative Console' sidebar tab and grants class moderation authority.
                          </p>
                          
                          <div className="flex gap-2">
                            {activeRole !== Role.ADMIN && (
                              <button
                                onClick={() => {
                                  setActiveRole(Role.ADMIN);
                                  localStorage.setItem("imali_admin_profile", JSON.stringify(adminDetails));
                                  alert("Welcome to corporate administrator console! Switching views...");
                                }}
                                className="py-2.5 px-4 bg-zinc-900 hover:bg-zinc-805 text-zinc-300 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest rounded-xl transition cursor-pointer"
                              >
                                🛡️ Activate Admin Console
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Profile preservation ledger review */}
                  <div className="pt-3 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center bg-black/40 p-4 rounded-2xl gap-3">
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      IMALI SECURE: Profiles automatically saved to browser local storage
                    </span>
                    <button 
                      onClick={() => {
                        localStorage.setItem("imali_student_profile", JSON.stringify(studentDetails));
                        localStorage.setItem("imali_instructor_profile", JSON.stringify(instructorDetails));
                        localStorage.setItem("imali_admin_profile", JSON.stringify(adminDetails));
                        alert("Academic profiles saved successfully! Complete local privacy preserved.");
                      }}
                      className="py-1.5 px-4 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/45 hover:border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase rounded-xl transition cursor-pointer"
                    >
                      Save Settings Instantly
                    </button>
                  </div>
                </div>

                {/* Class Reminders & Missed Class Simulated Alerts Hub */}
                <div className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-4">
                    <div className="border-b border-zinc-800 pb-3">
                      <h3 className="text-base font-light tracking-wide uppercase font-serif">
                        Schedules & <span className="text-[#D4AF37] italic font-serif">Class Alerts</span>
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Set reminders to notify you about upcoming or missed lectures.
                      </p>
                    </div>

                    <div className="space-y-3.5 pt-1">
                      <div className="flex items-center justify-between p-3 bg-black/40 border border-zinc-900 rounded-2xl">
                        <div className="text-left">
                          <p className="text-xs font-bold text-white leading-normal">Forex Signals Alerts</p>
                          <span className="text-[9px] text-zinc-500">Alert me when Live Forex stream starts</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={reminderPrefs.forexAlerts}
                          onChange={(e) => setReminderPrefs({ ...reminderPrefs, forexAlerts: e.target.checked })}
                          className="w-4 h-4 accent-[#D4AF37] rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/40 border border-zinc-900 rounded-2xl">
                        <div className="text-left">
                          <p className="text-xs font-bold text-white leading-normal">Futures Spreads Alerts</p>
                          <span className="text-[9px] text-zinc-500">Alert me when Lady Sarah begins live</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={reminderPrefs.futuresAlerts}
                          onChange={(e) => setReminderPrefs({ ...reminderPrefs, futuresAlerts: e.target.checked })}
                          className="w-4 h-4 accent-[#D4AF37] rounded"
                        />
                      </div>

                      <input 
                        type="hidden" 
                        value="false"
                      />

                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono font-bold">Reminder Recurrence Interval</label>
                        <select 
                          value={reminderPrefs.recurrence}
                          onChange={(e) => setReminderPrefs({ ...reminderPrefs, recurrence: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-900 p-2 text-[11px] text-zinc-300 rounded-xl outline-none"
                        >
                          <option value="Daily">Once Per Day (Structured)</option>
                          <option value="Hourly">Upon Stream Signal Initiation</option>
                          <option value="Weekly">Weekly Digest Ledger Review</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black border border-zinc-900 p-4 rounded-2xl space-y-3 mt-4">
                    <p className="text-[9px] text-[#D4AF37] font-mono tracking-wider uppercase font-bold">ALARM REMINDERS SIMULATOR</p>
                    <p className="text-[11px] text-zinc-400">
                      Instantly trigger local device notifications to test class schedule alarms.
                    </p>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          setActivePushAlert({
                            title_en: "⚠️ UNRESOLVED MISSED CLASS REMINDER",
                            title_zu: "⚠️ ISIXWAYISO SOSUKU OLUPHUTHELWE",
                            message_en: `Thomas, you missed 'Price Action Trading & Candlestick Mechanics' 15 minutes ago with Thabiso Khumalo! Tap below to open study archives.`,
                            message_zu: `Thomas, uphuthelwe yisifundo sakho se-Price Action Trading emahoreni ambalwa adlule! Hlola igumbi lokufunda.`,
                            courseId: "price_action_fundamentals"
                          });
                        }}
                        className="w-full py-2 bg-red-650/15 hover:bg-red-750/30 border border-red-500/30 hover:border-red-500 text-red-400 text-[10px] font-mono font-bold uppercase rounded-lg transition"
                      >
                        🚨 Simulate Missed Class Alert
                      </button>

                      <button 
                        onClick={() => {
                          setActivePushAlert({
                            title_en: "📅 UPCOMING LECTURE REMINDER ALERT",
                            title_zu: "📅 ISIKHATHI SESIFUNDO SIKHONA MANJE",
                            message_en: `Active Alert: 'Advanced Chart Pattern Recognition' taught by ${instructorDetails.name} starts in 15 mins!`,
                            message_zu: `I-alamu Isifundo: i-Advanced Chart Pattern Recognition iqala emizuzwini engu-15 ezayo!`,
                            courseId: "chart_patterns_mastery"
                          });
                        }}
                        className="w-full py-2 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono font-bold uppercase rounded-lg transition"
                      >
                        🔔 Simulate Upcoming Stream Alert
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Strategic metrics readout (Attendance, completion rates, performance) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/45 transition-all">
                  <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-[#D4AF37]/5 rounded-full blur-xl group-hover:bg-[#D4AF37]/10 transition-all"></div>
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                    {translateText("metric_progress", language)} (Average)
                  </p>
                  <p className="text-3xl font-light tracking-tight text-white font-serif">40% <span className="text-xs font-mono text-zinc-500">Global</span></p>
                  <div className="mt-3 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[40%] h-full bg-gradient-to-r from-[#996515] to-[#D4AF37]"></div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/45 transition-all">
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                    {translateText("metric_completion_rate", language)}
                  </p>
                  <p className="text-3xl font-light tracking-tight text-white font-serif">94.2%</p>
                  <span className="text-[9px] text-[#D4AF37] tracking-wider mt-1 block">Isilinganiso sokuphothula</span>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                    {translateText("metric_attendance", language)}
                  </p>
                  <p className="text-3xl font-light tracking-tight text-white font-serif">{currentUser.attendanceCount} <span className="text-xs font-sans text-zinc-500">Lectures</span></p>
                  <span className="text-[9px] text-zinc-400 mt-1 block">Attendance record verified</span>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                    {translateText("metric_active_students", language)}
                  </p>
                  <p className="text-3xl font-light tracking-tight text-white font-serif">{usersRegistry.length} <span className="text-xs font-sans text-zinc-500">Enrolled</span></p>
                  <span className="text-[9px] text-[#D4AF37] mt-1 block">Imperial registry scholars</span>
                </div>
              </div>



              {/* Main Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2-Span: Executive Paths Progress list */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <h3 className="text-lg font-light tracking-widest uppercase font-serif">
                      Your Active <span className="text-[#D4AF37] italic">Learning Pathways</span>
                    </h3>
                    <button 
                      onClick={() => setActiveTab("courses")}
                      className="text-[10px] text-[#D4AF37] hover:underline uppercase tracking-widest"
                    >
                      {language === "en" ? "Explore Full Curricula" : "Buka Ezikhona zombili"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.filter(c => currentUser.enrolledCourses.includes(c.id)).map(course => {
                      const userProg = currentUser.progress[course.id] || 0;
                      return (
                        <div key={course.id} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all">
                          <div className="p-5 flex-1 space-y-3">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-zinc-300 font-mono">
                                {language === "en" ? course.category_en : course.category_zu}
                              </span>
                              <span className="text-[10px] font-bold text-[#D4AF37]">
                                ⭐ {course.rating}
                              </span>
                            </div>
                            <h4 className="text-base font-semibold tracking-tight text-white min-h-[44px] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                              {language === "en" ? course.title_en : course.title_zu}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-3">
                              {language === "en" ? course.description_en : course.description_zu}
                            </p>
                          </div>

                          <div className="p-5 bg-zinc-950/40 border-t border-white/5 space-y-4">
                            <div>
                              <div className="flex justify-between text-[10px] uppercase font-mono mb-1 text-zinc-400">
                                <span>Pathway Mastery</span>
                                <span className="text-[#D4AF37] font-bold">{userProg}%</span>
                              </div>
                              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#996515] to-[#D4AF37] transition-all" style={{ width: `${userProg}%` }}></div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => { setSelectedCourse(course); setActiveTab("courses"); }}
                                className="flex-1 py-2 bg-white/5 hover:bg-[#D4AF37]/20 border border-zinc-800 hover:border-[#D4AF37]/45 text-white hover:text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all"
                              >
                                {translateText("btn_continue", language)}
                              </button>
                              
                              {/* Option to view certificate if progress is 100% */}
                              {userProg === 100 ? (
                                <button
                                  onClick={() => { setSelectedCourse(course); setActiveTab("courses"); }}
                                  className="px-3 bg-[#D4AF37] hover:brightness-110 text-black rounded-xl text-xs flex items-center justify-center"
                                  title="View digital certificate status"
                                >
                                  <Award className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => updateCourseProgressFully(course.id)}
                                  className="px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs flex items-center justify-center"
                                  title="Fast-track progress to 100% (Simulation)"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Course catalog explore banner */}
                  <div className="bg-gradient-to-r from-zinc-900 to-black border border-[#D4AF37]/20 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] font-serif">
                        {language === "en" ? "Looking to expand your administrative influence?" : "Bheka izikhundla eziningi ngesu lothando?"}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {language === "en" 
                          ? "We have 7 world-class premium quantitative systems waiting for commission." 
                          : "Une zifundo ezisezingeni eliphezulu eziyi-7 ezikulindile."}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("courses")}
                      className="whitespace-nowrap px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#996515] text-black text-xs font-bold tracking-widest uppercase rounded-xl hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      {language === "en" ? "View Full Repository" : "Buka Konke Okukhona"}
                    </button>
                  </div>
                </div>

                {/* Lateral panel: Announcements feed & certificate ledger audit tracker */}
                <div className="space-y-4">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-base font-light tracking-wider uppercase font-serif">
                      Academic <span className="text-[#D4AF37] italic">Gazette & Records</span>
                    </h3>
                  </div>

                  {/* Cert tracker widget */}
                  <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-5 space-y-4">
                    <p className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase border-b border-white/5 pb-2">
                      IN-APP PROGRESSION LOG
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white">{scholarName}'s Strategic Certificate</p>
                          <p className="text-[9px] text-[#D4AF37] font-mono">STATUS: UNLOCKED PATHWAYS</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-400 italic">
                        {language === "en" 
                          ? "Certificates generate autonomously on 100% path completions. Ready to sign via cryptographic hashing." 
                          : "Izitifiketi zikhishwa ngokushesha uma uphothula isifundo. Kulungele ukusayinwa kwi-ledger."}
                      </p>
                      <button 
                        onClick={() => {
                          const completed = courses.filter(c => currentUser.progress[c.id] === 100);
                          if (completed.length > 0) {
                            setSelectedCourse(completed[0]);
                            setActiveTab("courses");
                          } else {
                            // Automatically pass first course to test
                            updateCourseProgressFully(courses[0].id);
                            setSelectedCourse(courses[0]);
                            setActiveTab("courses");
                          }
                        }}
                        className="w-full py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase rounded-xl transition-all"
                      >
                        {translateText("cert_view_your", language)}
                      </button>
                    </div>
                  </div>

                  {/* Interactive Announcements Bulletin */}
                  <div className="space-y-3.5">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Active Bulletins</span>
                    {notifications.map(n => (
                      <div key={n.id} className="p-3.5 bg-black/50 border border-zinc-800 rounded-xl relative hover:border-zinc-700 transition">
                        {n.unread && (
                          <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></div>
                        )}
                        <span className="text-[8px] bg-white/5 border border-white/5 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono uppercase">
                          {n.type}
                        </span>
                        <h5 className="text-xs font-bold text-zinc-200 mt-1.5">
                          {language === "en" ? n.title_en : n.title_zu}
                        </h5>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          {language === "en" ? n.message_en : n.message_zu}
                        </p>
                        <span className="text-[8px] text-zinc-500 block text-right mt-2">{n.time}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* 2. THE IMPERIAL COURSE REPOSITORY & VIEWER */}
          {activeTab === "courses" && (
            <div id="tab_courses" className="space-y-6">
              
              {!selectedCourse ? (
                // Course List View
                <div className="space-y-6">
                  {/* Category filters */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-light tracking-widest uppercase font-serif">
                      Academic <span className="text-[#D4AF37] italic">Curricula Repository</span>
                    </h3>
                    
                    {/* Real-time search filter */}
                    <div className="bg-black/80 border border-zinc-800 px-3.5 py-1.5 rounded-full flex items-center gap-2 w-full sm:w-72">
                      <Search className="w-4 h-4 text-[#D4AF37]" />
                      <input 
                        type="text" 
                        placeholder={language === "en" ? "Search premium catalog..." : "Funa izifundo lapha..."}
                        className="bg-transparent border-0 text-xs text-white outline-none w-full"
                      />
                    </div>
                  </div>

                  {/* Elegant Grid of Courses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => {
                      const isEnrolled = currentUser.enrolledCourses.includes(course.id);
                      const progressVal = currentUser.progress[course.id] || 0;
                      return (
                        <div key={course.id} className="bg-black/60 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                          <div className="h-44 overflow-hidden relative">
                            <img src={course.thumbnail} alt={course.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur px-2.5 py-1 rounded-md text-[9px] uppercase tracking-widest border border-zinc-800 text-zinc-300">
                              {language === "en" ? course.difficulty_en : course.difficulty_zu}
                            </div>
                            {isEnrolled && (
                              <div className="absolute top-3 right-3 bg-[#D4AF37] text-black font-extrabold text-[8px] uppercase tracking-widest px-2 py-1 rounded">
                                {language === "en" ? "ENROLLED" : "UBALIWE"}
                              </div>
                            )}
                          </div>

                          <div className="p-6 space-y-4 flex-1">
                            <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37]">
                              <span>{language === "en" ? course.category_en : course.category_zu}</span>
                              <span>⌚ {language === "en" ? course.duration_en : course.duration_zu}</span>
                            </div>

                            <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                              {language === "en" ? course.title_en : course.title_zu}
                            </h4>

                            <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                              {language === "en" ? course.description_en : course.description_zu}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                              <span className="text-zinc-300 font-bold">{course.instructorName}</span>
                              <span>•</span>
                              <span>{course.studentsCount} Students</span>
                            </div>
                          </div>

                          <div className="p-6 border-t border-zinc-900 bg-zinc-950/40">
                            {isEnrolled ? (
                              <div className="space-y-3.5">
                                <div className="flex justify-between text-[11px] font-mono">
                                  <span className="text-zinc-400">Progression Coefficient</span>
                                  <span className="text-[#D4AF37] font-bold">{progressVal}%</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#996515] to-[#D4AF37]" style={{ width: `${progressVal}%` }}></div>
                                </div>
                                <button 
                                  onClick={() => { setSelectedCourse(course); setActiveLesson(course.modules[0]?.lessons[0] || null); }}
                                  className="w-full py-3 bg-white/5 hover:bg-[#D4AF37]/20 border border-zinc-800 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                                >
                                  {language === "en" ? "Open Curriculum Room" : "Ngena ekilasini lonke"}
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleEnroll(course.id)}
                                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#996515] text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:brightness-110 shadow-[0_4px_12px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
                              >
                                {language === "en" ? "Enroll in Pathway" : "Bhalisela Isifundo"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Educational Foundation references (BabyPips, Investopedia etc.) - Renders conditionally based on Admin toggle */}
                  {showReferences && (
                    <div className="mt-12 bg-neutral-950 border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-6 text-left">
                      <div className="border-b border-zinc-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded font-mono font-bold tracking-widest uppercase">
                            🛡️ Educational Inspiration & Standards Directory
                          </span>
                          <h4 className="text-xl font-serif text-white uppercase tracking-tight mt-1">
                            Elite Academic References
                          </h4>
                        </div>
                        <span className="text-[10px] text-[#D4AF37] font-mono bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded font-bold">ADMIN ACTIVE</span>
                      </div>

                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        To maintain international standards of curriculum design, topic mapping, and professional knowledge progression, our pathways are structurally inspired by elite, established global financial educational platforms.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          {
                            name: "BabyPips – School of Pipsology",
                            desc: "Inspirational source for beginner-to-intermediate pathways, structure, and lesson progression designs.",
                            url: "https://www.babypips.com/learn"
                          },
                          {
                            name: "Investopedia Learning Hub",
                            desc: "Deep reference structure for core terms, currency mechanics, and fundamental analysis systems.",
                            url: "https://www.investopedia.com/education/"
                          },
                          {
                            name: "IG Academy",
                            desc: "Professional educational standards, margin risk dynamics, and multi-asset curriculum guidelines.",
                            url: "https://www.ig.com/en/learn-to-trade"
                          },
                          {
                            name: "Free Trading PDF Resources",
                            desc: "Comprehensive bibliography reference point containing curated lists of open-domain trading textbooks.",
                            url: "https://infobooks.org/free-pdf-books/business/trading/"
                          }
                        ].map((source, sIdx) => (
                          <a 
                            key={sIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/55 p-4 rounded-2xl border border-zinc-900 hover:border-[#D4AF37]/30 transition group flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <p className="text-xs font-serif font-semibold text-white group-hover:text-[#D4AF37] transition">
                                {source.name}
                              </p>
                              <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                                {source.desc}
                              </p>
                            </div>
                            <span className="text-[9px] text-[#D4AF37] inline-flex items-center gap-1 font-mono uppercase mt-3 tracking-wider">
                              Establish Link ↗
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="space-y-4 pt-4 border-t border-zinc-900">
                        <span className="text-[10px] text-zinc-500 font-mono tracking-wider block uppercase">
                          RECOMMENDED EDUCATIONAL AUDIO-VISUAL CHANNELS:
                        </span>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {[
                            { name: "Trading Rush", url: "https://www.youtube.com/@TradingRush" },
                            { name: "The Trading Channel", url: "https://www.youtube.com/@TheTradingChannel" },
                            { name: "UKspreadbetting", url: "https://www.youtube.com/@UKspreadbetting" },
                            { name: "Rayner Teo", url: "https://www.youtube.com/@RaynerTeo" },
                            { name: "TraderNick", url: "https://www.youtube.com/@TraderNick" }
                          ].map((channel, cIdx) => (
                            <a 
                              key={cIdx} 
                              href={channel.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-center p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:bg-neutral-900 transition flex flex-col items-center justify-center gap-1 text-[10.5px] text-zinc-300 font-mono"
                            >
                              <span className="text-red-500 text-xs">🔴</span>
                              <span className="font-bold text-white block">{channel.name}</span>
                              <span className="text-[8.5px] text-zinc-500">Visit Channel ↗</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                // Individual Course Detail View with Curriculum, Videos, and certificate validator
                <div className="space-y-6">
                  
                  {/* Course Dashboard Bar */}
                  <button 
                    onClick={() => { setSelectedCourse(null); setActiveLesson(null); setQuizSubmitted(false); }}
                    className="text-xs text-[#D4AF37] hover:underline uppercase tracking-widest flex items-center gap-1 font-mono cursor-pointer"
                  >
                    ← {language === "en" ? "Back to Repository" : "Emuva ekuqaleni"}
                  </button>

                  <div className="bg-gradient-to-r from-[#030303] to-[#0c0c0c] border border-white/5 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded font-mono uppercase tracking-widest">
                        {language === "en" ? selectedCourse.difficulty_en : selectedCourse.difficulty_zu}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif text-white uppercase leading-tight font-light">
                        {language === "en" ? selectedCourse.title_en : selectedCourse.title_zu}
                      </h2>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {language === "en" ? selectedCourse.description_en : selectedCourse.description_zu}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                        <span>{language === "en" ? "Duration: " + selectedCourse.duration_en : "Isikhathi: " + selectedCourse.duration_zu}</span>
                        <span>•</span>
                        <span>{language === "en" ? "Instructor: " + selectedCourse.instructorName : "Uthisha: " + selectedCourse.instructorName}</span>
                        <span>•</span>
                        <span>Rating: ⭐⭐⭐⭐⭐ ({selectedCourse.rating})</span>
                      </div>
                    </div>

                    {/* Fast Track / Progression actions */}
                    <div className="bg-zinc-950/85 border border-[#D4AF37]/20 p-5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono">YOUR SCHOLAR INDEX</p>
                        <p className="text-xl font-bold text-white mt-1">
                          {currentUser.progress[selectedCourse.id] || 0}% Complete
                        </p>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-2">
                          <div className="h-full bg-gradient-to-r from-[#996515] to-[#D4AF37]" style={{ width: `${currentUser.progress[selectedCourse.id] || 0}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        {currentUser.progress[selectedCourse.id] === 100 ? (
                          <div className="bg-[#D4AF37]/10 p-3 rounded-xl border border-[#D4AF37]/30 text-center animate-pulse">
                            <span className="text-[10px] font-mono text-[#D4AF37] block">VERIFIED EXCEL</span>
                            <span className="text-xs font-serif text-white font-bold">Imperial Certificate Available</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => updateCourseProgressFully(selectedCourse.id)}
                            className="w-full py-2 bg-[#D4AF37] hover:brightness-110 text-black text-[10px] font-mono tracking-widest uppercase rounded-xl transition font-black cursor-pointer"
                          >
                            {translateText("btn_claim_cert", language)}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Lesson Stream panel & Sidebar Modules Curriculum List */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* 2-Span: Video Stream Player, Lesson Material, Resources, & Quiz */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {activeLesson ? (
                        <div className="bg-black/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
                          
                           {/* Elite Step-by-Step Illustrated Blueprints Header */}
                           <div className="p-6 border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-black space-y-4">
                             <div className="flex justify-between items-center">
                               <span className="text-[9px] bg-[#D4AF37] text-black font-mono font-black tracking-widest px-2.5 py-1 rounded">
                                 {language === "en" ? "LONG-FORM ILLUSTRATED BLUEPRINT" : "UHLELO LOKUFUNDA LWEZITHOMBE"}
                               </span>
                               <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                                 {language === "en" ? "FULL IMAGES INSIDE" : "INEMIFANEKISO EZIPHELELEYO"}
                               </span>
                             </div>
                             
                             <h3 className="text-2xl font-serif text-white tracking-tight leading-snug">
                               {language === "en" ? activeLesson.title_en : activeLesson.title_zu}
                             </h3>
                             <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                               {language === "en" 
                                 ? "This comprehensive course guide provides professional high-resolution step-by-step illustrated blueprints instead of videos. Scroll down to study each graphical phase of the strategy setup." 
                                 : "Lo mhlahlandlela ususa amavidiyo ufake imifanekiso egcwele esebenza isinyathelo ngesinyathelo ngendlela efundisekayo neqondakalayo. Phequlula phansi uzofunda."}
                             </p>
                           </div>
 
                           {/* Lesson Written Transcript content & downloadable premium tools */}
                           <div className="p-6 space-y-8">
                             
                             <div className="space-y-3">
                               <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono border-b border-zinc-800 pb-2">
                                 {language === "en" ? "Executive Lecture Overview" : "Ukufingqwa koMhlangano weSifundo"}
                               </h4>
                               <p className="text-sm leading-relaxed text-zinc-300 font-serif">
                                 {language === "en" ? activeLesson.content_en : activeLesson.content_zu}
                               </p>
                             </div>
 
                             {/* Illustrated Steps Timeline */}
                             <div className="space-y-10 pt-4">
                               <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono border-b border-zinc-800 pb-2">
                                 {language === "en" ? "Elite Step-by-Step Practical Matrix" : "Izinyathelo Ezisize Kwimpumelelo Ngokulandelana"}
                               </h4>
                               
                               <div className="space-y-12">
                                 {getLessonSteps(activeLesson, language).map((step, idx) => (
                                   <div key={idx} className="relative group pl-0 md:pl-6 border-l-0 md:border-l border-zinc-800 space-y-4">
                                     {/* Gold step marker badge */}
                                     <div className="hidden md:flex absolute -left-3.5 top-0 w-7 h-7 rounded-sm bg-zinc-950 border border-[#D4AF37] items-center justify-center text-[10px] font-mono text-[#D4AF37] font-bold shadow-md">
                                       {idx + 1}
                                     </div>
                                     
                                     <div className="flex flex-col space-y-2">
                                       <span className="md:hidden text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase font-bold">
                                         {language === "en" ? `Step 0${idx + 1}` : `Isinyathelo 0${idx + 1}`}
                                       </span>
                                       <h5 className="text-base text-white font-serif tracking-tight flex items-center gap-2">
                                         <span className="hidden md:inline text-zinc-500 font-mono text-xs">Phase {idx + 1}:</span>
                                         {step.title}
                                       </h5>
                                       <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl bg-zinc-950/40 border border-zinc-900/60 p-3 rounded-xl font-mono">
                                         {step.description}
                                       </p>
                                     </div>
 
                                     {/* High resolution master image container */}
                                     <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-black/60 relative shadow-lg">
                                       <div className="absolute top-3 left-3 z-10 bg-black/85 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5 shadow-md">
                                         <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                                         <span>EDUCATIONAL CHART GRAPHICS 0{idx + 1}</span>
                                       </div>
                                       
                                       <div className="w-full">
                                         <StepChartGraphic 
                                           lessonId={activeLesson.id || ""} 
                                           stepIndex={idx} 
                                           language={language} 
                                         />
                                       </div>
                                       
                                       <div className="p-3 bg-zinc-950/80 border-t border-zinc-900 text-[9px] text-zinc-400 font-mono flex items-center justify-between">
                                         <span>{step.title}</span>
                                         <span className="text-zinc-600 font-mono">Elite Courses Academic Unit</span>
                                       </div>
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             </div>

                            {/* Downloadable Imperial Resources (PDF / ZIP) */}
                            {activeLesson.resources && activeLesson.resources.length > 0 && (
                              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                                <h5 className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono flex items-center gap-2">
                                  <Download className="w-4 h-4" />
                                  {translateText("course_materials", language)}
                                </h5>
                                <div className="space-y-2">
                                  {activeLesson.resources.map((resIdx, i) => (
                                    <div key={i} className="flex justify-between items-center bg-black/50 border border-zinc-800 p-3 rounded-xl hover:border-[#D4AF37]/35 transition">
                                      <div className="flex items-center gap-2.5">
                                        <FileText className="w-4 h-4 text-[#D4AF37]" />
                                        <div className="text-left">
                                          <p className="text-xs font-bold text-white">
                                            {language === "en" ? resIdx.name_en : resIdx.name_zu}
                                          </p>
                                          <p className="text-[9px] text-[#D4AF37] uppercase font-mono">{resIdx.type} ARCHIVE</p>
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {resIdx.pdfContent_en && (
                                          <button 
                                            onClick={() => setActivePdfResource(resIdx)}
                                            className="py-1.5 px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] border border-[#D4AF37]/30 hover:border-transparent rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap"
                                          >
                                            {language === "en" ? "🖥️ View PDF Book" : "🖥️ Funda Incwadi"}
                                          </button>
                                        )}
                                        <button 
                                          onClick={() => alert(`Premium PDF download initialized: ${language === "en" ? resIdx.name_en : resIdx.name_zu}`)}
                                          className="py-1.5 px-3 bg-zinc-900 hover:bg-[#D4AF37] hover:text-black hover:border-transparent text-white border border-zinc-800 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
                                        >
                                          {translateText("btn_download", language)}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* IN-APP QUIZ SIMULATOR */}
                            {activeLesson.quiz && (
                              <div className="p-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-[#D4AF37]/20 rounded-2xl space-y-4">
                                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                  <div>
                                    <h5 className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono flex items-center gap-1.5">
                                      <Award className="w-4 h-4" />
                                      {translateText("quiz_title", language)}
                                    </h5>
                                    <h4 className="text-base text-white font-serif mt-1">
                                      {language === "en" ? activeLesson.quiz.title_en : activeLesson.quiz.title_zu}
                                    </h4>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  {activeLesson.quiz.questions.map((q, qIdx) => (
                                    <div key={q.id} className="space-y-2">
                                      <p className="text-sm text-zinc-200">
                                        {qIdx + 1}. {language === "en" ? q.question_en : q.question_zu}
                                      </p>
                                      
                                      <div className="grid grid-cols-1 gap-2">
                                        {(language === "en" ? q.options_en : q.options_zu).map((opt, oIdx) => {
                                          const isChosen = selectedAnswers[qIdx] === oIdx;
                                          return (
                                            <button
                                              key={oIdx}
                                              onClick={() => {
                                                const copy = [...selectedAnswers];
                                                copy[qIdx] = oIdx;
                                                setSelectedAnswers(copy);
                                              }}
                                              className={`w-full p-3.5 rounded-xl border text-left text-xs tracking-wide transition-all ${isChosen ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white" : "bg-black/40 border-zinc-800 text-zinc-300 hover:border-[#D4AF37]/50"}`}
                                            >
                                              <span className="font-mono text-[#D4AF37] font-black mr-2">Choice {String.fromCharCode(65 + oIdx)}:</span>
                                              {opt}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Answers feedback readout */}
                                {quizSubmitted ? (
                                  <div className="p-4 bg-[#D4AF37]/10 text-white border border-[#D4AF37]/30 rounded-xl space-y-2">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                      <span className="text-sm font-bold uppercase tracking-widest font-mono text-[#D4AF37]">
                                        {translateText("quiz_passed", language)}: 100% SUCCESS RATIO
                                      </span>
                                    </div>
                                    <p className="text-xs text-zinc-400">
                                      Your knowledge coefficient is registered in the ledger. You are certified for this module tier.
                                    </p>
                                  </div>
                                ) : (
                                  <div className="pt-3">
                                    <button
                                      onClick={() => handleSubmitQuiz(selectedCourse.id)}
                                      className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#996515] text-black text-xs font-black uppercase tracking-widest rounded-xl hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition duration-300 cursor-pointer"
                                    >
                                      {translateText("btn_submit", language)}
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>

                        </div>
                      ) : (
                        <div className="h-96 bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col justify-center items-center text-center p-6">
                          <BookOpen className="w-12 h-12 text-[#D4AF37] mb-4 animate-pulse" />
                          <h4 className="text-[#D4AF37] font-serif uppercase tracking-widest">Elite Courses Lecture Room Inactive</h4>
                          <p className="text-xs text-zinc-500 max-w-sm mt-1">
                            {language === "en" ? "Select a learning module in the syllabus checklist sidebar to stream video lecture." : "Khetha isifundo eceleni ukuze uqalise ukufunda kwi-ledjini."}
                          </p>
                        </div>
                      )}

                      {/* LUXURY DIGITAL PATHWAY CERTIFICATE PREVIEW (Unlocks on 100%) */}
                      {currentUser.progress[selectedCourse.id] === 100 && (
                        <div id="issued_certificate_frame" className="relative p-8 md:p-12 bg-gradient-to-br from-black via-zinc-950 to-[#0e0e0e] border-[3px] border-double border-[#D4AF37]/60 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden">
                          
                          {/* Absolute seals */}
                          <div className="absolute top-[8%] right-[8%] w-32 h-32 opacity-25 pointer-events-none flex items-center justify-center">
                            <ImaliLogo size={110} className="animate-spin-slow" />
                          </div>
                          
                          <div className="text-center space-y-4">
                            <span className="text-[10px] text-[#D4AF37] font-mono tracking-[0.4em] uppercase block">
                              {translateText("cert_title", language)}
                            </span>
                            <div className="w-16 h-1 w-24 bg-[#D4AF37] mx-auto opacity-70"></div>
                          </div>

                          <div className="text-center space-y-6 my-8">
                            <p className="text-xs tracking-widest text-[#D4AF37] uppercase font-mono italic">
                              {translateText("cert_greeting", language)}
                            </p>
                            
                            <h3 className="text-3xl md:text-4xl font-serif text-white tracking-widest uppercase italic font-light drop-shadow-md">
                              {currentUser.name}
                            </h3>

                            <div className="max-w-xl mx-auto space-y-2">
                              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                                {translateText("cert_has_completed", language)}
                              </p>
                              <p className="text-base font-bold text-[#D4AF37] uppercase tracking-wide font-serif">
                                {language === "en" ? selectedCourse.title_en : selectedCourse.title_zu}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-6 border-t border-zinc-900 text-left">
                            <div className="space-y-1">
                              <p className="text-[8px] text-zinc-500 font-mono">AUTHORIZED ACCREDITATION SIGNATURE</p>
                              <p className="text-xs font-serif text-[#D4AF37] italic uppercase">Elite Courses Board of Academics</p>
                              <p className="text-[9px] text-[#D4AF37] font-mono">REGISTRY HASH KEY: ELITE-93820-ZC</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] text-zinc-500 font-mono">ISSUED DIGITALLY ON DATE</p>
                              <p className="text-xs text-zinc-300 font-mono">LEDGER TIMESTAMP: 2026-05-26</p>
                            </div>
                          </div>

                          <div className="text-center pt-4">
                            <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
                              {translateText("cert_congrats", language)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Lateral Syllabus Curriculum Modules Checklist */}
                    <div className="space-y-4">
                      <div className="border-b border-zinc-800 pb-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] font-serif">
                          {translateText("course_modules", language)}
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {selectedCourse.modules.map((mIdx, moduleIndex) => (
                          <div key={mIdx.id} className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-3">
                            <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded font-mono uppercase tracking-widest">
                              {language === "en" ? `SECTION 0${moduleIndex + 1}` : `INGXENYE 0${moduleIndex + 1}`}
                            </span>
                            <h5 className="text-xs font-serif font-bold text-white tracking-wider uppercase">
                              {language === "en" ? mIdx.title_en : mIdx.title_zu}
                            </h5>

                            <div className="space-y-2">
                              {mIdx.lessons.map(les => {
                                const isSelected = activeLesson?.id === les.id;
                                return (
                                  <button
                                    key={les.id}
                                    onClick={() => { setActiveLesson(les); setQuizSubmitted(false); }}
                                    className={`w-full text-left p-3 rounded-xl border text-[11px] font-mono uppercase transition-all flex justify-between items-center ${isSelected ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white" : "bg-black/50 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-white"}`}
                                  >
                                    <div className="space-y-0.5 text-left">
                                      <p className="text-xs font-bold line-clamp-1">
                                        {language === "en" ? les.title_en : les.title_zu}
                                      </p>
                                      <p className="text-[9px] text-zinc-500 tracking-wider">⌚ Duration: {les.duration}</p>
                                    </div>
                                    <Play className={`w-3 h-3 flex-shrink-0 ${isSelected ? "text-[#D4AF37]" : "text-zinc-600"}`} />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              )}
            </div>
          )}

                     {/* 3. VIRTUAL CLASSROOM FORUM */}
          {activeTab === "classroom" && (
            <div id="tab_classroom" className="space-y-6 animate-fade-in">
              
              {/* Main Classroom Header / Pitch */}
              <div id="classroom_header_band" className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 rounded-3xl border border-[#D4AF37]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left shadow-lg">
                <div className="space-y-1">
                  <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest block w-fit">
                    🎙️ DROP-IN AUDIO SUITE
                  </span>
                  <h3 className="text-xl font-light tracking-wide text-white uppercase font-serif">
                    IMALI <span className="text-[#D4AF37] italic font-serif">Clubhouse Forum</span>
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                    A zero-database drop-in audio space modeled after Clubhouse. Complete peer-to-peer lessons, choose among 6 custom class durations (30 min - 3 hrs), and download the class audio archive immediately upon session conclusion.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="text-left">
                    <p className="text-[#D4AF37] text-[10px] font-mono">WORKSPACE SECURITY</p>
                    <p className="text-xs text-zinc-200 font-bold">100% Private Session</p>
                  </div>
                </div>
              </div>

              {!isAudioSessionActive ? (
                /* ================= LOBBY ENTRANCE PRE-FLIGHT PAGE ================= */
                <div id="lobby_preflight_page" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: 6 Categories of Audio Sessions (Span 7) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="border-b border-zinc-800 pb-2 text-left">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] font-serif">
                        1. Select Your Academic Forum Class Topic
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        Choose from exactly 6 distinct audio session ranges from 30 minutes to 3 hours max.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {AUDIO_CLASS_TYPES.map((cls, idx) => {
                        const isSelected = selectedAudioClassIndex === idx;
                        return (
                          <button
                            key={cls.id}
                            id={`class_type_${cls.id}`}
                            onClick={() => setSelectedAudioClassIndex(idx)}
                            className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer overflow-hidden relative flex flex-col justify-between h-44 ${
                              isSelected 
                                ? "bg-gradient-to-br from-zinc-900 to-[#1e1a0b] border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.15)] scale-[1.01]" 
                                : "bg-black/40 border-zinc-900 hover:border-zinc-800 hover:bg-black/60"
                            }`}
                          >
                            {/* Accent Glow for selected */}
                            {isSelected && (
                              <div className="absolute top-0 right-0 bg-[#D4AF37] text-black font-mono font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider shadow">
                                SELECTED
                              </div>
                            )}

                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-lg">🎙️</span>
                                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                                  {cls.duration} Session
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-white uppercase font-serif tracking-wide leading-snug">
                                {language === "en" ? cls.name_en : cls.name_zu}
                              </h5>
                              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                                {language === "en" ? cls.desc_en : cls.desc_zu}
                              </p>
                            </div>

                            <p className="text-[9px] font-mono text-zinc-500 uppercase mt-2 tracking-wider">
                              MAX ACTIVE TIME LIMIT: {cls.maxHours} HOURS
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Student Profile Completion & Secure Passcode Entry (Span 5) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Check 1: Student Workspace Details checklist */}
                    <div id="student_profile_details_checker" className="bg-[#0a0a0a] border border-zinc-900 p-5 rounded-3xl text-left space-y-4">
                      <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
                        <span className="text-lg">👤</span>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          2. Fill Up Your Profile Details
                        </h5>
                      </div>
                      
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Each student and speaker before joining must ensure their professional details are non-blank. Modify them on the fly below:
                      </p>

                      <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-zinc-900">
                        <div className="space-y-1">
                          <label className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-wider block">Your Display Name</label>
                          <input 
                            id="classroom_profile_name_input"
                            type="text"
                            value={activeRole === Role.STUDENT ? studentDetails.name : activeRole === Role.INSTRUCTOR ? instructorDetails.name : adminDetails.name}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (activeRole === Role.STUDENT) setStudentDetails({ ...studentDetails, name: v });
                              else if (activeRole === Role.INSTRUCTOR) setInstructorDetails({ ...instructorDetails, name: v });
                              else setAdminDetails({ ...adminDetails, name: v });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] font-sans"
                            placeholder="Type your name..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">Your Biography Focus</label>
                          <textarea 
                            id="classroom_profile_bio_input"
                            value={activeRole === Role.STUDENT ? studentDetails.bio : activeRole === Role.INSTRUCTOR ? instructorDetails.bio : adminDetails.bio}
                            onChange={(e) => {
                              const v = e.target.value;
                              if (activeRole === Role.STUDENT) setStudentDetails({ ...studentDetails, bio: v });
                              else if (activeRole === Role.INSTRUCTOR) setInstructorDetails({ ...instructorDetails, bio: v });
                              else setAdminDetails({ ...adminDetails, bio: v });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-805 p-2 text-xs text-zinc-350 outline-none h-14 focus:border-[#D4AF37] rounded-xl"
                            placeholder="Focus area..."
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="text-zinc-550 font-mono">PROFILE VERIFIED:</span>
                          <span className="text-emerald-400 font-bold uppercase tracking-wider">
                            ✓ READY (SAVED LOCALLY)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Check 2: Dynamic Passcode Area */}
                    <div id="classroom_passcode_gate" className="bg-[#0a0a0a] border border-[#D4AF37]/25 p-5 rounded-3xl text-left space-y-4">
                      <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
                        <span className="text-lg">🔑</span>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          3. Enter Authorization Passcode
                        </h5>
                      </div>

                      {activeRole === Role.STUDENT ? (
                        <div className="space-y-3">
                          <p className="text-[11px] text-zinc-400 leading-relaxed">
                            This live forum requires the active authorization session passcode. Please enter the code offered by your Instructor or Admin:
                          </p>
                          <input 
                            id="student_study_passcode_input"
                            type="text"
                            value={enteredClassCode}
                            onChange={(e) => {
                              setEnteredClassCode(e.target.value.toUpperCase());
                              setClassCodeError("");
                            }}
                            className="w-full bg-zinc-900 border-2 border-[#D4AF37]/30 text-[#D4AF37] font-mono font-bold tracking-widest text-center py-2.5 rounded-xl outline-none focus:border-[#D4AF37] text-sm"
                            placeholder="e.g. FOREX101"
                          />
                          {classCodeError && (
                            <p id="passcode_err" className="text-[10px] text-red-400 font-bold font-mono">❌ {classCodeError}</p>
                          )}
                          
                          <div className="bg-zinc-950 border border-zinc-900 p-2.5 rounded-xl flex items-center justify-between text-[11px] gap-2">
                            <span className="text-zinc-500 font-mono">🔑 Active Issued Code:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#D4AF37] font-mono bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-1.5 py-0.5 rounded text-[10px] font-bold">{instructorDetails.classCode || "FOREX101"}</span>
                              <button 
                                onClick={() => {
                                  setEnteredClassCode(instructorDetails.classCode || "FOREX101");
                                  setClassCodeError("");
                                }}
                                className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition cursor-pointer"
                              >
                                Autofill Code
                              </button>
                            </div>
                          </div>

                          <span className="text-[9px] text-zinc-500 block">
                            💡 Use the code generated/offered by the Instructor. Switch roles above to configure profiles or issue new class codes!
                          </span>
                        </div>
                      ) : (
                        <div className="bg-black/60 p-4 rounded-2xl space-y-2.5">
                          <p className="text-[11px] text-[#D4AF37] font-bold font-mono uppercase">
                            📢 YOU ARE THE HOST ({activeRole.toUpperCase()})
                          </p>
                          <p className="text-[11px] text-zinc-400 leading-normal">
                            You are authorized to issue the following passcode to students to allow them into this class audio room:
                          </p>
                          <div className="bg-[#D4AF37]/15 border border-[#D4AF37]/40 py-2.5 px-4 rounded-xl flex justify-between items-center">
                            <span className="text-xs font-mono text-zinc-500 uppercase font-black">ACTIVE PASSCODE:</span>
                            <span className="text-base font-mono font-black text-[#D4AF37] tracking-widest bg-black px-3 py-1 rounded-lg border border-[#D4AF37]/20">
                              {instructorDetails.classCode || "FOREX101"}
                            </span>
                          </div>
                          <span className="text-[9px] text-zinc-500 block">
                            Students will be blocked from joining the audio stream until they type this exact passcode.
                          </span>
                        </div>
                      )}

                      <button
                        id="join_audio_room_lobby_btn"
                        onClick={() => {
                          const nameVal = activeRole === Role.STUDENT ? studentDetails.name : activeRole === Role.INSTRUCTOR ? instructorDetails.name : adminDetails.name;
                          if (!nameVal.trim()) {
                            alert("Please fill up your display name under core profile first!");
                            return;
                          }

                          if (activeRole === Role.STUDENT) {
                            if (enteredClassCode !== instructorDetails.classCode) {
                              setClassCodeError(`Passcode Mismatch. The active class code offered by instructor ${instructorDetails.name} is needed.`);
                              return;
                            }
                          }

                          // Success enter
                          setIsAudioSessionActive(true);
                          setClassCodeError("");
                          setEnteredClassCode("");
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:brightness-110 text-black text-xs font-black uppercase tracking-widest rounded-2xl shadow-[0_4px_24px_rgba(212,175,55,0.2)] transition-all duration-300"
                      >
                        🎙️ Join Live Audio Session ({AUDIO_CLASS_TYPES[selectedAudioClassIndex].duration})
                      </button>
                    </div>

                  </div>

                </div>
              ) : (
                /* ================= ACTIVE CLUBHOUSE AUDIO ROOM WORKSPACE ================= */
                <div id="active_audio_room_component" className="space-y-6">
                  
                  {/* Active room indicator band */}
                  <div className="bg-[#1e1a0b] border border-[#D4AF37]/30 text-xs text-[#D4AF37] py-3.5 px-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-left font-mono">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                      <span>
                        🔴 BROADCASTING LIVE: <strong className="text-white">{language === "en" ? AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_en : AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_zu}</strong>
                      </span>
                      <span>•</span>
                      <span>DURATION: <strong className="text-white">{AUDIO_CLASS_TYPES[selectedAudioClassIndex].duration}</strong></span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px]">
                      <span>⏱️ ELAPSED SIMULATED: <strong className="text-white font-mono">{Math.floor(audioSessionSeconds / 60)}m {audioSessionSeconds % 60}s</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Speakers Grid on Stage (Span 8) */}
                    <div className="lg:col-span-8 bg-black/90 border border-zinc-900 rounded-3xl p-6 text-left space-y-6">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 pb-2 border-b border-zinc-800">
                          🔊 Academic Stage (Speakers)
                        </h4>
                      </div>

                      {/* Speakers Row in circular layouts */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
                        
                        {/* Speaker 1: Thabo Cele */}
                        <div className="flex flex-col items-center text-center space-y-2.5">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-amber-700 rounded-full shadow-lg relative">
                              <img 
                                src={instructorDetails.avatar} 
                                alt="Instructor" 
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            {/* Speaking wave glow indicator */}
                            <span className="absolute bottom-0 right-0 bg-[#D4AF37] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-black animate-bounce font-mono font-bold">
                              🎤
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white flex items-center justify-center gap-1">
                              {instructorDetails.name} <span className="text-[#D4AF37]">★</span>
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">Host • Instructor</p>
                            <p className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded mt-1.5 font-mono inline-block">
                              Speaking: Explaining mechanics...
                            </p>
                          </div>
                        </div>

                        {/* Speaker 2: Sarah Cele */}
                        <div className="flex flex-col items-center text-center space-y-2.5">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full p-1 bg-zinc-800 rounded-full relative">
                              <img 
                                src={adminDetails.avatar} 
                                alt="Admin" 
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <span className="absolute bottom-0 right-0 bg-zinc-800 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-zinc-900">
                              🔇
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-300">{adminDetails.name}</p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">Dean • Admin</p>
                            <p className="text-[9px] bg-zinc-905 text-zinc-505 px-2 py-0.5 rounded mt-1.5 font-mono inline-block">
                              Muted by host
                            </p>
                          </div>
                        </div>

                        {/* Speaker 3: Student display */}
                        <div className="flex flex-col items-center text-center space-y-2.5">
                          <div className="relative">
                            <div className={`w-20 h-20 rounded-full p-1 rounded-full relative transition-all duration-300 ${
                              classroomMicActive ? "bg-gradient-to-tr from-emerald-500 to-amber-500 scale-105" : "bg-zinc-800"
                            }`}>
                              <img 
                                src={studentDetails.avatar} 
                                alt="Student" 
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <span className="absolute bottom-0 right-0 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-black bg-zinc-900">
                              {classroomMicActive ? "🔊" : "🔇"}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                              {studentDetails.name} {raisedHand && <span className="text-yellow-400" title="Hand Raised">✋</span>}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">{studentDetails.specialty || "Student"}</p>
                            <p className={`text-[9px] px-2 py-0.5 rounded mt-1.5 font-mono inline-block ${
                              classroomMicActive ? "bg-emerald-500/10 text-emerald-400 font-black animate-pulse" : "bg-zinc-900 text-zinc-500"
                            }`}>
                              {classroomMicActive ? "Your Mic is LIVE [Spkr]" : "Your Mic is Muted"}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Listeners Grid */}
                      <div className="pt-6 border-t border-zinc-900">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 pb-3 font-mono">
                          👥 Scholastic Listeners (Audience - 5)
                        </h4>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                          {[
                            { name: "Patricia Naidoo", desc: "Durban Forex trader", av: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100" },
                            { name: "Sipho Khosi", desc: "Johannesburg Commodities", av: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100" },
                            { name: "Lerato Molefe", desc: "Chart Pattern Student", av: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" },
                            { name: "Ken Zulu", desc: "Sustainable Grid Analyst", av: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" },
                            { name: "Sophia Chang", desc: "Arbitrage Scalper", av: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" }
                          ].map((lis, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <img src={lis.av} alt={lis.name} className="w-12 h-12 rounded-full object-cover border border-zinc-800" />
                              <p className="text-[10px] font-bold text-zinc-300 mt-1.5 text-center truncate w-full">{lis.name}</p>
                              <p className="text-[8px] text-zinc-500">{lis.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Bar inside active room */}
                      <div className="bg-[#0e0e0e] border border-zinc-850 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setClassroomMicActive(!classroomMicActive)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-black transition-all ${
                              classroomMicActive 
                                ? "bg-emerald-500 hover:bg-emerald-600 text-black shadow-[0_4px_12px_rgba(16,185,129,0.3)]" 
                                : "bg-red-950/45 text-red-100 border border-red-900/40 hover:bg-red-900/30"
                            }`}
                          >
                            🎙️ Mic {classroomMicActive ? "Unmuted" : "Muted"}
                          </button>
                          
                          <button
                            onClick={() => setRaisedHand(!raisedHand)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                              raisedHand 
                                ? "bg-amber-500/20 text-yellow-550 border border-yellow-500/30 font-bold" 
                                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            ✋ {raisedHand ? "Hand Raised" : "Raise Hand"}
                          </button>
                        </div>

                        <button
                          id="finish_classroom_session_btn"
                          onClick={() => {
                            setIsAudioSessionActive(false);
                            setIsClassThankYouPopupOpen(true);
                          }}
                          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_4px_12px_rgba(220,38,38,0.25)] transition duration-200 cursor-pointer"
                        >
                          🛑 Finish & Close Audio Suite
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Live whiteboard notes pad & capacity stats (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Active session whiteboard pad */}
                      <div id="classroom_audio_whiteboard" className="bg-black/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-md text-left">
                        <span className="text-[10px] tracking-widest text-[#D4AF37] font-mono block uppercase border-b border-zinc-900 pb-2">
                          📝 Live Scribbling Whiteboard
                        </span>
                        
                        <div className="min-h-36 bg-zinc-950 rounded-xl p-4 border border-zinc-900 font-mono text-xs text-[#D5B03C]/90 space-y-2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.01)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                          {whiteboardDrawings.map((drawIdx, i) => (
                            <p key={i} className="relative z-10 pl-2 border-l border-[#D4AF37]/45 select-none text-[11px] leading-relaxed">{drawIdx}</p>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={whiteboardInput} 
                            onChange={e => setWhiteboardInput(e.target.value)}
                            placeholder="Plot formula..."
                            className="flex-1 bg-zinc-900/40 border border-zinc-850 text-xs text-white rounded-xl px-4 outline-none placeholder:text-zinc-650 focus:border-[#D4AF37]"
                          />
                          <button 
                            onClick={() => {
                              if (!whiteboardInput.trim()) return;
                              setWhiteboardDrawings(prev => [...prev, `- ${whiteboardInput}`]);
                              setWhiteboardInput("");
                            }}
                            className="py-2 px-3.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] rounded-xl text-xs font-bold uppercase transition"
                          >
                            Plot
                          </button>
                        </div>
                      </div>

                      {/* Zero data secure log feed */}
                      <div className="bg-[#0a0a0a] border border-zinc-900 p-5 rounded-3xl text-left space-y-3.5">
                        <p className="text-[9px] text-[#D4AF37] font-bold font-mono uppercase tracking-wider block">🛡️ SECURE LOCAL SESSION AUDIT</p>
                        <div className="space-y-2 text-[10px] font-mono text-zinc-500">
                          <p>• Port tunnels monitored: Disabled (Safe)</p>
                          <p>• Decoupled from Firebase and cloud endpoints</p>
                          <p>• High-fidelity local oscillator active</p>
                          <p>• Transcripts are kept volatile in browser tab</p>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-900 text-[10px] text-zinc-400 leading-relaxed font-sans">
                          "Each drop-in audio session has its audio buffers processed securely purely within the browser audio canvas module."
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* Thank You & Audio Download Overlay Dialog Popup */}
              {isClassThankYouPopupOpen && (
                <div id="classroom_finished_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 overflow-y-auto flex items-start sm:items-center justify-center p-3 sm:p-5 py-6 sm:py-10 animate-in fade-in duration-200">
                  <div className="bg-[#0c0c0c] border-2 border-[#D4AF37]/50 max-w-lg w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden text-left space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200 my-auto">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
                    
                    {/* Header */}
                    <div className="border-b border-zinc-800 pb-3 flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] px-3 py-0.5 rounded font-mono font-bold uppercase tracking-widest inline-block">
                          ✨ SIYABONGA KAKHULU / THANK YOU ✨
                        </span>
                        <h4 className="text-xl font-serif text-white font-light tracking-wide uppercase mt-1">
                          Class Session Complete!
                        </h4>
                      </div>
                      <button 
                        onClick={() => setIsClassThankYouPopupOpen(false)}
                        className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white px-2 py-1 rounded-lg text-xs font-bold transition-all"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Thank you message container */}
                    <div className="space-y-3.5 pt-1">
                      <p className="text-sm font-light text-zinc-250 leading-relaxed font-serif">
                        Dear <strong className="text-white font-sans">{activeRole === Role.STUDENT ? studentDetails.name : activeRole === Role.INSTRUCTOR ? instructorDetails.name : adminDetails.name}</strong>,
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        We genuinely appreciate your attendance and active session participation in the <strong className="text-[#D4AF37]">{AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_en}</strong> audio broadcast! Your determination to build financial independence under the IMALI Academy framework is inspiring.
                      </p>

                      <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-2xl space-y-1 text-[11px] text-emerald-400 leading-relaxed">
                        <p className="font-bold flex items-center gap-1.5 uppercase font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          🔒 Verified 100% Zero-Data Security
                        </p>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Absolutely no personal voice clips, attendee names, metadata logs, or communication packages have been stored on any remote cloud database. All session configurations have evaporated cleanly.
                        </p>
                      </div>
                    </div>

                    {/* Download buttons panel */}
                    <div className="space-y-3 pt-2">
                      <p className="text-[10px] text-zinc-500 font-mono uppercase font-black">Available Offline Downloads (Pure Client-Side Generating):</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          id="save_simulated_audio_click"
                          onClick={() => handleDownloadAudioSim(selectedAudioClassIndex)}
                          className="py-3 px-4 bg-[#D4AF37] text-black hover:bg-amber-400 text-xs font-black uppercase tracking-widest rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          📥 Download Class Audio File (MP3)
                        </button>
                        <button
                          id="save_simulated_text_click"
                          onClick={() => {
                            const blob = new Blob([`IMALI ACADEMY STUDY LEDGER\nTheme: ${AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_en}\nDuration: ${AUDIO_CLASS_TYPES[selectedAudioClassIndex].duration}\nStudent Name: ${studentDetails.name}\nInstructor: ${instructorDetails.name}\nStatus: Volatile class completed successfully.\nDate: 2026-05-26\nRegistry Hashing: SAFE-ZERO-DB`], { type: "text/plain" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `IMALI_ACADEMY_${AUDIO_CLASS_TYPES[selectedAudioClassIndex].id.toUpperCase()}_HANDOUT.txt`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                          className="py-3 px-4 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-mono uppercase font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2"
                        >
                          📝 Download Study Handout (TXT)
                        </button>
                      </div>
                    </div>

                    {/* Footer close */}
                    <div className="pt-3 border-t border-zinc-900 text-center">
                      <button
                        onClick={() => setIsClassThankYouPopupOpen(false)}
                        className="text-[10px] text-zinc-500 hover:text-zinc-350 font-mono uppercase tracking-widest"
                      >
                        ← Return back to Classroom Lobby
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* 4. SCHOLASTIC CHAT & SESSIONS TRADING LOUNGES */}
          {activeTab === "chat" && (
            <div id="tab_chat" className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* 1. Left Sidebar Navigation: Session Rooms */}
                <div className="lg:col-span-1 flex flex-col gap-3.5">
                  <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider text-left pl-1">
                    Select Trading Lounge Room:
                  </span>

                  {[
                    {
                      id: "asian",
                      name: "Tokyo Session Lounge",
                      hours: "00:00 - 09:00 UTC",
                      pairs: "JPY & AUD focused",
                      color: "border-[#D4AF37]/45 text-[#D4AF37]"
                    },
                    {
                      id: "china",
                      name: "China Session Lounge",
                      hours: "01:00 - 10:00 UTC",
                      pairs: "CNH & HSI focused",
                      color: "border-rose-500/40 text-rose-450"
                    },
                    {
                      id: "germany",
                      name: "Germany Session Lounge",
                      hours: "07:00 - 16:00 UTC",
                      pairs: "DAX & EUR focused",
                      color: "border-purple-500/40 text-purple-450"
                    },
                    {
                      id: "london",
                      name: "London Session Lounge",
                      hours: "08:00 - 17:00 UTC",
                      pairs: "GBP & EUR focused",
                      color: "border-sky-500/40 text-sky-450"
                    },
                    {
                      id: "southafrica",
                      name: "South Africa Session Lounge",
                      hours: "07:00 - 16:00 UTC",
                      pairs: "ZAR & J200 focused",
                      color: "border-emerald-500/40 text-emerald-450"
                    },
                    {
                      id: "newyork",
                      name: "New York Session Lounge",
                      hours: "13:00 - 22:00 UTC",
                      pairs: "XAU & USD focused",
                      color: "border-rose-500/40 text-rose-450"
                    }
                  ].map(room => {
                    const isSelected = activeChatRoom === room.id;
                    const isPassedGate = (activeRole !== Role.STUDENT) || unlockedChats[room.id];
                    const localHours = systimeUtc.getUTCHours();
                    let activeLive = false;
                    
                    if (room.id === "asian") activeLive = (localHours >= 0 && localHours < 9);
                    else if (room.id === "china") activeLive = (localHours >= 1 && localHours < 10);
                    else if (room.id === "germany") activeLive = (localHours >= 7 && localHours < 16);
                    else if (room.id === "london") activeLive = (localHours >= 8 && localHours < 17);
                    else if (room.id === "southafrica") activeLive = (localHours >= 7 && localHours < 16);
                    else activeLive = (localHours >= 13 && localHours < 22);

                    const simActive = simulatedTimeRemaining[room.id] !== null ? true : activeLive;

                    return (
                      <button
                        key={room.id}
                        onClick={() => setActiveChatRoom(room.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all ${isSelected ? "bg-zinc-950 border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.08)] text-white" : "bg-black/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white"}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">{room.hours}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold ${simActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-900 text-zinc-500"}`}>
                            {simActive ? "● ONLINE" : "○ CLOSED"}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold truncate uppercase">{room.name}</h5>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">Pairs: {room.pairs}</p>
                        
                        <div className="mt-3.5 pt-2 border-t border-zinc-900 flex justify-between items-center text-[9px]">
                          <span className="text-zinc-500 font-mono">ACCESS LIMITS:</span>
                          <span className={`font-mono font-bold flex items-center gap-1 ${isPassedGate ? "text-emerald-400" : "text-amber-500 animate-pulse"}`}>
                            {isPassedGate ? "🔓 UNLOCKED" : "🔒 KEY REQUIRED"}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  <div className="bg-[#0b0b0b] border border-zinc-900 p-4 rounded-2xl text-[10px] text-zinc-500 leading-normal text-left mt-2 space-y-2">
                    <p className="font-bold text-zinc-400 uppercase font-mono">📢 PURGE MANDATE RULES:</p>
                    <p>Chats automatically close and clear logs at session end to ensure 100% offline security. Make sure to download transcripts before close!</p>
                  </div>
                </div>

                {/* 2. Middle Column: Chat / Gate Panel */}
                <div className="lg:col-span-2">
                  {(() => {
                    const isPassedGate = (activeRole !== Role.STUDENT) || unlockedChats[activeChatRoom];
                    const activeName = activeRole === Role.STUDENT ? studentDetails.name : activeRole === Role.INSTRUCTOR ? instructorDetails.name : adminDetails.name;
                    const hasProfileFilled = activeName.trim() !== "";
                    
                    // IF student has not filled name OR has locked chats, enforce the SECURE AUTHORIZATION GATE
                    if (!isPassedGate || !hasProfileFilled) {
                      return (
                        <div className="bg-[#0a0a0a] border-2 border-[#D4AF37] rounded-3xl p-6 text-left space-y-6 min-h-[520px] shadow-[0_12px_36px_rgba(0,0,0,0.8)] flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="border-b border-zinc-850 pb-3 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/35 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest inline-block animate-pulse">
                                  🔐 SECURE ACCESS GATE
                                </span>
                                <h4 className="text-base font-serif font-light text-white uppercase mt-1 tracking-wide animate-in fade-in">
                                  {activeChatRoom.toUpperCase()} SECURITY VALIDATION
                                </h4>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                🔒
                              </div>
                            </div>

                            <p className="text-xs text-zinc-400 leading-relaxed">
                              You are attempting to connect to the <strong className="text-white uppercase">{activeChatRoom} core discussion channel</strong>. Before joining audio rooms or chat lounges under study guidelines, students must fill their profile details and input the custom pass-code provided by the admin or instructor.
                            </p>

                            <div className="space-y-4 pt-2">
                              {/* Requirement 1: Complete profile name */}
                              <div className="space-y-1">
                                <label className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider block font-bold">
                                  1. Student Display Name (Real Ledger Identity):
                                </label>
                                <input
                                  type="text"
                                  value={studentDetails.name}
                                  onChange={e => {
                                    const next = { ...studentDetails, name: e.target.value };
                                    setStudentDetails(next);
                                    localStorage.setItem("imali_student_profile", JSON.stringify(next));
                                  }}
                                  placeholder="Type your real student profile name..."
                                  className="w-full bg-zinc-950 border border-zinc-900 p-3 text-xs text-white rounded-xl outline-none focus:border-[#D4AF37]"
                                />
                                <span className="text-[9px] text-zinc-500 block leading-none">
                                  This binds your name into volatile messages. Local browser cache only.
                                </span>
                              </div>

                              {/* Requirement 2: Security class Code */}
                              <div className="space-y-1">
                                <label className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider block font-bold">
                                  2. Instructor Authorization Passcode:
                                </label>
                                <input
                                  type="text"
                                  value={enteredChatPasscode[activeChatRoom] || ""}
                                  onChange={e => setEnteredChatPasscode({
                                    ...enteredChatPasscode,
                                    [activeChatRoom]: e.target.value
                                  })}
                                  placeholder="Type special passcode (e.g. FOREX101)..."
                                  className="w-full bg-zinc-950 border border-zinc-900 p-3 text-xs text-white rounded-xl outline-none focus:border-[#D4AF37]"
                                />
                                {chatPasscodeError[activeChatRoom] && (
                                  <p className="text-[10px] text-red-500 font-mono mt-0.5 animate-bounce">
                                    ✕ {chatPasscodeError[activeChatRoom]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-zinc-900">
                            <button
                              onClick={() => {
                                if (!studentDetails.name.trim()) {
                                  setChatPasscodeError({
                                    ...chatPasscodeError,
                                    [activeChatRoom]: "Profile Name required. Perfect display identity must be filled."
                                  });
                                  return;
                                }

                                const codeTyped = enteredChatPasscode[activeChatRoom] || "";
                                if (codeTyped.trim().toUpperCase() !== instructorDetails.classCode.toUpperCase()) {
                                  setChatPasscodeError({
                                    ...chatPasscodeError,
                                    [activeChatRoom]: `Passcode Mismatch. Contact Instructor (${instructorDetails.name}) for the active passcode.`
                                  });
                                  return;
                                }

                                // Open Gate
                                setUnlockedChats({
                                  ...unlockedChats,
                                  [activeChatRoom]: true
                                });
                                setChatPasscodeError({
                                  ...chatPasscodeError,
                                  [activeChatRoom]: ""
                                });
                              }}
                              className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#b08e27] text-black font-black uppercase text-xs tracking-widest rounded-xl transition hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                            >
                              🔓 Authorize & Unlock Volatile Chat
                            </button>
                            <span className="text-[8px] text-center text-zinc-650 block mt-2 font-mono uppercase">
                              Zero external DB storage. Security certified under luxury sandboxing rules.
                            </span>
                          </div>
                        </div>
                      );
                    }

                    // ELSE, Render active chat room
                    const roomMessages = chatSessions[activeChatRoom] || [];

                    return (
                      <div className="bg-black/60 border border-zinc-800 rounded-3xl flex flex-col h-[520px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
                        
                        {/* Chat room header area */}
                        <div className="p-4 bg-zinc-950 border-b border-zinc-850 flex justify-between items-center text-left">
                          <div>
                            <span className="text-[8px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/35 px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider inline-block">
                              SECURED LOUNGE : {activeChatRoom.toUpperCase()} ACTIVE
                            </span>
                            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider mt-0.5">
                              {activeChatRoom.toUpperCase()} SESSION REAL CHAT
                            </h4>
                          </div>

                          {/* Quick Export Transcripts Button */}
                          <button
                            onClick={() => {
                              const transcriptText = roomMessages.map(m => `[${m.timestamp}] ${m.senderName} (${m.senderRole}): ${m.content}`).join("\n");
                              const blob = new Blob([
                                [
                                  `===================================================\n`,
                                  `IMALI NGESIZULU STUDY LEDGER CHAT HISTORY\n`,
                                  `===================================================\n`,
                                  `Zone Session: ${activeChatRoom.toUpperCase()}\n`,
                                  `User Member: ${currentUser.name}\n`,
                                  `Data Hash: Client-Local Vaulted Cache\n\n`,
                                  `CHAT HISTORY TRANSCRIPT:\n`,
                                  `---------------------------------------------------\n`,
                                  transcriptText || "No chat history logged inside this active cache yet.\n",
                                  `---------------------------------------------------\n\n`,
                                  `Confidential Study files validated successfully.\n`
                                ].join("")
                              ], { type: "text/plain;charset=utf-8" });
                              
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `IMALI_STUDY_NOTES_${activeChatRoom.toUpperCase()}.txt`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              URL.revokeObjectURL(url);
                            }}
                            className="bg-zinc-900 hover:bg-zinc-850 text-xs text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-805 font-mono flex items-center gap-1.5 transition cursor-pointer"
                          >
                            📥 Export txt
                          </button>
                        </div>

                        {/* Message body view content area */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-zinc-950/20 text-left">
                          {roomMessages.map(m => {
                            const isCurrentUser = m.senderName === currentUser.name;
                            return (
                              <div key={m.id} className={`flex flex-col max-w-[80%] ${isCurrentUser ? "ml-auto items-end" : "mr-auto items-start"}`}>
                                <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase mb-1">
                                  <span className="font-bold text-[#D4AF37]">{m.senderName}</span>
                                  <span>({m.senderRole})</span>
                                  <span>•</span>
                                  <span>{m.timestamp}</span>
                                </div>
                                
                                <div className={`p-4 rounded-xl text-xs leading-relaxed ${isCurrentUser ? "bg-gradient-to-r from-[#AA771C]/90 to-[#996515]/90 text-black font-bold shadow-[0_2px_10px_rgba(212,175,55,0.1)]" : "bg-zinc-900 text-zinc-100 border border-zinc-850"}`}>
                                  {m.content}
                                </div>
                              </div>
                            );
                          })}

                          {isAiThinking && (
                            <div className="mr-auto items-start max-w-[80%] flex flex-col space-y-1 animate-in fade-in">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase">
                                Typings...
                              </span>
                              <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-xl animate-pulse text-zinc-550 text-xs tracking-wider">
                                Classmate is active and typing a response formula...
                              </div>
                            </div>
                          )}
                          <div ref={chatEndRef} />
                        </div>

                        {/* Send panel controls */}
                        <div className="p-4 bg-zinc-950 border-t border-zinc-85">
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={inputMessage}
                              onChange={e => setInputMessage(e.target.value)}
                              onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                              placeholder={`Type secure message in ${activeChatRoom.toUpperCase()} chatroom lounges...`}
                              className="flex-1 bg-zinc-900 border border-zinc-850 text-xs text-white rounded-xl px-4 outline-none placeholder:text-zinc-600 focus:border-[#D4AF37] h-12"
                            />
                            <button 
                              onClick={handleSendMessage}
                              className="px-5 bg-gradient-to-r from-[#D4AF37] to-[#b08e27] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              SEND
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })()}
                </div>

                {/* 3. Right Sidebar Panel: Session Live Spread Rates */}
                <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 p-5 rounded-3xl space-y-4 text-left">
                  <h4 className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-widest border-b border-zinc-850 pb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#D4AF37]" />
                    {activeChatRoom.toUpperCase()} PAIRS METRICS
                  </h4>
                  
                  <p className="text-[10px] text-zinc-400 leading-relaxed">
                    Live raw spread rates synchronizing locally from institutional liquidity feeds for {activeChatRoom.toUpperCase()} trading hours:
                  </p>

                  <div className="space-y-3.5 pt-1.5">
                    {activeChatRoom === "asian" && [
                      { pair: "AUD/JPY", ask: "105.412", bid: "105.408", spread: "0.4 pips", color: "text-emerald-400 bg-emerald-500/10" },
                      { pair: "USD/JPY", ask: "156.240", bid: "156.237", spread: "0.3 pips", color: "text-emerald-400 bg-emerald-500/10" },
                      { pair: "NZD/USD", ask: "0.61204", bid: "0.61198", spread: "0.6 pips", color: "text-emerald-400 bg-emerald-500/10" }
                    ].map(item => (
                      <div key={item.pair} className="bg-black/50 border border-zinc-900 rounded-xl p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{item.pair}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${item.color}`}>{item.spread}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 pt-1">
                          <span>BID: {item.bid}</span>
                          <span>ASK: {item.ask}</span>
                        </div>
                      </div>
                    ))}

                    {activeChatRoom === "china" && [
                      { pair: "USD/CNH", ask: "7.2450", bid: "7.2442", spread: "0.8 pips", color: "text-rose-400 bg-rose-500/10" },
                      { pair: "HKD/USD", ask: "0.12812", bid: "0.12810", spread: "0.2 pips", color: "text-rose-400 bg-rose-500/10" },
                      { pair: "AUD/CNH", ask: "4.8512", bid: "4.8502", spread: "1.0 pips", color: "text-rose-400 bg-rose-500/10" }
                    ].map(item => (
                      <div key={item.pair} className="bg-black/50 border border-zinc-900 rounded-xl p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{item.pair}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${item.color}`}>{item.spread}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 pt-1">
                          <span>BID: {item.bid}</span>
                          <span>ASK: {item.ask}</span>
                        </div>
                      </div>
                    ))}

                    {activeChatRoom === "germany" && [
                      { pair: "DAX40", ask: "18650.5", bid: "18649.5", spread: "1.0 pts", color: "text-purple-400 bg-purple-500/10" },
                      { pair: "EUR/GBP", ask: "0.85121", bid: "0.85116", spread: "0.5 pips", color: "text-purple-400 bg-purple-500/10" },
                      { pair: "EUR/CHF", ask: "0.98124", bid: "0.98118", spread: "0.6 pips", color: "text-purple-400 bg-purple-500/10" }
                    ].map(item => (
                      <div key={item.pair} className="bg-black/50 border border-zinc-900 rounded-xl p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{item.pair}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${item.color}`}>{item.spread}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 pt-1">
                          <span>BID: {item.bid}</span>
                          <span>ASK: {item.ask}</span>
                        </div>
                      </div>
                    ))}

                    {activeChatRoom === "london" && [
                      { pair: "GBP/USD", ask: "1.27415", bid: "1.27413", spread: "0.2 pips", color: "text-sky-400 bg-sky-500/10" },
                      { pair: "EUR/USD", ask: "1.08502", bid: "1.08500", spread: "0.2 pips", color: "text-sky-400 bg-sky-500/10" },
                      { pair: "EUR/GBP", ask: "0.85121", bid: "0.85116", spread: "0.5 pips", color: "text-sky-400 bg-sky-500/10" }
                    ].map(item => (
                      <div key={item.pair} className="bg-black/50 border border-zinc-900 rounded-xl p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{item.pair}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${item.color}`}>{item.spread}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 pt-1">
                          <span>BID: {item.bid}</span>
                          <span>ASK: {item.ask}</span>
                        </div>
                      </div>
                    ))}

                    {activeChatRoom === "southafrica" && [
                      { pair: "USD/ZAR", ask: "18.4150", bid: "18.4020", spread: "13.0 pips", color: "text-emerald-400 bg-emerald-500/10" },
                      { pair: "EUR/ZAR", ask: "20.0120", bid: "19.9980", spread: "14.0 pips", color: "text-emerald-400 bg-emerald-500/10" },
                      { pair: "GBP/ZAR", ask: "23.5180", bid: "23.5010", spread: "17.0 pips", color: "text-emerald-400 bg-emerald-500/10" }
                    ].map(item => (
                      <div key={item.pair} className="bg-black/50 border border-zinc-900 rounded-xl p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{item.pair}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${item.color}`}>{item.spread}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 pt-1">
                          <span>BID: {item.bid}</span>
                          <span>ASK: {item.ask}</span>
                        </div>
                      </div>
                    ))}

                    {activeChatRoom === "newyork" && [
                      { pair: "XAU/USD", ask: "2354.12", bid: "2354.02", spread: "10.0 pips", color: "text-amber-450 bg-amber-500/10" },
                      { pair: "SPX500", ask: "5304.50", bid: "5304.25", spread: "0.25 pts", color: "text-amber-455 bg-amber-500/10" },
                      { pair: "USDCAD", ask: "1.36502", bid: "1.36498", spread: "0.4 pips", color: "text-amber-450 bg-amber-500/10" }
                    ].map(item => (
                      <div key={item.pair} className="bg-black/50 border border-zinc-900 rounded-xl p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{item.pair}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${item.color}`}>{item.spread}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 pt-1">
                          <span>BID: {item.bid}</span>
                          <span>ASK: {item.ask}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cryptographic safety badge */}
                  <div className="pt-3 border-t border-zinc-900 text-center">
                    <span className="text-[8px] text-emerald-400 font-mono tracking-widest uppercase font-bold block">
                      🔒 CRYPTO SANDBOX SECURE
                    </span>
                    <p className="text-[8px] text-zinc-650 leading-relaxed font-mono uppercase mt-0.5">
                      Session key validation ensures zero-persistence. Logs cleared locally.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 5. DUAL-LANGUAGE GLOBAL FINANCIAL RADIO & FOCUS STUDY MUSIC STAGES */}
          {activeTab === "blueprints" && (
            <div id="tab_blueprints" className="space-y-6">
              
              <div className="bg-gradient-to-br from-zinc-950 to-black p-6 rounded-3xl border border-[#D4AF37]/35 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/35 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest inline-block animate-pulse">
                      📻 Real-Time Audio Core
                    </span>
                    <h3 className="text-2xl font-serif text-white uppercase tracking-wider flex items-center gap-2">
                      {translateText("blueprints_title", language)}
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                      {translateText("blueprints_desc", language)}
                    </p>
                  </div>

                  {/* Category Filtration Badges */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", labelEn: "All Channels", labelZu: "Iziteshi Zonke" },
                      { id: "news", labelEn: "News & Analytics", labelZu: "Izindaba" },
                      { id: "music", labelEn: "Focus & Rhythm", labelZu: "Umculo Opholile" }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setRadioActiveCategory(cat.id as any)}
                        className={`px-4 py-1.5 rounded-xl border font-mono text-xs uppercase transition-all tracking-wider ${
                          radioActiveCategory === cat.id
                            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.1)]"
                            : "bg-black/40 border-zinc-805 text-zinc-400 hover:text-white hover:border-zinc-700"
                        }`}
                      >
                        {language === "en" ? cat.labelEn : cat.labelZu}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stations Main Grid Feed */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {RADIO_STATIONS.filter(st => {
                        if (radioActiveCategory === "all") return true;
                        return st.category === radioActiveCategory;
                      }).map(station => {
                        const isThisPlaying = currentStation?.id === station.id && isPlaying;
                        return (
                          <div
                            key={station.id}
                            onClick={() => playStation(station)}
                            className={`group relative overflow-hidden bg-zinc-950 hover:bg-zinc-900 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                              isThisPlaying 
                                ? "border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.08)] bg-zinc-900/60" 
                                : "border-zinc-900 hover:border-zinc-800"
                            }`}
                          >
                            {/* Accent Background Glow */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${station.accent} opacity-[0.02] group-hover:opacity-[0.04] rounded-full blur-2xl transition-all duration-300`} />
                            
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-zinc-400 capitalize">
                                {station.subCategory}
                              </span>
                              
                              <div className="flex items-center gap-1.5">
                                {isThisPlaying && (
                                  <div className="flex gap-1 h-3.5 items-end justify-center">
                                    <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-2.5"></span>
                                    <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-3.5 delay-100"></span>
                                    <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-1.5 delay-200"></span>
                                  </div>
                                )}
                                <span className={`w-2 h-2 rounded-full ${isThisPlaying ? "bg-[#D4AF37] animate-pulse" : "bg-neutral-800"}`} />
                              </div>
                            </div>

                            <h4 className="text-sm font- serif font-semibold text-white group-hover:text-[#D4AF37] transition-colors mb-1">
                              {station.name}
                            </h4>
                            
                            <p className="text-xs text-zinc-400 line-clamp-2 md:h-10 leading-relaxed">
                              {language === "en" ? station.description : station.descriptionZu}
                            </p>

                            <div className="mt-4 flex justify-between items-center pt-3 border-t border-zinc-900/40">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                                📡 {station.category === "news" ? "NEWS FEED" : "LOUNGE FM"}
                              </span>
                              
                              <button
                                className={`px-3 py-1 bg-black rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 font-bold ${
                                  isThisPlaying 
                                    ? "text-[#D4AF37] border border-[#D4AF37]/45 shadow-[0_0_8px_rgba(212,175,55,0.1)]" 
                                    : "text-zinc-450 border border-zinc-850 group-hover:border-[#D4AF37]/50 group-hover:text-white"
                                }`}
                              >
                                {isThisPlaying ? (
                                  <>
                                    <Pause className="w-3 h-3 text-[#D4AF37]" />
                                    <span>Playing</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3 h-3 text-zinc-400 group-hover:text-[#D4AF37]" />
                                    <span>STREAM LIVE</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Left Side Static/Equalizer Control Desk Panel */}
                  <div className="space-y-4">
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-900 space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full" />
                      
                      <div className="border-b border-zinc-900 pb-3 flex justify-between items-center">
                        <span className="text-[10px] text-zinc-350 font-mono tracking-widest uppercase">
                          STUDIO CONSOLE
                        </span>
                        <span className="text-[8px] tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/35 px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                          96.4 MHZ Stereo
                        </span>
                      </div>

                      {currentStation ? (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] py-0.5 px-2 rounded font-bold uppercase w-fit block">
                              Now Streaming
                            </span>
                            <h4 className="text-md font-serif text-white font-bold leading-normal">
                              {currentStation.name}
                            </h4>
                            <p className="text-[11px] text-zinc-400 leading-relaxed">
                              {language === "en" ? currentStation.description : currentStation.descriptionZu}
                            </p>
                          </div>

                          {/* Sound waves Equalizer elements */}
                          <div className="bg-black/90 rounded-2xl p-4 border border-zinc-900 flex flex-col items-center justify-center space-y-3">
                            <div className="flex items-end gap-1.5 h-10 w-full justify-center max-w-xs">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1 rounded-t transition-all duration-300 ${isPlaying ? "bg-[#D4AF37] animate-pulse" : "bg-zinc-800"}`}
                                  style={{
                                    height: isPlaying 
                                      ? `${Math.floor(Math.random() * 26) + 10}px` 
                                      : "4px",
                                    animationDuration: isPlaying ? `${0.5 + Math.random() * 0.8}s` : "0s"
                                  }}
                                />
                              ))}
                            </div>
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                              {isPlaying ? "DECODING DIGITAL BITSTREAM (128KBPS)" : "AUDIO PIPELINE STANDBY"}
                            </span>
                          </div>

                          {/* Volume Deck */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] text-zinc-450 font-mono">
                              <span className="flex items-center gap-1.5">
                                <Volume2 className="w-3.5 h-3.5 text-zinc-400" /> VOLUME
                              </span>
                              <span>{radioMuted ? "MUTED" : `${Math.round(radioVolume * 100)}%`}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setRadioMuted(!radioMuted)}
                                className={`p-2 bg-black rounded-xl border transition-all ${
                                  radioMuted 
                                    ? "border-red-500/30 text-red-500" 
                                    : "border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white"
                                }`}
                              >
                                {radioMuted ? (
                                  <VolumeX className="w-4 h-4" />
                                ) : (
                                  <Volume2 className="w-4 h-4" />
                                )}
                              </button>

                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={radioVolume}
                                onChange={(e) => {
                                  setRadioVolume(parseFloat(e.target.value));
                                  if (radioMuted) setRadioMuted(false);
                                }}
                                className="w-full accent-[#D4AF37] h-1.5 bg-zinc-800 rounded-lg cursor-pointer appearance-none"
                              />
                            </div>
                          </div>

                          {/* Center playback actions */}
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                              onClick={() => {
                                if (audioRef.current) {
                                  if (isPlaying) {
                                    audioRef.current.pause();
                                  } else {
                                    audioRef.current.play();
                                  }
                                }
                              }}
                              className="py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-black text-white hover:text-[#D4AF37] font-mono text-xs uppercase font-bold transition-all text-center flex items-center justify-center gap-2"
                            >
                              {isPlaying ? (
                                <>
                                  <Pause className="w-4 h-4 text-[#D4AF37]" /> Pause Live
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 text-[#D4AF37]" /> Play Live
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => setIsRadioModalOpen(true)}
                              className="py-2.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-xs uppercase font-bold transition-all text-center"
                            >
                              💥 POP OUT HUD
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-2.5">
                          <Radio className="w-10 h-10 text-zinc-700 animate-pulse" />
                          <div>
                            <p className="text-xs text-zinc-305 font-mono">NO ACTIVE STATION SELECTED</p>
                            <p className="text-[10px] text-zinc-500 max-w-xs mt-1">
                              Select a channel from the global broadcast feed on your left to establish real-time audio telemetry.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fun Interactive Audio Broadcast details widget */}
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-900 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] font-bold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        GLOBAL NETWORK STATS
                      </div>
                      
                      <div className="space-y-2 font-mono text-[10px] text-zinc-400">
                        <div className="flex justify-between justify-items-center">
                          <span className="text-zinc-550">GATEWAY SYNC:</span>
                          <span className="text-white">ONLINE</span>
                        </div>
                        <div className="flex justify-between justify-items-center">
                          <span className="text-zinc-550">METADATA CODEC:</span>
                          <span className="text-[#D4AF37]">MPEG-Audio (32000Hz)</span>
                        </div>
                        <div className="flex justify-between justify-items-center">
                          <span className="text-zinc-550">ESTIMATED BUFFERING:</span>
                          <span className="text-emerald-400">0.05 Seconds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Affiliate Platform Banner */}
              <div id="radio_affiliate_banner" className="flex flex-col items-center justify-center pt-4">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  STATION SPONSOR
                </span>
                <a 
                  href="https://clicks.pipaffiliates.com/c?m=150420&amp;c=662032" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  className="block transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img 
                    src="https://ads.pipaffiliates.com/i/150420?c=662032" 
                    width="120" 
                    height="600" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    alt="Partner Sponsor" 
                    className="border border-zinc-850 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]" 
                  />
                </a>
              </div>

            </div>
          )}

          {/* 6. ADMIN SYNDICATE TERMINAL VIEW (LOCKED TO Role.ADMIN or Role.INSTRUCTOR) */}
          {activeTab === "admin" && (
            <div id="tab_admin" className="space-y-6">
              
              {/* Dynamic Tabs inside admin view */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2-Span Admin Forms & AI report generator */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* AI Strategic Operations Intelligence diagnostic generation */}
                  <div className="bg-gradient-to-br from-[#0c0c0c] to-black border-2 border-[#D4AF37]/50 rounded-3xl p-6 space-y-4 shadow-[0_10px_30px_rgba(212,175,55,0.1)] relative overflow-hidden">
                    
                    <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>

                    <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                      <div>
                        <h4 className="text-base font-serif font-bold text-white uppercase tracking-widest">
                          {translateText("admin_ai_insights", language)}
                        </h4>
                        <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider">
                          Powered by Server-Side Gemini 3.5 Intelligence
                        </p>
                      </div>
                      <Sparkles className="text-[#D4AF37] w-6 h-6 animate-spin-slow" />
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Analyze active registry assets directly. This generates a comprehensive strategic operations audit report evaluating pathway engagement index, registered scholars index, and remedial board proposals.
                    </p>

                    <button 
                      onClick={fetchAiGlobalReport}
                      disabled={isInsightsLoading}
                      className="py-3 px-6 bg-gradient-to-r from-[#D4AF37] to-[#996515] text-black text-xs font-black uppercase tracking-widest rounded-xl hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-40"
                    >
                      {isInsightsLoading ? "Gemini Synthesizing Corporate Audit..." : translateText("admin_generate_report_btn", language)}
                    </button>

                    {/* Report output renderer */}
                    {aiInsightsReport && (
                      <div className="p-6 bg-zinc-950/95 rounded-2xl border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed space-y-4 max-h-[350px] overflow-y-auto whitespace-pre-wrap select-text">
                        <span className="text-[8px] tracking-widest text-[#D4AF37] block uppercase border-b border-white/5 pb-2">
                           {translateText("admin_ai_insights_title", language)}:
                        </span>
                        {aiInsightsReport}
                      </div>
                    )}

                  </div>

                  {/* Course programmatic creator form */}
                  <div className="bg-black/90 p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-widest border-b border-zinc-950 pb-2">
                      {translateText("btn_add_course", language)} (Program Registry)
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase">Title (English)</label>
                        <input 
                          type="text" 
                          value={newCourseTitleEn}
                          onChange={e => setNewCourseTitleEn(e.target.value)}
                          placeholder="e.g. Masterclass in Quantum Capital"
                          className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase">Title (Zulu)</label>
                        <input 
                          type="text" 
                          value={newCourseTitleZu}
                          onChange={e => setNewCourseTitleZu(e.target.value)}
                          placeholder="e.g. Ubuhlakani Bemali obusezingeni"
                          className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono">DESCRIPTION (ENGLISH)</label>
                        <textarea 
                          value={newCourseDescEn}
                          onChange={e => setNewCourseDescEn(e.target.value)}
                          placeholder="Brief details..."
                          className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono">DESCRIPTION (ZULU)</label>
                        <textarea 
                          value={newCourseDescZu}
                          onChange={e => setNewCourseDescZu(e.target.value)}
                          placeholder="Imininingwane efushane..."
                          className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleAddNewCourse}
                      className="w-full py-2.5 bg-[#D4AF37] hover:brightness-110 text-black text-[10px] font-mono tracking-widest uppercase rounded-xl transition cursor-pointer font-extrabold"
                    >
                      {translateText("btn_add_course", language)}
                    </button>
                  </div>

                  {/* DIRECT ADMINISTRATIVE PASSCODE GENERATION & CLASS SYNC MODULE */}
                  <div className="bg-[#0b0b0b] border border-zinc-900 p-5 rounded-2xl text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-widest">
                          🔑 Academic Lounge & Code Dispatch Panel
                        </h4>
                        <p className="text-[10px] text-zinc-500 uppercase font-mono">Real-Time Core Lock System</p>
                      </div>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
                        ✓ ACTIVE SYNC
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-normal font-sans">
                      The chief administrator handles student registration keys. Modify details, generate authorization codes, and input your executive email below to synchronize credentials. Students will gain immediate admission to academic drop-in study rooms upon using the matched passcode.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase block">Admin Verification Email</label>
                        <input 
                          type="email" 
                          value={adminDetails.email || ""}
                          onChange={e => setAdminDetails({ ...adminDetails, email: e.target.value })}
                          placeholder="e.g. Travelwildshow@gmail.com"
                          className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase block">Active Lounge Passcode</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={instructorDetails.classCode || "FOREX101"}
                            onChange={e => setInstructorDetails({ ...instructorDetails, classCode: e.target.value.toUpperCase() })}
                            className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white uppercase font-mono tracking-widest outline-none focus:border-[#D4AF37]"
                          />
                          <button
                            onClick={() => {
                              const randomCodes = ["GOLD777", "BTC360", "FOREX101", "SCALP05", "ZULU99", "IMALI888"];
                              const randomSel = randomCodes[Math.floor(Math.random() * randomCodes.length)];
                              setInstructorDetails({ ...instructorDetails, classCode: randomSel });
                            }}
                            className="px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-[10px] uppercase font-bold rounded-xl transition cursor-pointer shrink-0"
                            title="Generate a random secure passcode"
                          >
                            🎲 Random
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Educational References Activation Toggle */}
                    <div className="border-t border-zinc-900 pt-4 pb-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="pr-4">
                          <p className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                            🛡️ Educational Inspiration References
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed font-sans">
                            {language === 'en' 
                              ? 'Intentionally activate third-party educational reference inspiration (BabyPips, Investopedia, IG Academy, YouTube guides) on student portals.'
                              : 'Vula ukuboniswa kwamalinki okufunda (BabyPips, Investopedia, IG Academy, YouTube guides) kubafundi.'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newval = !showReferences;
                            setShowReferences(newval);
                            localStorage.setItem("imali_show_references", newval ? "true" : "false");
                          }}
                          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none cursor-pointer ${showReferences ? 'bg-[#D4AF37]' : 'bg-zinc-800'}`}
                          role="switch"
                          aria-checked={showReferences}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showReferences ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (!adminDetails.email || !adminDetails.email.includes("@")) {
                          alert("Please specify a valid Admin verification email address before issuing keys.");
                          return;
                        }
                        localStorage.setItem("imali_admin_profile", JSON.stringify(adminDetails));
                        localStorage.setItem("imali_instructor_profile", JSON.stringify(instructorDetails));
                        alert(`Passcode System Synced! Show Reference: ${showReferences ? "ENABLED" : "DISABLED"}. Synced via Admin email [${adminDetails.email}].`);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-zinc-950 to-black hover:bg-zinc-900 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] text-[10.5px] font-mono tracking-widest uppercase rounded-xl transition cursor-pointer font-bold"
                    >
                      📣 Sync & Issue Code to System Directory
                    </button>
                  </div>

                </div>

                {/* Users Management Registry List */}
                <div className="space-y-4">
                  <div className="border-b border-zinc-800 pb-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] font-serif">
                      {translateText("admin_users_tab", language)}
                    </h4>
                  </div>

                  {/* Commission User form */}
                  <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-900 space-y-3">
                    <p className="text-[9px] text-[#D4AF37] font-mono font-black uppercase tracking-wider block">
                       COMMISSION NEW USER ACCREDITATION
                    </p>
                    
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={newUserNm}
                        onChange={e => setNewUserNm(e.target.value)}
                        placeholder="Exemplary Scholar Name"
                        className="w-full bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                      <input 
                        type="email" 
                        value={newUserEmail}
                        onChange={e => setNewUserEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setNewUserRole(Role.STUDENT)}
                          className={`flex-1 py-1 px-2.5 rounded text-[9px] font-bold border ${newUserRole === Role.STUDENT ? "bg-[#D4AF37] text-black border-transparent" : "border-zinc-800 text-zinc-400"}`}
                        >
                          STUDENT
                        </button>
                        <button 
                          onClick={() => setNewUserRole(Role.INSTRUCTOR)}
                          className={`flex-1 py-1 px-2.5 rounded text-[9px] font-bold border ${newUserRole === Role.INSTRUCTOR ? "bg-[#D4AF37] text-black border-transparent" : "border-zinc-800 text-zinc-400"}`}
                        >
                          INSTR
                        </button>
                      </div>

                      <button 
                        onClick={handleAddNewUser}
                        className="w-full py-2 bg-gradient-to-r from-zinc-900 to-black hover:bg-zinc-800 border border-[#D4AF37]/45 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase rounded-xl transition cursor-pointer"
                      >
                        {translateText("btn_add_user", language)}
                      </button>
                    </div>
                  </div>

                  {/* Registered Scholars List */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-zinc-500 font-mono block uppercase">LEDGER ACCOUNTS:</span>
                    {usersRegistry.map(usr => (
                      <div key={usr.id} className="flex justify-between items-center bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 hover:border-zinc-800 transition">
                        <div className="flex items-center gap-2.5">
                          <img src={usr.avatar} className="w-8 h-8 rounded-full border border-zinc-800" />
                          <div className="text-left">
                            <p className="text-xs font-bold text-white">{usr.name}</p>
                            <p className="text-[8px] font-mono text-[#D4AF37] uppercase">{usr.role}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            if (usr.id === currentUser.id) return;
                            setUsersRegistry(prev => prev.filter(u => u.id !== usr.id));
                          }}
                          className="p-1.5 hover:bg-red-950 rounded text-red-500 hover:text-red-400"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* Footer Branding section */}
      <footer className="z-20 bg-black/85 border-t border-white/5 py-6 px-8 flex justify-center items-center text-center select-none">
        <div className="text-[10px] text-zinc-500 font-serif italic uppercase tracking-wider">
          © 2026 Elite Courses Premium Executive Academy • Perfect Dual Zulu & English Transliteration Active
        </div>
      </footer>

      {/* Chat Session Closing Alert Popup */}
      {showExpiryWarning && (
        <div id="session_expiry_popup" className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto flex items-start sm:items-center justify-center p-3 sm:p-5 py-6 sm:py-10 animate-in fade-in duration-200">
          <div className="bg-[#0c0c0c] border-2 border-[#D4AF37] max-w-lg w-full rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden text-left space-y-6 shadow-[0_20px_50px_rgba(212,175,55,0.15)] animate-in zoom-in-95 duration-200 my-auto">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl text-left"></div>
            
            {/* Header */}
            <div className="border-b border-zinc-850 pb-3 flex justify-between items-start">
               <div className="space-y-1">
                <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-0.5 rounded font-mono font-bold uppercase tracking-widest inline-block animate-pulse">
                  ⚠️ CRITICAL SESSIONS CLOSING NOTICE ⚠️
                </span>
                <h4 className="text-lg font-serif text-white font-light tracking-wide uppercase mt-1">
                  {showExpiryWarning.toUpperCase()} TRADING SESSION CHAT ENDING SOON!
                </h4>
              </div>
              <button 
                onClick={() => setShowExpiryWarning(null)}
                className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white px-2 py-1 rounded-lg text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 pt-1">
              <p className="text-xs font-light text-zinc-200 leading-relaxed font-serif">
                Dear <strong className="text-[#D4AF37] font-sans">{currentUser.name}</strong>,
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                The volatile chat room for the <span className="text-amber-400 font-bold uppercase">{showExpiryWarning} session</span> is about to finish! There is <span className="text-white font-mono font-bold bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">under 5 minutes remaining</span>. 
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                To maintain absolute bank confidentiality and respect zero-database design guidelines, all transient discussion history, carry-trade setups, and pip formulas shared within this channel are scheduled for a <strong className="text-red-400">COMPLETE CRYPTOGRAPHIC PURGE</strong> in exactly {simulatedTimeRemaining[showExpiryWarning] !== null ? `${Math.floor(simulatedTimeRemaining[showExpiryWarning]! / 60)}m ${simulatedTimeRemaining[showExpiryWarning]! % 60}s` : "4 minutes 59 seconds"}.
              </p>

              <div className="bg-[#111111] border border-zinc-850 p-4 rounded-xl text-[11px] text-zinc-300 leading-relaxed">
                <p className="font-bold text-[#D4AF37] uppercase font-mono mb-1">💡 Required Student Action Plan:</p>
                To avoid losing valuable training notes, pair correlations, or advice shared by Dr. Thabo Cele, please download your chat transcripts transcript immediately using the button below. Once the session ticker ends, all messages will be wiped from this browser instance.
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  const mList = chatSessions[showExpiryWarning] || [];
                  const transcriptText = mList.map(m => `[${m.timestamp}] ${m.senderName} (${m.senderRole}): ${m.content}`).join("\n");
                  const blob = new Blob([
                    [
                      `===================================================\n`,
                      `IMALI NGESIZULU EXECUTIVE TRADING ACADEMY STUDY LEDGER\n`,
                      `SESSION CHAT TRANSCRIPT PURGE FILE\n`,
                      `===================================================\n`,
                      `Active Trading Zone: ${showExpiryWarning.toUpperCase()} CHAT ROOM\n`,
                      `Timestamp Generated: ${new Date().toUTCString()}\n`,
                      `Student Account: ${currentUser.name} (${currentUser.role})\n\n`,
                      `TRANSCRIPT DETAILS:\n`,
                      `---------------------------------------------------\n`,
                      transcriptText || "No session dialogue was active in this cache.\n",
                      `---------------------------------------------------\n\n`,
                      `STATUS: CRYPTOGRAPHIC SAFE SHIELD VERIFIED. DATA ERADICATED IN-BROWSER.\n`
                    ].join("")
                  ], { type: "text/plain;charset=utf-8" });
                  
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `IMALI_TRANSCRIPT_${showExpiryWarning.toUpperCase()}_ROOM.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="py-3 px-4 bg-[#D4AF37] text-black hover:bg-[#b08e27] text-xs font-black uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                📥 Download Chat (TXT)
              </button>
              <button
                onClick={() => setShowExpiryWarning(null)}
                className="py-3 px-4 bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white text-xs font-mono uppercase font-bold rounded-xl transition text-center hover:bg-zinc-800"
              >
                Dismiss Warning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING AUDIO RADIO PILL HUD (PERSISTENT SO STREAM CONTINUES IN BACKGROUND) */}
      {currentStation && (
        <div 
          id="radio_floating_hud" 
          className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 z-40 bg-zinc-950/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] max-w-xs sm:max-w-sm border-l-4 border-l-[#D4AF37] animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-2 max-w-[55%]">
            {/* Pulsing Visual Wave Disk Icon */}
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentStation.accent} flex items-center justify-center relative overflow-hidden shrink-0`}>
              <div className="absolute inset-0 bg-black/40" />
              <Radio className={`w-4 h-4 text-white z-10 ${(isPlaying || radioLoading) ? "animate-pulse" : ""}`} />
              
              {/* Spinning records effect */}
              <div className={`absolute inset-0.5 border border-white/10 rounded-full ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
            </div>

            <div className="text-left w-full min-w-0">
              <p className="text-[7px] sm:text-[8px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold truncate">
                {radioLoading ? (
                  <span className="text-amber-400 animate-pulse">🔄 Connecting...</span>
                ) : radioError ? (
                  <span className="text-red-400">⚠️ Offline</span>
                ) : isPlaying ? (
                  <span className="text-emerald-400 animate-pulse">📡 Streaming</span>
                ) : (
                  <span className="text-zinc-500">⏸️ Standby</span>
                )}
              </p>
              <h5 className="text-[11px] sm:text-xs font-semibold text-white truncate">{currentStation.name}</h5>
              <p className="text-[9px] text-zinc-500 capitalize truncate hidden sm:block">{currentStation.subCategory}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Play/Pause */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  if (isPlaying) {
                     audioRef.current.pause();
                     setIsPlaying(false);
                  } else {
                     audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
                  }
                }
              }}
              className="p-1.5 bg-zinc-900 hover:bg-zinc-850 rounded-lg border border-zinc-800 hover:border-zinc-700 text-white transition-all cursor-pointer"
              title={isPlaying ? "Pause Stream" : "Resume Stream"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/10" />
              )}
            </button>

            {/* Open full control console */}
            <button
              onClick={() => setIsRadioModalOpen(true)}
              className="p-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] transition-all text-[9.5px] font-mono font-bold uppercase cursor-pointer"
              title="Expand Radio Control Deck"
            >
              🎛️ HUD
            </button>

            {/* Shutdown Stream completely (Highly Visible Option) */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                setCurrentStation(null);
                setIsPlaying(false);
                setRadioLoading(false);
                setRadioError(false);
              }}
              className="p-1.5 px-2 bg-red-950/30 hover:bg-red-900/80 border border-red-500/30 hover:border-red-500 rounded-lg text-red-400 hover:text-white text-[9.5px] font-mono transition-all font-bold cursor-pointer"
              title="Stop Broadcast Feed"
            >
              ✕ Stop
            </button>
          </div>
        </div>
      )}

      {/* CENTERED PREMIUM RADIO DETAIL MODAL POPUP */}
      {isRadioModalOpen && (
        <div id="radio_detailed_popup" className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 overflow-y-auto flex items-start sm:items-center justify-center p-3 sm:p-6 py-6 sm:py-10">
          <div className="bg-[#0b0b0b] border-2 border-[#D4AF37] max-w-2xl w-full rounded-2xl sm:rounded-3xl p-5 md:p-8 relative overflow-hidden text-left space-y-6 shadow-[0_25px_60px_rgba(212,175,55,0.18)] animate-in fade-in zoom-in-95 duration-200 z-10 my-auto">
            {/* Decorative radial lighting gradient */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/5 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl z-0" />

            {/* Upper Header Deck */}
            <div className="border-b border-zinc-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 relative">
              <div className="space-y-1">
                <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest inline-block animate-pulse">
                  📻 PREMIUM BROADCAST SYSTEMS ACTIVE
                </span>
                <h4 className="text-xl sm:text-2xl font-serif text-white tracking-wide uppercase">
                  Global Financial Radio Console
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {language === "en" 
                    ? "Interactive live streaming terminal. Seamlessly toggle macro financial reports or study rhythms."
                    : "I-terminal yokusakaza bukhoma. Shintsha kalula phakathi kwemibiko yezezimali nomculo ophozayo."
                  }
                </p>
              </div>
              <button 
                onClick={() => setIsRadioModalOpen(false)}
                className="bg-zinc-900 hover:bg-[#D4AF37] hover:text-black border border-zinc-800 hover:border-[#D4AF37] text-zinc-350 p-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex items-center justify-center whitespace-nowrap gap-1.5 self-end sm:self-center"
                title="Minimize Panel to floating HUD"
              >
                🗕 Minimize to HUD
              </button>
            </div>

            {/* Main Interactive Deck */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 z-10 relative">
              
              {/* Left Column: List select fast-switch */}
              <div className="md:col-span-2 space-y-3">
                <span className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-widest block font-bold">
                  FAST CHANNEL TUNER
                </span>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {RADIO_STATIONS.map(st => {
                    const isSelfPlaying = currentStation?.id === st.id && isPlaying;
                    const isSelfSelected = currentStation?.id === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => playStation(st)}
                        className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between gap-2.5 ${
                          isSelfSelected 
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.05)]" 
                            : "bg-black/50 border-zinc-905 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-white/5"
                        }`}
                      >
                        <div className="truncate text-left">
                          <p className="text-[10px] uppercase font-bold text-white truncate">{st.name}</p>
                          <p className="text-[8px] text-zinc-400 truncate">{st.subCategory}</p>
                        </div>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isSelfPlaying ? "bg-[#D4AF37] animate-pulse" : "bg-neutral-800"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Audio details and active equalizer console */}
              <div className="md:col-span-3 bg-black/60 p-5 rounded-2xl border border-zinc-900 space-y-4">
                
                {currentStation ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded uppercase font-bold">
                        {currentStation.category === "news" ? "NEWS OUTLET" : "STUDY LOUNGE"}
                      </span>
                      <h5 className="text-md font-serif text-white uppercase font-bold">{currentStation.name}</h5>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                        {language === "en" ? currentStation.description : currentStation.descriptionZu}
                      </p>
                    </div>

                    {/* Styled Audio Equalizer Waves */}
                    <div className="bg-zinc-950/90 rounded-2xl p-4 border border-zinc-900 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                      <div className="absolute top-1 left-2 text-[7px] font-mono text-zinc-600">FREQ SPECTRUM WAVE</div>
                      
                      <div className="flex items-end gap-1.5 h-12 w-full justify-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((bar, idx) => (
                          <div
                            key={idx}
                            className={`w-1 rounded-t transition-all duration-300 ${(isPlaying || radioLoading) ? "bg-gradient-to-t from-[#D4AF37] to-amber-400 animate-pulse" : "bg-zinc-805"}`}
                            style={{
                              height: (isPlaying || radioLoading)
                                ? `${Math.floor(Math.random() * 32) + 8}px` 
                                : "3px",
                              animationDuration: isPlaying ? `${0.4 + Math.random() * 0.9}s` : "0s"
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[8px] font-mono text-zinc-550 uppercase tracking-widest leading-none">
                        {radioLoading ? (
                          <span className="text-amber-400 animate-pulse">🛰️ TUNING TO DIGITAL BITSTREAM...</span>
                        ) : radioError ? (
                          <span className="text-red-500">⚠️ INTEGRATION TIME-OUT (STREAM OFFLINE OR RESTRICTED)</span>
                        ) : isPlaying ? (
                          <span className="text-emerald-400 animate-pulse">📻 CONNECTION STABLE - STREAMING LIVE</span>
                        ) : (
                          <span className="text-zinc-500">🔒 PIPELINE ENGAGED - STANDBY MODE</span>
                        )}
                      </span>
                    </div>

                    {/* Audio Deck Controls Block */}
                    <div className="space-y-3 pt-1">
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-zinc-400" /> SYSTEM VOLUME LEVEL
                        </span>
                        <span>{radioMuted ? "MUTED" : `${Math.round(radioVolume * 100)}%`}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setRadioMuted(!radioMuted)}
                          className={`p-2 bg-zinc-950 rounded-xl border transition-all shrink-0 ${
                            radioMuted 
                              ? "border-red-500/40 text-red-400" 
                              : "border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {radioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={radioVolume}
                          onChange={(e) => {
                            setRadioVolume(parseFloat(e.target.value));
                            if (radioMuted) setRadioMuted(false);
                          }}
                          className="w-full accent-[#D4AF37] h-1.5 bg-zinc-800 rounded-lg cursor-pointer appearance-none"
                        />
                      </div>
                    </div>

                    {/* Master Play/Pause and Quick Tuner status */}
                    <div className="flex gap-2.5 pt-1.5 justify-center">
                      <button
                        onClick={() => {
                          if (audioRef.current) {
                            if (isPlaying) {
                              audioRef.current.pause();
                              setIsPlaying(false);
                            } else {
                              audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
                            }
                          }
                        }}
                        className="flex-1 py-3 px-5 bg-[#D4AF37] hover:bg-[#b5942b] text-black font-mono text-xs uppercase font-black tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4" /> Stop Broadcast Feed
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" /> Initialize Live Feed
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-3.5">
                    <Radio className="w-12 h-12 text-zinc-700 animate-pulse" />
                    <div>
                      <p className="text-xs text-[#D4AF37] font-mono uppercase tracking-wider">No Active Station Tuning</p>
                      <p className="text-[10px] text-zinc-500 max-w-xs mt-1 leading-relaxed">
                        Select an enterprise financial news feed or executive study background rhythm on the tuner list to connect.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Footer diagnostics telemetry line */}
            <div className="border-t border-zinc-900 pt-4 flex flex-col sm:flex-row justify-between text-[10px] font-mono text-zinc-500 gap-2 z-10 relative">
              <div className="flex gap-4">
                <span>BITSTREAM LOGIC: ACTIVE</span>
                <span>•</span>
                <span>LATENCY: 0.12s</span>
                <span>•</span>
                <span>TIMEZONE: {userTimezone.toUpperCase()}</span>
              </div>
              <span>REGISTRY HASH VERIFIED: LUXE-FM</span>
            </div>
          </div>
        </div>
      )}

      {activePdfResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" id="pdf_reader_modal">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            {/* Header */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/40 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-[#D4AF37]">Premium Trading Manual</span>
                  <h3 className="text-sm font-bold text-white uppercase font-sans line-clamp-1">
                    {language === "en" ? activePdfResource.name_en : activePdfResource.name_zu}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActivePdfResource(null)}
                className="p-1 px-3 bg-zinc-900 hover:bg-[#D4AF37] border border-zinc-800 hover:border-transparent text-zinc-400 hover:text-black rounded-xl text-xs font-mono tracking-widest uppercase transition-all cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-left selection:bg-[#D4AF37]/30">
              <div className="bg-zinc-905/30 border border-zinc-900 p-5 rounded-2xl">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">🎓 Elite Courses Financial Qualification System</p>
                <div className="w-12 h-1 bg-[#D4AF37] rounded-full mb-4"></div>
                <div className="text-sm font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
                  {language === "en" ? activePdfResource.pdfContent_en : activePdfResource.pdfContent_zu}
                </div>
              </div>
              
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <p className="text-[10px] text-yellow-500 uppercase tracking-widest font-mono font-bold">⚠️ RISK NOTICE:</p>
                <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                  Financial markets involve real capital risks of up to 100% loss. This handbook is structured with strict educational standards to ensure capital security. Never trade with money you cannot afford to lose.
                </p>
              </div>
            </div>

            {/* Footer Control Panel */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-900/20 flex gap-3 justify-end items-center">
              <button
                onClick={() => alert(`Simulating native offline download of: ${language === "en" ? activePdfResource.name_en : activePdfResource.name_zu}. System status: SECURE.`)}
                className="py-1.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
              >
                💾 Save Offline (.pdf)
              </button>
              <button
                onClick={() => setActivePdfResource(null)}
                className="py-1.5 px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer"
              >
                Understand & Return
              </button>
            </div>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div id="contact_us_portal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fade-in shadow-2xl">
          <div className="bg-[#0b0b0b] border-2 border-[#D4AF37] max-w-lg w-full rounded-2xl md:rounded-3xl p-5 md:p-8 relative overflow-hidden text-left space-y-6 shadow-[0_25px_60px_rgba(212,175,55,0.18)] animate-in fade-in zoom-in-95 duration-200 z-10 my-auto">
            
            {/* Header branding decorative bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-600"></div>

            {/* Title & Close */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
                  {language === "zu" ? "ISIKHUNGO SOSIZO NOLWAZI" : "ACADEMIC SUPPORT HUB"}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-white uppercase mt-1 tracking-tight">
                  {language === "zu" ? "Xhumana Nathi" : "Contact Us"}
                </h3>
              </div>
              <button
                onClick={resetContactForm}
                className="p-1 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-mono tracking-widest uppercase transition-all cursor-pointer border border-zinc-800"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
              {language === "zu" 
                ? "Thumela umlayezo ngqo kubaphathi be-IMALI Ngesizulu noma ujoyine isiteshi sethu se-Telegram sendlela elula yokuxhumana." 
                : "Submit an official inquiry to the IMALI Ngesizulu academic syndicate board or connect instantly via Telegram for secure, direct resolution."}
            </p>

            {/* Main telegram highlight */}
            <div className="p-4 bg-blue-950/20 border border-blue-500/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-400 font-mono uppercase tracking-wider">⚡ Instant Channel Desk:</p>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {language === "zu" ? "Xhumana bukhoma ku-Telegram ukuze uthole impendulo esheshayo." : "Chat live with our academic registrars on Telegram for prompt feedback."}
                </p>
              </div>
              <a
                href="https://t.me/Imalingesizulu"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="py-1.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center cursor-pointer"
              >
                📱 Telegram Chat
              </a>
            </div>

            {/* Error messaging inside form */}
            {contactFormError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 rounded-xl text-xs font-mono">
                ⚠️ {contactFormError}
              </div>
            )}

            {contactSuccess ? (
              /* Success Stage */
              <div className="space-y-5 py-4 text-center animate-fade-in">
                <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-white uppercase text-sm tracking-wider font-mono">
                    {language === "zu" ? "UMLAYEZO UTHUNYELWE!" : "COMMUNICATION SUCCESSFUL"}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    {language === "zu" 
                      ? "Siyabonga. Umlayezo wakho ufakwe ohlelweni lobulungu lwemiyalezo oluzofika ku info@imalingesizulu.com kanye ne khetho@imalingesizulu.com." 
                      : "Your secure dispatch was registered successfully. It will be delivered to info@imalingesizulu.com and khetho@imalingesizulu.com."}
                  </p>
                </div>

                <div className="border-t border-zinc-900 pt-4 space-y-3">
                  <p className="text-[10px] text-zinc-500 font-mono uppercase">Alternative Native Client Dispatch Option:</p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:info@imalingesizulu.com,khetho@imalingesizulu.com?subject=IMALI%20Ngesizulu%20Inquiry%20-%20${encodeURIComponent(contactName)}%20${encodeURIComponent(contactSurname)}&body=${encodeURIComponent(`Name: ${contactName} ${contactSurname}\nTel: ${contactTel}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`)}`}
                      className="flex-1 py-1.5 px-4 bg-[#D4AF37] hover:bg-[#b5942b] text-black font-mono text-[10px] uppercase font-bold tracking-widest rounded-xl text-center transition-all cursor-pointer"
                    >
                      ✉️ Open in Mail App
                    </a>
                    <button
                      onClick={resetContactForm}
                      className="flex-1 py-1.5 px-4 bg-[#0b0b0b] hover:bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase font-bold tracking-widest rounded-xl border border-zinc-800 transition-all cursor-pointer"
                    >
                      Return
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Form Input Block */
              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-left">
                {/* Name / Surname Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                      {language === "zu" ? "Igama *" : "First Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Thomas"
                      className="w-full bg-[#111] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-zinc-600 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                      {language === "zu" ? "Isibongo" : "Surname"}
                    </label>
                    <input
                      type="text"
                      value={contactSurname}
                      onChange={(e) => setContactSurname(e.target.value)}
                      placeholder="e.g. Mthembu"
                      className="w-full bg-[#111] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-zinc-600 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email / Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                      {language === "zu" ? "I-imeyili *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. thomas@email.com"
                      className="w-full bg-[#111] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-zinc-600 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                      {language === "zu" ? "Ucingo / Whatsapp" : "Contact Phone"}
                    </label>
                    <input
                      type="tel"
                      value={contactTel}
                      onChange={(e) => setContactTel(e.target.value)}
                      placeholder="e.g. +27 82 123 4567"
                      className="w-full bg-[#111] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-zinc-600 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    {language === "zu" ? "Umlayezo *" : "Your Message / Query *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={language === "zu" ? "Bhala umbuzo wakho lapha..." : "Explain your query or assistance request in full detail here..."}
                    className="w-full bg-[#111] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-zinc-650 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={contactSending}
                    className="flex-1 py-3 px-5 bg-[#D4AF37] hover:bg-amber-400 disabled:bg-[#D4AF37]/50 text-black font-mono text-xs uppercase font-extrabold tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {contactSending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        {language === "zu" ? "Ithumela..." : "Transmitting..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        {language === "zu" ? "Thumela" : "Submit Request"}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetContactForm}
                    className="py-3 px-5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-mono text-xs uppercase font-bold tracking-wider rounded-xl border border-zinc-800 transition-all cursor-pointer"
                  >
                    {language === "zu" ? "Khansela" : "Cancel"}
                  </button>
                </div>
                
                <p className="text-[9.5px] font-mono text-zinc-600 text-center uppercase tracking-tight">
                  🔒 SECURED COMMS LINK • IMALI NGESIZULU
                </p>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
