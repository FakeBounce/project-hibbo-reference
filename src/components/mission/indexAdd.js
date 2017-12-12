import { connect } from 'react-redux';
import {
  addMissionToProfile,
  editMissionFromProfile,
} from 'actions/missionActions';
import MissionAdd from './components/MissionAdd';

const mapStateToProps = state => {
  return {
    child: state.profile.child,
    parent: state.profile.parent,
    missions: state.missions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMissionToProfile: formData => {
      dispatch(addMissionToProfile(formData));
    },
    editMissionFromProfile: formData => {
      dispatch(editMissionFromProfile(formData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionAdd);
