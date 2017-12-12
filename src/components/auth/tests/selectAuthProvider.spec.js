import { Animated } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EStyleSheet from 'react-native-extended-stylesheet';

import appStyles from 'styles/appStyles';

import SelectAuthProvider from '../components/SelectAuthProvider';

EStyleSheet.build(appStyles);

describe('SelectAuthProvider', () => {
  const styling = {
    height: new Animated.Value(300),
    opacity: new Animated.Value(1),
  };

  it('should render the component', () => {
    const fn = jest.fn();
    const component = renderer
      .create(
        <SelectAuthProvider
          authType=""
          goToNextStep={fn}
          registerWithGoogle={fn}
          loginWithGoogle={fn}
          registerWithFb={fn}
          loginWithFb={fn}
          fbError=""
          googleError=""
          styling={styling}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should handle error from fb', () => {
    const fn = jest.fn();
    const component = renderer
      .create(
        <SelectAuthProvider
          authType=""
          goToNextStep={fn}
          registerWithGoogle={fn}
          loginWithGoogle={fn}
          registerWithFb={fn}
          loginWithFb={fn}
          fbError="Error"
          googleError=""
          styling={styling}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should handle error from google', () => {
    const fn = jest.fn();
    const component = renderer
      .create(
        <SelectAuthProvider
          authType=""
          goToNextStep={fn}
          registerWithGoogle={fn}
          loginWithGoogle={fn}
          registerWithFb={fn}
          loginWithFb={fn}
          fbError=""
          googleError="Error"
          styling={styling}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
