class PokDeng {
  constructor(deck, players) {
    // players as [] of [p1 ,p2, p3, ... ,dealer]
    this.deck = deck;
    this.players = players;
  }

  betting(bet) {
    this.start();
    this.result(this.players[0], this.players[1], bet);
  }

  start() {
    this.deck.reset();
    this.deck.shuffle();

    // clear hands
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].hands = [];
    }

    // deals card to all players, dealer gets the last pair
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].hands.push(this.deck.deal());
      this.players[i].hands = this.players[i].hands.flat();
    }

    for (let i = 0; i < this.players.length; i++) {
      console.log(
        `${this.players[i].getName()} got ${this.getCardsFromHands(this.players[i].hands)}`
      );
    }
  }

  result(player, dealer, bet) {
    const isHands1BeatHands2 = this.compareHands(player.hands, dealer.hands);
    if (isHands1BeatHands2) {
      player.pot += bet;
      console.log(
        `${player.getName()} won!!!, received ${bet} chips, your pot is now ${player.pot}`
      );
      return true;
    } else if (isHands1BeatHands2 === null) {
      console.log(`${player.getName()} tied!!!, got nothing, your pot is now ${player.pot}`);
      return null;
    } else {
      player.pot -= bet;
      console.log(`${player.getName()} lose!!!, lost ${bet} chips, your pot is now ${player.pot}`);
      return false;
    }
  }

  compareHands(hands1, hands2) {
    let v1 = this.getPointsFromHands(hands1);
    let v2 = this.getPointsFromHands(hands2);

    if (v1 > v2) {
      return true;
    } else if (v1 === v2) {
      return null;
    } else {
      return false;
    }
  }

  getPointsFromHands(hands) {
    let points = 0;
    for (let i = 0; i < 2; i++) {
      points += hands[i].getValue();
    }
    points = points % 10;
    return points;
  }

  getCardsFromHands(hands) {
    let str = '';
    for (let i = 0; i < 2; i++) {
      str += `${hands[i].getCard()}, `;
    }
    return str;
  }

  end() {
    for (let i = 0; i < this.players.length - 1; i++) {
      // exclude dealer
      console.log(`${this.players[i].getName()} got total ${this.players[i].pot} chips`);
    }
  }
}

module.exports = PokDeng;
