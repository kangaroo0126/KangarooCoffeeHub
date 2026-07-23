---
title: 從零開始：用 Python 打造 PDF / Word / Excel 萬用加密工具（限Win系統）
authors: 袋鼠
description: 上週在諮商所工作時，夥伴發現一個細節：7-Zip 加密的檔案，同一台電腦第一次輸入密碼後，之後再打開竟然不用密碼了。這讓我開始重新思考，我們對個案資料的加密方式是否真的足夠安全。加上依規定，通訊心理諮商紀錄不論紙本或電子檔都必須加密保存，於是我動手做了一套 PDF / Word / Excel 萬用加密工具——從終端機的簡易版，到後來研究出的圖形介面進階版，一次整理給大家。
tags: [加密工具,個資保護,檔案加密,Python,]
date: 2026-07-23
---

# 從零開始：用 Python 打造 PDF / Word / Excel 萬用加密工具（限Win系統）

![](/img/blog/encryption_1.png)

上週在諮商所工作的時候，夥伴提到一件事：使用 7-Zip 加密的檔案，在同一台電腦第一次輸入密碼開啟後，之後再次開啟，好像就不需要重新輸入密碼了。這也讓我們開始重新思考，這樣的加密方式是否真的符合我們對個案資料安全的期待。

剛好副所長也提醒，目前電子諮商紀錄雖然已經陸續加入電子簽名，但依照《高雄市政府衛生局通訊心理諮商業務核准作業審查作業及基準》中「(六) 個人資料保護及資料檔案安全維護措施」第 4 點規定，**諮商紀錄無論是紙本或電子檔，都必須註明以通訊方式執行業務，並依法保存、加密與銷毀**。

於是，我又開始研究各種文件的加密方式，包含 PDF、Word 和 Excel。雖然 Excel 本身就有內建密碼保護功能，但考量實際使用情境，最後還是自己做了一版，讓不同格式的文件都能用一致的流程完成加密，也比較方便同事操作。

以下先分享我第一版製作的簡易版本，操作上比較直覺，也適合一般使用需求。

後來在和 AI 討論的過程中，才發現原來還有 **GUI（圖形化操作介面）** 這種做法，可以不用再透過指令操作，使用起來方便許多。於是我又花了一點時間，把它做成進階版本。

進階版本的程式碼我會放在 GitHub，有需要的朋友可以自行下載使用，也歡迎一起交流、提出改進的建議。

## 第一步驟：安裝所需要的軟體與套件（只需做一次即可）
1. 安裝 Python（跑程式碼專用）
    1. 打開瀏覽器，前往：https://www.python.org/downloads/
    2. 網頁會自動偵測你是 Windows，點擊那顆黃色下載按鈕。下載完成後執行安裝，**安裝視窗最下方有一排小字寫著「Add python.exe to PATH」，請務必打勾，並執行安裝**
    3. 確認裝好了：打開終端機輸入　`python --version`
        1. 按 Enter。如果看到 `Python 3.x.x` 這樣的文字，代表裝好了
        2. 如果出現「不是內部或外部命令」的錯誤 → 代表剛剛沒勾選 PATH，需重新安裝一次
2. 打開終端機，輸入以下指令安裝此加密程式需要用到的套件
    
    ```jsx
    pip install pypdf cryptography pywin32
    ```

![](/img/blog/encryption_2.png)

| 套件 | 說明 |
| --- | --- |
| `pypdf` | 一個用來處理 PDF 檔案的 Python 函式庫，可以用來：<br/>（1）讀取、合併、分割 PDF<br/>（2）加密／解密 PDF（設定或移除密碼）<br/>（3）提取文字、旋轉頁面、加浮水印等 |
| `cryptography` | 一個提供各種加密演算法的函式庫 |
| `pywin32` | 讓 Python 能夠呼叫 Windows 作業系統的原生 API，例如：<br/>（1）操作 Windows 檔案系統、登錄檔（Registry）<br/>（2）控制 Word、Excel 等 Office 應用程式（透過 COM 介面）<br/>（3）建立 Windows 服務、處理事件記錄等<br/>⚠️ 這個套件只能在 **Windows** 系統上使用，在 Mac 或 Linux 上安裝會失敗 |

3. 請將以下程式碼建立Python，並存在你的常用資料夾中（可點選展開以下內容）

