const Deck = require('../game/Deck');
const Player = require('../game/Player');

it('should shuffle cards correctly', () => {
  const deck1 = new Deck();
  const deck2 = new Deck();

  expect(deck1).toEqual(deck2);
  deck1.shuffle();
  expect(deck1).not.toEqual(deck2);
});

it('should deals 2 cards to each player correctly', () => {
  const deck = new Deck();

  const p1 = new Player('P1');
  const dealer = new Player('Dealer');

  deck.shuffle();
  p1.hands = deck.deal();
  dealer.hands = deck.deal();

  expect(p1.hands.length).toEqual(2);
  expect(dealer.hands.length).toEqual(2);
  expect(p1.hands).not.toEqual(dealer.hands);

  expect(deck.cards.length).toEqual(48);
  expect(deck.cards.includes(p1.hands[0])).toEqual(false);
  expect(deck.cards.includes(p1.hands[1])).toEqual(false);
  expect(deck.cards.includes(dealer.hands[0])).toEqual(false);
  expect(deck.cards.includes(dealer.hands[1])).toEqual(false);
});
