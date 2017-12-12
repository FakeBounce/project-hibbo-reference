import React from 'react';
import renderer from 'react-test-renderer';
import EStyleSheet from 'react-native-extended-stylesheet';

import appStyles from 'styles/appStyles';

import Auth from '../components/Auth';

EStyleSheet.build(appStyles);

describe('Auth', () => {
  const fn = jest.fn();
  const navigation = {
    dispatch: () => {},
    goBack: () => {},
    navigate: () => {},
    setParams: () => {},
    state: {
      key: '',
      routeName: '',
    },
  };

  const component = renderer.create(
    <Auth
      startLogin={fn}
      startRegister={fn}
      resetPwdStart={fn}
      registerWithGoogle={fn}
      loginWithGoogle={fn}
      registerWithFb={fn}
      loginWithFb={fn}
      navigation={navigation}
      token=""
      fbError=""
      googleError=""
      error=""
      resetAllErrors={() => {}}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
