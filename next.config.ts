import { serverEnvs } from '@/env/server';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/dashboard",
                permanent: true,
            },
        ];
    },
    output: serverEnvs.STANDALONE === 1 ? "standalone" : undefined,
    reactStrictMode: true,
    serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
