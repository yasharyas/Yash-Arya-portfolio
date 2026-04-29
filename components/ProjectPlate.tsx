// Editorial project plates — abstract motifs per project.
// NOT fabricated screenshots. Each motif is a typographic + geometric
// representation of the project's domain, used as a visual anchor.

import type { CSSProperties, ReactElement } from "react";

const baseSvgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 480 360",
  preserveAspectRatio: "xMidYMid slice",
} as const;

const wrap: CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
  background: "#ece4d3",
  border: "1px solid #d9d2c4",
};

const ink = "#1a1814";
const ember = "#d24e1d";
const muted = "#8a8275";
const cream = "#ece4d3";

function PromptLockPlate() {
  // Terminal-cursor + lock state machine
  const bars = [4, 7, 5, 9, 3, 6, 8, 2, 5, 4];
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      {/* Terminal frame */}
      <rect x="40" y="60" width="400" height="200" fill="none" stroke={ink} strokeWidth="1" />
      <line x1="40" y1="86" x2="440" y2="86" stroke={ink} strokeWidth="1" />
      <circle cx="56" cy="73" r="3" fill={ink} />
      <circle cx="68" cy="73" r="3" fill={muted} />
      <circle cx="80" cy="73" r="3" fill={muted} />
      <text x="56" y="118" fontFamily="ui-monospace, monospace" fontSize="11" fill={ink}>
        $ copilot.agent --working
      </text>
      <text x="56" y="138" fontFamily="ui-monospace, monospace" fontSize="11" fill={muted}>
        ▸ FOCUS → FREE
      </text>
      <text x="56" y="158" fontFamily="ui-monospace, monospace" fontSize="11" fill={ember}>
        ▸ browsers OPEN ⏵
      </text>
      <rect x="56" y="170" width="8" height="14" fill={ember}>
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
      </rect>
      {/* Phone-shaped distraction window beside */}
      <rect x="320" y="106" width="92" height="140" rx="10" fill={ink} />
      <rect x="328" y="118" width="76" height="116" fill={cream} />
      {bars.slice(0, 5).map((h, i) => (
        <rect key={i} x={332 + i * 14} y={210 - h * 8} width="8" height={h * 8} fill={ember} />
      ))}
      <text x="40" y="296" fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={ink}>
        PromptLock
      </text>
      <text x="40" y="320" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        VS CODE EXTENSION · 2026
      </text>
    </svg>
  );
}

