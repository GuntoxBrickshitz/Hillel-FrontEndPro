import './styles.css';
const MOVE_STEP = 20;

const balls = {};

const ball = {
    id: Math.random(),
    name: 'Alex',
    color: 'green',
    top: 50,
    left: 50
};
const ws = new WebSocket('wss://fep-app.herokuapp.com/');
document.addEventListener('keydown', onKeyPress);

ws.onopen = onSocketOpen;
ws.onmessage = onSocketMessage;

function onSocketMessage(message) {
    console.log(message);

    const packetData = JSON.parse(message.data);

    console.log(packetData);
    if (!balls[packetData.payload.id]) {
        balls[packetData.payload.id] = createBallElement(packetData.payload);
    }

    updateState(packetData.payload);

    console.log('balls', balls);
}

function onSocketOpen() {
    console.log('socket open');
    notifyStateChange();
}

function notifyStateChange() {
    ws.send(
        JSON.stringify({
            action: 'setState',
            payload: ball
        })
    );
}

function createBallElement(ball) {
    const el = document.createElement('div');

    el.className = 'ball';
    el.textContent = ball.name;

    document.body.append(el);

    return el;
}

function updateState(ball) {
    const ballEl = balls[ball.id];
    ballEl.style.top = ball.top + 'px';
    ballEl.style.left = ball.left + 'px';
    ballEl.style.backgroundColor = ball.color;
}

function onKeyPress(e) {
    switch (e.code) {
        case 'ArrowUp':
            changeBallPosition(-MOVE_STEP, 0);
            break;
        case 'ArrowLeft':
            changeBallPosition(0, -MOVE_STEP);
            break;
        case 'ArrowDown':
            changeBallPosition(MOVE_STEP, 0);
            break;
        case 'ArrowRight':
            changeBallPosition(0, MOVE_STEP);
            break;
    }
    notifyStateChange();
}

function changeBallPosition(topDiff, leftDiff) {
    ball.top += topDiff;
    ball.left += leftDiff;
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
