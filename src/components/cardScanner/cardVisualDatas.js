import card0 from 'assets/creditCard/cardBg/card0.png';
import card1 from 'assets/creditCard/cardBg/card1.png';
import card2 from 'assets/creditCard/cardBg/card2.png';
import card3 from 'assets/creditCard/cardBg/card3.png';

import AE from 'assets/creditCard/bank/AE.png';
import discover from 'assets/creditCard/bank/discover.png';
import mastercard from 'assets/creditCard/bank/mastercard.png';
import visa from 'assets/creditCard/bank/visa.png';

export const cards = [card0, card1, card2, card3];
export const banks = {
  'american-express': {
    icon: AE,
    width: 65,
    height: 17,
  },
  discover: {
    icon: discover,
    width: 84,
    height: 14,
  },
  'master-card': {
    icon: mastercard,
    width: 40,
    height: 25,
  },
  visa: {
    icon: visa,
    width: 53,
    height: 18,
  },
};
