import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TouchableRipple from '../components/TouchableRipple';

describe('TouchableRipple', () => {
  it('should render the component', () => {
    const text = 'test';
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
        <TouchableRipple onPressIn={onBeginPress} onPressOut={onStopPress} onPress={to}>
          <Text>
            {text}
          </Text>
        </TouchableRipple>,
      )
      .toJSON();

    expect(touchableRipple).toMatchSnapshot();
  });
});
