import React from 'react';
import renderer from 'react-test-renderer';

import Title from '../components/Title';

describe('Title', () => {
  let component = renderer.create(
    <Title
      label1=""
      label2=""
      label3=""
      border={false}
      color="red"
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render the component with border', () => {
    component = renderer.create(
      <Title
        label1=""
        label2=""
        label3=""
        border
        color="red"
      />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render the component with 3 lines of text', () => {
    component = renderer.create(
      <Title
        label1="1"
        label2="2"
        label3="3"
        border
        color="red"
      />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
