const prompt = require('prompt-sync')({ sigint: true });

const Deck = require('./game/Deck');
const Player = require('./game/player');
const PokDeng = require('./game/PokDeng');

function pokDengStart() {
  const player1 = new Player('You');
  const dealer = new Player('The Dealer');
  const deck = new Deck();
  const pokDeng = new PokDeng(deck, [player1, dealer]);

  console.log('First time Huh?, we gave you a free pot of 100 chips');
  restartLoop: while (true) {
    let bet = prompt('Please put your bet  ');

    console.log('Your bet is ', bet);
    bet = parseInt(bet);

    if (!Number.isInteger(bet)) {
      console.log('Please type your bet in number...');
      continue restartLoop;
    }

    pokDeng.betting(bet);

    restartLoop2: while (true) {
      ans = prompt('Wanna play more (Yes/No)?  ');

      if (ans.toLowerCase() === 'no' || ans.toLowerCase() === 'n') {
        break;
      } else if (ans.toLowerCase() === 'yes' || ans.toLowerCase() === 'y') {
        continue restartLoop;
      } else {
        console.log('Please type in (Yes/No) !!');
        continue restartLoop2;
      }
    }
    pokDeng.end();
    break;
  }
}

pokDengStart();
