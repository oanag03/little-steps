
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const progress = document.getElementById("progress");

let tasks = [];

function updateProgress() {
  const remaining = tasks.filter(task => !task.done).length;

  if (tasks.length > 0 && remaining === 0) {
    progress.textContent = "Bravo! Ai terminat tot! 🎉";
  } else {
    progress.textContent = `Ai ${remaining} activități de făcut.`;
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  renderTasks();
  input.value = "";
});


function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.done) li.classList.add("done");

    taskText.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Șterge";
    deleteButton.style.marginLeft = "10px";

    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(taskText);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });

  updateProgress();
}
