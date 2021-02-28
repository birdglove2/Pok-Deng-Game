const Card = require('../game/Card');
const Deck = require('../game/Deck');
const Player = require('../game/Player');
const PokDeng = require('../game/PokDeng');

it('should shuffle a deck and deal card to each player when game start', () => {
  const deck1 = new Deck();
  const deck2 = new Deck();
  const p1 = new Player('Player1');
  const p2 = new Player('Player2');
  const dealer = new Player('Dealer');
  const pokDeng = new PokDeng(deck1, [p1, p2, dealer]);

  expect(deck1).toEqual(deck2);
  pokDeng.start();
  expect(deck1).not.toEqual(deck2);

  expect(p1.hands.length).toEqual(2);
  expect(p2.hands.length).toEqual(2);
  expect(dealer.hands.length).toEqual(2);
  expect(deck1.cards.length).toEqual(46);
});

it('it should return correctly if player won or lose or draw against dealer', () => {
  const player1 = new Player('P1');
  const dealer = new Player('Dealer');
  const deck = new Deck();
  const pokDeng = new PokDeng(deck, [player1, dealer]);

  const card1 = new Card('8', 'Spades');
  const card2 = new Card('8', 'Hearts');
  const card3 = new Card('1', 'Diamonds');
  const card4 = new Card('1', 'Clubs');

  const hands1 = [card1, card2];
  const hands2 = [card3, card4];

  const result1 = pokDeng.compareHands(hands1, hands2);
  const result2 = pokDeng.compareHands(hands2, hands1);
  const result3 = pokDeng.compareHands(hands1, hands1);
  expect(result1).toEqual(true);
  expect(result2).toEqual(false);
  expect(result3).toEqual(null);
});

it("should modify player's pot corresponding to game status", () => {
  const player1 = new Player('P1');
  const player2 = new Player('P2');
  const player3 = new Player('P3');
  const dealer = new Player('Dealer');
  const deck = new Deck();
  const pokDeng = new PokDeng(deck, [player1, player2, player3, dealer]);

  const card1 = new Card('8', 'Spades');
  const card2 = new Card('8', 'Hearts');
  const card3 = new Card('1', 'Diamonds');
  const card4 = new Card('1', 'Clubs');
  const card5 = new Card('9', 'Clubs');
  const card6 = new Card('9', 'Diamonds');
  const card7 = new Card('8', 'Diamonds');
  const card8 = new Card('8', 'Spades');

  player1.hands = [card1, card2];
  player2.hands = [card3, card4];
  player3.hands = [card5, card6];
  dealer.hands = [card7, card8];

  expect(player1.pot).toEqual(100); // before betting

  pokDeng.result(player1, dealer, 40); // draw
  expect(player1.pot).toEqual(100);

  pokDeng.result(player2, dealer, 50); // lose
  expect(player2.pot).toEqual(50);

  pokDeng.result(player3, dealer, 30); // win
  expect(player3.pot).toEqual(130);
});
