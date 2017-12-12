/* eslint no-underscore-dangle: 0 */
import React from 'react';
import {
  arrayOf,
  bool,
  func,
  oneOf,
  shape,
  number,
  object,
  oneOfType,
  string,
  any,
} from 'prop-types';
import { Animated, Easing } from 'react-native';

import {
  StyledContainerMessage,
  AnimatedStyledContainerMessage,
} from './styles';

import Avatar from './Avatar';
import Bubble from './Bubble';

import { isSameUser, isSameDay } from './utils';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.animatedStyles = this.animatedStyles();
  }

  componentDidMount() {
    this.animateShow();
  }

  // eslint-disable-next-line
  animatedStyles() {
    return {
      marginTop: new Animated.Value(-60),
      transform: [{ translateY: new Animated.Value(80) }],
    };
  }

  animateShow() {
    Animated.parallel([
      Animated.timing(this.animatedStyles.transform[0].translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(this.animatedStyles.marginTop, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }

  getInnerComponentProps() {
    const { ...props } = this.props;

    return {
      ...props,
      isSameUser,
      isSameDay,
    };
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();

    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps} />;
  }

  renderAvatar() {
    const avatarProps = this.getInnerComponentProps();

    return (
      <Avatar
        {...avatarProps}
        position={this.props.currentMessage.user._id === 1 ? 'right' : 'left'}
      />
    );
  }

  render() {
    if (!this.props.currentMessage.display) {
      return null;
    }
    return (
      <AnimatedStyledContainerMessage
        isLast={this.props.isLast}
        style={
          this.props.isLast &&
          !this.props.isUpdating &&
          !this.props.messages[0].isAnimated &&
          this.animatedStyles
        }
      >
        <StyledContainerMessage
          bubblePosition={this.props.position}
          style={this.props.containerStyle[this.props.position]}
        >
          {this.props.position === 'left' ? this.renderAvatar() : null}
          {this.renderBubble()}
          {this.props.currentMessage.user._id === 1
            ? this.renderAvatar()
            : null}
        </StyledContainerMessage>
      </AnimatedStyledContainerMessage>
    );
  }
}

Message.defaultProps = {
  renderAvatar: null,
  renderBubble: null,
  renderDay: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
  isLast: false,
  isUpdating: false,
  messages: [],
};

Message.propTypes = {
  messages: arrayOf(any),
  isLast: bool,
  isUpdating: bool,
  renderAvatar: func,
  renderBubble: func,
  renderDay: func,
  position: oneOf(['left', 'right']),
  currentMessage: shape({
    display: bool.isRequired,
    user: shape({
      _id: number,
    }),
  }),
  nextMessage: shape({}),
  previousMessage: shape({}),
  user: shape({}),
  containerStyle: shape({
    left: oneOfType([string, object, number]),
    right: oneOfType([string, object, number]),
  }),
};
