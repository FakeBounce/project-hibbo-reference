import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';

import { bind } from 'decko';

import MenuLink from './components/MenuLink';

const mapStateToProps = state => {
  return {
    device: state.device,
  };
};

class MenuLinkContainer extends PureComponent {
  constructor(props) {
    super(props);

    // console.log(this.props.device);

    const animationDelay = 300;

    this.linkOpacity = new Animated.Value(1);
    this.linkScale = new Animated.Value(1);

    this.onBeginPressAnimation = Animated.parallel([
      Animated.timing(this.linkOpacity, { toValue: 0.5, duration: animationDelay }),
      Animated.timing(this.linkScale, { toValue: 1.3, duration: animationDelay }),
    ]);

    this.onStopPressAnimation = Animated.parallel([
      Animated.timing(this.linkOpacity, { toValue: 1, duration: animationDelay }),
      Animated.timing(this.linkScale, { toValue: 1, duration: animationDelay }),
    ]);
  }

  @bind
  onBeginPress() {
    this.onBeginPressAnimation.start();
  }

  @bind
  onStopPress() {
    this.onStopPressAnimation.start();
  }

  render() {
    return (
      <MenuLink
        {...this.props}
        onBeginPress={this.onBeginPress}
        onStopPress={this.onStopPress}
        linkScale={this.linkScale}
        linkOpacity={this.linkOpacity}
      />
    );
  }
}

export default connect(mapStateToProps)(MenuLinkContainer);
