import React from 'react';
import renderer from 'react-test-renderer';

import WifiPwd from '../components/setupForm/WifiPwd';

describe('WifiPwd', () => {
  const form = {
    wifiName: '',
    wifiPwd: '',
  };
  const fn = jest.fn();
  const controls = {
    rightLabel: '',
  };
  const component = renderer.create(
    <WifiPwd
      form={form}
      setData={fn}
      validate={fn}
      error={false}
      controls={controls}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
