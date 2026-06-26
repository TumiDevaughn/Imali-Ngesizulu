import React from "react";

interface EliteMatrixProps {
  lessonNum: number;
  stepIndex: number;
  isZulu: boolean;
}

export function EliteMatrixRenderer({ lessonNum, stepIndex, isZulu }: EliteMatrixProps) {
  // Let's define the title, subtitle, badge, and SVG for each lesson and step!
  let title = "";
  let subtitle = "";
  let badgeText = "";
  let badgeColor = "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5";
  let noticeText = "";
  let svgContent: React.ReactNode = null;

  // Set default parameters
  const stepLabel = isZulu ? `Isinyathelo ${stepIndex + 1}` : `Step ${stepIndex + 1}`;

  switch (lessonNum) {
    case 1: // Price Geometry
      if (stepIndex === 0) {
        title = isZulu ? "📊 GEOMETRY - RESISTANCE CEILING" : "📊 GEOMETRY - DOUBLE TOP RESISTANCE CEILING";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuhlaziya Umugqa Wokwenqaba" : "Analyzing High-Frame Resistance"}`;
        badgeText = isZulu ? "HLOLA ISAKHIWO" : "HTF STRUCTURE CHECK";
        noticeText = isZulu 
          ? "Abahwebi abancane balindele ukuthi intengo iwe phezulu kwi-Double Top, babeke izivikelo ngaphezu komugqa." 
          : "Retail sellers expect price to crash from Double Top, setting stop losses above.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="10" y1="30" x2="490" y2="30" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="10" y1="80" x2="490" y2="80" stroke="#18181b" strokeDasharray="3,3" />
            {/* Resistance Line */}
            <line x1="30" y1="50" x2="470" y2="50" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="40" y="42" fill="#D4AF37" className="text-[7.5px] uppercase font-bold tracking-widest">
              {isZulu ? "UMGQA RESISTANCE LEVEL (CEILING RESISTANCE)" : "DOUBLE TOP CEILING RESISTANCE LEVEL - 1.15000"}
            </text>
            {/* Liquidity pool */}
            <rect x="180" y="20" width="140" height="20" fill="rgba(212, 175, 55, 0.05)" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2,2" />
            <text x="250" y="32" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-bold">
              {isZulu ? "💰 LIQUIDITY POOL / IZINKUMBI ZEMALI" : "💰 LIQUIDITY POOL / RETAIL STOP LOSSES"}
            </text>
            {/* Candlesticks */}
            <line x1="80" y1="80" x2="80" y2="120" stroke="#10b981" strokeWidth="1" />
            <rect x="74" y="90" width="12" height="25" fill="#10b981" rx="1" />
            <line x1="120" y1="70" x2="120" y2="110" stroke="#ef4444" strokeWidth="1" />
            <rect x="114" y="80" width="12" height="20" fill="#ef4444" rx="1" />
            <line x1="200" y1="50" x2="200" y2="100" stroke="#10b981" strokeWidth="1" />
            <rect x="194" y="55" width="12" height="35" fill="#10b981" rx="1" />
            <text x="200" y="102" fill="#10b981" textAnchor="middle" className="text-[7px] font-bold">Peak 1</text>
            <line x1="300" y1="50" x2="300" y2="110" stroke="#10b981" strokeWidth="1" />
            <rect x="294" y="53" width="12" height="30" fill="#10b981" rx="1" />
            <text x="300" y="95" fill="#10b981" textAnchor="middle" className="text-[7px] font-bold">Peak 2</text>
          </svg>
        );
      } else if (stepIndex === 1) {
        title = isZulu ? "💥 GEOMETRY - ACTIVE PURGE WICK" : "💥 GEOMETRY - ACTIVE LIQUIDITY SWEEP WICK";
        subtitle = `${stepLabel}: ${isZulu ? "Ukulinda umsila wokushanela" : "Wicking through Retail Stops"}`;
        badgeText = isZulu ? "UKUSHANELEKA KWEMALI" : "LIQUIDITY PURGING";
        badgeColor = "text-red-500 border-red-500/30 bg-red-500/5";
        noticeText = isZulu 
          ? "Umsila wokushanela (72% Wick Ratio) ukhombisa ukungena kwebhange kanti abahwebi abaningi bayasuswa."
          : "The explosive sweep wick (72% Wick Ratio) triggers resting retail breakouts, transferring capital instantly.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="10" y1="30" x2="490" y2="30" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="10" y1="80" x2="490" y2="80" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="30" y1="50" x2="470" y2="50" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" />
            <rect x="180" y="15" width="140" height="25" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="1,2" />
            <text x="250" y="27" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-bold">💥 LIQUIDITY TRIGGERED / STOPS CLEANED</text>
            {/* Rejections peaks */}
            <rect x="194" y="55" width="12" height="35" fill="gray" fillOpacity="0.15" stroke="gray" strokeWidth="0.5" />
            <rect x="294" y="53" width="12" height="30" fill="gray" fillOpacity="0.15" stroke="gray" strokeWidth="0.5" />
            {/* Sweep candle */}
            <line x1="244" y1="18" x2="244" y2="100" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="244" cy="18" r="3" fill="#D4AF37" />
            <rect x="238" y="55" width="12" height="35" fill="#10b981" rx="1" />
            <text x="260" y="22" fill="#D4AF37" className="text-[7.5px] font-bold">SWEEP WICK - REJECTION</text>
          </svg>
        );
      } else if (stepIndex === 2) {
        title = isZulu ? "🔬 GEOMETRY - MARKET STRUCTURE SHIFT" : "🔬 GEOMETRY - MARKET STRUCTURE SHIFT (MSS)";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuqinisekisa i-MSS kwi-Lower Timeframe" : "Confirming Displacement Break"}`;
        badgeText = isZulu ? "USINTSHO LWESAKHIWO" : "MSS CONFIRMED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "Isakhiwo sokuqala sintengantengile emva kwe-sweep wick phezulu."
          : "Local market structure failure confirmed on aggressive displacement, validating sell entry.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <polyline points="20,20 60,70 90,50 140,100 170,80 220,110 250,30" fill="none" stroke="#27272a" strokeWidth="1.5" />
            <polyline points="250,30 280,65 315,55 360,110 375,95 420,125" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <line x1="170" y1="80" x2="330" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
            <rect x="290" y="72" width="40" height="12" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="310" y="80" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-bold">MSS LEVEL</text>
            <circle cx="295" cy="80" r="3.5" fill="#ef4444" />
            <text x="310" y="65" fill="#ef4444" className="text-[7.5px] font-bold uppercase">STRUCTURE SHIFT</text>
          </svg>
        );
      } else {
        title = isZulu ? "🎯 GEOMETRY - FAIR VALUE GAP ENTRY" : "🎯 GEOMETRY - MITIGATION ENTRY AT FVG";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuthengiselana kwi-FVG Zone" : "Placing Orders at Equilibrium"}`;
        badgeText = isZulu ? "UMLAHLEKO: 1 TO 5" : "1:5 RISK-REWARD ACTIVE";
        badgeColor = "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5";
        noticeText = isZulu 
          ? "Setha i-passive limit limit order yakho kwi-Fair Value Gap (FVG) evulekileyo. Gcina ingozi ku-1.0%."
          : "Entry executed as price taps the upper edge of the Fair Value Gap (FVG). Stop Loss secured.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="10" y1="65" x2="490" y2="65" stroke="#10b981" strokeWidth="1.2" strokeDasharray="1,1" />
            <rect x="340" y="59" width="130" height="12" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="0.5" />
            <text x="405" y="67" fill="#10b981" textAnchor="middle" className="text-[6.5px] font-bold uppercase">FVG LIMIT ENTRY LEVEL</text>
            <line x1="10" y1="25" x2="490" y2="25" stroke="#ef4444" strokeWidth="1.2" />
            <rect x="340" y="19" width="130" height="12" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="405" y="27" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-bold uppercase">STOP LOSS Safety (SL)</text>
            <line x1="10" y1="115" x2="490" y2="115" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3,3" />
            <rect x="340" y="109" width="130" height="12" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.5" />
            <text x="405" y="117" fill="#3b82f6" textAnchor="middle" className="text-[6.5px] font-bold uppercase">TAKE PROFIT TARGET (TP)</text>
            <rect x="150" y="50" width="160" height="30" fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2,2" />
            <text x="230" y="68" fill="#D4AF37" textAnchor="middle" className="text-[7.5px] font-bold uppercase">⚡ SHADED FVG CORRIDOR</text>
          </svg>
        );
      }
      break;

    case 2: // Hedging & Correlation
      if (stepIndex === 0) {
        title = "📈 CORRELATION - DXY INTERMARKET CORRELATION";
        subtitle = `${stepLabel}: ${isZulu ? "Ukulandelela u-DXY Index" : "Tracking the US Dollar Index Dynamics"}`;
        badgeText = "DXY BIAS SYNCED";
        noticeText = isZulu
          ? "I-DXY ihamba ngokuphambene ne-EURUSD kanye negolide, ishadi layo linquma isiqondiso kwi-HTF."
          : "The US Dollar Index (DXY) acts as the leading global baseline. EURUSD and Gold run in tight inverse correlation.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* DXY Line (rising) */}
            <path d="M 20,110 L 100,90 L 180,80 L 260,50 L 340,30 L 420,25" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <text x="420" y="20" fill="#D4AF37" className="text-[7.5px] font-bold">DXY BULLISH BIAS ↑</text>
            {/* EURUSD Line (falling inverse) */}
            <path d="M 20,25 L 100,45 L 180,55 L 260,85 L 340,105 L 420,110" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,1" />
            <text x="420" y="120" fill="#ef4444" className="text-[7.5px] font-bold">EURUSD INVERSE FALLING ↓</text>
            <line x1="260" y1="10" x2="260" y2="120" stroke="#18181b" strokeDasharray="3,3" />
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "💥 CORRELATION - EURUSD VS GBPUSD SMT DIVERGENCE";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuthola i-SMT Divergence" : "Isolating Smart Money Tool (SMT) Divergence"}`;
        badgeText = "SMT DIVERGENCE CHECK";
        noticeText = isZulu
          ? "I-SMT Divergence ivela lapho i-GBPUSD idlula isakhiwo kodwa i-EURUSD ingakwenzi lokho."
          : "SMT Divergence occurs when GBPUSD breaks a key high/low boundary while EURUSD fails to confirm, exposing institutional traps.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="10" y1="35" x2="490" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <text x="20" y="27" fill="#ef4444" className="text-[7px] font-bold">PREVIOUS HIGH LEVEL</text>
            {/* Asset A EURUSD (Fails to sweep) */}
            <polyline points="40,90 90,60 140,75 190,40 240,60" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <text x="40" y="105" fill="#ef4444" className="text-[7.5px] font-bold">EURUSD: FAILED SWEEP (BULLISH TRAP)</text>
            <circle cx="190" cy="40" r="4.5" fill="none" stroke="#ef4444" strokeWidth="1" />
            {/* Asset B GBPUSD (Sweeps and runs) */}
            <polyline points="280,90 330,60 380,75 430,25 480,80" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="280" y="105" fill="#10b981" className="text-[7.5px] font-bold">GBPUSD: COMPLETED WICK SWEEP (REAL DRIVER)</text>
            <circle cx="430" cy="25" r="4.5" fill="#10b981" />
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "🧮 CORRELATION - DELTA-NEUTRAL SIZING MATRIX";
        subtitle = `${stepLabel}: ${isZulu ? "Isibalo se-Delta Hedging" : "Calculating Symmetric Hedging Exposures"}`;
        badgeText = "HEDGE MATH OK";
        noticeText = isZulu
          ? "Ukuxhumanisa ama-Lots kwi-EURUSD kanye ne-GBPUSD ngesilinganiso esiphephile se-capital."
          : "Symmetric hedging scales order sizes symmetrically to offset systematic noise while capturing divergence profits.";
        svgContent = (
          <div className="grid grid-cols-2 gap-4 h-full p-2 text-zinc-400">
            <div className="bg-black/40 p-2 rounded border border-zinc-900 text-left space-y-1">
              <span className="text-[7.5px] text-zinc-500 font-bold uppercase">EURUSD (LONG CONTRACT)</span>
              <p className="text-[11px] font-bold text-emerald-400">1.25 Standard Lots</p>
              <p className="text-[7px] text-zinc-500">Capital Exposure: $125.00 | Margin Reservation: $86.50</p>
            </div>
            <div className="bg-black/40 p-2 rounded border border-zinc-900 text-left space-y-1">
              <span className="text-[7.5px] text-zinc-500 font-bold uppercase">GBPUSD (SHORT HEDGE)</span>
              <p className="text-[11px] font-bold text-[#D4AF37]">1.25 Standard Lots</p>
              <p className="text-[7px] text-zinc-500">Capital Exposure: $125.00 | Net Delta Value: 0.00 Neutral</p>
            </div>
          </div>
        );
      } else {
        title = "🛡️ CORRELATION - AUTOMATED PORTFOLIO MARGIN HEALTH";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuhlola i-Margin Level %" : "Evaluating Real-time System Margin Cushion"}`;
        badgeText = "MARGIN LEVEL SECURED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "Gcina i-Margin Level yakho ingaphezu kuka-1000% njalo ukuze uphumelele ekuvikeleni ingozi."
          : "Keeping the available system margin cushioned above 1000% provides complete protection from liquidation.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <rect x="20" y="30" width="460" height="20" fill="#18181b" rx="4" stroke="#27272a" />
            <rect x="20" y="30" width="380" height="20" fill="rgba(16, 185, 129, 0.25)" rx="4" />
            <text x="250" y="43" fill="#10b981" textAnchor="middle" className="text-[8.5px] font-black font-sans">LIVE PORTFOLIO MARGIN LEVEL: 1,450.28% (SECURED)</text>
            <circle cx="400" cy="40" r="6" fill="#10b981" />
            <text x="250" y="85" fill="zinc-400" textAnchor="middle" className="text-[8px]">Minimum Required Safety Margin Cushion: 1000.00%</text>
            <line x1="330" y1="20" x2="330" y2="60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
          </svg>
        );
      }
      break;

    case 3: // Orderflow Depth
      if (stepIndex === 0) {
        title = "📊 ORDERFLOW - L2 DEPTH OF MARKET (DOM) MAP";
        subtitle = `${stepLabel}: ${isZulu ? "Ukubona amazinga e-DOM" : "Visualizing Order Book Thickest Liquidity"}`;
        badgeText = "L2 DATA ACQUIRED";
        noticeText = isZulu
          ? "I-DOM ibonisa ama-limit buy namasell orders amakhulu lapho amabhange emise khona izimali zawo."
          : "Level 2 order depth mapping reveals institutional passive limit buy and sell block coordinates.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="250" y1="10" x2="250" y2="120" stroke="#3f3f46" strokeDasharray="3,3" />
            {/* Bid Side */}
            <text x="10" y="20" fill="#10b981" className="text-[8px] font-bold uppercase">📥 BUY LIMIT ORDERS (BIDS)</text>
            <rect x="30" y="35" width="200" height="15" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="0.5" />
            <text x="40" y="45" fill="white" className="text-[7.5px]">1.15100 - 450 Lots (Institutional Bid)</text>
            <rect x="50" y="55" width="180" height="15" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="0.5" />
            <text x="60" y="65" fill="zinc-400" className="text-[7.5px]">1.15050 - 240 Lots</text>
            {/* Ask Side */}
            <text x="490" y="20" fill="#ef4444" textAnchor="end" className="text-[8px] font-bold uppercase">📤 SELL LIMIT ORDERS (ASKS)</text>
            <rect x="270" y="35" width="80" height="15" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="280" y="45" fill="zinc-400" className="text-[7.5px]">1.15150 - 90 Lots</text>
            <rect x="270" y="55" width="190" height="15" fill="rgba(239, 68, 68, 0.35)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="280" y="65" fill="white" className="text-[7.5px] font-bold">1.15250 - 620 Lots (Institutional Ask)</text>
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "👣 ORDERFLOW - HIGH-RESOLUTION FOOTPRINT CANDLEST_S";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuhlola amakhandlela ama-Footprint" : "Isolating Bid-Ask Volumetric Imbalances"}`;
        badgeText = "FOOTPRINT SCALED";
        noticeText = isZulu
          ? "Amakhandlela e-Footprint akhombisa amavolumu athengiwe nathengisiwe (Bid/Ask) kwi-candlestick ngayinye."
          : "Footprint candlestick analysis exposes actual executed buying and selling volumes per tick.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Footprint candle body */}
            <rect x="210" y="10" width="80" height="110" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <line x1="250" y1="10" x2="250" y2="120" stroke="#ef4444" strokeWidth="0.5" />
            {/* Tick Rows */}
            {[
              { price: "1.15120", bid: "250", ask: "10K", highlight: true, side: "ask" },
              { price: "1.15110", bid: "1.2K", ask: "400", highlight: false, side: "none" },
              { price: "1.15100", bid: "50", ask: "3.5K", highlight: true, side: "ask" },
              { price: "1.15090", bid: "800", ask: "900", highlight: false, side: "none" }
            ].map((row, idx) => (
              <g key={idx} transform={`translate(0, ${15 + idx * 25})`}>
                <line x1="210" y1="20" x2="290" y2="20" stroke="#18181b" />
                <text x="160" y="12" fill="zinc-500" className="text-[7.5px] font-mono">{row.price}</text>
                <text x="230" y="12" fill={row.side === "bid" ? "#10b981" : "white"} textAnchor="middle" className="text-[7px] font-mono">{row.bid}</text>
                <text x="270" y="12" fill={row.side === "ask" ? "#ef4444" : "white"} textAnchor="middle" className="text-[7px] font-mono">{row.ask}</text>
                {row.highlight && (
                  <rect x="252" y="2" width="34" height="13" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="0.5" />
                )}
              </g>
            ))}
            <text x="310" y="45" fill="#ef4444" className="text-[8px] font-bold">← SELLING IMBALANCE DETECTED</text>
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "📈 ORDERFLOW - CUMULATIVE SESSION DELTA WAVE";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuhlola i-Session Delta" : "Tracking Aggressive Volume Pressure Influx"}`;
        badgeText = "DELTA INFLUX STABLE";
        noticeText = isZulu
          ? "Uma i-delta inyukela phezulu kakhulu kodwa intengo iyehluleka, kuvela ukwenqaba (absorption)."
          : "Analyzing aggressive buyers vs passive institutional sell blocks via the cumulative volume delta.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Grid */}
            <line x1="20" y1="65" x2="480" y2="65" stroke="#18181b" strokeDasharray="3,3" />
            {/* Delta Wave (Aggressive Buying Influx) */}
            <path d="M 20,95 L 80,110 L 160,85 L 240,40 L 320,25 L 400,20 L 460,18" fill="none" stroke="#10b981" strokeWidth="2" />
            <text x="320" y="15" fill="#10b981" className="text-[7.5px] font-bold uppercase">CUMULATIVE DELTA Influx: +12,140 Lots (BULLISH)</text>
            {/* Draw a bar representing delta value */}
            <rect x="20" y="115" width="460" height="6" fill="#18181b" rx="2" />
            <rect x="20" y="115" width="400" height="6" fill="#10b981" rx="2" />
          </svg>
        );
      } else {
        title = "🎯 ORDERFLOW - HIGH-PRECISION RE-TEST ENTRY";
        subtitle = `${stepLabel}: ${isZulu ? "Ukungena kwi-POC Re-Test" : "Executing Filled Limit Contracts at POC"}`;
        badgeText = "ORDER FILLED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "I-order ithintwa ngqo kwi-Point of Control (POC) yevolumu ngaphambi kokwenyuka ngamandla."
          : "Contract executed seamlessly on exact volume Point of Control (POC) re-test, minimizing risk exposure.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="30" y1="100" x2="470" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
            <text x="40" y="93" fill="#ef4444" className="text-[7px] uppercase tracking-wide">PROTECTIVE BACK-LIMIT SL LINE - 1.14900</text>
            <line x1="30" y1="60" x2="470" y2="60" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="40" y="53" fill="#D4AF37" className="text-[7.5px] font-bold uppercase tracking-wider">SYSTEM PURCHASE TRIGGER LEVEL (POC RE-TEST) - 1.15000</text>
            {/* Tapped candle */}
            <line x1="280" y1="20" x2="280" y2="90" stroke="#10b981" strokeWidth="1" />
            <rect x="274" y="30" width="12" height="30" fill="#10b981" rx="1" />
            <circle cx="280" cy="60" r="4.5" fill="#D4AF37" />
            <text x="300" y="70" fill="white" className="text-[7.5px] font-bold bg-zinc-900/90 p-1 rounded border border-zinc-800">
              ⚡ FILLED AT POC! DRAWDOWN: 1.2 PIPS
            </text>
          </svg>
        );
      }
      break;

    case 4: // Kelly Sizing
      if (stepIndex === 0) {
        title = "📋 QUANT - FRACTIONAL KELLY CRITERION SCATTER";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuhlaziya Amandla we-Kelly" : "Mapping System Win/Loss Historical Scatter"}`;
        badgeText = "MODEL INGESTED";
        noticeText = isZulu
          ? "Fomula ye-Kelly Criterion isiza ekutholeni optimal exposure size kwi-capital yakho."
          : "Plotting historic trade samples to feed the fractional Kelly sizing algorithm with precise win-loss ratios.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="30" y1="110" x2="470" y2="110" stroke="#27272a" />
            <line x1="30" y1="20" x2="30" y2="110" stroke="#27272a" />
            {/* Scattered dots */}
            <circle cx="80" cy="50" r="3" fill="#10b981" />
            <circle cx="120" cy="80" r="3" fill="#ef4444" />
            <circle cx="160" cy="40" r="3" fill="#10b981" />
            <circle cx="200" cy="30" r="3" fill="#10b981" />
            <circle cx="240" cy="95" r="3" fill="#ef4444" />
            <circle cx="280" cy="45" r="3" fill="#10b981" />
            <circle cx="320" cy="35" r="3" fill="#10b981" />
            <circle cx="360" cy="85" r="3" fill="#ef4444" />
            <circle cx="400" cy="25" r="3" fill="#10b981" />
            {/* Trend line */}
            <line x1="30" y1="90" x2="470" y2="25" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="450" y="125" textAnchor="end" fill="zinc-600" className="text-[7px]">HISTORIC TRADE SAMPLE SIZE = 140 UNITS</text>
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "🧮 QUANT - ASYMMETRIC RISK-TO-REWARD GAUGE";
        subtitle = `${stepLabel}: ${isZulu ? "I-Risk/Reward Matrix" : "Calculating Target Payout & Win Ratios"}`;
        badgeText = "1:5 RATIO LOCKED";
        noticeText = isZulu
          ? "Amazinga we-Risk-Reward kumele abe ngaphezu kuka-1:3 ukuze isisindo saleso Kelly formula sisebenze."
          : "Maintaining an asymmetric risk ratio (minimum 1:3, target 1:5) ensures mathematically guaranteed portfolio growth.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Gauge bar */}
            <rect x="50" y="45" width="400" height="15" fill="#18181b" rx="4" stroke="#27272a" />
            <rect x="50" y="45" width="320" height="15" fill="#D4AF37" rx="4" />
            <circle cx="370" cy="52.5" r="6" fill="white" />
            <text x="250" y="32" fill="#D4AF37" textAnchor="middle" className="text-[9px] font-black font-sans">CURRENT SYSTEM EXPECTANCY: +1.48 R (EXCELLENT)</text>
            <text x="50" y="75" fill="zinc-500" className="text-[7.5px]">RISK: 1.0% ($100)</text>
            <text x="450" y="75" textAnchor="end" fill="zinc-500" className="text-[7.5px]">REWARD: 5.0% ($500)</text>
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "📐 QUANT - POSITION SIZING MATHEMATICAL EQUATION";
        subtitle = `${stepLabel}: ${isZulu ? "Ifomula yokubala u-Lot Size" : "Dynamic Fractional Exposure Calculations"}`;
        badgeText = "MATH VERIFIED";
        noticeText = isZulu
          ? "Isibalo sendaba: Lot Size = (Capital at Risk) / (Stop Loss distance * Value per Tick)."
          : "Running the fractional Kelly equation ensures optimal capital deployment without ever over-exposing the core balance.";
        svgContent = (
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-xl text-center space-y-2">
            <p className="text-[8px] text-[#D4AF37] font-bold tracking-widest uppercase">DYNAMIC POSITION SIZING EQUATION MATRIX</p>
            <p className="font-serif text-[13px] text-white font-bold tracking-wide italic">
              Fractional Kelly % = (Win Rate * Reward - Loss Rate) / Reward = <span className="text-[#D4AF37] underline">12.5% Optimal Allocation</span>
            </p>
            <p className="text-zinc-500 text-[7px] font-mono">
              Adjusted dynamically to a conservative 1.0% Hard Account Risk Cap for absolute margin safety.
            </p>
          </div>
        );
      } else {
        title = "🔒 QUANT - AUTOMATED EQUITY REVENGE LOCK";
        subtitle = `${stepLabel}: ${isZulu ? "I-Automated Equity Protector" : "Activating Drawdown Prevention Safety Locks"}`;
        badgeText = "EQUITY SECURED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "Uma umkhawulo we-loss (daily max 2.0%) ufinyelelwa, isevisi iyavalwa ngokuzenzakalelayo."
          : "Automated equity lock protects you from emotional trading by freezing execution for 15 minutes after key drawdowns.";
        svgContent = (
          <div className="flex flex-col items-center justify-center py-2 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-red-950/30 border border-red-500/30 flex items-center justify-center text-red-500 text-sm animate-pulse">
              🔒
            </div>
            <div>
              <p className="text-white font-bold text-[10px] uppercase">TRADING DESK LOCK ACTIVE</p>
              <p className="text-zinc-500 text-[7.5px] mt-0.5">DAILY DRAWDOWN THRESHOLD ENFORCED (MAX 2.0%) • EXECUTIONS FROZEN</p>
            </div>
          </div>
        );
      }
      break;

    case 5: // Premium-vs-Discount
      if (stepIndex === 0) {
        title = "📐 RANGES - HTF TRADING RANGE BOUNDARIES";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuveza amazinga we-HTF Range" : "Defining HTF Range Extreme Coordinates"}`;
        badgeText = "RANGE DEFINED";
        noticeText = isZulu
          ? "Isisekelo sethu yithuluzi lika-Fibonacci. Thola u-equilibrium we-50% phakathi kwe-High ne-Low."
          : "Mapping the daily structural extremes to establish the core trading framework and locate premium and discount borders.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* HTF High */}
            <line x1="30" y1="25" x2="470" y2="25" stroke="#ef4444" strokeWidth="1.5" />
            <text x="40" y="18" fill="#ef4444" className="text-[7.5px] font-bold">DAILY SWING HIGH BOUNDARY - PREMIUM ENTRANCE</text>
            {/* Equilibrium */}
            <line x1="30" y1="65" x2="470" y2="65" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3,3" />
            <text x="40" y="58" fill="zinc-500" className="text-[7.5px] font-bold">EQUILIBRIUM LEVEL (50.00%) - FAIR MARKET VALUE</text>
            {/* HTF Low */}
            <line x1="30" y1="105" x2="470" y2="105" stroke="#10b981" strokeWidth="1.5" />
            <text x="40" y="117" fill="#10b981" className="text-[7.5px] font-bold">DAILY SWING LOW BOUNDARY - DISCOUNT ENTRANCE</text>
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "📈 RANGES - GOLDEN FIBONACCI RATIO ZONES";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuhlola ama-Fibonacci Zones" : "Applying Optimal Trade Entry (OTE) Grids"}`;
        badgeText = "OTE GRID ACTIVE";
        noticeText = isZulu
          ? "Shayela amazinga we-Fibonacci ungene endaweni yokuqala yezinhlelo (61.8%, 70.5%, 79%)."
          : "Optimal Trade Entry (OTE) lies between 70.5% and 79% Fibonacci retracement in deep discount.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <rect x="30" y="75" width="440" height="35" fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2,2" />
            <text x="250" y="95" fill="#D4AF37" textAnchor="middle" className="text-[8.5px] font-black uppercase">👑 OPTIMAL TRADE ENTRY (OTE) ZONE - DEEP DISCOUNT</text>
            {/* Retracement lines */}
            <line x1="30" y1="35" x2="470" y2="35" stroke="zinc-700" strokeWidth="0.5" />
            <text x="450" y="32" textAnchor="end" fill="zinc-500" className="text-[6.5px]">50.0% RETRACEMENT</text>
            <line x1="30" y1="55" x2="470" y2="55" stroke="zinc-600" strokeWidth="0.5" />
            <text x="450" y="52" textAnchor="end" fill="zinc-400" className="text-[6.5px]">61.8% RETRACEMENT</text>
            <line x1="30" y1="75" x2="470" y2="75" stroke="#D4AF37" strokeWidth="0.8" />
            <text x="450" y="72" textAnchor="end" fill="#D4AF37" className="text-[6.5px]">70.5% RETRACEMENT (OTE)</text>
            <line x1="30" y1="95" x2="470" y2="95" stroke="#D4AF37" strokeWidth="0.8" />
            <text x="450" y="92" textAnchor="end" fill="#D4AF37" className="text-[6.5px]">79.0% RETRACEMENT (OTE)</text>
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "⚡ RANGES - DISCOUNT LIQUIDITY WICK ABSORPTION";
        subtitle = `${stepLabel}: ${isZulu ? "Ukushela i-Liquidity kwi-Discount" : "Spotting Institutional Rejections in OTE"}`;
        badgeText = "DISCOUNT ABSORPTION";
        noticeText = isZulu
          ? "Uma intengo ifinyelela kwi-discount, amabhange avula ama-buy order ashaqe abathengisi."
          : "Price enters deep discount OTE and triggers a rapid institutional buying reaction, leaving a long rejection wick.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="30" y1="40" x2="470" y2="40" stroke="#3f3f46" strokeDasharray="2,2" />
            <text x="40" y="32" fill="zinc-500" className="text-[7px]">Equilibrium line (50%)</text>
            {/* Candle wick sweeping down and pulling back up */}
            <line x1="250" y1="30" x2="250" y2="120" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="250" cy="120" r="3" fill="#D4AF37" />
            <rect x="244" y="30" width="12" height="40" fill="#10b981" rx="1" />
            <text x="270" y="115" fill="#D4AF37" className="text-[8px] font-black uppercase">💥 SWEEP INTO DISCOUNT COMPLETING TRANSITION</text>
            <rect x="30" y="80" width="150" height="35" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" strokeWidth="0.5" strokeDasharray="1,1" />
            <text x="105" y="100" fill="#10b981" textAnchor="middle" className="text-[7px] font-bold">INTERBANK BUY EXECUTIONS</text>
          </svg>
        );
      } else {
        title = "🏆 RANGES - MULTI-STAGE POSITION SCALE-OUTS";
        subtitle = `${stepLabel}: ${isZulu ? "Ukwenza i-Scale-Out yenzuzo" : "Managing Take Profit Levels Asymmetrically"}`;
        badgeText = "PROFIT SCALE SECURED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "Hoxisa amabhonasi endlela yakho ngezinyathelo ezihlukene ukuze uvikele i-equity kwi-drawdown."
          : "Locking in partial profits at key structural highs protects your equity curve while leaving runners for maximum gains.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Entry line */}
            <line x1="30" y1="110" x2="470" y2="110" stroke="#D4AF37" strokeWidth="1" />
            <text x="40" y="103" fill="#D4AF37" className="text-[7px] font-bold">ORIGINAL OTE ENTRY POINT</text>
            {/* Take Profit 1 */}
            <line x1="30" y1="70" x2="470" y2="70" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" />
            <text x="40" y="63" fill="#3b82f6" className="text-[7px] font-bold">TAKE PROFIT 1 (50% SCALE-OUT) - EQUILIBRIUM REACHED</text>
            {/* Take Profit 2 */}
            <line x1="30" y1="25" x2="470" y2="25" stroke="#10b981" strokeWidth="1.5" />
            <text x="40" y="18" fill="#10b981" className="text-[7px] font-black">TAKE PROFIT 2 (100% SCALE-OUT) - SWING HIGH EXTREMITY</text>
            {/* Rising price line */}
            <path d="M 120,110 L 180,90 L 250,70 L 320,50 L 400,25" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx="250" cy="70" r="4" fill="#3b82f6" />
            <circle cx="400" cy="25" r="4" fill="#10b981" />
          </svg>
        );
      }
      break;

    case 6: // Market Structure Shift
      if (stepIndex === 0) {
        title = "📉 STRUCTURE - FAILURE TO MAKE HIGHER HIGH";
        subtitle = `${stepLabel}: ${isZulu ? "Ukubona amazinga we-Structural Failure" : "Identifying structural weaknesses in momentum"}`;
        badgeText = "MOMENTUM PEAKING";
        noticeText = isZulu
          ? "Ukusabalala kwesakhiwo semakethe kuqala lapho intengo yehluleka ukudlula amazinga aphezulu omhlaba."
          : "The structural transition begins when price fails to establish a new higher high, signalling exhausted buyers.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <polyline points="30,110 90,50 150,80 210,35 270,70 330,45 390,90" fill="none" stroke="zinc-600" strokeWidth="1.5" />
            {/* Peak Highlights */}
            <circle cx="210" cy="35" r="4" fill="#10b981" />
            <text x="210" y="25" fill="#10b981" textAnchor="middle" className="text-[7.5px] font-bold">Peak High</text>
            <circle cx="330" cy="45" r="4.5" fill="#ef4444" />
            <text x="330" y="35" fill="#ef4444" textAnchor="middle" className="text-[7.5px] font-bold">Lower High (Failure Peak)</text>
            <line x1="210" y1="35" x2="350" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "💥 STRUCTURE - RED DISPLACEMENT IMPULSE CANDLE";
        subtitle = `${stepLabel}: ${isZulu ? "Ukubona i-Displacement Candle" : "Isolating the displacement breakdown wave"}`;
        badgeText = "DISPLACEMENT DETECTED";
        noticeText = isZulu
          ? "I-Displacement ikhombisa ukungena kwebhange ngamandla amakhulu we-Selling Pressure."
          : "A large-bodied bearish candle slicing through local swing support confirms heavy institutional displacement.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Support Line broken */}
            <line x1="30" y1="75" x2="470" y2="75" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3,1" />
            <text x="40" y="68" fill="#ef4444" className="text-[7.5px] font-bold">PREVIOUS LOCAL SWING SUPPORT LEVEL</text>
            {/* Bearish candle */}
            <line x1="250" y1="15" x2="250" y2="115" stroke="#ef4444" strokeWidth="2" />
            <rect x="240" y="30" width="20" height="70" fill="#ef4444" rx="1" />
            <circle cx="250" cy="75" r="4" fill="#D4AF37" />
            <text x="280" y="79" fill="#D4AF37" className="text-[8.5px] font-black uppercase">⚡ DISPLACEMENT BREAKDOWN</text>
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "🔬 STRUCTURE - RETRACEMENT TO FAIR VALUE GAP";
        subtitle = `${stepLabel}: ${isZulu ? "I-Retracement iye kwi-FVG" : "Tracking Pullbacks back to premium corridors"}`;
        badgeText = "FVG MITIGATION CHANNELS";
        noticeText = isZulu
          ? "Linda intengo ihlehle isuke ezansi iye phezulu kwi-Fair Value Gap zone ngaphambi kokuhlangana."
          : "Patiently await a pullback to the shaded Fair Value Gap corridor before seeking high-probability short setups.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <rect x="150" y="45" width="200" height="35" fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2,2" />
            <text x="250" y="65" fill="#D4AF37" textAnchor="middle" className="text-[8.5px] font-black uppercase">⚡ FAIR VALUE GAP (FVG) CORRIDOR RE-ENTRY</text>
            {/* Price retracing inside FVG */}
            <path d="M 40,110 L 120,95 L 200,60 L 250,55" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx="250" cy="55" r="4" fill="#D4AF37" />
          </svg>
        );
      } else {
        title = "🎯 STRUCTURE - HIGH ASYMMETRIC SHORT ENTRY";
        subtitle = `${stepLabel}: ${isZulu ? "Ukungena kwi-Trade Setup" : "Placing Orders at the FVG Invalidation Margin"}`;
        badgeText = "SHORT FILLED";
        badgeColor = "text-red-400 border-red-400/30 bg-red-400/5";
        noticeText = isZulu
          ? "Uhwebo lokuthengisa (Short) luvuleka kwi-edge ye-FVG ne-Stop Loss ngaphezu kwe-wick sweep phezulu."
          : "Short position filled at the upper FVG edge. Absolute capital risk secured above the displacement peak.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="30" y1="35" x2="470" y2="35" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="350" y="27" width="110" height="12" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="405" y="35" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-bold uppercase">STOP LOSS Safety (SL)</text>
            <line x1="30" y1="65" x2="470" y2="65" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2,2" />
            <rect x="350" y="57" width="110" height="12" fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" strokeWidth="0.5" />
            <text x="405" y="65" fill="#D4AF37" textAnchor="middle" className="text-[6.5px] font-bold uppercase">SHORT LIMIT ENTRY LEVEL</text>
            <line x1="30" y1="115" x2="470" y2="115" stroke="#10b981" strokeWidth="1.5" />
            <rect x="350" y="107" width="110" height="12" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="0.5" />
            <text x="405" y="115" fill="#10b981" textAnchor="middle" className="text-[6.5px] font-bold uppercase">TARGET TAKE PROFIT (TP)</text>
            <circle cx="280" cy="65" r="4.5" fill="#D4AF37" />
          </svg>
        );
      }
      break;

    case 7: // Order Blocks
      if (stepIndex === 0) {
        title = "🛡️ ORDER BLOCKS - LAST OPPOSING CANDLE BASE";
        subtitle = `${stepLabel}: ${isZulu ? "Ukudweba ama-Order Blocks" : "Locating the last footprint before expansion"}`;
        badgeText = "ORDER BLOCK SHADED";
        noticeText = isZulu
          ? "I-Order Block iyikhandlela lokugcina elibomvu (Bearish) ngaphambi kokuba intengo inyuke ngamandla."
          : "The institutional Order Block marks the last sell zone before massive upward displacement began.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* The Order Block box */}
            <rect x="80" y="45" width="80" height="60" fill="rgba(212, 175, 55, 0.12)" stroke="#D4AF37" strokeWidth="1.2" />
            <text x="120" y="78" fill="#D4AF37" textAnchor="middle" className="text-[8px] font-black uppercase">⚡ ORDER BLOCK</text>
            {/* Bearish candle */}
            <line x1="120" y1="35" x2="120" y2="115" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="112" y="50" width="16" height="50" fill="#ef4444" rx="1" />
            {/* Massive bullish expansion candles leaving block */}
            <rect x="220" y="25" width="16" height="60" fill="#10b981" rx="1" />
            <rect x="300" y="10" width="16" height="70" fill="#10b981" rx="1" />
            <path d="M 120,75 C 180,60 220,40 300,15" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "📈 ORDER BLOCKS - HIGH VOLUME IMPULSE EXPANSION";
        subtitle = `${stepLabel}: ${isZulu ? "Ukuqinisekisa i-Volume Expansion" : "Evaluating institutional momentum delivery"}`;
        badgeText = "VOLUME DELIVERY OPTIMAL";
        noticeText = isZulu
          ? "Isinyathelo sesibili sidinga ukuthi ukwenyuka kwentengo kube namandla amakhulu (displacement)."
          : "The presence of massive, consecutive green candles confirms heavy central bank capital placement.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Chart grids */}
            <line x1="10" y1="20" x2="490" y2="20" stroke="#18181b" strokeDasharray="3,3" />
            <line x1="10" y1="110" x2="490" y2="110" stroke="#18181b" strokeDasharray="3,3" />
            {/* Giant green candles */}
            <rect x="80" y="80" width="14" height="25" fill="#10b981" rx="1" />
            <rect x="160" y="55" width="14" height="40" fill="#10b981" rx="1" />
            <rect x="240" y="30" width="14" height="55" fill="#10b981" rx="1" />
            <rect x="320" y="15" width="14" height="65" fill="#10b981" rx="1" />
            <polyline points="87,90 167,65 247,40 327,20" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "🔬 ORDER BLOCKS - PRECISION RE-TEST AT THRESHOLD";
        subtitle = `${stepLabel}: ${isZulu ? "Ukulinda intengo ihlehle" : "Mitigating the exact order block ceiling"}`;
        badgeText = "RE-TEST COMPLETED";
        noticeText = isZulu
          ? "Linda intengo ishone phansi ithinte umugqa we-Order Block (50% Mean Threshold) phesheya."
          : "The limit entry executes as a retracement wick taps exactly the 50% Mean Threshold depth of the Order Block.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* The Order Block box */}
            <rect x="180" y="65" width="140" height="50" fill="rgba(212, 175, 55, 0.15)" stroke="#D4AF37" strokeWidth="1" />
            <text x="250" y="93" fill="#D4AF37" textAnchor="middle" className="text-[7.5px] font-bold">50% MEAN THRESHOLD LEVEL</text>
            <line x1="180" y1="90" x2="320" y2="90" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />
            {/* Retest candle */}
            <line x1="250" y1="20" x2="250" y2="90" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="250" cy="90" r="4" fill="#D4AF37" />
            <rect x="244" y="20" width="12" height="45" fill="#10b981" rx="1" />
          </svg>
        );
      } else {
        title = "🎯 ORDER BLOCKS - SNIPER FILL & RISK IMMUNITY";
        subtitle = `${stepLabel}: ${isZulu ? "I-Sniper Entry ne-Stop Loss" : "Securing high-reward positions above the floor"}`;
        badgeText = "SNIPER POSITION COMPLETED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "Setha i-Stop Loss phesheya kwemingcele ye-OB, ugcine risk limit yakho iphansi njalo."
          : "Positions deployed seamlessly with protective stop loss anchored 1.5 pips below the Order Block floor.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="30" y1="115" x2="470" y2="115" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="350" y="107" width="110" height="12" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="0.5" />
            <text x="405" y="115" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-bold uppercase">STOP LOSS Safety (SL)</text>
            <line x1="30" y1="65" x2="470" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="2,2" />
            <rect x="350" y="57" width="110" height="12" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="0.5" />
            <text x="405" y="65" fill="#10b981" textAnchor="middle" className="text-[6.5px] font-bold uppercase">BUY LIMIT EXECUTION RANGE</text>
            <line x1="30" y1="20" x2="470" y2="20" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="40" y="15" fill="#3b82f6" className="text-[7.5px] font-bold">TAKE PROFIT MATRIX BOUNDARY (TP) - 1:5 TARGET</text>
            <circle cx="280" cy="65" r="4.5" fill="#10b981" />
          </svg>
        );
      }
      break;

    case 8: // AMD Model
      if (stepIndex === 0) {
        title = "📅 SESSIONS - ASIAN RANGE CONSOLIDATION (A)";
        subtitle = `${stepLabel}: ${isZulu ? "I-Asian Session Accumulation" : "Tracking tight Asian Session range bounds"}`;
        badgeText = "ASIAN ACCUMULATION";
        noticeText = isZulu
          ? "Isikhathi sase-Asia sandulela ukunyakaza okubalulekile. Dweba high/low boundaries zaso."
          : "The Asian session is characterized by low-volume sideways consolidation, building resting liquidity pools.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Asian range channel */}
            <rect x="80" y="35" width="340" height="40" fill="rgba(120, 120, 120, 0.08)" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3,3" />
            <text x="250" y="58" fill="zinc-400" textAnchor="middle" className="text-[8.5px] font-black uppercase tracking-widest">🔒 ASIAN SESSION ACCUMULATION (LOW VOLUME)</text>
            {/* Zigzag line inside range */}
            <polyline points="85,55 130,45 180,65 230,40 280,60 330,45 380,65 415,55" fill="none" stroke="zinc-500" strokeWidth="1" />
            <line x1="80" y1="35" x2="420" y2="35" stroke="#ef4444" strokeWidth="1.2" />
            <line x1="80" y1="75" x2="420" y2="75" stroke="#10b981" strokeWidth="1.2" />
          </svg>
        );
      } else if (stepIndex === 1) {
        title = "💥 SESSIONS - LONDON OPEN MANIPULATION HUNT (M)";
        subtitle = `${stepLabel}: ${isZulu ? "I-London Session Manipulation" : "Sweeping Asian extremes violently to trap retail"}`;
        badgeText = "LONDON STOP RUN ACTIVE";
        badgeColor = "text-red-500 border-red-500/30 bg-red-500/5";
        noticeText = isZulu
          ? "I-London Open iqondisa intengo phansi ngomsila (Stop Run) ukuze isuse abathengisi sikhathi sonke."
          : "The London Open algorithm spikes price sharply past Asian range boundaries to hunt resting stops before reversal.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <rect x="80" y="35" width="240" height="40" fill="rgba(120, 120, 120, 0.04)" stroke="zinc-800" strokeWidth="0.8" strokeDasharray="2,2" />
            {/* London Sweep Wick */}
            <line x1="360" y1="15" x2="360" y2="120" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="360" cy="120" r="3.5" fill="#D4AF37" />
            <rect x="354" y="35" width="12" height="45" fill="#ef4444" rx="1" />
            <text x="380" y="115" fill="#D4AF37" className="text-[8px] font-black uppercase">💥 LONDON MANIPULATION (M) SWEEP LOW</text>
            <line x1="80" y1="75" x2="420" y2="75" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        );
      } else if (stepIndex === 2) {
        title = "🚀 SESSIONS - NY DISTRIBUTION TREND EXPANSION (D)";
        subtitle = `${stepLabel}: ${isZulu ? "I-New York Session Distribution" : "Delivering real values to deep liquidity targets"}`;
        badgeText = "NY EXPANSION COMPLETED";
        badgeColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
        noticeText = isZulu
          ? "Isikhathi se-New York sikhuphula intengo iye phezulu kakhulu kwi-trend ye-expansion yangempela."
          : "The New York session delivers the genuine trend expansion, moving rapidly back up through premium zones.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Massive uptrend expansion wave */}
            <path d="M 40,110 L 120,95 L 200,55 L 280,45 L 360,25 L 440,20" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="440" cy="20" r="4.5" fill="#D4AF37" />
            {/* Bullish candles */}
            <rect x="194" y="55" width="12" height="35" fill="#10b981" rx="1" />
            <rect x="274" y="45" width="12" height="40" fill="#10b981" rx="1" />
            <rect x="354" y="25" width="12" height="50" fill="#10b981" rx="1" />
            <text x="210" y="105" fill="#10b981" className="text-[8px] font-black">EXPANSION DISTRIBUTION DELIVERED</text>
          </svg>
        );
      } else {
        title = "🏆 SESSIONS - COMPLETE TRADING CYCLE MARKERS";
        subtitle = `${stepLabel}: ${isZulu ? "Ukugoqa Isikhathi Ngomthetho" : "Evaluating daily structural cycles and pivots"}`;
        badgeText = "CYCLE COMPLETED";
        noticeText = isZulu
          ? "Hlola ama-Highs kanye nama-Lows azo zonke izikhathi (Asian, London, NY) ukulungiselela kusasa."
          : "Analyzing Asian lows, London sweeps, and New York closes defines the ultimate daily playbook loop.";
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Timeline display */}
            <line x1="20" y1="65" x2="480" y2="65" stroke="#27272a" />
            {/* Asian zone */}
            <rect x="40" y="35" width="110" height="60" fill="rgba(120,120,120,0.06)" stroke="zinc-800" />
            <text x="95" y="30" fill="zinc-500" textAnchor="middle" className="text-[7.5px] font-bold">ASIAN (ACCUM)</text>
            {/* London zone */}
            <rect x="180" y="35" width="110" height="60" fill="rgba(239, 68, 68,0.04)" stroke="zinc-800" />
            <text x="235" y="30" fill="zinc-400" textAnchor="middle" className="text-[7.5px] font-bold">LONDON (SWEEP)</text>
            {/* NY zone */}
            <rect x="320" y="35" width="110" height="60" fill="rgba(16, 185, 129,0.04)" stroke="zinc-800" />
            <text x="375" y="30" fill="white" textAnchor="middle" className="text-[7.5px] font-bold">NEW YORK (DISTRIB)</text>
          </svg>
        );
      }
      break;

    default:
      // Programmatic dynamic generator for all other courses 9 to 33 to guarantee they are different!
      title = isZulu ? `IMALI ELITE STRATEGY ${lessonNum}` : `IMALI ELITE STRATEGY ${lessonNum} - METRICS`;
      subtitle = `${stepLabel}: ${isZulu ? `Uhlelo Olungcono Lomthetho` : `Optimizing Phase Execution Parameters`}`;
      badgeText = `STRATEGY ${lessonNum} ACTIVE`;

      // Deterministic variations based on lesson number
      const hue = (lessonNum * 25) % 360;
      const primaryColor = `hsl(${hue}, 70%, 50%)`;
      const secondaryColor = `hsl(${(hue + 120) % 360}, 70%, 50%)`;

      noticeText = isZulu
        ? `Isifundo se-Strategy ${lessonNum}: Qinisekisa isakhiwo semakethe kwi-timeframe yakho usebenzisa uhlelo ka-VVIP.`
        : `Strategy ${lessonNum} dynamic parameters: Executing interbank confluences under strict mathematical leverage guidelines.`;

      if (stepIndex === 0) {
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Render a unique channel/grid depending on lesson number */}
            <rect x="20" y="20" width="460" height="90" fill="rgba(10,10,10,0.8)" stroke="#27272a" rx="4" />
            <line x1="20" y1="65" x2="480" y2="65" stroke="#18181b" strokeDasharray="3,3" />
            <path d={`M 40,${80 + (lessonNum % 10)} L 140,${40 + (lessonNum % 20)} L 240,${90 - (lessonNum % 15)} L 340,${30 + (lessonNum % 25)} L 440,${60}`} fill="none" stroke={primaryColor} strokeWidth="2" />
            <circle cx="340" cy={30 + (lessonNum % 25)} r="4" fill={secondaryColor} />
            <text x="250" y="105" fill="zinc-500" textAnchor="middle" className="text-[7.5px] font-bold uppercase tracking-widest">
              {isZulu ? `🔍 HLOLA IMIDWEBO YE-STRATEGY ${lessonNum} - ACTIVE` : `🔍 SCANNING PATTERNS FOR STRATEGY ${lessonNum} - MODEL SETUP`}
            </text>
          </svg>
        );
      } else if (stepIndex === 1) {
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            <line x1="10" y1="40" x2="490" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
            {/* Draw dynamic candlesticks with varying dimensions */}
            <g transform={`translate(${50 + (lessonNum % 10) * 10}, 0)`}>
              <line x1="100" y1="20" x2="100" y2="100" stroke="#10b981" strokeWidth="1.5" />
              <rect x="94" y="35" width="12" height="45" fill="#10b981" rx="1" />
              <text x="100" y="112" fill="#10b981" textAnchor="middle" className="text-[7px]">Swept Extremes</text>
            </g>
            <rect x="250" y="25" width="180" height="30" fill="rgba(212,175,55,0.05)" stroke={secondaryColor} strokeWidth="0.8" strokeDasharray="2,1" />
            <text x="340" y="42" fill={secondaryColor} textAnchor="middle" className="text-[7.5px] font-mono">MITIGATION BLOCK RANGE</text>
          </svg>
        );
      } else if (stepIndex === 2) {
        svgContent = (
          <div className="grid grid-cols-3 gap-4 p-2">
            <div className="bg-black/60 p-2.5 rounded border border-zinc-900 text-left">
              <span className="text-[7px] text-zinc-500 block uppercase font-bold">PORTFOLIO DEVIATION</span>
              <span className="text-[12px] font-bold text-white">{(lessonNum * 0.15).toFixed(2)}%</span>
            </div>
            <div className="bg-black/60 p-2.5 rounded border border-zinc-900 text-left">
              <span className="text-[7px] text-zinc-500 block uppercase font-bold">ALGORITHMIC DELTA</span>
              <span className="text-[12px] font-bold text-emerald-400">+{lessonNum * 250} Lots</span>
            </div>
            <div className="bg-black/60 p-2.5 rounded border border-zinc-900 text-left">
              <span className="text-[7px] text-zinc-500 block uppercase font-bold">PROBABILITY CONSTANT</span>
              <span className="text-[12px] font-bold text-[#D4AF37]">{(85 + (lessonNum % 15)).toFixed(1)}%</span>
            </div>
          </div>
        );
      } else {
        svgContent = (
          <svg viewBox="0 0 500 130" className="w-full h-auto">
            {/* Draw elegant entry/exit target channels */}
            <line x1="30" y1="30" x2="470" y2="30" stroke="#ef4444" strokeWidth="1.2" />
            <line x1="30" y1="65" x2="470" y2="65" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="30" y1="100" x2="470" y2="100" stroke="#10b981" strokeWidth="1.2" />
            <rect x="360" y="21" width="110" height="13" fill="rgba(239, 68, 68, 0.08)" />
            <text x="415" y="30" fill="#ef4444" textAnchor="middle" className="text-[6.5px] font-bold">STOP LOSS RANGE</text>
            <rect x="360" y="91" width="110" height="13" fill="rgba(16, 185, 129, 0.08)" />
            <text x="415" y="100" fill="#10b981" textAnchor="middle" className="text-[6.5px] font-bold">TARGET REWARD LIMIT</text>
            <circle cx="200" cy="65" r="4.5" fill={primaryColor} />
            <text x="212" y="68" fill={primaryColor} className="text-[7px] font-black uppercase">STRATEGY {lessonNum} EXECUTED ON TIME</text>
          </svg>
        );
      }
      break;
  }

  return (
    <div className="w-full bg-zinc-950 font-mono text-[10px] p-6 text-zinc-400 select-none overflow-hidden rounded-xl border border-zinc-900">
      <div className="flex justify-between border-b border-zinc-900 pb-2 mb-4 items-center">
        <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">{title}</span>
        <span className={`text-[8px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
      
      <p className="text-zinc-300 font-bold text-[9px] mb-3 text-left uppercase tracking-wide">
        {subtitle}
      </p>

      <div className="w-full mb-4">
        {svgContent}
      </div>

      <div className="mt-2 text-left text-zinc-500 text-[8.5px] border-t border-zinc-900 pt-2 flex justify-between gap-4">
        <span>{noticeText}</span>
        <span className="text-[#D4AF37] font-bold whitespace-nowrap">IMALI PLATINUM SECURITY</span>
      </div>
    </div>
  );
}
