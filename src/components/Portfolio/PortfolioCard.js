import React, { useState } from 'react';

/**
 * PortfolioCard — 袋鼠咖啡館風格（暖棕 · 米白 · 慢活）
 *
 * Props:
 *   title       {string}   - 專案名稱
 *   href        {string}   - 專案連結（外部）
 *   description {string}   - 簡短介紹（顯示在卡片表面）
 *   tags        {string[]} - 關鍵字標籤陣列
 *   status      {string}   - 狀態標籤文字，預設 "Public"
 *   detail      {object}   - 展開區塊的詳細內容，選填
 *     detail.goal     {string}   - 目標對象說明
 *     detail.features {string[]} - 功能列表
 */

// 袋鼠咖啡館色票
const COLORS = {
  cardBg:        '#fdf8f3',   // 溫暖米白底
  border:        '#e6d8c8',   // 淡棕邊框
  borderHover:   '#b89a7a',   // 深棕 hover
  titleLink:     '#6b4c2a',   // 深咖啡標題
  titleHover:    '#4a3218',   // 更深咖啡
  text:          '#7a6652',   // 中棕文字
  tagBg:         '#f2e8d9',   // 淺奶茶標籤底
  tagColor:      '#8a5c30',   // 棕橘標籤字
  tagBorder:     '#e2cdb0',
  statusBorder:  '#d6c4ad',
  statusColor:   '#9e836a',
  detailBg:      '#fef6ec',   // 展開背景
  detailBorder:  '#e6d8c8',
  divider:       '#ede3d6',
  btnColor:      '#9e836a',
  btnHover:      '#6b4c2a',
};

export default function PortfolioCard({
  title,
  href,
  description,
  tags = [],
  status = 'Public',
  detail,
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: COLORS.cardBg,
        border: `1px solid ${hovered ? COLORS.borderHover : COLORS.border}`,
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: hovered
          ? '0 4px 16px rgba(107,76,42,0.10)'
          : '0 1px 4px rgba(107,76,42,0.05)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 標題列 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: COLORS.titleLink,
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            wordBreak: 'break-all',
            letterSpacing: '0.01em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = COLORS.titleHover;
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = COLORS.titleLink;
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          ☕ {title}
        </a>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: COLORS.statusColor,
            border: `1px solid ${COLORS.statusBorder}`,
            borderRadius: '999px',
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            marginLeft: '8px',
          }}
        >
          {status}
        </span>
      </div>

      {/* 簡短介紹 */}
      <p style={{
        color: COLORS.text,
        fontSize: '14px',
        marginBottom: '16px',
        flexGrow: 1,
        lineHeight: 1.75,
      }}>
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                background: COLORS.tagBg,
                color: COLORS.tagColor,
                fontSize: '12px',
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: '999px',
                cursor: 'default',
                border: `1px solid ${COLORS.tagBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 展開詳細介紹 */}
      {detail && (
        <div style={{ borderTop: `1px solid ${COLORS.divider}`, paddingTop: '12px' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              color: COLORS.btnColor,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = COLORS.btnHover)}
            onMouseLeave={e => (e.currentTarget.style.color = COLORS.btnColor)}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.2s',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '10px',
            }}>▶</span>
            {open ? '收起詳細介紹' : '查看詳細介紹與功能'}
          </button>

          {open && (
            <div
              style={{
                marginTop: '10px',
                marginLeft: '-20px',
                marginRight: '-20px',
                marginBottom: '-20px',
                fontSize: '13px',
                color: COLORS.text,
                lineHeight: 1.75,
                background: COLORS.detailBg,
                padding: '12px 20px 20px',
                borderTop: `1px solid ${COLORS.detailBorder}`,
                animation: 'fadeIn 0.2s ease-out',
              }}
            >
              {detail.goal && (
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: COLORS.titleLink }}>🎯 目標對象：</strong>
                  <br />
                  {detail.goal}
                </p>
              )}
              {detail.features && detail.features.length > 0 && (
                <>
                  <p style={{ marginBottom: '4px' }}>
                    <strong style={{ color: COLORS.titleLink }}>⚡ 系統自動完成項目：</strong>
                  </p>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {detail.features.map(f => (
                      <li key={f} style={{ marginBottom: '4px' }}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}