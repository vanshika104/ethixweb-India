import { useEffect } from "react";
/** Sets the document title and meta description per route (this is a client-rendered SPA). */
export function usePage(title, description, noindex = false) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name, content) => {
      let el = document.head.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    if (description)
      setMeta("description", description);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex)
      setMeta("robots", "noindex, nofollow");
    else
      robots?.remove();
  }, [title, description, noindex]);
}
