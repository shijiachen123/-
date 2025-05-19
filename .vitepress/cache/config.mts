import { defineConfig } from 'vitepress'
import nav from './nav.js'
import sidebar from './sidebar.js' 
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "四季春在线文档",
  description: "学习交流文档",
  
  // 设置文档根目录
  srcDir: './docs',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
    search: {
      provider: 'local',
    },
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present 施佳晨'
    },
  }
})
