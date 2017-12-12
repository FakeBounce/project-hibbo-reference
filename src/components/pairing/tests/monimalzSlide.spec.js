import React from 'react';
import renderer from 'react-test-renderer';

import MonimalzSlide from '../components/MonimalzSlide';

describe('MonimalzSlide', () => {
  const fn = jest.fn();
  const component = renderer.create(
    <MonimalzSlide
      name=""
      source=""
      action={fn}
      type=""
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
