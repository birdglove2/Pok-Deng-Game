const Card = require('./Card');

class Deck {
  constructor() {
    this.cards = [];
    this.reset(); // add new fresh 52 cards to the deck
  }

  reset() {
    this.cards = [];
    const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
      for (let value in values) {
        this.cards.push(new Card(values[value], suits[suit]));
      }
    }
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      let j = Math.floor(Math.random() * i);
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  // deal 2 cards promptly
  deal() {
    let cards = [];
    cards.push(this.cards.shift());
    cards.push(this.cards.shift());
    return cards;
  }
}

module.exports = Deck;
