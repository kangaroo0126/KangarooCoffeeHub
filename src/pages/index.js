import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

export default function About() {
  return (
    <Layout
      title="首頁"
      description="袋鼠的咖啡館 - 一個可以慢下來的空間">
        <div style={{
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        marginBottom: 0
      }}>
        <img 
          src={useBaseUrl('/img/banner/banner01.png')}
          alt="袋鼠的咖啡館"
          style={{
            width: '100%',
            height: '125%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <h2 style={{fontSize: '3rem', marginBottom: '1rem'}}>
          🦘 袋鼠的咖啡館
        </h2>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          有時候會想把生活過得更豐富，事情一件一件往上加，行程、期待、目標越來越多，卻忘了停下來看看，是不是早就該剪頭髮了。東西越堆越滿，心卻越來越亂。
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          好像有一股看不見的節奏，默默把人往同一個方向推。世界彷彿只留下了一條路：要一直往前、一直變好、一直證明自己是有用的。努力被當成衡量一切的標準。成績、產值、效率、能力。只要做得夠多、夠快、夠有技能，彷彿就能換來一點安全感。
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          這樣的期待不只存在於工作或學校，也慢慢滲進生活的每個角落。學習、創作，好像都必須交出成果，要被看見進步，才不會顯得落後。做不到的時候，很容易把責任往自己身上攬，懷疑是不是不夠努力、不夠自律，卻很少有人提醒，這些壓力其實來自一整套被加速、被比較的節奏裡。
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          於是，每隔一段時間，總會忍不住重新問自己：<strong>我是誰？現在站在什麼位置？又在往哪裡去？</strong>
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          在資訊過量、被產值與效率定義價值的環境裡，很容易忘記怎麼當一個人，也很容易對自己不耐煩，覺得應該更快、更穩、更像別人期待的樣子。
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          工時長、低薪、房價與不平等，成了生活的背景音，卻常常只被輕描淡寫成一句：「再撐一下就好。」努力不再只是選擇，而變成一種不能停下來的狀態。好像一旦慢下腳步，就會被世界拋在後面。也正因為這樣，真正能停下來，看清楚自己正在承受什麼，本身就成了一件需要練習的事。
        </p>

        
        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
  我很喜歡 Carl Rogers 在人本主義心理學取向裡的一個核心概念：
</p>

<blockquote style={{
  borderLeft: '4px solid var(--ifm-color-primary)',
  paddingLeft: '1.5rem',
  margin: '1.5rem 0',
  fontStyle: 'italic',
  color: 'var(--ifm-color-emphasis-800)',
  background: 'var(--ifm-blockquote-background-color)',
  padding: '1rem 1.5rem',
  borderRadius: '4px'
}}>
  <p style={{margin: 0, fontSize: '1.1rem'}}>
    "只有在被尊重、被接納的狀態裡，人才有機會真實地靠近自己。"
  </p>
  <footer style={{
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: 'var(--ifm-color-emphasis-600)'
  }}>
    — 卡爾·羅傑斯（Carl Rogers）
  </footer>
</blockquote>


        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
        當能和自己好好待在一起，才能慢慢學會理解、接納，甚至喜歡現在的樣子。
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          <strong>減法很難，但必要。</strong>
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          減掉過多的期待、比較，還有急著成為誰的焦慮，生活才有空間重新呼吸。
        </p>

        <p style={{lineHeight: '1.5', marginBottom: '2rem'}}>
          這個地方，我期待就是那樣的空白。
        </p>

        <h2 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>
          🚨 你會在這裡看到
        </h2>

{/* 三個橫排卡片 - 咖啡館暖色調 */}
{/* 四宮格卡片 - 上2下2 */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',  // 改成 2 欄
  gap: '1.5rem',
  marginBottom: '2rem'
}}>
  {/* 卡片 1 */}
  <Link to="/docs/intro" style={{ textDecoration: 'none' }}>
    <div 
      className="custom-card"
      style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #ecdcc8 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(139, 69, 19, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        border: '2px solid #d4af37'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 69, 19, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.1)';
      }}>
      <h3 style={{ 
        fontSize: '1.3rem', 
        marginBottom: '0.5rem',
        color: '#5d4e37'
      }}>
        📚 專題文章
      </h3>
      <p style={{ 
        color: '#6b5d4f',
        lineHeight: '1.6',
        fontSize: '0.95rem',
        margin: 0
      }}>
        教育、學習、心理與社會議題的整理
      </p>
    </div>
  </Link>

  {/* 卡片 2 */}
  <Link to="/blog" style={{ textDecoration: 'none' }}>
    <div 
      className="custom-card"
      style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #ecdcc8 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(139, 69, 19, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        border: '2px solid #d4af37'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 69, 19, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.1)';
      }}>
      <h3 style={{ 
        fontSize: '1.3rem', 
        marginBottom: '0.5rem',
        color: '#5d4e37'
      }}>
        ✍️ 日常思考
      </h3>
      <p style={{ 
        color: '#6b5d4f',
        lineHeight: '1.6',
        fontSize: '0.95rem',
        margin: 0
      }}>
        短篇筆記、雜感與生活的碎片
      </p>
    </div>
  </Link>

  {/* 卡片 3 */}
  <Link to="/eduadvocacy/intro" style={{ textDecoration: 'none' }}>
    <div 
      className="custom-card"
      style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #ecdcc8 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(139, 69, 19, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        border: '2px solid #d4af37'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 69, 19, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.1)';
      }}>
      <h3 style={{ 
        fontSize: '1.3rem', 
        marginBottom: '0.5rem',
        color: '#5d4e37'
      }}>
        🌱 教育倡議
      </h3>
      <p style={{ 
        color: '#6b5d4f',
        lineHeight: '1.6',
        fontSize: '0.95rem',
        margin: 0
      }}>
        關於社會環境、文化與價值觀如何影響教育，以及它未曾好好照顧的那些人
      </p>
    </div>
  </Link>

  {/* 卡片 4 */}
  <Link to="/myshelf" style={{ textDecoration: 'none' }}>
    <div 
      className="custom-card"
      style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #ecdcc8 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(139, 69, 19, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        border: '2px solid #d4af37'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 69, 19, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.1)';
      }}>
      <h3 style={{ 
        fontSize: '1.3rem', 
        marginBottom: '0.5rem',
        color: '#5d4e37'
      }}>
        📖 我的書櫃
      </h3>
      <p style={{ 
        color: '#6b5d4f',
        lineHeight: '1.6',
        fontSize: '0.95rem',
        margin: 0
      }}>
        推薦值得回味的書、電影、音樂
      </p>
    </div>
  </Link>
</div>

        <p style={{lineHeight: '1.5', marginTop: '1.5rem'}}>
          沒有演算法，也不追求回應。寫下來本身，就是一種整理。
        </p>

        <h2 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>
          ▶️ 想聊聊？
        </h2>

        <p style={{lineHeight: '1.5', marginBottom: '1rem'}}>
          有想法、回饋、或只是想說聲嗨，寫信來吧。帶杯茶、把故事放上來，我會回信的。
        </p>

        <p style={{lineHeight: '1.8', fontSize: '1.1rem'}}>
          📮 <a href="mailto:lovekangaroo0126@gmail.com" style={{color: 'var(--ifm-color-primary)', textDecoration: 'none'}}>
            lovekangaroo0126@gmail.com
          </a>
        </p>

        <p style={{
          textAlign: 'center',
          color: 'var(--ifm-color-emphasis-600)',
          fontStyle: 'italic',
          marginTop: '4rem'
        }}>
          謝謝你願意來這裡坐坐 ☕
        </p>
      </main>
    </Layout>
  );
}