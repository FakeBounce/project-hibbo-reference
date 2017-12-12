import React from 'react';
import renderer from 'react-test-renderer';

import DecorationsMonkeyFront from '../components/DecorationsMonkeyFront';

describe('DecorationsMonkeyFront', () => {
  const component = renderer.create(
    <DecorationsMonkeyFront
      animated
      reset={false}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
