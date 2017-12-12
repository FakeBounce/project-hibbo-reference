import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { setParam } from 'redux/actions/navigationActions';
import { bind } from 'decko';

import OpenMonimalz from './components/OpenMonimalz';

class OpenMonimalzComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: '',
    };

    this.opacity = {
      title: new Animated.Value(0),
      moneyPot: new Animated.Value(0),
      keyBoard: new Animated.Value(0),
      payTotal: new Animated.Value(0),
    };
  }

  @bind
  pressInput(value) {
    this.setState(state => ({
      ...state,
      totalAmount: value,
    }));
  }

  render() {
    return (
      <OpenMonimalz
        {...this.props}
        pressInput={this.pressInput}
        totalAmount={this.state.totalAmount}
        animatedValue={{
          opacity: this.opacity,
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigate: state.navigation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setParam: params => {
      dispatch(setParam(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  OpenMonimalzComponent,
);
