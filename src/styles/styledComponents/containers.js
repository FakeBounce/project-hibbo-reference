import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainerCard = styled.View`
  flex: 1;
  margin: ${props => props.theme.size.cardMargin}px;
  border-radius: ${props => props.theme.cardStyle.borderRadius}px;
  shadow-opacity: ${props => props.theme.cardStyle.shadowOpacity};
  shadow-color: ${props => props.theme.cardStyle.shadowColor};
`;

export const StyledColumn = styled.View`
  flex-direction: 'column';
`;

export const StyledContainerBasic = styled.View`
  flex: 1;
`;

export const AContainerBasic = styled(
  Animated.createAnimatedComponent(StyledContainerBasic),
)``;

export const StyledContainerRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const StyledContainerColumn = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const StyledContainerCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledFlexContainerCenter = StyledContainerBasic.extend`
  align-items: center;
  justify-content: center;
`;

export const StyledContainerImageCenter = styled.Image`
  align-items: center;
  justify-content: center;
`;

export const StyledFullContainerCenter = StyledContainerCenter.extend`
  flex: 1;
`;

export const StyledAndroidWrapper = styled.View`
  background-color: transparent;
`;

const StyledContainerModal = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.black};
`;
export const AnimatedContainerModal = styled(
  Animated.createAnimatedComponent(StyledContainerModal),
)``;

export const StyledContainerBlack = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.black};
`;
export const StyledContainerWrapper = styled.View`
  flex: 1;
  overflow: hidden;
`;

export const StyledBackground = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledAbsolute = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledSemiRow = styled.View`
  flex-direction: column;
  width: ${props => (props.editMode ? '85%' : '50%')};
`;

export const StyledContainerDeepBlue = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.deepBlue};
  width: 100%;
  border-radius: ${props => props.theme.cardStyle.borderRadius}px;
`;

export const StyledModalOpac = StyledContainerCenter.extend`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.white};
  opacity: 0.3;
`;
