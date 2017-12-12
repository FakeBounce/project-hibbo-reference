import {
  Animated,
} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ProgressBar from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('should render the component', () => {
    const styling = {
      width: new Animated.Value(100),
    };
    const component = renderer.create(
      <ProgressBar
        styling={styling}
      />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
