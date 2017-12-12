import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { StyledTextXSmall } from 'styles/styledComponents/texts';
import {
  StyledContainerCenter,
  StyledContainerImageCenter,
} from 'styles/styledComponents/containers';
import TouchableRipple from 'shared/TouchableRipple';

const defaultBorderRadius = 23;
const reduceBorderRadius = 3;

// BotBubble
export const StyledBotBubbleContainer = styled.View`
  border-radius: ${defaultBorderRadius}px;
  border-bottom-left-radius: 3px;
  max-width: ${props => props.theme.size.maxBubbleWidth}px;
  background-color: ${props => {
    if (!props.isToggled && props.currentMessage) {
      if (props.currentMessage.color) {
        return props.currentMessage.color;
      } else if (props.currentMessage.user._id === 1) {
        return props.theme.colors.buttonGrey;
      }
    }
    return props.theme.colors.buttonGrey;
  }};
  border-top-left-radius: ${props =>
    props.bubblePosition === 'left' && props.isSame
      ? reduceBorderRadius
      : defaultBorderRadius}px;
  border-top-right-radius: ${props =>
    props.bubblePosition === 'right' && props.isSame
      ? reduceBorderRadius
      : defaultBorderRadius}px;
`;

export const AnimatedStyledBotBubbleContainer = Animated.createAnimatedComponent(
  StyledBotBubbleContainer,
);

export const StyledBotBubbleFakeBubble = styled.View`
  position: absolute;
  opacity: 0;
  transform: translate(9999px, 0);
`;

export const StyledBotBubbleSizing = styled.View`
  position: relative;
  background-color: ${props => props.theme.colors.white};
  width: ${Dimensions.get('window').width / 1.7}px;
`;

export const StyledBotBubbleText = StyledTextXSmall.extend`
  max-width: ${props => props.theme.size.maxBubbleWidth - 10}px;
`;

const StyledBotBubbleCenterContent = styled.View`
  justify-content: ${props => (props.isToggled ? 'flex-start' : 'center')};
  align-items: center;
  max-width: ${props => props.theme.size.maxBubbleWidth}px;
`;

export const AnimatedStyledBotBubbleCenterContent = Animated.createAnimatedComponent(
  StyledBotBubbleCenterContent,
);

// TransfertBubble
const StyledTransfertBubbleContainer = StyledBotBubbleContainer.extend`
  width: 100%;
  max-width: 100%;
  }};
`;

export const AnimatedStyledTransfertBubbleContainer = Animated.createAnimatedComponent(
  StyledTransfertBubbleContainer,
);

export const AniamtedStyledTransfertBubbleCenterContent = Animated.createAnimatedComponent(StyledBotBubbleCenterContent.extend`
  width: 100%;
  max-width: 100%;
`);

export const StyledTransfertBubbleText = styled.View`
  flex-direction: row;
  border-radius: ${defaultBorderRadius}px;
  border-bottom-left-radius: 3px;
  max-width: ${props => props.bubbleMaxWidth}px;
`;

export const StyledTransfertBubbleAmount = StyledContainerCenter.extend`
  background-color: ${props => props.theme.colors.whiteOpac};
  border-radius: 38px;
  width: 52px;
  height: 26px;
  margin-top: 5px;
`;

const StyledTransfertBubbleTextDefault = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.white};
  max-width: ${props => props.theme.size.maxBubbleWidth - 10};
`;

export const StyledTransfertBubbleText1 = StyledTransfertBubbleTextDefault.extend`
  margin-top: 0;
`;

export const StyledTransfertBubbleText2 = StyledTransfertBubbleTextDefault.extend`
  font-family: ${props => props.theme.fonts.circularBold};
  font-size: ${props => props.theme.textSizes.normal};
`;

export const StyledTransfertBubbleText3 = StyledTransfertBubbleTextDefault.extend`
  font-family: ${props => props.theme.fonts.circularBold};
`;

export const StyledTransfertBubbleCoin = StyledContainerImageCenter.extend`
  margin-top: 23px;
  margin-left: 10px;
`;

// DateBubble
export const StyledDateBubbleText = StyledTextXSmall.extend`
  font-size: ${props => props.theme.textSizes.xxsmall};
  color: ${props => props.theme.colors.textGrey};
  align-items: center;
  justify-content: center;
`;

export const StyledDateBubbleTouchableRipple = styled(TouchableRipple)`
  background-color: ${props => props.theme.colors.white};
  align-items: center;
  padding-top: 20px;
  padding-bottom: 5px;
  width: 100%;
  padding-right: ${props => props.paddingSup}px;
`;

// TextBubble
export const StyledTextBubbleContainer = styled.View`
  flex-direction: row;
  padding-vertical: 15px;
  padding-horizontal: 15px;
  border-radius: ${defaultBorderRadius}px;
  border-bottom-left-radius: 3px;
  max-width: ${props => props.theme.size.maxBubbleWidth};
`;

export const StyledTextBubbleText = StyledTextXSmall.extend`
  margin-top: 5px;
  text-decoration-line: none;
`;

// DefaultTransfertBubble
export const StyledDefautlTransfertBubbleText = StyledContainerCenter.extend`
  border-radius: ${defaultBorderRadius}px;
  border-bottom-left-radius: 3px;
  width: 100%;
`;

export const StyledDefautlTransfertBubbleText1 = StyledTransfertBubbleText1.extend`
  text-align: center;
  margin-bottom: 15px;
`;
