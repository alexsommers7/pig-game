'use strict';

// dom elements
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const p0Section = document.querySelector(".player--0");
const p1Section = document.querySelector(".player--1");
let p0CurrentEl = document.querySelector("#current--0");
let p1CurrentEl = document.querySelector("#current--1");
let p0TotalEl = document.querySelector("#score--0");
let p1TotalEl = document.querySelector("#score--1");
const dice = document.querySelector(".dice");

// initialize global trackers
let scores, current, activePlayer, playing;

// switch player function
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  p0Section.classList.toggle("player--active");
  p1Section.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  current = 0;
}

// roll function
btnRoll.addEventListener("click", function () {
  if (playing) {
    let numRolled = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${numRolled}.png`;
    dice.classList.remove("hide");
    if (numRolled === 1) {
      document.querySelector(`#current--${activePlayer}`).textContent = scores[activePlayer] = document.querySelector(`#score--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
    else {
      current += numRolled;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    }
  }
});

// hold function
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      dice.classList.add("hide");
      playing = false;
    } else switchPlayer();
  }
});

// new game function
const newGame = () => {
  p0TotalEl.textContent = p0CurrentEl.textContent = p1TotalEl.textContent = p1CurrentEl.textContent = current = activePlayer = 0;
  p1Section.classList.remove("player--active");
  p0Section.classList.remove("player--winner");
  p1Section.classList.remove("player--winner");
  p0Section.classList.add("player--active");
  dice.classList.add("hide");
  scores = [0, 0];
  playing = true;
}

// new game on load and click
newGame();
btnNewGame.addEventListener("click", newGame);