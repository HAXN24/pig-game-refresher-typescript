// TODO: FIX active player logic, FIX actual score sum

// function to randomize number
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// diceImage
const diceImage: HTMLImageElement | null = document.querySelector('.dice');
// hide dice image first
diceImage?.classList.add('hidden');

// rollDice Button
const rollDiceButton: HTMLButtonElement | null =
  document.querySelector('.btn--roll');

// currentScorePlayer1
const currentScore0: HTMLParagraphElement | null = document.querySelector(
  '.current-score#current--0',
);

// currentScorePlayer2
const currentScore1: HTMLParagraphElement | null = document.querySelector(
  '.current-score#current--1',
);

// Player 1
const activePlayer0: HTMLParagraphElement | null =
  document.querySelector(`.player.player--0`);

//Player 2
const activePlayer1: HTMLParagraphElement | null =
  document.querySelector(`.player.player--1`);

// function to update actual score
const updateActualScore = (actualScore: number, player: number) => {
  const actualScoreElement: HTMLParagraphElement | null =
    document.querySelector(`.score#score--${player}`);

  return (
    actualScoreElement && (actualScoreElement.textContent = String(actualScore))
  );
};

// function to update current score
const updateCurrentScore = (currScore: number) =>
  currentScore0 && (currentScore0.textContent = String(currScore));

// remove Active Player
const removeActivePlayer = (active: HTMLParagraphElement | null) =>
  active && active.classList.remove(`player--active`);

// add active player
const addActivePlayer = (active: HTMLParagraphElement | null) =>
  active && active.classList.add(`player--active`);

// variable for currentScorePlayer1
let currentScorePlayer1: number = 0;
// variable for actualScorePlayer1
let actualScorePlayer1: number = 0;

// variable for currentScorePlayer2
let currentScorePlayer2: number = 0;
// variable for actualScorePlayer1
let actualScorePlayer2: number = 0;
// Roll Dice Logic
if (rollDiceButton) {
  rollDiceButton.addEventListener(`click`, (): void => {
    // initialize roll dice
    const initiateRandomNum: number = getRandomInt(1, 6);

    // show dice image
    diceImage?.classList.remove('hidden');

    // Change the src attribute
    if (diceImage) {
      if (activePlayer0?.classList.contains(`player--active`)) {
        currentScorePlayer1 += initiateRandomNum;

        currentScore0 &&
          (currentScore0.textContent = String(currentScorePlayer1));

        if (initiateRandomNum === 1) {
          removeActivePlayer(activePlayer0);
          diceImage.setAttribute('src', 'dice-1.png');

          // add current score to actual score
          actualScorePlayer1 += currentScorePlayer1;
          // update actual score
          updateActualScore(actualScorePlayer1, 0);

          // initialize current score back to 0
          currentScorePlayer1 = 0;
          updateCurrentScore(currentScorePlayer1);
          addActivePlayer(activePlayer1);
        } else {
          diceImage.setAttribute('src', `dice-${initiateRandomNum}.png`);
        }
      } else {
        addActivePlayer(activePlayer1);
        const initiateRandomNum: number = getRandomInt(1, 6);
        currentScorePlayer2 += initiateRandomNum;
        currentScore1 &&
          (currentScore1.textContent = String(currentScorePlayer2));

        if (initiateRandomNum === 1) {
          removeActivePlayer(activePlayer1);
          diceImage.setAttribute('src', 'dice-1.png');

          // add current score to actual score
          actualScorePlayer2 += currentScorePlayer2;
          // update actual score
          updateActualScore(actualScorePlayer2, 1);

          // initialize current score back to 0
          currentScorePlayer2 = 0;
          updateCurrentScore(currentScorePlayer2);

          addActivePlayer(activePlayer0);
        } else {
          diceImage.setAttribute('src', `dice-${initiateRandomNum}.png`);
        }
      }
    }
  });
}
