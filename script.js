function getUserAmount() {
  let userAmount = prompt("Insert tokens to play");
  return userAmount;
}

function spinResults() {
  const slotOptions = [1, 2, 3];
  let newArray = [];
  for (let num = 0; num < 9; num++) {
    newArray.push(slotOptions[Math.floor(Math.random() * slotOptions.length)]);
  }
  return newArray;
}

function winLose(gameResults, amount, betAmount) {
  let newAmount = amount;
  if (gameResults[3] === gameResults[4] && gameResults[3] === gameResults[5]) {
    let winning = Math.pow(gameResults[0], Number(betAmount));
    console.log("You win!");
    newAmount += Number(betAmount) + winning;
  } else {
    console.log("You lose");
    newAmount -= Number(betAmount);
  }
  console.log(`Your new balance is ${newAmount}`);
  return newAmount;
}

function getBetAmount() {
  return new Promise((resolve, reject) => {
    let betAmount = prompt("Enter the amount you would like to bet");
    if (betAmount) {
      resolve(betAmount);
    } else {
      reject("Error");
    }
  });
}

function spinDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function slotMachine() {
  let amount = getUserAmount();
  console.log(`Current token amount is ${amount}`);
  while (amount > 0) {
    const betAmount = await getBetAmount();
    for (let spins = 0; spins < 7; spins++) {
      const slotVal = spinResults();
      let gameResults = `${slotVal[0]} ${slotVal[1]} ${slotVal[2]}\n${slotVal[3]} ${slotVal[4]} ${slotVal[5]}\n${slotVal[6]} ${slotVal[7]} ${slotVal[8]}`;
      console.log(gameResults);
      await spinDelay(500);
      console.clear();
    }
    const slotVal = spinResults();
    let gameResults = `${slotVal[0]} ${slotVal[1]} ${slotVal[2]}\n${slotVal[3]} ${slotVal[4]} ${slotVal[5]}\n${slotVal[6]} ${slotVal[7]} ${slotVal[8]}`;
    console.log(gameResults);
    const newTotal = winLose(slotVal, amount, betAmount);
    amount = newTotal;
  }
}

slotMachine();
