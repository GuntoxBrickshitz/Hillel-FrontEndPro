const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
const USER_CLASS = 'user-item';
const INVALID_INPUT_CLASS = 'invalid';
const EDIT_BTN_CLASS = 'user-button-edit';
const DEL_BTN_CLASS = 'user-button-delete';
const EDIT_BTN_LABEL = 'save';
const DEL_BTN_LABEL = 'del';
const CATCH_ERROR = 'Failed request to server. Please try again later';

const $buttonAddUser = $('#btnAddUser');
const $dialogForm = $('#dialog-form');
const $usersForm = $('#usersForm');
const $usersList = $('#usersList');
const $inputName = $('#name');
const $inputSurname = $('#surname');
const $inputPhone = $('#phone');
const $inputEmail = $('#email');
const $inputBirth = $('#birth');
const $inputs = $('.user-input');

const userTemplate = $('#userTemplate').html();

const dialog = $dialogForm.dialog({
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    Save: onClickSaveUser,
    Cancel: onClickCancel
  },
  close: onCloseDialog
});
const form = dialog.find('form'); //.on('submit', onFormSubmit);

let users = [];

// ------------- main code

$buttonAddUser.on('click', onClickAddUser);
$usersList.on('click', `.${EDIT_BTN_CLASS}`, onClickEditUser);
$usersList.on('click', `.${DEL_BTN_CLASS}`, onClickDeleteUser);

$inputBirth.datepicker();
$inputBirth.datepicker('option', 'dateFormat', 'yy-mm-dd');

onStart();

// ------------- event handlers

function onClickAddUser() {
  $dialogForm.attr('data-id', '0');
  dialog.dialog('open');
}

function onClickCancel() {
  dialog.dialog('close');
}

function onCloseDialog() {
  form[0].reset();
  resetInvalid();
}

function onClickSaveUser() {
  const id = $dialogForm.data('id').toString();

  switch (id) {
    case 0:
      addUserFromForm();
      break;

    default:
      saveUser(id);
      dialog.dialog('close');
  }
}

function onClickEditUser() {
  const $element = $(event.target);
  const id = $element.closest(`.${USER_CLASS}`).data('id');

  $dialogForm.attr('data-id', id);
  fillFormFromUser(id);
  dialog.dialog('open');
}

function onClickDeleteUser() {
  const $element = $(event.target);
  const id = $element.closest(`.${USER_CLASS}`).data('id');

  deleteUser(id);
  dialog.dialog('close');
}

function onStart() {
  getUsersFromServer();
}

// ------------- other functions

function resetInvalid() {
  $inputs.removeClass(INVALID_INPUT_CLASS);
}

function getUsersFromServer() {
  return fetch(CONTACTS_URL)
    .then(resp => resp.json())
    .then(setUsers)
    .then(renderUsers)
    .catch(resp => alert(CATCH_ERROR));
}

function setUsers(listFromServer) {
  return (users = listFromServer);
}

function renderUsers() {
  const usersHtml = users.map(makeUserHtml).join('\n');

  $usersList.html(usersHtml);
}

function makeUserHtml(user) {
  user.date = user.date.slice(0,10);

  return userTemplate
    .replace(/\{\{id\}\}/g, user.id)
    .replace('{{name}}', user.name)
    .replace('{{surname}}', user.surname)
    .replace('{{phone}}', user.phone)
    .replace('{{email}}', user.email)
    .replace('{{birth}}', user.date)
    .replace('{{userRecordClass}}', USER_CLASS)
    .replace('{{editButtonClass}}', EDIT_BTN_CLASS)
    .replace('{{editButtonLabel}}', EDIT_BTN_LABEL)
    .replace('{{deleteButtonClass}}', DEL_BTN_CLASS)
    .replace('{{deleteButtonLabel}}', DEL_BTN_LABEL);
}

function fillFormFromUser(userId) {
  const user = users.find(el => el.id == userId);

  if (!user) { return; }

  $inputName.val(user.name);
  $inputSurname.val(user.surname);
  $inputPhone.val(user.phone);
  $inputEmail.val(user.email);
  $inputBirth.val(user.date);
}

function saveUser(userId) {
  const user = users.find(el => el.id == userId);

  if (!user) { return; }
  
  user.name = $inputName.val();
  user.surname = $inputSurname.val();
  user.phone = $inputPhone.val();
  user.email = $inputEmail.val();
  user.date = $inputBirth.val();

  fetch(`${CONTACTS_URL}/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .catch(resp => alert(CATCH_ERROR));

  renderUsers();
}

function addUserFromForm() {  
  const user = fillUserFromForm();

  if (user == null) { return; }

  fetch(CONTACTS_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(addUser)
    .catch(resp => alert(CATCH_ERROR));

  dialog.dialog('close');  
}

function fillUserFromForm() {
  let user = {}

  user.name = $inputName.val();
  user.surname = $inputSurname.val();
  user.phone = $inputPhone.val();
  user.email = $inputEmail.val();
  user.date = $inputBirth.val();

  return user;
}

function checkInputValue(value) {
  return !!value.trim();
}

function addUser(user) {
  users.push(user);

  renderUsers();
}

function deleteUser(userId) {
  fetch(`${CONTACTS_URL}/${userId}`,
    {
      method: 'DELETE'
    })
    .catch(resp => alert(CATCH_ERROR));

  users = users.filter(user => user.id != userId);

  renderUsers();  
}
