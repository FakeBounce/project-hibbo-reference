import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { number, string, func } from 'prop-types';

import { bind } from 'decko';

import TouchableRippleComponent from './components/TouchableRipple';

class TouchableRipple extends PureComponent {
  constructor(props) {
    super(props);

    this.rippleScale = new Animated.Value(0.4);
    this.rippleOpacity = new Animated.Value(0);
  }

  @bind
  onPress() {
    if (!this.props.delay) {
      this.props.onPress(this.props.value);
    }
    Animated.parallel([
      Animated.timing(this.rippleOpacity, {
        toValue: this.props.rippleMaxOpacity,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(this.rippleScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start(() => {
      this.rippleOpacity.setValue(0);
      this.rippleScale.setValue(0.4);

      if (this.props.delay) {
        // Add delay to avoid freezed ripple on screen transitions
        Animated.delay(this.props.delay).start(() => {
          this.props.onPress(this.props.value);
        });
      }
    });
  }

  render() {
    return (
      <TouchableRippleComponent
        {...this.props}
        onPress={this.onPress}
        rippleScale={this.rippleScale}
        rippleOpacity={this.rippleOpacity}
      />
    );
  }
}

TouchableRipple.defaultProps = {
  value: '',
  onPress: () => {},
  delay: 10,
  rippleMaxOpacity: 0.1,
};

TouchableRipple.propTypes = {
  value: string,
  onPress: func,
  rippleMaxOpacity: number,
  delay: number,
};

export default TouchableRipple;
