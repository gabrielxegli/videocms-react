import { defineConfig } from "vite";
import million from "million/compiler";
import react from "@vitejs/plugin-react-swc";
import lightningcss from "vite-plugin-lightningcss";
import viteCompression from "vite-plugin-compression";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer as viteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React
    million.vite({ auto: true, mute: true }),
    react(),

    // CSS
    lightningcss({
      browserslist: ">= 1%",
    }),

    chunkSplitPlugin({ strategy: "unbundle" }),

    imagetools(),

    viteImageOptimizer({
      avif: { chromaSubsampling: "4:2:0", effort: 2 },
      webp: { smartSubsample: true, effort: 2 },
    }),

    viteCompression({ algorithm: "brotliCompress" }),
    viteCompression({ algorithm: "gzip" }),
  ],

  build: {
    minify: "terser",
  },
});
