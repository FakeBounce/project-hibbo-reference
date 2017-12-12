import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import MenuLink from '../components/MenuLink';
import MenuLinkContainer from '../';

describe('MenuLink', () => {
  const text = 'test';
  const linkScale = new Animated.Value(1);
  const linkOpacity = new Animated.Value(1);
  const onBeginPress = jest.fn();
  const onStopPress = jest.fn();
  const to = jest.fn();

  const createMenuLink = device => {
    return renderer
      .create(
        <MenuLink
          text={text}
          linkScale={linkScale}
          linkOpacity={linkOpacity}
          device={device}
          onBeginPress={onBeginPress}
          onStopPress={onStopPress}
          to={to}
        />,
      )
      .toJSON();
  };

  const createMenuLinkContainer = device => {
    const mockStore = configureStore();
    const store = mockStore({
      device,
    });
    return renderer
      .create(
        <Provider store={store}>
          <MenuLinkContainer
            text={text}
            linkScale={linkScale}
            linkOpacity={linkOpacity}
            device={device}
            onBeginPress={onBeginPress}
            onStopPress={onStopPress}
            to={to}
          />
        </Provider>,
      )
      .toJSON();
  };

  it('should render the component for iphone', () => {
    const menuLink = createMenuLink('iphone');

    expect(menuLink).toMatchSnapshot();
  });

  it('should render the component for ipad', () => {
    const menuLink = createMenuLink('ipad');

    expect(menuLink).toMatchSnapshot();
  });

  it('should render the container for iphone', () => {
    const menuLink = createMenuLinkContainer('iphone');

    expect(menuLink).toMatchSnapshot();
  });

  it('should render the container for ipad', () => {
    const menuLink = createMenuLinkContainer('ipad');

    expect(menuLink).toMatchSnapshot();
  });

  it('should click on menu', () => {
    const tree = shallow(
      <MenuLink
        text={text}
        linkScale={linkScale}
        linkOpacity={linkOpacity}
        onBeginPress={onBeginPress}
        onStopPress={onStopPress}
        to={to}
      />,
    );

    tree.find('TouchableRipple').first().simulate('pressIn');
    tree.find('TouchableRipple').first().simulate('press');
    tree.find('TouchableRipple').first().simulate('pressOut');
    expect(to).toHaveBeenCalled();
    expect(onBeginPress).toHaveBeenCalled();
    expect(onStopPress).toHaveBeenCalled();
  });

  it('should click on menu container', () => {
    const mockStore = configureStore();
    const store = mockStore({
      device: 'iphone',
    });
    const tree = shallow(
      <Provider store={store}>
        <MenuLinkContainer
          text={text}
          linkScale={linkScale}
          linkOpacity={linkOpacity}
          onBeginPress={onBeginPress}
          onStopPress={onStopPress}
          to={to}
        />
      </Provider>,
    );

    tree.find('TouchableRipple').first().simulate('pressIn');
    tree.find('TouchableRipple').first().simulate('press');
    tree.find('TouchableRipple').first().simulate('pressOut');
    expect(to).toHaveBeenCalled();
    expect(onBeginPress).toHaveBeenCalled();
    expect(onStopPress).toHaveBeenCalled();
  });
});
