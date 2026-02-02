// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '袋鼠咖啡館',
  tagline: 'Slow moments. Good coffee. Better thoughts.',
  favicon: 'img/favicon.png',

  url: 'https://kangaroo0126.github.io',
  baseUrl: '/KangarooCoffeeHub/',
  trailingSlash: false,
  organizationName: 'kangaroo0126',
  projectName: 'KangarooCoffeeHub',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },

  markdown: {
    mermaid: true,
  },

  // 加入站內搜尋
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

  // 預設主題和插件（只留一個）
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

  // 額外的文檔插件
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'slowlife',
        path: 'slowlife',
        routeBasePath: 'slowlife',
        sidebarPath: './sidebarsslowlife.js',
      },
    ],
  ],

  // 主題設定
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',

      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

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
            to: '/slowlife/intro',
            label: '慢行生活',
            position: 'left',
          },
          {
            to: '/myshelf',
            label: '我的書櫃',
            position: 'left',
          },
          {
            to: '/EducationAdvocacy',
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
                label: '慢行生活',
                to: '/slowlife/intro',
              },
              {
                label: '教育倡議',
                to: '/EducationAdvocacy',
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
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;