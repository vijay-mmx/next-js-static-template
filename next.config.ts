import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    output: "export",
    trailingSlash: true,
    // skipTrailingSlashRedirect: true,
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
};

export default nextConfig;
