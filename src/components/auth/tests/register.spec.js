import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import { getLanguage, getTranslations } from 'utils/i18n';

import Register from '../components/Register';

describe('Register', () => {
  const fn = jest.fn();
  const styling = {
    opacity: new Animated.Value(100),
  };
  const progress = {
    width: new Animated.Value(100),
  };
  const form = {
    label: [
      [getTranslations('auth.label.email'), 'email'],
      [getTranslations('auth.label.lastname'), 'lastname'],
      [getTranslations('auth.label.firstname'), 'firstname'],
      [getTranslations('auth.label.password'), 'password'],
    ],
    form: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      language: getLanguage(),
    },
  };
  const position = {
    x: 0,
    y: 0,
  };

  const component = renderer
    .create(
      <Register
        styling={styling}
        errorApi=""
        form={form}
        step={0}
        error={false}
        progress={progress}
        handleInputPosition={fn}
        back={fn}
        validate={fn}
        onChange={fn}
        errorMsg=""
        inputPosition={position}
      />,
    )
    .toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
