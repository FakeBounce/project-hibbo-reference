import React from 'react';
import renderer from 'react-test-renderer';

import Form from '../components/Form';

describe('Form', () => {
  const fn = jest.fn();
  const form = {
    name: '',
    cardNumber: '',
    cardType: '',
    month: '',
    year: '',
    crypto: '',
  };
  const label = ['', '', '', '', ''];
  const error = {
    name: false,
    cardNumber: false,
    cardType: false,
    month: false,
    year: false,
    crypto: false,
  };
  const component = renderer.create(
    <Form
      form={form}
      label={label}
      onChange={fn}
      error={error}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
