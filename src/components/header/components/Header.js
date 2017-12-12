import React from 'react';
import { Animated } from 'react-native';
import {
  shape,
  instanceOf,
  func,
  string,
  oneOf,
  oneOfType,
  object,
  number,
  array,
} from 'prop-types';
import logo from 'assets/header/logo.png';
import { SHeaderContainer } from '../styles';
import Logo from './Logo';
import CustomSwitchButton from './CustomSwitchButton';
import Notification from './Notification';

const Header = ({
  logoStyle,
  onLogoPress,
  defaultSwitchStatus,
  navigation,
  style,
  numberOfNotification,
  logout,
}) => {
  return (
    <SHeaderContainer style={style}>
      <Notification
        navigation={navigation}
        numberOfNotification={numberOfNotification}
      />
      <Logo imgSrc={logo} style={logoStyle} onPress={onLogoPress} />
      <CustomSwitchButton
        status={defaultSwitchStatus}
        action={() => {
          logout();
          // this.props.onSwitchValueChange();
        }}
      />
    </SHeaderContainer>
  );
};

Header.defaultProps = {
  defaultSwitchStatus: 'on',
  style: {},
};

Header.propTypes = {
  style: oneOfType([object, number, array]),
  logoStyle: shape({
    opacity: instanceOf(Animated.Value),
  }).isRequired,
  onLogoPress: func.isRequired,
  defaultSwitchStatus: oneOf(['on', 'off']),
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
  numberOfNotification: number.isRequired,
  logout: func.isRequired,
};
export default Header;
