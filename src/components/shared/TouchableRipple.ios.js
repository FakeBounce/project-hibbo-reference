import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { number, string, func } from 'prop-types';

import { bind } from 'decko';
import getRippleAnimation from 'utils/sharedAnimation';
import TouchableRippleComponent from './components/TouchableRipple.ios';

class TouchableRipple extends PureComponent {
  constructor(props) {
    super(props);

    this.rippleScale = new Animated.Value(0.4);
    this.rippleOpacity = new Animated.Value(0);
  }

  @bind
  onPress() {
    const { rippleMaxOpacity, value, delay } = this.props;
    if (!delay) {
      this.props.onPress(value);
    }
    Animated.parallel(
      getRippleAnimation(
        this.rippleOpacity,
        this.rippleScale,
        rippleMaxOpacity,
      ),
    ).start(() => {
      this.rippleOpacity.setValue(0);
      this.rippleScale.setValue(0.4);

      if (delay) {
        // Add delay to avoid freezed ripple on screen transitions
        Animated.delay(delay).start(() => {
          this.props.onPress(value);
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
