'use strict';

const inputTask = document.querySelector('#inputTask');
const addTaskForm = document.querySelector('#addTaskForm');

const taskList = document.querySelector('#taskList');
const taskTemplate = document.querySelector('#taskTemplate').innerHTML;

addTaskForm.addEventListener('submit', onSubmitAddTask);
taskList.addEventListener('click', onClickListItem);

function onSubmitAddTask(event) {
  event.preventDefault();
  
  processInput(); 
}

function processInput() {
  const task = {
    text: inputTask.value
  }

  if (checkValue(task.text)) {
    addTask(task);
  }

  setOnInput();
}

function checkValue(value) {
  return value != '';
}

function addTask(task) {  
  const taskItem = taskTemplate.replace('{{text}}', task.text);
  taskList.innerHTML += taskItem;
}

function onClickListItem(event) {  
  const itemClass = event.target.classList;

  if (itemClass.contains('del-btn')) {
    removeItem(event.target.parentNode);
  }
  else
  if (itemClass.contains('todo-item')) {
    toggleItem(itemClass);
  }
}

function removeItem(element) {
  element.remove();
}

function toggleItem(elementClass){
  elementClass.toggle('is-done');
}

function setOnInput() {
  inputTask.value = '';
  inputTask.focus();
}
