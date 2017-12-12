import React from 'react';
import { TouchableWithoutFeedback, Animated, Text } from 'react-native';
import { shallow } from 'enzyme';

import TouchableRipple from '../components/TouchableRipple';

describe('TouchableRipple component', () => {
  it('should handle onPress events', () => {
    const text = 'test';
    const rippleScale = new Animated.Value(1);
    const rippleOpacity = new Animated.Value(1);
    const onBeginPress = jest.fn();
    const onStopPress = jest.fn();
    const to = jest.fn();

    const tree = shallow(
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
    );

    tree.find(TouchableWithoutFeedback).first().simulate('press');
    expect(to).toHaveBeenCalled();
    tree.find(TouchableWithoutFeedback).first().simulate('pressIn');
    expect(onBeginPress).toHaveBeenCalled();
    tree.find(TouchableWithoutFeedback).first().simulate('pressOut');
    expect(onStopPress).toHaveBeenCalled();
  });
});
