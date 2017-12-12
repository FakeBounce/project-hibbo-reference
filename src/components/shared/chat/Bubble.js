/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { bool, shape, func, string, any, oneOf } from 'prop-types';
import { View, Animated, Easing, ViewPropTypes } from 'react-native';

import {
  AnimatedStyledBubbleContainer,
  StyledBubbleWrapper,
  AnimatedStyledBubbleOpacity,
} from './styles';

import MessageText from './MessageText';
import CustomView from './custom/CustomView';

import { isSameUser, isSameDay } from './utils';

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);

    this.animatedStyles = {
      opacity: new Animated.Value(1),
      transform: [
        { translateY: new Animated.Value(0) },
        { translateX: new Animated.Value(0) },
        { scale: new Animated.Value(1) },
      ],
    };
    this.animatedInnerStyles = {
      width: new Animated.Value(0),
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    if (!this.props.isLast) {
      this.animatedStyles.opacity.setValue(1);
      this.animatedStyles.transform[2].scale.setValue(1);
      this.animatedStyles.transform[1].translateX.setValue(0);
      this.animatedStyles.transform[0].translateY.setValue(0);
    }
  }

  /*
   ** animate bubble
   */

  animateShow() {
    // set origin value
    this.animatedStyles.opacity.setValue(0);
    this.animatedStyles.transform[2].scale.setValue(0);
    this.animatedStyles.transform[1].translateX.setValue(0);
    this.animatedStyles.transform[0].translateY.setValue(0);

    Animated.parallel([
      Animated.timing(this.animatedStyles.opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.exp),
        delay: 30,
      }),
      Animated.timing(this.animatedStyles.transform[0].translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.exp),
        delay: 0,
      }),
      Animated.timing(this.animatedStyles.transform[1].translateX, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.exp),
        delay: 0,
      }),
      Animated.timing(this.animatedStyles.transform[2].scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.exp),
        delay: 0,
      }),
    ]).start();
  }

  handleBubbleToPrevious() {
    return (
      isSameUser(this.props.currentMessage, this.props.nextMessage) &&
      isSameDay(this.props.currentMessage, this.props.nextMessage)
    );
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const { ...messageTextProps } = this.props;

      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return (
      <CustomView {...this.props} isSame={this.handleBubbleToPrevious()} />
    );
  }

  render() {
    const {
      position,
      wrapperStyle,
      containerToNextStyle,
      containerToPreviousStyle,
      containerStyle,
      isLast,
      isUpdating,
      animated,
    } = this.props;
    return (
      <AnimatedStyledBubbleContainer
        bubblePosition={position}
        style={[containerStyle[position], this.animatedStyles]}
      >
        <StyledBubbleWrapper
          defaultBorderRadius={23}
          reduceBorderRadius={3}
          bubblePosition={position}
          isSame={this.handleBubbleToPrevious()}
          isToggled={animated}
          style={[
            wrapperStyle[position],
            containerToNextStyle[position],
            this.handleBubbleToPrevious() && containerToPreviousStyle[position],
          ]}
        >
          <View>
            <AnimatedStyledBubbleOpacity
              isVisible={!(isLast && isUpdating)}
              animatedInnerStyles={this.animatedInnerStyles}
            >
              {this.renderCustomView()}
              {this.renderMessageText()}
            </AnimatedStyledBubbleOpacity>
          </View>
        </StyledBubbleWrapper>
      </AnimatedStyledBubbleContainer>
    );
  }
}

Bubble.contextTypes = {
  actionSheet: func,
};

Bubble.defaultProps = {
  touchableProps: {},
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  position: 'left',
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
  isLast: false,
  isUpdating: false,
  animated: false,
};

Bubble.propTypes = {
  isUpdating: bool,
  animated: bool,
  isLast: bool,
  touchableProps: shape({}),
  renderMessageImage: func,
  renderMessageText: func,
  renderCustomView: func,
  position: oneOf(['left', 'right']),
  currentMessage: shape({
    text: string,
    createdAt: any,
    image: any,
  }),
  nextMessage: shape({}),
  previousMessage: shape({}),
  containerStyle: shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  wrapperStyle: shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  containerToNextStyle: shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  containerToPreviousStyle: shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};
