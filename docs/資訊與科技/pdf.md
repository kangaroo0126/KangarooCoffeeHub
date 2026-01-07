---
title: 從手動到自動：數萬份電子簽名處理的最佳實務
authors: 袋鼠
description: 本文示範如何在本機端使用 Python（PyPDF2、reportlab、Pillow）批次為大量 PDF 自動加上電子簽名，包含簽名欄位偵測、座標調整與實務注意事項，適合需保護諮商紀錄隱私的單位。
tags: [PDF,Python,PDF自動簽名,諮商,本機處理,批次處理]
date: 2026-01-07
---
# 從手動到自動：數份電子簽名處理的最佳實務

![](/img/blog/pdf01.png)

## 問題意識與情境

那天，在工作的諮商所遇到了一個實際又棘手的狀況。由於過往部分心理師的諮商紀錄檔案中，未附上正式的電子簽名，因此我們必須協助補齊心理師的簽名檔案，才能符合衛生局的要求。

一開始，我們採取最直觀的方式：逐一打開 PDF 檔案，手動加入心理師的簽名。然而，當我們發現需要處理的紀錄橫跨 2020 年到 2025 年，累積上萬筆檔案 時，這個方法幾乎是不可能完成的任務，光是打開檔案就足以讓人崩潰。原本我們使用的是 **Adobe PDF** 來加入簽名檔，但實際操作後發現速度非常慢，效率極低。於是我開始思考：

> ***是否有辦法一次性替某一位心理師的所有紀錄加上電子簽名？***
> 

但問題並沒有這麼單純。不同的紀錄，**簽名欄位的位置並不固定**：

有些在第一頁，有些在第二頁，甚至格式略有差異，無法單純用「固定頁數」處理。也因此，我開始研究是否能有一種方式，讓系統**自動判斷簽名欄位的位置，並正確地將電子簽名加上去**。在這個過程中，我開始與 **Claude AI** 討論可能的解法，也逐漸整理出一條可行的處理流程，於是便有了這篇紀錄文。

這套工具最大的好處在於：

- **可在本機端一次處理大量 PDF 檔案**，不需逐一手動開啟
- 系統能自動辨識簽名位置（通常會有簽名欄位），並正確放置電子簽名
- 全程在自己的電腦上完成，符合諮商專業對於隱私與資料保護的要求

對於需要大量補齊電子簽名、又無法將檔案上傳至雲端或第三方服務的情境來說，這是一個非常實用的解法。

## 操作流程
> 重要申明：以下皆為本人自己製作檔案與模擬測試，皆無使用任何諮商紀錄！
> 

### 一、安裝 Python
1.前往 Python 官網：https://www.python.org/downloads/
2.點選Or get the standalone installer for Python XXX（最新版本），即開始下載Python
3.下載完後，開始執行安裝檔。在安裝第一個畫面的最下方，**必須勾選**：
    
    
    ☑ Add python.exe to PATH
    
4.驗證安裝是否成功：Window系統開啟「命令提示字元」或「終端機」（可直接在電腦搜尋），執行：`python --version`

   應該顯示類似：`Python ｘｘｘ`（版本號碼）或是他是空白的，都代表安裝成功。
   
### 二、安裝 Python 套件

1.在命令提示字元或終端機輸入：
    
    python -m pip install --upgrade pip
    python -m pip install PyPDF2 reportlab pillow
    
2.驗證安裝，並確認清單包含：PyPDF2、reportlab、pillow
    
    python -m pip list


![](/img/blog/pdf02.png)

### 三、準備工作環境

1. 建立資料夾結構：（可以改成自己習慣或編排的模式）
    
    ```python
    📁 實作程式/
       📄 pdf_signature.py         ← 程式檔案
       🖼️ 簽名01.png                ← 簽名圖片（PNG格式，建議背景透明）
       📁 原始PDF資料夾/            ← 放入要處理的PDF
          📄 記錄001.pdf
          📄 記錄002.pdf
          📄 記錄003.pdf
          ...
       📁 已簽名PDF
    ```
    
