import type { Restroom } from "@/app/types/restroom";

export async function getRestrooms(): Promise<Restroom[]> {
  const res = await fetch("/normalizedBumi.json", {
    // The "next:" option is ignored in the browser; it's only a next.js server side hint.
    cache: "force-cache" // or "no-store" if you want no caching from client
  });
  if (!res.ok) throw new Error("Failed to load restrooms");
  return res.json();
}
