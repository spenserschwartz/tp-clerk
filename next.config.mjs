// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.clerk.dev" },
      { hostname: "images.unsplash.com" },
      { hostname: "tailwindui.com" },
      { hostname: "travelperfect-bucket.s3.us-west-1.amazonaws.com" },
      { hostname: "www.gravatar.com" },
      { hostname: "maps.googleapis.com" },
      { hostname: "travelperfect.io" },
    ],
  },

  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: "/user",
        destination: "/",
        permanent: true,
      },
    ];
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
};
export default config;
