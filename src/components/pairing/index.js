import { connect } from 'react-redux';

import { selectUserPicture, clearUserPicture } from 'actions/pairingActions';

import Pairing from './components/Pairing';

import SetupHOC from './components/setupForm/SetupHOC';
import BleHOC from './components/setupForm/BleHOC';
import AnimationsHOC from './components/AnimationsHOC';

const PairingComponent = AnimationsHOC(SetupHOC(BleHOC(Pairing)));

const mapStateToProps = state => {
  return {
    userPicture: state.pairing.picture,
    navIndex: state.nav.index,
    currentKid: state.piggyBank.currentPiggy,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUserPicture: picture => {
      dispatch(selectUserPicture(picture));
    },
    clearUserPicture: () => {
      dispatch(clearUserPicture());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PairingComponent);
