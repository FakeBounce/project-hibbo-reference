import { connect } from 'react-redux';

import { goTo } from 'actions/navigationActions';
import { changeProfileChild } from 'actions/profileActions';
import Home from './components/Home';
import HomeHOC from './components/HomeHOC';

import BackgroundSelector from './components/BackgroundSelector';

const HomeExtended = HomeHOC(Home);

const mapStateToProps = state => {
  return {
    avatar: state.profile.child.avatar,
    kids: state.profile.parent.piggyBanks,
    currentKid: state.piggyBank.currentPiggy,
    totalAmount: state.profile.child.amount,
    transactions: state.transfert.transactions,
    childId: state.profile.child.id,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    goTo: (navigation, route, params) => {
      dispatch(goTo(navigation, route, params));
    },
    changeProfileChild: profileId => {
      dispatch(changeProfileChild(profileId));
    },
  };
};

export default BackgroundSelector(
  connect(mapStateToProps, mapDispatchToProps)(HomeExtended),
);
