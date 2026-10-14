// Inline SVG mark + wordmark (no extra request). To use the official artwork, swap this for
// <img src="/ethixweb-logo.webp" alt="Ethixweb" width="..." height="..." /> after adding the file to /public.
export function Logo({ light = false }) {
  return (<span className="inline-flex items-center gap-2.5">
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect width="32" height="32" rx="8" fill="#D5192B"/>
    <path d="M10 9h13v3.2H13.4v3.1h8.2v3.2h-8.2v3.3H23V25H10z" fill="#fff"/>
    </svg>
    <span className={`font-display text-[1.4rem] leading-none font-bold tracking-tighter ${light ? "text-white" : "text-ink"}`}>
    ethixweb
    </span>
  </span>);
}
