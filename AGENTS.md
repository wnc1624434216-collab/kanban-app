# 看板應用 (Kanban App) 開發規範

本檔案為專案全域開發規範（Rules），適用於本專案的所有開發與 AI 協作。

---

## 1. 專案架構與核心原則
* **純原生技術棧 (Vanilla Web)**：僅使用 HTML5、CSS3、原生 JavaScript (ES6+)。嚴禁引入外部打包工具（Webpack、Vite）或大型前端框架（React、Vue）。
* **零依賴運作**：所有核心樣式與邏輯必須封裝於本專案內，開箱即用。
* **狀態驅動與持久化**：資料以 `localStorage` 持久化，狀態修改後統一透過 `saveTasks()` 與 `renderBoard()` 更新畫面。

---

## 2. 檔案分工與命名
* `index.html`：頁面骨架、表單結構、看板三欄容器。
* `style.css`：佈局、元件色彩、過渡動畫與到期紅字標籤樣式。
* `app.js`：業務邏輯、DOM 事件、HTML5 Drag & Drop、日期格式化與逾期判斷。
* `README.md`：專案公開介紹與使用說明。
* `.agents/rules/`：專案開發規範與 AI 規則配置。

---

## 3. 程式碼規範
* **HTML**：遵循語意化標籤，維持現有容器 `id`（如 `task-form`, `list-todo` 等）。
* **CSS**：現代簡約風格、響應式排版（RWD）。到期標籤樣式：
  * 一般日期：`.due-tag`（淺灰色背景、深色字）。
  * 今天或已逾期：`.due-tag.overdue`（淡紅底 `#fef2f2`、紅字 `#dc2626`、紅邊框 `#fca5a5`）。
* **JavaScript**：
  * 日期格式：卡片上統一格式化為「`年/月/日`（`YYYY/MM/DD`）」。
  * 逾期判斷：以本地時間為準，`截止日 <= 今天` 判定為今天或過期（標籤顯示紅色）。
  * 選填支援：截止日期為選填，未填寫時不顯示任何標籤。
  * 安全防護：文字渲染一律使用 `textContent`，防止 XSS。

---

## 4. Git 提交與發布規範
* 預設分支為 `main`，任何推送到 `main` 皆自動透過 GitHub Actions 發布到 GitHub Pages。
* Commit 訊息建議採用 Conventional Commits（如 `feat:`, `fix:`, `style:`, `docs:`）。

---

## 5. 提交前驗證清單
* [ ] 新增任務（選填/必填欄位行為正確）
* [ ] 截止日期顯示格式為 `YYYY/MM/DD`
* [ ] 今天或逾期日期顯示為紅色標籤
* [ ] 三欄之間拖曳切換狀態正常，計數即時更新
* [ ] 刪除任務功能正常
* [ ] 重新整理頁面（F5）確認 LocalStorage 資料持久化正常
