import Card from './card';

export default class Player {
  name: string;
  numberOfWins: number;
  money: number = 1000;
  cards: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public hasMoney(): boolean {
    return this.money <= 0 ? false : true;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setNumberOfWins(): void {
    this.numberOfWins++;
  }

  public takeCards(cards: string[]) {
    this.cards = cards;
  }
}