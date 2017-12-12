import { connect } from 'react-redux';
import {
  addMissionToProfile,
  missionCompleted,
  isTransfering,
} from 'actions/missionActions';
import MissionDetail from './components/MissionDetail';

const mapStateToProps = state => {
  return {
    missions: state.missions,
    child: state.profile.child,
    parent: state.profile.parent,
    paymentMeans: state.paymentMeans,
    error: state.notifications.error,
    isTransfering: state.missions.isTransfering,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMissionToProfile: formData => {
      dispatch(addMissionToProfile(formData));
    },
    missionCompleted: () => {
      dispatch(missionCompleted());
    },
    isInTransfer: () => {
      dispatch(isTransfering());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionDetail);
