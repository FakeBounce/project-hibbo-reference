import React, { PureComponent } from 'react';
import { View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { number } from 'prop-types';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';

import cross from 'assets/settings/toggle-cross.png';

const styles = EStyleSheet.create({
  wrapper: {
    width: 53,
    height: 30,
    backgroundColor: '$colors.buttonGrey',
    borderRadius: 15,
  },
  head: {
    width: 30,
    height: 30,
    left: 23,
    backgroundColor: '$colors.toggleButtonGrey',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HEADER_ACTIVE_POS = 23;
const HEADER_INACTIVE_POS = 0;

class Toggle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: new Animated.Value(props.active),
    };
  }

  @bind
  onPress() {
    const active = this.state.active._value === 0 ? 1 : 0; // eslint-disable-line

    Animated.timing(this.state.active, {
      toValue: active,
      duration: 100,
    }).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.wrapper}>
          <Animated.View
            style={[
              styles.head,
              {
                left: this.state.active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [HEADER_INACTIVE_POS, HEADER_ACTIVE_POS],
                }),
              },
            ]}
          >
            <Image source={cross} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Toggle.propTypes = {
  active: number,
};

Toggle.defaultProps = {
  active: 0,
};

export default Toggle;
