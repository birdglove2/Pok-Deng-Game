class Player {
  constructor(name, pot = 100) {
    this.name = name;
    this.pot = pot;
    this.hands = [];
  }

  getName() {
    return `${this.name}`;
  }
}

module.exports = Player;
