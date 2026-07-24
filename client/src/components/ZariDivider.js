// Signature element: a slim gold "zari" divider echoing a saree's selvage border.
export default function ZariDivider({ className = "", width = "w-16" }) {
    return (
        <div
            className={`flex items-center justify-center gap-3 text-gold ${className}`}
            aria-hidden="true"
        >
            <span className={`h-px ${width} bg-gradient-to-r from-transparent to-gold/70`} />
            <span className="text-[10px] leading-none tracking-[0.4em]">◆</span>
            <span className={`h-px ${width} bg-gradient-to-l from-transparent to-gold/70`} />
        </div>
    );
}
