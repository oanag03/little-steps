
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const progress = document.getElementById("progress");

let tasks = [];

function updateProgress() {
  const remaining = tasks.filter(task => !task.done).length;
  progress.textContent = `Ai ${remaining} activități de făcut.`;
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
    li.textContent = task.text;

    if (task.done) li.classList.add("done");

    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    list.appendChild(li);
  });

  updateProgress();
}
 