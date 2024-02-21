import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    envDir: 'env',
    envPrefix: ['__APP__'],
    base: '/react-practice',
    optimizeDeps: {
        exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },

    resolve: {
        alias: {
            '@assets': './src/assets',
            // @ts-ignore
            '@': path.resolve(__dirname, './src/'),
        },
    },
    server: {
        // headers: {
        //   'Cross-Origin-Opener-Policy': 'same-origin',
        //   'Cross-Origin-Embedder-Policy': 'require-corp',
        //   // 'Cross-Origin-Embedder-Policy': 'credentialless',
        // },
    },
});
