var addButton = document.querySelector('.js-addBtn');
var inputTask = document.querySelector('.js-input');
var unfinishedTasks = document.querySelector('.unfinished-tasks');
var finishedTasks = document.querySelector('.finished-tasks');


function createNewElement(task, finished) {
  var listItem = document.createElement('li');
  listItem.className = "todo-task__item";
  var checkbox = document.createElement('button');

  if (finished) {
    checkbox.className = "check-btn";
    checkbox.innerHTML = "<i class='fas fa-check-square'></i>";
  } else {
    checkbox.className = "check-btn";
    checkbox.innerHTML = "<i class='far fa-check-square'></i>";
  }

  var label = document.createElement('label');
  label.innerText = task;

  var input = document.createElement('input');
  input.type = "text";

  var btnGroup = document.createElement('div');
  btnGroup.className = ('btn-group');

  var editButton = document.createElement('button');
  editButton.className = "edit-btn";
  editButton.innerHTML = "<i class='fas fa-pen'></i>";

  var deleteButton = document.createElement('button');
  deleteButton.className = "trash-btn";
  deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";

  btnGroup.appendChild(editButton);
  btnGroup.appendChild(deleteButton);
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(btnGroup);
  // listItem.appendChild(editButton);
  // listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  if (inputTask.value) {
    var listItem = createNewElement(inputTask.value, false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask)
    inputTask.value = "";
  }
  save();
}
addButton.onclick = addTask;

function deleteTask() {
  var listItem = this.parentNode.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  save();
}

function editTask() {
  var editButton = this;
  var listItem = this.parentNode.parentNode;
  var label = listItem.querySelector('label');
  var input = listItem.querySelector('input[type=text]');

  var containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = input.value;
    editButton.className = "edit-btn";
    editButton.innerHTML = "<i class='fas fa-pen'></i>";
    save();
  } else {
    input.value = label.innerText;
    editButton.className = "save-btn";
    editButton.innerHTML = "<i class='fas fa-save'></i>";

  }
  listItem.classList.toggle('editMode');
}

function finishTask() {
  var listItem = this.parentNode;
  var checkbox = listItem.querySelector('button.check-btn');
  checkbox.className = "check-btn";
  checkbox.innerHTML = "<i class='fas fa-check-square'></i>";
  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
  save();
}

function unfinishTask() {
  var listItem = this.parentNode;
  var checkbox = listItem.querySelector('button.check-btn');
  checkbox.className = "check-btn";
  checkbox.innerHTML = "<i class='far fa-check-square'></i>";

  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask)
  save();
}

function bindTaskEvents(listItem, checkboxEvent) {
  var checkbox = listItem.querySelector('button.check-btn');
  var editButton = listItem.querySelector('button.edit-btn');
  var deleteButton = listItem.querySelector('button.trash-btn');

  checkbox.onclick = checkboxEvent;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;

}


function save() {

  var unfinishedTasksArr = [];
  for (var i = 0; i < unfinishedTasks.children.length; i++) {
    unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
  }

  var finishedTasksArr = [];
  for (var i = 0; i < finishedTasks.children.length; i++) {
    finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
  }

  localStorage.removeItem('todo');
  localStorage.setItem('todo', JSON.stringify({
    unfinishedTasks: unfinishedTasksArr,
    finishedTasks: finishedTasksArr
  }));

}

function load() {
  return JSON.parse(localStorage.getItem('todo'));
}

var data = load();

for (var i = 0; i < data.unfinishedTasks.length; i++) {
  var listItem = createNewElement(data.unfinishedTasks[i], false);
  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
}

for (var i = 0; i < data.finishedTasks.length; i++) {
  var listItem = createNewElement(data.finishedTasks[i], true);
  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
}

