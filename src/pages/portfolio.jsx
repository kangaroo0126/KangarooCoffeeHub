import React, { useState } from 'react';
import Layout from '@theme/Layout';

// --- CSS 樣式定義 (支援 Dark Mode) ---
const cssStyles = `
  /* 定義變數：預設為淺色模式 (Light Mode) */
  :root {
    --res-primary: #81C784;
    --res-primary-bg: #E8F5E9;
    --res-accent: #FFCC80;
    --res-accent-bg: #FFF3E0;
    --res-text-main: #37474F;
    --res-text-sub: #78909C;
    --res-bg: #FDFCF5;
    --res-card-bg: #FFFFFF;
    --res-border: #E8F5E9;
    --res-shadow: rgba(129, 199, 132, 0.2);
    --res-line: #81C784;
    --res-tag-text: #1B5E20;
  }

  [data-theme='dark'] {
    --res-primary: #66BB6A;
    --res-primary-bg: rgba(129, 199, 132, 0.15);
    --res-accent: #FFB74D;
    --res-accent-bg: rgba(255, 183, 77, 0.15);
    --res-text-main: var(--ifm-font-color-base);
    --res-text-sub: var(--ifm-color-content-secondary);
    --res-bg: transparent;
    --res-card-bg: var(--ifm-card-background-color);
    --res-border: var(--ifm-color-emphasis-200);
    --res-shadow: rgba(0, 0, 0, 0.5);
    --res-line: #4CAF50;
    --res-tag-text: #A5D6A7;
  }

  .resume-container {
    background-color: var(--res-bg);
    color: var(--res-text-main);
    font-family: "Nunito", "Microsoft JhengHei", sans-serif;
    padding-bottom: 4rem;
    transition: background-color 0.3s, color 0.3s;
  }

  .resume-header {
    text-align: center;
    padding: 4rem 1rem 2rem;
  }
  .resume-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: var(--res-text-main);
  }
  .resume-subtitle {
    font-size: 1.1rem;
    color: var(--res-text-sub);
    margin-bottom: 0.5rem;
  }

  .resume-section {
    max-width: 1000px;
    margin: 0 auto 4rem;
    padding: 0 1.5rem;
  }

  .section-title-wrapper {
    text-align: center;
    margin-bottom: 2rem;
  }
  .section-title {
    font-size: 1.8rem;
    border-bottom: 3px dashed var(--res-primary);
    display: inline-block;
    padding-bottom: 0.5rem;
    color: var(--res-text-main);
  }

  /* 時間軸佈局 */
  .timeline-row {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    position: relative;
    flex-wrap: wrap;
  }
  .timeline-year {
    flex: 0 0 80px;
    text-align: right;
    padding-top: 1.5rem;
    font-weight: 800;
    color: var(--res-primary);
    font-size: 1.5rem;
    font-family: monospace, sans-serif;
  }
  .timeline-line-container {
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--res-line);
  }
  .timeline-dot {
    position: absolute;
    left: -6px;
    top: 1.8rem;
    width: 14px;
    height: 14px;
    background-color: var(--res-accent);
    border-radius: 50%;
    border: 2px solid var(--res-card-bg);
    box-shadow: 0 0 0 2px var(--res-primary);
  }
  .timeline-content {
    flex: 1;
    min-width: 300px;
    padding-left: 1rem;
  }

  /* 卡片樣式 */
  .resume-card {
    background-color: var(--res-card-bg);
    border: 2px solid var(--res-border);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 4px 4px 0px var(--res-shadow);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .resume-card-title {
    margin: 0 0 0.3rem;
    font-size: 1.4rem;
    color: var(--res-text-main);
    line-height: 1.4;
  }
  .time-in-card {
    color: var(--res-text-sub);
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    font-weight: bold;
  }

  /* 標籤 Tag */
  .resume-tag {
    display: inline-block;
    background-color: var(--res-primary-bg);
    color: var(--res-tag-text);
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.85rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    font-weight: bold;
  }

  /* 專案連結按鈕樣式 */
  .project-links-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .project-link-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    border: 1.5px solid transparent;
    transition: background-color 0.18s, color 0.18s, border-color 0.18s, transform 0.15s;
    cursor: pointer;
    white-space: nowrap;
  }

  .project-link-pill.type-link {
    background-color: var(--res-primary-bg);
    color: var(--res-tag-text);
    border-color: var(--res-primary);
  }
  .project-link-pill.type-link:hover {
    background-color: var(--res-primary);
    color: #fff;
    border-color: var(--res-primary);
    transform: translateY(-1px);
    text-decoration: none;
  }

  .project-link-pill.type-portfolio {
    background-color: #E3F2FD;
    color: #0D47A1;
    border-color: #90CAF9;
  }
  [data-theme='dark'] .project-link-pill.type-portfolio {
    background-color: rgba(144,202,249,0.15);
    color: #90CAF9;
    border-color: #90CAF9;
  }
  .project-link-pill.type-portfolio:hover {
    background-color: #1565C0;
    color: #fff;
    border-color: #1565C0;
    transform: translateY(-1px);
    text-decoration: none;
  }

  .project-link-pill.type-pdf {
    background-color: #FBE9E7;
    color: #BF360C;
    border-color: #FFAB91;
  }
  [data-theme='dark'] .project-link-pill.type-pdf {
    background-color: rgba(255,171,145,0.15);
    color: #FFAB91;
    border-color: #FFAB91;
  }
  .project-link-pill.type-pdf:hover {
    background-color: #BF360C;
    color: #fff;
    border-color: #BF360C;
    transform: translateY(-1px);
    text-decoration: none;
  }

  .title-link {
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid var(--res-primary);
    transition: opacity 0.2s;
  }
  .title-link:hover {
    opacity: 0.75;
    text-decoration: none;
    color: inherit;
  }

  .read-more-btn {
    background: none;
    border: 1px solid var(--res-primary);
    color: var(--res-primary);
    padding: 0.4rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;
  }
  .read-more-btn:hover {
    background-color: var(--res-primary-bg);
  }

  /* Tab 樣式 */
  .project-tabs {
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--res-border);
  }

  .tab-item {
    flex: 1;
    text-align: center;
    padding: 1rem 0.5rem;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: var(--res-text-sub);
    position: relative;
    transition: color 0.3s;
  }

  .tab-item:hover {
    color: var(--res-primary);
  }

  .tab-item.active {
    color: var(--res-primary);
  }

  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--res-primary);
  }

  /* 關於我區塊 */
  .about-block {
    background-color: var(--res-accent-bg);
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 1.5rem;
    border: 1px solid var(--res-accent);
    line-height: 1.8;
    white-space: pre-line;
  }
  .research-container {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .research-col {
    flex: 1;
    background-color: var(--res-card-bg);
    padding: 1.5rem;
    border-radius: 16px;
    border: 2px dashed var(--res-border);
    min-width: 280px;
  }
  .research-title {
    color: var(--res-text-main);
    border-bottom: 2px solid var(--res-accent);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.1rem;
  }

  /* Grid 佈局 */
  .grid-two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  /* 作品集預覽區（工作卡片內） */
  .work-portfolio-row {
    display: flex;
    gap: 1rem;
    margin-top: 1.2rem;
    flex-wrap: wrap;
  }
  .work-portfolio-item {
    flex: 1;
    min-width: 140px;
    max-width: 220px;
    border-radius: 10px;
    overflow: hidden;
    border: 1.5px solid var(--res-border);
    text-decoration: none;
    color: inherit;
    transition: transform 0.18s, box-shadow 0.18s;
    display: flex;
    flex-direction: column;
    background-color: var(--res-card-bg);
  }
  .work-portfolio-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px var(--res-shadow);
    text-decoration: none;
    color: inherit;
  }
  .work-portfolio-thumb {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    background-color: var(--res-primary-bg);
  }
  .work-portfolio-label {
    padding: 0.5rem 0.7rem;
    font-size: 0.78rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--res-text-sub);
    border-top: 1px solid var(--res-border);
  }

  /* ========== 作品集表格樣式 ========== */
  .portfolio-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  .portfolio-table thead tr {
    background-color: var(--res-primary-bg);
  }

  .portfolio-table thead th {
    padding: 1rem 1.2rem;
    text-align: left;
    font-weight: 800;
    color: var(--res-tag-text);
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-bottom: 2px solid var(--res-primary);
  }

  .portfolio-table thead th:first-child {
    width: 140px;
  }

  .portfolio-table tbody tr {
    border-bottom: 1px solid var(--res-border);
    transition: background-color 0.15s;
  }

  .portfolio-table tbody tr:last-child {
    border-bottom: none;
  }

  .portfolio-table tbody tr:hover {
    background-color: var(--res-primary-bg);
  }

  .portfolio-table td {
    padding: 0.9rem 1.2rem;
    vertical-align: middle;
    color: var(--res-text-main);
  }

  .portfolio-type-badge {
    display: inline-block;
    background-color: var(--res-accent-bg);
    color: var(--res-text-sub);
    border: 1px solid var(--res-accent);
    border-radius: 20px;
    padding: 0.2rem 0.7rem;
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .portfolio-title-link {
    color: var(--res-text-main);
    text-decoration: none;
    font-weight: 600;
    line-height: 1.5;
    display: inline-flex;
    align-items: flex-start;
    gap: 0.4rem;
    transition: color 0.18s;
  }

  .portfolio-title-link:hover {
    color: var(--res-primary);
    text-decoration: none;
  }

  .portfolio-title-link .link-icon {
    flex-shrink: 0;
    margin-top: 3px;
    opacity: 0.5;
    transition: opacity 0.18s;
  }

  .portfolio-title-link:hover .link-icon {
    opacity: 1;
  }

  /* 手機版 RWD */
  @media (max-width: 768px) {
    .timeline-year {
      text-align: left !important;
      flex: 0 0 100% !important;
      padding-top: 0 !important;
      padding-bottom: 0.2rem;
      font-size: 1.2rem;
    }
    .timeline-line-container {
      display: none !important;
    }
    .timeline-content {
      padding-left: 0 !important;
      border-left: 2px solid var(--res-primary);
      padding-left: 1rem !important;
      margin-left: 0.5rem;
    }

    .tab-item {
      font-size: 0.9rem;
      padding: 0.8rem 0.2rem;
    }

    .work-portfolio-item {
      max-width: 100%;
    }

    /* 手機版表格：隱藏類別欄，改為貼文前小標籤 */
    .portfolio-table thead th:first-child,
    .portfolio-table td:first-child {
      display: none;
    }

    .portfolio-table td:last-child {
      padding: 0.8rem 1rem;
    }
  }
`;

