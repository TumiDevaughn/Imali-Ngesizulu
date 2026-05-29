/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  HelpCircle, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  Lock, 
  Globe, 
  Coins 
} from "lucide-react";
import { Language } from "../types";

interface Candlestick {
  open: number;
  high: number;
  low: number;
  close: number;
  time: string;
}

interface PatternDetail {
  id: string;
  nameEn: string;
  nameZu: string;
  type: "bullish" | "bearish";
  descEn: string;
  descZu: string;
  tipsEn: string;
  tipsZu: string;
  candles: Candlestick[];
  necklineY: number; // For drawing trigger line
}

interface Trade {
  id: string;
  pattern: string;
  type: "LONG" | "SHORT";
  entry: number;
  size: number;
  leverage: number;
  tp: number;
  sl: number;
  pnl: number;
  status: "OPEN" | "WIN" | "LOSS";
}

interface PatternScreenerProps {
  language: Language;
}

export default function PatternScreener({ language }: PatternScreenerProps) {
  // Simulator State
  const [balance, setBalance] = useState<number>(() => {
    const local = localStorage.getItem("imali_trade_balance");
    return local ? parseFloat(local) : 10000;
  });

  const [activePatternId, setActivePatternId] = useState<string>("double_bottom");
  const [showIndicators, setShowIndicators] = useState<boolean>(true);
  const [showBreakoutLine, setShowBreakoutLine] = useState<boolean>(true);
  const [selectedLeverage, setSelectedLeverage] = useState<number>(10);
  const [tradeSize, setTradeSize] = useState<number>(1000);
  
  // Custom SL/TP triggers
  const [stopLoss, setStopLoss] = useState<number>(85);
  const [takeProfit, setTakeProfit] = useState<number>(130);

  // Active Trade State
  const [activeTrade, setActiveTrade] = useState<Trade | null>(null);
  const [tradeHistory, setTradeHistory] = useState<Trade[]>(() => {
    const local = localStorage.getItem("imali_trade_history");
    return local ? JSON.parse(local) : [];
  });

  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [simulationCandles, setSimulationCandles] = useState<Candlestick[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Patterns Glossary Data
  const patternsGlossary: PatternDetail[] = [
    {
      id: "double_bottom",
      nameEn: "Double Bottom Reversal Pattern",
      nameZu: "Iphethini Lokujika elingu-Double Bottom",
      type: "bullish",
      descEn: "A classic technical charting pattern signaling a powerful bullish reversal. It indicates that sellers have twice tried to push prices lower, only for buyers to absorb the supply and push the asset higher through the critical breakout neckline.",
      descZu: "Iphethini yakudala ehloniphekayo ekhombisa ukujika kwemakethe phezulu. Likhomba ukuthi abathengisi bazame kabili ukwehla, kodwa abathengi benqaba intengo kungeniswe amandla aphezulu.",
      tipsEn: "Entry Trigger: Wait for a solid candlestick close ABOVE the critical neckline key resistance. Stop Loss should be placed just below the second bottom for maximum capital protection.",
      tipsZu: "Isu Lokungena: Lindela ukuthi ikhandlela livalelwe NGAPHEZU kwomugqa we-neckline. Beka i-Stop Loss ngezansi nje kwesisekelo sesibili ukuze uvikele imali yakho.",
      necklineY: 105,
      candles: [
        { open: 120, high: 125, low: 115, close: 118, time: "C1" },
        { open: 118, high: 120, low: 100, close: 102, time: "C2" }, // Drop
        { open: 102, high: 105, low: 90, close: 91, time: "C3" },  // First Bottom
        { open: 91, high: 108, low: 90, close: 103, time: "C4" },  // Bounce back
        { open: 103, high: 106, low: 98, close: 105, time: "C5" },  // Test neckline resistance
        { open: 105, high: 105, low: 92, close: 93, time: "C6" },   // Drop to second bottom
        { open: 93, high: 96, low: 91, close: 92, time: "C7" },    // Second Bottom
        { open: 92, high: 101, low: 91, close: 100, time: "C8" },   // Buying momentum
        { open: 100, high: 108, low: 99, close: 106, time: "C9" },  // Reaches Neckline
        { open: 106, high: 112, low: 104, close: 111, time: "C10" }, // Breakout Close!
      ]
    },
    {
      id: "head_shoulders",
      nameEn: "Head and Shoulders Reversal",
      nameZu: "Iphethini elingu-Head and Shoulders",
      type: "bearish",
      descEn: "A highly reliable trend reversal pattern indicating a transition from a strong bullish market to an upcoming bearish trend. It consists of three peaks: a higher central peak (head) flanked by two lower symmetrical peaks (shoulders).",
      descZu: "Iphethini elithembeke kakhulu likhomba ukuguquka kwemakethe usuka ekuthengeni uphishekela ekuthengiseni okukhulu. Linezicongo ezintathu: eyodwa enkulu phakathi (head) nezimbili eceleni (shoulders).",
      tipsEn: "Entry Trigger: Set sell orders when price breaks and closes BELOW the neckline support line. Position target profit equal to the height from the head to the neckline.",
      tipsZu: "Isu Lokungena: Beka indlela yokuthengisa (SHORT) uma ikhandlela livalwa NGEZANSI komugqa wosizo we-neckline.",
      necklineY: 100,
      candles: [
        { open: 85, high: 95, low: 82, close: 93, time: "C1" },
        { open: 93, high: 110, low: 92, close: 108, time: "C2" }, // Left shoulder peak
        { open: 108, high: 109, low: 98, close: 100, time: "C3" }, // Drop to neckline
        { open: 100, high: 125, low: 99, close: 123, time: "C4" }, // HEAD peak
        { open: 123, high: 124, low: 101, close: 102, time: "C5" }, // Drop to neckline
        { open: 102, high: 111, low: 100, close: 110, time: "C6" }, // Right shoulder peak
        { open: 110, high: 110, low: 97, close: 98, time: "C7" },  // Drop to neckline
        { open: 98, high: 100, low: 88, close: 89, time: "C8" },   // Neckline Breakdown!
      ]
    },
    {
      id: "bullish_flag",
      nameEn: "Bullish Flag Continuation",
      nameZu: "Iphethini le-Bullish Flag",
      type: "bullish",
      descEn: "A bullish continuation pattern representing a brief consolidation phase during an explosive upward impulse. The flagpole represents the initial surge, and the parallel declining flag body represents profit-taking before bulls charge again.",
      descZu: "Iphethini elikhombisa ukuqhubeka kokuthenga. Ifulege likhombisa isikhathi esifushane sokuphumula kwentengo ngaphambi kokuba abathengi bavuke futhi baphushe phezulu.",
      tipsEn: "Entry Trigger: Go long on the breakout candle that closes ABOVE the upper descending flag resistance boundary. Target profit is calculated from the height of the initial flagpole.",
      tipsZu: "Isu Lokungena: Ngena ngokuthenga (LONG) lapho ikhandlela livaleka NGAPHEZU komugqa ophethe ifulege. Izibalo zokuzuza zilingana nokuphakama kwesimo sokuqala.",
      necklineY: 122,
      candles: [
        { open: 80, high: 95, low: 78, close: 92, time: "C1" }, // FLAGPOLE
        { open: 92, high: 115, low: 90, close: 112, time: "C2" }, // Surge continues
        { open: 112, high: 130, low: 111, close: 128, time: "C3" }, // Flagpole peak
        { open: 128, high: 128, low: 118, close: 120, time: "C4" }, // Decline (Flag starts)
        { open: 120, high: 123, low: 114, close: 116, time: "C5" }, // Decline
        { open: 116, high: 119, low: 110, close: 112, time: "C6" }, // Bottom of flag
        { open: 112, high: 125, low: 111, close: 124, time: "C7" }, // Sudden breakout up!
      ]
    }
  ];

  const currentPattern = patternsGlossary.find(p => p.id === activePatternId) || patternsGlossary[0];

  useEffect(() => {
    // Sync candles with selected pattern and reset active simulations
    setSimulationCandles(currentPattern.candles);
    setSimulationStep(-1);
    setIsSimulating(false);

    // Provide reasonable default SL/TP based on pattern type
    if (currentPattern.type === "bullish") {
      setStopLoss(90);
      setTakeProfit(140);
    } else {
      setStopLoss(115);
      setTakeProfit(70);
    }
  }, [activePatternId]);

  // Persist Balance & History
  useEffect(() => {
    localStorage.setItem("imali_trade_balance", balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("imali_trade_history", JSON.stringify(tradeHistory));
  }, [tradeHistory]);

  // Execute trade long/short
  const handleExecuteTrade = (type: "LONG" | "SHORT") => {
    if (activeTrade) {
      alert(language === "en" ? "You currently have an open position! Wait for it to close." : "Unomnyakazo ovulekile njengamanje. Lindela ukuthi uvalwe.");
      return;
    }
    
    // Check if enough funds exist
    const cost = tradeSize / selectedLeverage;
    if (cost > balance) {
      alert(language === "en" ? "Insufficient simulated funds to cover margin required!" : "Imali yokuhweba ayanele kwi-margin!");
      return;
    }

    const entryPrice = simulationCandles[simulationCandles.length - 1].close;

    const newTrade: Trade = {
      id: "t_" + Date.now(),
      pattern: currentPattern.nameEn,
      type,
      entry: entryPrice,
      size: tradeSize,
      leverage: selectedLeverage,
      tp: takeProfit,
      sl: stopLoss,
      pnl: 0,
      status: "OPEN"
    };

    setActiveTrade(newTrade);
    // Deduct margin requirement temporarily
    setBalance(prev => prev - (tradeSize / selectedLeverage));

    // Begin animated breakout simulation candles to test outcomes
    startAnimatedMarketOutcome(newTrade);
  };

  // Run subsequent animated candlestick iterations to see if pattern succeeds or fails
  const startAnimatedMarketOutcome = (trade: Trade) => {
    setIsSimulating(true);
    setSimulationStep(0);

    // Build simulated "future" outcomes based on selected pattern properties
    const additionalCandles: Candlestick[] = [];
    const baseEntry = trade.entry;
    const isBull = trade.type === "LONG";

    // Create 5 future candles heading towards target path
    for (let i = 1; i <= 6; i++) {
      let openPrice, closePrice, highPrice, lowPrice;
      
      const prevClose = i === 1 ? baseEntry : additionalCandles[i - 2].close;
      openPrice = prevClose;

      // Make the pattern follow the expected textbook behavior
      if (isBull) {
        // Bullish breakout trends upward
        closePrice = prevClose + (Math.random() * 8 + 4);
        highPrice = closePrice + (Math.random() * 3);
        lowPrice = openPrice - (Math.random() * 3);
      } else {
        // Bearish breakdown trends downward
        closePrice = prevClose - (Math.random() * 8 + 4);
        highPrice = openPrice + (Math.random() * 3);
        lowPrice = closePrice - (Math.random() * 3);
      }

      additionalCandles.push({
        open: openPrice,
        high: highPrice,
        low: lowPrice,
        close: closePrice,
        time: `F${i}`
      });
    }

    let intervalCounter = 0;
    const interval = setInterval(() => {
      if (intervalCounter >= additionalCandles.length) {
        clearInterval(interval);
        
        // Evaluate close conditions recursively if not already hit
        resolveTradeManually(trade, additionalCandles[additionalCandles.length - 1].close);
        setIsSimulating(false);
        return;
      }

      const activeCandle = additionalCandles[intervalCounter];
      setSimulationCandles(prev => [...prev, activeCandle]);
      
      // Real-time evaluation of stop loss and take profit
      const currentPrice = activeCandle.close;
      const reachedTp = isBull ? currentPrice >= trade.tp : currentPrice <= trade.tp;
      const reachedSl = isBull ? currentPrice <= trade.sl : currentPrice >= trade.sl;

      if (reachedTp || reachedSl) {
        clearInterval(interval);
        resolveTradeInsideMotion(trade, currentPrice, reachedTp ? "WIN" : "LOSS");
        setIsSimulating(false);
      }

      intervalCounter++;
      setSimulationStep(intervalCounter);
    }, 1200);
  };

  const resolveTradeInsideMotion = (trade: Trade, closePrice: number, result: "WIN" | "LOSS") => {
    const isLong = trade.type === "LONG";
    const percentChange = (closePrice - trade.entry) / trade.entry;
    const adjustedChange = isLong ? percentChange : -percentChange;
    const pnlResult = adjustedChange * trade.size * trade.leverage;

    // Refund margin + PNL
    const margin = trade.size / trade.leverage;
    const finalReturn = margin + pnlResult;

    setBalance(prev => Math.max(0, prev + finalReturn));

    const updatedTrade: Trade = {
      ...trade,
      pnl: pnlResult,
      status: result,
    };

    setActiveTrade(null);
    setTradeHistory(prev => [updatedTrade, ...prev]);
  };

  const resolveTradeManually = (trade: Trade, closePrice: number) => {
    const isLong = trade.type === "LONG";
    const percentChange = (closePrice - trade.entry) / trade.entry;
    const adjustedChange = isLong ? percentChange : -percentChange;
    const pnlResult = adjustedChange * trade.size * trade.leverage;

    const margin = trade.size / trade.leverage;
    const finalReturn = margin + pnlResult;

    setBalance(prev => Math.max(0, prev + finalReturn));

    const result = pnlResult >= 0 ? "WIN" : "LOSS";

    const updatedTrade: Trade = {
      ...trade,
      pnl: pnlResult,
      status: result as any
    };

    setActiveTrade(null);
    setTradeHistory(prev => [updatedTrade, ...prev]);
  };

  const handleResetSimulator = () => {
    setBalance(10000);
    setTradeHistory([]);
    setActiveTrade(null);
    setSimulationCandles(currentPattern.candles);
    setSimulationStep(-1);
    setIsSimulating(false);
  };

  // SVG dimensions for layout charting coordinate systems
  const width = 640;
  const height = 300;
  const padding = 40;

  // Derive min/max for charting boundaries
  const prices = simulationCandles.flatMap(c => [c.open, c.high, c.low, c.close]);
  const maxPrice = prices.length > 0 ? Math.max(...prices) + 5 : 140;
  const minPrice = prices.length > 0 ? Math.min(...prices) - 5 : 70;
  const priceRange = maxPrice - minPrice;

  const getX = (index: number) => {
    const spaceX = (width - padding * 2) / (simulationCandles.length - 1 || 1);
    return padding + index * spaceX;
  };

  const getY = (price: number) => {
    const chartHeight = height - padding * 2;
    return height - padding - ((price - minPrice) / priceRange) * chartHeight;
  };

  return (
    <div id="pattern_screener_root" className="bg-gradient-to-b from-[#090909] to-black border border-[#D4AF37]/25 p-5 md:p-6 rounded-3xl space-y-6">
      
      {/* 1. Header Information & Account Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-4">
        <div>
          <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded font-mono font-black uppercase tracking-widest flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" />
            IN-BROWSER EXCLUSIVE ACADEMY SIMULATOR
          </span>
          <h2 className="text-xl font-light font-serif text-white tracking-widest mt-1 uppercase">
            {language === "en" ? "Interactive Chart Pattern Arena" : "I-Arena Yesitayela Samashadi"}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {language === "en" 
              ? "Select real-time market patterns to test live-breakout trigger signals securely with zero server fees." 
              : "Khetha iphethini lokufunda mayelana nama breaks entengo ye-forex nemali."}
          </p>
        </div>

        {/* Local Session Balance Tracker */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex flex-col items-end min-w-[200px]">
          <span className="text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
            SIMULATED BALANCE (USD)
          </span>
          <p className="text-2xl font-light font-mono text-emerald-400 mt-0.5">
            ${balance.toLocaleString([], { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleResetSimulator}
              className="px-2.5 py-1 bg-red-950/40 hover:bg-red-950 border border-red-800/20 text-red-400 rounded text-[9px] font-mono uppercase transition"
              title="Reset Simulated Wallet & Trade Ledger"
            >
              Reset Session
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Pattern Tabs Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {patternsGlossary.map(pat => {
          const isActive = pat.id === activePatternId;
          const isBull = pat.type === "bullish";
          return (
            <button
              key={pat.id}
              onClick={() => setActivePatternId(pat.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${isActive ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-[0_0_12px_rgba(212,175,55,0.1)]" : "bg-zinc-950/50 border-zinc-900 text-[#D4AF37]/60 hover:bg-zinc-900"}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-mono uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded text-white border border-zinc-800">
                  {pat.id === "double_bottom" ? "Reversal" : pat.id === "head_shoulders" ? "Reversal" : "Continuation"}
                </span>
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isBull ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400"}`}>
                  {isBull ? "BULLISH" : "BEARISH"}
                </span>
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wide truncate mt-1">
                {language === "en" ? pat.nameEn : pat.nameZu}
              </h4>
            </button>
          );
        })}
      </div>

      {/* 3. The Main SVG Candlestick Chart Window Component */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart View Area */}
        <div id="trading_chart_container" className="lg:col-span-2 space-y-3">
          
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-4 relative overflow-hidden">
            {/* Visual Grid backing */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Active overlay indicators tags */}
            <div className="flex justify-between items-center relative z-10 text-[9px] font-mono text-zinc-500 bg-black/60 px-3 py-1.5 rounded-lg border border-zinc-900 mb-2">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> SMA (20)
                </span>
                {showBreakoutLine && (
                  <span className="flex items-center gap-1 text-[#D4AF37]">
                    <span className="w-2.5 h-0.5 bg-[#D4AF37] block"></span> TRIGGER LEVEL: ${currentPattern.necklineY}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowIndicators(!showIndicators)} 
                  className={`px-2 py-0.5 rounded border transition-all ${showIndicators ? "text-[#D4AF37] border-[#D4AF37]/50" : "text-zinc-600 border-zinc-800"}`}
                >
                  Indicator
                </button>
                <button 
                  onClick={() => setShowBreakoutLine(!showBreakoutLine)} 
                  className={`px-2 py-0.5 rounded border transition-all ${showBreakoutLine ? "text-[#D4AF37] border-[#D4AF37]/50" : "text-zinc-600 border-zinc-800"}`}
                >
                  Trigger
                </button>
              </div>
            </div>

            {/* SVG Vector Chart Canvas */}
            <svg 
              className="w-full h-auto relative z-10 select-none overflow-visible" 
              viewBox={`0 0 ${width} ${height}`}
            >
              {/* Horizontal Price Grid Lines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const targetPrice = minPrice + (priceRange * i) / 4;
                const gridY = getY(targetPrice);
                return (
                  <g key={i} className="opacity-15">
                    <line 
                      x1={padding} 
                      y1={gridY} 
                      x2={width - padding} 
                      y2={gridY} 
                      stroke="#white" 
                      strokeWidth="1" 
                      strokeDasharray="4" 
                    />
                    <text 
                      x={width - padding + 5} 
                      y={gridY + 3} 
                      fill="#fff" 
                      fontSize="9" 
                      fontFamily="monospace"
                      textAnchor="start"
                    >
                      ${targetPrice.toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* Pattern Neckline (Trigger Resistance/Support) breakout overlay */}
              {showBreakoutLine && (
                <line
                  x1={padding}
                  y1={getY(currentPattern.necklineY)}
                  x2={width - padding}
                  y2={getY(currentPattern.necklineY)}
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  className="animate-pulse"
                />
              )}

              {/* Custom Stop Loss Line Indicator (Dotted Red) */}
              <line
                x1={padding}
                y1={getY(stopLoss)}
                x2={width - padding}
                y2={getY(stopLoss)}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text 
                x={padding + 10} 
                y={getY(stopLoss) - 6} 
                fill="#ef4444" 
                fontSize="8" 
                fontFamily="monospace"
              >
                STOP LOSS SL (${stopLoss})
              </text>

              {/* Custom Take Profit Line Indicator (Dotted Green) */}
              <line
                x1={padding}
                y1={getY(takeProfit)}
                x2={width - padding}
                y2={getY(takeProfit)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text 
                x={padding + 10} 
                y={getY(takeProfit) - 6} 
                fill="#10b981" 
                fontSize="8" 
                fontFamily="monospace"
              >
                TAKE PROFIT TP (${takeProfit})
              </text>

              {/* Simple Moving Average (SMA) Line Overlay Curve */}
              {showIndicators && (
                <path
                  d={simulationCandles.map((c, idx) => {
                    // Derive smooth moving curve
                    const startRange = Math.max(0, idx - 2);
                    const smas = simulationCandles.slice(startRange, idx + 1);
                    const average = smas.reduce((sum, item) => sum + item.close, 0) / smas.length;
                    return `${idx === 0 ? "M" : "L"} ${getX(idx)} ${getY(average)}`;
                  }).join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}

              {/* Candlesticks Render Body */}
              {simulationCandles.map((candle, idx) => {
                const isBullish = candle.close >= candle.open;
                const candleColor = isBullish ? "#10b981" : "#ef4444";
                
                const bodyTop = getY(Math.max(candle.open, candle.close));
                const bodyBottom = getY(Math.min(candle.open, candle.close));
                const bodyHeight = Math.max(2, bodyBottom - bodyTop);

                const wickTop = getY(candle.high);
                const wickBottom = getY(candle.low);
                const barX = getX(idx);

                return (
                  <g key={idx}>
                    {/* Wick Line */}
                    <line
                      x1={barX}
                      y1={wickTop}
                      x2={barX}
                      y2={wickBottom}
                      stroke={candleColor}
                      strokeWidth="1.8"
                    />
                    {/* Shadow Body */}
                    <rect
                      x={barX - 6}
                      y={bodyTop}
                      width="12"
                      height={bodyHeight}
                      fill={candleColor}
                      rx="1"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Tips and Academic Explanation under Chart */}
          <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl space-y-2">
            <h5 className="text-[10px] font-mono text-[#D4AF37] uppercase flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              {language === "en" ? "SPOTTING TRADING SIGNALS & CONFIRMATIONS" : "INDLELA YOKUBEKA AMA-SIGNALS EZOHWEBO"}
            </h5>
            <p className="text-xs text-zinc-300 leading-relaxed italic">
              {language === "en" ? currentPattern.descEn : currentPattern.descZu}
            </p>
            <p className="text-xs text-zinc-400 bg-black/40 border-l-[3px] border-[#D4AF37] pl-3 py-2 leading-relaxed">
              <strong>{language === "en" ? "Lesson Tip:" : "Isu Elibalulekile:"}</strong> {language === "en" ? currentPattern.tipsEn : currentPattern.tipsZu}
            </p>
          </div>

        </div>

        {/* 4. Interactive Leverage Trading Management Panel */}
        <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest border-b border-zinc-900 pb-2">
              {language === "en" ? "Margin Executive Execution" : "Isivumelwano sikaLong / short"}
            </h4>

            {/* Price Readout */}
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-zinc-900">
              <span className="text-[10px] text-zinc-400 font-mono">CURRENT PRICE</span>
              <span className="text-sm font-bold font-mono text-white">
                ${simulationCandles[simulationCandles.length - 1]?.close?.toFixed(2) || "100.00"}
              </span>
            </div>

            {/* Leverage Sliders */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>EXECUTION LEVERAGE</span>
                <span className="text-[#D4AF37] font-bold">{selectedLeverage}X</span>
              </div>
              <div className="flex gap-2">
                {[1, 5, 10, 20, 50].map(lev => (
                  <button
                    key={lev}
                    onClick={() => {
                      if (isSimulating) return;
                      setSelectedLeverage(lev);
                    }}
                    disabled={isSimulating}
                    className={`flex-1 py-1.5 rounded-lg border font-mono text-[10px] transition-all ${selectedLeverage === lev ? "bg-[#D4AF37] text-black border-transparent font-black" : "bg-black/40 border-zinc-900 text-zinc-400 hover:border-zinc-800"}`}
                  >
                    {lev}x
                  </button>
                ))}
              </div>
            </div>

            {/* SL/TP Inputs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[9px] text-[#ef4444] font-mono uppercase block">STOP LOSS (Price)</label>
                <input 
                  type="number"
                  value={stopLoss}
                  disabled={isSimulating}
                  onChange={e => setStopLoss(parseInt(e.target.value) || 0)}
                  className="w-full bg-black/60 border border-zinc-900 text-xs font-mono text-[#ef4444] p-2 rounded-xl outline-none text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#10b981] font-mono uppercase block">TAKE PROFIT (Price)</label>
                <input 
                  type="number"
                  value={takeProfit}
                  disabled={isSimulating}
                  onChange={e => setTakeProfit(parseInt(e.target.value) || 0)}
                  className="w-full bg-black/60 border border-zinc-900 text-xs font-mono text-[#10b981] p-2 rounded-xl outline-none text-center"
                />
              </div>
            </div>

            {/* Position Size Selection */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 font-mono uppercase">POSITION SIZE (USD)</label>
              <select
                value={tradeSize}
                disabled={isSimulating}
                onChange={e => setTradeSize(parseInt(e.target.value))}
                className="w-full bg-black/60 border border-zinc-900 text-xs text-white p-2.5 rounded-xl font-mono"
              >
                <option value={500}>$500.00 (Standard)</option>
                <option value={1000}>$1,000.00 (Standard)</option>
                <option value={5000}>$5,000.00 (Advanced)</option>
                <option value={10000}>$10,000.00 (Imperial)</option>
              </select>
              <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono mt-1 px-1">
                <span>Required Margin:</span>
                <span>${(tradeSize / selectedLeverage).toFixed(2)} USD</span>
              </div>
            </div>
            
          </div>

          {/* Operational Entry Triggers */}
          <div className="pt-6 space-y-3 border-t border-zinc-900 mt-6">
            
            {/* If simulating market outcome */}
            {isSimulating ? (
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-3 rounded-xl flex items-center justify-center gap-2 text-center animate-pulse">
                <RefreshCw className="w-4 h-4 text-[#D4AF37] animate-spin" />
                <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">
                  ANIMATING PRICE BREAKOUT...
                </span>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleExecuteTrade("LONG")}
                  disabled={activeTrade !== null}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-black text-xs font-black uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-black" />
                  BUY / LONG
                </button>
                <button
                  onClick={() => handleExecuteTrade("SHORT")}
                  disabled={activeTrade !== null}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-black text-xs font-black uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                >
                  <TrendingDown className="w-3.5 h-3.5 text-black" />
                  SELL / SHORT
                </button>
              </div>
            )}

            {/* active position indicator if open */}
            {activeTrade && !isSimulating && (
              <div className="bg-blue-600/10 border border-blue-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-blue-400 font-mono text-[10px]">
                  <Activity className="w-3 h-3 text-blue-400 animate-ping" /> OPEN: {activeTrade.type}
                </span>
                <span className="font-mono text-zinc-300">
                  Entry: ${activeTrade.entry.toFixed(2)}
                </span>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 5. Closed Positions Historics Ledger */}
      {tradeHistory.length > 0 && (
        <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-2xl">
          <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-widest mb-3">
             CLOSED TRADES HISTORY (IN-SESSION LEDGER)
          </span>
          <div className="space-y-2 max-h-44 overflow-y-auto">
            {tradeHistory.map(tr => (
              <div key={tr.id} className="flex justify-between items-center bg-black/40 border border-zinc-900 p-3 rounded-xl text-left">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${tr.status === "WIN" ? "bg-emerald-400" : "bg-red-400"}`}></span>
                  <div>
                    <p className="text-xs font-bold text-white uppercase">{tr.pattern}</p>
                    <p className="text-[9px] font-mono text-[#D4AF37]">
                      {tr.type} @ {tr.leverage}X Leverage • Entry: ${tr.entry.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-mono font-black ${tr.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {tr.pnl >= 0 ? "+" : ""}${tr.pnl.toFixed(2)} USD
                  </p>
                  <p className="text-[8px] text-zinc-500 font-mono uppercase">{tr.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
