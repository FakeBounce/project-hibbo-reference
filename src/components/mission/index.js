import { connect } from 'react-redux';
import Mission from './components/Mission';

const mapStateToProps = state => {
  return {
    missionList: state.missions.missions,
  };
};

export default connect(mapStateToProps)(Mission);
