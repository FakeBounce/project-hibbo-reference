import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bind } from 'decko';
import shallowEqual from 'shallowequal';

import { setParam } from 'redux/actions/navigationActions';
import Transfert from './components/Transfert';

class TransfertComponent extends Component {
  constructor(props) {
    super(props);
    const tab = this.props.navigate.tab || 0;

    this.opacity = {
      button: new Animated.Value(1),
      keyBoard: new Animated.Value(1),
      payTotal: new Animated.Value(1),
    };
    this.moneyPot = {
      buttonOpacity: new Animated.Value(0),
      buttonScale: new Animated.Value(0),
      otherOpacity: new Animated.Value(0),
    };
    this.moveBar =
      tab === 2
        ? new Animated.Value((Dimensions.get('window').width - 75) / 3 * 2)
        : new Animated.Value(0);
    this.backgroundColor =
      tab === 2 ? new Animated.Value(1) : new Animated.Value(0);
    this.state = {
      selectedTab: tab,
      totalAmount: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigate.tab !== this.state.selectedTab) {
      this.changeTabWithAnimation(nextProps.navigate.tab);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      shallowEqual(this.state, nextState) &&
      shallowEqual(this.props, nextProps)
    ) {
      return false;
    }

    return true;
  }

  createHideSequence(toValue) {
    const hideSequence = [
      // Move bar
      Animated.timing(this.moveBar, {
        duration: 300,
        toValue,
      }),
    ];

    if (this.state.selectedTab === 2) {
      hideSequence.push(
        // Hide moneyPot Screen
        Animated.sequence([
          Animated.timing(this.moneyPot.buttonOpacity, {
            toValue: 0,
            duration: 300,
          }),
          Animated.parallel([
            Animated.timing(this.moneyPot.otherOpacity, {
              toValue: 0,
              duration: 300,
            }),
            Animated.timing(this.backgroundColor, {
              toValue: 0,
              duration: 300,
            }),
          ]),
        ]),
      );
    } else {
      hideSequence.push(
        // Hide
        Animated.sequence([
          Animated.timing(this.opacity.button, {
            toValue: 0,
            duration: 300,
          }),
          Animated.parallel([
            Animated.timing(this.opacity.keyBoard, {
              toValue: 0,
              duration: 300,
            }),
            Animated.timing(this.opacity.payTotal, {
              toValue: 0,
              duration: 300,
            }),
          ]),
        ]),
      );
    }
    return hideSequence;
  }

  selectedTabChange(newTab) {
    this.props.setParam({ tab: newTab });
    this.setState(state => ({
      ...state,
      selectedTab: newTab,
    }));
    this.totalAmount = '';
  }

  showNewTabAnimation(index, toValue) {
    // Show
    if (index === 2) {
      Animated.parallel([
        Animated.timing(this.moveBar, {
          duration: 1,
          toValue,
        }),
        Animated.timing(this.backgroundColor, {
          toValue: 1,
          duration: 300,
        }),
        Animated.sequence([
          Animated.timing(this.moneyPot.buttonOpacity, {
            toValue: 1,
            duration: 300,
          }),
          Animated.timing(this.moneyPot.otherOpacity, {
            toValue: 1,
            duration: 300,
          }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(this.moveBar, {
          duration: 1,
          toValue,
        }),
        Animated.timing(this.backgroundColor, {
          toValue: 0,
          duration: 1,
        }),
        Animated.timing(this.opacity.button, {
          toValue: 1,
          duration: 300,
        }),
        Animated.parallel([
          Animated.timing(this.opacity.keyBoard, {
            toValue: 1,
            duration: 300,
          }),
          Animated.timing(this.opacity.payTotal, {
            toValue: 1,
            duration: 300,
          }),
        ]),
      ]).start();
    }
  }

  @bind
  pressInput(value) {
    this.setState(state => ({
      ...state,
      totalAmount: value,
    }));
  }

  @bind
  changeTabWithAnimation(index) {
    const toValue =
      index === 0 ? 0 : (Dimensions.get('window').width - 75) / 3 * index;
    const hideSequence = this.createHideSequence(toValue);

    Animated.parallel(hideSequence).start(() => {
      this.selectedTabChange(index);
      this.showNewTabAnimation(index, toValue);
    });
  }

  render() {
    return (
      <Transfert
        {...this.props}
        pressInput={this.pressInput}
        changeTabCallback={this.changeTabWithAnimation}
        totalAmount={this.state.totalAmount}
        selectedTab={this.state.selectedTab}
        animatedValue={{
          opacity: this.opacity,
          moneyPot: this.moneyPot,
          backgroundColor: this.backgroundColor,
          moveBar: this.moveBar,
        }}
        childPicture={this.props.childProfile.avatar}
      />
    );
  }
}

TransfertComponent.propTypes = {
  navigate: PropTypes.shape({
    tab: PropTypes.number.isRequired,
  }).isRequired,
  childProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  setParam: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    navigate: state.navigation,
    childProfile: state.profile.child,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setParam: params => {
      dispatch(setParam(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfertComponent);
