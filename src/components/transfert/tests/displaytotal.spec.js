import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTotal from '../components/DisplayTotal';

jest.mock('lottie-react-native', () => 'Animation');
describe('DisplayTotal', () => {
  it('should render the component for pay', () => {
    const number = renderer.create(
      <DisplayTotal
        totalAmount="10"
        isDebit={false}
      />,
    ).toJSON();

    expect(number).toMatchSnapshot();
  });

  it('should render the component for debit', () => {
    const number = renderer.create(
      <DisplayTotal
        totalAmount="10"
        isDebit
      />,
    ).toJSON();

    expect(number).toMatchSnapshot();
  });
});
