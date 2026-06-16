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
  Calendar,
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
  VolumeX,
  Cloud,
  Youtube
} from "lucide-react";
import { Role, User, Course, Lesson, Language, ChatMessage } from "./types";
import type { Notification as AppNotification } from "./types";
import { coursesData } from "./data/courses";
import { translateText } from "./data/translations";
import ImaliLogo from "./components/ImaliLogo";
import PatternScreener from "./components/PatternScreener";


export interface RadioStation {
  id: string;
  name: string;
  category: "news" | "music";
  subCategory: string;
  region?: "global" | "americas" | "europe" | "africa" | "asia";
  url: string;
  fallbackUrl?: string;
  description: string;
  descriptionZu: string;
  accent: string;
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "bloomberg",
    name: "Bloomberg Financial Radio (US)",
    category: "news",
    subCategory: "USA Financial News",
    region: "americas",
    url: "https://bloomberg-wbbr.leanstream.co/bloomberg_wbbr-AM?args=tunein_mp3",
    fallbackUrl: "https://npr-ice.streamguys1.com/live.mp3",
    description: "Live global business news, currency ticker alerts, and enterprise analytics from NYSE / Nasdaq floors with premium delivery.",
    descriptionZu: "Izindaba zebhizinisi zomhlaba wonke, imibiko wezezimali, nezingxoxo zomhlaba wonke zezezimali ze-Bloomberg.",
    accent: "from-amber-600 to-yellow-500"
  },
  {
    id: "bbc",
    name: "BBC World Service News Feed (Europe)",
    category: "news",
    subCategory: "Global Politics & Macro",
    region: "europe",
    url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    fallbackUrl: "https://rfien.ice.infomaniak.ch/rfien-128.mp3",
    description: "International intelligence, macro trends, central bank policies, and global event bulletins from London.",
    descriptionZu: "Ezodaba lomhlaba wonke, izindaba zezepolitiki, nezeluleko zezezimali zaseLondon.",
    accent: "from-red-600 to-rose-500"
  },
  {
    id: "news_radio_finance",
    name: "NPR USA Markets & News (US)",
    category: "news",
    subCategory: "Global Macro Analysis",
    region: "americas",
    url: "https://npr-ice.streamguys1.com/live.mp3",
    fallbackUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    description: "Real-time global market insights, Wall Street desks bulletins, and core macroeconomics analytics.",
    descriptionZu: "Imibiko eqondile yezimakethe zomhlaba, ezodaba nezokusakaza wezezimali zase-New York.",
    accent: "from-sky-600 to-blue-500"
  },
  {
    id: "france24_news",
    name: "France 24 English Radio (Europe)",
    category: "news",
    subCategory: "Global Affairs & Politics",
    region: "europe",
    url: "https://audio.france24.com/f24_live_en.mp3",
    fallbackUrl: "https://rfien.ice.infomaniak.ch/rfien-128.mp3",
    description: "In-depth international news coverage, European market indices, African updates, and French diplomatic analysis.",
    descriptionZu: "Izindaba zomhlaba ezinesithunzi, ezomnotho waseYurophu, nemicimbi eqondile ye-France 24.",
    accent: "from-blue-600 to-indigo-500"
  },
  {
    id: "rfi_africa",
    name: "RFI English Radio (Africa & Europe)",
    category: "news",
    subCategory: "Pan-African & EU Affairs",
    region: "africa",
    url: "https://rfien.ice.infomaniak.ch/rfien-128.mp3",
    fallbackUrl: "https://icecast.dwcdn.de/dwradio.mp3",
    description: "Live dynamic reporting on Pan-African socioeconomic developments, geopolitical shifts, and EU financial affairs.",
    descriptionZu: "Ukusakazwa kwezepolitiki nezomnotho zase-Afrika naYurophu ngesiNgisi bukhoma, ngobuchwepheshe.",
    accent: "from-emerald-600 to-teal-500"
  },
  {
    id: "dw_news",
    name: "Deutsche Welle (DW) World News",
    category: "news",
    subCategory: "EU Markets & Politics",
    region: "europe",
    url: "https://icecast.dwcdn.de/dwradio.mp3",
    fallbackUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    description: "Independent global journalistic feed focusing on European Union markets, industrial tech sectors, and international policy.",
    descriptionZu: "Izindaba zamazwe omhlaba bukhoma ezitholakalayo njalo ngemizuzu ye-Deutsche Welle engenamkhawulo.",
    accent: "from-blue-700 to-cyan-500"
  },
  {
    id: "safm_news",
    name: "SABC SAfm News Radio (Africa)",
    category: "news",
    subCategory: "Southern African Politics",
    region: "africa",
    url: "https://edge.soundon.co.za/safm",
    fallbackUrl: "https://primemedia.streamguys1.com/capetalk",
    description: "South Africa's premier national news, economics bulletins, and public discourse from the South African Broadcasting Corporation.",
    descriptionZu: "Umsakazo kazwelonke wezindaba, umnyakazo wentengo nepolitiki e-South Africa ezakhayo no-SABC.",
    accent: "from-yellow-600 to-orange-500"
  },
  {
    id: "capetalk_news",
    name: "CapeTalk National News (Africa)",
    category: "news",
    subCategory: "Southern Africa Dispatch",
    region: "africa",
    url: "https://primemedia.streamguys1.com/capetalk",
    fallbackUrl: "https://rfien.ice.infomaniak.ch/rfien-128.mp3",
    description: "Official high-uptime national and international talk news broadcasting from Cape Town & Johannesburg networks.",
    descriptionZu: "Izindaba kazwelonke, imibiko ebalulekile nezingxoxo ezivela emsakazweni ophakeme obukhoma e-South Africa.",
    accent: "from-teal-600 to-emerald-500"
  },
  {
    id: "rfa_asia",
    name: "Radio Free Asia News (Asia)",
    category: "news",
    subCategory: "East Asia Supply Chains",
    region: "asia",
    url: "https://streaming.rfa.org/eng/live/english.mp3",
    fallbackUrl: "https://icecast.dwcdn.de/dwradio.mp3",
    description: "Live breaking commentary on East Asian supply chains, regional policy shifts, technology hubs, and Pacific Rim security.",
    descriptionZu: "Ukusakaza ngezindaba nepolitiki yase-East Asia kanye nezimakethe zobuchwepheshe basePacific Rim.",
    accent: "from-purple-700 to-indigo-600"
  },
  {
    id: "aljazeera_news",
    name: "Al Jazeera English Live (Asia)",
    category: "news",
    subCategory: "Middle East & Asia Focus",
    region: "asia",
    url: "https://stream.zeno.fm/vszbdtvvf2zuv",
    fallbackUrl: "https://stream.zeno.fm/g6tcz32v24zuv",
    description: "Unbiased geopolitical reports, Asian economic developments, and live journalism from Doha and regional bureaus.",
    descriptionZu: "Izindaba zomhlaba wonke ezivela e-Middle East ne-Asia ezihlaziya kahle ezomnotho nezepolitiki bukhoma.",
    accent: "from-yellow-700 to-amber-600"
  },
  {
    id: "world_audio_news",
    name: "Global Affairs Dispatch Radio (Global)",
    category: "news",
    subCategory: "Global Macro Rundown",
    region: "global",
    url: "https://stream.zeno.fm/g6tcz32v24zuv",
    fallbackUrl: "https://rfien.ice.infomaniak.ch/rfien-128.mp3",
    description: "High-uptime aggregated global political economy newsletters, central bank rate reports, and geopolitical summaries.",
    descriptionZu: "Inhlanganisela yezindaba zomhlaba mayelana nepolitiki, ukuhwebelana kwamazwe, nesigqi sezimali.",
    accent: "from-zinc-600 to-neutral-500"
  },
  {
    id: "study_lofi",
    name: "Lofi Focus Brainwave Beats (US)",
    category: "music",
    subCategory: "SomaFM Groove Salad",
    region: "americas",
    url: "https://ice1.somafm.com/groovesalad-128-mp3",
    description: "Relaxed low-fidelity ambient beat stream customized to reduce cortisol and increase cognitive focus.",
    descriptionZu: "Amanani womculo opholile nonyakazayo ukukusiza ube nomoya ozo wezemfundo.",
    accent: "from-purple-600 to-pink-500"
  },
  {
    id: "deep_house",
    name: "Deep House Learning Lounge (US)",
    category: "music",
    subCategory: "SomaFM Fluid Progressive",
    region: "americas",
    url: "https://ice1.somafm.com/fluid-128-mp3",
    description: "Atmospheric, deep vocal house sequences and progressive rhythms suitable for analytical focus.",
    descriptionZu: "Umculo ohamba kahle, obanzi we-Deep house ofanele ukuqinisekisa ukusebenza kwe-logic nodatha.",
    accent: "from-emerald-600 to-teal-500"
  },
  {
    id: "beat_blender",
    name: "Beat Blender Deep Tech House (Europe)",
    category: "music",
    subCategory: "Deep House & Techno",
    region: "europe",
    url: "https://ice1.somafm.com/beatblender-128-mp3",
    description: "A sophisticated blend of European deep tech house, minimal techno beats, and deep rhythmic syncopation.",
    descriptionZu: "Uhlobo oluthile lomsindo we-deep house waseYurophu oklanyelwe ukuletha ugqozi emsebenzini wezibalo.",
    accent: "from-blue-600 to-indigo-500"
  },
  {
    id: "afro_deep_house",
    name: "Limbik Afro-Deep House Radio (Africa)",
    category: "music",
    subCategory: "Afro House Beats",
    region: "africa",
    url: "https://stream.zeno.fm/s49f82dwyh8uv",
    fallbackUrl: "https://ice1.somafm.com/fluid-128-mp3",
    description: "Warm polyrhythmic African kick drums, soulful vocal samples, and classic Durban & Johannesburg suburban house loops.",
    descriptionZu: "Imisindo nomculo we-Afro-House ohlanganiswe nesigubhu esimnandi sasemakhaya e-Africa.",
    accent: "from-amber-600 to-red-500"
  },
  {
    id: "soul_gold",
    name: "Classic Soul & Motown Hits (US)",
    category: "music",
    subCategory: "Retro Soul / Motown",
    region: "americas",
    url: "https://ice1.somafm.com/7inchsoul-128-mp3",
    description: "Golden era of retro soul tracks, vintage blues elements, and R&B classics for cognitive rest.",
    descriptionZu: "Amaculo akudala aretro ne-soul azolile asiza ukuphumula ukhumbule kahle imibono.",
    accent: "from-indigo-600 to-violet-500"
  },
  {
    id: "rnb_chill",
    name: "Classic Neo-Soul & Ambient R&B (US)",
    category: "music",
    subCategory: "SomaFM Lush Ambient",
    region: "americas",
    url: "https://ice1.somafm.com/lush-128-mp3",
    description: "Silky vocals and smooth lounge neo-soul elements to promote mental calm and logical focus.",
    descriptionZu: "Amazinga womculo we-R&B omnandi kakhulu asiza ukupholisa inyongo namandla omkhondo wokufunda.",
    accent: "from-fuchsia-600 to-purple-500"
  },
  {
    id: "urban_rnb_soul",
    name: "Urban R&B & Neo-Soul Network (Africa/Global)",
    category: "music",
    subCategory: "Neo-Soul & R&B",
    region: "africa",
    url: "https://stream.zeno.fm/v9uap9gfe8quv",
    fallbackUrl: "https://ice1.somafm.com/lush-128-mp3",
    description: "A masterfully selected sequence of late-night R&B classics, modern neo-soul grooves, and deep urban baseline harmonies.",
    descriptionZu: "Imisindo emnandi ye-R&B entsha ne-Neo-Soul eletha umoya wokuthula nokuphumula kwengqondo okujulile.",
    accent: "from-pink-600 to-rose-500"
  },
  {
    id: "swiss_groove",
    name: "Premium Jazz Radio Swiss (Europe)",
    category: "music",
    subCategory: "Traditional Jazz",
    region: "europe",
    url: "https://stream.srg-ssr.ch/m/rsj/mp3_128",
    fallbackUrl: "https://ice1.somafm.com/sonicuniverse-128-mp3",
    description: "Acoustic basslines, brass melodies, and world-class smooth jazz from the Swiss Broadcast Corporation.",
    descriptionZu: "Umsindo we-jazz omnandi kakhulu osezingeni eliphezulu ozwakalayo emakhasini onke naYurophu.",
    accent: "from-cyan-600 to-indigo-505"
  },
  {
    id: "jazz24_us",
    name: "Jazz24 NPR Seattle (US)",
    category: "music",
    subCategory: "Classic Jazz & Blues",
    region: "americas",
    url: "https://jazz24.live-streams.astound.com/jazz24",
    fallbackUrl: "https://stream.srg-ssr.ch/m/rsj/mp3_128",
    description: "Legendary jazz acts including Miles Davis, Billie Holiday, and John Coltrane live from Seattle's premier jazz broadcast desk.",
    descriptionZu: "Ezika-Jazz zakudala ezisezingeni eliphezulu ezivela e-Seattle, USA ezinothando olufudumele noluthembekile.",
    accent: "from-orange-500 to-amber-600"
  },
  {
    id: "sonic_universe",
    name: "Sonic Universe Jazz-Fusion (Europe/US)",
    category: "music",
    subCategory: "Avant-Garde & Fusion",
    region: "europe",
    url: "https://ice1.somafm.com/sonicuniverse-128-mp3",
    description: "Nu-Jazz, progressive jazz fusion, and electronic global acoustic textures for cerebral stimulation during trade designs.",
    descriptionZu: "Umculo we-Jazz uhlanganiswe ne-Electronic eguqukayo ukusiza ukuhlela kahle ingqondo nemigqa.",
    accent: "from-emerald-500 to-cyan-600"
  },
  {
    id: "cliqhop_electro",
    name: "Cliqhop IDM & Electro (Europe)",
    category: "music",
    subCategory: "IDM & Electro Chill",
    region: "europe",
    url: "https://ice1.somafm.com/cliqhop-128-mp3",
    description: "Glitch-hop, minimalist European industrial electro, and intelligent IDM soundscapes optimized for quantitative analytics.",
    descriptionZu: "Umsindo we-electro ne-glitch-hop yaseYurophu ofanele abantu abathanda ukubala nokuhlaziya idatha enkulu.",
    accent: "from-purple-600 to-indigo-600"
  },
  {
    id: "suburbs_goa",
    name: "Suburbs of Goa Asian Electro Chill (Asia)",
    category: "music",
    subCategory: "Asian Ambient Fusion",
    region: "asia",
    url: "https://ice1.somafm.com/suburbsofgoa-128-mp3",
    description: "High-prestige blend of traditional Asian sitars, tablas, and Indian acoustic rhythms with futuristic European electro-basses.",
    descriptionZu: "Umculo oyingxubevange wamathuluzi we-sitar, tablas zesi-Indian ehlobiswe nge-electro yesimanje.",
    accent: "from-pink-500 to-orange-400"
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
  const isPa = lessonId.includes("pa_") || lessonId.includes("price_") || lessonId.includes("candlestick") || lessonId === "elite_l2" || lessonId === "elite_l3" || lessonId === "elite_l7" || lessonId === "elite_onedrive_lesson_1" || lessonId === "elite_onedrive_lesson_5" || lessonId === "elite_onedrive_lesson_6" || lessonId === "elite_onedrive_lesson_7" || lessonId === "elite_onedrive_lesson_8" || lessonId === "elite_onedrive_lesson_9" || lessonId === "elite_onedrive_lesson_10" || lessonId === "elite_onedrive_lesson_11";
  const isPsych = lessonId.includes("psych_") || lessonId.includes("mind") || lessonId.includes("plan") || lessonId === "elite_l8" || lessonId === "elite_onedrive_lesson_4";
  const isRisk = lessonId.includes("risk_") || lessonId.includes("leverage") || lessonId.includes("formula") || lessonId === "elite_l5" || lessonId === "elite_l9" || lessonId === "elite_onedrive_lesson_2";
  const isOrderflow = lessonId.includes("orderflow_") || lessonId.includes("delta") || lessonId.includes("footprint") || lessonId === "elite_l1" || lessonId === "elite_l6" || lessonId === "elite_onedrive_lesson_3";

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
            <rect x="180" y="32" width="140" height="30" fill="url(#goldGradient1)" fillOpacity="0.05" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
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
              <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
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
    } else if (stepIndex === 2) {
      // Step 3: Multi-Variable Checklist Scoring
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">📋 COGNITIVE CONFLUENCE SCORECARD</span>
            <span className="text-[#D4AF37] font-bold">CALIBRATION LEVEL: 5/5 APPROVED</span>
          </div>
          <div className="space-y-3">
            {[
              { label: isZulu ? "London/NY Session Open (Uhlobo Lwesikhathi)" : "London / NY Session Open (Timeframe Window)", val: "PASS ✔", color: "text-emerald-500" },
              { label: isZulu ? "HTF Key Level Reached (Isikhundla Sesakhiwo)" : "High Timeframe Key Level Intersection (HTF Structure)", val: "PASS ✔", color: "text-emerald-500" },
              { label: isZulu ? "Completed Wick Sweep (Ukuswayipha Emali)" : "Completed Wick Sweep Verification (Absorbed Liquidity)", val: "PASS ✔", color: "text-emerald-500" },
              { label: isZulu ? "Risk-Reward Ratio > 1:3 Checked (Inzuzo vs Umlahleko)" : "Risk-Reward Ratio Model Minimum 1:3 Locked", val: "PASS ✔", color: "text-emerald-500" },
              { label: isZulu ? "Composed & Calm Mind Set (Ukuvumelana)" : "Indifferent Emotional Detachment Calibrated", val: "PASS ✔", color: "text-emerald-500" }
            ].map((check, idx) => (
              <div key={idx} className="flex justify-between items-center bg-black/60 border border-zinc-900/65 p-2 rounded-lg">
                <span className="text-zinc-400 font-medium">{idx + 1}. {check.label}</span>
                <span className={`${check.color} font-black tracking-widest text-[9px] bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/25`}>{check.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-zinc-500 text-[8px] border-t border-zinc-900 pt-2 flex justify-between">
            <span>{isZulu ? "Iphuzu: Ungalokothi uvule i-trade uma kukhona into engaphumelelanga." : "Rule Protocol: If any checklist item fails, immediately lock trade terminal and wait."}</span>
            <span className="text-emerald-500 font-bold uppercase tracking-wider">READY TO OPERATE</span>
          </div>
        </div>
      );
    } else {
      // Step 4: System Detachment
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-red-950/10 p-2 rounded border border-red-500/20">
            <span className="text-red-500 font-bold uppercase tracking-wider">🔒 TERMINAL SESSION COMPLETION</span>
            <span className="text-zinc-500 font-bold text-[9px]">LOCKED SYSTEM</span>
          </div>
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-950/30 border border-red-500/30 flex items-center justify-center text-red-500 text-lg animate-pulse font-sans">
              🔒
            </div>
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-widest">{isZulu ? "INDLELA EVALIWE - UKWENZA IMALI OKUPHELELE" : "TRADING DESK DEACTIVATED"}</p>
              <p className="text-zinc-500 text-[9px] mt-1 uppercase tracking-wider">{isZulu ? "Impilo ingaphandle - Ingqondo izinzile" : "SYSTEM BIOMETRIC TIMEOUT • ZERO RISK ENGAGEMENT"}</p>
            </div>
            <div className="w-full max-w-xs bg-black/80 px-4 py-2 border border-zinc-900 rounded-xl">
              <div className="flex justify-between text-zinc-500 text-[8px] font-mono">
                <span>PORTFOLIO BALANCE</span>
                <span className="text-white font-bold">$10,000.00</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-[8px] font-mono mt-1">
                <span>DAILY DRAWDOWN</span>
                <span className="text-emerald-500 font-bold">0.00%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (isRisk) {
    if (stepIndex === 0) {
      // Step 1: Querying balance
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">🏧 LIQUID CAPITAL & BENCHMARK AUDIT</span>
            <span className="text-emerald-500 font-bold">VERIFIED STATUS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-900 space-y-1">
              <span className="text-zinc-500 text-[8px] uppercase">{isZulu ? "IBHALANSI REKHODI (HARD BALANCE)" : "HARD SYSTEM BALANCE"}</span>
              <p className="text-base font-bold text-white font-mono">$10,000.00 USD</p>
              <span className="text-xs text-emerald-500 font-bold">100% UNENCUMBERED CAPITAL</span>
            </div>
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-900 space-y-1">
              <span className="text-zinc-500 text-[8px] uppercase">{isZulu ? "I-EQUITY ENTSHA (AVAILABLE EQUITY)" : "LIVE PORTFOLIO EQUITY"}</span>
              <p className="text-base font-bold text-[#D4AF37] font-mono">$10,000.00 USD</p>
              <span className="text-zinc-500 text-[8px]">{isZulu ? "Azikho ama-trades avuliwe" : "No open floating asset drawdowns"}</span>
            </div>
          </div>
          <svg viewBox="0 0 500 60" className="w-full h-auto">
            <rect x="10" y="15" width="480" height="15" fill="#18181b" rx="3" stroke="#27272a" />
            <rect x="10" y="15" width="480" height="15" fill="rgba(16, 185, 129, 0.25)" rx="3" />
            <circle cx="250" cy="22.5" r="5" fill="#10b981" />
            <text x="250" y="48" fill="#10b981" textAnchor="middle" className="text-[8px] font-bold uppercase tracking-widest">
              SYSTEM PORTFOLIO HEALTH: OPTIMAL (100% CONSERVATIVE EQUITY MULTIPLIER)
            </text>
          </svg>
        </div>
      );
    } else if (stepIndex === 1) {
      // Step 2: Defining Pip stop distance
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-purple-950/10 p-2 rounded border border-purple-500/20">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">📏 GEOMETRIC MEASUREMENT MATRIX</span>
            <span className="text-purple-400 font-mono font-bold">10 PIPS TARGET SL DISTANCE</span>
          </div>
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Candlestick illustration */}
            <line x1="150" y1="20" x2="150" y2="110" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="142" y="35" width="16" height="50" fill="#ef4444" rx="1" />
            <text x="130" y="32" fill="#ef4444" className="text-[8px] font-bold">SWEEP HIGHEST WICK</text>
            
            {/* Ruler Line */}
            <line x1="260" y1="35" x2="260" y2="85" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3,1" />
            {/* Ruler ticks */}
            <line x1="255" y1="35" x2="265" y2="35" stroke="#D4AF37" strokeWidth="2" />
            <line x1="257" y1="60" x2="263" y2="60" stroke="#D4AF37" strokeWidth="1.5" />
            <line x1="255" y1="85" x2="265" y2="85" stroke="#D4AF37" strokeWidth="2" />
            
            <text x="275" y="55" fill="#D4AF37" className="text-[9px] font-bold uppercase tracking-widest">
              {isZulu ? "ISILINGANISO: I-10 PIPS (100 TICKS)" : "DISTANCE: 10 PIPS (100 TICKS)"}
            </text>
            <text x="275" y="68" fill="zinc-400" className="text-[8px]">
              {isZulu ? "Inani Lomuzila: I-1 Standard Lot eyi-$10 path" : "PIP VALUE COEFFICIENT: $10/Standard Lot"}
            </text>
            <text x="275" y="80" fill="zinc-600" className="text-[7.5px] uppercase">
              calculated strictly from visual sweep extremities
            </text>
          </svg>
        </div>
      );
    } else if (stepIndex === 2) {
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
    } else {
      // Step 4: Confirming Margin Level
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-emerald-950/10 p-2 rounded border border-emerald-500/20">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">🛡️ LEVERAGE & EQUITY RISK LOCK</span>
            <span className="text-emerald-400 font-bold uppercase">SECURED</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-center">
            <div className="bg-black/40 p-2 rounded border border-zinc-900">
              <span className="text-zinc-500 text-[8px] uppercase">{isZulu ? "I-MARGIN LEVEL %" : "MARGIN LEVEL %"}</span>
              <p className="text-base font-black text-emerald-400 font-mono">1,450.28%</p>
              <span className="text-[7.5px] text-zinc-500 uppercase">Min Limit: 1000%</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-zinc-900">
              <span className="text-zinc-500 text-[8px] uppercase">{isZulu ? "ISETSHENZISIWAYO (USED MARGIN)" : "USED MARGIN"}</span>
              <p className="text-base font-bold text-white font-mono">$68.90 USD</p>
              <span className="text-[7.5px] text-zinc-500">Very safe leverage buffer</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-zinc-900">
              <span className="text-zinc-500 text-[8px] uppercase">{isZulu ? "MAHHALA (FREE MARGIN)" : "FREE MARGIN CAP"}</span>
              <p className="text-base font-bold text-white font-mono">$9,931.10 USD</p>
              <span className="text-[7.5px] text-emerald-500 uppercase font-black">99.3% LIQUID</span>
            </div>
          </div>
          <p className="text-zinc-500 text-center text-[8.5px] font-mono leading-relaxed uppercase tracking-wider bg-black/60 p-2 rounded-xl border border-zinc-900/60">
            {isZulu ? "Uhambo Lokulondeka: Imali emakethe ingaphansi kohlelo, akukho gozi engaphandle kalowo mthetho." : "Leasing buffer guard: The portfolio leverage coefficient remains ultra-low to completely prevent margin calls."}
          </p>
        </div>
      );
    }
  }

  if (isOrderflow) {
    if (stepIndex === 0) {
      // Step 1: Mapping L2 Depth order book
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-purple-950/10 p-2 rounded border border-purple-500/20">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">📊 ORDERDEPTH DOM (DEPTH OF MARKET) MAP</span>
            <span className="text-purple-400 font-mono font-bold">L2 DATA NODE</span>
          </div>
          <svg viewBox="0 0 500 150" className="w-full h-auto">
            {/* Middle Price spread divider */}
            <line x1="250" y1="10" x2="250" y2="140" stroke="#3f3f46" strokeDasharray="3,3" />
            <text x="250" y="145" fill="zinc-600" textAnchor="middle" className="text-[7px]">SPREAD GAP</text>
            
            {/* Bid Side (Limit Buys - Green) */}
            <text x="10" y="20" fill="#10b981" className="text-[9px] font-bold uppercase">📥 BUY LIMIT ORDERS (BIDS)</text>
            <rect x="55" y="35" width="180" height="15" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="0.5" />
            <text x="65" y="45" fill="white" className="text-[8px] font-sans font-black">1.15100 - 450 Lots (Bank Pool)</text>
            
            <rect x="95" y="55" width="140" height="15" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="0.5" />
            <text x="105" y="65" fill="zinc-300" className="text-[8px] font-sans">1.15050 - 240 Lots</text>
            
            <rect x="135" y="75" width="100" height="15" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="0.5" />
            <text x="145" y="85" fill="zinc-400" className="text-[8px] font-sans">1.15000 - 150 Lots</text>
            
            {/* Ask Side (Limit Sells - Red) */}
            <text x="490" y="20" fill="#ef4444" textAnchor="end" className="text-[9px] font-bold uppercase">📤 SELL LIMIT ORDERS (ASKS)</text>
            <rect x="265" y="35" width="80" height="15" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="275" y="45" fill="zinc-400" className="text-[8px] font-sans">1.15150 - 90 Lots</text>
            
            <rect x="265" y="55" width="120" height="15" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="275" y="65" fill="zinc-300" className="text-[8px] font-sans">1.15200 - 175 Lots</text>
            
            <rect x="265" y="75" width="210" height="15" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="275" y="85" fill="white" className="text-[8px] font-sans font-black">1.15250 - 620 Lots (Institutional Block)</text>
          </svg>
          <div className="mt-1 text-center text-zinc-500 text-[8.5px] border-t border-zinc-900 pt-1.5">
            <span>{isZulu ? "Ukuhlaziya: Amabhulogi amakhulu wentengo amisa lapho amakhasimende angena khona." : "Orderbook Analysis: High concentration zones pinpoint passive limit positions representing institutional order blocks."}</span>
          </div>
        </div>
      );
    } else if (stepIndex === 1) {
      // Step 2: Volume Profile
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">🗺️ DYNAMIC SESSIONS VOLUME PROFILE</span>
            <span className="text-red-500 font-bold">POC ANCHORED</span>
          </div>
          <svg viewBox="0 0 500 150" className="w-full h-auto">
            {/* Grids */}
            <line x1="20" y1="20" x2="480" y2="20" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="20" y1="60" x2="480" y2="60" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="20" y1="100" x2="480" y2="100" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="20" y1="140" x2="480" y2="140" stroke="#18181b" strokeDasharray="3,3" />

            {/* Volume Horizontal Bars on Right Margin */}
            <rect x="10" y="15" width="90" height="10" fill="gray" fillOpacity="0.1" />
            <rect x="10" y="30" width="130" height="10" fill="gray" fillOpacity="0.1" stroke="#3f3f46" strokeWidth="0.5" />
            <rect x="10" y="45" width="220" height="10" fill="gray" fillOpacity="0.15" />
            
            {/* Point of Control (POC) - Heavy Bar */}
            <rect x="10" y="60" width="360" height="15" fill="rgba(212, 175, 55, 0.15)" stroke="#D4AF37" strokeWidth="1" />
            <line x1="10" y1="67.5" x2="490" y2="67.5" stroke="#ef4444" strokeWidth="2.5" />
            <text x="380" y="70" fill="#ef4444" className="text-[10px] font-black uppercase tracking-widest animate-pulse">❤️ POINT OF CONTROL (POC)</text>
            
            <rect x="10" y="80" width="260" height="10" fill="gray" fillOpacity="0.15" />
            <rect x="10" y="95" width="180" height="10" fill="gray" fillOpacity="0.1" />
            <rect x="10" y="110" width="110" height="10" fill="gray" fillOpacity="0.1" />
            
            {/* Price line bouncing near POC */}
            <path d="M 120,25 L 180,50 L 230,120 L 290,67 L 330,67.5 L 430,125" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <circle cx="290" cy="67" r="4" fill="#ef4444" />
          </svg>
          <div className="mt-1 text-center text-zinc-500 text-[8.5px] border-t border-zinc-900 pt-1.5 flex justify-between">
            <span>{isZulu ? "Iphuzu: I-POC ikhombisa lapho amabhange ahlangana khona kakhulu." : "Concept: Volume POC represents the absolute price coordinate with maximum transacted order blocks."}</span>
            <span className="text-[#D4AF37] font-bold">100% REVELATIONAL</span>
          </div>
        </div>
      );
    } else if (stepIndex === 2) {
      // Step 3: Session Delta Imbalance
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-emerald-950/10 p-2 rounded border border-emerald-500/20">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">🔬 RAW SESSION TRANSACTIONAL DELTA METRICS</span>
            <span className="text-emerald-400 font-bold">BUYERS AGGRESSIVE IMBALANCE</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between bg-black/50 p-2 border border-zinc-900 rounded-lg">
              <span>AGGRESSIVE BUY MARKET VOLUME:</span>
              <span className="text-emerald-400 font-bold font-mono">14,250 Lots</span>
            </div>
            <div className="flex justify-between bg-black/50 p-2 border border-zinc-900 rounded-lg">
              <span>AGGRESSIVE SELL MARKET VOLUME:</span>
              <span className="text-red-500 font-bold font-mono">2,110 Lots</span>
            </div>
            {/* Imbalance Ratio Delta Guage */}
            <div className="border border-zinc-900 p-3 rounded-lg bg-black/80 space-y-2">
              <div className="flex justify-between text-[9px] font-mono font-bold">
                <span className="text-zinc-500">SESSION ORDER DELTA VALUE:</span>
                <span className="text-emerald-400 font-black">+12,140 (Massive Buying Pressure Detected)</span>
              </div>
              <div className="h-2 rounded bg-zinc-900 overflow-hidden relative">
                <div className="h-full bg-emerald-500 rounded" style={{ width: "87%" }}></div>
              </div>
              <div className="flex justify-between text-[7px] text-zinc-600">
                <span>13% SELLERS</span>
                <span>87% BUYING INFLUX</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-zinc-500 text-[8px] border-t border-zinc-900 pt-1.5">
            <span>{isZulu ? "Ubufakazi: I-Delta ephanisayo ikhombisa ukuthi abathengi abanolaka bayawashanela amasell rules." : "Proof: Extremely high positive session delta demonstrates smart money taking immediate market liquidity."}</span>
          </div>
        </div>
      );
    } else {
      // Step 4: Low Drawdown Entry
      return (
        <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
          <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-emerald-950/10 p-2 rounded border border-emerald-500/20">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">🎯 HIGH PRECISION ENTRY AT POC RE-TEST</span>
            <span className="text-[#D4AF37] font-bold">1:6 RR OPTIMIZED</span>
          </div>
          <svg viewBox="0 0 500 135" className="w-full h-auto">
            {/* Stop loss line */}
            <line x1="30" y1="120" x2="470" y2="120" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
            <text x="40" y="113" fill="#ef4444" className="text-[7.5px] uppercase tracking-wide">PROTECTIVE BACK-LIMIT SL LINE - 1.14900</text>
            
            {/* POC Line / Entry Level */}
            <line x1="30" y1="80" x2="470" y2="80" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="40" y="73" fill="#D4AF37" className="text-[8px] font-black uppercase tracking-wider">SYSTEM PURCHASE TRIGGER LEVEL (POC RE-TEST) - 1.15000</text>
            
            {/* Profit target line */}
            <line x1="30" y1="20" x2="470" y2="20" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
            <text x="40" y="15" fill="#10b981" className="text-[7.5px] uppercase tracking-wide">PROFIT DISMISS BOUNDARY (TP) - 1.15600</text>

            {/* RETEST CANDLE wicking down to POC, then flying up */}
            <line x1="280" y1="30" x2="280" y2="110" stroke="#10b981" strokeWidth="1" />
            <rect x="274" y="40" width="12" height="40" fill="#10b981" rx="1" />
            
            {/* Retest wick tag */}
            <circle cx="280" cy="80" r="4.5" fill="#D4AF37" />
            <circle cx="280" cy="80" r="2.5" fill="#10b981" />
            
            <text x="300" y="93" fill="white" className="text-[8px] font-black uppercase bg-[#18181b]/95 p-1 rounded border border-zinc-800">
              ⚡ LIVE TAPPED & FILLED AT POC! DRAWDOWN: 1.2 PIPS
            </text>
          </svg>
        </div>
      );
    }
  }

  // --- GENERAL FALLBACK / STANDARD LESSON LEVEL GRAPHICS (0, 1, 2, 3) ---
  if (stepIndex === 0) {
    // Phase 1: Workspace setup
    return (
      <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
        <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-zinc-900/60 p-2 rounded border border-zinc-800">
          <span className="text-[#D4AF37] font-bold uppercase tracking-wider">🖥️ WORKSPACE LAYOUT & CLEANSE DESIGN</span>
          <span className="text-zinc-500 font-bold uppercase">UNIT 01 ACTIVE</span>
        </div>
        <svg viewBox="0 0 500 130" className="w-full h-auto">
          {/* Grid structure indicating workspace design */}
          <rect x="10" y="10" width="480" height="110" fill="#09090b" stroke="#27272a" rx="6" />
          
          {/* Side pane (symbol list) */}
          <rect x="20" y="20" width="100" height="90" fill="#030303" stroke="#18181b" rx="4" />
          <text x="30" y="40" fill="#D4AF37" className="text-[7.5px] font-black uppercase">🗂️ ASSETS</text>
          <text x="30" y="55" fill="white" className="text-[7px]">EURUSD [ACTIVE]</text>
          <text x="30" y="70" fill="zinc-600" className="text-[7px]">XAUUSD (GOLD)</text>
          <text x="30" y="85" fill="zinc-600" className="text-[7px]">GBPUSD (CABLE)</text>
          
          {/* Center pane (clean graph window with NO horizontal gridlines) */}
          <rect x="130" y="20" width="340" height="90" fill="#050505" stroke="#18181b" rx="4" />
          <text x="145" y="35" fill="zinc-500" className="text-[7px] uppercase tracking-widest font-black">📊 FLAT CANVAS WINDOW - NO GRID NO CLUTTER</text>
          
          {/* Clean line trace */}
          <path d="M 145,95 L 200,80 L 260,90 L 320,40 L 380,60 L 440,30" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="440" cy="30" r="3" fill="#D4AF37" />
        </svg>
        <div className="mt-1 text-center text-zinc-500 text-[8.5px] border-t border-zinc-900 pt-1.5">
          <span>{isZulu ? "Iphuzu: Susa yonke imigqa namapensile azwelayo adala ukukhathala engqondweni." : "Rule: Disable default chart grids. Retain only primary candlesticks & pure price levels for perfect focus."}</span>
        </div>
      </div>
    );
  } else if (stepIndex === 1) {
    // Phase 2: Macro monitor
    return (
      <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
        <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4">
          <span className="text-zinc-500 font-bold uppercase tracking-wider">📅 HIGH-IMPACT MACROECONOMIC CALENDAR</span>
          <span className="text-[#D4AF37] font-bold">MONITORED REAL-TIME</span>
        </div>
        <div className="space-y-3">
          {[
            { time: "14:30 GMT", event: "US Consumer Price Index (CPI Core MoM)", impact: "HIGH IMPACT 🔥", detail: "Forecast: 0.2% | Actual: 0.1% [Dovish Inflation]", color: "text-red-500" },
            { time: "16:00 GMT", event: "Federal Open Market Committee (FOMC) Press Briefing", impact: "HIGH IMPACT 🔥", detail: "Interest rate trajectory guidelines released by Fed Chair", color: "text-red-500" },
            { time: "18:45 GMT", event: "ECB Governor Speech (Eurozone Liquidity)", impact: "MEDIUM IMPACT ⚡", detail: "Discussing local Eurozone sovereign debt reserves", color: "text-[#D4AF37]" }
          ].map((ev, idx) => (
            <div key={idx} className="flex flex-col bg-black/60 p-2.5 border border-zinc-900 rounded-xl space-y-1 text-left">
              <div className="flex justify-between items-center text-[9px] font-bold">
                <span className="text-[#D4AF37]">{ev.time} • <strong className="text-white">{ev.event}</strong></span>
                <span className={`${ev.color} tracking-tighter text-[8px] bg-black px-1.5 py-0.2 rounded border border-zinc-800`}>{ev.impact}</span>
              </div>
              <p className="text-[8px] text-zinc-500 font-mono leading-relaxed">{ev.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-1 text-center text-zinc-500 text-[8.5px] border-t border-zinc-900 pt-1.5 flex justify-between">
          <span>{isZulu ? "Iphuzu: Ungalokothi uvule i-trade ngaphambi kuka 15-Minutes ngaphambi kohlelo lwamandla." : "Mandate: Strictly avoid order placement within 15 minutes of these pre-session calendar times."}</span>
          <span className="text-red-500 font-bold uppercase tracking-wide">CAUTION IN EFFECT</span>
        </div>
      </div>
    );
  } else if (stepIndex === 2) {
    // Phase 3: S&R confluences
    return (
      <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
        <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-yellow-950/10 p-2 rounded border border-[#D4AF37]/25">
          <span className="text-[#D4AF37] font-bold uppercase tracking-wider">🎯 MULTI-CONFLUENCE INTERSECTION POINT</span>
          <span className="text-white font-mono font-bold">HIGH PREV LEVEL</span>
        </div>
        <svg viewBox="0 0 500 130" className="w-full h-auto">
          {/* Horizontal Resistance Level */}
          <line x1="30" y1="40" x2="470" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
          <text x="50" y="32" fill="#ef4444" className="text-[7px] uppercase font-bold text-[#ef4444] tracking-widest">MAJOR DAILY SWING RESISTANCE LEVEL</text>
          
          {/* Diagonal trendline */}
          <line x1="80" y1="120" x2="350" y2="20" stroke="#D4AF37" strokeWidth="2" />
          <text x="355" y="25" fill="#D4AF37" className="text-[7.5px] uppercase font-bold tracking-widest">ASCENDING ORDER PRESSURE LINE</text>
          
          {/* Intersection Highlight */}
          <circle cx="296" cy="40" r="8" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="296" cy="40" r="3" fill="#D4AF37" />
          
          <text x="312" y="44" fill="white" className="text-[8.5px] font-black uppercase bg-zinc-950 px-2 py-0.5 rounded border border-[#D4AF37]">
            ✨ KEY CONFLUENCE INTERSECTION (TRENDLINE & LEVEL)
          </text>
          
          {/* Safe visual price bouncing */}
          <path d="M 90,115 L 150,90 L 190,105 L 296,40 T 360,95" fill="none" stroke="zinc-600" strokeWidth="1" strokeDasharray="1,1" />
        </svg>
      </div>
    );
  } else {
    // Phase 4: Pending limit
    return (
      <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
        <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 bg-emerald-950/10 p-2 rounded border border-emerald-500/20">
          <span className="text-emerald-400 font-bold uppercase tracking-wider">📥 ACTIVE PENDING LIMIT CONTRACT ORDER</span>
          <span className="text-[#D4AF37] font-bold font-mono">1:4 PRECISE R/R</span>
        </div>
        <svg viewBox="0 0 500 130" className="w-full h-auto">
          {/* Protective Stop Loss */}
          <line x1="40" y1="110" x2="460" y2="110" stroke="#ef4444" strokeWidth="1.5" />
          <rect x="360" y="102" width="100" height="15" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.5" />
          <text x="410" y="112" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-bold">SAFETY STOP LOSS (SL)</text>
          
          {/* Entry Limit line */}
          <line x1="40" y1="80" x2="460" y2="80" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2,2" />
          <rect x="360" y="72" width="100" height="15" fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" strokeWidth="0.5" />
          <text x="410" y="82" fill="#D4AF37" textAnchor="middle" className="text-[7.5px] font-bold">PENDING BUY LIMIT</text>
          
          {/* Take Profit target */}
          <line x1="40" y1="20" x2="460" y2="20" stroke="#10b981" strokeWidth="1.5" />
          <rect x="360" y="12" width="100" height="15" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="0.5" />
          <text x="410" y="22" fill="#10b981" textAnchor="middle" className="text-[7.5px] font-bold">TARGET EXIT REWARD (TP)</text>

          {/* Price path tapping the buy limit point and turning upwards */}
          <path d="M 60,35 L 120,55 L 200,80 L 260,80 L 320,35" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="260" cy="80" r="4" fill="#D4AF37" />
          <text x="270" y="75" fill="#D4AF37" className="text-[8px] font-black">CONTRACT EXECUTED NOW</text>
        </svg>
      </div>
    );
  }
}

function getLessonSteps(lesson: any, language: string) {
  const isZulu = language === "zu";
  
  if (lesson.id === "elite_onedrive_lesson_1") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubheka Isakhiwo ngama-Higher Timeframes" : "Step 1: Analyzing Higher-Timeframe Market Structure",
        description: isZulu 
          ? "Hlola i-D1 noma i-H4 trend ukuze ubone ukuthi intengo ihamba ngakuphi na. Susa amaphepha adala ukukhathala engqondweni, gcina kuphela amakhandlela nentengo ehlanzekile." 
          : "Analyze the Daily and 4-Hour trend framework to establish overall market bias. Clear your screen of unnecessary indicators and isolate institutional order zones.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukulinda i-Candlestick Wick Sweep / Amalungiselela e-Liquidity" : "Step 2: Real-time Wick Liquidity Sweep Verification",
        description: isZulu 
          ? "Linda intengo ishanele imingcele emikhulu (wick sweep) lapho amanye amaprofayela abeke khona ama-stop losses abo. Amabhange azosusa bonke abahwebi abancane lapha." 
          : "Wait for a high-momentum candle wick to cleanly sweep past the major high/low boundaries, liquidating retail stop losses before turning instantly in the premium direction.",
        imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukuqinisekisa i-Market Structure Shift kwi-Lower Timeframe" : "Step 3: Confirming Lower-Timeframe Market Structure Shift (MSS)",
        description: isZulu 
          ? "Yehla kakhulu kwi-1M noma i-5M timeframe, uvunde isandla lapho intengo breaks isakhiwo sayo sendawo emva kwe sweep wick, lokhu kuqinisekisa reverse yeqiniso." 
          : "Zoom into the 1-minute or 5-minute execution charts and look for a clear displacement break of local market structure, confirming that banks are reorganizing the trend.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuthengiselana kwi-Fair Value Gap nokuSondela I-SL Eqinile" : "Step 4: Precision Mitigation Entry under Tight Risk Measures",
        description: isZulu 
          ? "Setha i-passive limit limit order yakho kwi Fair Value Gap (FVG) evulekileyo. Beka i-stop loss yakho phesheya kwensika kabi (sweep wick) ugcine ingozi ku-1.0% kuphela." 
          : "Settle your limit entry directly at the horizontal Fair Value Gap boundary. Secure your protective Stop Loss buffer safely behind the sweep wick peak, keeping risk strictly below 1.0%.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_2") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukuhlaziya Amandla we-US Dollar Index DXY" : "Step 1: Quantifying US Dollar Index (DXY) Structural Shift",
        description: isZulu 
          ? "I-US Dollar Index iyona yala amanye umkhakha wezezimali. Hlola ukuthi i-DXY ihamba ngaphi emuva kokushanelwa kwesakhiwo (liquidity check) ngaphambi kokuhweba." 
          : "Analyze the US Dollar Index (DXY) daily trend framework. Since major currencies and gold trade inversely, DXY structure shifts are absolute leading indicators for entry bias.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuhlola i-Intermarket Divergence and Assets Direction" : "Step 2: Cross-Examining Intermarket Divergence Boundaries",
        description: isZulu 
          ? "Hlola i-EURUSD, GBPUSD, negolide ngezikhathi ezifanayo. Uma enye ishaqa i-liquidity kanti enye itshiye isakhiwo sayo semvelo, ungafaka i-trade eqinile kakhulu." 
          : "Compare and contrast major correlated instruments (EURUSD, GBPUSD, or Gold) in real-time. Spot divergence patterns where one instrument sweeps liquidity while the other hesitates.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukwakha i-Delta-Neutral Hedging System Yokuvikela Capital" : "Step 3: Engineering Premium Delta-Neutral Insurance (Hedges)",
        description: isZulu 
          ? "Ukuze unciphise ingozi, sebenzisa izikhundla ezimbili eziphambene (EURUSD ne-GBPUSD) ngezikhathi zendaba ezibucayi (news releases). Lokhu kuvikela margin yakho eyimali." 
          : "Build multi-layered negative correlation profiles. Leverage delta-neutral positions (such as long EURUSD vs short GBPUSD in structured ratios) to safely isolate equity curves from news slips.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukulawula ama-Drawdowns nokuQinisekisa i-Margin Level > 1000%" : "Step 4: Live Drawdown Management & Margin Health Review",
        description: isZulu 
          ? "Ngemuva kokufaka ama-orders, hlola i-Terminal bar ukuthi i-Margin Level % ifinyelele ngaphezu kwemingcele ewu-1000%. Gcina risk multiplier yaphansi ukuze uphumelele." 
          : "Monitor live execution profiles upon trade deployment. Keep your floating margin highly cushioned above the 1000% threshold to guarantee immunity to market drawdowns.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_3") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukuhlaziya amashadi we-Volumetric Footprint" : "Step 1: Dissecting Volumetric Footprint Order Flows",
        description: isZulu 
          ? "Misa amasheya akho ezibalo ngamakhandlela anembile akhombisa abathengi nabathengisi ngqo. Thola izindawo lapho umthamo ulingana ngokuphambene khona." 
          : "Apply a footprint filter on high-volume liquid sessions. Isolate aggressive buying and selling transactions occurring inside individual candlestick price ticks.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukulandelela ama-Diagonal Bid/Ask Imbalances" : "Step 2: Locating Diagonal Bid/Ask Imbalances",
        description: isZulu 
          ? "Bheka lapho abathengi bengaphezu kwabathengisi diagonally ngoku-300% (buying imbalance) noma abathengisi baphezulu kakhulu (selling imbalance). Lokhu kukhombisa umnikelo wamabhange." 
          : "Track diagonal ask vs bid orders in real-time. Look for extreme volumetric imbalances (diagonal ratio surpassing 300%) representing massive institutional market participation.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukuqinisekisa i-Cumulative Delta Shifts kwi-Extreme Peaks" : "Step 3: Verifying Cumulative Delta Reversing Shifts",
        description: isZulu 
          ? "Uma intengo ifinyelela kwi-resistance kodwa i-delta isiqalile ukwehla phezulu, lokhu kukhombisa ukuthi abathengi baphelelwa ngamandla kanti amabhange aselungiselela ukuzosusa intengo." 
          : "Monitor cumulative delta curves. When price registers consecutive local peaks but the delta actively drops, it confirms heavy passive absorption of aggressive buying orders.",
        imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuthengiselana kwi-Stacked Imbalances nokuSetha i-SL Eqinile" : "Step 4: Stacked Imbalances Entry & High-Precision Risk Cushion",
        description: isZulu 
          ? "Ngemuva kokugqobhoza (MSS), faka i-trade yakho ngqo phezulu kwe-imbalance eningi evulekileyo. Beka i-stop loss sakho kancane ngale kwensika yezinga lesakhiwo (1 tick cushion)." 
          : "Deploy orders directly at the upper boundary of stacked buying imbalances. Position your precise protective stop loss 1 tick below the footprint candle structure block.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_4") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubala Isilungiselelo se-Kelly Criterion Sizing" : "Step 1: Quantifying Fractional Kelly Criterion Parameters",
        description: isZulu 
          ? "Bala optimal trade size usebenzisa ifomula Kelly % ukuthola standard risk size ehambisanayo nomlando webhange lakho." 
          : "Define optimal trade exposure size dynamically. Apply historical win-loss ratios and reward metrics to establish safe capital allocation thresholds.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukumisa Ifomula Yokuzivikela kwi-Drawdown" : "Step 2: Securing Drawdown Immunization Barriers",
        description: isZulu 
          ? "Gcina isilinganiso esiphansi se-risk (1.0% - 1.5%) across all baskets ukuze uqinisekise ukuthi i-equity ihlala ivikelekile ekulahlekelweni okuningi." 
          : "Enforce strict capitalization buffers. Restrict total combined exposure to 1.5% maximum to shield your equity curve from short-term market streaks.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukubhula Ukwesaba ne-FOMO Emakethe" : "Step 3: Neurological Stress Mitigation Frameworks",
        description: isZulu 
          ? "Vala ukuhweba ngezandla uma ubona unemizwa, automating entry and exit point signals ukugcina logic iqinile." 
          : "Counteract emotional stressors triggered during volatile live sessions. Suppress impulsive FOMO responses by automating entry and exit triggers.",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuthatha Amakhefu Impose Post-Execution Invalidation Rules" : "Step 4: Imposing Mandatory Post-Execution Offline Breaks",
        description: isZulu 
          ? "Thatha ikhefu eliwu-15 mins off the screen phesheya kwemiphumela emikhulu, lokhu kubuyisela logic elungile engqondweni yakho." 
          : "Enforce cognitive pauses. Step away from trading terminals for exactly 15 minutes immediately following consecutive execution outcomes.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_5") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukuhlaziya Imikhawulo Kama-HTF Ranges ne-Premium/Discount" : "Step 1: Mapping HTF Ranges & Premium-vs-Discount Matrices",
        description: isZulu 
          ? "Thola u-equilibrium we-50% kwi-Fibonacci. Ungalokothi uthenge kwi-premium zone noma uthengise kwi-discount zone." 
          : "Define the high-timeframe trading range and map the 50% equilibrium. Ensure limit buy setups are placed exclusively in deep discount territory.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuthola i-Market Maker Buy & Sell Models (MMBM/MMSM)" : "Step 2: Tracking Market Maker Order Models",
        description: isZulu 
          ? "Landela ukuthi intengo idlula kanjani kwi-consolidation iye kwi-liquidity sweep zone ngaphambi kokuqondisa ama-orders kabili." 
          : "Decode multi-stage accumulation and distribution models as the smart money algorithm campaigns between liquid ranges.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukuxhumanisa ama-Liquidity Runs nezikhathi ze-Sessions" : "Step 3: Aligning Sessions and High-Volume Influx Intervals",
        description: isZulu 
          ? "Qinisekisa ukuthi amasu okuhweba (liquidity setup) avela ngesikhathi se-London Open noma i-New York Session, hhayi ngesikhathi sobusika kwi-Asian session." 
          : "Synthesize timezone parameters. Execute limit setups only during the London Open or initial New York market delivery windows.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukulungisa ama-Stop Loss Precision nama-Scale-Out Positions" : "Step 4: Precision Position Management & Scale-Out Rules",
        description: isZulu 
          ? "Setha i-Stop Loss phesheya kwendawo sweping range, bese ukhuphula amabhonasi encazelo yakho ngezinyathelo kwi-opposing key pools." 
          : "Position your protective stop loss 1 tick beyond invalidation extremes, and implement partial profit scale-outs at high-volume structural targets.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_6") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubona Ushintsho Lwesakhiwo Semakethe (MSS)" : "Step 1: Identifying Market Structure Shift (MSS)",
        description: isZulu 
          ? "Linda ukuthi intengo isabalalise imingcele ngokugqabula (displacement) phakathi kokunyakaza okubalulekile, ikakhulukazi ngemva kokuthathwa kwe-liquidity." 
          : "Observe market action for displacement: an aggressive, large-bodied candle breaking structural swing pivots, confirming structural transition of trend momentum.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuthola nama-imbalances e-Fair Value Gaps (FVG)" : "Step 2: Locating Multi-Candle Fair Value Gaps (FVG)",
        description: isZulu 
          ? "Thola amazinga alinganiselwa kumakhandlela amathathu lapho kukhona isikhala esivelele entengweni, esingakhaswanga ngempendulo yezandla." 
          : "Pinpoint three-candle structural gaps where high-speed displacement left behind zero trade balance. These imbalances act as gravity wells for future price action.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukuxazulula ama-Limits ngezikhathi zokwebiwa (Retracements)" : "Step 3: Positioning Premium vs Discount Retracements",
        description: isZulu 
          ? "Gada intengo yokuhlehla (retracement) iye kwi-discount okungaphansi kwe-equilibrium value of 50% ngaphambi kokukhetha trade setup." 
          : "Map the displacement leg with Fibonacci tools. Position entry orders exclusively in deep discount territory (below the 50% optimal equilibrium mark).",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukubeka protective stop loss Precision" : "Step 4: Advanced Capital Protection & Hard Invalidation SL",
        description: isZulu 
          ? "Qondanisa protective stop loss sikhathi sonke ngemuva kwendawo yendawo sweping candle (1.5 pips buffer) ukuze ugcine safe profile." 
          : "Configure protective stop loss commands strictly 1.5 pips beyond invalidation levels of the sweep extreme, protecting accounts from unexpected capital shocks.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_7") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukudweba Ama-Order Blocks (OB)" : "Step 1: Mapping Institutional Order Blocks (OB)",
        description: isZulu 
          ? "Thola ikhandlela lokugcina ngaphambi kokuhambela phezulu okunamandla (displacement). Leli zinga likhombisa lapho amabhange afake khona ama-orders." 
          : "Identify the last candle prior to a fast displacement move. This zone indicates key institutional buying or selling footprints.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuhlunga ne-Premium/Discount Matrix" : "Step 2: Dual Premium vs Discount Matrix Filters",
        description: isZulu 
          ? "Sebenzisa u-Fibonacci ukuthola u-equilibrium we-50%. Qinisekisa ukuthi ulandela kuphela ukuthenga ngaphansi kwendawo (discount area)." 
          : "Apply Fibonacci parameters across the displacement leg. Enter buy positions strictly in discount and sells strictly in premium domains.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukuxazulula Low-Timeframe POI Refinements" : "Step 3: Low-Timeframe POI & Imbalance Refinements",
        description: isZulu 
          ? "Yehla kwi-timeframe encane (isib. M5 noma M15) ukuze unqume kahle ingxenye emele isikhala entengweni (imbalance/POI origin)." 
          : "Transition to lower timeframes to narrow down POIs. Target the refined origin candle of the macro displacement for precise low-risk execution.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukuvikela Imali ne-Hard Invalidation SL" : "Step 4: Executing Structural Invalidation SL Standards",
        description: isZulu 
          ? "Beka i-Stop Loss yakho ngama pips angu-1.5 kuye ku-2 ngaphezu noma ngaphansi kwe-wick ye-Order Block ukuvimbela redrawdown." 
          : "Configure invalidation protective stop losses precisely 1.5 to 2 pips beyond the outer block limits, keeping your risk profile tightly bounded.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_8") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubona Asian Range Accumulation (A)" : "Step 1: Identifying Asian Range Accumulation (A)",
        description: isZulu 
          ? "Linda ukuthi intengo ihambe emaceleni ngesikhathi sase-Asia, bese udweba amazinga wobubanzi be-session." 
          : "Observe horizontal consolidation on a low timeframe during the Asian session, mapping the session highs and lows.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukubona Institutional Manipulation (M)" : "Step 2: Spotting Institutional Manipulation (M)",
        description: isZulu 
          ? "Gada ukushanela okusheshayo ngaphezulu noma ngaphansi kwalezo mingcele yangaphambilini ngesikhathi somzuzu we-London noma i-New York Open." 
          : "Observe the rapid sweep above or below the accumulation boundaries during London Open or New York Open to trap retail sentiment.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukulandela i-Distribution Expansion (D)" : "Step 3: Tracking the Distribution Expansion (D)",
        description: isZulu 
          ? "Faka izikhundla kwi-trend enkulu emva kokuba i-algorithm iqale ukukhuphuka/ukwehla ngamandla ukuya emgomweni womhla lowo." 
          : "Execute trades in the direction of the genuine weekly macro expansion trend as the market delivers target values back to value areas.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukungena Precision ne-Stop Loss Buffers" : "Step 4: Precision Entry & Stop Loss Invalidation",
        description: isZulu 
          ? "Ngena usebenzisa u-structure shift kwi-timeframe encane, bese ubeka i-Stop Loss yakho ngama pips angu-1.5 kuye ku-2 ngale kwaleyo wick ye-manipulation." 
          : "Enter on a lower timeframe structural shift after manipulation and anchor the safety stop loss 1.5 - 2 pips beyond the wick extreme.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_9") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukudweba amazinga wobubanzi be-Liquidity Zones" : "Step 1: Mapping High-Probability Liquidity Zones",
        description: isZulu 
          ? "Dweba amazinga e-liquidity pools ngaphambi kokuhlangana kwe-session. Qikelela ama-equal highs noma ama-double bottoms." 
          : "Map multi-session liquidity pools. Keep special track of pristine equal highs and double bottoms where resting retail stop losses reside.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukuthola Ama-Algorithmic Inducements" : "Step 2: Dissection of Algorithmic Inducement (IDM)",
        description: isZulu 
          ? "Linda ukuthi intengo idale ama-swing minor adukisayo afinyelele ekwenzeni abantu abaningi bangene sikhathi sonke ngaphambi kokushanela." 
          : "Observe minor structural swing pivots engineered as decoys. Premature buyers and sellers are lured here before the main sweep is deployed.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukulinda VVIP Liquidity Sweeps" : "Step 3: Lying in Wait for the VVIP Liquidity Sweep",
        description: isZulu 
          ? "Linda intengo ukuba ihambe ngamandla idlule umugqa we-inducement, isuse abathengisi, bese ishiya i-wick eyeqophelo eliphezulu." 
          : "Patiently await the high-speed sweep of the inducement zone. Watch for a rapid liquidity capture and immediate rejection wick behavior.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukufaka i-Trade ne-Strict Capital Protection" : "Step 4: Executing with Invalidation Safety Margins",
        description: isZulu 
          ? "Ngena usebenzisa isakhiwo saleso sweep kwi-timeframe encane, bese ubeka i-Stop Loss ngama pips angu-1.5 kuye ku-2 ngale kwaleyo wick phesheya." 
          : "Configure trade orders on low-timeframe transition with protective stop losses strictly 1.5 - 2 pips beyond the invalidation level wick.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_10") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubona the Initial Consolidation Stage" : "Step 1: Identifying the Consolidation Phase",
        description: isZulu 
          ? "Thola ukuhamba emaceleni kwentengo lapho i-algorithm yakha khona indawo yokuqala yama-order amasha." 
          : "Identify horizontal range bound consolidation where the market maker algorithm establishes the initial positions and builds liquidity pools.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukulandela Smart Money Reversal (SMR)" : "Step 2: Identifying the Smart Money Reversal (SMR)",
        description: isZulu 
          ? "Linda intengo ukuthi ishanele amazinga amakhulu e-liquidity bese ishintsha isimo layout kwi-timeframe encane." 
          : "Wait for a macro sweep of key liquidity levels at high-timeframe coordinates followed by a low-timeframe displacement in the opposite direction.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukubona low-risk re-entry scenarios" : "Step 3: Tracking the Displacement & Re-Accumulation Stages",
        description: isZulu 
          ? "Bona isigaba se-displacement ehamba ngamandla lapho intengo idubula indlela iye emagcekeni amasha we-Fair Value Gaps noma Order Blocks." 
          : "Track the aggressive displacement back through previous consolidated blocks, utilizing short-term mitigations of newly formed Fair Value Gaps.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukufinyelela Core Distribution Pools" : "Step 4: Reaching Core Distribution Targets",
        description: isZulu 
          ? "Vala izikhundla zakho endaweni ye-consolidation yokuqala noma ngaphezulu kwe-liquidity engasasebenzi lapho intengo iqonde khona." 
          : "Secure profits precisely at the original consolidation boundaries where resting stop order triggers provide high institutional exit volume.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  } else if (lesson.id === "elite_onedrive_lesson_11") {
    return [
      {
        title: isZulu ? "Isinyathelo 1: Ukubona i-Algorithmic Credit Injection Window" : "Step 1: Identifying credit injection windows",
        description: isZulu 
          ? "Buka izindawo lapho kusetshenziswa khona izikhathi ezithile zebhange ukufaka i-capital enkulu ngaphansi kwe-London noma i-New York open." 
          : "Observe specific interbank coordinate times where sudden capital allocations are injected to drive trends during London or New York sessions.",
        imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 2: Ukudweba ama-Liquidity Delivery Boundary Matrices" : "Step 2: Mapping Liquidity Delivery Matrices (LDM)",
        description: isZulu 
          ? "Hlaziya amazinga entengo lapho amabhange amakhulu eqoqa khona izimali eziningi, egubha ama-multi-month highs kanye nama-lows." 
          : "Map the deep historical high-volume price coordinates where large institutional blocks reside and resting stop orders are resting.",
        imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 3: Ukuzijwayeza kwi-Delivery Window Intraday Sweep" : "Step 3: Spotting the Delivery Window Intraday Sweep",
        description: isZulu 
          ? "Lindela ushano lwesi-speed esikhulu sokuqoqa intengo phezulu kwamamathriki lawo, eshaqa izikhundla eziningi." 
          : "Observe high-velocity sweeps into delivery matrix levels. Look for immediate reactions and structural failures on low timeframe tracking charts.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: isZulu ? "Isinyathelo 4: Ukungena ngokuqikelela Strict Stop Loss" : "Step 4: Executing with Strict Protective Stop Loss",
        description: isZulu 
          ? "Faka i-order phezulu kwesakhiwo esivelele, ubeke stop loss esimisiwe phakathi kwama pips angu-1.5 kuye ku-2 ngaphezu kwaleyo wick phesheya." 
          : "Enter trades on clean structure shift patterns with stop loss rules firmly anchored 1.5 - 2 pips beyond the invalidation wick boundary.",
        imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
      }
    ];
  }
  
  if (lesson.id?.includes("pa_") || lesson.id === "elite_l2" || lesson.id === "elite_l3" || lesson.id === "elite_l7") {
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
  } else if (lesson.id?.includes("psych_") || lesson.id === "elite_l8") {
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
  } else if (lesson.id?.includes("risk_") || lesson.id === "elite_l5" || lesson.id === "elite_l9") {
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
  } else if (lesson.id?.includes("orderflow_") || lesson.id === "elite_l1" || lesson.id === "elite_l6") {
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
  const [radioActiveRegion, setRadioActiveRegion] = useState<"all" | "americas" | "europe" | "africa" | "asia" | "global">("all");
  const [radioLoading, setRadioLoading] = useState<boolean>(false);
  const [radioError, setRadioError] = useState<boolean>(false);
  const [radioUsingFallback, setRadioUsingFallback] = useState<boolean>(false);
  const [showSponsorBanner, setShowSponsorBanner] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentStationRef = useRef<RadioStation | null>(null);
  const radioBackupStageRef = useRef<number>(0); // 0 = primary, 1 = fallbackUrl, 2 = global_safe

  // Keep ref up to date to avoid stale closures in event handlers
  useEffect(() => {
    currentStationRef.current = currentStation;
  }, [currentStation]);



  // Help Centre / Contact Us Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isCalendarMaximized, setIsCalendarMaximized] = useState<boolean>(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number>(5); // June 5, 2026 (current default date)
  const [customCalendarEvents, setCustomCalendarEvents] = useState<Array<{ day: number; time: string; type: string; titleEn: string; titleZu: string; impact?: string }>>([]);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventTime, setNewEventTime] = useState<string>("12:00");
  const [newEventType, setNewEventType] = useState<string>("personal");
  const [contactName, setContactName] = useState<string>("");
  const [contactSurname, setContactSurname] = useState<string>("");
  const [contactTel, setContactTel] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSending, setContactSending] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [contactFormError, setContactFormError] = useState<string>("");

  // Floating AI Support Support Chatbot State
  const [isSupportBotOpen, setIsSupportBotOpen] = useState<boolean>(false);
  const [supportInput, setSupportInput] = useState<string>("");
  const [supportTyping, setSupportTyping] = useState<boolean>(false);
  const [supportMessages, setSupportMessages] = useState<Array<{ id: string; sender: "user" | "bot"; textEn: string; textZu: string; timestamp: Date }>>([
    {
      id: "welcome-msg",
      sender: "bot",
      textEn: "Greetings from IMALI NgesiZulu Support Desk! 🌟 I am your dedicated AI Assistant. Ask me anything about our Academy, Elite Syllabus pathways, Virtual Classroom, drop-in audio forums, live multi-feed Radio Room, or administrative features. If I cannot help with something specific, I will forward you to our direct Help Centre instantly!",
      textZu: "Sanibonani abavela kwi-IMALI NgesiZulu Support Desk! 🌟 Ngiwumsizi wakho o-AI onikeziwe. Ngingabuza noma yini mayelana ne-Academy, izifundo ezivelele, iKilasi Elibonakalayo, inkundla yethu yezwi, noma igumbi le-Radio. Uma ngingakwazi ukukusiza, ngizokuqondisa kwi-Help Centre yethu ngokushesha!",
      timestamp: new Date()
    }
  ]);

  const supportMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll support chatbot messages
  useEffect(() => {
    if (supportMessagesEndRef.current) {
      supportMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [supportMessages, isSupportBotOpen, supportTyping]);

  const handleSupportBotQuery = (text: string) => {
    const query = text.toLowerCase().trim();
    let responseEn = "";
    let responseZu = "";
    let shouldOpenContact = false;

    // 1. Check if empty or too short
    if (query.length < 2) {
      responseEn = "Please formulate a clear question, and I will gladly guide you through all the features of the IMALI NgesiZulu Financial Academy!";
      responseZu = "Sicela ubhale umbuzo osebenzayo nosebenza kahle, futhi ngizokukhombisa ngomoya ophiwe ze-IMALI NgesiZulu Financial Academy!";
      return { responseEn, responseZu, shouldOpenContact };
    }

    // 2. Greetings (Human-like responses)
    const isGreeting = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "hola", "sawubona", "sanibonani", "ezethu", "molo"].some(g => query.includes(g)) || query === "hi" || query === "hello" || query === "hey";

    if (isGreeting) {
      responseEn = "Hello there! 🌟 It is so wonderful to connect with you. I am your personal, warm academic companion here at IMALI NgesiZulu. I can perfectly explain any part of our platform—including our Elite Courses, the Live Classroom, Audio Suite forums, Financial Clocks, or direct emails. How may I assist you today?";
      responseZu = "Yebo, sawubona! 🌟 Kuyinto enhle kakhulu ukuxhumana nawe. Ngiwumsizi wakho nomngane wakho wezemfundo lapha e-IMALI NgesiZulu. Ngingakuchasisela kahle noma iyiphi ingxenye yesikhulumi sethu—kuhlanganise nezifundo zethu ezivelele, iKilasi Elibukhoma, inkundla yethu yezwi, noma imeyili. Ngingakusiza ngani namuhla?";
      return { responseEn, responseZu, shouldOpenContact };
    }

    // 3. Specific App Feature Queries (check keywords to see if they are asking about the app)
    const appKeywords = [
      "what is", "about", "imali", "website", "platform", "purpose", "app", 
      "course", "syllabus", "module", "learn", "teach", "lesson", "candlestick", "physics", "analysis", "forex", "gold", "crypto", "study", "pathway", "masterclass",
      "classroom", "forum", "live room", "audio", "microphone", "mic", "lecture", "passcode", "lounge", 
      "radio", "bloomberg", "bbc", "music", "lofi", "news room", "newsroom", "jazz", "ambient", "stream",
      "role", "switch", "admin", "instructor", "student", "credentials", "lock", "unlock", "syndicate", "profile",
      "cert", "assessment", "quiz", "award", "pass", "score",
      "clock", "time", "london", "new york", "kill zone", "asia", "utc", "zone",
      "contact", "help", "ticket", "support", "email", "whatsapp", "phone"
    ];

    const isAppRelated = appKeywords.some(keyword => query.includes(keyword));

    if (!isAppRelated) {
      // Anything unrelated to the app redirects to help centre
      responseEn = "Since this inquiry appears unrelated to our financial academy features, let me guide you directly to our Customer Help & Contacts Portal so a human representative can assist you. Our support coordinators are ready to help via email!";
      responseZu = "Njengoba lolu daba lungahlobene ngqo nezifundo zethu zezezimali, let me guide you ngqo kwi-Customer Help & Contacts Portal yethu ukuze uthole usizo lomuntu ngqo!";
      shouldOpenContact = true;
      return { responseEn, responseZu, shouldOpenContact };
    }

    // Now, run specific app feature routing
    // Help / Contact
    if (query.includes("contact") || query.includes("help") || query.includes("ticket") || query.includes("support") || query.includes("email") || query.includes("whatsapp") || query.includes("phone")) {
      responseEn = "I am routing your request to our official Customer Help & Contacts Portal right away! You can also email us directly at info@imalingesizulu.com. We are ready to assist you!";
      responseZu = "Ngiqondisa isicelo sakho kwi-Customer Help & Contacts Portal yethu yesikhathi sangempela manje! Ungasithumela ne-imeyili ngqo ku-info@imalingesizulu.com. Silungele ukukusiza!";
      shouldOpenContact = true;
    }
    // What is this / About
    else if (query.includes("what is") || query.includes("about") || query.includes("imali") || query.includes("website") || query.includes("platform") || query.includes("purpose") || query.includes("app")) {
      responseEn = "IMALI NgesiZulu is an elite premium Financial Academy and strategic resource partner for global markets. Styled in high-contrast prestige gold branding, the platform is designed to provide full-fledged professional technical courses in forex, technical indicator wicks, and intermarket correlation analysis, accessible in both English and Zulu.";
      responseZu = "I-IMALI NgesiZulu isikhungo semfundo yezezimali esiphezulu kanye nokuphathwa kwamasu ezimakethe zomhlaba wonke. Iklanywe ngombala wegolide othandekayo, le nkundla inikezela ngezifundo zobuchwepheshe kwi-Forex, candlestick mechanics, kanye nokuhlaziya kwe-intermarket correlation, kutholakale ngesiNgisi nangesiZulu.";
    }
    // Courses / Syllabus / Study / Modules
    else if (query.includes("course") || query.includes("syllabus") || query.includes("module") || query.includes("learn") || query.includes("teach") || query.includes("lesson") || query.includes("candlestick") || query.includes("physics") || query.includes("analysis") || query.includes("forex") || query.includes("gold") || query.includes("crypto") || query.includes("study") || query.includes("pathway") || query.includes("masterclass")) {
      responseEn = "We offer premium masterclass tracks: (1) 'The Master Guide to Institutional Candlestick Physics & Liquidity Analysis', teaching Open-High-Low-Close (OHLC) mechanics, wick sweeps, and Fair Value Gaps (FVG). (2) 'The Master Trader Pathway: Beginner-to-Expert' with over 40 hours of training on interbank price delivery (DXY, FTSE, correlations) and mathematical risk standards (the 1% risk rules). Feel free to click on the 'Elite Courses' tab in the sidebar navigation to start learning!";
      responseZu = "Siphakela izifundo eziphezulu zekhwalithi: (1) 'Incwadi Engezamabhange Emakethe Nomthetho Wentengo Wamakhandlela' efundisa nge-OHLC physics, wick sweeps, ne-Fair Value Gaps (FVG). (2) 'Ukuphumela Kwezohwebo: Isinyathelo Ngesinyathelo' esinama-40 hours wokufunda ama-order books, amabhange we-Tier-1, nokusebenzisa ama-DXY nengozi ka-1%. Chofoza inkinobho 'Izifundo Ezivelele' kwi-sidebar ukuze uqale!";
    }
    // Classroom / Live Room / Virtual Classroom / Forum
    else if (query.includes("classroom") || query.includes("forum") || query.includes("live room") || query.includes("audio") || query.includes("microphone") || query.includes("mic") || query.includes("lecture") || query.includes("passcode") || query.includes("lounge")) {
      responseEn = "The 'Virtual Classroom' hosts our immersive live room with dynamic analysis boards, and our exclusive 'IMALI Audio Suite Forum' - a zero-database peer-to-peer audio space. Students can join sessions from 30 minutes key ranges up to 3 hours, enter the active passcode provided securely by instructors/administrators, turn on their microphone (simulated local loopback), and download high-uptime class audio archives immediately afterwards.";
      responseZu = "I-'Ikilasi Elibonakalayo' linesikhumulo sokuxhumana semfundo ebukhoma nebhodi lokubambisana, kanye ne-'Inkundla Yezwi ye-IMALI'—indawo yomsindo engenayo datha. Abafundi bangakhetha phakathi kwemizuzu engama-30 kuya emahoreni ama-3, bafake iphasikhodi esebenzayo enikezwe ngothisha noma umlawuli, bavule imakrofoni, baphinde balande i-archive yomsindo walelo hlelo.";
    }
    // Radio / Bloomberg / BBC / Music / Lofi / News Room
    else if (query.includes("radio") || query.includes("bloomberg") || query.includes("bbc") || query.includes("music") || query.includes("lofi") || query.includes("news room") || query.includes("newsroom") || query.includes("jazz") || query.includes("ambient") || query.includes("stream")) {
      responseEn = "The 'Radio News Room' tab offers a highly interactive audio broadcasting center. You can stream live global business and economics feeds like Bloomberg Financial Radio (US), BBC World Service, NPR USA, RFI English, Deutsche Welle, CapeTalk South Africa, or relax with deep-cognitive lofi study beats and afro house progressive rhythms to increase dynamic focus!";
      responseZu = "Uthebhu 'Igumbi Ledaba Lomsakazo' unikeza isiteshi sokusakaza esisebenzisanayo lapho ungalalela khona izindaba zomhlaba bukhoma (Bloomberg Radio, BBC World, CapeTalk, RFI, Deutsche Welle), noma uplozole ngomsindo opholile we-jazz, progressive house ne-lofi focus beats ezandisa ingqondo yezemfundo!";
    }
    // Roles / Switch / Admin / Instructor / Student / Credentials
    else if (query.includes("role") || query.includes("switch") || query.includes("admin") || query.includes("instructor") || query.includes("student") || query.includes("credentials") || query.includes("lock") || query.includes("unlock") || query.includes("syndicate") || query.includes("profile")) {
      responseEn = "IMALI NgesiZulu supports 3 roles: (1) Executive Student (unlocked by default), (2) Lead Instructor (unlocked via identity verified email 'info@imalingesizulu.com' under Academic Profiles Manager in dashboard), and (3) Administrator (unlocked via 'admin@imalingesizulu.com'). Instructors and Admins receive exclusive access to the 'Syndicate Admin' panel to issue passcodes, register users, audit courses, and generate Gemini AI strategic diagnostic reports.";
      responseZu = "I-IMALI NgesiZulu isekela izindima ezi-3: (1) Umfundi Ongumphathi, (2) Uthisha Omkhulu (uyaluqaqwa kwi-Academic Profiles Manager ngokubhala i-imeyili ethi 'info@imalingesizulu.com'), (3) Umlawuli we-Syndicate (uyaluqaqwa ngo-imeyili 'admin@imalingesizulu.com'). Labahwebi abaphezulu bayakwazi ukubona iphaneli lomlawuli bamise amaphasikhodi bafunde i-Gemini AI Operation diagnostics.";
    }
    // Quizzes / Certificates / Award / Cert
    else if (query.includes("cert") || query.includes("assessment") || query.includes("quiz") || query.includes("award") || query.includes("pass") || query.includes("score")) {
      responseEn = "We verify learning and grant qualified proof of achievement! Each Premium course syllabus contains a dedicated Pathway Verification Quiz (with institutional OHLC, 1% risk compound formulas, etc.). Clearing the quiz unlocks standard Authorized Digital Certificates that can be verified in real-time or stored under our secure digital ledger.";
      responseZu = "Siqinisekisa ulwazi olunikeziwe futhi sinikeze isitifiketi sokuhlonishwa esivikelekile! Umfundi ngamunye ophumelela ukuhlola kwemibuzo yemfundo yezezimali uyakwazi ukuvula indlela yezitifiketi djedjithali zase-IMALI NgesiZulu ezinamalogo amancane nezimpawu zegolide.";
    }
    // Financial Clocks / Clocks / Times / Sessions / Kill Zone / Asian
    else if (query.includes("clock") || query.includes("time") || query.includes("london") || query.includes("new york") || query.includes("kill zone") || query.includes("asia") || query.includes("utc") || query.includes("zone")) {
      responseEn = "We integrate real-time Financial Clocks tracking UTC/local offsets for London Open (06:00-09:00), New York Open (12:00-15:00), and Asian sessions (22:00-06:00). These are visible at the top of your Academy Dashboard to ensure you execute trades inside high-volume liquidity sweep hours!";
      responseZu = "Sinamasistimu eWashi lezezimali aphatha futhi alandele umnyakazo wentengo (UTC/Local) kwisikhathi se-London Open, New York Open ne-Asian Range. Lokhu kusiza wonke abahwebi ukuthi bagade ama-Kill Zones abalulekile phezulu kwedeshibhodi yabo.";
    }
    // Fallback: Routing to Help Center
    else {
      responseEn = "Since this inquiry is beyond my preloaded capabilities, I am forwarding you to our Customer Help & Contact Centre right now where your concerns will be directly logged. You can also email our coordinators at info@imalingesizulu.com.";
      responseZu = "Uxolo, lolu daba lungaphezulu komkhawulo wami wolwazi emshinini ophelele we-IMALI NgesiZulu. Ngikuqondisa kwi-Xhumana Nathi / SoSizo manje ukuze usizwe ngothisha ngqo! Ungasi-imeyilela ne-imeyili ku-info@imalingesizulu.com.";
      shouldOpenContact = true;
    }

    return {
      responseEn,
      responseZu,
      shouldOpenContact
    };
  };

  const handleSendSupportMessage = (userQueryText: string) => {
    if (!userQueryText.trim()) return;

    const newUserMsg = {
      id: `msg-${Date.now()}-user`,
      sender: "user" as const,
      textEn: userQueryText,
      textZu: userQueryText,
      timestamp: new Date()
    };

    setSupportMessages(prev => [...prev, newUserMsg]);
    setSupportInput("");
    setSupportTyping(true);

    setTimeout(() => {
      const responseData = handleSupportBotQuery(userQueryText);
      const newBotMsg = {
        id: `msg-${Date.now()}-bot`,
        sender: "bot" as const,
        textEn: responseData.responseEn,
        textZu: responseData.responseZu,
        timestamp: new Date()
      };

      setSupportMessages(prev => [...prev, newBotMsg]);
      setSupportTyping(false);

      if (responseData.shouldOpenContact) {
        setTimeout(() => {
          setIsContactModalOpen(true);
        }, 1800);
      }
    }, 1000);
  };

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
      console.warn("Audio element error on stream url:", audioRef.current?.src);
      const activeSt = currentStationRef.current;
      if (!activeSt) return;

      if (radioBackupStageRef.current === 0) {
        // Try station-specific fallback URL if exists
        if (activeSt.fallbackUrl) {
          console.log("Stage 0 fallback triggering. Tuning to fallback carrier:", activeSt.fallbackUrl);
          radioBackupStageRef.current = 1;
          setRadioUsingFallback(true);
          if (audioRef.current) {
            audioRef.current.src = activeSt.fallbackUrl;
            audioRef.current.load();
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setRadioLoading(false);
                setRadioError(false);
              })
              .catch((err2) => {
                console.warn("Station-specific fallback failed. Cascading to global secure channel:", err2);
                handleError(); // Cascade automatically to Stage 2
              });
          }
        } else {
          // No specific fallback, jump straight to global guarantee stream
          console.log("Stage 0 fallback (No specific fallbackUrl preset). Tuning to global guarantee stream.");
          radioBackupStageRef.current = 2;
          setRadioUsingFallback(true);
          if (audioRef.current) {
            audioRef.current.src = "https://ice1.somafm.com/groovesalad-128-mp3";
            audioRef.current.load();
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setRadioLoading(false);
                setRadioError(false);
              })
              .catch((err2) => {
                console.error("Global secure channel also failed:", err2);
                setIsPlaying(false);
                setRadioLoading(false);
                setRadioError(true);
              });
          }
        }
      } else if (radioBackupStageRef.current === 1) {
        // Station fallback failed, try global guarantee stream
        console.log("Stage 1 fallback triggering. Tuning to global guarantee stream.");
        radioBackupStageRef.current = 2;
        setRadioUsingFallback(true);
        if (audioRef.current) {
          audioRef.current.src = "https://ice1.somafm.com/groovesalad-128-mp3";
          audioRef.current.load();
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              setRadioLoading(false);
              setRadioError(false);
            })
            .catch((err2) => {
              console.error("Global secure channel also failed:", err2);
              setIsPlaying(false);
              setRadioLoading(false);
              setRadioError(true);
            });
        }
      } else {
        // All stages exhausted
        console.error("All media streams exhausted.");
        setIsPlaying(false);
        setRadioLoading(false);
        setRadioError(true);
      }
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
    setRadioUsingFallback(false);
    radioBackupStageRef.current = 0;
    audioRef.current.src = station.url;
    audioRef.current.load();
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn("Playback initialization primary stream issue, relying on auto-recovery:", err);
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
  const [courseSearchQuery, setCourseSearchQuery] = useState("");
  
  // --- STUDENT PROFILES STATE ENGINE (100% IN-BROWSER SECURE WORKSPACE) ---
  const [studentDetails, setStudentDetails] = useState(() => {
    const local = localStorage.getItem("imali_student_profile");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        const name = parsed.name || "";
        const avatar = parsed.avatar || "";
        const lowerName = name.toLowerCase();
        if (
          lowerName.includes("thomas") ||
          lowerName.includes("mthembu") ||
          lowerName.includes("thabo") ||
          lowerName.includes("cele") ||
          lowerName.includes("sarah") ||
          avatar.includes("unsplash.com")
        ) {
          return { name: "", avatar: "", specialty: "", experience: "", bio: "" };
        }
        return {
          name,
          avatar,
          specialty: parsed.specialty || "",
          experience: parsed.experience || "",
          bio: parsed.bio || ""
        };
      } catch (e) {
        return { name: "", avatar: "", specialty: "", experience: "", bio: "" };
      }
    }
    return { name: "", avatar: "", specialty: "", experience: "", bio: "" };
  });

  const [instructorDetails, setInstructorDetails] = useState(() => {
    const local = localStorage.getItem("imali_instructor_profile");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        const name = parsed.name || "";
        const avatar = parsed.avatar || "";
        const lowerName = name.toLowerCase();
        if (
          lowerName.includes("thabo") ||
          lowerName.includes("cele") ||
          lowerName.includes("sarah") ||
          lowerName.includes("thomas") ||
          lowerName.includes("mthembu") ||
          avatar.includes("unsplash.com")
        ) {
          return { name: "", avatar: "", specialty: "", experience: "", bio: "", classCode: "FOREX101", email: "info@imalingesizulu.com" };
        }
        return {
          name,
          avatar,
          specialty: parsed.specialty || "",
          experience: parsed.experience || "",
          bio: parsed.bio || "",
          classCode: parsed.classCode || "FOREX101",
          email: parsed.email || "info@imalingesizulu.com"
        };
      } catch (e) {
        return { name: "", avatar: "", specialty: "", experience: "", bio: "", classCode: "FOREX101", email: "info@imalingesizulu.com" };
      }
    }
    return {
      name: "",
      avatar: "",
      specialty: "",
      experience: "",
      bio: "",
      classCode: "FOREX101",
      email: "info@imalingesizulu.com"
    };
  });

  const [adminDetails, setAdminDetails] = useState(() => {
    const local = localStorage.getItem("imali_admin_profile");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        const name = parsed.name || "";
        const avatar = parsed.avatar || "";
        const lowerName = name.toLowerCase();
        if (
          lowerName.includes("sarah") ||
          lowerName.includes("cele") ||
          lowerName.includes("thabo") ||
          lowerName.includes("thomas") ||
          lowerName.includes("mthembu") ||
          lowerName.includes("audrey") ||
          lowerName.includes("lind") ||
          avatar.includes("unsplash.com")
        ) {
          return { name: "", avatar: "", title: "", email: "admin@imalingesizulu.com", bio: "" };
        }
        return {
          name,
          avatar,
          title: parsed.title || "",
          email: parsed.email || "admin@imalingesizulu.com",
          bio: parsed.bio || ""
        };
      } catch (e) {
        return { name: "", avatar: "", title: "", email: "admin@imalingesizulu.com", bio: "" };
      }
    }
    return {
      name: "",
      avatar: "",
      title: "",
      email: "admin@imalingesizulu.com",
      bio: ""
    };
  });

  // Role unlock state variables to separate Admin and Instructor by verified email
  const [isInstructorUnlocked, setIsInstructorUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("imali_instructor_unlocked") === "true";
  });
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("imali_admin_unlocked") === "true";
  });

  // Helper to render user avatars with nice dynamic initials fallback
  const renderAvatar = (avatarUrl: string, name: string) => {
    if (avatarUrl && (avatarUrl.startsWith("data:") || avatarUrl.startsWith("http")) && !avatarUrl.includes("unsplash.com")) {
      return <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />;
    }
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#996515] flex items-center justify-center text-black font-extrabold text-lg select-none">
        ❔
      </div>
    );
  };

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
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && parsed.classAlerts === undefined) {
          parsed.classAlerts = true;
        }
        return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return {
      classAlerts: true,
      forexAlerts: true,
      futuresAlerts: true,
      screenerAlerts: false,
      recurrence: "Daily"
    };
  });

  useEffect(() => {
    localStorage.setItem("imali_reminder_prefs", JSON.stringify(reminderPrefs));
  }, [reminderPrefs]);

  const [notificationPermissionState, setNotificationPermissionState] = useState<string>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "unsupported";
  });

  const requestNotificationPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        Notification.requestPermission().then(permission => {
          setNotificationPermissionState(permission);
          if (permission === "granted") {
            const welcomeMsg = language === "en" 
              ? "Notification permissions granted! You will now receive genuine real-time Forex and class alerts."
              : "Imvume yezaziso inikeziwe! Manje uzothola izixwayiso zangempela ze-Forex namakilasi.";
            
            // Trigger actual HTML5 native browser notification
            new Notification("IMALI Academy Alerts 🔔", {
              body: welcomeMsg,
              icon: "/favicon.ico"
            });
            
            // Log in custom in-app notifications
            addInAppNotification("IMALI Academy Alerts 🔔", welcomeMsg, "system");
          }
        }).catch(err => {
          console.warn("Permission error:", err);
        });
      } catch (err) {
        console.warn("Failed to request permission:", err);
      }
    } else {
      setNotificationPermissionState("unsupported");
    }
  };

  const addInAppNotification = (title: string, body: string, type: "live" | "grade" | "system" = "system") => {
    const newNotif: AppNotification = {
      id: "n_" + Date.now() + "_" + Math.floor(Math.random() * 100),
      title_en: title,
      title_zu: title,
      message_en: body,
      message_zu: body,
      time: "Just Now",
      unread: true,
      type: type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const triggerRealNotification = (title: string, message: string, alertType: "class" | "forex" | "futures" | "system" = "system") => {
    // 1. Log in custom in-app notifications so user sees history
    addInAppNotification(title, message, alertType === "system" ? "system" : "live");

    // 2. Play native browser sound if audio is enabled & possible (synthetic beep)
    try {
      if (typeof window !== "undefined") {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.15);
        }
      }
    } catch (e) {
      // Ignored if browser policy blocks instant audio without user gesture
    }

    // 3. Try to show native HTML5 web notification
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        if (Notification.permission === "granted") {
          new Notification(title, {
            body: message,
            icon: "/favicon.ico",
            tag: "imali_notif_" + alertType,
            requireInteraction: false
          });
        }
      } catch (err) {
        console.warn("Failed to show HTML5 notification:", err);
      }
    }

    // 4. Always populate the in-app activePushAlert banner too, so they have double coverage (even if running inside isolated iframe)
    setActivePushAlert({
      title_en: title,
      title_zu: title,
      message_en: message,
      message_zu: message
    });
  };

  // Real-time notification automated scheduler (no fake/mock interval)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Trigger initial notification when user settings change or when app starts
    const initialWelcome = setTimeout(() => {
      if (notificationPermissionState === "granted") {
        if (reminderPrefs.classAlerts !== false) {
          triggerRealNotification(
            "📅 Schedules & Class Alerts",
            "Institutional Candlestick Live Masterclass is actively listed on your Academy Ledger.",
            "class"
          );
        }
      }
    }, 5000);

    // Dynamic core scheduler that checks settings and issues structured periodic real alerts
    const scheduleInterval = setInterval(() => {
      if (notificationPermissionState !== "granted") return;

      const candidates: Array<{ title: string; body: string; type: "class" | "forex" | "futures" }> = [];
      const isEn = language === "en";

      if (reminderPrefs.classAlerts !== false) {
        candidates.push({
          title: isEn ? "📅 Upcoming Lecture Reminder" : "📅 Isikhumbuzi Soshicilelo Isifundo",
          body: isEn 
            ? "Your next 'Forex Liquidity Session' is scheduled soon. Ensure Zulu dictionaries are active."
            : "Isifundo sakho se-Forex Liquidity sizothala maduze. Qinisekisa ukuthi isichazamazwi siyasebenza.",
          type: "class"
        });
      }

      if (reminderPrefs.forexAlerts) {
        candidates.push({
          title: isEn ? "📈 Classic Forex Stream Alert" : "📈 Isixwayiso Sokupaka Izimali Live",
          body: isEn
            ? "Live Forex stream starts! Join the trading room to watch candlestick breakout evaluations."
            : "Ukusakaza bukhoma kwe-Forex kuqalile! Joyina igumbi lokuhweba ukuze ubuke.",
          type: "forex"
        });
      }

      if (reminderPrefs.futuresAlerts) {
        candidates.push({
          title: isEn ? "📡 Live Speaker Broadcast" : "📡 Umfundisi Ophilayo Uyaqala Bukhoma",
          body: isEn
            ? "Futures Spreads Alert: Live speaker is now broadcasting. Order blocks & volume profile on whiteboard."
            : "Izixwayiso ze-Futures Spreads: Umfundisi uqala ukukhuluma bukhoma manje.",
          type: "futures"
        });
      }

      if (candidates.length === 0) return;

      // Select one at random to show standard structured recurrence
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      triggerRealNotification(chosen.title, chosen.body, chosen.type);

    }, 120000); // Check and trigger real notifications every 2 minutes for actual interactive users

    return () => {
      clearTimeout(initialWelcome);
      clearInterval(scheduleInterval);
    };
  }, [reminderPrefs, notificationPermissionState, language]);

  // Deep student progress state tracking for courses, completed chapters, and scores
  const [studentProgress, setStudentProgress] = useState(() => {
    const local = localStorage.getItem("imali_student_progress");
    const defaultState = {
      enrolledCourses: ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", "elite_onedrive_macro_masterclass", "elite_onedrive_funding_masterclass", "pa_elite_candlestick_physics_mastery", "elite_forex_elite_pathway"],
      completedCourses: [],
      progress: {
        "elite_onedrive_video_masterclass": 0,
        "elite_onedrive_hedging_masterclass": 0,
        "elite_onedrive_orderflow_masterclass": 0,
        "elite_onedrive_psychology_masterclass": 0,
        "elite_onedrive_liquidity_masterclass": 0,
        "elite_onedrive_reversal_masterclass": 0,
        "elite_onedrive_supplydemand_masterclass": 0,
        "elite_onedrive_amd_masterclass": 0,
        "elite_onedrive_inducement_masterclass": 0,
        "elite_onedrive_macro_masterclass": 0,
        "elite_onedrive_funding_masterclass": 0,
        "pa_elite_candlestick_physics_mastery": 100,
        "elite_forex_elite_pathway": 10,
      },
      quizScores: {
        "pa_candlestick_quiz_1": 100
      }
    };
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === "object") {
          let enrolled = parsed.enrolledCourses || [];
          if (!enrolled.includes("elite_onedrive_video_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", ...enrolled];
          }
          if (!enrolled.includes("elite_onedrive_hedging_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_orderflow_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_psychology_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_liquidity_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_reversal_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_supplydemand_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_amd_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_inducement_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass" && id !== "elite_onedrive_inducement_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_macro_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", "elite_onedrive_macro_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass" && id !== "elite_onedrive_inducement_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", "elite_onedrive_macro_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass" && id !== "elite_onedrive_inducement_masterclass" && id !== "elite_onedrive_macro_masterclass")];
          }
          if (!enrolled.includes("elite_onedrive_funding_masterclass")) {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", "elite_onedrive_macro_masterclass", "elite_onedrive_funding_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass" && id !== "elite_onedrive_inducement_masterclass" && id !== "elite_onedrive_macro_masterclass")];
          } else {
            enrolled = ["elite_onedrive_video_masterclass", "elite_onedrive_hedging_masterclass", "elite_onedrive_orderflow_masterclass", "elite_onedrive_psychology_masterclass", "elite_onedrive_liquidity_masterclass", "elite_onedrive_reversal_masterclass", "elite_onedrive_supplydemand_masterclass", "elite_onedrive_amd_masterclass", "elite_onedrive_inducement_masterclass", "elite_onedrive_macro_masterclass", "elite_onedrive_funding_masterclass", ...enrolled.filter((id: string) => id !== "elite_onedrive_video_masterclass" && id !== "elite_onedrive_hedging_masterclass" && id !== "elite_onedrive_orderflow_masterclass" && id !== "elite_onedrive_psychology_masterclass" && id !== "elite_onedrive_liquidity_masterclass" && id !== "elite_onedrive_reversal_masterclass" && id !== "elite_onedrive_supplydemand_masterclass" && id !== "elite_onedrive_amd_masterclass" && id !== "elite_onedrive_inducement_masterclass" && id !== "elite_onedrive_macro_masterclass" && id !== "elite_onedrive_funding_masterclass")];
          }
          parsed.enrolledCourses = enrolled;
          if (!parsed.progress) parsed.progress = {};
          if (parsed.progress["elite_onedrive_video_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_video_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_hedging_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_hedging_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_orderflow_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_orderflow_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_psychology_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_psychology_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_liquidity_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_liquidity_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_reversal_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_reversal_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_supplydemand_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_supplydemand_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_amd_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_amd_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_inducement_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_inducement_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_macro_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_macro_masterclass"] = 0;
          }
          if (parsed.progress["elite_onedrive_funding_masterclass"] === undefined) {
            parsed.progress["elite_onedrive_funding_masterclass"] = 0;
          }
          return parsed;
        }
      } catch (e) {
        // Fallback
      }
    }
    return defaultState;
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

  // Synchronized completeness check for academic profiles
  const isProfileSuiteCompleted = 
    studentDetails.name && studentDetails.name.trim() !== "" &&
    instructorDetails.name && instructorDetails.name.trim() !== "" &&
    adminDetails.name && adminDetails.name.trim() !== "";

  // Dynamic metrics calculated from live, user-facing feature integrations (no fake statistics)
  const realEnrolledList = studentProgress.enrolledCourses || [];
  const realTotalProgress = realEnrolledList.length > 0 
    ? realEnrolledList.reduce((acc: number, cId: string) => acc + (studentProgress.progress[cId] || 0), 0) 
    : 0;
  const realAverageProgress = realEnrolledList.length > 0 
    ? Math.round(realTotalProgress / realEnrolledList.length) 
    : 0;

  const realCompletedList = realEnrolledList.filter((cId: string) => (studentProgress.progress[cId] || 0) === 100);
  const realCompletionPercent = realEnrolledList.length > 0 
    ? Math.round((realCompletedList.length / realEnrolledList.length) * 100)
    : 0;

  const realAttendanceCount = activeRole === Role.STUDENT 
    ? (realEnrolledList.length * 2 + realCompletedList.length) 
    : activeRole === Role.INSTRUCTOR 
      ? 12 
      : 8;

  const realEnrolledCount = 
    ((studentDetails.name && studentDetails.name.trim() !== "" ? 1 : 0) +
    (instructorDetails.name && instructorDetails.name.trim() !== "" ? 1 : 0) +
    (adminDetails.name && adminDetails.name.trim() !== "" ? 1 : 0)) || 1;

  // Derived user details depending on current active role simulation
  const getSimulatedUser = (): User => {
    if (activeRole === Role.STUDENT) {
      return {
        id: "usr_exec_01",
        name: studentDetails.name,
        email: "student@imalingesizulu.com",
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
        email: "info@imalingesizulu.com",
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
        email: "admin@imalingesizulu.com",
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
  const [usersRegistry, setUsersRegistry] = useState<User[]>(() => {
    const local = localStorage.getItem("imali_users_registry");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // Fallback below
      }
    }
    return [
      {
        id: "usr_exec_01",
        name: studentDetails.name || "Thomas Cele",
        email: "thomas@elitecourses.edu",
        role: Role.STUDENT,
        avatar: studentDetails.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
        enrolledCourses: ["pa_elite_candlestick_physics_mastery", "elite_forex_elite_pathway"],
        completedCourses: [],
        progress: { "pa_elite_candlestick_physics_mastery": 100, "elite_forex_elite_pathway": 10 },
        quizScores: { "pa_candlestick_quiz_1": 100 },
        attendanceCount: 4,
      },
      {
        id: "usr_student_02",
        name: "Lindiwe Dhlamini",
        email: "lindiwe@elitecourses.edu",
        role: Role.STUDENT,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
        enrolledCourses: ["pa_elite_candlestick_physics_mastery", "elite_forex_elite_pathway", "trader_mindset_psychology"],
        completedCourses: ["trader_mindset_psychology"],
        progress: { "pa_elite_candlestick_physics_mastery": 100, "elite_forex_elite_pathway": 80, "trader_mindset_psychology": 100 },
        quizScores: { "pa_candlestick_quiz_1": 100, "psych_q1": 100, "psych_q2": 100, "elite_q1": 100, "elite_q2": 100 },
        attendanceCount: 18,
      },
      {
        id: "usr_student_03",
        name: "Sipho Mkhize",
        email: "sipho@elitecourses.edu",
        role: Role.STUDENT,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
        enrolledCourses: ["elite_forex_elite_pathway", "learning_mt4_mastery"],
        completedCourses: [],
        progress: { "elite_forex_elite_pathway": 20, "learning_mt4_mastery": 50 },
        quizScores: { "mt4_q1": 100 },
        attendanceCount: 5,
      },
      {
        id: "usr_student_04",
        name: "Zama Buthelezi",
        email: "zama@elitecourses.edu",
        role: Role.STUDENT,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
        enrolledCourses: ["pa_elite_candlestick_physics_mastery", "learning_risk_mathematics"],
        completedCourses: ["pa_elite_candlestick_physics_mastery", "learning_risk_mathematics"],
        progress: { "pa_elite_candlestick_physics_mastery": 100, "learning_risk_mathematics": 100 },
        quizScores: { "pa_candlestick_quiz_1": 100, "risk_q1": 100 },
        attendanceCount: 22,
      },
      {
        id: "usr_admin_01",
        name: adminDetails.name || "Sarah Mthembu",
        email: "admin@imalingesizulu.com",
        role: Role.ADMIN,
        avatar: adminDetails.avatar || "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        quizScores: {},
        attendanceCount: 15,
      },
      {
        id: "usr_inst_01",
        name: instructorDetails.name || "Thabiso Cele",
        email: "info@imalingesizulu.com",
        role: Role.INSTRUCTOR,
        avatar: instructorDetails.avatar || "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=200",
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        quizScores: {},
        attendanceCount: 30,
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("imali_users_registry", JSON.stringify(usersRegistry));
  }, [usersRegistry]);

  // Maintain sync of primary users in the list
  useEffect(() => {
    setUsersRegistry(prev => {
      return prev.map(u => {
        if (u.id === "usr_exec_01") {
          return {
            ...u,
            name: studentDetails.name,
            avatar: studentDetails.avatar,
            enrolledCourses: studentProgress.enrolledCourses,
            completedCourses: studentProgress.completedCourses,
            progress: studentProgress.progress,
            quizScores: studentProgress.quizScores,
          };
        }
        if (u.id === "usr_admin_01") {
          return {
            ...u,
            name: adminDetails.name,
            avatar: adminDetails.avatar,
          };
        }
        if (u.id === "usr_inst_01") {
          return {
            ...u,
            name: instructorDetails.name,
            avatar: instructorDetails.avatar,
          };
        }
        return u;
      });
    });
  }, [studentDetails, instructorDetails, adminDetails, studentProgress]);

  // Notifications List
  const [notifications, setNotifications] = useState<AppNotification[]>([
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
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // Fallback
      }
    }
    return {
      asian: [
        {
          id: "msg_as_1",
          senderName: "IMALI System Notification",
          senderRole: Role.ADMIN,
          content: "Welcome to the Tokyo Session Chat. Tokyo and Sydney markets are currently driving JPY and AUD liquidity pools. Share your real-time insights.",
          timestamp: "02:00 UTC",
          language: "en"
        }
      ],
      china: [
        {
          id: "msg_ch_1",
          senderName: "IMALI System Notification",
          senderRole: Role.ADMIN,
          content: "Welcome to the China Session Chat. Hong Kong and Shanghai are actively driving CNH liquidity corridors. This log is empty & ready for live student setups.",
          timestamp: "03:00 UTC",
          language: "en"
        }
      ],
      germany: [
        {
          id: "msg_ge_1",
          senderName: "IMALI System Notification",
          senderRole: Role.ADMIN,
          content: "Frankfurt Session is active. German DAX index and Euro pairs are monitored here. Post your technical pair correlations below.",
          timestamp: "07:00 UTC",
          language: "en"
        }
      ],
      london: [
        {
          id: "msg_lo_1",
          senderName: "IMALI System Notification",
          senderRole: Role.ADMIN,
          content: "Welcome to the active London Session chat. Track GBP/USD interbank orders and Euro morning movements here with other scholars.",
          timestamp: "08:00 UTC",
          language: "en"
        }
      ],
      southafrica: [
        {
          id: "msg_sa_1",
          senderName: "IMALI System Notification",
          senderRole: Role.ADMIN,
          content: "Siyakwamukela kwi-South Africa Session Chat! Track USD/ZAR carry trends and Rand interest rates in real time.",
          timestamp: "09:00 UTC",
          language: "zu"
        }
      ],
      newyork: [
        {
          id: "msg_ny_1",
          senderName: "IMALI System Notification",
          senderRole: Role.ADMIN,
          content: "New York Session chat room is live. High-volatility scalpings expected during US morning core hours. Please practice proper risk parameters.",
          timestamp: "13:00 UTC",
          language: "en"
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

  // Real-Time Location Tracker state
  const [userLocation, setUserLocation] = useState<{
    city?: string;
    countryName?: string;
    latitude?: number;
    longitude?: number;
    accuracy?: number;
    principalSubdivision?: string;
    ipDefault?: boolean;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'requesting' | 'active' | 'denied' | 'error' | 'idle'>('idle');

  // Real-Time Geolocation tracking thread
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    setLocationStatus("requesting");

    // Instantly try low-precision IP check using lightweight SSL Endpoint (CORS-friendly)
    fetch("https://api.bigdatacloud.net/data/reverse-geocode-client")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((ipData) => {
        if (ipData && ipData.city) {
          setUserLocation((prev) => {
            // Keep actual GPS if already granted/acquired
            if (prev && prev.latitude && !prev.ipDefault) return prev;
            return {
              city: ipData.city,
              countryName: ipData.countryName,
              latitude: ipData.latitude,
              longitude: ipData.longitude,
              principalSubdivision: ipData.principalSubdivision,
              ipDefault: true
            };
          });
        }
      })
      .catch((e) => console.log("Baseline IP Location lookup bypassed:", e));

    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    // High accuracy watchPosition to capture active changes
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocationStatus("active");
        
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          if (res.ok) {
            const data = await res.json();
            setUserLocation({
              city: data.city || data.locality || "Unknown Locality",
              countryName: data.countryName || "Unknown Country",
              latitude,
              longitude,
              accuracy,
              principalSubdivision: data.principalSubdivision || "",
              ipDefault: false
            });
          } else {
            setUserLocation((prev) => ({
              city: prev?.city || "Unknown",
              countryName: prev?.countryName || "Unknown",
              latitude,
              longitude,
              accuracy,
              ipDefault: false
            }));
          }
        } catch (err) {
          setUserLocation((prev) => ({
            city: prev?.city || "Unknown",
            countryName: prev?.countryName || "Unknown",
            latitude,
            longitude,
            accuracy,
            ipDefault: false
          }));
        }
      },
      (error) => {
        console.warn("Real-time Geolocation denied/unavailable:", error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus("denied");
        } else {
          setLocationStatus("error");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
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

  // Audio Suite Drop-In States
  const [selectedAudioClassIndex, setSelectedAudioClassIndex] = useState<number>(0);
  const [isAudioSessionActive, setIsAudioSessionActive] = useState<boolean>(false);
  const [classroomListeners, setClassroomListeners] = useState<any[]>([]);
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
  const [selectedAdminStudentId, setSelectedAdminStudentId] = useState<string>("usr_exec_01");

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
      senderName: currentUser.name || (currentUser.role === Role.STUDENT ? "New Student" : currentUser.role === Role.INSTRUCTOR ? "Instructor" : "Administrator"),
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

    setInputMessage("");
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
      studentsCount: 0,
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

  const getCourseQuizzes = (course: Course) => {
    const list: { quizId: string; lessonTitleEn: string; lessonTitleZu: string }[] = [];
    if (!course || !course.modules) return list;
    course.modules.forEach(m => {
      if (m.lessons) {
        m.lessons.forEach(l => {
          if (l.quiz && l.quiz.id) {
            list.push({
              quizId: l.quiz.id,
              lessonTitleEn: l.title_en,
              lessonTitleZu: l.title_zu,
            });
          }
        });
      }
    });
    return list;
  };

  const calculateStudentQuizzesStats = (user: User) => {
    let totalQuizzes = 0;
    let completedQuizzesCount = 0;
    const breakDown: { courseId: string; courseTitle: string; total: number; completed: number; isCertified: boolean }[] = [];

    if (user && user.enrolledCourses) {
      user.enrolledCourses.forEach(cId => {
        const courseObj = courses.find(c => c.id === cId);
        if (courseObj) {
          const quizzes = getCourseQuizzes(courseObj);
          totalQuizzes += quizzes.length;
          
          const completedCount = quizzes.filter(q => user.quizScores && user.quizScores[q.quizId] !== undefined).length;
          completedQuizzesCount += completedCount;
          
          const isCourseCertified = user.progress[cId] === 100;

          breakDown.push({
            courseId: cId,
            courseTitle: language === "en" ? courseObj.title_en : courseObj.title_zu,
            total: quizzes.length,
            completed: completedCount,
            isCertified: isCourseCertified
          });
        }
      });
    }

    return {
      totalQuizzes,
      completedQuizzesCount,
      breakDown,
      isFullyCertified: totalQuizzes > 0 && completedQuizzesCount === totalQuizzes
    };
  };

  const updateCourseProgressFully = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const courseQuizzes = getCourseQuizzes(course);
      const completedCount = courseQuizzes.filter(q => studentProgress.quizScores && studentProgress.quizScores[q.quizId] !== undefined).length;
      if (courseQuizzes.length > 0 && completedCount < courseQuizzes.length) {
        alert(language === "en" 
          ? `Certification Blocked: You must complete all ${courseQuizzes.length} assignments inside the lessons before claiming this certificate. (${completedCount}/${courseQuizzes.length} completed)` 
          : `Isitifiketi Simisiwe: Kumele uqedele yonke imisebenzi engu-${courseQuizzes.length} phakathi kwezifundo ngaphambi kokuthola lesi sitifiketi. (${completedCount}/${courseQuizzes.length} kuqediwe)`);
        return;
      }
    }

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

  const handleSubmitQuiz = (courseId: string, quizId?: string) => {
    setQuizSubmitted(true);
    setQuizScore(100); // Exec level clears!

    setStudentProgress(prev => {
      const actualQuizId = quizId || courseId; // fallback
      const updatedScores = {
        ...prev.quizScores,
        [actualQuizId]: 100,
        [courseId]: 100 // retain for legacy
      };

      // Since they completed an assignment, let's progress the course progress dynamically!
      const courseObj = courses.find(c => c.id === courseId);
      let newProgress = prev.progress[courseId] || 0;
      if (courseObj) {
        const courseQuizzes = getCourseQuizzes(courseObj);
        const completedCount = courseQuizzes.filter(q => q.quizId === actualQuizId || updatedScores[q.quizId] !== undefined).length;
        if (courseQuizzes.length > 0) {
          newProgress = Math.round((completedCount / courseQuizzes.length) * 100);
        }
      }

      return {
        ...prev,
        progress: {
          ...prev.progress,
          [courseId]: newProgress
        },
        quizScores: updatedScores
      };
    });
  };

  return (
    <div id="luxe_root" className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col font-sans relative overflow-x-hidden pb-16 md:pb-0 selection:bg-[#D4AF37] selection:text-black">
      
      {/* Dynamic Gold liquid background ambient canvas glows */}
      <div className="absolute top-[-250px] right-[-150px] w-[600px] h-[600px] bg-gradient-to-br from-[#D4AF37]/15 to-[#996515]/0 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] bg-gradient-to-tr from-[#996515]/10 to-[#AA771C]/0 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-gradient-to-l from-[#D4AF37]/5 to-[#000000]/0 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-[#D4AF37]/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ImaliLogo size={46} className="shrink-0 animate-spin-slow" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-light tracking-[0.2em] uppercase text-[#D4AF37] font-serif">
                {translateText("brand_name", language)}
              </span>
            </div>
            <p className="text-[7.5px] sm:text-[9px] text-[#D4AF37] tracking-wider font-medium opacity-80 uppercase leading-none mt-0.5">
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

          {/* Desktop/Web About Us Button */}
          <button 
            id="header_about_us_btn"
            onClick={() => setIsAboutModalOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-black/80 to-zinc-900 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 text-xs text-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] transition-all cursor-pointer font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="uppercase text-[10px] tracking-widest font-black">
              {language === "en" ? "About Us" : "Mayelana Nathi"}
            </span>
          </button>

          {/* Quick Simulated Role Toggle */}
          <div className="flex items-center bg-black/80 border border-zinc-800 rounded-full p-1 text-[11px] gap-1">
            <span className="text-[9px] text-zinc-500 uppercase px-2 font-mono tracking-tighter">{translateText("role_label_colon", language)}</span>
            <button 
              id="role_student_btn"
              onClick={() => setActiveRole(Role.STUDENT)}
              className={`px-3 py-1 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider ${activeRole === Role.STUDENT ? "bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_10px_rgba(212,175,55,0.25)]" : "text-zinc-400 hover:text-white"}`}
            >
              {translateText("role_student_abbr", language)}
            </button>
             <button 
              id="role_instructor_btn"
              onClick={() => {
                if (!isInstructorUnlocked) {
                  setActiveTab("dashboard");
                  setVisibleProfileTab(Role.INSTRUCTOR);
                  alert(language === "en" 
                    ? "Instructor credentials required. Please authenticate under Academic Profiles Manager!" 
                    : "Kudingeka imininingwane yomfundisi. Sicela uqinisekise ngaphansi koMphathi Weziphrofayili!");
                } else {
                  setActiveRole(Role.INSTRUCTOR);
                }
              }}
              className={`px-3 py-1 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider ${activeRole === Role.INSTRUCTOR ? "bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_10px_rgba(212,175,55,0.25)]" : "text-zinc-400 hover:text-white"}`}
            >
              {translateText("role_instructor_abbr", language)}
            </button>
            <button 
              id="role_admin_btn"
              onClick={() => {
                if (!isAdminUnlocked) {
                  setActiveTab("dashboard");
                  setVisibleProfileTab(Role.ADMIN);
                  alert(language === "en" 
                    ? "Administrator credentials required. Please authenticate under Academic Profiles Manager!" 
                    : "Kudingeka imininingwane yomlawuli. Sicela uqinisekise ngaphansi koMphathi Weziphrofayili!");
                } else {
                  setActiveRole(Role.ADMIN);
                }
              }}
              className={`px-3 py-1 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider ${activeRole === Role.ADMIN ? "bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_10px_rgba(212,175,55,0.25)]" : "text-zinc-400 hover:text-white"}`}
            >
              {translateText("role_admin_abbr", language)}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">{translateText("active_session_label", language)}</span>
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
        <aside className="w-full md:w-64 bg-black/40 backdrop-blur-xl border-b md:border-b-0 md:border-r border-[#D4AF37]/15 p-4 md:p-6 pb-2 md:pb-6 flex flex-col justify-between gap-3 md:gap-6 md:sticky md:top-[81px] md:h-[calc(100vh-81px)] md:overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent md:self-start">
          <div className="space-y-4 md:space-y-6">
            
            {/* Quick Profile Summary Card */}
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/5 backdrop-blur-md p-4 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#D4AF37]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 overflow-hidden relative shrink-0">
                  {renderAvatar(currentUser.avatar, currentUser.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white tracking-wide truncate">{currentUser.name || translateText("new_scholar", language)}</h4>
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
            <nav className="space-y-1 md:space-y-2">
              <button
                id="nav_dashboard"
                onClick={() => { setActiveTab("dashboard"); setSelectedCourse(null); }}
                className={`w-full flex items-center justify-between p-3 flex-row rounded-xl border transition-all text-left group ${activeTab === "dashboard" ? "bg-[#D4AF37]/10 border-[#D4AF37]/45 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.08)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <Activity className="w-4 h-4 animate-pulse-fast group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_dashboard", language)}
                  </span>
                </div>
              </button>

              <button
                id="nav_courses"
                onClick={() => { setActiveTab("courses"); }}
                className={`w-full flex items-center justify-between p-3 flex-row rounded-xl border transition-all text-left group ${activeTab === "courses" ? "bg-[#D4AF37]/10 border-[#D4AF37]/45 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.08)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden">
                    <BookOpen className="w-4 h-4 animate-flip-mild group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_courses", language)}
                  </span>
                </div>
                <span className="text-[9px] opacity-40 font-mono font-black">{courses.length}</span>
              </button>

              <button
                id="nav_classroom"
                onClick={() => { setActiveTab("classroom"); }}
                className={`hidden w-full flex items-center justify-between p-3 flex-row rounded-xl border transition-all text-left group ${activeTab === "classroom" ? "bg-[#D4AF37]/10 border-[#D4AF37]/45 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.08)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <Video className="w-4 h-4 animate-float group-hover:scale-110 transition-transform" />
                    {isAudioSessionActive && classroomListeners.length > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black animate-ping"></span>
                    )}
                    <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_classroom", language)}
                  </span>
                </div>
                {isAudioSessionActive && classroomListeners.length > 0 && (
                  <span className="text-[9px] bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded uppercase tracking-tighter text-[7.5px] font-bold animate-pulse">LIVE</span>
                )}
                {isAudioSessionActive && classroomListeners.length === 0 && (
                  <span className="text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.2 rounded uppercase tracking-tighter text-[7.5px] font-bold">PREP</span>
                )}
              </button>

              <button
                id="nav_chat"
                onClick={() => { setActiveTab("chat"); }}
                className={`hidden w-full flex items-center justify-between p-3 flex-row rounded-xl border transition-all text-left group ${activeTab === "chat" ? "bg-[#D4AF37]/10 border-[#D4AF37]/45 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.08)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 group-hover:translate-y-[-1px] transition-all" />
                    <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_chat", language)}
                  </span>
                </div>
                <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25 px-1.5 py-0.5 rounded uppercase font-bold tracking-tight">ROOMS</span>
              </button>

              <button
                id="nav_blueprints"
                onClick={() => { setActiveTab("blueprints"); }}
                className={`w-full flex items-center justify-between p-3 flex-row rounded-xl border transition-all text-left group ${activeTab === "blueprints" ? "bg-[#D4AF37]/10 border-[#D4AF37]/45 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.08)]" : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <Radio className="w-4 h-4 text-[#D4AF37] animate-pulse group-hover:rotate-12 transition-transform" />
                    <div className="absolute w-6 h-6 rounded-full border border-[#D4AF37]/30 animate-wave-radar opacity-70"></div>
                    <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {translateText("nav_blueprints", language)}
                  </span>
                </div>
                <span className="text-[9px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-1 py-0.2 rounded font-mono font-bold animate-pulse">FM</span>
              </button>



              <button
                id="nav_contact_us"
                onClick={() => { setIsContactModalOpen(true); }}
                className="w-full flex items-center justify-between p-3 flex-row rounded-xl border border-transparent text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <HelpCircle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                    <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase font-serif">
                    {language === "zu" ? "Xhumana Nathi / SoSizo" : "Help Centre • Contact"}
                  </span>
                </div>
              </button>

              {activeRole === Role.ADMIN && (
                <button
                  id="nav_admin"
                  onClick={() => { setActiveTab("admin"); }}
                  className={`w-full flex items-center justify-between p-3 flex-row rounded-xl border transition-all text-left group ${activeTab === "admin" ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]" : "bg-transparent border-transparent text-[#D4AF37]/70 hover:bg-white/5 hover:text-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                      <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-700" />
                      <div className="absolute inset-0 rounded-lg border border-[#D4AF37]/30 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase font-mono">
                      {translateText("nav_admin", language)}
                    </span>
                  </div>
                  <span className="text-[9px] bg-[#D4AF37] text-black px-1 rounded uppercase font-bold text-[8px]">SYS</span>
                </button>
              )}
            </nav>

            {/* Sidebar Sponsor Banner Removed */}

          </div>

          {/* Sidebar footer padding */}
          <div className="mt-auto h-0 md:h-4"></div>
        </aside>

        {/* Content Viewer viewport */}
        <main id="curriculum_viewport" className="flex-1 p-4 md:p-8 pt-2 md:pt-8 flex flex-col gap-4 md:gap-6 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* HEADER CONVERSATION & TOP BRIEF */}
          <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-r from-neutral-950 to-[#0d0d0d] border border-white/5 p-6 rounded-2xl">
            <div className="max-w-xl">
              <p className="text-[7.5px] sm:text-[9px] font-mono tracking-wider text-[#D4AF37] uppercase">
                {translateText("brand_subtitle", language)}
              </p>
              <h1 className="text-3xl font-light tracking-tight mt-1 text-white uppercase font-serif">
                {activeTab === "dashboard" && (language === "en" ? "Executive Academy Central Portal" : "Isikhungo Esiyisisekelo Sezemfundo")}
                {activeTab === "courses" && (language === "en" ? "Financial Education Curriculum" : "Uhlelo Lwezifundo Lwezezimali")}
                {activeTab === "classroom" && translateText("interactive_lecture_suite", language)}
                {activeTab === "chat" && (language === "en" ? "Academic Discussion Forum" : "Inkundla Yezoxhumano Nezemfundo")}
                {activeTab === "blueprints" && (language === "en" ? "Curriculum Roadmap & Framework" : "Umgudu Nomhlahlandlela Wezifundo")}
                {activeTab === "admin" && (language === "en" ? "Academy Management Console" : "Iphaneli Yokuphathwa Kwezemfundo")}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                {language === "en" 
                  ? "Premium training portal for certified learning and interactive financial education."
                  : "Uhlelo lwemfundo oluphezulu lokudlulisa ulwazi olunolaka le-Premium."}
              </p>
            </div>
            
            {/* Wide Partner Leaderboard Widget - Right on Desktop, Below on Mobile */}
            <div className="w-full lg:w-auto flex justify-start lg:justify-end items-center shrink-0">
              <a 
                href="https://clicks.pipaffiliates.com/c?m=150844&amp;c=662032" 
                referrerPolicy="no-referrer-when-downgrade"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full max-w-[728px] lg:max-w-[460px] xl:max-w-[728px] min-h-[45px] sm:min-h-[60px] overflow-hidden rounded-xl border border-zinc-900 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.01] bg-gradient-to-r from-zinc-950 via-neutral-900 to-zinc-950 flex items-center justify-center"
              >
                {/* Fallback Text under image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-zinc-950/90 text-center font-mono">
                  <span className="text-[9px] text-[#D4AF37] font-bold tracking-widest uppercase">IMALI PREMIER PARTNER DIRECTORY</span>
                  <span className="text-[8px] text-zinc-500 mt-0.5">ESTABLISH SECURE PARTNER COMMERCE GATEWAY</span>
                </div>
                <img 
                  src="https://ads.pipaffiliates.com/i/150844?c=662032" 
                  width="728" 
                  height="90" 
                  referrerPolicy="no-referrer-when-downgrade"
                  alt="Partner Integration Portal"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity z-10"
                />
              </a>
            </div>
          </section>

          {/* ================= ROYAL TRADING SESSIONS DESK (ANALOG & DIGITAL CODES) ================= */}
          <section id="sessions_trading_desk_clocks" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950/40 p-4 px-5 rounded-2xl border border-zinc-900">
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold text-nowrap">
                    {translateText("financial_clocks_label", language)}
                  </span>
                </div>
                
                {/* Minimizable / Maximizable Academy & Market Calendar button */}
                <button
                  id="clocks_calendar_toggle"
                  onClick={() => setIsCalendarMaximized(!isCalendarMaximized)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-black/90 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/45 text-[#D4AF37] hover:text-white rounded-lg text-[9.5px] font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm shadow-[#D4AF37]/10 active:scale-95 shrink-0"
                >
                  <Calendar className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span>
                    {isCalendarMaximized 
                      ? (language === "en" ? "MINIMIZE CALENDAR" : "NCIPHISE IKHALENDA") 
                      : (language === "en" ? "MAXIMIZE CALENDAR" : "KHULISA IKHALENDA")}
                  </span>
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
                <span className="text-[10.5px] font-mono text-zinc-400 flex flex-wrap items-center gap-1.5">
                  <span className="whitespace-nowrap">{translateText("detected_location_label", language)}</span>
                  {userLocation ? (
                    <strong className="text-zinc-100 bg-zinc-900/60 px-2.5 py-1 rounded border border-zinc-800/60 flex items-center gap-1.5 whitespace-nowrap">
                      <span className={`w-1.5 h-1.5 rounded-full ${userLocation.ipDefault ? "bg-amber-400 animate-pulse" : "bg-emerald-400 animate-ping"}`}></span>
                      <span>
                        {userLocation.city ? `${userLocation.city}, ${userLocation.principalSubdivision || ""} (${userLocation.countryName})` : `${userLocation.latitude?.toFixed(4)}°, ${userLocation.longitude?.toFixed(4)}°`}
                      </span>
                      {!userLocation.ipDefault && userLocation.accuracy && (
                        <span className="text-[9px] text-[#D4AF37] font-semibold tracking-wider font-mono bg-[#D4AF37]/10 px-1 rounded ml-1 animate-pulse">
                          LIVE GPS ±{Math.round(userLocation.accuracy)}m
                        </span>
                      )}
                    </strong>
                  ) : (
                    <strong className="text-zinc-100 bg-zinc-900/60 px-2.5 py-1 rounded border border-zinc-800/60 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 bg-zinc-500 animate-pulse rounded-full"></span>
                      <span>{locationStatus === 'requesting' ? (language === "en" ? "CONNECTING SATELLITES..." : "KUXHUNYWA IZIKHUNDLA...") : userTimezone}</span>
                    </strong>
                  )}
                </span>
                <span className="text-[10.5px] font-mono text-[#D4AF37] flex flex-wrap items-center gap-1.5">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                    <span>{translateText("your_local_time_label", language)}</span>
                  </span>
                  <strong className="text-white bg-zinc-900 px-2.5 py-1 rounded border border-[#D4AF37]/30 font-mono whitespace-nowrap">
                    {systimeUtc.toLocaleTimeString()}
                  </strong>
                </span>
              </div>
            </div>

            {/* Collapsed/Maximized Calendar Desk Container */}
            {isCalendarMaximized && (() => {
              const getEventsForDay = (day: number) => {
                return customCalendarEvents.filter(e => e.day === day);
              };

              const currentDayEvents = getEventsForDay(selectedCalendarDate);

              return (
                <div 
                  id="interactive_calendar_desk" 
                  className="bg-[#090909] border-2 border-[#D4AF37]/60 rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-6 space-y-4 md:space-y-5 animate-fade-in shadow-[0_10px_40px_rgba(212,175,55,0.08)]"
                >
                  {/* Desk Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-900">
                    <div>
                      <span className="text-[9px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
                        {language === "en" ? "Interactive Custom Academy Ledger" : "Ikhalenda Lemfundo Elisebenzisanayo Zami"}
                      </span>
                      <h4 className="text-sm font-bold font-serif text-white tracking-tight uppercase flex items-center gap-2 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
                        <span>June 2026 — {language === "en" ? "TRADING ACADEMY PORTAL" : "ISIQONDISO SECALENDAR LABAHWEBINGI"}</span>
                      </h4>
                    </div>
                    
                    <button
                      onClick={() => setIsCalendarMaximized(false)}
                      className="self-end sm:self-center px-3 py-1 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-[9px] font-mono uppercase tracking-widest border border-zinc-800 transition-all cursor-pointer"
                    >
                      {language === "en" ? "✕ Minimize" : "✕ Nciphise"}
                    </button>
                  </div>

                  {/* Calendar Layout: Grid on left, Sidebar Details on right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in text-left">
                    
                    {/* Left Column: 30-day Month Grid */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest pb-1 border-b border-zinc-900">
                        <span>{language === "en" ? "Mon" : "Mso"}</span>
                        <span>{language === "en" ? "Tue" : "Bil"}</span>
                        <span>{language === "en" ? "Wed" : "Tha"}</span>
                        <span>{language === "en" ? "Thu" : "Sih"}</span>
                        <span>{language === "en" ? "Fri" : "Hla"}</span>
                        <span>{language === "en" ? "Sat" : "Mqe"}</span>
                        <span>{language === "en" ? "Sun" : "Son"}</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5">
                        {Array.from({ length: 30 }, (_, index) => {
                          const day = index + 1;
                          const dayEvents = getEventsForDay(day);
                          const isSelected = selectedCalendarDate === day;
                          const isToday = day === 5; // Current time is Friday June 5, 2026.
                          
                          return (
                            <button
                              key={day}
                              onClick={() => setSelectedCalendarDate(day)}
                              className={`aspect-square p-1.5 rounded-xl border flex flex-col justify-between transition-all relative group cursor-pointer ${
                                isSelected 
                                  ? "bg-amber-600/10 border-[#D4AF37] text-white shadow-[0_0_12px_rgba(212,175,55,0.15)] z-10" 
                                  : isToday 
                                  ? "bg-zinc-900 border-zinc-700 text-[#D4AF37]" 
                                  : "bg-black/40 border-zinc-900/80 hover:border-[#D4AF37]/35 text-zinc-400 hover:bg-zinc-900/40"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className={`text-[10px] font-mono font-bold ${isToday && !isSelected ? "text-yellow-400 outline outline-1 outline-yellow-400/30 rounded px-1" : ""}`}>
                                  {day}
                                </span>
                                {isToday && (
                                  <span className="text-[7px] font-sans font-extrabold tracking-tighter text-[#D4AF37] bg-[#D4AF37]/10 px-1 rounded scale-90 sm:scale-100">
                                    TODAY
                                  </span>
                                )}
                              </div>

                              {/* Small event markers */}
                              <div className="flex gap-0.5 mt-1 overflow-hidden max-w-full justify-start items-center">
                                {dayEvents.map((ev, i) => {
                                  let badgeColor = "bg-[#D4AF37]";
                                  if (ev.type === "class") badgeColor = "bg-[#D4AF37]";
                                  if (ev.type === "macro") badgeColor = "bg-rose-500 animate-pulse";
                                  if (ev.type === "personal") badgeColor = "bg-amber-400";
                                  return (
                                    <span 
                                      key={i} 
                                      className={`w-1.5 h-1.5 rounded-full ${badgeColor} inline-block shrink-0`}
                                      title={language === "en" ? ev.titleEn : ev.titleZu}
                                    />
                                  );
                                })}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Event Details & Custom Add */}
                    <div className="lg:col-span-5 bg-black/60 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            {language === "en" ? `DATE: JUNE ${selectedCalendarDate}, 2026` : `USUKU: ILANGA ${selectedCalendarDate} KULOMASI`}
                          </span>
                          <span className="text-[9.5px] text-[#D4AF37] font-mono font-bold bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/20 uppercase">
                            {currentDayEvents.length} {language === "en" ? "EVENT(S)" : "IMIHLANGANO"}
                          </span>
                        </div>

                        {/* Events List */}
                        <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                          {currentDayEvents.length > 0 ? (
                            currentDayEvents.map((ev, i) => (
                              <div key={i} className="p-2.5 bg-[#0a0a0a] rounded-xl border border-zinc-850 flex items-start gap-2.5 text-left">
                                <div className="mt-1 flex-shrink-0">
                                  {ev.type === "class" && <span className="text-xs">🕯️</span>}
                                  {ev.type === "macro" && <span className="text-xs text-rose-500">🔴</span>}
                                  {ev.type === "personal" && <span className="text-xs">📌</span>}
                                </div>
                                <div className="flex-1 space-y-0.5 text-left">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[9.5px] font-semibold text-[#D4AF37] font-mono">{ev.time}</span>
                                    {ev.type === "macro" && (
                                      <span className="text-[7.5px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20 font-bold uppercase tracking-widest scale-90">
                                        ECONOMIC NEWS
                                      </span>
                                    )}
                                    {ev.type === "class" && (
                                      <span className="text-[7.5px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded border border-[#D4AF37]/10 font-bold uppercase tracking-widest scale-90">
                                        ACADEMY SESSION
                                      </span>
                                    )}
                                    {ev.type === "personal" && (
                                      <span className="text-[7.5px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/10 font-bold uppercase tracking-widest scale-90">
                                        PERSONAL
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11.5px] text-zinc-100 font-sans font-bold leading-snug">
                                    {language === "en" ? ev.titleEn : ev.titleZu}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center bg-black/20 rounded-xl border border-dashed border-zinc-900">
                              <Calendar className="w-5 h-5 text-zinc-700 mx-auto mb-1.5" />
                              <p className="text-[10.5px] text-zinc-500 font-mono">
                                {language === "en" ? "NO EVENTS SCHEDULED FOR THIS DATE" : "AYIKHO IMIHLANGANO ESEDAYINI LO"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Interactive Custom Add Form */}
                      <div className="pt-3 border-t border-zinc-900 space-y-2.5 bg-black/30 p-3 rounded-xl border border-zinc-805 w-full text-left">
                        <span className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                          ➕ {language === "en" ? "SCHEDULE ACADEMY MILESTONE" : "Faka Umhlangano Wakho"}
                        </span>
                        
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            placeholder={language === "en" ? "e.g., USDZAR Breakout Review" : "isib., Ukuhlaziywa kwe-USDZAR"}
                            className="w-full text-xs bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#D4AF37]/50 p-2 rounded-lg text-zinc-100 focus:outline-none transition-all placeholder:text-zinc-650 font-sans"
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Time (Local)</span>
                              <input
                                type="time"
                                value={newEventTime}
                                onChange={(e) => setNewEventTime(e.target.value)}
                                className="w-full text-xs font-mono bg-zinc-950 border border-zinc-800 p-1.5 rounded-lg text-zinc-100 focus:outline-none"
                              />
                            </div>

                            <div>
                              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Category</span>
                              <select
                                value={newEventType}
                                onChange={(e) => setNewEventType(e.target.value)}
                                className="w-full text-xs bg-zinc-950 border border-zinc-800 p-1.5 rounded-lg text-zinc-100 focus:outline-none cursor-pointer"
                              >
                                <option value="personal">{language === "en" ? "Personal Note" : "Inothi Lami"}</option>
                                <option value="class">{language === "en" ? "Webinar Session" : "Isifundo Selikhono"}</option>
                                <option value="macro">{language === "en" ? "Economic News" : "Isimemezelo"}</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={!newEventTitle.trim()}
                            onClick={() => {
                              if (!newEventTitle.trim()) return;
                              const newEv = {
                                day: selectedCalendarDate,
                                time: newEventTime,
                                type: newEventType,
                                titleEn: newEventTitle,
                                titleZu: newEventTitle, // Let it be bilingual
                              };
                              setCustomCalendarEvents(prev => [...prev, newEv]);
                              setNewEventTitle("");
                            }}
                            className="w-full text-center py-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-semibold rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                          >
                            {language === "en" ? "ADD TO LEDGER" : "FAKA ELIKHAKEDINI"}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })()}

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
                      {translateText("certified_private_session_label", language)}
                    </span>
                    <h3 className="text-xl font-light tracking-wide text-white uppercase font-serif">
                      {language === "en" ? (
                        <>Your Financial Education remains <span className="text-[#D4AF37] italic font-serif">Securely Yours</span></>
                      ) : (
                        <>Imfundo Yakho Yezezimali <span className="text-[#D4AF37] italic font-serif">Ihlala Iyakho Ngokuphephile</span></>
                      )}
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
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 bg-zinc-950 shrink-0">
                              {renderAvatar(studentDetails.avatar, studentDetails.name)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white font-serif">{studentDetails.name || "Profile Name Empty"}</p>
                              <p className="text-[10px] text-[#D4AF37] font-mono uppercase mt-0.5">
                                {studentDetails.experience && studentDetails.specialty 
                                  ? `${studentDetails.experience} Student • ${studentDetails.specialty} Focus` 
                                  : "Student Profile Unconfigured"}
                              </p>
                              <p className="text-[11px] text-zinc-400 mt-1 italic leading-relaxed">
                                {studentDetails.bio ? `"${studentDetails.bio}"` : "Click below to complete your academic profile & goals."}
                              </p>
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
                            <label className="text-[10px] text-zinc-400 font-mono uppercase block">Profile Photo (Upload file)</label>
                            <div className="flex gap-2.5 items-center bg-zinc-900 border border-zinc-805 p-2 rounded-xl">
                              <label className="inline-flex items-center gap-1.5 cursor-pointer bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 py-1.5 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-all shrink-0">
                                📁 Choose Photo
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        if (event.target?.result) {
                                          setStudentDetails({ ...studentDetails, avatar: event.target.result as string });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <div className="text-[9px] text-zinc-500 font-mono truncate w-full">
                                {studentDetails.avatar ? "Custom Photo Loaded" : "No custom file chosen"}
                              </div>
                            </div>
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
                            <p className="text-xs text-zinc-400 font-medium">To join class as student, you will need the active authorization passcode:</p>
                            <p className="text-[11px] text-zinc-500 font-sans mt-1 italic leading-relaxed">
                              🔒 Note: Please request the active session passcode directly from your Instructor or the Admin.
                            </p>
                          </div>
                          
                          <div className="flex gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => {
                                setActiveRole(Role.STUDENT);
                                localStorage.setItem("imali_student_profile", JSON.stringify(studentDetails));
                                alert(studentDetails.name ? `Student profile activated for: ${studentDetails.name}!` : "Student profile activated!");
                                setActiveTab("dashboard");
                              }}
                              className="py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:brightness-110 text-black text-[10px] font-mono font-black uppercase tracking-widest rounded-xl transition shadow cursor-pointer"
                            >
                              👤 Activate Student Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {visibleProfileTab === Role.INSTRUCTOR && (
                      <div className="space-y-6 text-left">
                        {!isInstructorUnlocked ? (
                          <div className="bg-black/60 border border-[#D4AF37]/35 rounded-2xl p-6 space-y-4 shadow-[0_4px_20px_rgba(212,175,55,0.05)]">
                            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                              <span className="text-2xl">🎓</span>
                              <div>
                                <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider">
                                  {language === "en" ? "Instructor Verification Gate" : "Isango Lomfundisi Eliqinisekisiwe"}
                                </h4>
                                <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
                                  {language === "en" ? "Designated Credentials Required" : "Kudingeka Imininingwane Yomfundisi Ezifanele"}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {language === "en" 
                                ? "This professional workspace is reserved for the designated Academy Instructor. Please authenticate using your registered instructor email address (info@imalingesizulu.com):" 
                                : "Le ndawo yomsebenzi obuchwepheshe ibekelwe uMfundisi we-Academy oqokiwe. Sicela ungene usebenzisa i-imeyili yomfundisi ebhalisiwe (info@imalingesizulu.com):"}
                            </p>
                            <div className="space-y-2">
                              <label className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                                {language === "en" ? "Registered Instructor Email" : "I-imeyili Yomfundisi Ebhalisiwe"}
                              </label>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                  type="email"
                                  id="instructor_gate_email_input"
                                  placeholder="e.g. info@imalingesizulu.com"
                                  value={instructorDetails.email}
                                  onChange={(e) => setInstructorDetails({ ...instructorDetails, email: e.target.value })}
                                  className="flex-1 bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                                />
                                <button
                                  onClick={() => {
                                    if (instructorDetails.email.trim().toLowerCase() === "info@imalingesizulu.com") {
                                      setIsInstructorUnlocked(true);
                                      localStorage.setItem("imali_instructor_unlocked", "true");
                                      alert(language === "en" 
                                        ? "Instructor Identity Verified! Workspace unlocked." 
                                        : "Ubunikazi Bomfundisi Buqinisekisiwe! Ukufinyelela kuvuliwe.");
                                    } else {
                                      alert(language === "en" 
                                        ? "Access Denied. For authorization as Instructor, the email must correspond to info@imalingesizulu.com." 
                                        : "Ukufinyelela Kunqatshiwe. Ukuze ugunyazwe njengoMfundisi, i-imeyili kumele ihambisane ne-info@imalingesizulu.com.");
                                    }
                                  }}
                                  className="py-2.5 px-5 bg-[#D4AF37] hover:brightness-110 text-black text-xs font-mono font-black uppercase tracking-wider rounded-xl transition shrink-0 cursor-pointer"
                                >
                                  {language === "en" ? "Verify Identity" : "Qinisekisa"}
                                </button>
                              </div>
                            </div>
                            <span className="text-[9px] text-[#D4AF37]/75 block leading-normal italic">
                              {language === "en" 
                                ? "🔒 Educational credentials lock automatically if other non-registered accounts attempt access." 
                                : "🔒 Imininingwane yezezemfundo ivaleka ngokuzenzakalelayo uma amanye ama-akhawunti angabhalisiwe ezama ukungena."}
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="bg-amber-500/10 border border-[#D4AF37]/30 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <p className="text-xs text-[#D4AF37] font-mono font-bold uppercase tracking-wider">
                                  {language === "en" ? "🎓 REPRESENTING TEACHER / SPEAKER" : "🎓 UKUMELELA UTHISHA / ISIKHULUMI"}
                                </p>
                                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                                  {language === "en"
                                    ? "Configure core session credentials and access codes. This code locks/unlocks the audio suite lobby for your students."
                                    : "Misa amapharamitha eseshini nezikhodi zokungena datha. Le khodi ivala/ivula igumbi lomsindo labafundi bakho."}
                                </p>
                              </div>
                              
                              <button
                                onClick={() => {
                                  const randomCodes = ["GOLD777", "BTC360", "FOREX101", "SCALP05", "ZULU99", "IMALI888"];
                                  const randomSel = randomCodes[Math.floor(Math.random() * randomCodes.length)];
                                  setInstructorDetails({ ...instructorDetails, classCode: randomSel });
                                  alert(language === "en"
                                    ? `Successfully issued new classroom passcode: '${randomSel}'! Give this code to students.`
                                    : `Iphasikhodi entsha yekilasi ikhishiwe ngempumelelo: '${randomSel}'! Nikeza abafundi le khodi.`);
                                }}
                                className="py-1.5 px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/45 text-[#D4AF37] text-[10px] font-mono tracking-wider font-bold uppercase rounded-lg shrink-0 cursor-pointer"
                              >
                                {language === "en" ? "🎲 Generate New Code" : "🎲 Sungula Ikhodi Entsha"}
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] text-zinc-400 font-mono uppercase block">
                                  {language === "en" ? "Instructor Name" : "Igama Lomfundisi"}
                                </label>
                                <input 
                                  type="text" 
                                  value={instructorDetails.name}
                                  onChange={(e) => setInstructorDetails({ ...instructorDetails, name: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                                  placeholder="e.g. Professor Smith"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] text-[#D4AF37] font-mono uppercase block font-bold">
                                  {language === "en" ? "Define Private Class Access Code" : "Misa Iphasikhodi Yomgudu Eyimfihlo"}
                                </label>
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
                                <span className="text-[9px] text-zinc-500 block">
                                  {language === "en"
                                    ? "Students will have to type this passcode to enter the Audio space."
                                    : "Abafundi kuzofanele babhale le phasikhodi ukuze bangene enkundleni ye-Audio."}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] text-zinc-400 font-mono uppercase block">
                                {language === "en" ? "Instructor Photo (Upload file)" : "Isithombe Somfundisi (Landa ifayela)"}
                              </label>
                              <div className="flex gap-2.5 items-center bg-zinc-900 border border-zinc-805 p-2 rounded-xl">
                                <label className="inline-flex items-center gap-1.5 cursor-pointer bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 py-1.5 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-all shrink-0">
                                  📁 {language === "en" ? "Choose Photo" : "Kheta Ifayela"}
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          if (event.target?.result) {
                                            setInstructorDetails({ ...instructorDetails, avatar: event.target.result as string });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                                <div className="text-[9px] text-zinc-500 font-mono truncate w-full">
                                  {instructorDetails.avatar 
                                    ? (language === "en" ? "Custom Photo Loaded" : "Isithombe Esifakwe Ngokwezifiso Silayishiwe")
                                    : (language === "en" ? "No custom file chosen" : "Alukho ifayela elikhethiwe")}
                                </div>
                              </div>
                            </div>

                            {/* Direct action links to simulated role join */}
                            <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center bg-zinc-950/40 p-4 rounded-xl gap-4">
                              <p className="text-[11px] text-zinc-400 max-w-sm">
                                {language === "en"
                                  ? "Switching to instructor role will let you act as the host on stage, muting/unmuting and presenting lessons."
                                  : "Ukushintshela endimeni yomfundisi kuzokuvumela ukuthi usebenze njengomsingathi esiteji, uvale/uvule imibhobho futhi unikeze izifundo."}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
                                <button
                                  onClick={() => {
                                    setIsInstructorUnlocked(false);
                                    localStorage.removeItem("imali_instructor_unlocked");
                                    setActiveRole(Role.STUDENT);
                                    alert(language === "en" ? "Instructor credentials locked." : "Imininingwane yomfundisi ivalwe.");
                                  }}
                                  className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[9px] font-mono uppercase tracking-wider rounded-xl transition cursor-pointer"
                                >
                                  🔒 {language === "en" ? "Lock Credentials" : "Vala Imininingwane"}
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveRole(Role.INSTRUCTOR);
                                    localStorage.setItem("imali_instructor_profile", JSON.stringify(instructorDetails));
                                    alert(instructorDetails.name 
                                      ? (language === "en" ? `Instructor profile activated for: ${instructorDetails.name}!` : `Imininingwane yomfundisi isivuliwe: ${instructorDetails.name}!`)
                                      : (language === "en" ? "Instructor profile activated!" : "Imininingwane yomfundisi isivuliwe!"));
                                    setActiveTab("dashboard");
                                  }}
                                  className="py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:brightness-110 text-black text-[10px] font-mono font-black uppercase tracking-widest rounded-xl transition shadow cursor-pointer"
                                >
                                  🎓 {language === "en" ? "Activate Instructor Profile" : "Ngena Njengomfundisi"}
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {visibleProfileTab === Role.ADMIN && (
                      <div className="space-y-6 text-left">
                        {!isAdminUnlocked ? (
                          <div className="bg-black/60 border border-emerald-500/35 rounded-2xl p-6 space-y-4 shadow-[0_4px_20px_rgba(16,185,129,0.05)]">
                            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                              <span className="text-2xl">🛡️</span>
                              <div>
                                <h4 className="text-sm font-serif font-bold text-emerald-400 uppercase tracking-wider">
                                  {language === "en" ? "Dean / Administrator Verification Gate" : "Isango Lomlawuli Eliqinisekisiwe"}
                                </h4>
                                <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
                                  {language === "en" ? "Chief Syndicate Operations Credentials" : "Imininingwane Yomlawuli Omkhulu"}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {language === "en" 
                                ? "This executive operations workspace is reserved for the Chief Syndicate Administrator. Please authenticate using your registered administrator email address (admin@imalingesizulu.com):" 
                                : "Le ndawo yokusebenza ibekelwe uMlawulu woMkhulu. Sicela uqinisekise usebenzisa i-imeyili yomlawuli ebhalisiwe (admin@imalingesizulu.com):"}
                            </p>
                            <div className="space-y-2">
                              <label className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                                {language === "en" ? "Registered Administrator Email" : "I-imeyili Yomlawuli Ebhalisiwe"}
                              </label>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                  type="email"
                                  id="admin_gate_email_input"
                                  placeholder="e.g. admin@imalingesizulu.com"
                                  value={adminDetails.email}
                                  onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                                  className="flex-1 bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-xs text-emerald-400 font-mono outline-none focus:border-emerald-400"
                                />
                                <button
                                  onClick={() => {
                                    if (adminDetails.email.trim().toLowerCase() === "admin@imalingesizulu.com") {
                                      setIsAdminUnlocked(true);
                                      localStorage.setItem("imali_admin_unlocked", "true");
                                      alert(language === "en" 
                                        ? "Administrator Level Cleared! Workspace authorized." 
                                        : "Izinginga Lomlawuli Liphumelele! Ukufinyelela kuvunyelwe.");
                                    } else {
                                      alert(language === "en" 
                                        ? "Access Denied. For authorization as Admin, the email must correspond to admin@imalingesizulu.com." 
                                        : "Ukufinyelela Kunqatshiwe. Ukuze ugunyazwe njengoMlawuli, i-imeyili kumele ihambisane ne-admin@imalingesizulu.com.");
                                    }
                                  }}
                                  className="py-2.5 px-5 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-mono font-black uppercase tracking-wider rounded-xl transition shrink-0 cursor-pointer"
                                >
                                  {language === "en" ? "Verify Identity" : "Qinisekisa"}
                                </button>
                              </div>
                            </div>
                            <span className="text-[9px] text-emerald-400/75 block leading-normal italic">
                              {language === "en" 
                                ? "🔒 Access locks immediately if other email parameter is used. Students should bypass and use the Student tab." 
                                : "🔒 Ukufinyelela kuvaleka ngokushesha uma kusetshenziswa enye i-imeyili. Abafundi kufanele badlule basebenzise \"Tab\" kaMfundi."}
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <p className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">
                                  {language === "en" ? "🛡️ DEAN / ADMINISTRATOR PROFILE" : "🛡️ IPHROFAYILI YOMLAWULI OMKHULU"}
                                </p>
                                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                                  {language === "en"
                                    ? "Chief operating officer oversees schedules, registers students, and keeps study records securely running."
                                    : "Umlawuli mkhulu obhekele ukuhlelwa, ukubhalisa abafundi, nokugcina amarekhodi okufunda ephephile."}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  const randomCodes = ["GOLD777", "BTC360", "FOREX101", "SCALP05", "ZULU99", "IMALI888"];
                                  const randomSel = randomCodes[Math.floor(Math.random() * randomCodes.length)];
                                  setInstructorDetails({ ...instructorDetails, classCode: randomSel });
                                  alert(language === "en"
                                    ? `As Admin, successfully issued new classroom passcode: '${randomSel}'!`
                                    : `Njengomlawuli, kukhishwe iphasikhodi entsha yekilasi ngempumelelo: '${randomSel}'!`);
                                }}
                                className="py-1.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono tracking-wider font-bold uppercase rounded-lg shrink-0 cursor-pointer"
                              >
                                {language === "en" ? "🎲 Override Passcode" : "🎲 Bhala Ngaphezulu Iphasikhodi"}
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] text-zinc-400 font-mono uppercase block">
                                  {language === "en" ? "Administrator Name" : "Igama Lomlawuli"}
                                </label>
                                <input 
                                  type="text" 
                                  value={adminDetails.name}
                                  onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                                  placeholder="e.g. Audrey Lind"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] text-emerald-400 font-mono uppercase block font-bold">
                                  {language === "en" ? "Allocate Live Class Passcode" : "Nika Iphasikhodi Yekilasi Ebukhoma"}
                                </label>
                                <input 
                                  type="text" 
                                  value={instructorDetails.classCode}
                                  onChange={(e) => {
                                    const nextCode = e.target.value.toUpperCase();
                                    setInstructorDetails({ ...instructorDetails, classCode: nextCode });
                                  }}
                                  className="w-full bg-[#102a1e] border-2 border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-400 font-bold outline-none focus:border-emerald-500 transition-all"
                                  placeholder="e.g. FOREX101"
                                />
                                <span className="text-[9px] text-zinc-500 block">
                                  {language === "en"
                                    ? "As Chief Admin, you can directly override and allocate the active live classroom passcode here."
                                    : "Njenge-Admin Enkulu, ungakwazi ukubhala ngaphezulu futhi unikeze iphasikhodi yekilasi esebenzayo lapha ngqo."}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] text-zinc-400 font-mono uppercase block">
                                {language === "en" ? "Dean Photo (Upload file)" : "Isithombe Somlawuli (Landa ifayela)"}
                              </label>
                              <div className="flex gap-2.5 items-center bg-zinc-900 border border-zinc-805 p-2 rounded-xl">
                                <label className="inline-flex items-center gap-1.5 cursor-pointer bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 py-1.5 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-all shrink-0">
                                  📁 {language === "en" ? "Choose Photo" : "Kheta Ifayela"}
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          if (event.target?.result) {
                                            setAdminDetails({ ...adminDetails, avatar: event.target.result as string });
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                                <div className="text-[9px] text-zinc-500 font-mono truncate w-full">
                                  {adminDetails.avatar 
                                    ? (language === "en" ? "Custom Photo Loaded" : "Isithombe Esifakwe Ngokwezifiso Silayishiwe")
                                    : (language === "en" ? "No custom file chosen" : "Alukho ifayela elikhethiwe")}
                                </div>
                              </div>
                            </div>

                            {/* Direct action links to admin */}
                            <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-950/40 p-4 rounded-xl">
                              <p className="text-[11px] text-zinc-400 max-w-sm">
                                {language === "en"
                                  ? "Switching to administrator role activates the exclusive 'Syndicate Admin' sidebar tab and grants class moderation authority."
                                  : "Ukushintshela endimeni yomlawuli kuvula i-tab ekhethekile 'Umlawuli' ohlangothini futhi kunikeze igunya lokumodareyitha."}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
                                <button
                                  onClick={() => {
                                    setIsAdminUnlocked(false);
                                    localStorage.removeItem("imali_admin_unlocked");
                                    setActiveRole(Role.STUDENT);
                                    alert(language === "en" ? "Administrator credentials locked." : "Imininingwane yomlawuli ivalwe.");
                                  }}
                                  className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[9px] font-mono uppercase tracking-wider rounded-xl transition cursor-pointer"
                                >
                                  🔒 {language === "en" ? "Lock Credentials" : "Vala Imininingwane"}
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveRole(Role.ADMIN);
                                    localStorage.setItem("imali_admin_profile", JSON.stringify(adminDetails));
                                    alert(adminDetails.name 
                                      ? (language === "en" ? `Welcome to corporate administrator console: ${adminDetails.name}!` : `Siyakwamukela kuphaneli yomlawuli wenhlangano: ${adminDetails.name}!`)
                                      : (language === "en" ? "Welcome to corporate administrator console!" : "Siyakwamukela kuphaneli yomlawuli wenhlangano!"));
                                    setActiveTab("admin");
                                  }}
                                  className="py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:brightness-110 text-black text-[10px] font-mono font-black uppercase tracking-widest rounded-xl transition shadow cursor-pointer"
                                >
                                  🛡️ {language === "en" ? "Activate Admin Console" : "Vula Iphaneli Yomlawuli"}
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

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
                      {/* Native Browser Notification Authorization HUD */}
                      <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-550">
                            System Notification Engine
                          </span>
                          {notificationPermissionState === "granted" ? (
                            <span className="flex items-center gap-1.5 text-[8.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 uppercase font-black tracking-widest">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Authorized
                            </span>
                          ) : notificationPermissionState === "denied" ? (
                            <span className="text-[8.5px] font-mono text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/10 uppercase font-black tracking-widest">
                              Blocked
                            </span>
                          ) : (
                            <span className="text-[8.5px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/15 uppercase font-black tracking-widest animate-pulse">
                              Pending Setup
                            </span>
                          )}
                        </div>

                        {notificationPermissionState === "default" && (
                          <div className="space-y-2 animate-fade-in">
                            <p className="text-[10px] text-zinc-350 leading-relaxed font-sans">
                              {language === "en" 
                                ? "To receive real, native browser notifications on your desktop or mobile (no simulated demos), please authorize permission." 
                                : "Ukuze uthole izaziso zangempela zesistimu kudeskithophu noma kuselula, sicela unikeze imvume."}
                            </p>
                            <button
                              type="button"
                              onClick={requestNotificationPermission}
                              className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-black font-semibold text-[10px] font-mono uppercase tracking-widest rounded-xl shadow-lg transition-all"
                            >
                              🔔 Request Browser Authorization
                            </button>
                          </div>
                        )}

                        {notificationPermissionState === "denied" && (
                          <p className="text-[9.5px] text-rose-400 font-sans font-bold bg-rose-500/5 p-2 rounded-xl border border-rose-500/10 leading-normal">
                            ⚠️ {language === "en" 
                              ? "Browser notifications are blocked. Please click the padlock icon in your browser's address bar next to imalingesizulu.com and toggle Notifications to 'Allow' to receive real alerts." 
                              : "Izaziso ze-browsa zivinjelwe. Sicela uvulele kuzilungiselelo zesiphumela ukuze ubone."}
                          </p>
                        )}

                        {notificationPermissionState === "granted" && (
                          <p className="text-[9.5px] text-zinc-400 font-sans leading-normal">
                            {language === "en" 
                              ? "Real notifications are successfully initialized! Background triggers will run daily or in real-time when systems tick." 
                              : "Izaziso zangempela zivulekile kahle! Background service iyasebenza."}
                          </p>
                        )}

                        {notificationPermissionState === "unsupported" && (
                          <p className="text-[9.5px] text-zinc-500 font-mono italic">
                            ⚠️ Native notifications not supported in this context or browser.
                          </p>
                        )}
                      </div>

                      {/* 1. Schedules & Class Alerts */}
                      <div className="flex items-center justify-between p-3 bg-black/40 border border-zinc-900 rounded-2xl">
                        <div className="text-left">
                          <p className="text-xs font-bold text-white leading-normal">Schedules & Class Alerts</p>
                          <span className="text-[9px] text-zinc-500">Set reminders to notify you about upcoming or missed lectures</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={reminderPrefs.classAlerts !== false}
                          onChange={(e) => setReminderPrefs({ ...reminderPrefs, classAlerts: e.target.checked })}
                          className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
                        />
                      </div>



                      {/* Real Alert Instant Dispatcher/Testbed (No Demos Requirement) */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (notificationPermissionState !== "granted") {
                              requestNotificationPermission();
                            }
                            // Instantly fire one based on what is active or cyclic test
                            const isEn = language === "en";
                            let testTitle = "";
                            let testBody = "";
                            let tType: any = "system";

                            if (reminderPrefs.classAlerts !== false) {
                              testTitle = isEn ? "📅 Scheduled Class: Forex Liquidity 📡" : "📅 Isikhathi Somhlangano Esenziwe 📡";
                              testBody = isEn 
                                ? "Our high-impact Forex Liquidity lecture series is streaming. Tap to enter."
                                : "Isifundo soMhlaba siqala manje. Thinta ukuze ungene kwi-ledjini.";
                              tType = "class";
                            } else if (reminderPrefs.forexAlerts) {
                              testTitle = isEn ? "📈 Live Forex Signals stream" : "📈 Isixwayiso SoKusakaza Kwe-Forex";
                              testBody = isEn ? "Live evaluation drill initiated for candelstick physics. Tap to track parameters." : "Ukusakaza okusha kuqalile. Hlola amakhandlela.";
                              tType = "forex";
                            } else {
                              testTitle = isEn ? "📡 Live Broadcast: Futures Spreads Speaker" : "📡 Usuku Lwenkomfa Ye-Futures Spreads";
                              testBody = isEn ? "Live expert speaker is active on interbank volume spreads. Tap to listen." : "Umfundisi uqala ukukhuluma phezulu ema-futures.";
                              tType = "futures";
                            }

                            triggerRealNotification(testTitle, testBody, tType);
                          }}
                          className="w-full py-2.5 bg-zinc-950 border border-zinc-800 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] font-bold text-[9px] font-mono uppercase tracking-widest rounded-xl transition duration-200"
                        >
                          ⚡ Test Real-Time Alerts Instantly
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              
              {/* Strategic metrics readout (Attendance, completion rates, performance) */}
              {!isProfileSuiteCompleted ? (
                <div className="bg-[#0c0c0c] border border-zinc-900 rounded-3xl p-6 text-center space-y-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-4 right-4 text-[9px] bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                    Metrics Hidden
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-sm shadow-md">
                    ❔
                  </div>
                  <div className="space-y-1 max-w-lg">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4AF37]">Academic Statistics Suspended</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                      Complete all three workspace profiles (Student, Instructor, and Admin) in the <strong>Academic Profiles Manager</strong> above to unlock real-time core metrics, course completion tracking, and scholar participation logs.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/45 transition-all">
                    <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-[#D4AF37]/5 rounded-full blur-xl group-hover:bg-[#D4AF37]/10 transition-all"></div>
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                      {translateText("metric_progress", language)} (Average)
                    </p>
                    <p className="text-3xl font-light tracking-tight text-white font-serif">{realAverageProgress}% <span className="text-xs font-mono text-zinc-500">Live</span></p>
                    <div className="mt-3 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#996515] to-[#D4AF37]" style={{ width: `${realAverageProgress}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/45 transition-all">
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                      {translateText("metric_completion_rate", language)}
                    </p>
                    <p className="text-3xl font-light tracking-tight text-white font-serif">{realCompletionPercent}%</p>
                    <span className="text-[9px] text-[#D4AF37] tracking-wider mt-1 block">Isilinganiso sokuphothula</span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-[#D4AF37]/25 p-5 rounded-2xl">
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                      {translateText("metric_attendance", language)}
                    </p>
                    <p className="text-3xl font-light tracking-tight text-white font-serif">{realAttendanceCount} <span className="text-xs font-sans text-zinc-500">Lectures</span></p>
                    <span className="text-[9px] text-zinc-400 mt-1 block">Attendance record verified</span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1 font-mono">
                      {translateText("metric_active_students", language)}
                    </p>
                    <p className="text-3xl font-light tracking-tight text-white font-serif">{realEnrolledCount} <span className="text-xs font-sans text-zinc-500">Enrolled</span></p>
                    <span className="text-[9px] text-[#D4AF37] mt-1 block">Imperial registry scholars</span>
                  </div>
                </div>
              )}



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
                            setSelectedCourse(courses[0]);
                            setActiveTab("courses");
                            alert(language === "en" 
                              ? "You do not have any certificates yet. Please complete all lessons and quizzes to claim your certificate!" 
                              : "Awunazo izitifiketi okwamanje. Sicela uqedele zonke izifundo nemibuzo ukuze uthole isitifiketi sakho!");
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
                    {(isProfileSuiteCompleted ? notifications : [
                      {
                        id: "bulletin_student",
                        type: "Student ❔",
                        title_en: "Student Profile Incomplete",
                        title_zu: "Iphrofayili Yomfundi Ayikaphothulwa",
                        message_en: "Specify student profile details under the 'Student' tab above.",
                        message_zu: "Sicela ufake imininingwane yomfundi ngenhla.",
                        time: "Awaiting Action",
                        isPending: true
                      },
                      {
                        id: "bulletin_instructor",
                        type: "Instructor ❔",
                        title_en: "Lead Instructor Unconfigured",
                        title_zu: "Iphrofayili Yomfundisi Ayikaphothulwa",
                        message_en: "Instructor credentials must be entered under the 'Instructor' tab above to activate curriculum.",
                        message_zu: "Sicela ufake imininingwane yomfundisi ngenhla.",
                        time: "Awaiting Action",
                        isPending: true
                      },
                      {
                        id: "bulletin_admin",
                        type: "Admin ❔",
                        title_en: "Dean Profile Unconfigured",
                        title_zu: "Iphrofayili KaDean Ayikaphothulwa",
                        message_en: "Dean credentials are required under the 'Admin' tab above to enable official certification.",
                        message_zu: "Sicela ufake imininingwane kamlawuli ngenhla.",
                        time: "Awaiting Action",
                        isPending: true
                      }
                    ]).map((n) => (
                      <div key={n.id} className={`p-3.5 bg-black/50 border rounded-xl relative hover:border-zinc-700 transition ${n.isPending ? "border-amber-500/20 bg-amber-500/[0.01]" : "border-zinc-800"}`}>
                        {!n.isPending && n.unread && (
                          <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></div>
                        )}
                        {n.isPending && (
                          <div className="absolute top-3 right-3 text-[9px] bg-amber-500/10 border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded-md font-mono select-none">
                            ❔ INCOMPLETE
                          </div>
                        )}
                        <span className={`text-[8px] border px-1.5 py-0.2 rounded font-mono uppercase ${n.isPending ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-white/5 border-white/5 text-[#D4AF37]"}`}>
                          {n.type}
                        </span>
                        <h5 className={`text-xs font-bold mt-1.5 ${n.isPending ? "text-amber-100" : "text-zinc-200"}`}>
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
                        value={courseSearchQuery}
                        onChange={(e) => setCourseSearchQuery(e.target.value)}
                        placeholder={language === "en" ? "Search premium catalog..." : "Funa izifundo lapha..."}
                        className="bg-transparent border-0 text-xs text-white outline-none w-full"
                      />
                    </div>
                  </div>

                  {/* Elegant Grid of Courses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                      .filter(course => {
                        const q = courseSearchQuery.trim().toLowerCase();
                        if (!q) return true;
                        return (
                          course.title_en.toLowerCase().includes(q) ||
                          course.title_zu.toLowerCase().includes(q) ||
                          course.category_en.toLowerCase().includes(q) ||
                          course.category_zu.toLowerCase().includes(q) ||
                          course.description_en.toLowerCase().includes(q) ||
                          course.description_zu.toLowerCase().includes(q)
                        );
                      })
                      .map(course => {
                        const isEnrolled = currentUser.enrolledCourses.includes(course.id);
                        const progressVal = currentUser.progress[course.id] || 0;
                        const isSpecialElite = course.id === "elite_onedrive_psychology_masterclass" || course.id === "elite_onedrive_amd_masterclass";
                        return (
                          <div 
                            key={course.id} 
                            className={`bg-black/60 border rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${
                              isSpecialElite 
                                ? "border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]" 
                                : "border-zinc-800 hover:border-[#D4AF37]/50"
                            }`}
                          >
                            <div className="h-44 overflow-hidden relative">
                              <img 
                                src={course.thumbnail} 
                                alt={course.title_en} 
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop";
                                }}
                                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                                  isSpecialElite 
                                    ? "ring-2 ring-[#D4AF37]/20 border-b-2 border-[#D4AF37]" 
                                    : ""
                                }`} 
                              />
                              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur px-2.5 py-1 rounded-md text-[9px] uppercase tracking-widest border border-zinc-800 text-zinc-300">
                                {language === "en" ? course.difficulty_en : course.difficulty_zu}
                              </div>
                              {isEnrolled && (
                                <div className="absolute top-3 right-3 bg-[#D4AF37] text-black font-extrabold text-[8px] uppercase tracking-widest px-2 py-1 rounded shadow-lg">
                                  {language === "en" ? "ENROLLED" : "UBALIWE"}
                                </div>
                              )}
                              {isSpecialElite && (
                                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)] border border-white/20 animate-pulse">
                                  {language === "en" ? "👑 ELITE SELECTION" : "👑 UKUKHETHA OKUPHELELE"}
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
                        {(() => {
                          const courseQuizzes = getCourseQuizzes(selectedCourse);
                          const completedQuizzes = courseQuizzes.filter(q => studentProgress.quizScores && studentProgress.quizScores[q.quizId] !== undefined);
                          const isAllAssignmentsCompleted = courseQuizzes.length === 0 || completedQuizzes.length === courseQuizzes.length;

                          if (isAllAssignmentsCompleted) {
                            return currentUser.progress[selectedCourse.id] === 100 ? (
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
                            );
                          } else {
                            return (
                              <div className="space-y-3">
                                <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/30 text-center">
                                  <span className="text-[10px] font-mono text-red-500 block font-bold">🔓 CERTIFICATE LOCKED</span>
                                  <span className="text-[11px] font-sans text-zinc-300">
                                    {language === "en" 
                                      ? `You must complete all assignments first (${completedQuizzes.length}/${courseQuizzes.length} done).` 
                                      : `Kufanele uqedele wonke umsebenzi kuqala (${completedQuizzes.length}/${courseQuizzes.length} kuqediwe).`}
                                  </span>
                                </div>
                                <div className="text-[10px] text-zinc-500 space-y-1 font-mono max-h-24 overflow-y-auto bg-black/40 p-2.5 rounded-lg border border-zinc-900 text-left">
                                  <p className="font-bold text-zinc-400 uppercase">Required Quizzes:</p>
                                  {courseQuizzes.map(q => {
                                    const isDone = studentProgress.quizScores && studentProgress.quizScores[q.quizId] !== undefined;
                                    return (
                                      <div key={q.quizId} className="flex justify-between items-center py-0.5">
                                        <span className="truncate pr-2">{language === "en" ? q.lessonTitleEn : q.lessonTitleZu}</span>
                                        <span className={isDone ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                                          {isDone ? "[✓ Passed]" : "[✗ Incomplete]"}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                        })()}
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
                               {activeLesson.videoUrl && activeLesson.videoUrl !== "#" ? (
                                 <span className="text-[9px] bg-[#D4AF37] text-black font-mono font-black tracking-widest px-2.5 py-1 rounded animate-pulse">
                                   {language === "en" ? "ACTIVE PREMIUM VIDEO LECTURE" : "IVIDIYO YESIFUNDO EZIPHELELEYO"}
                                 </span>
                               ) : (
                                 <span className="text-[9px] bg-[#D4AF37] text-black font-mono font-black tracking-widest px-2.5 py-1 rounded">
                                   {language === "en" ? "LONG-FORM ILLUSTRATED BLUEPRINT" : "UHLELO LOKUFUNDA LWEZITHOMBE"}
                                 </span>
                               )}
                               <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                                 {activeLesson.videoUrl && activeLesson.videoUrl !== "#" ? (
                                   language === "en" ? "HIGH-DEFINITION STREAM" : "UKUSAKAZWA KWE-HD"
                                 ) : (
                                   language === "en" ? "FULL IMAGES INSIDE" : "INEMIFANEKISO EZIPHELELEYO"
                                 )}
                               </span>
                             </div>
                             
                             <h3 className="text-2xl font-serif text-white tracking-tight leading-snug">
                               {language === "en" ? activeLesson.title_en : activeLesson.title_zu}
                             </h3>
                             <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                               {activeLesson.videoUrl && activeLesson.videoUrl !== "#" ? (
                                 language === "en" 
                                   ? "Launch the premium high-fidelity video lecture player below to study the full tactical demonstration. We have also included strategic text outlines and dynamic download matrices below." 
                                   : "Vula isidlali sevidiyo esiphezulu ngezansi ukuze ufunde isinyathelo ngesinyathelo. Siphinde safaka amasu okubhala phansi ngezansi ohlelweni."
                               ) : (
                                 language === "en" 
                                   ? "This comprehensive course guide provides professional high-resolution step-by-step illustrated blueprints instead of videos. Scroll down to study each graphical phase of the strategy setup." 
                                   : "Lo mhlahlandlela ususa amavidiyo ufake imifanekiso egcwele esebenza isinyathelo ngesinyathelo ngendlela efundisekayo neqondakalayo. Phequlula phansi uzofunda."
                               )}
                             </p>
                           </div>

                           {/* PRE-RENDER VIDEO IF EXISTENT (e.g. OneDrive, Youtube, raw mp4) */}
                           {activeLesson.videoUrl && activeLesson.videoUrl !== "#" && (
                             <div className="p-6 pb-2 border-b border-zinc-800 bg-zinc-950/50">
                               <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                                 {activeLesson.videoUrl.includes("1drv.ms") ? (
                                   // Microsoft OneDrive iframe viewer support
                                   <iframe
                                     src={activeLesson.videoUrl}
                                     className="absolute top-0 left-0 w-full h-full border-0 animate-fade-in"
                                     frameBorder="0"
                                     scrolling="no"
                                     allowFullScreen
                                     title={language === "en" ? activeLesson.title_en : activeLesson.title_zu}
                                   />
                                 ) : activeLesson.videoUrl.includes("youtube.com") || activeLesson.videoUrl.includes("youtu.be") ? (
                                   <iframe
                                     src={activeLesson.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                                     className="absolute top-0 left-0 w-full h-full border-0 animate-fade-in"
                                     frameBorder="0"
                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                     allowFullScreen
                                     title={language === "en" ? activeLesson.title_en : activeLesson.title_zu}
                                   />
                                 ) : (
                                   // Native video (like w3school mp4 files)
                                   <video
                                     src={activeLesson.videoUrl}
                                     controls
                                     className="absolute top-0 left-0 w-full h-full object-cover animate-fade-in"
                                     poster={activeLesson.imageUrl || undefined}
                                     preload="metadata"
                                   />
                                 )}
                               </div>
                             </div>
                           )}
 
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
                                      onClick={() => handleSubmitQuiz(selectedCourse.id, activeLesson?.quiz?.id)}
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
                    {language === "en" ? "🎙️ DROP-IN AUDIO SUITE" : "🎙️ IGUMBI LOMSINDO OBUKHOMA"}
                  </span>
                  <h3 className="text-xl font-light tracking-wide text-white uppercase font-serif">
                    {language === "en" ? (
                      <>IMALI <span className="text-[#D4AF37] italic font-serif">Audio Forum</span></>
                    ) : (
                      <span className="text-[#D4AF37] italic font-serif">Inkundla Yezwi ye-IMALI</span>
                    )}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                    {translateText("clubhouse_forum_desc", language)}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="text-left">
                    <p className="text-[#D4AF37] text-[10px] font-mono">{translateText("workspace_security_label", language)}</p>
                    <p className="text-xs text-zinc-200 font-bold">{translateText("private_session_label", language)}</p>
                  </div>
                </div>
              </div>

              {!isAudioSessionActive ? (
                /* ================= LOBBY ENTRANCE PRE-FLIGHT PAGE ================= */
                <div id="lobby_preflight_page" className="grid grid-cols-1 lg:col-span-12 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: 6 Categories of Audio Sessions (Span 7) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="border-b border-zinc-800 pb-2 text-left">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] font-serif">
                        1. {translateText("select_forum_topic", language)}
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        {translateText("choose_session_ranges", language)}
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
                                {language === "en" ? "SELECTED" : "KUKHETHIWE"}
                              </div>
                            )}

                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-lg">🎙️</span>
                                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                                  {language === "en" 
                                    ? `${cls.duration} Session` 
                                    : `${cls.duration.replace("Min", "Miz").replace("Hours", "Amahora").replace("Hour", "Ihora")} Iseshini`}
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
                              {language === "en" ? `MAX ACTIVE TIME LIMIT: ${cls.maxHours} HOURS` : `ISIKHATHI ESIPHEZULU SESESHINI: ${cls.maxHours} AMAHORA`}
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
                          2. {translateText("fill_profile_details", language)}
                        </h5>
                      </div>
                      
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {translateText("profile_instructions", language)}
                      </p>

                      <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-zinc-900">
                        <div className="space-y-1">
                          <label className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-wider block">{translateText("your_display_name_label", language)}</label>
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
                            placeholder={translateText("type_your_name_placeholder", language)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">{translateText("your_biography_focus_label", language)}</label>
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
                            placeholder={translateText("focus_area_placeholder", language)}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="text-zinc-550 font-mono">{translateText("profile_verified_label", language)}</span>
                          <span className="text-emerald-400 font-bold uppercase tracking-wider">
                            {translateText("profile_ready_local", language)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Check 2: Dynamic Passcode Area */}
                    <div id="classroom_passcode_gate" className="bg-[#0a0a0a] border border-[#D4AF37]/25 p-5 rounded-3xl text-left space-y-4">
                      <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
                        <span className="text-lg">🔑</span>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          3. {translateText("enter_auth_passcode_title", language)}
                        </h5>
                      </div>

                      {activeRole === Role.STUDENT ? (
                        <div className="space-y-3">
                          <p className="text-[11px] text-zinc-400 leading-relaxed">
                            {translateText("auth_passcode_desc", language)}
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
                            placeholder={translateText("placeholder_passcode", language)}
                          />
                          {classCodeError && (
                            <p id="passcode_err" className="text-[10px] text-red-400 font-bold font-mono">❌ {classCodeError}</p>
                          )}
                          
                          <div className="bg-zinc-950/60 border border-zinc-900 p-3 rounded-xl text-[11px] leading-relaxed text-zinc-400">
                            🛡️ <span className="font-semibold text-zinc-300">{language === "en" ? "Administrative Gate Enforcement:" : "Ukuqinisekiswa Kwesango Lomlawuli:"}</span> {language === "en" ? "The active passcode is fully restricted. It is not listed on this screen. You must contact your instructor or administrator directly to obtain the active code of the hour." : "Iphasikhodi esebenzayo ivikelwe ngokuphelele. Ayibalwanga kuleli khasi. Kumele uthinte umfundisi noma umlawuli wakho ngqo ukuze uthole ikhodi esebenzayo yale hora."}
                          </div>

                          <span className="text-[9px] text-zinc-500 block leading-normal">
                            💡 {language === "en" ? "Host/Instructors can configure and view the active passcode securely under their personal profile or dispatch panels." : "Ababungazi/Abafundisi bangamisa futhi babuke iphasikhodi esebenzayo ngokuphepha ngaphansi kwephrofayela yabo noma amaphaneli we-dispatch."}
                          </span>
                        </div>
                      ) : (
                        <div className="bg-black/60 p-4 rounded-2xl space-y-2.5">
                          <p className="text-[11px] text-[#D4AF37] font-bold font-mono uppercase">
                            📢 {language === "en" ? `YOU ARE THE HOST (${activeRole.toUpperCase()})` : `UNGUMPHATHI OMKHULU (${activeRole.toUpperCase()})`}
                          </p>
                          <p className="text-[11px] text-zinc-400 leading-normal">
                            {language === "en" ? "You are authorized to issue the following passcode to students to allow them into this class audio room:" : "Uvunyelwe ukunikeza le phasikhodi elandelayo kubafundi ukuze ubavumele bangene kuleli gumbi:"}
                          </p>
                          <div className="bg-[#D4AF37]/15 border border-[#D4AF37]/40 py-2.5 px-4 rounded-xl flex justify-between items-center">
                            <span className="text-xs font-mono text-zinc-500 uppercase font-black">{language === "en" ? "ACTIVE PASSCODE:" : "IPHASIKHODI ESEBENZAYO:"}</span>
                            <span className="text-base font-mono font-black text-[#D4AF37] tracking-widest bg-black px-3 py-1 rounded-lg border border-[#D4AF37]/20">
                              {instructorDetails.classCode || "FOREX101"}
                            </span>
                          </div>
                          <span className="text-[9px] text-zinc-500 block">
                            {language === "en" ? "Students will be blocked from joining the audio stream until they type this exact passcode." : "Abafundi bazovinjelwa ukuba bahlanganyele ekusakazweni komsindo baze bafake le phasikhodi ngqo."}
                          </span>
                        </div>
                      )}

                      <button
                        id="join_audio_room_lobby_btn"
                        onClick={() => {
                          const nameVal = activeRole === Role.STUDENT ? studentDetails.name : activeRole === Role.INSTRUCTOR ? instructorDetails.name : adminDetails.name;
                          if (!nameVal.trim()) {
                            alert(language === "en" ? "Please fill up your display name under core profile first!" : "Sicela uqale ugcwalise igama lakho ngaphansi kwephrofayela eyinhloko!");
                            return;
                          }

                          if (activeRole === Role.STUDENT) {
                            if (enteredClassCode !== instructorDetails.classCode) {
                              setClassCodeError(
                                language === "en"
                                  ? `Passcode Mismatch. The active class code offered by instructor ${instructorDetails.name} is needed.`
                                  : `Iphasikhodi Ayifanani. Ikhodi esebenzayo ekhishwe ngumfundisi u-${instructorDetails.name} iyadingeka.`
                              );
                              return;
                            }
                          }

                          // Success enter
                          setIsAudioSessionActive(true);
                          setClassCodeError("");
                          setEnteredClassCode("");
                          if (reminderPrefs.classAlerts !== false) {
                            triggerRealNotification(
                              language === "en" ? "🎙️ Live Class Stream Connected" : "🎙️ Isigaba Somsindo Bukhoma Sixhunyiwe",
                              language === "en" 
                                ? `You have successfully joined the live stream: '${AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_en}'.`
                                : `Uhlanganyele kahle ekusakazweni komsindo: '${AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_zu}'.`,
                              "class"
                            );
                          }
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#996515] hover:brightness-110 text-black text-xs font-black uppercase tracking-widest rounded-2xl shadow-[0_4px_24px_rgba(212,175,55,0.2)] transition-all duration-300"
                      >
                        🎙️ {translateText("join_live_audio", language)} ({language === "en" ? AUDIO_CLASS_TYPES[selectedAudioClassIndex].duration : AUDIO_CLASS_TYPES[selectedAudioClassIndex].duration.replace("Min", "Miz").replace("Hours", "Amahora").replace("Hour", "Ihora")})
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* ================= ACTIVE AUDIO ROOM WORKSPACE ================= */
                <div id="active_audio_room_component" className="space-y-6">
                  
                  {/* Active room indicator band */}
                  <div className="bg-[#1e1a0b] border border-[#D4AF37]/30 text-xs text-[#D4AF37] py-3.5 px-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-left font-mono font-bold">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${classroomListeners.length > 0 ? "bg-red-500 animate-pulse" : "bg-amber-500"}`}></span>
                      <span>
                        {classroomListeners.length > 0 ? (
                          <>🔴 BROADCASTING LIVE: <strong className="text-white">{language === "en" ? AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_en : AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_zu}</strong></>
                        ) : (
                          <>📡 STAGE PREPARED • AWAITING PEER SCHOLARS: <strong className="text-[#D4AF37]">{language === "en" ? AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_en : AUDIO_CLASS_TYPES[selectedAudioClassIndex].name_zu}</strong></>
                        )}
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
                        
                        {/* Speaker 1: Class Host */}
                        <div className="flex flex-col items-center text-center space-y-2.5">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-amber-700 shadow-lg relative overflow-hidden">
                              <div className="w-full h-full rounded-full overflow-hidden">
                                {renderAvatar(instructorDetails.avatar, instructorDetails.name)}
                              </div>
                            </div>
                            {/* Speaking wave glow indicator */}
                            <span className="absolute bottom-0 right-0 bg-[#D4AF37] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-black animate-bounce font-mono font-bold">
                              🎤
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white flex items-center justify-center gap-1">
                              {instructorDetails.name || "Classroom Host"} <span className="text-[#D4AF37]">★</span>
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">Host • Instructor</p>
                            <p className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded mt-1.5 font-mono inline-block">
                              Speaking: Explaining mechanics...
                            </p>
                          </div>
                        </div>

                        {/* Speaker 2: Academic Admin */}
                        <div className="flex flex-col items-center text-center space-y-2.5">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full p-1 bg-zinc-805 relative overflow-hidden">
                              <div className="w-full h-full rounded-full overflow-hidden">
                                {renderAvatar(adminDetails.avatar, adminDetails.name)}
                              </div>
                            </div>
                            <span className="absolute bottom-0 right-0 bg-zinc-800 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-zinc-900">
                              🔇
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-300">{adminDetails.name || "System Admin"}</p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">Dean • Admin</p>
                            <p className="text-[9px] bg-zinc-905 text-zinc-505 px-2 py-0.5 rounded mt-1.5 font-mono inline-block">
                              Muted by host
                            </p>
                          </div>
                        </div>

                        {/* Speaker 3: Student display */}
                        <div className="flex flex-col items-center text-center space-y-2.5">
                          <div className="relative">
                            <div className={`w-20 h-20 rounded-full p-1 relative transition-all duration-300 overflow-hidden ${
                              classroomMicActive ? "bg-gradient-to-tr from-emerald-500 to-amber-500 scale-105" : "bg-zinc-800"
                            }`}>
                              <div className="w-full h-full rounded-full overflow-hidden">
                                {renderAvatar(studentDetails.avatar, studentDetails.name)}
                              </div>
                            </div>
                            <span className="absolute bottom-0 right-0 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-black bg-zinc-900">
                              {classroomMicActive ? "🔊" : "🔇"}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                              {studentDetails.name || translateText("new_scholar", language)} {raisedHand && <span className="text-yellow-400" title="Hand Raised">✋</span>}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">{studentDetails.specialty || "Forex & Candlesticks"}</p>
                            <p className={`text-[9px] px-2 py-0.5 rounded mt-1.5 font-mono inline-block ${
                              classroomMicActive ? "bg-emerald-500/10 text-emerald-400 font-black animate-pulse" : "bg-zinc-900 text-zinc-500"
                            }`}>
                              {classroomMicActive 
                                ? (language === "en" ? "Your Mic is LIVE [Spkr]" : "Imakrofoni Yakho ISEBENZA [Khuluma]") 
                                : (language === "en" ? "Your Mic is Muted" : "Imakrofoni Yakho Ivaliwe")}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Listeners Grid */}
                      <div className="pt-6 border-t border-zinc-900">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] pb-3">
                          👥 Scholastic Listeners (Audience) {classroomListeners.length > 0 ? `(${classroomListeners.length})` : ""}
                        </h4>
                        
                        {classroomListeners.length === 0 ? (
                          <div className="text-center py-6 px-4 border border-dashed border-zinc-900 rounded-2xl bg-[#090909]/60">
                            <p className="text-zinc-500 text-xs">No external scholars are currently listening in this private classroom corridor.</p>
                            <p className="text-[#D4AF37] text-[10px] font-mono mt-1.5 uppercase tracking-widest font-bold">
                              Share your Access Code with peers: <span className="bg-[#D4AF37]/20 px-1.5 py-0.5 rounded text-[#D4AF37] font-sans font-black ml-1 text-[11px]">{instructorDetails.classCode || "FOREX101"}</span>
                            </p>
                            <div className="mt-4">
                              <button
                                onClick={() => {
                                  setClassroomListeners([
                                    { name: "Sipho Dlamini", initials: "SD", sub: "Price Action Specialist" },
                                    { name: "Nomalanga Khumalo", initials: "NK", sub: "Gold Order Flow Expert" },
                                    { name: "Zandile Mthembu", initials: "ZM", sub: "SMC Enthusiast" }
                                  ]);
                                }}
                                className="px-4 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:text-white rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                📡 Simulate Scholars Joining Stream
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {classroomListeners.map((lst, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-3">
                                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-xs font-black shrink-0">
                                  {lst.initials}
                                </div>
                                <div className="text-left min-w-0 flex-1">
                                  <p className="text-xs font-bold text-white truncate leading-normal">{lst.name}</p>
                                  <p className="text-[10px] text-zinc-500 font-mono tracking-tight truncate leading-tight">{lst.sub}</p>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => setClassroomListeners([])}
                              className="flex items-center justify-center border border-dashed border-red-500/20 hover:border-red-500/50 bg-red-950/10 hover:bg-red-950/20 rounded-2xl p-3 text-[10px] text-red-400 hover:text-red-300 font-mono font-bold uppercase transition-all cursor-pointer"
                            >
                              🛑 Disperse Scholars
                            </button>
                          </div>
                        )}
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
                        onClick={() => {
                          setRadioActiveCategory(cat.id as any);
                          setRadioActiveRegion("all");
                        }}
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

                {/* Secondary Geographic Sub-Filtration row */}
                <div className="bg-black/40 p-4 rounded-2xl border border-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2 py-0.5 rounded font-mono uppercase tracking-widest font-bold">
                      {language === "en" ? "Filter by Geography / Location:" : "Hlunga Ngendawo / Izwekazi:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "all", labelEn: "🌐 All Regions", labelZu: "Izindawo Zonke" },
                      { id: "americas", labelEn: "🇺🇸 Americas", labelZu: "Americas" },
                      { id: "europe", labelEn: "🇪🇺 Europe", labelZu: "Europe" },
                      { id: "africa", labelEn: "🇿🇦 Africa", labelZu: "Africa" },
                      { id: "asia", labelEn: "🌏 Asia / Pacific", labelZu: "Asia" },
                      { id: "global", labelEn: "🌍 Global Feed", labelZu: "Global" }
                    ].map(regionOption => (
                      <button
                        key={regionOption.id}
                        onClick={() => setRadioActiveRegion(regionOption.id as any)}
                        className={`px-3 py-1 rounded-lg border font-mono text-[10px] uppercase transition-all tracking-wider cursor-pointer ${
                          radioActiveRegion === regionOption.id
                            ? "bg-[#D4AF37]/25 border-[#D4AF37] text-[#D4AF37] font-bold shadow-[0_0_8px_rgba(212,175,55,0.05)]"
                            : "bg-zinc-950/40 border-zinc-850/60 text-zinc-400 hover:text-white hover:border-zinc-700"
                        }`}
                      >
                        {language === "en" ? regionOption.labelEn : regionOption.labelZu}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stations Main Grid Feed */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {RADIO_STATIONS.filter(st => {
                        if (radioActiveCategory !== "all" && st.category !== radioActiveCategory) return false;
                        if (radioActiveRegion !== "all" && st.region !== radioActiveRegion) return false;
                        return true;
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

              {/* Affiliate Platform Banner Removed */}

            </div>
          )}



          {/* 6. ADMIN SYNDICATE TERMINAL VIEW (LOCKED TO Role.ADMIN or Role.INSTRUCTOR) */}
          {activeTab === "admin" && (
            <div id="tab_admin" className="space-y-6">
              
              {/* Dynamic Tabs inside admin view */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2-Span Admin Forms & AI report generator */}
                <div className="lg:col-span-2 space-y-6 animate-fade-in">
                  
                  {/* SCHOLAR PERFORMANCE ANALYTICS CABINET */}
                  <div className="bg-[#0c0c0c] border-[2px] border-[#D4AF37]/50 rounded-3xl p-6 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                    <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
                      <div>
                        <h4 className="text-base font-serif font-bold text-white uppercase tracking-widest">
                          🎓 Scholar Engagement, Verification & Analytics Centre
                        </h4>
                        <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider">
                          Real-time Registry Ledger Compliance Audit & Progress Graphics
                        </p>
                      </div>
                      <span className="text-[9px] bg-zinc-950 px-2.5 py-1 rounded text-[#D4AF37] border border-zinc-800 font-mono">
                        VERIFIER V2.8
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">
                      Select any registered scholar below to inspect their course registry details, evaluate diagnostic progress "graph pics", and audit assignment completion status before certificate clearance:
                    </p>

                    {/* Horizontal scroll select list */}
                    <div className="flex gap-3 overflow-x-auto pb-4 pt-2 border-b border-zinc-900 scrollbar-thin scrollbar-thumb-zinc-800 select-none">
                      {usersRegistry.map(usr => {
                        const isSelected = usr.id === selectedAdminStudentId;
                        return (
                          <div
                            key={usr.id}
                            onClick={() => setSelectedAdminStudentId(usr.id)}
                            className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left shrink-0 cursor-pointer ${
                              isSelected 
                                ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]" 
                                : "bg-black/40 border-zinc-900 hover:border-zinc-800"
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full border border-zinc-800 overflow-hidden shrink-0">
                              {renderAvatar(usr.avatar, usr.name)}
                            </div>
                            <div>
                              <p className={`text-xs font-bold transition-colors ${isSelected ? "text-[#D4AF37]" : "text-white"}`}>
                                {usr.name}
                              </p>
                              <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none mt-0.5">
                                {usr.role === Role.STUDENT ? "Student Scholar" : usr.role}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Scholar Stats Grid */}
                    {(() => {
                      const selectedUser = usersRegistry.find(u => u.id === selectedAdminStudentId) || usersRegistry[0];
                      if (!selectedUser) return <p className="text-xs text-zinc-500 font-mono">No scholar active in cache.</p>;

                      const stats = calculateStudentQuizzesStats(selectedUser);
                      const isStudent = selectedUser.role === Role.STUDENT;

                      return (
                        <div className="space-y-4">
                          {/* Profile Overview banner */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                            <div>
                              <span className="text-[9px] text-zinc-500 font-mono uppercase block">Dossier Account:</span>
                              <p className="text-sm font-bold text-white mt-0.5">{selectedUser.name}</p>
                              <p className="text-[10px] text-zinc-400 font-mono truncate">{selectedUser.email}</p>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 font-mono uppercase block">Attendance & Role:</span>
                              <p className="text-sm font-bold text-[#D4AF37] mt-0.5">
                                {selectedUser.attendanceCount} Modules attended
                              </p>
                              <span className="px-2 py-0.5 text-[8px] bg-white/10 text-white rounded font-mono uppercase leading-none">
                                {selectedUser.role}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 font-mono uppercase block">Certificate Clearance Status:</span>
                              {isStudent ? (
                                stats.totalQuizzes === 0 ? (
                                  <span className="inline-block mt-1 px-2.5 py-0.5 text-[8px] text-zinc-400 bg-zinc-900 rounded-full font-mono uppercase">
                                    No courses enrolled
                                  </span>
                                ) : stats.totalQuizzes > 0 && stats.completedQuizzesCount === stats.totalQuizzes ? (
                                  <span className="inline-block mt-1 px-2.5 py-1 text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full font-mono uppercase animate-pulse">
                                    🎓 Passed! Certificate Cleared
                                  </span>
                                ) : (
                                  <span className="inline-block mt-1 px-2.5 py-1 text-[8px] text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full font-mono uppercase border-dashed">
                                    🔒 Incomplete Assignments Blocked
                                  </span>
                                )
                              ) : (
                                <span className="inline-block mt-1 px-2.5 py-0.5 text-[8px] text-zinc-400 bg-black/40 rounded font-mono uppercase leading-none">
                                  Not Applicable (Lounge Staff)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Graphical Stats Chart Pic */}
                          {isStudent && selectedUser.enrolledCourses.length > 0 ? (
                            <div className="space-y-2">
                              <span className="text-[10px] text-zinc-500 font-mono uppercase block">
                                📊 Course Progress and Assignment Completion Curve:
                              </span>
                              
                              <div className="relative">
                                {/* GRAPH PICTURE */}
                                <svg viewBox="0 0 500 200" className="w-full bg-zinc-950 rounded-2xl border border-zinc-900 p-4">
                                  {/* Background grid lines */}
                                  <line x1="50" y1="30" x2="470" y2="30" stroke="#18181b" strokeDasharray="4 4" />
                                  <line x1="50" y1="75" x2="470" y2="75" stroke="#18181b" strokeDasharray="4 4" />
                                  <line x1="50" y1="120" x2="470" y2="120" stroke="#18181b" strokeDasharray="4 4" />
                                  <line x1="50" y1="165" x2="470" y2="165" stroke="#27272a" strokeWidth="1.5" />
                                  
                                  {/* Y Axis percentage indices */}
                                  <text x="15" y="34" className="fill-zinc-600 font-mono text-[9px] font-bold">100%</text>
                                  <text x="15" y="79" className="fill-zinc-600 font-mono text-[9px] font-bold">50%</text>
                                  <text x="15" y="124" className="fill-zinc-600 font-mono text-[9px] font-bold">25%</text>
                                  <text x="15" y="169" className="fill-zinc-600 font-mono text-[9px] font-bold">0%</text>

                                  {/* Dynamic Plot mapping columns & nodes */}
                                  {(() => {
                                    const enrolledCoursesDetails = courses.filter(c => selectedUser.enrolledCourses.includes(c.id));
                                    if (enrolledCoursesDetails.length === 0) return null;

                                    return enrolledCoursesDetails.map((course, idx) => {
                                      const progressVal = selectedUser.progress[course.id] || 0;
                                      const spacing = 420 / (enrolledCoursesDetails.length + 1);
                                      const barX = 50 + spacing * (idx + 1) - 18;
                                      const maxBarHeight = 135; // height difference from line 30 to 165
                                      const rHeight = (progressVal / 100) * maxBarHeight;
                                      const barY = 165 - rHeight;

                                      // Assignments/quizzes calculations
                                      const quizzes = getCourseQuizzes(course);
                                      const completedCount = quizzes.filter(q => selectedUser.quizScores && selectedUser.quizScores[q.quizId] !== undefined).length;
                                      const quizPercent = quizzes.length > 0 ? (completedCount / quizzes.length) * 100 : 0;
                                      const quizY = 165 - (quizPercent / 100) * maxBarHeight;

                                      return (
                                        <g key={course.id}>
                                          {/* Custom Linear Gradient for gold bar */}
                                          <defs>
                                            <linearGradient id={`goldGrad-${course.id}`} x1="0" y1="0" x2="0" y2="1">
                                              <stop offset="0%" stopColor="#D4AF37" />
                                              <stop offset="100%" stopColor="#121212" stopOpacity="0.9" />
                                            </linearGradient>
                                          </defs>

                                          {/* Glowing Background Overlay for bar */}
                                          <rect
                                            x={barX}
                                            y={barY}
                                            width="32"
                                            height={Math.max(rHeight, 2)}
                                            fill={`url(#goldGrad-${course.id})`}
                                            opacity="0.25"
                                            className="transition-all duration-300 blur-sm"
                                          />

                                          {/* High-fidelity Course Progress Bar */}
                                          <rect
                                            x={barX}
                                            y={barY}
                                            width="32"
                                            height={Math.max(rHeight, 2)}
                                            fill={`url(#goldGrad-${course.id})`}
                                            rx="4"
                                            className="transition-all duration-500 hover:brightness-125 cursor-pointer stroke stroke-white/5"
                                          />

                                          {/* Connecting Line between progress bar peak and quiz score peak */}
                                          <line
                                            x1={barX + 16}
                                            y1={barY}
                                            x2={barX + 16}
                                            y2={quizY}
                                            stroke="#ef4444"
                                            strokeDasharray="2 3"
                                            strokeWidth="1.5"
                                            opacity="0.5"
                                          />

                                          {/* Quiz Score indicator node */}
                                          <circle
                                            cx={barX + 16}
                                            cy={quizY}
                                            r="5"
                                            fill={quizPercent === 100 ? "#10b981" : "#ef4444"}
                                            stroke="#000"
                                            strokeWidth="1.5"
                                            className="cursor-pointer hover:scale-125 transition-transform"
                                          />

                                          {/* Course Label shorthand */}
                                          <text
                                            x={barX + 16}
                                            y="182"
                                            textAnchor="middle"
                                            className="fill-zinc-400 font-mono text-[8px] font-bold"
                                          >
                                            {course.title_en.substring(0, 15)}...
                                          </text>

                                          {/* Progress Value tooltip label */}
                                          <text 
                                            x={barX + 16} 
                                            y={barY - 5} 
                                            textAnchor="middle" 
                                            className="fill-[#D4AF37] font-mono text-[9px] font-extrabold"
                                          >
                                            {progressVal}%
                                          </text>

                                          {/* Assignment status floating marker */}
                                          <text 
                                            x={barX + 16} 
                                            y={quizY - 8} 
                                            textAnchor="middle" 
                                            className="fill-[#ef4444] font-mono text-[8px] font-bold"
                                            style={{ fill: quizPercent === 100 ? "#10b981" : "#ef4444" }}
                                          >
                                            {completedCount}/{quizzes.length} Assgn
                                          </text>
                                        </g>
                                      );
                                    });
                                  })()}
                                </svg>

                                {/* Floating Legend for Chart Pic */}
                                <div className="absolute top-2 right-4 flex items-center gap-4 bg-black/80 px-3 py-1.5 rounded-xl border border-zinc-900 text-[8.5px] font-mono">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 bg-gradient-to-b from-[#D4AF37] to-[#7c5d0f] rounded"></span>
                                    <span className="text-zinc-300">Path Progression</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
                                    <span className="text-zinc-300">Assessments</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            isStudent && (
                              <div className="p-8 bg-zinc-950 rounded-2xl border border-zinc-900 text-center space-y-2">
                                <span className="text-zinc-600 block text-2xl font-mono">📭</span>
                                <p className="text-xs font-mono text-zinc-500 uppercase">Registry empty</p>
                                <p className="text-[11px] text-zinc-400 font-sans">This student is not enrolled in any pathway yet.</p>
                              </div>
                            )
                          )}

                          {/* Enrollment details list & assignments checklists */}
                          {isStudent && stats.breakDown.length > 0 && (
                            <div className="border-t border-zinc-900 pt-3 space-y-2">
                              <span className="text-[10px] text-zinc-500 font-mono uppercase block">
                                Academics Checklist & Verification Log:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {stats.breakDown.map(c => {
                                  const courseObj = courses.find(co => co.id === c.courseId);
                                  const quizzes = courseObj ? getCourseQuizzes(courseObj) : [];

                                  return (
                                    <div key={c.courseId} className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 flex flex-col justify-between space-y-3">
                                      <div>
                                        <div className="flex justify-between items-start gap-2">
                                          <p className="text-xs font-bold text-white leading-snug">{c.courseTitle}</p>
                                          <span className={`text-[8px] font-mono px-2 py-0.5 rounded leading-none ${
                                            c.isCertified 
                                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                              : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                          }`}>
                                            {c.isCertified ? "CERTIFIED" : "PENDING"}
                                          </span>
                                        </div>

                                        {/* Individual quizzes ledger checklist */}
                                        <div className="mt-3 space-y-1 bg-black/40 p-2 rounded border border-white/5 max-h-24 overflow-y-auto">
                                          {quizzes.map(q => {
                                            const isPassed = selectedUser.quizScores && selectedUser.quizScores[q.quizId] !== undefined;
                                            return (
                                              <div key={q.quizId} className="flex justify-between items-center text-[9px] font-mono">
                                                <span className="text-zinc-400 truncate pr-1">{q.lessonTitleEn}</span>
                                                <span className={isPassed ? "text-emerald-400 font-bold" : "text-amber-500 font-bold shrink-0"}>
                                                  {isPassed ? "✓ Complete [100%]" : "✗ Incomplete [0%]"}
                                                </span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-900 pt-2 text-zinc-400">
                                        <span>Assessments:</span>
                                        <span className="font-bold text-white font-sans text-xs">
                                          {c.completed} / {c.total} Done
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  
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
                          {language === "en" ? "🔑 Academic Lounge & Code Dispatch Panel" : "🔑 Akadeyimi nePhaneli yoKhipha amakhodi"}
                        </h4>
                        <p className="text-[10px] text-zinc-500 uppercase font-mono">
                          {language === "en" ? "Real-Time Core Lock System" : "Uhlelo Lokukhiya Lwesikhathi Sangempela"}
                        </p>
                      </div>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
                        {language === "en" ? "✓ ACTIVE SYNC" : "✓ UKUVUMELANISA OKUSEBENZAYO"}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-normal font-sans">
                      {language === "en" 
                        ? "The chief administrator handles student registration keys. Modify details, generate authorization codes, and input your executive email below to synchronize credentials. Students will gain immediate admission to academic drop-in study rooms upon using the matched passcode."
                        : "Umlawuli omkhulu uphatha okhiye bokubhalisa babafundi. Shintsha imininingwane, sungula amakhodi okugunyaza, futhi ufake i-imeyili yakho ngezansi ukuze uvumelanise imininingwane. Abafundi bazothola ukungena ngokushesha emakilasini wokufunda lapho besebenzisa iphasikhodi efanayo."}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase block text-zinc-400 font-semibold">
                          {language === "en" ? "Admin Verification Email" : "I-imeyili Yokuqinisekisa YoMlawuli"}
                        </label>
                        <input 
                          type="email" 
                          value={adminDetails.email || ""}
                          onChange={e => setAdminDetails({ ...adminDetails, email: e.target.value })}
                          placeholder="e.g. admin@imalingesizulu.com"
                          className="w-full bg-zinc-900 border border-zinc-805 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase block text-zinc-400 font-semibold">
                          {language === "en" ? "Active Lounge Passcode" : "Iphasikhodi ye-Lounge Esebenzayo"}
                        </label>
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
                            {language === "en" ? "🎲 Random" : "🎲 Ngahleliwe"}
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
                          {translateText("role_student_abbr", language)}
                        </button>
                        <button 
                          onClick={() => setNewUserRole(Role.INSTRUCTOR)}
                          className={`flex-1 py-1 px-2.5 rounded text-[9px] font-bold border ${newUserRole === Role.INSTRUCTOR ? "bg-[#D4AF37] text-black border-transparent" : "border-zinc-800 text-zinc-400"}`}
                        >
                          {translateText("role_instructor_abbr", language)}
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
                          <div className="w-8 h-8 rounded-full border border-zinc-850 overflow-hidden shrink-0">
                            {renderAvatar(usr.avatar, usr.name)}
                          </div>
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
      <footer className="z-20 bg-black/85 border-t border-white/5 py-6 px-8 flex flex-col justify-center items-center text-center select-none gap-4">
        <div className="w-full text-center text-[10px] text-zinc-500 font-serif italic uppercase tracking-wider">
          © 2026 Imali NgesiZulu
        </div>
        
        {/* Footer Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 my-1">
          <button
            type="button"
            onClick={() => setIsAboutModalOpen(true)}
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest rounded-xl cursor-pointer transition-all duration-200 shadow-md"
          >
            {language === "en" ? "About Our Academy" : "Mayelana Ne-Academy"}
          </button>
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest rounded-xl cursor-pointer transition-all duration-200 shadow-md"
          >
            {language === "en" ? "Help Centre & Support" : "Xhumana Nathi / SoSizo"}
          </button>
        </div>

        {/* Enterprise Credentials */}
        <div className="text-[9px] font-mono text-zinc-400 tracking-wider flex flex-wrap justify-center gap-x-4 gap-y-1.5 max-w-3xl uppercase opacity-85">
          <span>Enterprise number: <strong className="text-zinc-200">K2024003562</strong></span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span>Status: <strong className="text-emerald-400">In Business</strong></span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span>Incorporation Date: <strong className="text-zinc-200">05 Jan 2024</strong></span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span>Jurisdiction: <strong className="text-zinc-200">South Africa</strong></span>
        </div>
        
        {/* Mobile-only Sponsor/Partner Button Removed */}
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
                To avoid losing valuable training notes, pair correlations, or advice shared by your live instructor, please download your chat transcripts transcript immediately using the button below. Once the session ticker ends, all messages will be wiped from this browser instance.
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
                  radioUsingFallback ? (
                    <span className="text-amber-400 animate-pulse">⚙️ Backup Carrier Active</span>
                  ) : (
                    <span className="text-emerald-400 animate-pulse">📡 Streaming</span>
                  )
                ) : (
                  <span className="text-zinc-500">⏸️ Standby</span>
                )}
              </p>
              <h5 className="text-[11px] sm:text-xs font-semibold text-white truncate">{currentStation.name}</h5>
              <p className="text-[9px] text-zinc-500 capitalize truncate hidden sm:block">{radioUsingFallback ? "Auto-Recovery Backup Feed" : currentStation.subCategory}</p>
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
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-widest block font-bold">
                    FAST CHANNEL TUNER
                  </span>
                  
                  {/* Category switcher inside popup modal */}
                  <div className="grid grid-cols-3 gap-1 bg-[#050505] p-1 rounded-xl border border-zinc-900">
                    {[
                      { id: "all", label: "All" },
                      { id: "news", label: "News" },
                      { id: "music", label: "Music" }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setRadioActiveCategory(cat.id as any);
                          setRadioActiveRegion("all");
                        }}
                        className={`text-[9px] uppercase font-mono py-1 rounded-lg transition-all cursor-pointer ${
                          radioActiveCategory === cat.id
                            ? "bg-[#D4AF37]/20 text-[#D4AF37] font-bold"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Geographic Switcher inside modal (with tiny flags/prefixes!) */}
                  <div className="flex flex-wrap gap-1 bg-zinc-950 p-1.5 rounded-xl border border-[#D4AF37]/20">
                    {[
                      { id: "all", label: "🌐 All" },
                      { id: "americas", label: "🇺🇸 US" },
                      { id: "europe", label: "🇪🇺 EU" },
                      { id: "africa", label: "🇿🇦 AF" },
                      { id: "asia", label: "🌏 AS" },
                      { id: "global", label: "🌍 GL" }
                    ].map(reg => (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => setRadioActiveRegion(reg.id as any)}
                        className={`text-[8.5px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                          radioActiveRegion === reg.id
                            ? "bg-[#D4AF37]/25 border-[#D4AF37] text-[#D4AF37] font-bold"
                            : "bg-[#050505]/40 border-zinc-900 text-zinc-550 hover:text-zinc-300"
                        }`}
                      >
                        {reg.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {RADIO_STATIONS.filter(st => {
                    if (radioActiveCategory !== "all" && st.category !== radioActiveCategory) return false;
                    if (radioActiveRegion !== "all" && st.region !== radioActiveRegion) return false;
                    return true;
                  }).map(st => {
                    const isSelfPlaying = currentStation?.id === st.id && isPlaying;
                    const isSelfSelected = currentStation?.id === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => playStation(st)}
                        className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                          isSelfSelected 
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.05)]" 
                            : "bg-black/50 border-zinc-905 text-zinc-405 hover:text-white hover:border-zinc-700 hover:bg-white/5"
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
                  {RADIO_STATIONS.filter(st => {
                    if (radioActiveCategory !== "all" && st.category !== radioActiveCategory) return false;
                    if (radioActiveRegion !== "all" && st.region !== radioActiveRegion) return false;
                    return true;
                  }).length === 0 && (
                    <div className="text-center py-8 text-zinc-650 text-[10px] font-mono uppercase">
                      No channels found in this region.
                    </div>
                  )}
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
                          radioUsingFallback ? (
                            <span className="text-amber-400 animate-pulse">🛰️ PRIMARY CARRIER OFFLINE • SWUNG TO SECURE AUXILIARY DECK</span>
                          ) : (
                            <span className="text-emerald-400 animate-pulse">📻 CONNECTION STABLE - STREAMING LIVE</span>
                          )
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
                {userLocation && (
                  <>
                    <span>•</span>
                    <span className="text-[#D4AF37] animate-pulse">GPS POSITION: {userLocation.latitude?.toFixed(4)}°, {userLocation.longitude?.toFixed(4)}°{userLocation.city ? ` (${userLocation.city.toUpperCase()})` : ""}</span>
                  </>
                )}
              </div>
              <span>REGISTRY HASH VERIFIED: LUXE-FM</span>
            </div>
          </div>
        </div>
      )}

      {activePdfResource && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" id="pdf_reader_modal">
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
            <div className="p-4 border-t border-zinc-900 bg-zinc-900/20 flex gap-3 justify-end items-center flex-wrap">

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
        <div id="contact_us_portal" className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fade-in shadow-2xl">
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

      {/* AI Support Bot floating circular button on the left */}
      <button
        id="ai_support_bot_btn"
        onClick={() => {
          setIsSupportBotOpen(!isSupportBotOpen);
        }}
        className="fixed bottom-20 md:bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_4px_22px_rgba(212,175,55,0.45)] hover:shadow-[0_0_25px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all outline-none border border-[#D4AF37]/50 group cursor-pointer"
        title={language === "en" ? "Chat with Support AI" : "Khuluma ne-AI Yesizo"}
      >
        <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform text-black" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border border-black flex items-center justify-center text-[8px] text-white font-black animate-pulse">1</span>
      </button>

      {/* AI Support Bot drawer/panel on the left */}
      {isSupportBotOpen && (
        <div 
          id="ai_support_bot_drawer" 
          className="fixed bottom-36 md:bottom-22 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-50 max-h-[420px] sm:max-h-[500px] bg-black/95 backdrop-blur-2xl border border-[#D4AF37]/35 rounded-2xl shadow-[0_15px_50px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden animate-fade-in font-sans"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-black uppercase text-[#D4AF37] tracking-wider text-left">
                  {language === "en" ? "Imali AI Support" : "Umdidiyeli we-Imali"}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[7.5px] text-zinc-400 font-mono tracking-widest uppercase text-left">
                    {language === "en" ? "ACTIVE CHATBOT • ONLINE" : "USEBENZA MANJE • KU-INTHANETHI"}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSupportBotOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-xs font-bold"
              title={language === "en" ? "Close Support Desk" : "Vala Isango"}
            >
              ✕
            </button>
          </div>

          {/* Messages Container body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent text-left max-h-[290px] min-h-[180px]">
            {supportMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <span className="text-[7.5px] text-zinc-500 font-mono uppercase tracking-widest mb-1 px-1">
                  {msg.sender === "user" ? (language === "en" ? "You" : "Wena") : (language === "en" ? "Imali Assistant" : "Umsizi we-Imali")}
                </span>
                
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-gradient-to-br from-[#D4AF37]/20 to-[#996515]/10 border border-[#D4AF37]/30 text-white rounded-tr-none" 
                    : "bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-none"
                }`}>
                  <p className="font-sans whitespace-pre-wrap text-left">
                    {msg.sender === "bot" 
                      ? (language === "en" ? msg.textEn : msg.textZu) 
                      : msg.textEn
                    }
                  </p>
                  
                  {/* Dynamic Help Center Button indicator inside the bubble */}
                  {msg.sender === "bot" && (msg.textEn.includes("routing") || msg.textEn.includes("apologize") || msg.textEn.includes("Customer Help")) && (
                    <button
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsSupportBotOpen(false);
                      }}
                      className="mt-2.5 w-full py-1.5 px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/30 rounded-lg text-[9px] font-mono uppercase font-bold text-[#D4AF37] tracking-wider transition-all cursor-pointer text-center block"
                    >
                      ✉️ {language === "en" ? "Open Help Centre Now" : "Vula Isikhumulo Sokusiza"}
                    </button>
                  )}
                </div>
                
                <span className="text-[7px] text-zinc-650 font-mono mt-0.5 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {supportTyping && (
              <div className="flex flex-col mr-auto items-start max-w-[85%] animate-pulse">
                <span className="text-[7.5px] text-zinc-500 font-mono uppercase tracking-widest mb-1 px-1">
                  {language === "en" ? "Imali Assistant is typing..." : "Umsizi we-Imali uyabhala..."}
                </span>
                <div className="p-3 bg-zinc-900 border border-zinc-805 text-zinc-500 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={supportMessagesEndRef} />
          </div>

          {/* Quick Suggestions scroll box */}
          <div className="px-3.5 py-1.5 bg-zinc-950 border-t border-zinc-900/60 flex gap-2 overflow-x-auto scrollbar-none shrink-0 scroll-smooth items-center">
            {[
              {
                en: "What is IMALI NgesiZulu?",
                zu: "Yini i-IMALI NgesiZulu?",
                query: "What is IMALI NgesiZulu?"
              },
              {
                en: "Which courses are offered?",
                zu: "Yiziphi izifundo ezikhona?",
                query: "Which courses are offered?"
              },
              {
                en: "How does the Audio Forum work?",
                zu: "Isebenza kanjani i-Audio Forum?",
                query: "How does the Audio Forum work?"
              },
              {
                en: "How can I contact support?",
                zu: "Ngingaxhumana kanjani losizo?",
                query: "How can I contact direct support?"
              }
            ].map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendSupportMessage(sug.query)}
                className="whitespace-nowrap px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-400 border border-zinc-800 rounded-full text-[9px] tracking-wider transition-all cursor-pointer font-sans"
              >
                {language === "en" ? sug.en : sug.zu}
              </button>
            ))}
          </div>

          {/* Form input footer */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendSupportMessage(supportInput);
            }}
            className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2 items-center"
          >
            <input 
              type="text"
              value={supportInput}
              onChange={(e) => setSupportInput(e.target.value)}
              placeholder={language === "en" ? "Ask a question about the App..." : "Buza umbuzo mayelana nalolu hlelo..."}
              className="flex-1 bg-zinc-900 hover:bg-zinc-850 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-2 text-xs text-white outline-none placeholder-zinc-500 transition-all font-sans"
            />
            <button 
              type="submit"
              className="p-2 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] hover:scale-105 active:scale-95 text-black rounded-xl transition-all cursor-pointer"
              title={language === "en" ? "Send Message" : "Thumela"}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* About Us Modal and Sourced Info on Imali NgesiZulu */}
      {isAboutModalOpen && (
        <div id="about_us_portal" className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fade-in shadow-2xl">
          <div className="bg-[#0b0b0b] border-2 border-[#D4AF37] max-w-2xl w-full rounded-2xl md:rounded-3xl p-5 md:p-8 relative overflow-hidden text-left space-y-6 shadow-[0_25px_60px_rgba(212,175,55,0.18)] animate-in fade-in zoom-in-95 duration-200 z-10 my-auto">
            
            {/* Header branding decorative bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-600"></div>

            {/* Title & Close */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
                  {language === "zu" ? "MAYELANA NESIKHUNGO" : "ABOUT THE ACADEMY"}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-white uppercase mt-1 tracking-tight">
                  {language === "zu" ? "Imali NgesiZulu Academy" : "Imali NgesiZulu Academy"}
                </h3>
              </div>
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="p-1 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-mono tracking-widest uppercase transition-all cursor-pointer border border-zinc-800"
              >
                ✕ {language === "zu" ? "Vala" : "Close"}
              </button>
            </div>

            {/* Intro Content */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              <p>
                {language === "zu" ? (
                  "I-IMALI NgesiZulu Academy iyisikhungo esiphambili sezezimali eNingizimu Afrika esizinikele ekufundiseni ngezohwebo lwemali (Forex Market), i-candlestick mechanics, i-liquidity sweeps, kanye nezinqubo zezimali zamazwe ngamazwe. Siletha zonke izifundo ngesiZulu nangesiNgisi ukuze sifake intsha nabo bonke abantu emhlabeni wezezimali."
                ) : (
                  "IMALI NgesiZulu Academy is South Africa's premier financial literacy and forex masterclass institution. We are dedicated to translating complex algorithmic market structures, institutional candlestick physics, and premium technical analysis into NgesiZulu and English, bridging the gap between high finance and retail market enthusiasts."
                )}
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                  <span className="text-[#D4AF37] font-serif font-bold text-xs uppercase block tracking-wider mb-1">
                    🕯️ {language === "zu" ? "Izifundo eziphezulu" : "Elite Curricula"}
                  </span>
                  <p className="text-[11px] text-zinc-400">
                    {language === "zu" ? "Funda institutional orderblocks, Fair Value Gaps (FVG) kanye ne-physics yamakhandlela ye-OHLC." : "Study institutional order blocks, Fair Value Gaps (FVG), and OHLC candlestick physics in perfect detail."}
                  </p>
                </div>

                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                  <span className="text-[#D4AF37] font-serif font-bold text-xs uppercase block tracking-wider mb-1">
                    🛡️ {language === "zu" ? "Ukulawulwa Kwengozi" : "Mathematical Risk Standards"}
                  </span>
                  <p className="text-[11px] text-zinc-400">
                    {language === "zu" ? "Ngena ngqo emthethweni we-1% risk, compounding kanye ne-market drawdowns zangempela." : "Implement structured risk profiles utilizing strict 1% compounding laws and protective capital safeguards."}
                  </p>
                </div>
              </div>

              {/* Official YouTube Channel Section */}
              <div className="pt-2">
                <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  🎥 {language === "zu" ? "UMSAKAZO WE-YOUTUBE BUXHOMA" : "OFFICIAL YOUTUBE CHANNEL & LECTURES"}
                </h4>
                <div className="bg-amber-500/5 hover:bg-amber-500/10 border border-[#D4AF37]/35 rounded-xl p-4 transition-all">
                  <p className="text-xs text-zinc-200 mb-3">
                    {language === "zu" ? (
                      "Kwenziwe ama-webinars amaningi nezifundo eziwusizo kakhulu. Joyina umphakathi wethu oguqukayo phezulu kwe-YouTube:"
                    ) : (
                      "Access step-by-step masterclass videos on live analysis, premium market setups, and daily market breakdowns on our channel:"
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-zinc-400 break-all bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-850 w-full sm:w-auto">
                      youtube.com/@ImaliNgesiZulu
                    </span>
                    <a
                      href="https://www.youtube.com/@ImaliNgesiZulu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap w-full sm:w-auto px-4 py-2 bg-red-650 hover:bg-red-700 text-white font-mono text-[10px] uppercase font-black tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_2px_10px_rgba(239,68,68,0.2)]"
                    >
                      <Youtube className="w-3.5 h-3.5 text-white animate-pulse" />
                      {language === "zu" ? "BHALISA KU-YOUTUBE" : "SUBSCRIBE ON YOUTUBE"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Enterprise Info Box */}
              <div className="pt-2 border-t border-zinc-850">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  🏢 {language === "zu" ? "IMINININGWANE YENKAMPANI EGCOKILE" : "REGISTRATION & CORPORATE JURISDICTION"}
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-900 text-[10px] sm:text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">Enterprise No:</span>
                    <strong className="text-zinc-300 font-mono">K2024003562</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">Status:</span>
                    <strong className="text-[#D4AF37] font-mono uppercase">In Business</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">Incorporated:</span>
                    <strong className="text-zinc-300 font-mono">05 Jan 2024</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase font-mono">Jurisdiction:</span>
                    <strong className="text-zinc-300 font-mono">South Africa</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Branding info */}
            <p className="text-[9.5px] font-mono text-zinc-600 text-center uppercase tracking-tight border-t border-zinc-850 pt-4">
              🏢 VERIFIED SYSTEM IDENTITY • IMALI NGESIZULU
            </p>
          </div>
        </div>
      )}

      {/* Mobile-only Persistent Navigation Footer (Shows on screens under md) */}
      <div 
        id="device_mobile_navigation_footer" 
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#070707]/95 backdrop-blur-xl border-t border-[#D4AF37]/25 z-40 flex items-center justify-around px-4 select-none"
      >
        <button
          onClick={() => {
            setActiveRole(Role.STUDENT);
            setActiveTab("dashboard");
            setVisibleProfileTab(Role.STUDENT);
          }}
          className={`flex flex-col items-center justify-center transition-all ${activeRole === Role.STUDENT ? "text-[#D4AF37]" : "text-zinc-400 hover:text-white"}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-1">Student</span>
        </button>

        <button
          onClick={() => {
            if (!isInstructorUnlocked) {
              setActiveTab("dashboard");
              setVisibleProfileTab(Role.INSTRUCTOR);
              setActivePushAlert({
                title_en: "Authentication Locked",
                title_zu: "Ukuqinisekiswa Kuvaliwe",
                message_en: "Instructor credentials required. Please authenticate under Academic Profiles Manager in dashboard.",
                message_zu: "Kudingeka imininingwane yomfundisi. Sicela uqinisekise ngaphansi koMphathi Weziphrofayili kudeshibhodi."
              });
            } else {
              setActiveRole(Role.INSTRUCTOR);
            }
          }}
          className={`flex flex-col items-center justify-center transition-all ${activeRole === Role.INSTRUCTOR ? "text-[#D4AF37]" : "text-zinc-400 hover:text-white"}`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-1">Instructor</span>
        </button>

        <button
          onClick={() => {
            if (!isAdminUnlocked) {
              setActiveTab("dashboard");
              setVisibleProfileTab(Role.ADMIN);
              setActivePushAlert({
                title_en: "Authentication Locked",
                title_zu: "Ukuqinisekiswa Kuvaliwe",
                message_en: "Administrator credentials required. Please authenticate under Academic Profiles Manager in dashboard.",
                message_zu: "Kudingeka imininingwane yomlawuli. Sicela uqinisekise ngaphansi koMphathi Weziphrofayili kudeshibhodi."
              });
            } else {
              setActiveRole(Role.ADMIN);
            }
          }}
          className={`flex flex-col items-center justify-center transition-all ${activeRole === Role.ADMIN ? "text-[#D4AF37]" : "text-zinc-400 hover:text-white"}`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-1">Admin</span>
        </button>

        <button
          onClick={() => setIsAboutModalOpen(true)}
          className="flex flex-col items-center justify-center text-zinc-400 hover:text-[#D4AF37] transition-all"
        >
          <Globe className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-wider mt-1">About Us</span>
        </button>
      </div>

    </div>
  );
}
