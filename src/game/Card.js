class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  getCard() {
    return `${this.suit}-${this.value}`;
  }

  getValue() {
    switch (this.value) {
      case 'Ace':
        return 1;
      case 'Jack':
        return 0;
      case 'Queen':
        return 0;
      case 'King':
        return 0;
      default:
        return parseInt(this.value);
    }
  }
}

module.exports = Card;