2. 打開程式編輯器（推薦使用：[VS Code](https://code.visualstudio.com/)、[notepad++](https://notepad-plus-plus.org/downloads/)），並將以下程式碼貼上（詳細要修改程式碼內容可以參見底下附錄一）
    
    A. 程式結構
        
        ```
        程式結構：
        ├── find_signature_page()     → 找到「請簽名：」在哪一頁
        ├── add_signature_to_pdf()    → 在PDF上加簽名
        ├── batch_process_pdfs()      → 批次處理多個PDF
        └── 主程式 (if __name__ == "__main__")  → 程式入口，設定參數
        ```
        
    B. 完整程式碼
        
        ```python
        # -*- coding: utf-8 -*-
        # PDF 自動簽名程式
        # 請先安裝需要的套件: pip install PyPDF2 reportlab pillow
        
        import os
        from PyPDF2 import PdfReader, PdfWriter
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        from PIL import Image
        import io
        
        def find_signature_page(pdf_path, keyword="請簽名："):
            """尋找包含簽名關鍵字的頁面"""
            try:
                reader = PdfReader(pdf_path)
                for page_num, page in enumerate(reader.pages):
                    text = page.extract_text()
                    if keyword in text:
                        return page_num
                return None
            except Exception as e:
                print(f"讀取 {pdf_path} 時發生錯誤: {e}")
                return None
        
        def add_signature_to_pdf(input_pdf, output_pdf, signature_image, x=100, y=100, width=150, height=50):
            """在PDF指定位置加入簽名圖片"""
            try:
                reader = PdfReader(input_pdf)
                writer = PdfWriter()
                
                signature_page_num = find_signature_page(input_pdf)
                
                if signature_page_num is None:
                    print(f"警告: {input_pdf} 找不到「請簽名：」字樣，跳過此檔案")
                    return False
                
                packet = io.BytesIO()
                can = canvas.Canvas(packet, pagesize=letter)
                can.drawImage(signature_image, x, y, width=width, height=height, mask='auto', preserveAspectRatio=True)
                can.save()
                
                packet.seek(0)
                signature_pdf = PdfReader(packet)
                
                for page_num, page in enumerate(reader.pages):
                    if page_num == signature_page_num:
                        page.merge_page(signature_pdf.pages[0])
                    writer.add_page(page)
                
                with open(output_pdf, 'wb') as output_file:
                    writer.write(output_file)
                
                print(f"完成: {input_pdf} -> 簽名加在第 {signature_page_num + 1} 頁")
                return True
                
            except Exception as e:
                print(f"處理 {input_pdf} 時發生錯誤: {e}")
                return False
        
        def batch_process_pdfs(input_folder, output_folder, signature_image):
            """批次處理資料夾內所有PDF"""
            
            if not os.path.exists(output_folder):
                os.makedirs(output_folder)
            
            pdf_files = [f for f in os.listdir(input_folder) if f.endswith('.pdf')]
            
            if not pdf_files:
                print("錯誤: 找不到任何PDF檔案")
                return
            
            print(f"找到 {len(pdf_files)} 個PDF檔案")
            print("開始處理...")
            print("")
            
            success_count = 0
            fail_count = 0
            
            for pdf_file in pdf_files:
                input_path = os.path.join(input_folder, pdf_file)
                output_path = os.path.join(output_folder, f"已簽名_{pdf_file}")
                
                if add_signature_to_pdf(input_path, output_path, signature_image):
                    success_count += 1
                else:
                    fail_count += 1
            
            print("")
            print("處理完成!")
            print(f"成功: {success_count} 個檔案")
            print(f"失敗: {fail_count} 個檔案")
        
        if __name__ == "__main__":
            # ===== 設定參數（可依需求修改）=====
            INPUT_FOLDER = "原始PDF資料夾"      # 原始PDF所在資料夾
            OUTPUT_FOLDER = "已簽名PDF"         # 輸出資料夾
            SIGNATURE_IMAGE = "簽名.png"        # 簽名圖片檔名
            
            # 簽名位置與大小（可調整）
            SIGNATURE_X = 350      # X座標（左右位置，數字越大越右）
            SIGNATURE_Y = 150      # Y座標（上下位置，數字越大越上）
            SIGNATURE_WIDTH = 120  # 簽名寬度
            SIGNATURE_HEIGHT = 40  # 簽名高度
            
            print("PDF 自動簽名程式")
            print("=" * 50)
            
            # 檢查簽名圖片
            if not os.path.exists(SIGNATURE_IMAGE):
                print(f"錯誤: 找不到簽名圖片 {SIGNATURE_IMAGE}")
                print("請確保簽名圖片與程式在同一個資料夾")
                input("按 Enter 鍵結束...")
                exit()
            
            # 檢查輸入資料夾
            if not os.path.exists(INPUT_FOLDER):
                print(f"錯誤: 找不到資料夾 {INPUT_FOLDER}")
                print("請建立資料夾並放入要處理的PDF檔案")
                input("按 Enter 鍵結束...")
                exit()
            
            # 執行批次處理
            batch_process_pdfs(INPUT_FOLDER, OUTPUT_FOLDER, SIGNATURE_IMAGE)
            
            print("")
            input("按 Enter 鍵結束...")
        ```
        

### 四、執行程式

1.開啟命令提示字元或終端機，並切換到工作資料夾（請依實際建立的位置調整路徑），以下範例為存在桌面中有個「實作程式」的資料夾
:::info
▶️知識+：什麼是cd?

   **cd** 是 **Change Directory** 的縮寫，中文意思是「**切換目錄**」或「**更改資料夾**」。
    舉例：當你打開命令提示字元時，通常會看到：`C:\Users\袋鼠>`

這表示您現在「站在」`C:\Users\袋鼠` 這個資料夾裡。

如果不想要那麼麻煩去找他在哪，可以點選資料夾上排，按右鍵「複製位置」即可找到資料夾在那了。
![](/img/blog/pdf03.png)
:::  
2.執行程式：`python pdf_signature.py`
![](/img/blog/pdf04.png)
3.完成的檔案呈現
![](/img/blog/pdf05.jpg)
    

### 附錄一：舉一反三修改程式－簽名位置與簽名關鍵字設定指南

#### （一）如何修改千名關鍵字

1.在程式的第 10 行：
    
    ```python
    def find_signature_page(pdf_path, keyword="請簽名："):
    ```
    
(1)程式會在PDF中搜尋這個關鍵字
(2)找到關鍵字的那一頁，就是要加簽名的頁面
(3)**無論關鍵字在第1頁、第2頁或任何頁，程式都會自動找到**

2.修改範例：
(1)範例 1：改成「簽章：」
`def find_signature_page(pdf_path, keyword="簽章："):`
(2)範例 2：改成英文
`def find_signature_page(pdf_path, keyword="Signature:"):`
(3)如果有多種可能的關鍵字－修改程式的第 16 行：
    
    ```python
    # 原本：
    if keyword in text:
    
    # 改成（可接受多種關鍵字）：
    if keyword in text or "簽章：" in text or "請蓋章：" in text:
    ```
    


#### （二）如何調整簽名位置與大小

1.在程式的第 101-104 行：

```python
SIGNATURE_X = 350      # X座標（左右位置）
SIGNATURE_Y = 150      # Y座標（上下位置）
SIGNATURE_WIDTH = 120  # 簽名寬度
SIGNATURE_HEIGHT = 40  # 簽名高度
```

2.PDF 座標系統說明－座標原點在「左下角」

```
PDF頁面示意圖：

    Y軸越大越上 ↑
                |
      (0, 800)  |  (600, 800)    ← 頁面上方
                |
                |
      (0, 400)  |  (600, 400)    ← 頁面中間
                |
                |
      (0, 0)    |________→ X軸越大越右
           左下角原點      (600, 0)
```

| 參數 | 說明 | 效果 |
| --- | --- | --- |
| **X 增加** | 數字變大 | 簽名往右移 |
| **X 減少** | 數字變小 | 簽名往左移 |
| **Y 增加** | 數字變大 | 簽名往上移 |
| **Y 減少** | 數字變小 | 簽名往下移 |
| **WIDTH 增加** | 寬度變大 | 簽名變寬 |
| **HEIGHT 增加** | 高度變大 | 簽名變高 |

(1)步驟 1：用預設值測試－先用預設值處理 **1個PDF**，看看簽名在哪裡
(2)步驟 2：判斷要往哪個方向調整
        
| 簽名位置問題 | 調整方法 | 範例 |
| --- | --- | --- |
| 太左邊 | **增加 X** | 350 → 400 |
| 太右邊 | **減少 X** | 350 → 300 |
| 太下面 | **增加 Y** | 150 → 200 |
| 太上面 | **減少 Y** | 150 → 100 |
| 太小 | **增加 WIDTH 和 HEIGHT** | 120 → 150 |
| 太大 | **減少 WIDTH 和 HEIGHT** | 120 → 80 |
        
(3)步驟 3：每次調整 50 左右－不要一次調太多，建議每次調整 **30-50** 的幅度

## 總結

回頭看這個問題，其實它並不只是「怎麼把簽名加上去」那麼單純，而是反映了許多助人工作現場正在面對的現實：**行政符合規範的壓力，往往會在不知不覺中吞噬大量專業人力**。當制度要求被一條一條補齊時，如果只能依靠人工處理，最終消耗的，往往是工作者本就有限的時間與心力。

這次嘗試用程式解決問題，是希望把那些**可以被自動化的工作交給工具處理**，讓人能夠回到真正需要人去承接的地方。

如果你也正面臨大量文件處理、卻又受限於隱私與合規無法使用雲端服務，或許這個做法能成為一個參考起點。技術不一定要很炫，只要能**實際減輕現場負擔**，它就已經完成了它最重要的任務。

