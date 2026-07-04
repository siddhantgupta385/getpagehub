function TimeBadge({
  x,
  y,
  label,
  align = "start",
}: {
  x: number;
  y: number;
  label: string;
  align?: "start" | "end" | "middle";
}) {
  const textAnchor =
    align === "end" ? "end" : align === "middle" ? "middle" : "start";
  const padX = align === "end" ? -8 : align === "middle" ? 0 : 8;
  const rectX = align === "end" ? -118 : align === "middle" ? -59 : 0;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={rectX}
        y={-12}
        width={118}
        height={24}
        rx={12}
        fill="rgba(16, 26, 46, 0.92)"
        stroke="rgba(96, 165, 250, 0.35)"
        strokeWidth={1}
      />
      <text
        x={padX}
        y={4}
        textAnchor={textAnchor}
        fill="#e2e8f0"
        fontSize={10}
        fontWeight={600}
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

export function FreewayIllustratedMap() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-card ring-1 ring-white/10 shadow-2xl shadow-black/50 sm:h-96 lg:h-[clamp(20rem,60vh,32rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.18),transparent_65%)]" />
      <svg
        viewBox="0 0 480 360"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Illustrated map showing Murfreesboro and nearby interstates I-24, I-840, and I-65 with estimated response times"
      >
        <defs>
          <linearGradient id="treadforce-road-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.65" />
          </linearGradient>
          <filter id="treadforce-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="24"
          y="24"
          width="432"
          height="312"
          rx="24"
          fill="#0b1322"
          stroke="rgba(255,255,255,0.08)"
        />

        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={48 + i * 44}
            y1={40}
            x2={48 + i * 44}
            y2={320}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={40}
            y1={48 + i * 44}
            x2={440}
            y2={48 + i * 44}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))}

        <path
          d="M 72 250 Q 140 110 250 88 Q 360 66 408 120"
          fill="none"
          stroke="url(#treadforce-road-glow)"
          strokeWidth={10}
          strokeLinecap="round"
          filter="url(#treadforce-soft-glow)"
        />
        <path
          d="M 72 250 Q 140 110 250 88 Q 360 66 408 120"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={2}
          strokeDasharray="6 8"
        />

        <path
          d="M 88 300 L 250 180 L 392 92"
          fill="none"
          stroke="url(#treadforce-road-glow)"
          strokeWidth={10}
          strokeLinecap="round"
          filter="url(#treadforce-soft-glow)"
        />
        <path
          d="M 88 300 L 250 180 L 392 92"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={2}
          strokeDasharray="6 8"
        />

        <path
          d="M 340 72 L 340 288"
          fill="none"
          stroke="url(#treadforce-road-glow)"
          strokeWidth={10}
          strokeLinecap="round"
          filter="url(#treadforce-soft-glow)"
        />
        <path
          d="M 340 72 L 340 288"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={2}
          strokeDasharray="6 8"
        />

        <g transform="translate(118, 248)">
          <rect x={0} y={0} width={34} height={22} rx={4} fill="#2563eb" />
          <text x={17} y={15} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>
            840
          </text>
        </g>
        <g transform="translate(300, 118)">
          <rect x={0} y={0} width={34} height={22} rx={4} fill="#2563eb" />
          <text x={17} y={15} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>
            24
          </text>
        </g>
        <g transform="translate(352, 168)">
          <rect x={0} y={0} width={34} height={22} rx={4} fill="#2563eb" />
          <text x={17} y={15} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>
            65
          </text>
        </g>

        <g transform="translate(238, 196)">
          <circle r={26} fill="rgba(37, 99, 235, 0.18)" />
          <circle r={14} fill="#2563eb" stroke="#60a5fa" strokeWidth={2} />
          <circle r={5} fill="#fff" />
        </g>
        <text
          x={238}
          y={236}
          textAnchor="middle"
          fill="#f8fafc"
          fontSize={13}
          fontWeight={700}
          fontFamily="var(--font-geist-sans), Arial, sans-serif"
        >
          Murfreesboro
        </text>

        <TimeBadge x={96} y={286} label="20 min to I-840" />
        <TimeBadge x={268} y={156} label="15 min to I-24" align="middle" />
        <TimeBadge x={372} y={248} label="30 min to I-65" align="end" />
      </svg>
    </div>
  );
}
