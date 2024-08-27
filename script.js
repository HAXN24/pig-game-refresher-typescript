"use strict";
// TODO: FIX active player logic, FIX actual score sum
// function to randomize number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// diceImage
const diceImage = document.querySelector('.dice');
// hide dice image first
diceImage === null || diceImage === void 0 ? void 0 : diceImage.classList.add('hidden');
// rollDice Button
const rollDiceButton = document.querySelector('.btn--roll');
// currentScorePlayer1
const currentScore0 = document.querySelector('.current-score#current--0');
// currentScorePlayer2
const currentScore1 = document.querySelector('.current-score#current--1');
// Player 1
const activePlayer0 = document.querySelector(`.player.player--0`);
//Player 2
const activePlayer1 = document.querySelector(`.player.player--1`);
// actual Score for player 1
const actualScore0 = document.querySelector('.score#score--0');
// actual Score for player 2
const actualScore1 = document.querySelector('.score#score--1');
// function to update actual score
const updateActualScore = (actualScore) => actualScore0 && (actualScore0.textContent = String(actualScore));
// function to update current score
const updateCurrentScore = (currScore) => currentScore0 && (currentScore0.textContent = String(currScore));
// remove Active Player
const removeActivePlayer = (active) => active && active.classList.remove(`player--active`);
// add active player
const addActivePlayer = (active) => active && active.classList.add(`player--active`);
// variable for currentScorePlayer1
let currentScorePlayer1 = 0;
// variable for actualScorePlayer1
let actualScorePlayer1 = 0;
// variable for currentScorePlayer2
let currentScorePlayer2 = 0;
// variable for actualScorePlayer1
let actualScorePlayer2 = 0;
// Roll Dice Logic
if (rollDiceButton) {
    rollDiceButton.addEventListener(`click`, () => {
        // initialize roll dice
        const initiateRandomNum = getRandomInt(1, 6);
        // show dice image
        diceImage === null || diceImage === void 0 ? void 0 : diceImage.classList.remove('hidden');
        // Change the src attribute
        if (diceImage) {
            if (activePlayer0 === null || activePlayer0 === void 0 ? void 0 : activePlayer0.classList.contains(`player--active`)) {
                currentScorePlayer1 += initiateRandomNum;
                // Check if the element was found
                currentScore0 &&
                    (currentScore0.textContent = String(currentScorePlayer1));
                if (initiateRandomNum === 1) {
                    removeActivePlayer(activePlayer0);
                    diceImage.setAttribute('src', 'dice-1.png');
                    // add current score to actual score
                    actualScorePlayer1 += currentScorePlayer1;
                    // update actual score
                    updateActualScore(actualScorePlayer1);
                    // initialize current score back to 0
                    currentScorePlayer1 = 0;
                    updateCurrentScore(currentScorePlayer1);
                    addActivePlayer(activePlayer1);
                }
                else {
                    diceImage.setAttribute('src', `dice-${initiateRandomNum}.png`);
                }
            }
            else {
                addActivePlayer(activePlayer1);
                const initiateRandomNum = getRandomInt(1, 6);
                currentScorePlayer2 += initiateRandomNum;
                if (currentScore1) {
                    // Access or manipulate the selected element here
                    currentScore1.textContent = String(currentScorePlayer1);
                }
                if (initiateRandomNum === 1) {
                    removeActivePlayer(activePlayer1);
                    diceImage.setAttribute('src', 'dice-1.png');
                    // add current score to actual score
                    actualScorePlayer2 += currentScorePlayer2;
                    // update actual score
                    updateActualScore(actualScorePlayer2);
                    // initialize current score back to 0
                    currentScorePlayer2 = 0;
                    updateCurrentScore(currentScorePlayer2);
                    addActivePlayer(activePlayer0);
                }
                else {
                    diceImage.setAttribute('src', `dice-${initiateRandomNum}.png`);
                }
            }
        }
    });
}
