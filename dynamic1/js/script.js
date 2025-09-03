function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `${taskValue} <button onclick="removeTask(this)">❌</button>`;

  document.getElementById("taskList").appendChild(li);

  taskInput.value = ""; // Clear input
}

function removeTask(button) {
  let li = button.parentElement;
  li.remove();
}
