import React from 'react';
import renderer from 'react-test-renderer';

import FormRow from '../components/FormRow';

describe('FormRow', () => {
  const fn = jest.fn();
  const component = renderer.create(
    <FormRow
      labelName="Some label"
      value=""
      label="Some label"
      name=""
      onChange={fn}
      validate={fn}
      error={false}
      width={300}
      maxLength={3}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
