import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Settings from '../components/Settings';

describe('Settings component', () => {
  it('should render the component', () => {
    const nav = {
      dispatch: () => {},
      goBack: () => {},
      navigate: () => {},
      setParams: () => {},
      state: {
        key: '',
        routeName: '',
      },
    };
    const value = renderer.create(<Settings navigation={nav} />).toJSON();

    expect(value).toMatchSnapshot();
  });
});
