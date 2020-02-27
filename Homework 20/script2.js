const CONTACTS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
const USER_CLASS = 'user-item';
const EDIT_BTN_CLASS = 'user-button-edit';
const DEL_BTN_CLASS = 'user-button-delete';
const EDIT_BTN_LABEL = 'save';
const DEL_BTN_LABEL = 'del';

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
    'New user': onClickNewUser,
    Cancel: onClickCancel
  },
  close: onCloseDialog
});
const form = dialog.find('form'); //.on('submit', onFormSubmit);

$buttonAddUser.on('click', onClickAddUser);
$usersList.on('click', `.${EDIT_BTN_CLASS}`, onClickEditUser);
$usersList.on('click', `.${DEL_BTN_CLASS}`, onClickDeleteUser);

let users = [];

onStart();

// ------------- functions

function onClickNewUser() {
  
}

function onClickCancel() {
  dialog.dialog('close');
}

function onCloseDialog() {
  form[0].reset();
}
  
function onClickAddUser() {
  dialog.dialog('open');
}

function onClickEditUser() {
  const $element = $(event.target);
  const id = $element.closest(`.${USER_CLASS}`).data('id');
  
  dialog.dialog('open');
}

function onClickDeleteUser() {
  const $element = $(event.target);
  const id = $element.closest(`.${USER_CLASS}`).data('id');
}

function onStart() {
  getUsers();
}

function getUsers() {
  return fetch(CONTACTS_URL)
    .then(resp => resp.json())
    .then(setUsers)
    .then(renderUsers)
    .catch(resp => console.log('fetch fail'));
}

function setUsers(listFromServer) {
  return (users = listFromServer);
}

function renderUsers(listFromServer) {
  const usersHtml = listFromServer.map(makeUserHtml).join('\n');
  $usersList.html(usersHtml);
}

function makeUserHtml(user) {
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
