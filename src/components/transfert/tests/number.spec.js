import React from 'react';
import renderer from 'react-test-renderer';

import Number from '../components/Number';

jest.mock('lottie-react-native', () => 'Animation');
describe('Number', () => {
  it('should render the component for pay', () => {
    const number = renderer.create(
      <Number
        totalAmount="10"
        amountInfo={{
          fs: 108,
          scale: 0.5,
          marginTop: 20,
        }}
        isDebit={false}
      />,
    ).toJSON();

    expect(number).toMatchSnapshot();
  });

  it('should render the component for debit', () => {
    const number = renderer.create(
      <Number
        totalAmount="10"
        amountInfo={{
          fs: 108,
          scale: 0.5,
          marginTop: 20,
        }}
        isDebit
      />,
    ).toJSON();

    expect(number).toMatchSnapshot();
  });
});
