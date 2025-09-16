// Minimal vite config for static HTML serving
export default {
  root: "public",
  publicDir: false,
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
};