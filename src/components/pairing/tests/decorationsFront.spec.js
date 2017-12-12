import React from 'react';
import renderer from 'react-test-renderer';

import DecorationsFront from '../components/DecorationsFront';

describe('DecorationsFront', () => {
  const component = renderer.create(
    <DecorationsFront
      animated
      reset={false}
      type=""
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
