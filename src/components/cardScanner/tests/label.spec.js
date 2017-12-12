import React from 'react';
import renderer from 'react-test-renderer';

import Label from '../components/Label';

describe('Label', () => {
  const component = renderer.create(
    <Label
      label="Some label"
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
