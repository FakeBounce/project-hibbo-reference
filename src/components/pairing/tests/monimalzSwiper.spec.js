import {
  Animated,
} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import MonimalzSwiper from '../components/MonimalzSwiper';

describe('MonimalzSwiper', () => {
  const fn = jest.fn();
  const animatedStyles = {
    titleOpacity: new Animated.Value(1),
    monimalzBounce: new Animated.Value(0),
    monimalzScale: new Animated.Value(1),
  };
  const component = renderer.create(
    <MonimalzSwiper
      chooseType={fn}
      handleMonimalzPosition={fn}
      type=""
      animatedStyles={animatedStyles}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
