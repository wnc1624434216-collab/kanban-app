// 看板任務資料管理
let tasks = JSON.parse(localStorage.getItem("kanban_tasks")) || [
  {
    id: "task-1",
    title: "歡迎使用看板！這是一個示範任務",
    dueDate: getTodayString(),
    status: "todo"
  },
  {
    id: "task-2",
    title: "這是一個沒有截止日期的任務",
    dueDate: "",
    status: "in-progress"
  },
  {
    id: "task-3",
    title: "這是一個已完成的任務",
    dueDate: "2026-09-01",
    status: "done"
  }
];

// 取得今日 YYYY-MM-DD 字串（依使用者本地時間）
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 格式化為「年/月/日」
function formatDueDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;
  return `${parts[0]}/${parts[1]}/${parts[2]}`;
}

// 檢查是否為今天或已過期
function isTodayOrOverdue(dateString) {
  if (!dateString) return false;
  const todayStr = getTodayString();
  return dateString <= todayStr;
}

// 儲存到 LocalStorage
function saveTasks() {
  localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
}

// 渲染所有任務與欄位計數
function renderBoard() {
  const lists = {
    todo: document.getElementById("list-todo"),
    "in-progress": document.getElementById("list-in-progress"),
    done: document.getElementById("list-done")
  };

  const counts = {
    todo: document.getElementById("count-todo"),
    "in-progress": document.getElementById("count-in-progress"),
    done: document.getElementById("count-done")
  };

  // 清空現有欄位
  Object.values(lists).forEach(list => {
    if (list) list.innerHTML = "";
  });

  const columnCounts = { todo: 0, "in-progress": 0, done: 0 };

  tasks.forEach(task => {
    const list = lists[task.status] || lists.todo;
    columnCounts[task.status] = (columnCounts[task.status] || 0) + 1;

    const card = document.createElement("div");
    card.className = "task-card";
    card.draggable = true;
    card.dataset.id = task.id;

    // 拖曳事件
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);

    // 任務內容
    const content = document.createElement("div");
    content.className = "task-content";
    content.textContent = task.title;
    card.appendChild(content);

    // 卡片底部資訊區
    const meta = document.createElement("div");
    meta.className = "task-meta";

    // 截止日期標籤：有填寫才顯示
    if (task.dueDate) {
      const dueTag = document.createElement("span");
      const isOverdue = isTodayOrOverdue(task.dueDate);
      dueTag.className = isOverdue ? "due-tag overdue" : "due-tag";
      dueTag.textContent = `📅 ${formatDueDate(task.dueDate)}`;
      meta.appendChild(dueTag);
    } else {
      // 佔位用以維持 flex 排版
      meta.appendChild(document.createElement("span"));
    }

    // 刪除按鈕
    const actions = document.createElement("div");
    actions.className = "card-actions";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "刪除任務";
    deleteBtn.innerHTML = "✕";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    actions.appendChild(deleteBtn);

    meta.appendChild(actions);
    card.appendChild(meta);

    list.appendChild(card);
  });

  // 更新計數
  Object.keys(columnCounts).forEach(status => {
    if (counts[status]) {
      counts[status].textContent = columnCounts[status];
    }
  });
}

// 新增任務
document.getElementById("task-form").addEventListener("submit", e => {
  e.preventDefault();

  const titleInput = document.getElementById("task-title");
  const dueDateInput = document.getElementById("task-due-date");

  const title = titleInput.value.trim();
  const dueDate = dueDateInput.value; // 若未選則為空字串 ""

  if (!title) return;

  const newTask = {
    id: `task-${Date.now()}`,
    title: title,
    dueDate: dueDate,
    status: "todo"
  };

  tasks.unshift(newTask);
  saveTasks();
  renderBoard();

  // 清空表單
  titleInput.value = "";
  dueDateInput.value = "";
});

// 刪除任務
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderBoard();
}

// 拖曳邏輯
let draggedTaskId = null;

function handleDragStart(e) {
  draggedTaskId = this.dataset.id;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function handleDragEnd() {
  this.classList.remove("dragging");
  draggedTaskId = null;
}

// 欄位放置事件
document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  column.addEventListener("drop", function (e) {
    e.preventDefault();
    const newStatus = this.dataset.status;
    if (draggedTaskId && newStatus) {
      const task = tasks.find(t => t.id === draggedTaskId);
      if (task && task.status !== newStatus) {
        task.status = newStatus;
        saveTasks();
        renderBoard();
      }
    }
  });
});

// 初始化載入
document.addEventListener("DOMContentLoaded", renderBoard);
// 若 DOM 已經載入，直接執行一次以防萬一
if (document.readyState === "complete" || document.readyState === "interactive") {
  renderBoard();
}
