const taskContainer = document.getElementById("container");
const template = document.getElementById("template");

const loadTasks = () => {
  if (localStorage.getItem("tasks") === null) return;

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    createTaskView(task.task);
  });
};

window.onload = loadTasks();

function createTaskView(task) {
  const item = template.content.cloneNode(true).children[0];
  const taskItem = item.querySelector("#todoItem");
  taskItem.innerText = task;
  taskContainer.append(item);
}

function addNewTask() {
  let input = document.getElementById("taskInput").value;
  if (input == "") alert("You must write something");
  else {
    createTaskView(input);
    storeToLocalStorage(input);
  }
}

function deleteTask(event) {
  const row = event.parentNode.parentNode;
  const taskToRemove = row.querySelector("#todoItem");
  console.log(row);
  row.classList.remove("item");
  row.classList.toggle("item-animate");
  setTimeout(function () {
    taskContainer.removeChild(row);
    removeFromLocalStorage(taskToRemove);
  }, 300);
}

function markAsFinished() {
  const btn = event.target.parentNode;
  const parent = btn.parentNode;
  const p = (parent.querySelector("#todoItem").style.textDecoration =
    "line-through");
}

function storeToLocalStorage(task) {
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task },
    ])
  );
}
function removeFromLocalStorage(task) {
  localStorage.clear();
}
