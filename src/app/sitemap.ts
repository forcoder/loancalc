import type { MetadataRoute } from "next";
import { getAllStateSlugs } from "@/lib/states";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loancalc-eta.vercel.app";

const TOOL_PAGES = [
  { path: "/refinance", priority: 0.9 },
  { path: "/auto-loan", priority: 0.9 },
  { path: "/fha-loan-calculator", priority: 0.85 },
  { path: "/pmi-calculator", priority: 0.85 },
  { path: "/15-vs-30-year-mortgage", priority: 0.85 },
] as const;

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
    ...TOOL_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
  ];
}