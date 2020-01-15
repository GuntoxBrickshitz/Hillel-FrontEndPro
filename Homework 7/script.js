'use strict';

const inputCount = document.querySelector('#inputCount');
const buttonSetList = document.querySelector('#btnSetList');

const list = document.querySelector('#list');
const listTemplate = document.querySelector('#listTemplate').innerHTML;
const errorTemplate = document.querySelector('#errorTemplate').innerHTML;

const buttonTop = document.querySelector('#btnJumpTop');
const showJumpTopOver = 48;

buttonSetList.addEventListener('click', onBtnSetList);
buttonTop.addEventListener('click', onBtnTop);

function onBtnSetList() {
  clearList();
  setList();  
  focusInput();
}

function onBtnTop() {
  focusInput();
}

function clearList() {
  list.innerHTML = '';
}

function setList() {
  let count = Number(inputCount.value);

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

  list.innerHTML = listHtml;

  showJumpTop(count);  
}

function showJumpTop(count) {
  if (count > showJumpTopOver) {
    showElement(buttonTop);
  }
  else {
    hideElement(buttonTop);
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
  inputCount.focus();
}
