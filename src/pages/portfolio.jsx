import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';

const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');

  :root {
    --res-primary: #5B8A68;
    --res-primary-light: #81C784;
    --res-primary-bg: #EEF5F0;
    --res-accent: #D4956A;
    --res-accent-bg: #FBF3ED;
    --res-text-main: #2C3E35;
    --res-text-sub: #7A8E82;
    --res-bg: #F8FAF8;
    --res-card-bg: #FFFFFF;
    --res-border: #DDE8DF;
    --res-shadow: rgba(91,138,104,0.12);
    --res-shadow-lg: rgba(91,138,104,0.2);
    --res-line: #A8C8AF;
    --res-tag-bg: #E4EFE7;
    --res-tag-text: #2C5F3A;
    --res-dot: #D4956A;
    --transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  }

  [data-theme='dark'] {
    --res-primary: #7EC882;
    --res-primary-light: #A5D6A7;
    --res-primary-bg: rgba(126,200,130,0.12);
    --res-accent: #F0A878;
    --res-accent-bg: rgba(240,168,120,0.12);
    --res-text-main: #E8F0E9;
    --res-text-sub: #9EB8A2;
    --res-bg: transparent;
    --res-card-bg: rgba(255,255,255,0.05);
    --res-border: rgba(126,200,130,0.2);
    --res-shadow: rgba(0,0,0,0.3);
    --res-shadow-lg: rgba(0,0,0,0.5);
    --res-line: rgba(126,200,130,0.4);
    --res-tag-bg: rgba(126,200,130,0.15);
    --res-tag-text: #A5D6A7;
    --res-dot: #F0A878;
  }

  * { box-sizing: border-box; }

  .rc { background: var(--res-bg); color: var(--res-text-main); font-family: 'Nunito', 'Noto Serif TC', 'Microsoft JhengHei', sans-serif; }

  /* ── HEADER ── */
  .rc-header {
    position: relative;
    overflow: hidden;
    padding: 5rem 1.5rem 4rem;
    text-align: center;
    background: linear-gradient(160deg, var(--res-primary-bg) 0%, var(--res-accent-bg) 100%);
  }
  .rc-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,138,104,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .rc-header-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
  .rc-badge { display: inline-block; background: var(--res-primary); color: #fff; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.3rem 0.9rem; border-radius: 999px; margin-bottom: 1.5rem; }
  .rc-name { font-size: clamp(2rem, 6vw, 3rem); font-weight: 900; color: var(--res-text-main); margin-bottom: 0.8rem; line-height: 1.2; }
  .rc-edu { font-size: 0.9rem; color: var(--res-text-sub); margin-bottom: 0.3rem; line-height: 1.6; }
  .rc-deco-line { width: 60px; height: 3px; background: linear-gradient(90deg, var(--res-primary), var(--res-accent)); border-radius: 2px; margin: 1.5rem auto 0; }

  /* ── SECTION ── */
  .rc-section { max-width: 1040px; margin: 0 auto; padding: 0 1.5rem 5rem; }
  .rc-section-head { text-align: center; margin-bottom: 2.5rem; }
  .rc-section-title {
    font-size: 1.6rem; font-weight: 800; color: var(--res-text-main);
    display: inline-flex; align-items: center; gap: 0.7rem;
  }
  .rc-section-title::before, .rc-section-title::after {
    content: ''; display: block; width: 32px; height: 2px;
    background: linear-gradient(90deg, var(--res-primary), var(--res-accent));
    border-radius: 2px;
  }

  /* ── ABOUT ── */
  .rc-about-box {
    background: var(--res-card-bg);
    border: 1.5px solid var(--res-border);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 24px var(--res-shadow);
    line-height: 1.9;
    white-space: pre-line;
    color: var(--res-text-main);
    font-size: 0.97rem;
    position: relative;
    overflow: hidden;
  }
  .rc-about-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--res-primary), var(--res-accent));
  }
  .rc-research-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
  .rc-research-card {
    background: var(--res-card-bg);
    border: 1.5px dashed var(--res-border);
    border-radius: 16px;
    padding: 1.5rem;
  }
  .rc-research-title { font-weight: 800; font-size: 1rem; color: var(--res-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--res-primary-bg); }
  .rc-research-card li { margin-bottom: 0.6rem; line-height: 1.6; font-size: 0.9rem; color: var(--res-text-main); }

  /* ── TABS ── */
  .rc-tabs { display: flex; background: var(--res-card-bg); border: 1.5px solid var(--res-border); border-radius: 14px; padding: 0.4rem; margin-bottom: 2.5rem; gap: 0.3rem; }
  .rc-tab {
    flex: 1; text-align: center; padding: 0.75rem 1rem;
    background: none; border: none; cursor: pointer;
    border-radius: 10px; font-size: 0.88rem; font-weight: 700;
    color: var(--res-text-sub); transition: var(--transition);
    font-family: inherit;
  }
  .rc-tab:hover { background: var(--res-primary-bg); color: var(--res-primary); }
  .rc-tab.active { background: var(--res-primary); color: #fff; box-shadow: 0 3px 12px var(--res-shadow-lg); }

  /* ── TIMELINE ── */
  .rc-timeline { position: relative; padding-left: 2.5rem; }
  .rc-timeline::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, var(--res-primary), var(--res-line), transparent); }
  .rc-tl-item { position: relative; margin-bottom: 2rem; }
  .rc-tl-dot {
    position: absolute; left: -2.5rem; top: 1.6rem;
    width: 14px; height: 14px;
    background: var(--res-dot); border-radius: 50%;
    border: 2.5px solid var(--res-card-bg);
    box-shadow: 0 0 0 2.5px var(--res-primary);
    transition: var(--transition);
  }
  .rc-tl-item:hover .rc-tl-dot { transform: scale(1.3); }
  .rc-tl-year {
    font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em;
    color: var(--res-primary); text-transform: uppercase;
    margin-bottom: 0.4rem;
    font-family: monospace;
  }

  /* ── CARD ── */
  .rc-card {
    background: var(--res-card-bg);
    border: 1.5px solid var(--res-border);
    border-radius: 18px;
    padding: 1.6rem;
    box-shadow: 0 2px 12px var(--res-shadow);
    transition: var(--transition);
  }
  .rc-card:hover { box-shadow: 0 8px 32px var(--res-shadow-lg); transform: translateY(-2px); }
  .rc-card-title { font-size: 1.1rem; font-weight: 800; color: var(--res-text-main); margin-bottom: 0.3rem; line-height: 1.5; }
  .rc-card-time { font-size: 0.82rem; color: var(--res-text-sub); font-weight: 700; margin-bottom: 0.8rem; }
  .rc-card-desc { font-size: 0.92rem; line-height: 1.7; color: var(--res-text-main); white-space: pre-line; }

  /* TAGS */
  .rc-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.8rem; }
  .rc-tag {
    display: inline-block; background: var(--res-tag-bg); color: var(--res-tag-text);
    padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.78rem; font-weight: 700;
  }

  /* LINK PILLS */
  .rc-links { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.9rem; }
  .rc-pill {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.3rem 0.85rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700;
    text-decoration: none; border: 1.5px solid; transition: var(--transition); cursor: pointer;
    white-space: nowrap;
  }
  .rc-pill.link { background: var(--res-primary-bg); color: var(--res-tag-text); border-color: var(--res-primary); }
  .rc-pill.link:hover { background: var(--res-primary); color: #fff; text-decoration: none; }
  .rc-pill.pdf { background: #FBE9E7; color: #BF360C; border-color: #FFAB91; }
  [data-theme='dark'] .rc-pill.pdf { background: rgba(255,171,145,0.15); color: #FFAB91; border-color: #FFAB91; }
  .rc-pill.pdf:hover { background: #BF360C; color: #fff; text-decoration: none; }

  /* READ MORE */
  .rc-readmore {
    display: inline-flex; align-items: center; gap: 0.4rem;
    margin-top: 1rem; background: none;
    border: 1.5px solid var(--res-primary); color: var(--res-primary);
    padding: 0.4rem 1rem; border-radius: 20px; cursor: pointer;
    font-size: 0.85rem; font-weight: 700; font-family: inherit;
    transition: var(--transition);
  }
  .rc-readmore:hover { background: var(--res-primary); color: #fff; }
  .rc-details { margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1.5px dashed var(--res-border); }
  .rc-details h4 { font-size: 0.88rem; font-weight: 800; color: var(--res-primary); margin-bottom: 0.5rem; }
  .rc-details li { font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.4rem; color: var(--res-text-main); }
  .rc-details p { font-size: 0.9rem; line-height: 1.6; color: var(--res-text-main); }

  /* WORK PORTFOLIO THUMBS */
  .rc-thumb-row { display: flex; gap: 0.8rem; margin-top: 1.2rem; flex-wrap: wrap; }
  .rc-thumb {
    flex: 1; min-width: 130px; max-width: 200px;
    border-radius: 12px; overflow: hidden; border: 1.5px solid var(--res-border);
    text-decoration: none; color: inherit; transition: var(--transition);
    display: flex; flex-direction: column; background: var(--res-card-bg);
  }
  .rc-thumb:hover { transform: translateY(-3px); box-shadow: 0 6px 20px var(--res-shadow-lg); text-decoration: none; color: inherit; }
  .rc-thumb-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; background: var(--res-primary-bg); }
  .rc-thumb-pdf { width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; background: var(--res-accent-bg); }
  .rc-thumb-label { padding: 0.45rem 0.7rem; font-size: 0.76rem; font-weight: 700; color: var(--res-text-sub); border-top: 1px solid var(--res-border); display: flex; align-items: center; gap: 0.3rem; }

  /* ── PORTFOLIO LIST ── */
  .rc-portfolio-list { flex: 1; min-width: 0; }
  .rc-portfolio-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem 1.2rem; border-radius: 14px;
    border: 1.5px solid var(--res-border);
    background: var(--res-card-bg);
    text-decoration: none; color: inherit;
    margin-bottom: 0.7rem;
    transition: var(--transition);
    box-shadow: 0 1px 4px var(--res-shadow);
  }
  .rc-portfolio-item:hover { transform: translateX(4px); box-shadow: 0 4px 20px var(--res-shadow-lg); text-decoration: none; color: inherit; border-color: var(--res-primary); }
  .rc-portfolio-type { flex: 0 0 auto; background: var(--res-accent-bg); color: var(--res-accent); border: 1px solid var(--res-accent); border-radius: 20px; padding: 0.2rem 0.7rem; font-size: 0.73rem; font-weight: 700; white-space: nowrap; }
  [data-theme='dark'] .rc-portfolio-type { background: rgba(240,168,120,0.15); }
  .rc-portfolio-item-title { flex: 1; font-size: 0.92rem; font-weight: 700; color: var(--res-text-main); line-height: 1.4; }
  .rc-portfolio-arrow { flex: 0 0 auto; color: var(--res-text-sub); transition: var(--transition); }
  .rc-portfolio-item:hover .rc-portfolio-arrow { color: var(--res-primary); transform: translateX(3px); }

  /* ── AWARDS & VOLUNTEER ── */
  .rc-split { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
  .rc-split-card { background: var(--res-card-bg); border: 1.5px solid var(--res-border); border-radius: 18px; padding: 1.6rem; box-shadow: 0 2px 12px var(--res-shadow); }
  .rc-split-card-title { font-size: 1rem; font-weight: 800; color: var(--res-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--res-primary-bg); }
  .rc-split-card li { font-size: 0.88rem; line-height: 1.6; margin-bottom: 0.5rem; color: var(--res-text-main); }

  /* EMPTY STATE */
  .rc-empty { text-align: center; padding: 4rem 1rem; color: var(--res-text-sub); font-size: 1.1rem; }

  /* DIVIDER */
  .rc-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--res-border), transparent); margin: 0 auto 4rem; max-width: 400px; }

  /* FOOTER */
  .rc-footer { text-align: center; padding: 2rem 1rem; color: var(--res-text-sub); font-size: 0.82rem; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .rc-portfolio-item { padding: 0.8rem 1rem; }
    .rc-portfolio-type { display: none; }
    .rc-timeline { padding-left: 1.5rem; }
    .rc-timeline::before { left: 3px; }
    .rc-tl-dot { left: -1.5rem; width: 11px; height: 11px; top: 1.3rem; }
    .rc-tabs { flex-direction: column; }
    .rc-tab { text-align: left; }
    .rc-header { padding: 4rem 1.2rem 3rem; }
    .rc-thumb { max-width: 100%; }
  }

  @media (max-width: 480px) {
    .rc-card { padding: 1.2rem; }
    .rc-card-title { font-size: 1rem; }
    .rc-portfolio-item { gap: 0.7rem; }
  }
`;

const resumeData = {
  profile: {
    name: "蘇冠彰 ｜ 袋鼠",
    edu: [
      "2026年9月~現在　東海大學　社會工作研究所 在學中",
      "2021年9月~2025年6月　中原大學 應用華語系 ／ 心理學系輔系"
    ]
  },
  about: {
    intro: "在社會創新與永續領域耕耘四年，以教育作為理解與回應社會問題的入口。透過設計思考與社會設計方法，參與高中生生涯教育，陪伴學生探索自我與未來可能性。在實務推動中，我同時關注個人成長與制度層面議題：曾參與紀錄「108課綱觀察報告書」現場記者會，籌辦為期七天的國際民主教育論壇 IDEC 2024，串聯國內外教育實踐者促進對話與交流。同時也以教育不平等為核心議題，製作桌遊《輪不到我上場》，引導大學生理解教育結構與自身參與可能；並在「島島阿學」學習社群策劃學習馬拉松，陪伴學員持續行動。\n\n過往以打造產品與服務實踐理念，我自學數位科技、AI 應用、社會設計、產品發想、企劃與行銷，使理念能以更具體、可參與的方式落地。\n\n然而，隨著實務專案經驗的累積，我逐漸意識到：僅以商業邏輯回應教育與社會問題，往往難以真正撼動其背後的結構性限制。因此，我選擇以社會工作作為回應的實踐路徑，專注個案服務，理解人所處的情境與權力位置。我重視傾聽每一個生命的聲音，放下身段與當事人同行，以柔性介入建立個體與制度的連結。對我而言，理解與陪伴本身就是力量，能讓社會改變不再停留於表面，而真正觸及每一個人的需求。",
    researchCategories: [
      {
        title: "心理與社會工作領域",
        items: [
          "經濟弱勢與貧窮",
          "兒少發展與心理健康",
          "女性主義社會工作",
          "基變社會工作",
          "結構性不平等與社會工作介入",
        ]
      },
      {
        title: "社會與教育議題領域",
        items: [
          "在新自由主義體系下，兒少與青年是否因學歷與能力自由主義被結構性限制，而無法成為被完整看見與尊重的個體？",
          "現行教育制度如何翻轉與重構，兼顧多元學習需求，支持每個人成為完整的人？",
          "社會如何建構能真正包容每個個體的制度與機制？",
          "知識、能力、價值...是誰定義的，我們是否能創造不定義的社會？",
          "社會結構、社會資本與不平等的社會"
        ]
      }
    ]
  },
  projects: {
    social_work: [
      {
        id: 0,
        year: "2026",
        title: "2026 SDGs Talk 媒體素養青年服務工作隊",
        fullTime: "2026.07～Now",
        intro: "",
        tags: [],
        links: [
          { label: "Website", url: "https://sdgstalk.nptu.edu.tw/", type: "link" }
        ],
        details: {
          role: [],
          result: ""
        }
      }
    ],
    innovation: [
      {
        id: 1,
        year: "2025",
        title: "森光無限 × 為臺灣而教（TFT）《輪不到我上場》桌遊開發與設計",
        fullTime: "2025.03–2026.06（參與青年永續社會設計挑戰賽期間：2025.03–2025.07）",
        intro: "本專案由參與青年永續社會設計挑戰賽獲獎後（大專組季軍）與出題組織合作，延續為期半年的產品化出版與巡迴工作坊。專案旨在以桌遊作為媒介，引導青年理解教育不平等的結構面向，並促進他們思考自身角色或科系如何參與教育行動。",
        tags: ["議題研究", "訪談設計", "使用者洞察", "桌遊遊戲設計", "工作坊企劃", "原型測試","產品開發"],
        links: [{ label: "Instagram", url: "https://www.instagram.com/lumi_paths/", type: "link" }],
        details: {
          role: [
            "議題研究：彙整文獻與現場觀察，定義教育不平等的關鍵問題與影響層面。",
            "利害關係人訪談：規劃並執行教師與大學生訪談，蒐集行為動機與阻礙，並擷取洞察。",
            "洞察收斂：將訪談資料整理成「參與／關注」四象限模型，作為遊戲設計的設計原則。",
            "桌遊設計與測試：參與遊戲機制設計、版本迭代、遊戲規則與教案撰寫，執行多輪內測與修正。",
            "推廣與執行：策劃並執行北、中、南共三場桌遊工作坊。"
          ],
          result: "獲得青年永續社會設計挑戰賽大專組季軍，並與 TFT 合作進行產品化推廣。"
        }
      },
      {
        id: 2,
        year: "2024",
        title: "島島阿學｜學習馬拉松專案經理",
        fullTime: "2024年12月~2025年8月",
        intro: "島島阿學是一個以民主社群與自主學習為核心的學習平台，期望透過集體智慧打造沒有天花板的學習環境。自2024年12月起擔任第一屆「學習馬拉松」專案經理，陪伴並培育 16+ 位學習者（高中生至 50+）以個人陪伴與小組支持的方式，建立持續自主學習的習慣與成果呈現機制。",
        tags: ["專案管理", "工作坊設計", "社群內容經營", "質性與量化資料分析", "專案報告撰寫"],
        links: [
          { label: "Website", url: "https://www.daoedu.tw/", type: "link" },
          { label: "Instagram", url: "https://www.instagram.com/daodao_learn/", type: "link" }
        ],
        details: {
          role: [
            "社群內容與傳播：負責每月電子報與 IG 經營，撰寫逾 30+ 篇關於學習與教育觀點之貼文與側記。",
            "活動籌辦與執行：策劃並執行 2022、2023 年度活動（如自學社群小尾牙、2 週年活動），採 Open Space / OST 方法促進參與者自發討論與連結。",
            "學習馬拉松專案管理（專案經理角色）：規劃專案時程、招募流程與學習陪跑機制，擔任引導者與學員之間的溝通橋樑。",
            "籌畫與執行學習成果發表（含發表流程、場地與檔案整理），協助學員將學習過程具體化。",
            "期中回饋報告：負責問卷設計、資料彙整與分析（含質性回饋整理與量化分析，使用 SPSS），並提出改善建議。"
          ],
          result: "成功培育 16+ 位跨年齡學習者完成馬拉松計畫，建立例行回饋機制並完成期中分析報告。"
        }
      },
      {
        id: 3,
        year: "2024",
        title: "IDEC 2024 臺灣教育世界博覽會｜活動議程組、市集合作組",
        fullTime: "2024.03 – 2024.08（活動期：2024年7月20~7月28日）",
        intro: "第30屆 International Democratic Education Conference（IDEC）首次在臺灣舉行，為期7天，包含演講、工作坊、Open Space 與市集，匯聚國內外教育創新、實驗教育與民主教育實踐者，促進跨域對話與資源連結。",
        tags: ["議程規劃", "跨文化溝通", "活動現場場務", "合作夥伴開發"],
        links: [{ label: "Website", url: "https://www.twdec.org/idec2024", type: "link" }],
        details: {
          role: [
            "官網與線上系統：協助官網內容更新，並協助與國外友人建置與維護 Open Space 登記系統。",
            "講者對接與議程協調：與 30+ 名國內外講者對接，負責議程排程與溝通流程，處理跨語言／跨時區聯繫事宜。",
            "現場講座接待與支援：活動期間負責現場講者接待、場務協調、簡報測試與流程控場。",
            "推廣與學術合作：與自己的大學教授合作舉行推廣講座（主題：地方創生與教育）。",
            "市集與組織邀約：撰寫邀請函並主動聯繫 NGO、學生團體、教育創新與實驗教育機構。",
            "空間與場務營造：參與現場動線規劃、場佈與舞台搭建，協助空間氛圍營造。"
          ],
          result: "成功舉辦為期7天之博覽會，完成 30+ 講者之議程安排，並串聯多個教育組織與團體參與市集／活動。"
        }
      },
      {
        id: 4,
        year: "2023",
        title: "人生書家（Young飛國際行動計畫提案）",
        fullTime: "2023年2月～2023年12月底",
        intro: "以「人生書家」團隊參與教育部青年發展署 Young 飛國際行動計畫，聚焦高中生生涯教育缺口。專案包含生涯圖書館工作坊（1場）、製作一本「人生之書」教材、架設專案網站（Wix），並透過 IG 進行生涯教育倡議。",
        tags: ["議題研究", "深度訪談", "教材設計", "工作坊主持", "Wix網站建置", "社群經營"],
        links: [
          { label: "Website", url: "https://bookingyourlife202.wixsite.com/bookingyourlife", type: "link" },
          { label: "Instagram", url: "https://www.instagram.com/bookingyourlife/", type: "link" }
        ],
        details: {
          role: [
            "議題研究與盤點：蒐集並整理高中生在生涯準備選擇上的痛點與資源缺口，建立專案研究脈絡。",
            "國際訪談與交流：規劃並執行 15+ 次以上的國外訪談（涵蓋日本、美國等），汲取不同國家生涯教育實務經驗。",
            "內容開發：以「人生設計」概念為核心，改編並創作一本《人生之書》（教案＋活動引導），作為高中生生涯探索教材。",
            "工作坊主持：策劃並擔任生涯圖書館工作坊中反思與分享環節主持，帶領學員進行自我探索與行動規劃。",
            "網站與社群運營：以 Wix 架設專案網站，並負責 IG 社群行銷與倡議內容。"
          ],
          result: "完成一本可實務應用的《人生之書》教材、舉辦生涯圖書館工作坊並產出教案資源。"
        }
      },
      {
        id: 5,
        year: "2022",
        title: "中原大學諮商中心義工團文書美宣組 組長",
        fullTime: "2022年9月～2023年6月",
        intro: "擔任諮商中心義工團中文書與美宣組長，與實習心理師、組員密切合作，策畫兩期期刊之主題企劃、內容討論與視覺輸出，協助提升諮商中心對內對外的形象與資源傳播。",
        tags: ["團隊領導", "內容企劃", "編輯校對", "排版輸出"],
        links: [],
        details: {
          role: [
            "主導期刊企劃：帶領組員討論並確定每學期期刊的主題方向、內容架構與採訪。",
            "工作分派與協調：負責任務分配、進度追蹤與組內溝通，協調實習心理師與義工之間的合作流程。",
            "視覺設計與製作：擔任其中一期期刊的封面與封底設計（視覺概念發想、版面草案與最終輸出）。",
            "內容編輯與校對：協助審稿、文字校正與版面排版前的最後檢視，確保期刊品質與專業度。"
          ],
          result: "與團隊完成兩期期刊的企劃與出版，提升諮商中心在校內的可見度與專業溝通。"
        }
      }
    ]
  },
  work: [
    {
      title: "中華民國振鐸學會 均優學習論壇－重建教育經費保障　高雄場 ／專案總負責人",
      year: "2026",
      fullTime: "2026.01– 2026.03",
      desc: [
        "擔任學會對外主要窗口，協調與高雄市公民監督公僕聯盟、社區大學促進會、教師職業工會及家長協會之合作，成功舉辦半天教育政策論壇與公聽會。",
        "全面規劃與執行論壇，包括主視覺設計、行銷宣傳、流程安排與餐飲訂購，確保活動順利進行。"
      ],
      portfolioItems: [
        {
          label: "主視覺宣傳",
          url: "http://jendo.org/uploadFiles/%e8%b7%a8%e6%a0%a1%e9%81%b8%e4%bf%ae/222/20260314%E5%9D%87%E5%84%AA%E9%AB%98%E9%9B%84%E9%87%8D%E5%BB%BA%E6%95%99%E8%82%B2%E7%B6%93%E8%B2%BB%E4%BF%9D%E9%9A%9C%E8%AB%96%E5%A3%87_%E5%AE%A3%E5%82%B3%E4%B8%BB%E8%A6%96%E8%A6%BA.png",
          type: "image"
        },
        {
          label: "活動簡章",
          url: "http://jendo.org/uploadFiles/%e8%b7%a8%e6%a0%a1%e9%81%b8%e4%bf%ae/222/20260314%E5%9D%87%E5%84%AA%E9%AB%98%E9%9B%84%E9%87%8D%E5%BB%BA%E6%95%99%E8%82%B2%E7%B6%93%E8%B2%BB%E4%BF%9D%E9%9A%9C%E8%AB%96%E5%A3%87_%E7%B0%A1%E7%AB%A0.pdf",
          type: "pdf"
        }
      ]
    },
    {
      title: "高雄回甘心理諮商所 ／ 行政櫃台",
      titleLink: "https://bsccpsy.com/",
      year: "2025",
      fullTime: "2025.09 – 2026.07",
      desc: [
        "擔任多方溝通橋樑，串接政府行政、心理師與個案需求，確保服務流程從行政到現場的銜接。",
        "負責政府與合作單位計畫案的行政作業與核銷流程，協助文件準備與資料整理。",
        "剪輯與後製 Podcast 節目（含剪輯、上架前處理），協助內容傳播與品牌經營。",
        "作為心理師與個案之間的主要聯絡窗口，協調安排、追蹤進度，促進溝通順暢。",
        "回覆來電/訊息詢問、接待來訪個案，並處理初步危機通報，維持服務品質與動線安全。",
        "負責中華電信員工EAP諮商方案每月滿意度報告整理。"
      ]
    },
    {
      title: "中原大學通識課程／教學助理",
      year: "2024",
      fullTime: "2024.09~2025.06",
      desc: [
        "課務管理：協助整理並發布每堂課的課程資訊（教材、投影片、作業與時程），維持課程資料的完整。",
        "考試與評量支援：擔任期中、期末監考人員，協助考場秩序管理與試卷收發。",
        "教學科技訓練：教授並示範互動教學工具（Slido），協助授課教授上手並在課堂中導入。"
      ]
    },
    {
      title: "中原大學 諮商中心 ／ 櫃台工讀生",
      year: "2022",
      fullTime: "2022.09 – 2025.06",
      desc: [
        "接聽諮商中心電話、回覆學生與來電諮詢。",
        "現場接待個案，負責引導與基本行政登記，維持現場秩序與隱私守護。",
        "協助諮商老師交辦事項（含資料整理、活動支援），支援中心日常運作。"
      ]
    }
  ],
  portfolio: [
    { title: "畢業專題－戀曲1937（日治時期華語教材）", link: "https://www.canva.com/design/DAGT0fZVrno/z_pGrcXPoEAyop04iGIXpw/view", type: "教材設計" },
    { title: "影片《淨你所能》feat.連江縣退休公教人員協會", link: "https://www.youtube.com/watch?v=NIteSYET1xI", type: "影音製作" },
    { title: "解放自己的內心劇本！《導演症候群》線上讀書會，讓生活變得更有彈性", link: "https://chickensoupfamily.com/2024/07/22/director-syndrome/", type: "文字創作" },
    { title: "【找自己小聚】MBTI與香氛調製：學會識別自己的情感需求，從桌遊到香氛的深度戀愛探索", link: "https://chickensoupfamily.com/2024/12/05/mbtifindme/", type: "文字創作" },
    { title: "「權」知道了嗎？那些易被忽略的學生議題！電子書", link: "https://issuu.com/kangaroo0126/docs/_03f7fefc89a41f", type: "出版品" },
    { title: "桃園市復興鄉羅浮導覽地圖（網頁程式設計）", link: "https://kangaroo0126.github.io/110-2CYCU-programming-project/", type: "網頁程式" },
    { title: "【Ren'py故事遊戲製作】流動的身影跨越邊界之旅", link: "https://11057208.itch.io/fluid-silhouettes-journey-across-borders", type: "Ren'py遊戲" },
    { title: "EP163【你來播】 校外資源學什麼？學習歷程、履歷經歷必學！", link: "https://podcasts.apple.com/us/podcast/ep163/id1609340208?i=1000664161405", type: "受訪分享" }
  ],
  awards: [
    "2025 青年永續社會設計挑戰賽 大專組",
    "第八屆Fun大視野想向未來孵化組 初選",
    "教育部青年署Young飛全球行動計畫",
    "教育部青年發展署青年志工競賽",
    "懷世代公益計畫提案競賽"
  ],
  volunteer: [
    "中原大學諮商中心心衛活動推廣 90+小時",
    "中原大學服務學習中心 服務達 90+小時",
    "sitcon 學生計算機年會2025現場志工",
    "One-Forty 2024年度志工服務時數達 75 小時",
    "直覺職掘2024 夏令營營隊服務 24 小時",
    "g0v summit 2024現場議程組志工"
  ]
};

// ─── Icons ───
const IconLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconPDF = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconImg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const IconDown = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconUp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── Components ───

const LinkPill = ({ link }) => {
  const icons = { link: <IconExternal />, pdf: <IconPDF /> };
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className={`rc-pill ${link.type || 'link'}`}>
      {icons[link.type] || <IconLink />} {link.label}
    </a>
  );
};

const ProjectCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const hasDetails = (data.details?.role?.length > 0) || data.details?.result;
  return (
    <div className="rc-tl-item">
      <div className="rc-tl-dot" />
      <div className="rc-tl-year">{data.year}</div>
      <div className="rc-card">
        <div className="rc-card-title">{data.title}</div>
        <div className="rc-card-time">{data.fullTime}</div>
        {data.intro && <div className="rc-card-desc">{data.intro}</div>}
        {data.tags?.length > 0 && (
          <div className="rc-tags">
            {data.tags.map((t, i) => <span key={i} className="rc-tag">#{t}</span>)}
          </div>
        )}
        {data.links?.length > 0 && (
          <div className="rc-links">
            {data.links.map((l, i) => <LinkPill key={i} link={l} />)}
          </div>
        )}
        {hasDetails && (
          <>
            <button className="rc-readmore" onClick={() => setOpen(!open)}>
              {open ? '收起' : 'Read more'} {open ? <IconUp /> : <IconDown />}
            </button>
            {open && (
              <div className="rc-details">
                {data.details.role?.length > 0 && (
                  <>
                    <h4>我的角色與貢獻</h4>
                    <ul style={{paddingLeft:'1.1rem',marginBottom:'1rem'}}>
                      {data.details.role.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </>
                )}
                {data.details.result && <>
                  <h4>成果</h4>
                  <p>{data.details.result}</p>
                </>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WorkCard = ({ data }) => (
  <div className="rc-tl-item">
    <div className="rc-tl-dot" />
    <div className="rc-tl-year">{data.year}</div>
    <div className="rc-card">
      <div className="rc-card-title">
        {data.titleLink
          ? <a href={data.titleLink} target="_blank" rel="noopener noreferrer" style={{color:'inherit',borderBottom:'2px solid var(--res-primary)',textDecoration:'none'}}>{data.title}</a>
          : data.title}
      </div>
      <div className="rc-card-time">{data.fullTime}</div>
      <ul style={{paddingLeft:'1.1rem',margin:0}}>
        {data.desc.map((d, i) => <li key={i} style={{marginBottom:'0.3rem',lineHeight:'1.6',fontSize:'0.9rem'}}>{d}</li>)}
      </ul>
      {data.portfolioItems?.length > 0 && (
        <div className="rc-thumb-row">
          {data.portfolioItems.map((item, i) => (
            item.type === 'image' ? (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="rc-thumb">
                <img src={item.url} alt={item.label} className="rc-thumb-img" onError={e => { e.target.style.minHeight='60px'; }} />
                <div className="rc-thumb-label"><IconImg /> {item.label}</div>
              </a>
            ) : (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="rc-thumb">
                <div className="rc-thumb-pdf">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--res-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="rc-thumb-label"><IconPDF /> {item.label}</div>
              </a>
            )
          ))}
        </div>
      )}
    </div>
  </div>
);

// Portfolio section: simple full list, no category filter (too few items to warrant filtering)
const PortfolioSection = ({ items }) => (
  <div className="rc-portfolio-list">
    {items.map((item, i) => (
      <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="rc-portfolio-item">
        <span className="rc-portfolio-type">{item.type}</span>
        <span className="rc-portfolio-item-title">{item.title}</span>
        <span className="rc-portfolio-arrow"><IconArrow /></span>
      </a>
    ))}
  </div>
);

// ─── Main Page ───
export default function ResumePage() {
  // ✅ 修正：預設顯示「社會工作時期」
  const [activeTab, setActiveTab] = useState('social_work');
  const currentProjects = resumeData.projects[activeTab] || [];

  return (
    <Layout title="蘇冠彰 Resume" description="蘇冠彰的個人履歷與作品集">
      <style>{cssStyles}</style>
      <div className="rc">

        {/* Header */}
        <header className="rc-header">
          <div className="rc-header-inner">
            <div className="rc-badge">Portfolio & Resume</div>
            <h1 className="rc-name">{resumeData.profile.name}</h1>
            {resumeData.profile.edu.map((e, i) => <div key={i} className="rc-edu">{e}</div>)}
            <div className="rc-deco-line" />
          </div>
        </header>

        {/* About */}
        <section className="rc-section" style={{paddingTop:'4rem'}}>
          <div className="rc-section-head">
            <h2 className="rc-section-title">關於我</h2>
          </div>
          <div className="rc-about-box">
            <p style={{margin:0}}>{resumeData.about.intro}</p>
          </div>
          <div style={{marginTop:'2rem'}}>
            <h3 style={{textAlign:'center',color:'var(--res-primary)',marginBottom:'1.5rem',fontWeight:800}}>✨ 研究興趣與關注議題</h3>
            <div className="rc-research-grid">
              {resumeData.about.researchCategories.map((cat, i) => (
                <div key={i} className="rc-research-card">
                  <div className="rc-research-title">{cat.title}</div>
                  <ul style={{paddingLeft:'1.1rem',margin:0}}>
                    {cat.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="rc-divider" />

        {/* Projects */}
        <section className="rc-section">
          <div className="rc-section-head">
            <h2 className="rc-section-title">專案經歷</h2>
          </div>

          <div className="rc-tabs">
            <button
              className={`rc-tab ${activeTab === 'social_work' ? 'active' : ''}`}
              onClick={() => setActiveTab('social_work')}
            >
              🌱 社會工作時期（2026.07～Now）
            </button>
            <button
              className={`rc-tab ${activeTab === 'innovation' ? 'active' : ''}`}
              onClick={() => setActiveTab('innovation')}
            >
              💡 社會與教育創新時期（～2026年6月）
            </button>
          </div>

          <div className="rc-timeline">
            {currentProjects.length > 0 ? (
              currentProjects.map(p => <ProjectCard key={p.id} data={p} />)
            ) : (
              <div className="rc-empty">🌱 還沒開始，近請期待新生活 ✨</div>
            )}
          </div>
        </section>

        <div className="rc-divider" />

        {/* Work */}
        <section className="rc-section">
          <div className="rc-section-head">
            <h2 className="rc-section-title">工作經歷</h2>
          </div>
          <div className="rc-timeline">
            {resumeData.work.map((w, i) => <WorkCard key={i} data={w} />)}
          </div>
        </section>

        <div className="rc-divider" />

        {/* Portfolio */}
        <section className="rc-section">
          <div className="rc-section-head">
            <h2 className="rc-section-title">作品集與 Podcast</h2>
          </div>
          <PortfolioSection items={resumeData.portfolio} />
        </section>

        <div className="rc-divider" />

        {/* Awards & Volunteer */}
        <section className="rc-section">
          <div className="rc-section-head">
            <h2 className="rc-section-title">競賽與活動志工</h2>
          </div>
          <div className="rc-split">
            <div className="rc-split-card">
              <div className="rc-split-card-title">🏆 競賽參與</div>
              <ul style={{paddingLeft:'1.1rem',margin:0}}>
                {resumeData.awards.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div className="rc-split-card">
              <div className="rc-split-card-title">🤝 活動志工參與</div>
              <ul style={{paddingLeft:'1.1rem',margin:0}}>
                {resumeData.volunteer.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}