import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Toast from 'shared/Toast';

describe('Toast', () => {
  it('should render the component with top position', () => {
    const toast = renderer.create(<Toast label="Some label" position="top" />).toJSON();

    expect(toast).toMatchSnapshot();
  });

  it('should render the component with bottom position', () => {
    const toast = renderer.create(<Toast label="Some label" position="bottom" />).toJSON();

    expect(toast).toMatchSnapshot();
  });
});
