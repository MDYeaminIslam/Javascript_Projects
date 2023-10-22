let randomNumber = parseInt(Math.floor(Math.random() * 100 + 1));
console.log(randomNumber);

let background = document.querySelector('.container');
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
let p = document.createElement('p');

let previousGuesses = [];
let numGuesses = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number greater than 1!');
  } else if (guess > 100) {
    alert('Please enter a number less than 100!');
  } else {
    previousGuesses.push(guess);
    if (guess === 11) {
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
    displayMessage(`You guessed correctly!`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is Too low! Try again!`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is Too High! Try again!`);
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  numGuesses++;
  remaining.innerHTML = `${11 - numGuesses} `;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', ''); //disables the input text field
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuesses = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuesses} `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}

// changing the background color of the page

const colorCode = ['#155263', '#00bbf0', '#FF33FF', '#347474', '#00B3E6','#fd5959','#f70776'];

setInterval(() => {
  const randomColor = colorCode[Math.floor(Math.random() * colorCode.length)];
  background.style.backgroundColor = randomColor;
}, 2000);
