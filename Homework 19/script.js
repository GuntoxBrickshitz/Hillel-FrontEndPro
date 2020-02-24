'use strict';

const CLASS_STICKER_SHEET = 'sticker-sheet';
const CLASS_STICKER_PANEL = 'sticker-panel';
const CLASS_STICKER_TEXT = 'text-field';
const TEXT_COLUMNS = 16;
const TEXT_ROWS = 10;
const CLASS_STICKER_BUTTON = 'sticker-button';

const DEL_BUTTON = {
  className: 'sticker-button',
  label: 'X',
};
const DRAGGABLE = {
  className: 'drag-holder',
  label: 'drag',
};
const DRAG_OPTIONS = {
  handle: `.${DRAGGABLE.className}`,
  // containment: 'parent'
}

const $buttonAddSticker = $('#buttonAddSticker');
const $dialogForm = $("#dialogForm");
const $newStickerText = $("#newStickerText");
const $stickerBoard = $('#stickerBoard');
const stickerTemplate = $('#stickerTemplate').html();

const dialog = $dialogForm.dialog({
  autoOpen: false,
  height: 200,
  width: 150,
  modal: true,
  buttons: {
    Cancel: closeModal,
    Add: onClickModalAddButton  
  },
  // close: function() {}
});

let stickers = [];

$buttonAddSticker.on('click', onClickAddButton);
$stickerBoard.on('click', `.${CLASS_STICKER_BUTTON}`, onClickStickerButton); // `.${CLASS_STICKER_BUTTON}`,
$stickerBoard.focusout(onFocusoutSticker);

start();

function onClickAddButton() {
  openModal();
}

function onClickStickerButton(event) {
  const $stickerSheet = $(event.target).closest(`.${CLASS_STICKER_SHEET}`);
  const stickerId = $stickerSheet.data('id');  

  event.preventDefault();
  deleteSticker(stickerId);
}

function onFocusoutSticker(event) {
  const $element = $(event.target);
  const pos = $element.offset();

  switch (true) {
    case $element.hasClass(CLASS_STICKER_TEXT): // CLASS_STICKER_SHEET

      saveSticker(
        $element.parent().data('id'),
        $element.val(),
        pos.top,
        pos.left,
      );
    break;
  }
}

function onClickModalAddButton() {
  const text = $newStickerText.val();

  addSticker(text);
}

function start() {
  getStickersFromStorage();
  showStickers();
}

function openModal() {
  dialog.dialog('open');
}

function closeModal() {
  dialog.dialog('close');
}

function getStickersFromStorage() {
  const listFromStorage = localStorage.getItem('stickers');
 
  stickers = JSON.parse(listFromStorage) || [];
}

function showStickers() {
  stickers.forEach(addStickerElement);
  $(`.${CLASS_STICKER_SHEET}`).draggable(DRAG_OPTIONS);
}

function addStickerElement(sticker) {
  const $element = $(makeStickerHtml(sticker));

  $stickerBoard.append($element);
  $element.draggable(DRAG_OPTIONS);
  $element.css({ position: 'absolute', top: `${sticker.posTop}px`, left: `${sticker.posLeft}px` });
}

function makeStickerHtml(sticker) {
  return stickerTemplate
      .replace('{{id}}', sticker.id)
      .replace('{{textValue}}', sticker.text)
      .replace('{{stickerSheet}}', CLASS_STICKER_SHEET)
      .replace('{{stickerPanel}}', CLASS_STICKER_PANEL)
      .replace('{{draggable}}', DRAGGABLE.className)
      .replace('{{draggableLabel}}', DRAGGABLE.label)
      .replace('{{buttonDelSticker}}', DEL_BUTTON.className)
      .replace('{{buttonDelLabel}}', DEL_BUTTON.label)
      .replace('{{stickerText}}', CLASS_STICKER_TEXT)
      .replace('{{textColumns}}', TEXT_COLUMNS)
      .replace('{{textRows}}', TEXT_ROWS);
}

function deleteSticker(stickerId) {
  const index = stickers.findIndex(item => item.id == stickerId);
  const $stickerSheet = $stickerBoard.find(`[data-id=${stickerId}]`);

  if (index == -1) { return; }

  stickers.splice(index, 1);
  saveStickersToStorage();

  $stickerSheet.remove();
}

function addSticker(text) {  
  const timestamp = (new Date()).getTime().toString();
  const newSticker = {
    id: timestamp,
    text: text.toString(),
    posTop: 100,
    posLeft: 50,
  }

  stickers.push(newSticker);
  saveStickersToStorage();

  addStickerElement(newSticker);
  closeModal();
}

function saveSticker(stickerId, text, top = 100, left = 50) {
  const index = stickers.findIndex(item => item.id == stickerId);

  console.log(index, top, left);

  if (index == -1) { return; }

  stickers[index].text = text;
  stickers[index].posTop = top;
  stickers[index].posLeft = left;

  saveStickersToStorage();
}

function saveStickersToStorage() {
  const listToStorage = JSON.stringify(stickers);
  
  localStorage.setItem('stickers', listToStorage);
}