// --- 資料內容 ---
const resumeData = {
  profile: {
    name: "蘇冠彰 ｜ 袋鼠",
    edu: [
      "2026年9月~現在 東海大學　社會工作研究所 在學中",
      "2021年9月~2025年6月 中原大學 應用華語系 / 心理學系輔系"
    ]
  },
  about: {
    intro: "在社會創新與永續領域耕耘四年，以教育作為理解與回應社會問題的入口。透過設計思考與社會設計方法，參與高中生生涯教育，陪伴學生探索自我與未來可能性。在實務推動中，我同時關注個人成長與制度層面議題：曾參與紀錄「108課綱觀察報告書」現場記者會，籌辦為期七天的國際民主教育論壇 IDEC 2024，串聯國內外教育實踐者促進對話與交流。同時也以教育不平等為核心議題，製作桌遊《輪不到我上場》，引導大學生理解教育結構與自身參與可能；並在「島島阿學」學習社群策劃學習馬拉松，陪伴學員持續行動。\n\n過往以打造產品與服務實踐理念，我自學數位科技、AI 應用、社會設計、產品發想、企劃與行銷，使理念能以更具體、可參與的方式落地。\n\n然而，隨著實務專案經驗的累積，我逐漸意識到：僅以商業邏輯回應教育問題，往往難以真正撼動其背後的結構性限制。因此，我選擇以社會工作作為回應的實踐路徑，專注個案服務，理解人所處的情境與權力位置。我重視傾聽每一個生命的聲音，放下身段與當事人同行，以柔性介入建立個體與制度的連結。對我而言，理解與陪伴本身就是力量，能讓社會改變不再停留於表面，而真正觸及每一個人的需求。",
    researchCategories: [
      {
        title: "心理與社工領域",
        items: [
          "經濟弱勢與貧窮",
          "兒少發展與心理健康",
          "音樂治療應用",
          "結構性不平等與社會工作介入",
          "探索音樂祭與聽團文化場域如何與社會工作實踐連結",
        ]
      },
      {
        title: "社會與教育議題領域",
        items: [
          "在新自由主義體系下，兒少與青年是否因學歷與能力自由主義被結構性限制，而無法成為被完整看見與尊重的個體？",
          "現行教育制度如何翻轉與重構，兼顧多元學習需求，支持每個人成為完整的人？",
          "社會如何建構能真正包容每個個體的制度與機制？",
          "社會結構"
        ]
      }
    ]
  },
  projects: [
    {
      id: 1,
      year: "2025",
      title: "森光無限 × 為臺灣而教（TFT）《輪不到我上場》桌遊開發與設計",
      fullTime: "2025.03–2026.06（參與青年永續社會設計挑戰賽期間：2025.03–2025.07）",
      intro: "本案由參與青年永續社會設計挑戰賽獲獎後（大專組季軍）與出題組織合作，延續為期半年的產品化與推廣合作。專案旨在以桌遊作為媒介，引導青年理解教育不平等的結構面向，並促進他們思考自身參與教育行動的可能。",
      tags: ["議題研究", "訪談設計", "使用者洞察", "遊戲設計", "工作坊企劃", "原型測試"],
      links: [
        { label: "Instagram", url: "https://www.instagram.com/lumi_paths/", type: "link" }
      ],
      details: {
        role: [
          "議題研究：彙整文獻與現場觀察，定義教育不平等的關鍵問題與影響層面。",
          "利害關係人訪談：規劃並執行教師與大學生訪談，蒐集行為動機與阻礙，並擷取洞察。",
          "洞察收斂：將訪談資料整理成「參與／關注」四象限模型，作為遊戲設計的設計原則。",
          "桌遊設計與測試：參與遊戲機制設計、版本迭代、遊戲規則與教案撰寫，執行多輪內測與修正。",
          "推廣與執行：策劃並主持北、中、南共三場工作坊，蒐集回饋並用於二次開發。"
        ],
        result: "獲得青年永續社會設計挑戰賽大專組季軍，並與 TFT 合作進行產品化推廣。"
      }
    },
    {
      id: 2,
      year: "2024",
      title: "島島阿學｜學習馬拉松專案經理",
      fullTime: "2024年12月~2025年8月",
      intro: "島島阿學是一個以民主社群與自主學習為核心的學習平台，期望透過集體智慧打造沒有天花板的學習環境，支持不同年齡與背景的學習者自由探索與共學。自2021年起我擔任核心團隊成員，負責行銷（IG、電子報）與活動籌劃；自2024年12月起擔任第一屆「學習馬拉松」專案經理，陪伴並培育 16+ 位學習者（高中生至 50+）以個人陪伴與小組支持的方式，建立持續自主學習的習慣與成果呈現機制。",
      tags: ["專案管理", "工作坊設計", "社群內容經營", "質性與量化資料分析", "SPSS", "專案報告撰寫"],
      links: [
        { label: "Website", url: "https://www.daoedu.tw/", type: "link" },
        { label: "Instagram", url: "https://www.instagram.com/daodao_edu/", type: "link" }
      ],
      details: {
        role: [
          "社群內容與傳播：負責每月電子報與 IG 經營，撰寫逾 30+ 篇關於學習與教育觀點之貼文與側記，定期發布教育新聞、活動紀錄與議題思考，提升社群與議題能見度。",
          "活動籌辦與執行：策劃並執行 2022、2023 年度活動（如自學社群小尾牙、2 週年活動），採 Open Space / OST 方法促進參與者自發討論與連結。",
          "學習馬拉松專案管理（專案經理角色）：規劃專案時程、招募流程與學習陪跑機制，擔任引導者與學員之間的溝通橋樑。",
          "籌畫與執行學習成果發表（含發表流程、場地與檔案整理），協助學員將學習過程具體化。",
          "期中回饋報告：負責問卷設計、資料彙整與分析（含質性回饋整理與量化分析，使用 SPSS 進行統計分析），並提出改善建議。",
          "協力整合並產出專案成果報告，作為後續推廣與資源爭取依據。"
        ],
        result: "成功培育 16+ 位跨年齡學習者完成馬拉松計畫，建立例行回饋機制並完成期中分析報告；藉由社群內容與活動，提升島島阿學在目標族群中的能見度與參與率。"
      }
    },
    {
      id: 3,
      year: "2024",
      title: "IDEC 2024 臺灣教育世界博覽會｜活動議程組、市集合作組",
      fullTime: "2024.03 – 2024.08（活動期：2024年7月20~7月28日）",
      intro: "第30屆 International Democratic Education Conference（IDEC）首次在臺灣舉行，為期7天，包含演講、工作坊、Open Space 與市集，匯聚國內外教育創新、實驗教育與民主教育實踐者，促進跨域對話與資源連結。",
      tags: ["議程規劃", "跨文化溝通", "線上報名系統管理", "活動現場場務", "合作夥伴開發"],
      links: [
        { label: "Website", url: "https://www.twdec.org/idec2024", type: "link" }
      ],
      details: {
        role: [
          "官網與線上系統：協助官網內容更新，並協助與國外友人建置與維護 Open Space 登記系統，確保講者與參與者能順利登記與查詢議程。",
          "講者對接與議程協調：與 30+ 名國內外講者對接（議程、場次、時間、簡報需求），負責議程排程與溝通流程，並處理跨語言／跨時區聯繫事宜。",
          "現場講座接待與支援：活動期間負責現場講者接待、場務協調、簡報測試與流程控場，確保場次順利執行。",
          "推廣與學術合作：與自己的大學教授合作舉行推廣講座（主題：地方創生與教育），協助吸引校內外參與者。",
          "市集與組織邀約：撰寫邀請函並主動聯繫 NGO、學生團體、教育創新與實驗教育機構，協調市集攤位與合作形式，促成多方參與。",
          "空間與場務營造：參與現場動線規劃、場佈與舞台搭建，協助空間氛圍營造與觀眾體驗優化。"
        ],
        result: "成功舉辦為期7天之博覽會，完成 30+ 講者之議程安排，並串聯多個教育組織與團體參與市集／活動，促進國內外實踐者交流與後續合作可能性。"
      }
    },
    {
      id: 4,
      year: "2023",
      title: "人生書家（Young飛國際行動計畫提案）",
      fullTime: "2023年2月～2023年12月底",
      intro: "以「人生書家」團隊參與教育部青年發展署 Young 飛國際行動計畫，聚焦高中生生涯教育缺口。專案包含生涯圖書館工作坊（1場）、製作一本「人生之書」教材、架設專案網站（Wix），並透過 IG 進行生涯教育倡議與社群溝通。",
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
          "網站與社群運營：以 Wix 架設專案網站，並負責 IG 社群行銷與倡議內容（議題貼文、活動通知）。"
        ],
        result: "完成一本可實務應用的《人生之書》教材、舉辦生涯圖書館工作坊並產出教案資源，建立專案網站與 IG 平台作為後續推廣與資源分享之窗口。"
      }
    },
    {
      id: 5,
      year: "2022",
      title: "中原大學諮商中心義工團",
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
  ],
  work: [
    {
      title: "中華民國振鐸學會 均優學習論壇－重建教育經費保障　高雄場 ／專案總負責人",
      year: "2026",
      fullTime: "2026.01– 2026.03",
      desc: [
        "擔任學會對外主要窗口，協調與高雄市公民監督公僕聯盟、社區大學促進會、教師職業工會及家長協會之合作，成功舉辦半天教育政策論壇與公聽會",
        "全面規劃與執行論壇，包括主視覺設計、行銷宣傳、流程安排與餐飲訂購，確保活動順利進行"
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
        "負責政府與合作單位計畫案的行政作業與核銷流程，協助文件準備與資料整理，確保計畫款項與報表能順利產出。",
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
        "考試與評量支援：擔任期中、期末監考人員，協助考場秩序管理與試卷收發，並協助試務相關行政工作。",
        "教學科技訓練：教授並示範互動教學工具（Slido），協助授課教授上手並在課堂中導入，提高學生參與度與即時回饋效果。"
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
    { title: "畢業專題－戀曲1937（日治時期華語教材）", link: "https://www.canva.com/design/DAGT0fZVrno/z_pGrcXPoEAyop04iGIXpw/view?utm_content=DAGT0fZVrno&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h478de61d94#1", type: "教材設計" },
    { title: "影片《淨你所能》feat.連江縣退休公教人員協會", link: "https://www.youtube.com/watch?v=NIteSYET1xI", type: "影音製作" },
    { title: "解放自己的內心劇本！《導演症候群》線上讀書會，讓生活變得更有彈性", link: "https://chickensoupfamily.com/2024/07/22/director-syndrome/", type: "文字創作" },
    { title: "【找自己小聚】MBTI與香氛調製：學會識別自己的情感需求，從桌遊到香氛的深度戀愛探索", link: "https://chickensoupfamily.com/2024/12/05/mbtifindme/", type: "文字創作" },
    { title: "「權」知道了嗎？那些易被忽略的學生議題！電子書", link: "https://issuu.com/kangaroo0126/docs/_03f7fefc89a41f", type: "出版品" },
    { title: "桃園市復興鄉羅浮導覽地圖（網頁程式設計）", link: "https://kangaroo0126.github.io/110-2CYCU-programming-project/", type: "網頁程式" },
    { title: "【Ren'py故事遊戲製作】流動的身影跨越邊界之旅", link: "https://11057208.itch.io/fluid-silhouettes-journey-across-borders", type: "Ren'py遊戲" },
    { title: "EP163【你來播】 校外資源學什麼？學習歷程、履歷經歷必學！", link: "https://podcasts.apple.com/us/podcast/ep163-你來播-校外資源學什麼-學習歷程-履歷經歷必學-講座-工作坊-ngo-志工-校園大使/id1609340208?i=1000664161405", type: "受訪分享" }
  ],
  awards: [
    "2025 青年永續社會設計挑戰賽 大專組",
    "第八屆Fun大視野想向未來孵化組 初選",
    "教育部青年署Young飛全球行動計畫",
    "教育部青年發展署青年志工競賽",
    "懷世代公益計畫提案競賽"
  ],
  volunteer: [
    "中原大學諮商中心心衛活動推廣 90+小時 以上",
    "中原大學服務學習中心 服務達 90+小時 以上",
    "sitcon 學生計算機年會2025現場志工",
    "One-Forty 2024年度志工服務時數達 75 小時",
    "直覺職掘2024 夏令營營隊服務 24 小時",
    "g0v summit 2024現場議程組志工"
  ]
};

// --- Icons (SVG) ---
const Icons = {
  Link: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
  ),
  Image: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
  ),
  PDF: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  ),
  ExternalLink: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
  Down: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  ),
  Up: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
  )
};

