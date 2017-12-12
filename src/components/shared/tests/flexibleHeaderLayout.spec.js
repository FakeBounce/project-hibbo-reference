import { View, Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import FlexibleHeaderLayout from '../components/FlexibleHeaderLayout';

describe('FlexibleHeaderLayout component', () => {
  it('should render the component', () => {
    const fn = jest.fn();

    const value = renderer
      .create(
        <FlexibleHeaderLayout onBack={fn}>
          <View>
            <Text>Test</Text>
          </View>
        </FlexibleHeaderLayout>,
      )
      .toJSON();

    expect(value).toMatchSnapshot();
  });
});
