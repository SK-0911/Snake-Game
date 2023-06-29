# Snake-Game


## Documentation

Creating a Snake Game with HTML, CSS, and JavaScript

## Code

### 1. Setting Up the Game Environment

Here is the HTML structure for the game board, 
with the div for the game, the score, and the high score.

```
<!DOCTYPE html>
<html>
<head>
    <title>Snake Game</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div id="score-board">
        <div id="score">Score: 0</div>
        <div id="high-score">High Score: 0</div>
    </div>
    <div id="game-board"></div>
    <script src="script.js"></script>
</body>
</html>
```

Now, let's add some style using CSS:

```
#game-board {
    position: relative;
    height: 400px;
    width: 400px;
    border: 1px solid black;
}

#score-board {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.snake {
    background-color: lime;
    position: absolute;
    height: 20px;
    width: 20px;
}

.food {
    background-color: red;
    position: absolute;
    height: 20px;
    width: 20px;
}
```

### 2. Creating the Snake
Next, we'll define our snake and its starting position, 
creating a function to update the snake's position on the game board.

```
// script.js
let snake = [{ top: 200, left: 200 }];
```

### 3. Movement of the Snake
We'll set up the movement logic and control the snake using arrow keys. 
We'll also implement the logic to move the snake to the opposite side 
if it crosses the boundary.

```
// script.js continued
let direction = { key: 'ArrowRight', dx: 20, dy: 0 };

window.addEventListener('keydown', e => {
    const newDirection = getDirection(e.key);
    const allowedChange = Math.abs(direction.dx) !== Math.abs(newDirection.dx);
    if (allowedChange) direction = newDirection;
});

function getDirection(key) {
    switch (key) {
        case 'ArrowUp': return { key, dx: 0, dy: -20 };
        case 'ArrowDown': return { key, dx: 0, dy: 20 };
        case 'ArrowLeft': return { key, dx: -20, dy: 0 };
        case 'ArrowRight': return { key, dx: 20, dy: 0 };
        default: return direction;
    }
}

function moveSnake() {
    const head = Object.assign({}, snake[0]); // copy head
    head.top += direction.dy;
    head.left += direction.dx;
    snake.unshift(head);

    if (snake[0].top < 0) snake[0].top = 380;
    if (snake[0].left < 0) snake[0].left = 380;
    if (snake[0].top > 380) snake[0].top = 0;
    if (snake[0].left > 380) snake[0].left = 0;
}
```

### 4. Creating the Food
Next, we'll generate food for the snake at random positions on the board.

```
// script.js continued
let food = null;

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
```

### 5. Score System
We'll implement a score system to keep track of the score and the high score.

```
// script.js continued
let score = 0;
let highScore = 0;

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('high-score').innerText = 'High Score: ' + highScore;
}
```

### 6. Game Over Condition
We'll implement the game over condition when the snake collides with itself.

```
// script.js continued
function gameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].top === snake[0].top && snake[i].left === snake[0].left)
            return true;
    }
    return false;
}
```

### 7. Drawing the Snake and Food
Finally, we'll draw the snake and food on the game board.

```
// script.js continued
function drawSnake() {
    snake.forEach((part, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.top = `${part.top}px`;
        snakeElement.style.left = `${part.left}px`;
        snakeElement.classList.add('snake');
        if (index === 0) snakeElement.classList.add('head

');
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
```

### 8. Bringing It All Together
Finally, we'll bring all the pieces together and create the game loop.

```
// script.js continued
function gameLoop() {
    if (gameOver()) {
        if (score > highScore) {
            highScore = score;
        }
        score = 0;
        snake = [{ top: 200, left: 200 }];
        direction = { key: 'ArrowRight', dx: 20, dy: 0 };
    }

    setTimeout(() => {
        document.getElementById('game-board').innerHTML = '';
        moveSnake();
        if (!food) randomFood();
        if (eatFood()) score++;
        updateScore();
        drawSnake();
        drawFood();
        gameLoop();
    }, 200);
}

gameLoop();
```

That's it!






