playersNamesAndScore = {};
const prompt = require("prompt-sync")();
function selectPlayers() {
  for (let i = 0; i < 2; i++) {
    const currentPlayer = prompt(
      `enter the name of  player  number ${i + 1}: `
    );
    playersNamesAndScore[currentPlayer] = 0;
  }
}

let playerRoundName;
let roundNum = 1;

function gameRound(playerOne, playerTwo, intetvalID, theGoodOf = 5) {
  if (theGoodOf <= 0 || theGoodOf % 2 === 0) {
    console.log(`theGoodOf must be odd number bigger than 0`);
    clearInterval(intetvalID);
  }
  const randomNumber = Math.floor(Math.random() * (31 - 12)) - 5;
  if (randomNumber % 2 === 0) {
    playersNamesAndScore[playerOne] += 1;
    playerRoundName = playerOne;
  } else {
    playersNamesAndScore[playerTwo] += 1;
    playerRoundName = playerTwo;
  }

  console.log(
    `#${roundNum}, random number is ${randomNumber}, ${playerRoundName} scored`
  );
  console.log(
    `Status : ${playerOne} ${playersNamesAndScore[playerOne]} ,  ${playerTwo} ${playersNamesAndScore[playerTwo]}`
  );
  roundNum++;
  const reachScoreToWin = Math.floor(theGoodOf / 2 + 1);
  if (playersNamesAndScore[playerOne] === reachScoreToWin) {
    console.log(`${playerOne} Wins`);
    clearInterval(intetvalID);
  } else if (playersNamesAndScore[playerTwo] === reachScoreToWin) {
    console.log(`${playerTwo} Wins`);
    clearInterval(intetvalID);
  }
}

function startNewGame(theGoodOf = 5) {
  selectPlayers();
  const intetvalID = setInterval(() => {
    const [playerOne, playerTwo] = Object.keys(playersNamesAndScore);
    gameRound(playerOne, playerTwo, intetvalID, theGoodOf);
  }, 1000);
}

startNewGame();