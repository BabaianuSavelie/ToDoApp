const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("container");
const template = document.getElementById("template");
let tasks = [];

function addNewTask() {
  let input = document.getElementById("taskInput").value;
  if (input === "") alert("You must write something");
  else {
    const item = template.content.cloneNode(true);
    const taskItem = item.getElementById("todoItem");
    taskItem.innerText = input;
    taskContainer.append(item);
  }
  input = "";
}
