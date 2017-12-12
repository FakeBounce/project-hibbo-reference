import { connect } from 'react-redux';
import {
  getProfilesStart,
  getPaymentMeansStart,
  getPurchasesStart,
} from 'actions/settingsActions';
import Settings from './components/Settings';

export const mapDispatchToProps = dispatch => {
  return {
    getProfiles: () => {
      dispatch(getProfilesStart());
    },
    getPaymentMeans: () => {
      dispatch(getPaymentMeansStart());
    },
    getPurchases: () => {
      dispatch(getPurchasesStart());
    },
  };
};

const SettingsComponent = connect(null, mapDispatchToProps)(Settings);

export default SettingsComponent;
