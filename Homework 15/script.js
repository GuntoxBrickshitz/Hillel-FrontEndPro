'use strict';

const CLASS_LIST_ITEM = 'list-item';
const CLASS_ITEM_SELECTED = 'selected';
const WAIT_MESSAGE = 'please wait, requesting url ';
const CONNECTION_ERROR = 'failed request to url ';

const albumsList = document.querySelector('#albumsList');
const photosList = document.querySelector('#photosList');
const listItemTemplate = document.querySelector('#listItemTemplate').innerHTML;
let selectedAlbumId = null;

albumsList.addEventListener('click', onClickListItem);

fetch('https://jsonplaceholder.typicode.com/albums')
.then(response => {  
  return response.json();
})
.then(showAlbumsList);

function showAlbumsList(listFromServer) {
  listFromServer.forEach(convertAlbumsFromServer);
}

function convertAlbumsFromServer(listElement) {
  const album = {
    text: listElement.title,
    id: listElement.id,
  }
  addAlbum(album);  
}

function addAlbum(album) {  
  const listItemHtml = listItemTemplate
    .replace('{{class}}', CLASS_LIST_ITEM)
    .replace('{{id}}', album.id)
    .replace('{{text}}', album.text);
  const listItemElement = htmlToElement(listItemHtml);

  albumsList.appendChild(listItemElement);
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

function onClickListItem(event) {
  const clickedItem = event.target;
  const itemClass = clickedItem.classList;

  if (!isSelected(itemClass)) {
    onSelectAlbum(clickedItem, itemClass);
  }
}

function isSelected(elementClassList) {
  return elementClassList.contains(CLASS_ITEM_SELECTED);
}

function onSelectAlbum(itemId, itemClass) {
  //const albumId = itemId.getAttribute('id').slice(6);
  deselectPrevItem();
  selectItem(itemId, itemClass);
  showAlbumContent();
}

function deselectPrevItem() {
  if (selectedAlbumId != null) {
    const prevSelectedAlbum = document.querySelector('#' + selectedAlbumId);
    prevSelectedAlbum.classList.remove(CLASS_ITEM_SELECTED);
  }
}

function selectItem(itemId, itemClass) {
  selectedAlbumId = itemId.getAttribute('id');
  itemClass.add(CLASS_ITEM_SELECTED);
}

function showAlbumContent() {
  const albumId = selectedAlbumId.slice(6);
  const albumUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId;
  
  showWaitMessage(albumUrl);

  fetch(albumUrl)
  .then(response => {  
    return response.json();
  })
  .then(showPhotosList)
  .catch(response => showConnectionError(albumUrl));
}

function showWaitMessage(url) {
  const message = WAIT_MESSAGE + url;
  photosList.innerHTML = message;
  console.log(message);  
}

function showPhotosList(listFromServer) {
  listFromServer.forEach(convertPhotosFromServer);
}

function convertPhotosFromServer(listElement) {
  console.log(listElement);
}

function showConnectionError(url) {
  const message = CONNECTION_ERROR + url;  
  photosList.innerHTML = message;
  console.log(message);  
}

