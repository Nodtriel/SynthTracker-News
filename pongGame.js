const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Synthwave Colors
const colors = {
    paddle: '#ff00ff',
    ball: '#00ffff',
    background: '#1a1a2e',
    text: '#f5f5f5',
    button: '#ff00ff',
    buttonText: '#000000',
    buttonHover: '#ff69b4',
    score: '#ffffff'
};

const paddleWidth = 10, paddleHeight = 100, ballRadius = 7;
let upArrowPressed = false, downArrowPressed = false, wKeyPressed = false, sKeyPressed = false, shiftPressed = false;
let playerScore = 0, computerScore = 0;
let gameState = 'difficultySelection'; // 'difficultySelection', 'playing', 'gameOver'
let gameOverMessage = "";
let computerSpeed = 3; // Default computer speed

const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: colors.paddle,
    dy: 5
};

const computer = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: colors.paddle,
    dy: computerSpeed
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4,
    dy: 4,
    color: colors.ball
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "20px Arial";
    context.fillText(text, x, y);
}

function drawCenteredText(text, y, color) {
    context.fillStyle = color;
    context.font = "40px Arial";
    context.textAlign = "center";
    context.fillText(text, canvas.width / 2, y);
}

function drawButton(text, x, y, width, height) {
    context.fillStyle = colors.button;
    context.fillRect(x, y, width, height);
    context.fillStyle = colors.buttonText;
    context.font = "20px Arial";
    context.textAlign = "center";
    context.fillText(text, x + width / 2, y + height / 1.5);
}

function isInsideButton(x, y, bx, by, bwidth, bheight) {
    return x >= bx && x <= bx + bwidth && y >= by && y <= by + bheight;
}

function movePaddle() {
    let speed = shiftPressed ? player.dy * 2 : player.dy;
    if ((upArrowPressed || wKeyPressed) && player.y > 0) {
        player.y -= speed;
    } else if ((downArrowPressed || sKeyPressed) && (player.y < canvas.height - player.height)) {
        player.y += speed;
    }
}

function moveComputerPaddle() {
    if (ball.y < computer.y + computer.height / 2) {
        computer.y -= computer.dy;
    } else if (ball.y > computer.y + computer.height / 2) {
        computer.y += computer.dy;
    }

    if (computer.y < 0) {
        computer.y = 0;
    } else if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    let playerX = player.x + player.width;
    let computerX = computer.x;
    let playerCollision = ball.x - ball.radius < playerX && ball.y > player.y && ball.y < player.y + player.height;
    let computerCollision = ball.x + ball.radius > computerX && ball.y > computer.y && ball.y < computer.y + computer.height;

    if (playerCollision || computerCollision) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        checkWin();
        resetBall();
    } else if (ball.x - ball.radius < 0) {
        computerScore++;
        checkWin();
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function checkWin() {
    if (playerScore === 3) {
        gameState = 'gameOver';
        gameOverMessage = "YOU WIN!";
    } else if (computerScore === 3) {
        gameState = 'gameOver';
        gameOverMessage = "GAME OVER";
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOverMessage = "";
    resetBall();
    gameState = 'difficultySelection';
}

function startGame(difficulty) {
    switch (difficulty) {
        case 'Easy':
            computer.dy = 2;
            break;
        case 'Medium':
            computer.dy = 4;
            break;
        case 'Hard':
            computer.dy = 6;
            break;
    }
    resetGame();
    gameState = 'playing';
}

function update() {
    if (gameState !== 'playing') return;
    movePaddle();
    moveComputerPaddle();
    moveBall();
}

function render() {
    // Draw the background gradient
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#141e30');
    gradient.addColorStop(1, '#243b55');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'difficultySelection') {
        drawCenteredText("Select Difficulty", canvas.height / 4, colors.text);
        drawButton("Easy", canvas.width / 2 - 50, canvas.height / 2 - 60, 100, 40);
        drawButton("Medium", canvas.width / 2 - 50, canvas.height / 2, 100, 40);
        drawButton("Hard", canvas.width / 2 - 50, canvas.height / 2 + 60, 100, 40);
    } else if (gameState === 'playing') {
        drawRect(player.x, player.y, player.width, player.height, player.color);
        drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
        drawArc(ball.x, ball.y, ball.radius, ball.color);

        drawText(playerScore, canvas.width / 4, 20, colors.score);
        drawText(computerScore, 3 * canvas.width / 4, 20, colors.score);
    } else if (gameState === 'gameOver') {
        drawCenteredText(gameOverMessage, canvas.height / 2, colors.text);
        drawButton("Retry", canvas.width / 2 - 50, canvas.height / 2 + 40, 100, 40);
    }
}

function gameLoop() {
    update();
    render();
}

setInterval(gameLoop, 1000 / 60);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (gameState === 'difficultySelection') {
        if (isInsideButton(x, y, canvas.width / 2 - 50, canvas.height / 2 - 60, 100, 40)) {
            startGame('Easy');
        } else if (isInsideButton(x, y, canvas.width / 2 - 50, canvas.height / 2, 100, 40)) {
            startGame('Medium');
        } else if (isInsideButton(x, y, canvas.width / 2 - 50, canvas.height / 2 + 60, 100, 40)) {
            startGame('Hard');
        }
    } else if (gameState === 'gameOver') {
        if (isInsideButton(x, y, canvas.width / 2 - 50, canvas.height / 2 + 40, 100, 40)) {
            resetGame();
        }
    }
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            upArrowPressed = true;
            break;
        case 'ArrowDown':
            downArrowPressed = true;
            break;
        case 'Shift':
            shiftPressed = true;
            break;
        case 'w':
        case 'W':
            wKeyPressed = true;
            break;
        case 's':
        case 'S':
            sKeyPressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            upArrowPressed = false;
            break;
        case 'ArrowDown':
            downArrowPressed = false;
            break;
        case 'Shift':
            shiftPressed = false;
            break;
        case 'w':
        case 'W':
            wKeyPressed = false;
            break;
        case 's':
        case 'S':
            sKeyPressed = false;
            break;
    }
});
