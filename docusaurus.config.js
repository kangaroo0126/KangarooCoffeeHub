// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '袋鼠咖啡館',
  tagline: 'Slow moments. Good coffee. Better thoughts.',
  favicon: 'img/favicon.png',

  // GitHub Pages 部署設定
  url: 'https://kangaroo0126.github.io',
  baseUrl: '/KangarooCoffeeHub/',
  trailingSlash: false, 
  organizationName: 'kangaroo0126',
  projectName: 'KangarooCoffeeHub',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 國際化設定
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },

  // Markdown 設定
  markdown: {
    mermaid: true,
  },

  //加入站內搜尋
  themes: [
  [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    {
      // 支援中文和英文
      language: ["zh", "en"],
      
      // 索引所有類型的頁面
      indexDocs: true,
      indexBlog: true,
      indexPages: true,
      
      // 索引內容的深度(越高越詳細,但檔案會變大)
      docsRouteBasePath: '/docs',
      blogRouteBasePath: '/blog',
      
      // 搜尋結果高亮
      highlightSearchTermsOnTargetPage: true,
      
      // 顯示完整路徑
      explicitSearchResultPath: true,
      
      // 移除搜尋索引的雜訊
      removeDefaultStopWordFilter: true,
      
      // 搜尋結果數量
      searchResultLimits: 8,
      
      // 搜尋結果顯示上下文
      searchResultContextMaxLength: 50,
      
      // 為檔案名稱生成 hash,避免快取問題
      hashed: true,
      
      // 索引所有頁面(包含你的自訂頁面)
      ignoreFiles: [],

       // 搜尋匹配度設定
      searchBarShortcut: true,
      searchBarShortcutHint: true,
      
      // 關鍵:調整分詞策略
      zhUserDict: "dict.txt",  // 可選:自訂詞典
      zhUserDictPath: "path/to/dict.txt",  // 可選:詞典路徑
      
      // 最小搜尋字數(建議設為 2,避免單字搜尋)
      searchBarPosition: "right",
      
      // 調整搜尋結果相關性門檻
      // 這個會過濾掉相關性太低的結果
      searchResultLimits: 8,
      searchResultContextMaxLength: 50,
    },
  ],
],

  // 預設主題和插件
  presets: [
  [
    'classic',
    
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: './sidebars.js',
        feedOptions: {
          type: 'all',
          title: '袋鼠的技術文件更新',
          description: '技術文件與教學的最新更新',
          copyright: `Copyright © ${new Date().getFullYear()} 袋鼠`,
          language: 'zh-TW',
          limit: 20, // 最多顯示 20 篇
        },
      },
      blog: {
        showReadingTime: true,
        feedOptions: {
          type: 'all',
          title: '袋鼠的部落格',
          description: '程式開發與學習心得分享',
          copyright: `Copyright © ${new Date().getFullYear()} 袋鼠`,
          language: 'zh-TW',
          limit: 20,
        },
      },
      theme: {
        customCss: './src/css/custom.css',
      },
      gtag: {
        trackingID: 'G-1TTB1R6895',
        anonymizeIP: true,
      },
    }),
  ],
],

  presets: [
  [
    'classic',
    
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: './sidebars.js',
      },
      blog: {
        showReadingTime: true,
        feedOptions: {
          type: 'all',
          title: '袋鼠咖啡館',
          description: '袋鼠咖啡館 - 在加速的世界裡，練習慢下來的空間。分享教育、學習、心理與社會議題的思考，以及日常生活的碎片與感悟。沒有演算法，只有真實的整理與對話。',
          copyright: `Copyright © ${new Date().getFullYear()} Slow moments. Good coffee. Better thoughts.`,
          language: 'zh-TW',
        },
      },
      theme: {
        customCss: './src/css/custom.css',
      },
      gtag: {
        trackingID: 'G-1TTB1R6895',
        anonymizeIP: true,
      },
    }),
  ],
],


  // 額外的文檔插件（教育倡議）
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'eduadvocacy',
        path: 'eduadvocacy',
        routeBasePath: 'eduadvocacy',
        sidebarPath: './sidebarsEduadvocacy.js',
      },
    ],
  ],

  // 主題設定
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',

      // 顏色模式設定
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    
      // 導航欄設定
      navbar: {
        title: '袋鼠咖啡館',
        logo: {
          alt: '袋鼠咖啡館的Logo',
          src: 'img/favicon.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '專題文章',
          },
          {
            to: '/blog',
            label: '日常思考',
            position: 'left',
          },
          {
            to: '/myshelf',
            label: '我的書櫃',
            position: 'left',
          },
          {
            to: '/eduadvocacy/intro',
            label: '教育倡議',
            position: 'left',
          },
          {
            to: '/about',
            label: '關於我',
            position: 'left',
          },
        ],
      },

// 頁尾設定
footer: {
  style: 'dark',
  links: [
    {
      title: 'Pages',
      items: [
        {
          label: '專題文章',
          to: '/docs/intro',
        },
        {
          label: '日常思考',
          to: '/blog',
        },
        {
          label: '我的書櫃',
          to: '/myshelf',
        },
        {
          label: '教育倡議',
          to: '/eduadvocacy/intro',
        },
        {
          label: '關於我',
          to: '/about',
        },
      ],
    },
    {
      title: 'More',
      items: [
        {
          label: '舊版Blog-Medium',
          href: 'https://medium.com/@kangarooblog',
        },
        {
          label: 'Profile 個人經歷與作品',
          to: '/portfolio',
        },
      ],
    },
  ],
  copyright: `Copyright © 2026 Slow moments. Good coffee. Better thoughts.`,
},  // 👈 footer 在這裡結束

      // 程式碼高亮主題
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;