import _ from "lodash";
import { Card } from "./Card";

const suits = ["❤️", "♠️", "♣️", "♦️"];

export class Deck extends Array {
  cards: Card[] = [];

  constructor() {
    super();
    const deck: Card[] = [];
    for (let i = 1; i < 14; i++) {
      suits.forEach((suit) => {
        if (i === 11) deck.push(new Card("J", suit));
        else if (i === 12) deck.push(new Card("Q", suit));
        else if (i === 13) deck.push(new Card("K", suit));
        else if (i === 1) deck.push(new Card("A", suit));
        else deck.push(new Card(i, suit));
      });
    }
    this.cards = deck;
  }

  hit() {
    return this.cards.pop();
  }
}
