import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainerMessage = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${props =>
    props.bubblePosition === 'left' ? 'flex-start' : 'flex-end'};
  margin-left: ${props => (props.bubblePosition === 'left' ? '8px' : 0)};
  margin-right: ${props => (props.bubblePosition === 'left' ? 0 : '8px')};
`;

export const StyledContainerMessageLast = styled.View`
  margin-bottom: ${props => (props.isLast ? '20px' : 0)};
`;

export const AnimatedStyledContainerMessage = Animated.createAnimatedComponent(
  StyledContainerMessageLast,
);

// Bubble
export const AnimatedStyledBubbleContainer = Animated.createAnimatedComponent(
  styled.View`
    width: 100%;
    align-items: ${props =>
      props.bubblePosition === 'left' ? 'flex-start' : 'flex-end'};
    margin-bottom: 10px;
  `,
);

export const AnimatedStyledBubbleOpacity = Animated.createAnimatedComponent(
  styled.View`
    opacity: ${props => (props.isVisible ? 1 : props.animatedInnerStyles)};
  `,
);

export const StyledBubbleWrapper = styled.View`
  border-radius: ${props => props.defaultBorderRadius}px;
  background-color: ${props => props.theme.colors.white};
  min-height: 20px;
  width: ${Dimensions.get('window').width - 100}px
  justify-content: flex-end;
  border-bottom-left-radius: ${props =>
    props.bubblePosition === 'left'
      ? props.reduceBorderRadius
      : props.defaultBorderRadius}px;
  border-bottom-right-radius: ${props =>
    props.bubblePosition === 'right'
      ? props.reduceBorderRadius
      : props.defaultBorderRadius}px;
`;
