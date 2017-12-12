import React from 'react';
import renderer from 'react-test-renderer';

import FormDate from '../components/FormDate';

describe('FormDate', () => {
  const fn = jest.fn();
  const component = renderer.create(
    <FormDate
      labelMonth="Some label"
      valueMonth=""
      errorMonth={false}
      labelYear="Some label"
      valueYear=""
      errorYear={false}
      onChange={fn}
      validate={fn}
      maxLength={3}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
