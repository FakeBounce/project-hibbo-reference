import React from 'react';
import renderer from 'react-test-renderer';

import CardVisual from '../components/CardVisual';

describe('CardVisual', () => {
  let component = renderer.create(
    <CardVisual
      cardNumber=""
      expiracyMonth=""
      expiracyYear=""
      cardType=""
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render the component for a visa card', () => {
    component = renderer.create(
      <CardVisual
        cardNumber=""
        expiracyMonth=""
        expiracyYear=""
        cardType="visa"
      />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
