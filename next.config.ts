import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src", "core", "styles")],
    prependData: `@import "_mixins.scss"; @import "_typography.scss"; @import "_media.scss";`,
  },
  images: {
    minimumCacheTTL: 86400,
    formats: ['image/webp'],
    remotePatterns: [
      { hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME1 as string, port: '', pathname: '**', protocol: 'https' },
      { hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME2 as string, port: '', pathname: '**', protocol: 'https' },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) => {
      if (rule && typeof rule === "object" && rule.test) {
        const test = rule.test;
        if (test instanceof RegExp) {
          return test.test(".svg");
        }
      }
      return false;
    });

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push(
      {
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );

    return config;
  },
};

export default nextConfig;
