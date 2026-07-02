import React, { useRef, useState, useEffect } from "react";
import { 
  Brush, 
  Eraser, 
  RotateCcw, 
  Trash2, 
  Type, 
  Download, 
  Sparkles, 
  Grid3X3, 
  Image, 
  FileText, 
  FileCode,
  Layout,
  Plus,
  MoveHorizontal,
  MoveVertical
} from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  type: "free" | "h-line" | "v-line" | "highlighter";
}

interface TextLabel {
  x: number;
  y: number;
  text: string;
  color: string;
  size: number;
}

interface ChalkboardProps {
  language: "en" | "zu";
  roomId: string;
  roomName: string;
  onSaveNotes?: (textNotes: string) => void;
  initialTextNotes?: string;
}

export const ChalkboardSketchpad: React.FC<ChalkboardProps> = ({
  language,
  roomId,
  roomName,
  onSaveNotes,
  initialTextNotes = ""
}) => {
  // Canvas Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  
  const [textLabels, setTextLabels] = useState<TextLabel[]>([]);
  const [redoTextLabels, setRedoTextLabels] = useState<TextLabel[]>([]);
  
  // Brush Configuration
  const [brushColor, setBrushColor] = useState<string>("#D4AF37"); // Gold Default
  const [brushWidth, setBrushWidth] = useState<number>(3);
  const [drawMode, setDrawMode] = useState<"free" | "h-line" | "v-line" | "highlighter" | "eraser" | "text">("free");
  const [bgType, setBgType] = useState<"chalkboard" | "charcoal" | "whiteboard" | "graph">("chalkboard");
  
  // Custom Inline Text Box Overlay
  const [isAddingText, setIsAddingText] = useState<{ x: number; y: number } | null>(null);
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [textFontSize, setTextFontSize] = useState<number>(14);

  // Side Text Notes Split Screen Pane
  const [textNotes, setTextNotes] = useState<string>(initialTextNotes);
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);

  // Colors available
  const colors = [
    { value: "#D4AF37", label: "Academy Gold" },
    { value: "#ef4444", label: "Warning Red" },
    { value: "#10b981", label: "Profit Green" },
    { value: "#3b82f6", label: "Bullish Blue" },
    { value: "#ffffff", label: "Chalk White" },
    { value: "#1c1917", label: "Carbon Ink" },
  ];

  // Adjust canvas width and height for DPI and responsiveness
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width || 600;
    const height = 400; // Fixed visual ratio height for pristine layout

    // Scale for high-resolution displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);
    
    // Set up ResizeObserver for container shifts
    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(() => {
        resizeCanvas();
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Whenever background type, current strokes or textLabels change, repaint canvas
  useEffect(() => {
    redraw();
  }, [strokes, currentStroke, textLabels, bgType]);

  // Sync side notes if parent changes
  useEffect(() => {
    if (initialTextNotes) {
      setTextNotes(initialTextNotes);
    }
  }, [initialTextNotes]);

  // Handle Note Save callbacks
  useEffect(() => {
    if (onSaveNotes) {
      onSaveNotes(textNotes);
    }
  }, [textNotes, onSaveNotes]);

  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (bgType === "chalkboard") {
      // Classic forest green chalkboard look
      ctx.fillStyle = "#112616";
      ctx.fillRect(0, 0, width, height);

      // Chalky matte noise texture
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
      for (let i = 0; i < width; i += 8) {
        for (let j = 0; j < height; j += 8) {
          if (Math.random() > 0.6) {
            ctx.fillRect(i, j, 4, 4);
          }
        }
      }
      
      // Faint border
      ctx.strokeStyle = "rgba(212,175,55,0.15)";
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, width - 10, height - 10);

    } else if (bgType === "charcoal") {
      // Dark slate look
      ctx.fillStyle = "#151518";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      for (let i = 0; i < width; i += 6) {
        for (let j = 0; j < height; j += 6) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i, j, 2, 2);
          }
        }
      }

    } else if (bgType === "whiteboard") {
      // Clean modern glossy whiteboard
      ctx.fillStyle = "#fafaf9";
      ctx.fillRect(0, 0, width, height);

    } else if (bgType === "graph") {
      // Engineering grid notebook grid paper
      ctx.fillStyle = "#1c1917";
      ctx.fillRect(0, 0, width, height);

      // Draw faint blue grids
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 0.5;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get true unscaled width/height of DOM style
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);
    drawBackground(ctx, w, h);

    // Helper for rendering strokes
    const renderStroke = (stroke: Stroke) => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.lineWidth = stroke.width;
      ctx.strokeStyle = stroke.color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (stroke.type === "highlighter") {
        ctx.globalAlpha = 0.45; // Highlighter Mode Transparency
      } else {
        ctx.globalAlpha = 1.0;
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    };

    // Draw all archived strokes
    strokes.forEach(renderStroke);

    // Draw active stroke
    if (currentStroke) {
      renderStroke(currentStroke);
    }

    // Render Text Labels
    textLabels.forEach(label => {
      ctx.font = `bold ${label.size}px monospace`;
      ctx.fillStyle = label.color;
      ctx.fillText(label.text, label.x, label.y);
    });
  };

  // Helper to extract local coordinates relative to the canvas offset
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Mouse / Touch Event Triggers
  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coord = getCoordinates(e);
    if (!coord) return;

    if (drawMode === "text") {
      setIsAddingText({ x: coord.x, y: coord.y });
      setTextInputValue("");
      return;
    }

    // Erasing or drawing
    const actualColor = drawMode === "eraser" 
      ? (bgType === "whiteboard" ? "#fafaf9" : bgType === "graph" ? "#1c1917" : bgType === "charcoal" ? "#151518" : "#112616")
      : brushColor;

    const actualWidth = drawMode === "eraser" ? brushWidth * 4 : brushWidth;

    const newStroke: Stroke = {
      points: [coord],
      color: actualColor,
      width: actualWidth,
      type: drawMode === "eraser" ? "free" : drawMode
    };

    setCurrentStroke(newStroke);
    setRedoStrokes([]); // Clear redo stack on action
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!currentStroke) return;
    const coord = getCoordinates(e);
    if (!coord) return;

    let points = [...currentStroke.points];
    const startPoint = points[0];

    if (currentStroke.type === "h-line") {
      // Pure flat horizontal line constraint
      points = [startPoint, { x: coord.x, y: startPoint.y }];
    } else if (currentStroke.type === "v-line") {
      // Pure upright vertical line constraint
      points = [startPoint, { x: startPoint.x, y: coord.y }];
    } else {
      // Free drawing
      points.push(coord);
    }

    setCurrentStroke({
      ...currentStroke,
      points
    });
  };

  const handleEnd = () => {
    if (!currentStroke) return;

    setStrokes(prev => [...prev, currentStroke]);
    setCurrentStroke(null);
  };

  const handleUndo = () => {
    if (strokes.length > 0) {
      const last = strokes[strokes.length - 1];
      setRedoStrokes(prev => [...prev, last]);
      setStrokes(prev => prev.slice(0, -1));
    } else if (textLabels.length > 0) {
      const last = textLabels[textLabels.length - 1];
      setRedoTextLabels(prev => [...prev, last]);
      setTextLabels(prev => prev.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStrokes.length > 0) {
      const popped = redoStrokes[redoStrokes.length - 1];
      setStrokes(prev => [...prev, popped]);
      setRedoStrokes(prev => prev.slice(0, -1));
    } else if (redoTextLabels.length > 0) {
      const popped = redoTextLabels[redoTextLabels.length - 1];
      setTextLabels(prev => [...prev, popped]);
      setRedoTextLabels(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (window.confirm(language === "en" ? "Clear your entire sketchbook?" : "Sula yonke into ekubhodini lakho lezithombe?")) {
      setStrokes([]);
      setRedoStrokes([]);
      setTextLabels([]);
      setRedoTextLabels([]);
    }
  };

  // Submit text label directly onto the canvas state
  const handleSaveTextLabel = () => {
    if (!isAddingText || !textInputValue.trim()) {
      setIsAddingText(null);
      return;
    }

    const newLabel: TextLabel = {
      x: isAddingText.x,
      y: isAddingText.y,
      text: textInputValue,
      color: brushColor,
      size: textFontSize
    };

    setTextLabels(prev => [...prev, newLabel]);
    setIsAddingText(null);
    setTextInputValue("");
  };

  // MULTI-FORMAT EXPORTERS
  // Format 1: PNG Image
  const exportAsPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We trigger download of scaled canvas directly
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${roomName}_chalkboard_sketch.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportDropdownOpen(false);
  };

  // Format 2: SVG Vector File (Custom generated paths)
  const exportAsSVG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);

    // Base background colors
    let bgHex = "#112616";
    if (bgType === "charcoal") bgHex = "#151518";
    if (bgType === "whiteboard") bgHex = "#fafaf9";
    if (bgType === "graph") bgHex = "#1c1917";

    let svgContent = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n`;
    
    // Solid Background rectangle
    svgContent += `  <rect width="100%" height="100%" fill="${bgHex}" />\n`;

    // Grids for graph
    if (bgType === "graph") {
      const gridSize = 25;
      for (let x = 0; x < w; x += gridSize) {
        svgContent += `  <line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="rgba(59, 130, 246, 0.1)" stroke-width="0.5" />\n`;
      }
      for (let y = 0; y < h; y += gridSize) {
        svgContent += `  <line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="rgba(59, 130, 246, 0.1)" stroke-width="0.5" />\n`;
      }
    }

    // Render path lines
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      const opacity = stroke.type === "highlighter" ? 0.45 : 1.0;
      let pathData = `M ${stroke.points[0].x.toFixed(1)} ${stroke.points[0].y.toFixed(1)}`;
      
      for (let i = 1; i < stroke.points.length; i++) {
        pathData += ` L ${stroke.points[i].x.toFixed(1)} ${stroke.points[i].y.toFixed(1)}`;
      }

      svgContent += `  <path d="${pathData}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" />\n`;
    });

    // Render Text labels in SVG
    textLabels.forEach(label => {
      // Escape XML characters
      const safeText = label.text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      svgContent += `  <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" fill="${label.color}" font-family="monospace" font-size="${label.size}" font-weight="bold">${safeText}</text>\n`;
    });

    svgContent += `</svg>`;

    const file = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const link = document.createElement("a");
    link.download = `${roomName}_chalkboard_vector.svg`;
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportDropdownOpen(false);
  };

  // Format 3: JSON Drawing Schema schema (for re-importing sketches later!)
  const exportAsJSON = () => {
    const drawingData = {
      roomId,
      roomName,
      bgType,
      strokes,
      textLabels,
      textNotes,
      exportedAt: new Date().toISOString()
    };

    const file = new Blob([JSON.stringify(drawingData, null, 2)], { type: "application/json;charset=utf-8" });
    const link = document.createElement("a");
    link.download = `${roomName}_drawing_schema.json`;
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportDropdownOpen(false);
  };

  // Format 4: Markdown notes
  const exportAsMarkdown = () => {
    let md = `# Imali Ngesizulu Academy Lecture Brief\n\n`;
    md += `**Room Access Code**: ${roomId}\n`;
    md += `**Topic Room**: ${roomName}\n`;
    md += `**Date**: ${new Date().toLocaleDateString()}\n`;
    md += `**Export Format**: Markdown Notes Bundle\n\n`;
    md += `## 📝 Typed Lecture Insights\n\n`;
    md += textNotes.trim() ? textNotes : `*No text lecture notes recorded during this session.*`;
    md += `\n\n---\n*Generatively exported via Imali Lecture Lounge Studio.*`;

    const file = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.download = `${roomName}_academic_brief.md`;
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportDropdownOpen(false);
  };

  // Format 5: Classic TXT notes
  const exportAsTXT = () => {
    let txt = `IMALI NGESIZULU ACADEMY - COMPREHENSIVE NOTES BRIEF\n`;
    txt += `========================================================\n`;
    txt += `Room Code: ${roomId}\n`;
    txt += `Seminar: ${roomName}\n`;
    txt += `Date: ${new Date().toLocaleDateString()}\n\n`;
    txt += `1. TYPED COHORT NOTES:\n`;
    txt += `----------------------\n`;
    txt += textNotes.trim() ? textNotes : `No typed notes recorded.`;
    txt += `\n\n2. SKETCH SCHEMATICS METADATA:\n`;
    txt += `------------------------------\n`;
    txt += `Chalkboard Background: ${bgType}\n`;
    txt += `Total Sketch Strokes: ${strokes.length}\n`;
    txt += `Annotated Labels Added: ${textLabels.length}\n`;
    txt += `\n========================================================\n`;

    const file = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.download = `${roomName}_comprehensive_brief.txt`;
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 xl:grid-cols-12 gap-5 w-full text-white animate-fade-in">
      
      {/* 1. LEFT HAND INTERACTIVE WHITEBOARD/CHALKBOARD (7 Columns) */}
      <div className="xl:col-span-8 flex flex-col bg-zinc-950 border border-zinc-900 rounded-3xl p-5 space-y-4 relative">
        
        {/* Banner header controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <div>
              <h5 className="text-xs font-bold font-mono text-zinc-100 uppercase tracking-wider">
                {language === "en" ? "Blackboard Sketch & Chalk" : "Ibhodi Lezobuciko Le-Academy"}
              </h5>
              <p className="text-[10px] text-zinc-500 font-mono">
                {language === "en" ? "Real-time visual schematics, snapping lines & red highlighter" : "Umdwebo obukhoma, amalayini aphelele, isikhanyisi esibomvu"}
              </p>
            </div>
          </div>

          {/* Background selector & action buttons */}
          <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 border border-zinc-850 rounded-xl">
            <button
              onClick={() => setBgType("chalkboard")}
              className={`p-1.5 px-2.5 rounded-lg text-[10px] font-mono uppercase font-bold transition ${bgType === "chalkboard" ? "bg-emerald-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Classic Chalkboard"
            >
              🌿 Chalk
            </button>
            <button
              onClick={() => setBgType("charcoal")}
              className={`p-1.5 px-2.5 rounded-lg text-[10px] font-mono uppercase font-bold transition ${bgType === "charcoal" ? "bg-zinc-750 text-white shadow" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Charcoal board"
            >
              🌑 Charcoal
            </button>
            <button
              onClick={() => setBgType("whiteboard")}
              className={`p-1.5 px-2.5 rounded-lg text-[10px] font-mono uppercase font-bold transition ${bgType === "whiteboard" ? "bg-stone-200 text-stone-900 shadow" : "text-zinc-500 hover:text-stone-400"}`}
              title="Modern Whiteboard"
            >
              ⬜ White
            </button>
            <button
              onClick={() => setBgType("graph")}
              className={`p-1.5 px-2.5 rounded-lg text-[10px] font-mono uppercase font-bold transition ${bgType === "graph" ? "bg-blue-900/40 text-blue-400 shadow border border-blue-900/60" : "text-zinc-500 hover:text-zinc-300"}`}
              title="Graph paper blueprint"
            >
              📐 Graph
            </button>
          </div>
        </div>

        {/* BRUSH & PALETTE CONTROLS TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-2xl">
          {/* Main draw mode options */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setDrawMode("free")}
              className={`p-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition ${drawMode === "free" ? "bg-[#D4AF37] text-black" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              title="Freehand Draw"
            >
              <Brush className="w-3.5 h-3.5" /> Free
            </button>

            {/* Horizontal snaps */}
            <button
              onClick={() => setDrawMode("h-line")}
              className={`p-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition ${drawMode === "h-line" ? "bg-[#D4AF37] text-black" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              title="Perfect Flat Horizontal Lines"
            >
              <MoveHorizontal className="w-3.5 h-3.5" /> H-Line
            </button>

            {/* Vertical snaps */}
            <button
              onClick={() => setDrawMode("v-line")}
              className={`p-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition ${drawMode === "v-line" ? "bg-[#D4AF37] text-black" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              title="Perfect Upright Vertical Lines"
            >
              <MoveVertical className="w-3.5 h-3.5" /> V-Line
            </button>

            {/* Highlighter (Highlight in Red requested!) */}
            <button
              onClick={() => {
                setDrawMode("highlighter");
                setBrushColor("#ef4444"); // Force red for highlight in red requested!
              }}
              className={`p-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition ${drawMode === "highlighter" ? "bg-red-500 text-white" : "bg-zinc-900 text-zinc-400 hover:text-red-400"}`}
              title="Highlight Red Translucent Paint"
            >
              <Sparkles className="w-3.5 h-3.5" /> Red Highlight
            </button>

            {/* Eraser */}
            <button
              onClick={() => setDrawMode("eraser")}
              className={`p-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition ${drawMode === "eraser" ? "bg-zinc-700 text-white" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              title="Erase strokes"
            >
              <Eraser className="w-3.5 h-3.5" /> Erase
            </button>

            {/* Text labels tool */}
            <button
              onClick={() => setDrawMode("text")}
              className={`p-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition ${drawMode === "text" ? "bg-[#D4AF37] text-black" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              title="Click anywhere to type text notes on board"
            >
              <Type className="w-3.5 h-3.5" /> Text Annotation
            </button>
          </div>

          {/* Color Palette (Unless eraser or highlighter) */}
          {drawMode !== "eraser" && drawMode !== "highlighter" && (
            <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-850">
              {colors.map(col => {
                const isSelected = brushColor === col.value;
                const matchesWhiteBgEraser = bgType === "whiteboard" && col.value === "#ffffff";
                const borderClass = isSelected 
                  ? "border-white scale-110" 
                  : matchesWhiteBgEraser 
                    ? "border-zinc-300" 
                    : "border-transparent hover:border-zinc-500";
                return (
                  <button
                    key={col.value}
                    onClick={() => {
                      setBrushColor(col.value);
                      if (drawMode === "text") {
                        // Keep text mode active
                      } else if (drawMode === "eraser") {
                        setDrawMode("free");
                      }
                    }}
                    className={`w-5 h-5 rounded-full border-2 transition cursor-pointer`}
                    style={{ backgroundColor: col.value }}
                    title={col.label}
                  />
                );
              })}
            </div>
          )}

          {/* Size Thickness slider */}
          {drawMode !== "text" && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Width</span>
              <input
                type="range"
                min="1"
                max="25"
                value={brushWidth}
                onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                className="w-16 accent-[#D4AF37] h-1.5 bg-zinc-850 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[9px] font-mono text-[#D4AF37] font-bold w-4">{brushWidth}px</span>
            </div>
          )}
        </div>

        {/* THE INTERACTIVE CANVAS CONTAINER */}
        <div className="relative bg-[#112616] border border-zinc-900 rounded-2xl overflow-hidden cursor-crosshair">
          
          <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            className="block w-full"
            style={{ touchAction: "none" }}
          />

          {/* Text Tool Instructions Overlay */}
          {drawMode === "text" && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur px-3 py-1 rounded-full text-[9px] font-mono text-emerald-400 border border-emerald-500/25 pointer-events-none">
              🎯 {language === "en" ? "Click anywhere on the chalkboard to insert a text note" : "Chofoza noma kuphi ebhodini ukuze ufake umbhalo"}
            </div>
          )}

          {/* Inline Text Input absolute overlay to prevent window.prompt! */}
          {isAddingText && (
            <div 
              className="absolute z-50 bg-black/95 p-3.5 border-2 border-[#D4AF37] rounded-xl shadow-2xl flex flex-col gap-2 max-w-[280px]"
              style={{ left: `${isAddingText.x}px`, top: `${isAddingText.y}px` }}
            >
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Add Board Note:</span>
              <input
                type="text"
                autoFocus
                value={textInputValue}
                onChange={(e) => setTextInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTextLabel();
                  if (e.key === "Escape") setIsAddingText(null);
                }}
                placeholder="Type board text..."
                className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg text-xs text-[#D4AF37] outline-none focus:border-[#D4AF37]"
              />
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-zinc-500 font-mono">Size</span>
                  <input
                    type="number"
                    min="10"
                    max="40"
                    value={textFontSize}
                    onChange={(e) => setTextFontSize(parseInt(e.target.value) || 14)}
                    className="w-10 bg-zinc-900 border border-zinc-800 p-1 rounded font-mono text-[10px] text-center"
                  />
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsAddingText(null)}
                    className="py-1 px-2.5 bg-zinc-800 text-zinc-400 hover:text-white text-[10px] font-mono uppercase font-bold rounded"
                  >
                    {language === "en" ? "Cancel" : "Khansela"}
                  </button>
                  <button
                    onClick={handleSaveTextLabel}
                    className="py-1 px-2.5 bg-[#D4AF37] text-black text-[10px] font-mono uppercase font-bold rounded"
                  >
                    {language === "en" ? "Place" : "Faka"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* UNDO, REDO & CLEAR HISTORY BUTTONS */}
        <div className="flex items-center justify-between gap-2 border-t border-zinc-900/60 pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0 && textLabels.length === 0}
              className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-850 disabled:opacity-25 disabled:cursor-not-allowed border border-zinc-850 text-zinc-300 rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1 cursor-pointer transition"
              title="Undo last stroke"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStrokes.length === 0 && redoTextLabels.length === 0}
              className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-850 disabled:opacity-25 disabled:cursor-not-allowed border border-zinc-850 text-zinc-300 rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1 cursor-pointer transition"
              title="Redo stroke"
            >
              Redo →
            </button>
          </div>

          <button
            onClick={handleClear}
            disabled={strokes.length === 0 && textLabels.length === 0}
            className="py-1.5 px-3 bg-red-950/45 hover:bg-red-900/40 disabled:opacity-30 border border-red-900/30 text-red-400 rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1.5 cursor-pointer transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> {language === "en" ? "Clear Board" : "Sula Ibhodi"}
          </button>
        </div>
      </div>

      {/* 2. RIGHT HAND SIDE SPLIT-SCREEN COHORT TEXT NOTES SCRATCHPAD (4 Columns) */}
      <div className="xl:col-span-4 flex flex-col bg-zinc-950 border border-zinc-900 rounded-3xl p-5 space-y-4 justify-between h-full min-h-[460px]">
        
        {/* Header split-pane */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <h5 className="text-xs font-bold font-mono text-zinc-100 uppercase tracking-wider">
                {language === "en" ? "Text Lecture Notes" : "Amanothi Omhlangano Wetext"}
              </h5>
            </div>

            {/* HIGHLY PROFESSIONAL ALL FORMATS EXPORT CONTAINER */}
            <div className="relative">
              <button
                onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                className="py-1.5 px-3 bg-gradient-to-r from-[#D4AF37] to-[#aa7c11] hover:brightness-110 text-black text-[10px] font-mono font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer transition shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              >
                <Download className="w-3.5 h-3.5" /> 
                {language === "en" ? "Export Formats" : "Landa Yonke"}
              </button>

              {/* Dropdown overlay */}
              {exportDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[100]" 
                    onClick={() => setExportDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-zinc-950 border-2 border-[#D4AF37]/50 rounded-2xl shadow-2xl p-2 z-[101] space-y-1 animate-fade-in text-left">
                    <p className="text-[9px] text-zinc-500 font-mono uppercase px-2 py-1 font-bold">Canvas Schematics:</p>
                    
                    <button
                      onClick={exportAsPNG}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] rounded-lg transition font-mono flex items-center gap-2"
                    >
                      <Image className="w-3.5 h-3.5 text-blue-400" />
                      PNG Image (.png)
                    </button>

                    <button
                      onClick={exportAsSVG}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] rounded-lg transition font-mono flex items-center gap-2"
                    >
                      <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                      SVG Vector File (.svg)
                    </button>

                    <button
                      onClick={exportAsJSON}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] rounded-lg transition font-mono flex items-center gap-2"
                    >
                      <FileCode className="w-3.5 h-3.5 text-amber-500" />
                      Drawing Schema (.json)
                    </button>

                    <div className="border-t border-zinc-900 my-1"></div>
                    <p className="text-[9px] text-zinc-500 font-mono uppercase px-2 py-1 font-bold">Cohort Lecture Notes:</p>

                    <button
                      onClick={exportAsMarkdown}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] rounded-lg transition font-mono flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      Markdown Brief (.md)
                    </button>

                    <button
                      onClick={exportAsTXT}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] rounded-lg transition font-mono flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-zinc-400" />
                      Plain Text (.txt)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="text-[10px] text-zinc-500 font-mono leading-normal">
            {language === "en" 
              ? "Draft Definitions, homework lists, key pivots, and risk targets to distribute to your student cohort." 
              : "Bhala izincazelo zakho, imisebenzi yasekhaya, nezinqumo zengozi lapha."}
          </p>

          <textarea
            value={textNotes}
            onChange={(e) => setTextNotes(e.target.value)}
            placeholder={
              language === "en" 
                ? "Type definition lists, strict risk management formulas, homework targets, or strategy updates here..."
                : "Bhala imithetho ebalulekile yokuhweba lapha..."
            }
            className="w-full h-80 bg-zinc-900/40 border border-zinc-850 p-3.5 rounded-2xl text-xs text-zinc-200 outline-none focus:border-[#D4AF37] resize-none font-sans placeholder-zinc-600 focus:ring-1 focus:ring-[#D4AF37]/45"
          />
        </div>

        <div className="bg-zinc-900/30 border border-zinc-900/60 p-3 rounded-2xl text-[10px] text-zinc-400 font-mono space-y-1">
          <div className="flex justify-between">
            <span>Room Code:</span>
            <span className="text-[#D4AF37] font-bold">{roomId}</span>
          </div>
          <div className="flex justify-between">
            <span>Auto-Save Storage:</span>
            <span className="text-emerald-400 font-semibold">Enabled (Local Cache)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
