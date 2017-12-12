import React from 'react';
import renderer from 'react-test-renderer';
import {
  Animated,
} from 'react-native';

import TransfertHeader from '../components/TransfertHeader';

describe('TransfertHeader', () => {
  it('should render the component', () => {
    const number = renderer.create(
      <TransfertHeader
        selectedTab={0}
        callback={jest.fn}
        isMoneyPot={false}
        moveBar={new Animated.Value(0)}
      />,
    ).toJSON();

    expect(number).toMatchSnapshot();
  });
});
