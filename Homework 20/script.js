const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
const USER_CLASS = 'user-item';
const BUTTON_EDIT_CLASS = 'user-button-edit';
const BUTTON_DELETE_CLASS = 'user-button-delete';
const INVALID_VALUE_CLASS = 'invalid';
const EDIT_BTN_LABEL = 'save';
const DELETE_BTN_LABEL = 'delete';
const EDITABLE_USER_PROPS = ['name', 'surname', 'phone', 'email', 'birth'];

const $buttonAddUser = $('#btnAddUser');
const $dialogForm = $('#dialog-form');
const $usersForm = $('#usersForm');
const $usersList = $('#usersList');
const userTemplate = $('#userTemplate').html();

const dialog = $dialogForm.dialog({
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
      'New user': onClickBtnNewUser,
      Cancel: function() {
          dialog.dialog('close');
      }
  },
  close: onCloseDialog
});
const form = dialog.find('form'); //.on('submit', onFormSubmit);

// usersForm.addEventListener('focus', onFocusInput, true);
// usersForm.addEventListener('blur', onBlurInput, true);

$buttonAddUser.on('click', () => dialog.dialog('open'));
// $usersList.on('click', `.${BUTTON_EDIT_CLASS}`, onClickEditUser);
// $usersList.on('click', `.${BUTTON_DELETE_CLASS}`, onClickDeleteUser);

let users = [];

onStart();

function onClickBtnNewUser(event) {    
  
  
  requestAddUser();  
}

function onClickusersList(event) {
  const buttonName = event.target.getAttribute('name');
  const id = event.target.closest('.' + USER_CLASS).dataset.id;

  switch (buttonName) {
    case EDIT_BTN_LABEL:
      editUser(id);
      break;
    case DELETE_BTN_LABEL:
      deleteUser(id);
      break;
  }
}

function onClickEditUser() {
  const $element = $(event.target);
  const id = $element.closest(`.${USER_CLASS}`).data('id');

  dialog.dialog('open');
}

function onFocusInput(event) {
  event.target.classList.remove(INVALID_VALUE_CLASS);
}

function onBlurInput(event) {
  if (!checkInputValue(event.target.value)) {
    event.target.classList.add(INVALID_VALUE_CLASS);  
  }  
}

function onCloseDialog() {
  form[0].reset();
}

function onStart() {
  getUsers();
}

function getUsers() {
  return fetch(CONTACTS_URL)
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
      .replace('{{phone}}', user.phone)
      .replace('{{email}}', user.email)
      .replace('{{birth}}', user.date)
      .replace('{{userRecord}}', USER_CLASS)
      .replace('{{userAction}}', USER_ACTION_CLASS)
      .replace('{{saveButton}}', EDIT_BTN_LABEL)
      .replace('{{deleteButton}}', DELETE_BTN_LABEL);
}

function requestAddUser() {
  const user = checkAddInputs();

  if (user === null) { return; }

  console.log(user);
  
  return; 

  fetch(CONTACTS_URL,
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

function addNote() {
  const note = {};

  form.serializeArray().forEach(v => (note[v.name] = v.value));
  note.id = Date.now();
  notes.push(note);
  saveNotes();
  renderNote(note);
  dialog.dialog('close');
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
  console.log(user);

  return;

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






