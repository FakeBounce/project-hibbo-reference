import { Animated, Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TouchableRipple from '../components/TouchableRipple';

describe('TouchableRipple', () => {
  it('should render the component', () => {
    const text = 'test';
    const rippleScale = new Animated.Value(1);
    const rippleOpacity = new Animated.Value(1);
    const onBeginPress = () => {
      console.log('Begin Press');
    };
    const onStopPress = () => {
      console.log('Stop press');
    };
    const to = () => {
      console.log('On press');
    };

    const touchableRipple = renderer
      .create(
        <TouchableRipple
          onPressIn={onBeginPress}
          onPressOut={onStopPress}
          onPress={to}
          rippleOpacity={rippleOpacity}
          rippleScale={rippleScale}
        >
          <Text>
            {text}
          </Text>
        </TouchableRipple>,
      )
      .toJSON();

    expect(touchableRipple).toMatchSnapshot();
  });
});
