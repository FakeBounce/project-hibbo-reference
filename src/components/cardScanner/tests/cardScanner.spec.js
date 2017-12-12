import React from 'react';
import renderer from 'react-test-renderer';

import CardScanner from '../components/CardScanner';

describe('CardScanner', () => {
  const fn = jest.fn();
  const cardData = {
    cardHolderName: '',
    cardNumber: '',
    cardType: '',
    cvv: '',
    expiracyMonth: '',
    expiracyYear: '',
  };
  const navigation = {
    state: {
      params: {
        scanCard: false,
      },
    },
    goBack: jest.fn(),
  };
  const component = renderer.create(
    <CardScanner
      scanCard={fn}
      cardData={cardData}
      navigation={navigation}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
