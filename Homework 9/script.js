'use strict';

// <td><button type="button" class="del-button">Delete</button></td>

const contactsForm = document.querySelector('#contactsForm');
const contactsList = document.querySelector('#contactsList');
const contactTemplate = document.querySelector('#contactTemplate').innerHTML;
const btnAddContact = document.querySelector('#buttonAddContact');

const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputPhoneNumber = document.querySelector('#inputPhoneNumber');

btnAddContact.addEventListener('click', onSubmitBtnAddContact);
contactsList.addEventListener('click', onClickContactsList);
contactsForm.addEventListener('focus', onFocusInput, true);
contactsForm.addEventListener('blur', onBlurInput, true);

function onSubmitBtnAddContact(event) {    
  event.preventDefault(); 
  requestAddContact();  
}

function requestAddContact() {
  let contact = checkInputs();

  if (contact != null) {
    addContact(contact);
  }
}

function checkInputs() {
  let contactItem = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    phoneNumber: inputPhoneNumber.value
  }

  for (let key in contactItem) {    
    if (!checkInputValue(contactItem[key])){
      return null;
    }
  }

  return contactItem;
}

function checkInputValue(value) {
  console.log(value);
  return !!value.trim();
}

function addContact(contact) {
  const newContactRow = document.createElement('tr');
  newContactRow.className = 'contact-element';

  newContactRow.innerHTML = contactTemplate
    .replace('{{firstName}}', contact.firstName)
    .replace('{{lastName}}', contact.lastName)
    .replace('{{phoneNumber}}', contact.phoneNumber);

  contactsList.appendChild(newContactRow);
}

function onClickContactsList(event) {
  if (event.target.classList.contains('contact-action')) {
    deleteContact(event.target.closest('.contact-element'));      
  }
}

function deleteContact(contactElement) {
  contactElement.remove();
}

function onFocusInput(event) {
  event.target.classList.remove('error');
}

function onBlurInput(event) {
  if (!checkInputValue(event.target.value)) {
    event.target.classList.add('error');  
  }  
}




