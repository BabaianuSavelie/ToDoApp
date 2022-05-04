const taskContainer = document.getElementById("container");
const template = document.getElementById("template");

const loadTasks = () => {
  if (localStorage.getItem("tasks") === null) return;

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    createTaskView(task.task, task.completed);
  });
};

window.onload = loadTasks();

function createTaskView(task, completed) {
  const item = template.content.cloneNode(true).children[0];
  const taskItem = item.querySelector("#todoItem");
  taskItem.innerText = task;
  taskItem.classList.toggle(completed ? "completed" : "not");
  taskContainer.append(item);
}

function addNewTask() {
  let input = document.getElementById("taskInput");
  if (input.value == "") alert("You must write something");
  else {
    createTaskView(input.value);
    storeToLocalStorage(input.value);
    input.value = "";
    console.log(input);
  }
}

function deleteTask(event) {
  const parent = event.parentNode.parentNode;
  const taskToRemove = parent.querySelector("#todoItem");

  parent.classList.toggle("item-animate");
  setTimeout(function () {
    taskContainer.removeChild(parent);
    removeFromLocalStorage(taskToRemove.textContent);
  }, 300);
}

function markAsFinished(event) {
  const parent = event.parentNode.parentNode;
  const p = parent.querySelector("#todoItem");
  p.classList.toggle("completed");

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === p.textContent) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function storeToLocalStorage(task) {
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task, completed: false },
    ])
  );
}
function removeFromLocalStorage(inputTask) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    if (task.task === inputTask) tasks.splice(tasks.indexOf(task), 1);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
