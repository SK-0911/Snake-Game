console.log("Let the game begin!");

let snake = [
    { top: 240, left: 240 },
];

let direction = { key: "ArrowRight", dx: 20, dy: 0 };

let food = null;

let score = 0;

let highScore = 0;

let speed =250;


window.addEventListener('keydown', e => {
    // console.log(e.key);
    const newDirection = getDirection(e.key);

    // This is to prevent the snake from going in the opposite direction, which would cause it to eat itself.
    // For example, if the snake is going right, it can't go left and vice versa. if it's going up, it can't go down and vice versa.
    const allowedChange = Math.abs(direction.dx) !== Math.abs(newDirection.dx);

    if (allowedChange) direction = newDirection;

    // To pause the game
    if (e.key === ' ') {
        alert("Game Paused!\nPress OK to continue.");
    }
});


function getDirection(key) {
    switch (key) {
        case 'ArrowUp' || 'w':
            return { key, dx: 0, dy: -20 };
        case 'ArrowDown' || 's':
            return { key, dx: 0, dy: 20 };
        case 'ArrowLeft' || 'a':
            return { key, dx: -20, dy: 0 };
        case 'ArrowRight' || 'd':
            return { key, dx: 20, dy: 0 };
        default:
            return direction;
    }
}

function moveSnake() {
    // head is an object with top and left properties which came from the first element of the snake array
    // Object.assign() is used to copy the head object
    const head = Object.assign({}, snake[0]); // copy head
    head.top += direction.dy;
    head.left += direction.dx;

    // unshift() adds an element to the beginning of an array
    snake.unshift(head);

    // // Upper wall
    // if (snake[0].top < 0) snake[0].top = 480;
    //
    // // Left wall
    // if (snake[0].left < 0) snake[0].left = 480;
    //
    // // Lower wall
    // if (snake[0].top > 480) snake[0].top = 0;
    //
    // // Right wall
    // if (snake[0].left > 480) snake[0].left = 0;

    // if the snake doesn't eat food, remove the tail
    if (!eatFood()) snake.pop();
}


function randomFood() {
    food = {
        top: Math.floor(Math.random() * 20) * 20,
        left: Math.floor(Math.random() * 20) * 20
    };
}

function eatFood() {
    if (snake[0].top === food.top && snake[0].left === food.left) {
        food = null;
        return true;
    }
    return false;
}


function gameOver() {
    // if the snake hits the wall, game over
    if(snake[0].top < 0 || snake[0].left < 0 || snake[0].top > 480 || snake[0].left > 480){
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].top === snake[0].top && snake[i].left === snake[0].left)
            return true;
    }

    return false;
}


function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('high-score').innerText = 'High Score: ' + highScore;
}


function gameLoop() {
    // console.log("Game Loop");
    if (gameOver()) {
        alert("Game Over!");
        if (score > highScore) {
            highScore = score;
        }

        // reset everything
        score = 0;
        snake = [{ top: 240, left: 240 }];
        direction = { key: 'ArrowRight', dx: 20, dy: 0 };
        speed = 250;
        food = null;
        randomFood();
    }

    setTimeout(() => {
        document.getElementById("game-board").innerHTML = "";
        moveSnake();
        if (!food){
            randomFood();
            speed -= 5;
            console.log(speed);
            score += 10;
        }
        if (eatFood()){
            document.getElementById("score").innerHTML = `Score: ${score}`;
        }
        updateScore();
        drawSnake();
        drawFood();
        gameLoop();
    }, speed);
}


function drawSnake() {
    // console.log("Draw Snake");
    snake.forEach((part, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.top = `${part.top}px`;
        snakeElement.style.left = `${part.left}px`;
        snakeElement.classList.add('snake');
        if (index === 0) snakeElement.classList.add('head');
        document.getElementById('game-board').appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.top = `${food.top}px`;
    foodElement.style.left = `${food.left}px`;
    foodElement.classList.add('food');
    document.getElementById('game-board').appendChild(foodElement);
}

drawSnake();
randomFood();
gameLoop();

