import './styles.css';

const messages = {};

const message = {
    id: Date.now(),
    author: 'Andrew',
    text: 'wuzzap',
};

const ws = new WebSocket('wss://fep-app.herokuapp.com/');
//document.addEventListener('keydown', onKeyPress);

ws.onopen = onSocketOpen;
ws.onmessage = onSocketMessage;

function onSocketMessage(message) {
    console.log(message);

    const packetData = JSON.parse(message.data);

    console.log(packetData);
    if (!messages[packetData.payload.id]) {
        messages[packetData.payload.id] = createMessageElement(packetData.payload);
    }

    //updateState(packetData.payload);

    console.log('messages', messages);
}

function onSocketOpen() {
    console.log('socket open');
    // notifyStateChange();
}

function notifyStateChange() {
    ws.send(
        JSON.stringify({
            action: 'message',
            payload: message
        })
    );
}

function createMessageElement(message) {
    const el = document.createElement('div');

    el.className = 'message';
    el.textContent = message.name;

    document.body.append(el);

    return el;
}

function updateState(message) {
    const messageEl = messages[message.id];
    messageEl.style.top = message.top + 'px';
    messageEl.style.left = message.left + 'px';
    messageEl.style.backgroundColor = message.color;
}

function onKeyPress(e) {
    switch (e.code) {
        case 'ArrowUp':
            changemessagePosition(-MOVE_STEP, 0);
            break;
        case 'ArrowLeft':
            changemessagePosition(0, -MOVE_STEP);
            break;
        case 'ArrowDown':
            changemessagePosition(MOVE_STEP, 0);
            break;
        case 'ArrowRight':
            changemessagePosition(0, MOVE_STEP);
            break;
    }
    notifyStateChange();
}

function changemessagePosition(topDiff, leftDiff) {
    message.top += topDiff;
    message.left += leftDiff;
}

// {
//     action: 'setState',
//     payload: {}
// },
// {
//     action: 'move',
//     payload: {top, left}
// }

// {
//     action: 'message',
//     payload: {
//         author: 'Alex',
//         message: 'Hello world'
//     }
// }
