export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${i < full ? "text-amber-400" : "text-slate-600"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 15.27l-5.18 3.04 1.4-5.96L1.5 7.38l6.06-.52L10 1.3l2.44 5.56 6.06.52-4.72 4.97 1.4 5.96L10 15.27z" />
        </svg>
      ))}
    </div>
  );
}
