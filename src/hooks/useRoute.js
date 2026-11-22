import { useEffect, useState } from "react";

// Tiny hash router: "#/book?service=assembly" -> { path: "/book", params: {service: "assembly"} }
function parse() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [path, query = ""] = raw.split("?");
  return { path: path || "/", params: Object.fromEntries(new URLSearchParams(query)) };
}

export function navigate(to) {
  window.location.hash = to;
}

export default function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
