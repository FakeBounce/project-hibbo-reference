import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import { getTranslations } from 'utils/i18n';

import Login from '../components/Login';

describe('Login', () => {
  const fn = jest.fn();
  const styling = {
    opacity: new Animated.Value(100),
  };
  const form = {
    label: [
      [getTranslations('auth.label.email'), 'email'],
      [getTranslations('auth.label.password'), 'password'],
    ],
    form: {
      email: '',
      password: '',
    },
  };
  const position = {
    x: 0,
    y: 0,
  };

  const component = renderer
    .create(
      <Login
        styling={styling}
        errorApi=""
        form={form}
        step={0}
        error={false}
        handleInputPosition={fn}
        back={fn}
        validate={fn}
        onChange={fn}
        errorMsg=""
        inputPosition={position}
        changeAuthType={fn}
      />,
    )
    .toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
