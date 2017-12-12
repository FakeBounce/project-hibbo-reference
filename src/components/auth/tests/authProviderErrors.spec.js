import React from 'react';
import renderer from 'react-test-renderer';

import AuthProviderErrors from '../components/AuthProviderErrors';

describe('AuthProviderErrors', () => {
  const position = {
    x: 0,
    y: 0,
  };

  it('should render the component', () => {
    const component = renderer
      .create(
        <AuthProviderErrors
          fbError=""
          googleError=""
          fbPosition={position}
          googlePosition={position}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render the component on fb error', () => {
    const component = renderer
      .create(
        <AuthProviderErrors
          fbError="Error"
          googleError=""
          fbPosition={position}
          googlePosition={position}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render the component on google error', () => {
    const component = renderer
      .create(
        <AuthProviderErrors
          fbError=""
          googleError="Error"
          fbPosition={position}
          googlePosition={position}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
