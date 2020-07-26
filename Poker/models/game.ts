import Player from './player';
import Card from './card';

export default class Game {
  name: string;
  players: Player[] = [];
  cards: string[] = [];
  cardsOnTable: string[] = [];
  money: number = 0;
  isOver: boolean;

  public checkResult(): void {
    console.log("AND THE WINNER IS: THIS FUNCTION NEEDS IMPLEMENTATION.");
  }

  public startGame(): void {
    let deck = new Card();
    this.cards = deck.cards;
  }

  public deletePlayerFromGame(player: Player): void {
    this.players.splice(this.players.indexOf(player), 1);
  }

  public addPlayer(name: string): void {
    this.players.push(new Player(name));
  }

  public dealCardsToPlayers(): void {
    const { length: playerLength } = this.players;

    for (let i = 0; i < playerLength; i++) {
      let playersCards: string[] = this.players[i].cards;
      playersCards.push(this.getRandomCard());
      playersCards.push(this.getRandomCard());
    }
  }

  public dealCardsToTable(): void {
    this.cardsOnTable.push(this.getRandomCard());
    this.cardsOnTable.push(this.getRandomCard());
    this.cardsOnTable.push(this.getRandomCard());
  }

  public dealNextCard(): void {
    this.cardsOnTable.push(this.getRandomCard());
  }

  private getRandomCard(): string {
    let randomIndex = Math.floor(Math.random() * this.cards.length);
    let randomCard = this.cards[randomIndex];

    this.cards.splice(randomIndex, 1);
    return randomCard;
  }
}