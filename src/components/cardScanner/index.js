import { connect } from 'react-redux';

import { saveCard, clearCardErrors } from 'actions/paymentMeansActions';

import CardScanner from './components/CardScanner';
import CardScannerHOC from './components/CardScannerHOC';

const CardScannerExtended = CardScannerHOC(CardScanner);

const mapStateToProps = state => {
  return {
    error: state.paymentMeans.error,
    parentProfile: state.profile.parent,
    cardId: state.paymentMeans.cardId,
    piggyBanks: state.piggyBank.currentPiggy,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveCard: cardData => {
      dispatch(saveCard(cardData));
    },
    clearCardErrors: () => {
      dispatch(clearCardErrors());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CardScannerExtended,
);
