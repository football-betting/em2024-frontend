import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import node from "@astrojs/node";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), alpinejs()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    ssr: {
      noExternal: ['path-to-regexp']
    },
  }
});
