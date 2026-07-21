import React from 'react';
import PortfolioCard from './PortfolioCard';

/**
 * 在這裡新增、修改、刪除作品。
 * 每筆資料對應一張卡片，欄位說明見 PortfolioCard.js 的 Props 說明。
 */
const PROJECTS = [
  {
    title: '統一發票小幫手',
    href: 'https://kangaroo0126.github.io/Two-Part-and-Three-Part-Invoice-Issuance-System/',
    description:
      '協助使用者快速開立台灣二聯式與三聯式發票的網頁工具，提供直覺且低門檻的操作流程。',
    tags: ['發票開立系統', '自動稅額計算', '財務工具'],
    status: 'Public',
    detail: {
      goal: '主要針對一般民眾、自由工作者與小型商家，解決稅額計算、格式辨識與填寫錯誤等問題。',
      features: ['含稅／未稅換算', '營業稅計算', '發票格式區分', '明細整理與預覽'],
    },
  },
    {
    title: '萬用加密工具',
    href: 'https://github.com/kangaroo0126/File-Encryption-Program',
    description:
      '一款純本機運作的圖形化加密工具，用 5 步驟精靈引導，就能為 PDF、Office 文件與圖片檔案加上密碼保護，不上傳雲端、安全又好上手。',
    tags: ['本機加密', '一站式支援', '零學習成本'],
    status: 'Public',
    detail: {
      goal: '打造一個免技術背景也能上手的本機加密工具，讓一般使用者能安心保護個人與工作文件，不必擔心檔案或密碼外流雲端。',
      features: ['支援 PDF / Word / Excel / PowerPoint 一鍵加密', '圖片批量合併並輸出成加密 PDF', '密碼強度檢測 + 高強度密碼產生器', '支援單檔、多檔、整個資料夾批次處理'],
    },
  },
  // 新增作品：複製上方物件，貼在這裡，填入你的資料即可。
  // {
  //   title: '專案名稱',
  //   href: 'https://...',
  //   description: '一句話介紹',
  //   tags: ['標籤1', '標籤2'],
  //   status: 'Public',
  //   detail: {
  //     goal: '目標對象說明',
  //     features: ['功能1', '功能2'],
  //   },
  // },
];

export default function PortfolioGrid() {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '16px',
        }}
      >
        {PROJECTS.map(project => (
          <PortfolioCard key={project.title} {...project} />
        ))}
      </div>
    </>
  );
}