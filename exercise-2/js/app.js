var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString, arr) {
  var listItem = document.createElement('li');
  var domString = '<button class="delete">Delete</button><input type="checkbox"></input><label>' + taskString + '</label><input type="text"></input><button class="edit">Edit</button>';
  listItem.innerHTML =  domString;
  listItem.appendChild(listItem.firstChild);

  return listItem;
};

var addTask = function () {
  if (!taskInput.value){
    alert("The task value cannot be empty");
    return false;
  }
  var listItemName = taskInput.value || "New Item"
  window.localStorage.setItem("newTaskName", listItemName)
  listItem = createNewTaskElement(listItemName)
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)
  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
	  label.innerText = editInput.value
	  button.innerText = "Edit";
  } else {
	 editInput.value = label.innerText
	 button.innerText = "Save";
  }
  
  listItem.classList.toggle("editMode");
};

var deleteTask = function (el) {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function (el) {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

if (window.localStorage.getItem("newTaskName"))
{
  listItem = createNewTaskElement(window.localStorage.getItem("newTaskName"))
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)
}

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}