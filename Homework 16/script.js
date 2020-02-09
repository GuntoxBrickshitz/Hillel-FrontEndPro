'use strict';

const USERS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users';
const USER_CLASS = 'user-item';
const USER_ACTION_CLASS = 'user-action';
const INVALID_VALUE_CLASS = 'invalid';
const SAVE_BUTTON_NAME = 'save';
const DELETE_BUTTON_NAME = 'delete';
const EDITABLE_USER_PROPS = ['name', 'surname', 'email'];

const usersForm = document.querySelector('#usersForm');
const usersList = document.querySelector('#usersList');
const userTemplate = document.querySelector('#userTemplate').innerHTML;
const btnAddContact = document.querySelector('#buttonAddUser');

const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputEmail = document.querySelector('#inputEmail');

btnAddContact.addEventListener('click', onSubmitBtnAddUser);
usersList.addEventListener('click', onClickusersList);
usersForm.addEventListener('focus', onFocusInput, true);
usersForm.addEventListener('blur', onBlurInput, true);

let users = [];

onStart();

function onSubmitBtnAddUser(event) {    
  event.preventDefault(); 
  requestAddUser();  
}

function onClickusersList(event) {
  const buttonName = event.target.getAttribute('name');
  const id = event.target.closest('.' + USER_CLASS).dataset.id;

  switch (buttonName) {
    case SAVE_BUTTON_NAME:
      editUser(id);
      break;
    case DELETE_BUTTON_NAME:
      deleteUser(id);
      break;
  }
}

function onFocusInput(event) {
  event.target.classList.remove(INVALID_VALUE_CLASS);
}

function onBlurInput(event) {
  if (!checkInputValue(event.target.value)) {
    event.target.classList.add(INVALID_VALUE_CLASS);  
  }  
}

function onStart() {
  getUsers();
}

function getUsers() {
  return fetch(USERS_URL)
      .then(resp => resp.json())
      .then(setUsers)
      .then(renderUsers);
}

function setUsers(listFromServer) {
  return (users = listFromServer);
}

function renderUsers(listFromServer) {
  usersList.innerHTML = listFromServer.map(makeUserHtml).join('\n');
}

function makeUserHtml(user) {
  return userTemplate
      .replace(/\{\{id\}\}/g, user.id)
      .replace('{{firstName}}', user.name)
      .replace('{{lastName}}', user.surname)
      .replace('{{email}}', user.email)
      .replace('{{userRecord}}', USER_CLASS)
      .replace('{{userAction}}', USER_ACTION_CLASS)
      .replace('{{saveButton}}', SAVE_BUTTON_NAME)
      .replace('{{deleteButton}}', DELETE_BUTTON_NAME);
}

function requestAddUser() {
  const user = checkAddInputs();

  if (user === null) { return; }

  fetch(USERS_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(addUser);
}

function checkAddInputs() {
  const newUser = {
    name: inputFirstName.value,
    surname: inputLastName.value,
    email: inputEmail.value
  }

  for (let key in newUser) {    
    if (!checkInputValue(newUser[key])) {
      return null;
    }
  }

  return newUser;
}

function checkInputValue(value) {
  return !!value.trim();
}

function addUser(user) {
  users.push(user);

  renderUsers(users);
}

function editUser(id) {
  const user = users.find(user => user.id === id);

  let changed = false;

  EDITABLE_USER_PROPS.forEach(prop => {
    changed = changed || changeUserProperty(prop, user);
  });
  
  if (!changed) { return; }

  fetch(`${USERS_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
}

function changeUserProperty(property, user) {  
  const newValue = usersList.querySelector('[name=' + property + '-' + user.id + ']').value;
  const changed = (checkInputValue(newValue) && user[property] !== newValue);

  if (changed) {
    user[property] = newValue;
  }

  return changed;
}

function deleteUser(id) {
  fetch(`${USERS_URL}/${id}`,
    {
      method: 'DELETE'
    });

  users = users.filter(user => user.id !== id);

  renderUsers(users);
}






