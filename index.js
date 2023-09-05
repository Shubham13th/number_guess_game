// generate a random number between 1 to 100
let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultparas')

const p = document.createElement('p');

// that guess number will store in prevGuess
let prevGuess = [];
let numGuess = 1;

let playGame = true

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess)
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('please enter a valid number');
    } else if (guess < 1) {
        alert('please enter number greater than 1 or less than 100');
    } else if (guess > 100) {
        alert('please enter number less than 100 of greater than 1');
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("You guessed it right", "purple");
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("You have entered a smaller number", "blue");
    } else if (guess > randomNumber) {
        displayMessage("you have entered a larger number", "red")
    }
}

function displayMessage(message, color) {
    lowOrHi.innerHTML = `<h3>${message}</h3>`;
    lowOrHi.style.color = color;
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess} `;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id="newGame">Start new Game</h3>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
  }

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${10 - numGuess} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}