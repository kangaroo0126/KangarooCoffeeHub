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

  // 站內搜尋
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        language: ["zh", "en"],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        removeDefaultStopWordFilter: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        hashed: true,
        ignoreFiles: [],
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: "right",
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
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            title: '袋鼠咖啡館',
            description: '在加速的世界裡,練習慢下來的空間。分享教育、學習、心理與社會議題的思考,以及日常生活的碎片與感悟。',
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
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  // 額外的文檔插件(教育倡議)
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
      // 社群分享圖片
      image: 'img/banner/banner01.png',

      // SEO Metadata
      metadata: [
        {name: 'description', content: '一個關於教育與學習、心理學、社會工作與社會議題的思考空間。在這裡我們放慢腳步,好好與自己對話。'},
        {name: 'keywords', content: '教育, 心理學, 社會議題, 社會工作, 個人思考, 學習反思, 教育倡議, 諮商, 日記, 學習, 社會'},
        {name: 'author', content: 'Kangaroo'},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: '袋鼠咖啡館 - 慢時光。好咖啡。深思考。'},
        {property: 'og:description', content: '一個關於教育、學習、心理與社會議題的思考空間'},
        {property: 'og:image', content: 'https://kangaroo0126.github.io/KangarooCoffeeHub/img/banner/banner01.png'},
        {property: 'og:url', content: 'https://kangaroo0126.github.io/KangarooCoffeeHub/'},
      ],

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
        copyright: `Copyright © ${new Date().getFullYear()} Slow moments. Good coffee. Better thoughts.`,
      },

      // 程式碼高亮主題
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;