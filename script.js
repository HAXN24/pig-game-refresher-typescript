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
// hold Button
const holdButton = document.querySelector('.btn--hold');
// currentScorePlayer1
const currentScore0 = document.querySelector('.current-score#current--0');
// currentScorePlayer2
const currentScore1 = document.querySelector('.current-score#current--1');
// Player 1
const activePlayer1 = document.querySelector(`.player.player--0`);
//Player 2
const activePlayer2 = document.querySelector(`.player.player--1`);
// function to update actual score
const updateActualScore = (actualScore, player) => {
    const actualScoreElement = document.querySelector(`.score#score--${player}`);
    return (actualScoreElement && (actualScoreElement.textContent = String(actualScore)));
};
// function to update current score
const updateCurrentScore = (currScore, player) => {
    // currentScorePlayer1
    const currentScoreElement = document.querySelector(`.current-score#current--${player}`);
    return (currentScoreElement && (currentScoreElement.textContent = String(currScore)));
};
// remove Active Player
const removeActivePlayer = (active) => active && active.classList.remove(`player--active`);
// add active player
const addActivePlayer = (active) => active && active.classList.add(`player--active`);
// object variable for player 1 scores
const playerScores = {
    player1: {
        current: 0,
        actual: 0,
    },
    player2: {
        current: 0,
        actual: 0,
    },
};
const updateScores = (player) => {
    // initialize current and actual score back to 0
    if (player === 1) {
        playerScores.player1.current = 0;
        playerScores.player1.actual = 0;
        updateCurrentScore(playerScores.player1.current, 0);
        updateActualScore(playerScores.player1.actual, 0);
    }
    else if (player === 2) {
        playerScores.player2.current = 0;
        playerScores.player2.actual = 0;
        updateCurrentScore(playerScores.player2.current, 1);
        updateActualScore(playerScores.player2.actual, 1);
    }
};
// Roll Dice Logic
if (rollDiceButton) {
    rollDiceButton.addEventListener(`click`, () => {
        // initialize roll dice
        const initiateRandomNum = getRandomInt(1, 6);
        // show dice image
        diceImage === null || diceImage === void 0 ? void 0 : diceImage.classList.remove('hidden');
        // Change the src attribute
        if (diceImage) {
            if (activePlayer1 === null || activePlayer1 === void 0 ? void 0 : activePlayer1.classList.contains(`player--active`)) {
                playerScores.player1.current += initiateRandomNum;
                currentScore0 &&
                    (currentScore0.textContent = String(playerScores.player1.current));
                if (initiateRandomNum === 1) {
                    removeActivePlayer(activePlayer1);
                    diceImage.setAttribute('src', 'dice-1.png');
                    // initialize current and actual score back to 0
                    updateScores(1);
                    addActivePlayer(activePlayer2);
                }
                else {
                    diceImage.setAttribute('src', `dice-${initiateRandomNum}.png`);
                }
            }
            else {
                addActivePlayer(activePlayer2);
                const initiateRandomNum = getRandomInt(1, 6);
                playerScores.player2.current += initiateRandomNum;
                currentScore1 &&
                    (currentScore1.textContent = String(playerScores.player2.current));
                if (initiateRandomNum === 1) {
                    removeActivePlayer(activePlayer2);
                    diceImage.setAttribute('src', 'dice-1.png');
                    // add current score to actual score
                    playerScores.player2.current += playerScores.player2.actual;
                    // update actual score
                    updateActualScore(playerScores.player2.actual, 1);
                    // initialize current and actual score back to 0
                    updateScores(2);
                    addActivePlayer(activePlayer1);
                }
                else {
                    diceImage.setAttribute('src', `dice-${initiateRandomNum}.png`);
                }
            }
        }
    });
}
// function for hold button logic
const scoreLogicHoldButton = (player) => {
    if (player === 1) {
        removeActivePlayer(activePlayer1);
        // add current score to actual score
        playerScores.player1.actual += playerScores.player1.current;
        // update actual score
        updateActualScore(playerScores.player1.actual, 0);
        // initialize current score back to 0
        playerScores.player1.current = 0;
        updateCurrentScore(playerScores.player1.current, 0);
        addActivePlayer(activePlayer2);
    }
    else if (player === 2) {
        removeActivePlayer(activePlayer2);
        // add current score to actual score
        playerScores.player2.actual += playerScores.player2.current;
        // update actual score
        updateActualScore(playerScores.player2.actual, 1);
        // initialize current score back to 0
        playerScores.player2.current = 0;
        updateCurrentScore(playerScores.player2.current, 1);
        addActivePlayer(activePlayer1);
    }
};
// Hold Button Logic
if (holdButton) {
    holdButton.addEventListener(`click`, () => {
        if (activePlayer1 === null || activePlayer1 === void 0 ? void 0 : activePlayer1.classList.contains(`player--active`)) {
            scoreLogicHoldButton(1);
        }
        else {
            scoreLogicHoldButton(2);
        }
    });
}
