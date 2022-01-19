import _ from "lodash";
import { Card } from "./Card";
import { Deck } from "./Deck";

export class Blackjack {
  deck: Card[];
  player: Card[] | [Card[], Card[]] = [];
  dealer: Card[] = [];
  hasPlayerSplit: boolean = false;

  constructor() {
    this.deck = _.shuffle(new Deck().cards);
    for (let i = 0; i < 2; i++) {
      // before the posibility of a split players is a one dimensional array
      (this.player as Card[]).push(this.deck.pop() as Card);
      this.dealer.push(this.deck.pop() as Card);
    }
  }

  playerToString(): string {
    return (this.player as Card[]).map((card) => card.toString()).join(" ");
  }

  dealerToString(): string {
    return this.dealer
      .map((card, index) => {
        if (!index) return "??";
        else return card.toString();
      })
      .join(" ");
  }

  getPlayer(): string {
    return this.playerToString();
  }

  getDealer(): string {
    return this.dealerToString();
  }

  getSplitState(): boolean {
    return this.hasPlayerSplit;
  }

  getDealerDone(): string {
    return this.dealer
      .map((card) => {
        return card.toString();
      })
      .join(" ");
  }

  // call twice for each hand if the player is split
  getHandValue(hand: Card[]): number {
    let handValue = 0;
    (hand as Card[]).forEach((card: Card) => {
      if (typeof card.getValue() === "string") {
        if (card.value === "A") handValue += 1;
        else handValue += 10;
      } else handValue += card.getValue() as number;
    });
    return handValue;
  }

  // w/o splits rn
  // TODO: this is a bad way of working this there should be an object that is a hand
  hitPlayer(hand: number) {
    // hand is null which means the player has not split
    if (!hand) (this.player as Card[]).push(this.deck.pop() as Card);
    if (hand === 1) (this.player[0] as Card[]).push(this.deck.pop() as Card);
    if (hand === 2) (this.player[0] as Card[]).push(this.deck.pop() as Card);
  }

  playOutDealer() {
    while (this.getHandValue(this.dealer) < 17) {
      this.dealer.push(this.deck.pop() as Card);
      if (this.getHandValue(this.dealer) > 21) {
        console.log("DEALER BUSTED");
      }
    }
  }

  split() {
    if (this.player.length > 2) return;

    if (
      (this.player[0] as Card).getValue() ===
      (this.player[1] as Card).getValue()
    ) {
      // player has two hands within his one hand
      this.player[0] = [this.player[0] as Card];
      this.player[1] = [this.player[1] as Card];
    }

    // set this to true so we can check that they have multiple hands without checking the actual object
    this.hasPlayerSplit = true;
  }
}
