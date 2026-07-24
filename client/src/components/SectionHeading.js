import ZariDivider from "./ZariDivider";

export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
    return (
        <div className={center ? "text-center" : ""}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {title}
            </h2>
            {center && <ZariDivider className="mt-5" />}
            {subtitle && (
                <p
                    className={`mt-4 text-sm leading-relaxed text-muted ${
                        center ? "mx-auto max-w-xl" : "max-w-xl"
                    }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
