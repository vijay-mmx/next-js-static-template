export const dynamic = "force-static";

import type { MetadataRoute } from "next";

const BASE_URL = "https://you-domain.com"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/company/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/projects/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/project/aura/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/interiors/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/careers/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact/`,
            lastModified: new Date("2026-02-16"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
