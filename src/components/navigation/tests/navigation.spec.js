import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Navigation from '../components/Navigation';
import NavigationContainer from '../';

describe('Navigation', () => {
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
  const mockStore = configureStore();
  const store = mockStore({
    device: 'iphone',
  });


  it('should render the container', () => {
    const navigation = renderer.create(
      <Provider store={store}>
        <NavigationContainer navigation={nav} goTo={jest.fn} />
      </Provider>,
    ).toJSON();

    expect(navigation).toMatchSnapshot();
  });

  it('should render the component for adult', () => {
    const navigation = renderer.create(
      <Provider store={store}>
        <Navigation navigation={nav} mode="adult" goTo={jest.fn} />
      </Provider>,
    ).toJSON();

    expect(navigation).toMatchSnapshot();
  });

  it('should render the component for children', () => {
    const navigation = renderer.create(
      <Provider store={store}>
        <Navigation navigation={nav} mode="children" goTo={jest.fn} />
      </Provider>,
    ).toJSON();

    expect(navigation).toMatchSnapshot();
  });
});
