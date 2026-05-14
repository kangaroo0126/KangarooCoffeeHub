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