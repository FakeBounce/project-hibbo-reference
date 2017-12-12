import React from 'react';
import renderer from 'react-test-renderer';

import WifiList from '../components/setupForm/WifiList';

describe('WifiList', () => {
  const fn = jest.fn();
  const component = renderer.create(
    <WifiList
      setData={fn}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
