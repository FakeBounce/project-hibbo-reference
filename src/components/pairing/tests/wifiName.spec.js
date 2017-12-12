import React from 'react';
import renderer from 'react-test-renderer';

import WifiName from '../components/setupForm/WifiName';

describe('WifiName', () => {
  const fn = jest.fn();
  const component = renderer.create(
    <WifiName
      label=""
      action={fn}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
