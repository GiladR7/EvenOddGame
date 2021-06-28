const fs = require("fs");

const prompt = require("prompt-sync")();
let playersNamesAndScore = {};
function readFromResults() {
  fs.readFile("./results.txt", "utf8", (err, data) => {
    if (data) {
      console.log(data);
    }
  });
}

function writeToFile(text) {
  fs.writeFile("./results.txt", `${text}\n`, { flag: "a" }, function (err) {
    if (err) {
      return console.error(err);
    }
  });
}
function selectPlayers() {
  playersNamesAndScore = {};
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
let roundNum;
let currentRoundPlayers = [];
let theWinnerOfTournament;
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
  if (randomNumber % 2 === 0 && randomNumber < 0 && playerTwo === "Boss") {
    console.log(
      `#${roundNum} random number is nagtive even ${randomNumber} the round is replay`
    );
    return;
  }
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
    theWinnerOfTournament = playerOne;
  } else if (playersNamesAndScore[playerTwo] === reachScoreToWin) {
    theWinnerOfTournament = playerTwo;
  }
  if (
    playerTwo === "Boss" &&
    (playersNamesAndScore[playerOne] === reachScoreToWin ||
      playersNamesAndScore[playerTwo] === reachScoreToWin)
  ) {
    console.log(`${theWinnerOfTournament} Wins`);
    if (theWinnerOfTournament !== "Boss") {
      writeToFile(`${playerOne} win the Boss Level`);
    }
    clearInterval(intetvalID);
  } else if (
    playersNamesAndScore[playerOne] === reachScoreToWin ||
    playersNamesAndScore[playerTwo] === reachScoreToWin
  ) {
    console.log(`${theWinnerOfTournament} Wins`);
    writeToFile(`${theWinnerOfTournament} win the Tournament`);
    console.log(`${theWinnerOfTournament} go to the Boss Level`);
    playersNamesAndScore[theWinnerOfTournament] = 0;
    playersNamesAndScore["Boss"] = 0;
    roundNum = 0;
  }
}

function startNewGame(theGoodOf = 5) {
  readFromResults();
  selectPlayers();
  roundNum = 1;
  const intetvalID = setInterval(() => {
    seletTwoRandomPlayer();

    if (!theWinnerOfTournament) {
      const [playerOne, playerTwo] = currentRoundPlayers;
      gameRound(playerOne, playerTwo , intetvalID , theGoodOf);
    } else {
      gameRound(theWinnerOfTournament, "Boss", intetvalID, theGoodOf);
    }
  }, 2000);
}

startNewGame();
