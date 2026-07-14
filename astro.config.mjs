import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://brasiliaexecutive.com.br',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