const LinkPill = ({ link }) => {
  const iconMap = {
    'link': <Icons.ExternalLink />,
    'portfolio': <Icons.Image />,
    'pdf': <Icons.PDF />,
  };
  const icon = iconMap[link.type] || <Icons.Link />;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-link-pill type-${link.type || 'link'}`}
    >
      {icon}
      {link.label}
    </a>
  );
};

// --- 子元件 ---

const ProjectCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="timeline-row">
      <div className="timeline-year">{data.year}</div>
      <div className="timeline-line-container">
        <div className="timeline-dot"></div>
      </div>
      <div className="timeline-content">
        <div className="resume-card">
          <h3 className="resume-card-title">{data.title}</h3>
          <div className="time-in-card">{data.fullTime}</div>
          <p style={{lineHeight: '1.6', whiteSpace: 'pre-line'}}>{data.intro}</p>
          <div style={{marginBottom: '0.5rem'}}>
            {data.tags.map((tag, idx) => (
              <span key={idx} className="resume-tag">#{tag}</span>
            ))}
          </div>
          {data.links && data.links.length > 0 && (
            <div className="project-links-row">
              {data.links.map((link, idx) => (
                <LinkPill key={idx} link={link} />
              ))}
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="read-more-btn">
            {isOpen ? '收起詳細內容' : 'Read more'} {isOpen ? <Icons.Up /> : <Icons.Down />}
          </button>
          {isOpen && (
            <div style={{marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--res-primary)'}}>
              <h4 style={{marginBottom: '0.5rem'}}>我的角色與貢獻</h4>
              <ul style={{paddingLeft: '1.2rem', marginBottom: '1rem'}}>
                {data.details.role.map((item, idx) => (
                  <li key={idx} style={{marginBottom: '0.3rem', lineHeight: '1.5'}}>{item}</li>
                ))}
              </ul>
              {data.details.result && (
                <>
                  <h4 style={{marginBottom: '0.5rem'}}>成果</h4>
                  <p style={{lineHeight: '1.5'}}>{data.details.result}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorkCard = ({ data }) => (
  <div className="timeline-row">
    <div className="timeline-year">{data.year}</div>
    <div className="timeline-line-container">
      <div className="timeline-dot"></div>
    </div>
    <div className="timeline-content">
      <div className="resume-card">
        <h3 className="resume-card-title">
          {data.titleLink ? (
            <a href={data.titleLink} target="_blank" rel="noopener noreferrer" className="title-link">
              {data.title}
            </a>
          ) : data.title}
        </h3>
        <div className="time-in-card">{data.fullTime}</div>
        <ul style={{paddingLeft: '1.2rem', margin: 0}}>
          {data.desc.map((item, idx) => (
            <li key={idx} style={{marginBottom: '0.3rem', lineHeight: '1.5'}}>{item}</li>
          ))}
        </ul>
        {data.portfolioItems && data.portfolioItems.length > 0 && (
          <div className="work-portfolio-row">
            {data.portfolioItems.map((item, idx) => (
              item.type === 'image' ? (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="work-portfolio-item">
                  <img
                    src={item.url}
                    alt={item.label}
                    className="work-portfolio-thumb"
                    onError={(e) => { e.target.style.minHeight='80px'; e.target.alt='無法載入圖片'; }}
                  />
                  <div className="work-portfolio-label">
                    <Icons.Image /> {item.label}
                  </div>
                </a>
              ) : (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="work-portfolio-item">
                  <div className="work-portfolio-thumb" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'var(--res-accent-bg)', minHeight:'80px'}}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--res-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div className="work-portfolio-label">
                    <Icons.PDF /> {item.label}
                  </div>
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// ========== 新版作品集表格元件 ==========
const PortfolioTable = ({ items }) => (
  <table className="portfolio-table">
    <thead>
      <tr>
        <th>類別</th>
        <th>標題</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, idx) => (
        <tr key={idx}>
          <td>
            <span className="portfolio-type-badge">{item.type}</span>
          </td>
          <td>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-title-link"
            >
              {item.title}
              <span className="link-icon">
                <Icons.ExternalLink />
              </span>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// --- 主頁面元件 ---
export default function ResumePage() {
  const [activeProjectTab, setActiveProjectTab] = useState('innovation');

  return (
    <Layout title="蘇冠彰 Resume" description="蘇冠彰的個人履歷與作品集">
      <style>{cssStyles}</style>

      <div className="resume-container">

        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-title">{resumeData.profile.name}</h1>
          {resumeData.profile.edu.map((edu, idx) => (
            <div key={idx} className="resume-subtitle">{edu}</div>
          ))}
        </header>

        {/* 關於我 */}
        <section className="resume-section">
          <div className="section-title-wrapper"><h2 className="section-title">關於我</h2></div>
          <div className="about-block">
            <p>{resumeData.about.intro}</p>
          </div>
          <div style={{marginTop: '2rem'}}>
            <h3 style={{color: 'var(--res-primary)', marginBottom: '1.5rem', textAlign: 'center'}}>✨ 研究興趣與關注議題</h3>
            <div className="research-container">
              {resumeData.about.researchCategories.map((cat, idx) => (
                <div key={idx} className="research-col">
                  <h4 className="research-title">{cat.title}</h4>
                  <ul style={{paddingLeft: '1.2rem'}}>
                    {cat.items.map((item, i) => (
                      <li key={i} style={{marginBottom: '0.8rem', lineHeight: '1.5'}}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 專案經歷 */}
        <section className="resume-section">
          <div className="section-title-wrapper"><h2 className="section-title">專案經歷</h2></div>
          <div className="project-tabs">
            <button
              className={`tab-item ${activeProjectTab === 'innovation' ? 'active' : ''}`}
              onClick={() => setActiveProjectTab('innovation')}
            >
              社會與教育創新時期（～2026年6月）
            </button>
            <button
              className={`tab-item ${activeProjectTab === 'social_work' ? 'active' : ''}`}
              onClick={() => setActiveProjectTab('social_work')}
            >
              社會工作與教育創新倡議時期（2026年7月～Now）
            </button>
          </div>
          <div>
            {activeProjectTab === 'innovation' ? (
              resumeData.projects.map(project => (
                <ProjectCard key={project.id} data={project} />
              ))
            ) : (
              <div style={{textAlign: 'center', padding: '4rem 1rem', color: 'var(--res-text-sub)', fontSize: '1.2rem'}}>
                🌱 還沒開始，近請期待新生活 ✨
              </div>
            )}
          </div>
        </section>

        {/* 工作經歷 */}
        <section className="resume-section">
          <div className="section-title-wrapper"><h2 className="section-title">工作經歷</h2></div>
          <div>
            {resumeData.work.map((job, idx) => (
              <WorkCard key={idx} data={job} />
            ))}
          </div>
        </section>

        {/* 作品集（表格版） */}
        <section className="resume-section">
          <div className="section-title-wrapper"><h2 className="section-title">作品集與 Podcast</h2></div>
          <PortfolioTable items={resumeData.portfolio} />
        </section>

        {/* 競賽與志工 */}
        <section className="resume-section">
          <div className="section-title-wrapper"><h2 className="section-title">競賽與活動志工</h2></div>
          <div className="grid-two">
            <div className="resume-card">
              <h3 style={{color: 'var(--res-primary)', borderBottom: '2px solid var(--res-accent-bg)', paddingBottom: '0.5rem', marginBottom: '1rem'}}>🏆 競賽參與</h3>
              <ul style={{paddingLeft: '1.2rem'}}>
                {resumeData.awards.map((item, idx) => (
                  <li key={idx} style={{marginBottom: '0.5rem'}}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="resume-card">
              <h3 style={{color: 'var(--res-primary)', borderBottom: '2px solid var(--res-accent-bg)', paddingBottom: '0.5rem', marginBottom: '1rem'}}>🤝 活動志工參與</h3>
              <ul style={{paddingLeft: '1.2rem'}}>
                {resumeData.volunteer.map((item, idx) => (
                  <li key={idx} style={{marginBottom: '0.5rem'}}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer style={{textAlign: 'center', color: 'var(--res-text-sub)', padding: '2rem 0', fontSize: '0.9rem'}}>
        </footer>
      </div>
    </Layout>
  );
}