<details open>
   <summary>加密Python程式碼檔案</summary>

    ```jsx

   # -*- coding: utf-8 -*-
"""
PDF / Word / Excel 加密工具

這個工具可以幫你的檔案加上「密碼」，之後別人要打開檔案，
就一定要輸入正確密碼才能看到內容。

可以加密的東西：
  ✔ 單一一個檔案（PDF、Word 或 Excel）
  ✔ 一整個資料夾裡面「每一個」PDF / Word / Excel 檔案

不可以的事情：
  ✘ 沒辦法把整個資料夾「打包」變成一個加密檔
    （資料夾本身不會被加密，加密的永遠是「檔案」本身）

使用方式很簡單，只要三個步驟：
  1. 把要加密的「檔案」或「資料夾」，直接用滑鼠拖曳到這個黑色視窗裡，
     再按下 Enter 鍵
  2. 程式會問你要設定什麼密碼，輸入一次、再輸入一次確認
  3. 等程式跑完就完成了！

程式怎麼判斷要用什麼方式加密：
  - 檔名結尾是 .pdf         → 用 PDF 的方式加密
  - 檔名結尾是 .docx 或 .doc → 用 Word 的方式加密
  - 檔名結尾是 .xlsx 或 .xls → 用 Excel 的方式加密
  - 如果拖進來的是「資料夾」，程式會自動一個一個檔案處理，
    不需要你自己選

加密完成後，檔案會存在哪裡：
  - 如果加密的是「單一檔案」
    → 新檔案會出現在原本檔案的旁邊，檔名後面會多加「_加密」兩個字
  - 如果加密的是「一整個資料夾」
    → 資料夾裡面會多一個叫做「已加密」的新資料夾，
      裡面放的就是每個加密好的檔案
"""

import os
import sys

# ---------- 檢查可用的套件 ----------
try:
    from pypdf import PdfReader, PdfWriter
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False

try:
    import win32com.client as win32
    OFFICE_AVAILABLE = True
except ImportError:
    OFFICE_AVAILABLE = False


PDF_EXTENSIONS = (".pdf",)
WORD_EXTENSIONS = (".docx", ".doc")
EXCEL_EXTENSIONS = (".xlsx", ".xls")


# ---------- 兩次輸入密碼確認 ----------
def get_confirmed_password():
    while True:
        pw1 = input("請設定密碼：").strip()
        if not pw1:
            print("❌ 密碼不能是空白，請重新輸入一次。\n")
            continue
        pw2 = input("請再輸入一次密碼（確認兩次一樣）：").strip()
        if pw1 != pw2:
            print("❌ 兩次輸入的密碼不一樣喔，請重新輸入。\n")
            continue
        return pw1


# ---------- PDF 加密 ----------
def encrypt_pdf_files(file_pairs, password):
    """file_pairs: [(input_path, output_path), ...]"""
    results = []
    for input_path, output_path in file_pairs:
        filename = os.path.basename(input_path)
        try:
            reader = PdfReader(input_path)
            writer = PdfWriter()
            for page in reader.pages:
                writer.add_page(page)
            writer.encrypt(user_password=password, algorithm="AES-256")
            with open(output_path, "wb") as f:
                writer.write(f)
            results.append((filename, True, None))
        except Exception as e:
            results.append((filename, False, str(e)))
    return results


# ---------- Word 加密 ----------
def encrypt_word_files(file_pairs, password):
    """file_pairs: [(input_path, output_path), ...]"""
    results = []
    word_app = win32.Dispatch("Word.Application")
    word_app.Visible = False
    word_app.DisplayAlerts = False
    try:
        for input_path, output_path in file_pairs:
            filename = os.path.basename(input_path)
            try:
                doc = word_app.Documents.Open(input_path)
                doc.Password = password
                doc.SaveAs2(output_path)
                doc.Close()
                results.append((filename, True, None))
            except Exception as e:
                results.append((filename, False, str(e)))
    finally:
        word_app.Quit()
    return results


# ---------- Excel 加密 ----------
def encrypt_excel_files(file_pairs, password):
    """file_pairs: [(input_path, output_path), ...]"""
    results = []
    excel_app = win32.Dispatch("Excel.Application")
    excel_app.Visible = False
    excel_app.DisplayAlerts = False
    try:
        for input_path, output_path in file_pairs:
            filename = os.path.basename(input_path)
            try:
                wb = excel_app.Workbooks.Open(input_path)
                wb.Password = password
                wb.SaveAs(output_path)
                wb.Close()
                results.append((filename, True, None))
            except Exception as e:
                results.append((filename, False, str(e)))
    finally:
        excel_app.Quit()
    return results


def print_results(category_name, results):
    if not results:
        return
    print(f"\n--- {category_name} ---")
    for filename, success, error in results:
        print(f"✅ {filename}" if success else f"❌ {filename} — 失敗（{error}）")


def main():
    print("=" * 55)
    print("PDF / Word / Excel 加密工具")
    print("把檔案或資料夾拖進來，就能幫檔案加上密碼保護")
    print("（提醒：資料夾本身不會被加密，加密的是裡面的每個檔案）")
    print("=" * 55)

    target_path = input(
        "\n請把要加密的「檔案」或「資料夾」，直接拖曳到這裡，再按 Enter：\n> "
    ).strip().strip('"').strip("'")
    target_path = target_path.rstrip("\\/")

    if not os.path.exists(target_path):
        print(f"\n❌ 找不到這個檔案或資料夾，請確認路徑是否正確：{target_path}")
        input("\n按 Enter 鍵結束...")
        sys.exit(1)

    if os.path.isdir(target_path):
        print("\n偵測到你拖進來的是「資料夾」。")
        print("程式會自動把資料夾裡面每一個 PDF / Word / Excel 檔案分別加密，")
        print("每個檔案都要輸入密碼才能打開；資料夾本身不會被加密。")

    print()
    password = get_confirmed_password()

    pdf_pairs, word_pairs, excel_pairs = [], [], []

    if os.path.isfile(target_path):
        # ---------- 單一檔案模式 ----------
        ext = os.path.splitext(target_path)[1].lower()
        folder, filename = os.path.split(target_path)
        name, extension = os.path.splitext(filename)
        output_path = os.path.join(folder, f"{name}_加密{extension}")

        if ext in PDF_EXTENSIONS:
            pdf_pairs.append((target_path, output_path))
        elif ext in WORD_EXTENSIONS:
            word_pairs.append((target_path, output_path))
        elif ext in EXCEL_EXTENSIONS:
            excel_pairs.append((target_path, output_path))
        else:
            print(f"\n❌ 不支援這種檔案格式：{ext}")
            print("本工具只能處理 .pdf / .docx / .doc / .xlsx / .xls 這幾種檔案")
            input("\n按 Enter 鍵結束...")
            sys.exit(1)

    else:
        # ---------- 資料夾模式（個別加密） ----------
        output_folder = os.path.join(target_path, "已加密")
        os.makedirs(output_folder, exist_ok=True)

        for f in os.listdir(target_path):
            full_path = os.path.join(target_path, f)
            if not os.path.isfile(full_path):
                continue
            ext = os.path.splitext(f)[1].lower()
            output_path = os.path.join(output_folder, f)

            if ext in PDF_EXTENSIONS:
                pdf_pairs.append((full_path, output_path))
            elif ext in WORD_EXTENSIONS:
                word_pairs.append((full_path, output_path))
            elif ext in EXCEL_EXTENSIONS:
                excel_pairs.append((full_path, output_path))

        if not pdf_pairs and not word_pairs and not excel_pairs:
            print(f"\n⚠️ 在「{target_path}」裡面沒有找到可以加密的檔案")
            print("（本工具只能處理 .pdf / .docx / .doc / .xlsx / .xls）")
            input("\n按 Enter 鍵結束...")
            sys.exit(0)

        print(
            f"\n找到了 {len(pdf_pairs)} 個 PDF、"
            f"{len(word_pairs)} 個 Word、"
            f"{len(excel_pairs)} 個 Excel 檔案"
        )

    # ---------- 檢查套件是否齊全，缺少的類型會跳過並提醒 ----------
    if pdf_pairs and not PDF_AVAILABLE:
        print("\n⚠️ 有 PDF 檔案，但電腦缺少必要的套件（pypdf），這些 PDF 會先跳過。")
        print("   請先執行： pip install pypdf cryptography")
        pdf_pairs = []

    if (word_pairs or excel_pairs) and not OFFICE_AVAILABLE:
        print("\n⚠️ 有 Word/Excel 檔案，但電腦缺少必要的套件（pywin32），這些檔案會先跳過。")
        print("   請先執行： pip install pywin32")
        word_pairs, excel_pairs = [], []

    if not pdf_pairs and not word_pairs and not excel_pairs:
        print("\n目前沒有可以處理的檔案，程式結束。")
        input("\n按 Enter 鍵結束...")
        sys.exit(0)

    print("\n開始加密，請稍等一下...")

    all_results = []

    if pdf_pairs:
        results = encrypt_pdf_files(pdf_pairs, password)
        print_results("PDF", results)
        all_results.extend(results)

    if word_pairs:
        results = encrypt_word_files(word_pairs, password)
        print_results("Word", results)
        all_results.extend(results)

    if excel_pairs:
        results = encrypt_excel_files(excel_pairs, password)
        print_results("Excel", results)
        all_results.extend(results)

    success_count = sum(1 for _, ok, _ in all_results if ok)

    print("\n" + "=" * 55)
    print(f"全部完成！成功加密 {success_count} / {len(all_results)} 個檔案。")
    if os.path.isfile(target_path):
        print(f"加密後的檔案在這裡：{os.path.dirname(target_path)}")
    else:
        print(f"加密後的檔案在這裡：{os.path.join(target_path, '已加密')}")
    print("\n怎麼確認有成功：")
    print("先把 Word/Excel 完全關閉，")
    print("再用滑鼠雙擊剛剛加密好的檔案，應該會跳出要你輸入密碼的視窗。")
    print("=" * 55)

    input("\n按 Enter 鍵結束...")


if __name__ == "__main__":
    main()

        ```

   </details>


