import { defineConfig } from 'vite';
import million from 'million/compiler';
import react from '@vitejs/plugin-react-swc';
import lightningcss from 'vite-plugin-lightningcss';
import viteCompression from 'vite-plugin-compression';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { imagetools } from 'vite-imagetools';
import { ViteImageOptimizer as viteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';
import webfontDownload from 'vite-plugin-webfont-dl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        viteCompression({ algorithm: 'brotliCompress', threshold: 0 }),
        viteCompression({ algorithm: 'gzip' }),

        // React
        react(),

        // CSS
        lightningcss({
            browserslist: '>= 1%',
        }),

        chunkSplitPlugin({ strategy: 'default' }),

        imagetools(),

        viteImageOptimizer({
            avif: { chromaSubsampling: '4:2:0', effort: 2 },
            webp: { smartSubsample: true, effort: 2, loop: 2 },
        }),

        webfontDownload([], { injectAsStyleTag: false }),

        million.vite({ auto: true, optimize: true }),
    ],

    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },

    build: {
        minify: 'esbuild',
        target: 'esnext',
        cssMinify: 'lightningcss',
    },

    experimental: {
        hmrPartialAccept: true,
        skipSsrTransform: true,
    },
});
