import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// eslint-disable-next-line
import TouchableRipple from 'shared/TouchableRipple';

const { height } = Dimensions.get('window');

// Header
export const SHeaderContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: ${height * 0.04}px;
  position: relative;
`;

export const StyledCentered = styled.View`
  align-items: center;
  align-self: center;
`;

// Logo
export const AConnected = styled(Animated.View)`
  background-color: ${props => props.theme.colors.red}
  border-radius: 50;
  width: 7px;
  height: 7px;
  margin-top: 10px;
`;
export const SContainerRipple = styled(TouchableRipple)`
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
`;
export const SLogo = styled.View`
  align-items: center;
`;
export const SIcon = styled.Image`
  width: 45px;
  height: 43px;
`;
