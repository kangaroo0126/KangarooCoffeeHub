// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '袋鼠咖啡館',
  tagline: 'Slow moments. Good coffee. Better thoughts.',
  favicon: 'img/favicon.png',

  url: 'https://kangaroo0126.github.io',
  baseUrl: '/KangarooCoffeeHub/',

  organizationName: 'kangaroo0126',
  projectName: 'KangarooCoffeeHub',

  onBrokenLinks: 'throw',
    markdown: {
    mermaid: true,
  },

  future: {
    experimental_faster: true,
  },

  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en', 'ja', 'ko'],
    // ... 你的其他 i18n 設定
  },


  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // ... 其他原本的 docs 設定
        },
        blog: {
          showReadingTime: true,
          // 其他 blog 設定...
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
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
    label: '專題文章'
  },
  {
    to: '/blog',              
    label: '日常思考',
    position: 'left'
  },
  {
    to: '/myshelf',           
    label: '我的書櫃',
    position: 'left'
  },
  {
      to: '/eduadvocacy/intro',     
      label: '教育倡議',
      position: 'left'
  }, 
  {
    to: '/about',            
    label: '關於我',
    position: 'left'
  }
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
          label: '關於我',
          to: '/about',
        },
      ],
    },  // ← 這裡要加逗號和關閉大括號
    {
      title: 'More',
      items: [
        {
          label: '舊版Blog-Medium',
          href: 'https://medium.com/@kangarooblog',
        },
        {
          label: '作品集',
          to: '/portfolio',
        },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Slow moments. Good coffee. Better thoughts.`,
},
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
