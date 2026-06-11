import type { MetadataRoute } from "next";
import { getAllStateSlugs } from "@/lib/states";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...getAllStateSlugs().map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
