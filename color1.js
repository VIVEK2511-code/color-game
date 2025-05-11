const colorCodeContainer = document.getElementById('color-code');
const scoreContainer = document.getElementById('score');
const optionContainer = document.getElementById('options-container');

let score = 0;
let randomColor = null;

function generateRandomNumberBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function incrementScore() {
    score += 1;
    scoreContainer.innerText = score;
}

function validateTheResult(event) {
    const selectedColor = event.target.style.backgroundColor;
    if (selectedColor === randomColor) {
        incrementScore();
    } else {
        score = 0;
        scoreContainer.innerText = score;
    }
    window.localStorage.setItem("score", score);
    startGame();
}

function generateColorRgb() {
    const red = generateRandomNumberBetween(0, 255);
    const green = generateRandomNumberBetween(0, 255);
    const blue = generateRandomNumberBetween(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function startGame() {
    score = parseInt(window.localStorage.getItem('score')) || 0;
    scoreContainer.innerText = score;
    optionContainer.innerHTML = '';
    randomColor = generateColorRgb();
    colorCodeContainer.innerText = randomColor;

    const answerIndex = generateRandomNumberBetween(0, 5);

    for (let i = 0; i < 6; i++) {
        const div = document.createElement("div");
        div.style.backgroundColor = i === answerIndex ? randomColor : generateColorRgb();
        div.addEventListener("click", validateTheResult); // ✅ Add click handler
        optionContainer.appendChild(div);
    }
}

window.addEventListener("load", startGame);
