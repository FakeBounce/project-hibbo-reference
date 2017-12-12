import React from 'react';
import renderer from 'react-test-renderer';

import BottomControls from '../components/setupForm/BottomControls';

describe('BottomControls', () => {
  const fn = jest.fn();
  const component = renderer.create(
    <BottomControls
      leftLabel=""
      leftAction={fn}
      RightLabel=""
      RightAction={fn}
      style={{}}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
