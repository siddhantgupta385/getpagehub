import { serviceAreas } from "@/lib/site";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ServiceAreaPills({
  className = "",
  centered = false,
}: {
  className?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap gap-3 ${centered ? "justify-center" : ""} ${className}`}
    >
      {serviceAreas.map((area) => (
        <span
          key={area}
          className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/10"
        >
          <PinIcon className="h-4 w-4 shrink-0 text-brand-light" />
          {area}
        </span>
      ))}
    </div>
  );
}
