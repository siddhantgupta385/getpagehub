export function TravelTimeCalloutBadge({ label }: { label: string }) {
  return (
    <div className="pointer-events-none whitespace-nowrap rounded-[11px] bg-white px-2.5 py-1 text-xs font-medium leading-snug text-[#3c4043] shadow-[0_2px_10px_rgba(0,0,0,0.14)] sm:px-3 sm:text-[13px]">
      {label}
    </div>
  );
}
