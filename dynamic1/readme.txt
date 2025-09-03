🔹 Explanation
1. function addTask() { ... }

This function runs when you click the Add button.

let taskInput = document.getElementById("taskInput");
→ Finds the input box (<input id="taskInput">) and stores it.

let taskValue = taskInput.value.trim();
→ Gets the text typed by the user and removes extra spaces.

if (taskValue === "") { alert("Please enter a task!"); return; }
→ If the input is empty, show an alert and stop.

let li = document.createElement("li");
→ Creates a new <li> element.

li.innerHTML = \${taskValue} <button onclick="removeTask(this)">❌</button>`; → Puts the task text **and a ❌ button** inside<li>. → The onclick="removeTask(this)"means: when ❌ is clicked, call theremoveTask() function, passing the clicked button (this`).

document.getElementById("taskList").appendChild(li);
→ Adds the new <li> into the <ul id="taskList">.

taskInput.value = "";
→ Clears the input box for the next task.

2. function removeTask(button) { ... }

This function runs when ❌ is clicked.

let li = button.parentElement;
→ Finds the <li> that contains the clicked ❌ button.
(Because the button is inside the <li>)

li.remove();
→ Deletes that <li> from the list.

🔹 Flow in Action

User types: Buy Milk

Clicks Add → addTask() runs

New <li> appears:

Buy Milk ❌


If ❌ is clicked → removeTask() runs → deletes that <li>.