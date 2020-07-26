import Game from './models/game';
import Player from './models/player';

let game = new Game();
let addPlayerBtn: HTMLInputElement = document.getElementById('addPlayer') as HTMLInputElement;
let dealCardsToPlayer: HTMLInputElement = document.getElementById('dealCards') as HTMLInputElement;
let startGame: HTMLInputElement = document.getElementById('startGame') as HTMLInputElement;
let dealCardsToTable: HTMLInputElement = document.getElementById('dealCardsToTable') as HTMLInputElement;
let dealNextCard: HTMLInputElement = document.getElementById('dealNextCard') as HTMLInputElement;
let checkRusltBtn: HTMLInputElement = document.getElementById('checkResult') as HTMLInputElement;
let raisedAmount: number = 0;

const displayCardsOnTable = (): void => {
  let element = document.getElementById("game");
  let cardsOnTable = document.createElement("p");
  let money = document.createElement("p");

  cardsOnTable.id = "cardsOnTable";
  money.id = "moneyOnTable"
  money.innerHTML = `This is money on the Table ${game.money}`;

  const { length: cardsOnTableLength } = game.cardsOnTable;
  for (let i = 0; i < cardsOnTableLength; i++) {

    cardsOnTable.innerHTML += game.cardsOnTable[i] + " ";
  }
  element.appendChild(money);
  element.appendChild(cardsOnTable);
}

const displayPlayers = (): void => {
  let players: HTMLElement = document.getElementById('players');

  const { length: playersLength } = game.players;
  for (let i = 0; i < playersLength; i++) {
    let player: HTMLElement = document.createElement("div");
    let playerName: HTMLElement = document.createElement("h4")
    let playerMoney: HTMLElement = document.createElement("h5");
    let cards: HTMLElement = document.createElement("p");
    let checkBtn: HTMLInputElement = document.createElement('input');
    let foldBtn: HTMLInputElement = document.createElement("input");
    let raiseBtn: HTMLInputElement = document.createElement("input");
    let amountToRaise: HTMLInputElement = document.createElement("input");

    player.id = `player${game.players[i].name}`

    playerName.innerHTML = game.players[i].name;
    playerMoney.innerHTML = `This is your money: ${game.players[i].money.toString()}`;
    playerMoney.id = `playerMoney${game.players[i].name}`;

    checkBtn.type = "button";
    checkBtn.value = "Check ";
    checkBtn.id = "check";

    foldBtn.type = "button";
    foldBtn.value = "Fold";
    foldBtn.id = "fold";

    raiseBtn.type = "button";
    raiseBtn.value = "Raise";
    raiseBtn.id = "raise";

    amountToRaise.type = "text"
    amountToRaise.id = "amountToRaise" + game.players[i].name;

    const { length: cardsLength } = game.players[i].cards;
    for (let j = 0; j < cardsLength; j++) {
      cards.innerHTML += game.players[i].cards[j];
    }

    cards.innerHTML = game.players[i].cards[0] + " " + game.players[i].cards[1];
    players.appendChild(player);
    player.appendChild(playerName);
    player.appendChild(cards);
    player.appendChild(playerMoney);
    player.appendChild(checkBtn);
    player.appendChild(foldBtn);
    player.appendChild(raiseBtn)
    player.appendChild(amountToRaise);

    checkBtn.addEventListener('click', checkFnc(playerName, i))

    foldBtn.addEventListener('click', foldFnc(playerName, i))

    raiseBtn.addEventListener('click', raiseFnc(i));
  }

}

const removeElement = (elementId: string): void => {
  let element = document.getElementById(elementId);
  element.remove();
}

const foldFnc = (playerName: HTMLElement, i: number): (this: HTMLInputElement) => void => {
  return () => {
    console.log(`fold is clicked by ${playerName.innerHTML}`);
    game.deletePlayerFromGame(game.players[i]);
    removeElement(`player${game.players[i].name}`);
  };
}

const checkFnc = (playerName: HTMLElement, i: number): (this: HTMLInputElement) => void => {
  return () => {
    console.log(`Checked is clicked by ${playerName.innerHTML}`);
    updatePlayerMoney(i, raisedAmount);
    updateMoneyOnTable(raisedAmount);
    raisedAmount = 0;
  };
}

const raiseFnc = (i: number): (this: HTMLInputElement) => void => {
  return () => {
    let amount: number = Number((<HTMLInputElement>document.getElementById("amountToRaise" + game.players[i].name)).value);
    updatePlayerMoney(i, amount);
    updateMoneyOnTable(amount);
  };
}

const updateCardsOnTable = (): void => {
  let cardsOnTable = document.getElementById('cardsOnTable');
  cardsOnTable.innerHTML = ""

  const { length: cardsOnTableLength } = game.cardsOnTable;
  for (let i = 0; i < cardsOnTableLength; i++) {
    cardsOnTable.innerHTML += game.cardsOnTable[i] + " ";
  }
}

const updateMoneyOnTable = (amount: number): void => {
  let moneyOnTable: HTMLElement = document.getElementById("moneyOnTable");
  raisedAmount = amount;

  game.money += amount;
  moneyOnTable.innerHTML = game.money.toString();
}

const updatePlayerMoney = (i: number, amount: number) => {
  let playerMoney: HTMLElement = document.getElementById("playerMoney" + game.players[i].name);
  playerMoney.innerHTML = "";
  game.players[i].money -= amount;
  playerMoney.innerHTML = game.players[i].money.toString();
}

addPlayerBtn.addEventListener('click', () => {
  let playerName: string = (<HTMLInputElement>document.getElementById("playerName")).value;
  game.players.push(new Player(playerName));
  startGame.disabled = false;
  (<HTMLInputElement>document.getElementById("playerName")).value = ""
})

startGame.addEventListener('click', () => {
  game.startGame();
  dealCardsToPlayer.disabled = false;
  addPlayerBtn.disabled = true;
  startGame.disabled = true;
})

dealCardsToPlayer.addEventListener('click', () => {
  game.dealCardsToPlayers();
  dealCardsToTable.disabled = false;
  dealCardsToPlayer.disabled = true;
  displayPlayers();
})

dealCardsToTable.addEventListener('click', () => {
  game.dealCardsToTable();
  displayCardsOnTable()
  dealCardsToTable.disabled = true;
  dealNextCard.disabled = false;
})

dealNextCard.addEventListener('click', () => {
  game.dealNextCard();
  updateCardsOnTable();
  if (game.cardsOnTable.length === 5) {
    dealNextCard.disabled = true;
    checkRusltBtn.disabled = false;
  }
})

checkRusltBtn.addEventListener('click', () => {
  game.checkResult();
})