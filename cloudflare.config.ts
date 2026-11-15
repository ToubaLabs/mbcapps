import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: process.env.CLOUDFLARE_WORKER_NAME ?? "monaco-black-car",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-15",
    assets: {
      notFoundHandling: "none",
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
