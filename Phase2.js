const prompt = require("prompt-sync")();
const playersNamesAndScore = {};

function selectPlayers() {
  for (let i = 1; i <= 7; i++) {
    const playerName = prompt(
      `enter the name of player number ${i} ${
        i >= 3 ? "or enter x to cancel" : ""
      } : `
    );

    if (i >= 2 && playerName === "x") {
      return;
    }
    playersNamesAndScore[playerName] = 0;
  }
}

let playerRoundName;
let roundNum = 1;
let currentRoundPlayers = [];
function seletTwoRandomPlayer() {
  currentRoundPlayers = [];
  const playersNames = Object.keys(playersNamesAndScore);
  const playerOne = Math.floor(Math.random() * playersNames.length);
  currentRoundPlayers.push(playersNames[playerOne]);
  while (currentRoundPlayers.length < 2) {
    const playerTwo = Math.floor(Math.random() * playersNames.length);
    if (playerTwo !== playerOne) {
      currentRoundPlayers.push(playersNames[playerTwo]);
    }
  }
}

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
    seletTwoRandomPlayer();
    const [playerOne, playerTwo] = currentRoundPlayers;
    gameRound(playerOne, playerTwo, intetvalID, theGoodOf);
  }, 2000);
}

startNewGame();