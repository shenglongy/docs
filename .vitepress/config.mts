import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Docs",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/shenglongy/docs" }
    ],
    search: {
      provider: "local"
    }
  },
  lastUpdated: true,
})
