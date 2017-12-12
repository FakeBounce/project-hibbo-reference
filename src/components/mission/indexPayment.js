import { connect } from 'react-redux';
import { doneMissionToProfile, isTransfering } from 'actions/missionActions';
import { setCardId } from 'actions/paymentMeansActions';

import MissionPayment from './components/MissionPayment';

const mapStateToProps = state => {
  return {
    missions: state.missions,
    child: state.profile.child,
    parent: state.profile.parent,
    paymentMeans: state.paymentMeans,
    errorMsg: state.notifications.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: cardId => {
      dispatch(setCardId(cardId));
    },
    doneMissionToProfile: missionId => {
      dispatch(doneMissionToProfile(missionId));
    },
    isInTransfer: () => {
      dispatch(isTransfering());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionPayment);
