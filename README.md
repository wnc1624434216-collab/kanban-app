# 📋 看板應用 (Kanban App)

一個輕量、美觀且直覺的純前端看板任務管理工具。支援卡片拖曳切換狀態、截止日期警示以及瀏覽器本地儲存，無需安裝任何依賴套件即可直接執行。

🔗 **線上展示 (Demo)**：[https://wnc1624434216-collab.github.io/kanban-app/](https://wnc1624434216-collab.github.io/kanban-app/)  
📦 **GitHub 專案庫**：[https://github.com/wnc1624434216-collab/kanban-app](https://github.com/wnc1624434216-collab/kanban-app)

---

## ✨ 核心特色與功能

- **經典三欄看板**：規劃「📌 待處理 (To Do)」、「⚡ 進行中 (In Progress)」與「✅ 已完成 (Done)」三種狀態，並自動統計各欄位卡片數量。
- **直覺拖曳操作 (Drag & Drop)**：使用原生 HTML5 Drag & Drop API，卡片可自由拖曳至任一欄位即時變更狀態。
- **彈性截止日期管理 (Due Date)**：
  - 新增任務時可自選是否設定截止日期（選填）。
  - 有設定日期的任務會以標準「**年/月/日 (YYYY/MM/DD)**」格式標籤呈現。
  - **智慧狀態警示**：若任務截止日為**今天**或**已逾期**，標籤將自動顯示為**紅色醒目警示**；未來任務則顯示柔和灰色標籤。
- **本地資料持久化 (LocalStorage)**：所有任務狀態即時同步儲存於瀏覽器本地，重新整理或關閉頁面資料不遺失。
- **現代響應式設計 (RWD)**：簡約優雅的卡片陰影與動態過渡效果，支援不同螢幕尺寸自適應排版。

---

## 🛠️ 技術架構

本專案採用純原生 Web 技術構建，零外部套件與框架依賴：

* **HTML5**：語意化標籤架構、表單驗證與原生拖曳事件。
* **CSS3**：CSS Grid / Flexbox 佈局、自訂卡片樣式、過渡動態效果。
* **JavaScript (ES6+)**：事件驅動、狀態管理、DOM 操作與 LocalStorage API。

---

## 📁 專案結構

```text
kanban-app/
├── index.html      # 主頁面結構與任務表單、看板欄位
├── style.css       # 介面樣式、排版與狀態標籤顏色
├── app.js          # 看板核心業務邏輯、拖曳事件與日期判斷
└── README.md       # 專案說明文件
```

---

## 🚀 本地快速上手

1. **複製專案庫**：
   ```bash
   git clone https://github.com/wnc1624434216-collab/kanban-app.git
   ```

2. **進入專案目錄**：
   ```bash
   cd kanban-app
   ```

3. **開啟應用**：
   直接使用瀏覽器開啟 `index.html`，或搭配 VS Code 的 Live Server 擴充套件啟動本地伺服器。

---

## 📝 授權說明

本專案採用 [MIT License](LICENSE) 授權開源。歡迎自由使用、學習與擴充！
