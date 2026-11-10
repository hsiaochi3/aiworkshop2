# AI 助教與課堂實作｜1112 市北工作坊

國立臺中教育大學 教育學系 阮孝齊 助理教授 工作坊分享網站（純靜態 HTML，可直接放上 GitHub Pages）。

## 網站結構

所有檔案放在同一層，沒有子資料夾：

- `index.html`：首頁入口
- `unit-01.html` ~ `unit-06.html`：六個單元頁
- `worksheets.html`：學習單分享頁
- `individual.html`、`group.html`、`challenge.html`：三份學習單（可線上填寫、列印／存 PDF）
- `*.docx`：學習單 Word 原檔
- `slide-XX.jpg`：整頁投影片圖；`sXX-*.jpg/png`：從簡報抽出的圖片
- `style.css`、`site.js`、`worksheet.js`、`qrcode.js`：樣式與程式

## 部署到 GitHub Pages

1. 建立 Public repository。
2. Add file → Upload files → choose your files。一次最多 100 個檔案，請分兩次：
   - 第一次：全選所有 `slide-` 開頭的圖片（79 個）。
   - 第二次：選其餘所有檔案。
3. Settings → Pages → Deploy from a branch → main、/ (root) → Save。
4. 網址：`https://<帳號>.github.io/<repository 名稱>/`

學生作答的學號已改為「學生 A–D」。部分內容整理自劉育隆，AITE「AI 助教」簡報。
