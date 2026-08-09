import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

// 佳句跑馬燈用的句子，你可以自己修改/新增/刪除
const quotes = [
  '人生最大的遺憾，是一個人無法同時擁有青春和對青春的感受。',
  '「加法」是吸納與涵養， 是豐富生活的方式， 而「減法」是沉澱與思考， 是生命清徹的方法。',
  '時間帶不走的，是那些深刻的記憶，它們成為我們生命的一部分。',
];

export default function About() {
  const allQuotes = [...quotes, ...quotes]; // 重複一份做無縫循環

  return (
    <Layout
      title="首頁"
      description="袋鼠的咖啡館 - 一個可以慢下來的空間">
      <div style={{
        width: '100%',  
        overflow: 'hidden',
        marginBottom: 0
      }}>
        <img 
          src={useBaseUrl('/img/banner/banner01.png')}
          alt="袋鼠的咖啡館"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>

      {/* 佳句跑馬燈 開始 */}
      <style>{`
        @keyframes quoteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .quote-marquee-track {
          display: flex;
          width: max-content;
          animation: quoteScroll 20s linear infinite;
        }
        .quote-marquee-track:hover {
          animation-play-state: paused;
        }

        /* 亮色模式：白底黑字 */
        .quote-marquee-bg {
          background: #FFFFFF;
        }
        .quote-marquee-text {
          color: #000000;
        }

        /* 深色模式：黑底白字 */
        [data-theme='dark'] .quote-marquee-bg {
          background: #000000;
        }
        [data-theme='dark'] .quote-marquee-text {
          color: #FFFFFF;
        }
      `}</style>
      <div className="quote-marquee-bg" style={{
        width: '100%',
        overflow: 'hidden',
        padding: '12px 0',
        boxSizing: 'border-box'
      }}>
        <div className="quote-marquee-track">
          {allQuotes.map((quote, index) => (
            <span key={index} className="quote-marquee-text" style={{
              display: 'inline-block',
              padding: '0 3rem',
              fontSize: '1.1rem',
              whiteSpace: 'nowrap'
            }}>
              {quote}
            </span>
          ))}
        </div>
      </div>
      {/* 佳句跑馬燈 結束 */}
      
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <h2 style={{fontSize: '2.8rem', marginBottom: '1.5rem', lineHeight: '1.3', color: 'var(--ifm-heading-color)', fontWeight: 700}}>
          🦘 袋鼠的咖啡館
        </h2>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '1rem', color: 'var(--ifm-font-color-base)'}}>
          頁的文字總是打了又刪、刪了又打。寫太長，好像變成一篇文章；寫太短，又覺得好像什麼都沒說。
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '1.5rem', color: 'var(--ifm-font-color-base)'}}>
          後來想想，這大概就是所謂的風格吧。（好像不一定要完美是吧！）
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '1rem', color: 'var(--ifm-font-color-base)'}}>
          來到這裡，你會看到我一路研究、觀察、經驗，以及生活裡那些零零碎碎的思考。
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '1rem', color: 'var(--ifm-font-color-base)'}}>
          有些是工作中的發現，有些來自閱讀，有些只是某一天突然冒出的提問。
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '2rem', color: 'var(--ifm-font-color-base)'}}>
          有時候沒有答案，只是想把當下的想法留下來，過一段時間再回頭看看，或許又會有不同的理解。
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '1rem', color: 'var(--ifm-font-color-base)'}}>
          回想當初建立這個 Blog，其實沒有什麼偉大的目標。只是希望能有一個地方，把那些散落在Notion、腦袋裡的想法，好好整理成文字，也替自己留下每一個思考過的痕跡。
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '2rem', color: 'var(--ifm-font-color-base)'}}>
          如果這些文字，剛好也能陪伴正在閱讀的你思考一些事情，那就很好。
        </p>

        <p style={{fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '1.5rem', color: 'var(--ifm-font-color-base)'}}>
          最後，想用兩段我很喜歡的話，作為這個地方的介紹。
        </p>

        <blockquote style={{
          borderLeft: '4px solid var(--ifm-color-primary)',
          paddingLeft: '1.5rem',
          margin: '1.5rem 0 2rem 0',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-800)',
          background: 'var(--ifm-blockquote-background-color)',
          padding: '1rem 1.5rem',
          borderRadius: '4px'
        }}>
          <p style={{margin: 0, fontSize: '1.25rem', lineHeight: '1.7'}}>
            「從 Human Doing 到 Human Being，是成為一個『人』的過程，是和自己真實在一起，成為自己，展現自己生命的過程。」
          </p>
          <footer style={{
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--ifm-color-emphasis-600)'
          }}>
            — 吳麗娟（2003）。一個諮商員的專業成長：一個「人」的成長－從Human"doing"到Human"being"。中華輔導學報，(14)，1-30。
          </footer>
        </blockquote>

        <blockquote style={{
          borderLeft: '4px solid var(--ifm-color-primary)',
          paddingLeft: '1.5rem',
          margin: '1.5rem 0 2rem 0',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-800)',
          background: 'var(--ifm-blockquote-background-color)',
          padding: '1rem 1.5rem',
          borderRadius: '4px'
        }}>
          <p style={{margin: 0, fontSize: '1.25rem', lineHeight: '1.7', fontWeight: 700}}>
            「奇妙的悖論是，當我完全接受自己目前的樣子時，我才能真正改變。」
          </p>
          <footer style={{
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--ifm-color-emphasis-600)'
          }}>
            — Carl Rogers
          </footer>
        </blockquote>


        <h2 style={{fontSize: '2.3rem', marginBottom: '2rem', color: 'var(--ifm-heading-color)', fontWeight: 700}}>
          🎵 推薦給你
        </h2>

        <p style={{fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1rem', color: 'var(--ifm-font-color-base)'}}>
          最後，想要推薦 <strong>2025 年全國高中生大合唱《慢行人》</strong>
        </p>

        <blockquote style={{
          borderLeft: '4px solid var(--ifm-color-primary)',
          paddingLeft: '1.5rem',
          marginLeft: 0,
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-800)',
          lineHeight: '1.8'
        }}>
          「慢慢走吧 慢慢唱啊；慢慢看吧 慢慢想啊；喔 慢行的我們 踩出堅定的步伐；喔 慢行的我們 唱出青春的激昂；路口高唱 踢著石子晃；這條路 不急著走完 也剛好啊 活在當下吧；未知的冒險路上 我獨自漫步一場；靜靜融進草地 享受而不慌不忙」
          <footer style={{marginTop: '1rem', fontStyle: 'normal'}}>
            — 慢行人
          </footer>
        </blockquote>

        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          maxWidth: '100%',
          marginTop: '2rem',
          marginBottom: '4rem',
          borderRadius: '12px'
        }}>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            src="https://www.youtube.com/embed/hKkeN0fKtC0"
            title="慢行人 - 2025年全國高中生大合唱"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <h2 style={{fontSize: '2.3rem', marginBottom: '2rem', color: 'var(--ifm-heading-color)', fontWeight: 700}}>
          🚨 你會在這看到
        </h2>

