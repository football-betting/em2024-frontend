import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpinejs()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    ssr: {}
  }
});
