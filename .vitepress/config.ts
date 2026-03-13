import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  lang: "zh-CN",
  title: "Docs",
  description: "个人技术文档 & 速查手册",
  srcDir: "src",
  lastUpdated: true,
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }]],
  vite: {
    plugins: [tailwindcss()],
  },
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: "CSS",
        items: [
          { text: "CSS实现整站灰色", link: "/grayscale" },
          { text: "文本溢出省略号", link: "/truncate-string-with-ellipsis" },
        ],
      },
      {
        text: "JavaScript",
        items: [{ text: "IntersectionObserver", link: "/intersection_observer" }],
      },
      {
        text: "包管理",
        items: [
          { text: "pnpm升级依赖库", link: "/pnpm" },
          { text: "Yarn升级package.json", link: "/upgrade-package-json-with-yarn" },
          { text: "查看全局安装包", link: "/list_npm_yarn_global_installed_packages" },
        ],
      },
      {
        text: "工具 & 环境",
        items: [
          { text: "Git打标签", link: "/git-tag" },
          { text: "Git项目级别配置", link: "/git-local-config" },
          { text: "VS Code命令行", link: "/install_code_command/" },
          { text: "Homebrew安装Node.js", link: "/how_to_install_specific_nodejs_version_with_homebrew" },
        ],
      },
      {
        text: "其他",
        items: [{ text: "UPNG压缩说明", link: "/upng" }],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/shenglongy/docs" }],
    search: {
      provider: "local",
    },
  },
});