## 第二步驟：日常使用

> 【注意】此程式能做到的事
> 
> - **單一檔案加密**：可加密單一 PDF、Word 或 Excel 檔案。
> - **整批加密**：把整個資料夾拖入程式後，資料夾內**每一個**單獨檔案都會被個別加密。
>     
>     > 舉例：若 A 資料夾中有 100 個 PDF 檔案，將整個資料夾拖入程式後，這 100 個檔案會**一次全部加密完成**。
>     > 
> 
> 【限制】此程式做不到的事
> 
> - **無法把整個資料夾打包成一個加密檔**。加密的對象永遠是「資料夾裡的個別檔案」，資料夾本身不會被加密、也不會被壓縮成單一加密檔。
1. 把程式檔案拖進終端機－不管要加密什麼檔案，指令的格式都一樣：
    
    ```powershell
    python [空一格] [檔案路徑]（可直接把檔案拖曳到這裡）
    ```
    
    我將上面那支加密程式命名為「**萬用加密工具.py**」。依照這個格式，先把這支程式**拖曳到終端機視窗中**，讓電腦知道程式檔案放在哪裡，接著按下 Enter。
    
    範例（本文作者的路徑僅供參考）：
    
    ```powershell
    PS C:\Users\袋鼠> python C:\Users\袋鼠\Downloads\萬用加密工具.py
    ```
