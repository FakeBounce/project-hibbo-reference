import React from 'react';
import renderer from 'react-test-renderer';

import Background from '../components/Background';

describe('Background', () => {
  const component = renderer.create(
    <Background
      animated
      reset={false}
      type=""
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