function AITutorPlate() {
  // 48-bar audio visualizer + chat bubble
  const bars = Array.from({ length: 32 }, (_, i) =>
    Math.round(20 + Math.sin(i / 1.5) * 15 + Math.cos(i / 3) * 12 + 30)
  );
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      {/* Chat bubble */}
      <rect x="40" y="60" width="280" height="80" fill={ink} />
      <text x="56" y="92" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" fill={cream}>
        Why does e^(iπ) + 1 = 0?
      </text>
      <text x="56" y="118" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="1.5" fill={ember}>
        SOCRATIC MODE
      </text>
      {/* Audio bars */}
      <g transform="translate(40, 180)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 12} y={50 - h / 2} width="6" height={h} fill={ink}>
            <animate
              attributeName="height"
              values={`${h};${h * 0.4};${h}`}
              dur={`${0.8 + (i % 5) * 0.15}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
      <text x="40" y="296" fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={ink}>
        AI Study Tutor
      </text>
      <text x="40" y="320" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        GEMINI 2.5 · STREAMING SSE · 2026
      </text>
    </svg>
  );
}

function XAIChainPlate() {
  // SHAP-style bars + chain links
  const features = [
    { label: "gas_price", v: 0.78, mal: true },
    { label: "num_transfers", v: 0.62, mal: true },
    { label: "amount", v: 0.41, mal: true },
    { label: "sender_tx_count", v: 0.22, mal: false },
    { label: "time_of_day", v: 0.14, mal: false },
  ];
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      <text x="40" y="80" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        SHAP CONTRIBUTION · 0xa3f...
      </text>
      <line x1="180" y1="100" x2="180" y2="240" stroke={muted} strokeWidth="1" strokeDasharray="2 3" />
      {features.map((f, i) => {
        const y = 110 + i * 26;
        const w = f.v * 180;
        const x = f.mal ? 180 : 180 - w;
        return (
          <g key={f.label}>
            <text x="40" y={y + 12} fontFamily="ui-monospace, monospace" fontSize="10" fill={ink}>
              {f.label}
            </text>
            <rect x={x} y={y} width={w} height="14" fill={f.mal ? ember : ink} />
          </g>
        );
      })}
      {/* Chain link */}
      <g transform="translate(380, 110)" stroke={ink} strokeWidth="2" fill="none">
        <rect x="0" y="0" width="36" height="20" rx="10" />
        <rect x="14" y="14" width="36" height="20" rx="10" />
        <rect x="0" y="28" width="36" height="20" rx="10" />
      </g>
      <text x="40" y="296" fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={ink}>
        XAI-Chain
      </text>
      <text x="40" y="320" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        XGBOOST · POLYGON · IPFS · 2025
      </text>
    </svg>
  );
}

function UISystemPlate() {
  // Grid of component primitives
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      <g transform="translate(40, 60)">
        {/* Button */}
        <rect width="100" height="36" fill={ink} />
        <text x="50" y="23" fontFamily="ui-monospace, monospace" fontSize="11" fill={cream} textAnchor="middle">
          Button
        </text>
        {/* Input */}
        <rect x="120" width="140" height="36" fill="none" stroke={ink} strokeWidth="1" />
        <text x="130" y="23" fontFamily="ui-monospace, monospace" fontSize="11" fill={muted}>
          input...
        </text>
        {/* Switch */}
        <rect x="280" width="44" height="22" rx="11" y="7" fill={ember} />
        <circle cx="312" cy="18" r="9" fill={cream} />
        {/* Card */}
        <rect y="56" width="180" height="80" fill="none" stroke={ink} strokeWidth="1" />
        <line x1="0" y1="80" x2="180" y2="80" stroke={ink} />
        <text x="12" y="74" fontFamily="ui-monospace, monospace" fontSize="10" fill={ink}>
          CARD HEADER
        </text>
        {/* Tab bar */}
        <rect x="200" y="56" width="200" height="80" fill="none" stroke={ink} strokeWidth="1" />
        <rect x="200" y="56" width="60" height="80" fill={ink} />
        <text x="230" y="100" fontFamily="ui-monospace, monospace" fontSize="10" fill={cream} textAnchor="middle">
          ONE
        </text>
        <text x="290" y="100" fontFamily="ui-monospace, monospace" fontSize="10" fill={muted} textAnchor="middle">
          TWO
        </text>
        <text x="350" y="100" fontFamily="ui-monospace, monospace" fontSize="10" fill={muted} textAnchor="middle">
          THREE
        </text>
        {/* CLI */}
        <rect y="156" width="400" height="40" fill={ink} />
        <text x="14" y="180" fontFamily="ui-monospace, monospace" fontSize="11" fill={cream}>
          $ npx yash-ui add button
        </text>
        <rect x="200" y="172" width="6" height="12" fill={ember}>
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
      </g>
      <text x="40" y="296" fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={ink}>
        yash-ui-system
      </text>
      <text x="40" y="320" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        TURBOREPO · CLI · 27 PRIMITIVES
      </text>
    </svg>
  );
}

function DermPlate() {
  // Grad-CAM style heatmap grid
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      <g transform="translate(40, 60)">
        {/* Heatmap grid */}
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => {
            // radial intensity from center
            const dx = c - 6;
            const dy = r - 4;
            const d = Math.sqrt(dx * dx + dy * dy);
            const intensity = Math.max(0, 1 - d / 6);
            const alpha = (intensity * 0.85).toFixed(2);
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 24}
                y={r * 22}
                width="22"
                height="20"
                fill={ember}
                fillOpacity={alpha}
              />
            );
          })
        )}
        {/* Frame */}
        <rect width="288" height="176" fill="none" stroke={ink} strokeWidth="1" />
      </g>
      {/* Confidence bars */}
      <g transform="translate(348, 60)">
        {[
          ["mel", 0.94],
          ["nv", 0.04],
          ["bkl", 0.01],
          ["bcc", 0.005],
        ].map(([l, v], i) => (
          <g key={l as string} transform={`translate(0, ${i * 22})`}>
            <text x="0" y="12" fontFamily="ui-monospace, monospace" fontSize="10" fill={ink}>
              {l}
            </text>
            <rect x="36" y="2" width={(v as number) * 80} height="12" fill={ink} />
            <text x={36 + (v as number) * 80 + 6} y="12" fontFamily="ui-monospace, monospace" fontSize="9" fill={muted}>
              {(((v as number) * 100).toFixed(1)) + "%"}
            </text>
          </g>
        ))}
      </g>
      <text x="40" y="296" fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={ink}>
        HAM10000 Classifier
      </text>
      <text x="40" y="320" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        EFFICIENTNETV2 · 94.21% · GRAD-CAM
      </text>
    </svg>
  );
}

function ShoeStorePlate() {
  // Type specimen "SHOE" with price/cart motif
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      <text x="40" y="160" fontFamily="Georgia, serif" fontSize="120" fontStyle="italic" fill={ink} letterSpacing="-4">
        Shoe.
      </text>
      <line x1="40" y1="190" x2="440" y2="190" stroke={ink} />
      <g transform="translate(40, 210)" fontFamily="ui-monospace, monospace" fontSize="11" fill={ink}>
        <text>SKU 0421 · AIR FORCE LOW</text>
        <text x="0" y="20" fill={muted}>SIZE — UK 9</text>
        <text x="380" y="0" textAnchor="end" fill={ember}>₹ 8,499</text>
        <text x="380" y="20" textAnchor="end" fill={muted}>STRIPE READY</text>
      </g>
      <rect x="40" y="252" width="120" height="32" fill={ink} />
      <text x="100" y="273" fontFamily="ui-monospace, monospace" fontSize="11" fill={cream} textAnchor="middle" letterSpacing="2">
        ADD TO BAG
      </text>
      <text x="40" y="316" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        NEXT.JS · STRAPI · STRIPE · CLOUDINARY · 2024
      </text>
    </svg>
  );
}

function CryptoPlate() {
  // Hex chain + portfolio sparkline
  const points = [10, 24, 18, 36, 30, 52, 44, 68, 60, 78, 70, 92];
  const path = points
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 32} ${100 - y}`)
    .join(" ");
  return (
    <svg {...baseSvgProps} style={wrap} aria-hidden="true">
      <rect width="480" height="360" fill={cream} />
      <g transform="translate(40, 60)" fontFamily="ui-monospace, monospace">
        <text fontSize="10" letterSpacing="2" fill={muted}>
          PORTFOLIO · 0x7Ab...3F2
        </text>
        <text x="0" y="48" fontSize="44" fill={ink} fontFamily="Georgia, serif" fontStyle="italic">
          ◊ 12.481
        </text>
        <text x="0" y="72" fontSize="11" fill={ember}>
          +4.21% · 24H
        </text>
        {/* Sparkline */}
        <g transform="translate(140, 0)">
          <path d={path} fill="none" stroke={ink} strokeWidth="2" />
          <line x1="0" y1="100" x2={11 * 32} y2="100" stroke={muted} strokeWidth="0.5" />
        </g>
        {/* Hex links */}
        <g transform="translate(0, 110)" fill="none" stroke={ink} strokeWidth="1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <polygon
              key={i}
              points="20,0 40,11 40,33 20,44 0,33 0,11"
              transform={`translate(${i * 56}, 0)`}
              fill={i % 2 === 0 ? ink : "none"}
            />
          ))}
        </g>
      </g>
      <text x="40" y="296" fontFamily="Georgia, serif" fontSize="32" fontStyle="italic" fill={ink}>
        Crypto Portfolio DApp
      </text>
      <text x="40" y="320" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={muted}>
        WAGMI · RAINBOWKIT · ETHERS · 2024
      </text>
    </svg>
  );
}

const PLATES: Record<string, () => ReactElement> = {
  "01": PromptLockPlate,
  "02": AITutorPlate,
  "03": XAIChainPlate,
  "04": UISystemPlate,
  "05": DermPlate,
  "06": ShoeStorePlate,
  "07": CryptoPlate,
};

export function ProjectPlate({ index }: { index: string }) {
  const Comp = PLATES[index];
  if (!Comp) return null;
  return <Comp />;
}
