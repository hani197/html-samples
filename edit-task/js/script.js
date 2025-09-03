// Run when page loads
window.onload = function() {
  loadTasks();
};

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskValue);
  saveTask(taskValue, false);

  taskInput.value = ""; // Clear input
}

function createTaskElement(taskText, completed = false) {
  let li = document.createElement("li");
  
  // Task text span
  let span = document.createElement("span");
  span.textContent = taskText;
  if (completed) span.classList.add("completed");
  li.appendChild(span);

  // Complete button
  let completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => toggleComplete(span, taskText);
  li.appendChild(completeBtn);

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "✏";
  editBtn.onclick = () => editTask(span, taskText);
  li.appendChild(editBtn);

  // Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => removeTask(li, taskText);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

function toggleComplete(span, taskText) {
  span.classList.toggle("completed");
  updateTask(span.textContent, span.classList.contains("completed"));
}

function editTask(span, oldTask) {
  let newTask = prompt("Edit task:", span.textContent);
  if (newTask && newTask.trim() !== "") {
    span.textContent = newTask.trim();
    updateTask(oldTask, span.classList.contains("completed"), newTask.trim());
  }
}

function removeTask(li, taskText) {
  li.remove();
  deleteTask(taskText);
}

// ---------------- LocalStorage Functions ----------------

function saveTask(task, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldTask, completed, newTask = null) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(t => {
    if (t.text === oldTask) {
      return { text: newTask || oldTask, completed };
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
  }
}

// Filter tasks: all / active / completed
function filterTasks(type) {
  let list = document.getElementById("taskList").children;
  for (let li of list) {
    let span = li.querySelector("span");
    let isCompleted = span.classList.contains("completed");

    if (type === "all") {
      li.style.display = "flex";
    } else if (type === "active" && isCompleted) {
      li.style.display = "none";
    } else if (type === "completed" && !isCompleted) {
      li.style.display = "none";
    } else {
      li.style.display = "flex";
    }
  }
}
