import './styles.css';
import { messageTemplate } from './templates.js';

const CLASS_MESSAGE_ITEM = 'message-item';
const inputs = document.querySelectorAll('.form-input');
const messageList = document.querySelector('#messageList');
const formSendMessage = document.querySelector('#formSendMessage');

const ws = new WebSocket('wss://fep-app.herokuapp.com/');

ws.onopen = onSocketOpen;
ws.onmessage = onSocketMessage;

formSendMessage.addEventListener('submit', onSubmitSendForm);

function onSubmitSendForm(event) {
    const inputMessage = messageFromInput();
    
    event.preventDefault();
    notifyStateChange(inputMessage);
}

function onSocketMessage(wsMessage) {
    const packetData = JSON.parse(wsMessage.data);    
    const message = packetData.payload;

    if (!message || !message.author || !message.message) {
        return;
    }

    addMessageElement(message);
    scrollBottom();
}

function onSocketOpen() {
    console.log('socket open');
    // notifyStateChange();
}

function notifyStateChange(message) {
    ws.send(
        JSON.stringify({
            action: 'message',
            payload: message
        })
    );
}

function messageFromInput() {
    return {
        author: inputs[0].value,
        message: inputs[1].value
    }
}

function addMessageElement(message) {
    const el = document.createElement('div');

    el.className = CLASS_MESSAGE_ITEM;
    el.innerHTML = makeMessageHtml(message);

    messageList.append(el);
}

function makeMessageHtml(message) {
    return messageTemplate
        .replace('{{author}}', message.author)
        .replace('{{text}}', message.message);
}

function scrollBottom() {
    messageList.scrollTop = messageList.scrollHeight;
}