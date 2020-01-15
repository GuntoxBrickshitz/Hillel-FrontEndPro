'use strict';

const inputTask = document.querySelector('#inputTask');
const buttonAddTask = document.querySelector('#btnAddTask');

const taskList = document.querySelector('#taskList');
const listTemplate = document.querySelector('#listTemplate').innerHTML;
const errorTemplate = document.querySelector('#errorTemplate').innerHTML;

const buttonBottom = document.querySelector('#btnJumpBottom');
const showJumpTopOver = 48;

buttonAddTask.addEventListener('click', onbtnAddTask);
buttonBottom.addEventListener('click', onBtnBottom);

function onbtnAddTask() {
  checkInput();  
  addTask();
  focusInput();
}

function onBtnBottom() {
  focusInput();
}

function clearList() {
  taskList.innerHTML = '';
}

function setList() {
  let count = Number(inputTask.value);

  if (checkCount(count)) {
    appendList(count);
  }
  else {
    showCountError();
  }  
}

function checkCount(value) {  
  return !isNaN(value) && Number.isInteger(value) && value > 0;
}

function appendList(count) {
  let listHtml = '';

  for (let i = 0; i < count; i++) {
    listHtml += listTemplate.replace('{{item}}', i + 1);
  }

  taskList.innerHTML = listHtml;

  showJumpTop(count);  
}

function showJumpTop(count) {
  if (count > showJumpTopOver) {
    showElement(buttonBottom);
  }
  else {
    hideElement(buttonBottom);
  }  
}

function showElement(element) {
  element.classList.add('is-visible');
}

function hideElement(element) {
  element.classList.remove('is-visible');
}

function showCountError() {
  list.innerHTML = errorTemplate.replace('{{text}}','Entered value is not valid');
}

function focusInput() {
  inputTask.focus();
}
