export class Card {
  value: string | number
  suit: string = ''

  constructor(value: number | string, suit: string) {
    this.value = value
    this.suit = suit
  }

  getValue(): number | string {
    return this.value
  }

  getSuit(): string {
    return this.suit
  }

  toString(): string {
    return this.value + this.suit
  }
}