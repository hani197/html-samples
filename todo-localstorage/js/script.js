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

  // Add task to list
  let li = document.createElement("li");
  li.innerHTML = `${taskValue} <button onclick="removeTask(this)">❌</button>`;
  document.getElementById("taskList").appendChild(li);

  // Save to localStorage
  saveTask(taskValue);

  taskInput.value = ""; // Clear input
}

function removeTask(button) {
  let li = button.parentElement;
  let taskText = li.firstChild.textContent.trim(); // get task text
  li.remove();

  // Remove from localStorage
  deleteTask(taskText);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    let li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(this)">❌</button>`;
    document.getElementById("taskList").appendChild(li);
  });
}

function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task); // remove matching task
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