{/* 卡片區 - 2x2 格式 */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.5rem',
  marginBottom: '2rem'
}}>
  {/* 卡片 1 - 專題文章 */}
  <Link to="/docs/intro" style={{ textDecoration: 'none' }}>
    <div className="custom-card kangaroo-card" style={{
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      <h3>📚 專題文章</h3>
      <p>教育、學習、心理與社會議題的整理</p>
    </div>
  </Link>

  {/* 卡片 2 - 日常思考 */}
  <Link to="/blog" style={{ textDecoration: 'none' }}>
    <div className="custom-card kangaroo-card" style={{
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      <h3>✍️ 日常思考</h3>
      <p>短篇筆記、雜感與生活的碎片</p>
    </div>
  </Link>

  {/* 卡片 3 - 慢行生活 */}
  <Link to="/slowlife/intro" style={{ textDecoration: 'none' }}>
    <div className="custom-card kangaroo-card" style={{
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      <h3>🌿 慢行生活</h3>
      <p>關於樂團、咖啡、獨立書店與奇奇怪怪的點子</p>
    </div>
  </Link>

  {/* 卡片 4 - 關於我 */}
  <Link to="/about" style={{ textDecoration: 'none' }}>
    <div className="custom-card kangaroo-card" style={{
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      <h3>🦘 關於我</h3>
      <p>關於我自己與自我的價值與核心</p>
    </div>
  </Link>

  {/* 卡片 5 - 我的書櫃 */}
  <Link to="/myshelf" style={{ textDecoration: 'none' }}>
    <div className="custom-card kangaroo-card" style={{
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      <h3>📕 我的書櫃</h3>
      <p>關於喜愛的電影/影集、歌曲與書籍</p>
    </div>
  </Link>
</div>

      </main>
    </Layout>
  );
}