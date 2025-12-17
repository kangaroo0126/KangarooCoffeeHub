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
        },
        theme: {
          customCss: './src/css/custom.css',
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