![](/img/blog/encryption_3.png)
    
2. 拖入要加密的檔案並設定密碼：接著，把要加密的檔案拖曳到終端機視窗中，再按下 Enter。程式會請你輸入兩次密碼（第二次是確認），輸入完成後就會開始加密。  
（⚠️ **請務必保管好密碼**，一旦忘記密碼，將**無法**找回或重設。）

![](/img/blog/encryption_4.png)

3. 確認加密結果－加密完成後，新產生的檔案檔名後面會多出「＿加密」字樣，代表這是加密過的版本
![](/img/blog/image.png)

## 圖形介面（GUI）版

如果你不想每次都在終端機打指令，也可以改用**圖形介面版本**，用滑鼠點選就能完成加密，操作更直覺。

> 📎 GitHub 連結：https://github.com/kangaroo0126/File-Encryption-Program
> 
1. 前往上方 GitHub 連結，下載 `README.md`、`requirements.txt`、`萬用加密工具.py` 三個檔案，放在同一個資料夾。
2. 在該資料夾中開啟終端機，執行：（這行指令會一次安裝好圖形介面所需的所有套件，Windows 使用者若需要 Office 加密功能，也已包含在內。）
```
   pip install -r requirements.txt
```

3. 安裝完成後，執行：
```
   python 萬用加密工具.py
```
即會開啟一個圖形介面視窗。