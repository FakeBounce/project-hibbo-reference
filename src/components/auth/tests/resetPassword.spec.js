import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import { getTranslations } from 'utils/i18n';

import ResetPassword from '../components/ResetPassword';

describe('ResetPassword', () => {
  const fn = jest.fn();
  const styling = {
    opacity: new Animated.Value(100),
  };
  const form = {
    label: [getTranslations('auth.label.email'), 'email'],
    form: {
      email: '',
    },
  };
  const position = {
    x: 0,
    y: 0,
  };

  const component = renderer
    .create(
      <ResetPassword
        styling={styling}
        errorApi=""
        form={form}
        error={false}
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
