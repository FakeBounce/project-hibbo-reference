import { Animated } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EStyleSheet from 'react-native-extended-stylesheet';

import appStyles from 'styles/appStyles';

import Controls from '../components/Controls';

EStyleSheet.build(appStyles);

describe('Controls', () => {
  const fn = jest.fn();
  const styling = {
    opacity: new Animated.Value(100),
  };

  it('should render the component', () => {
    const component = renderer.create(<Controls styling={styling} selectAuthType={fn} />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
