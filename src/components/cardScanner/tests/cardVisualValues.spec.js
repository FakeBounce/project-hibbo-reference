import React from 'react';
import renderer from 'react-test-renderer';

import CardVisualValues from '../components/CardVisualValues';

describe('CardVisualValues', () => {
  let component = renderer.create(
    <CardVisualValues
      cardNumber=""
      expiracyMonth=""
      expiracyYear=""
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render the component for null cvv', () => {
    component = renderer.create(
      <CardVisualValues
        cardNumber=""
        expiracyMonth={0}
        expiracyYear={0}
      />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
