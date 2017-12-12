import { Animated } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TextView from '../components/TextView';

describe('TextView', () => {
  it('should render the component for iphone', () => {
    const text = 'test';
    const linkScale = new Animated.Value(1);
    const linkOpacity = new Animated.Value(1);
    const device = 'iphone';

    const textView = renderer
      .create(
        <TextView text={text} linkScale={linkScale} linkOpacity={linkOpacity} device={device} />,
      )
      .toJSON();

    expect(textView).toMatchSnapshot();
  });

  it('should render the component for ipad', () => {
    const text = 'test';
    const linkScale = new Animated.Value(1);
    const linkOpacity = new Animated.Value(1);
    const device = 'ipad';

    const textView = renderer
      .create(
        <TextView text={text} linkScale={linkScale} linkOpacity={linkOpacity} device={device} />,
      )
      .toJSON();

    expect(textView).toMatchSnapshot();
  });
});
