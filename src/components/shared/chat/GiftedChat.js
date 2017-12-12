/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  InteractionManager,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { bind } from 'decko';
import uuid from 'uuid';

import * as utils from './utils';
import Avatar from './Avatar';
import Bubble from './Bubble';
import MessageText from './MessageText';
import Composer from './Composer';
import LoadEarlier from './LoadEarlier';
import Message from './Message';
import MessageContainer from './MessageContainer';
import Send from './Send';
import GiftedAvatar from './GiftedAvatar';

// Min and max heights of ToolbarInput and Composer
// Needed for Composer auto grow and ScrollView animation
const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
});
const MIN_INPUT_TOOLBAR_HEIGHT = 44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class GiftedChat extends React.Component {
  static append(currentMessages = [], messages) {
    let resMessage = messages;
    if (!Array.isArray(messages)) {
      resMessage = [messages];
    }
    return resMessage.concat(currentMessages);
  }

  static prepend(currentMessages = [], messages) {
    let resMessage = messages;
    if (!Array.isArray(messages)) {
      resMessage = [messages];
    }
    return currentMessages.concat(resMessage);
  }

  constructor(props) {
    super(props);

    // default values
    this._isMounted = false;
    this._keyboardHeight = 0;
    this._bottomOffset = 0;
    this._maxHeight = null;
    this._isFirstLayout = true;
    this._locale = 'en';
    this._messages = [];

    this.state = {
      scrolled: false,
      isInitialized: false,
      composerHeight: MIN_COMPOSER_HEIGHT,
      messagesContainerHeight: null,
    };

    this.invertibleScrollViewProps = {
      inverted: true,
      keyboardShouldPersistTaps: this.props.keyboardShouldPersistTaps,
      onKeyboardWillShow: this.onKeyboardWillShow,
      onKeyboardWillHide: this.onKeyboardWillHide,
      onKeyboardDidShow: this.onKeyboardDidShow,
      onKeyboardDidHide: this.onKeyboardDidHide,
      onScroll: this.onScroll,
    };

    this.animatedBottomStyles = this.animatedBottomStyles();
  }

  getChildContext() {
    return {
      actionSheet: () => {
        return this._actionSheetRef;
      },
      getLocale: this.getLocale,
    };
  }

  componentWillMount() {
    this.setIsMounted(true);
    this.initLocale();
    this.initMessages(this.props.messages);
  }

  componentWillReceiveProps(nextProps) {
    this.initMessages(nextProps.messages);

    if (this.props.controlsHeight !== nextProps.controlsHeight) {
      if (nextProps.controlsHeight === 0) {
        this.animateBottom(nextProps.controlsHeight);
      } else {
        setTimeout(() => {
          this.animateBottom(nextProps.controlsHeight);
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    this.setIsMounted(false);
  }

  @bind
  onKeyboardWillShow(e) {
    this.setKeyboardHeight(
      e.endCoordinates ? e.endCoordinates.height : e.end.height,
    );
    this.setBottomOffset(this.props.bottomOffset);
    const newMessagesContainerHeight =
      this.getMaxHeight() -
      (this.state.composerHeight +
        (this.getMinInputToolbarHeight() - MIN_COMPOSER_HEIGHT)) -
      this.getKeyboardHeight() +
      this.getBottomOffset();

    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesContainerHeight, {
        toValue: newMessagesContainerHeight,
        duration: 340,
        easing: Easing.bezier(0.1, 0.76, 0.55, 0.9),
      }).start();
    } else {
      this.setState({
        messagesContainerHeight: newMessagesContainerHeight,
      });
    }
  }

  @bind
  onKeyboardWillHide() {
    this.setKeyboardHeight(0);
    this.setBottomOffset(0);
    const newMessagesContainerHeight =
      this.getMaxHeight() -
      (this.state.composerHeight +
        (this.getMinInputToolbarHeight() - MIN_COMPOSER_HEIGHT));

    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesContainerHeight, {
        toValue: newMessagesContainerHeight,
        duration: 340,
        easing: Easing.bezier(0.1, 0.76, 0.55, 0.9),
      }).start();
    } else {
      this.setState({
        messagesContainerHeight: newMessagesContainerHeight,
      });
    }
  }

  @bind
  onKeyboardDidShow(e) {
    if (Platform.OS === 'android') {
      this.onKeyboardWillShow(e);
    }
  }

  @bind
  onKeyboardDidHide(e) {
    if (Platform.OS === 'android') {
      this.onKeyboardWillHide(e);
    }
  }

  @bind
  onInitialLayoutViewLayout(e) {
    const { layout } = e.nativeEvent;

    if (layout.height <= 0) {
      return;
    }
    this.setMaxHeight(layout.height);
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isInitialized: true,
        composerHeight: MIN_COMPOSER_HEIGHT,
        messagesContainerHeight: this.prepareMessagesContainerHeight(
          this.getMaxHeight() - this.getMinInputToolbarHeight(),
        ),
      });
    });
  }

  @bind
  onMainViewLayout(e) {
    if (Platform.OS === 'android') {
      // fix an issue when keyboard is dismissing during the initialization
      const { layout } = e.nativeEvent;

      if (
        this.getMaxHeight() !== layout.height &&
        this.getIsFirstLayout() === true
      ) {
        this.setMaxHeight(layout.height);
        this.setState({
          messagesContainerHeight: this.prepareMessagesContainerHeight(
            this.getMaxHeight() - this.getMinInputToolbarHeight(),
          ),
        });
      }
    }
    if (this.getIsFirstLayout() === true) {
      this.setIsFirstLayout(false);
    }
  }

  @bind
  onScroll(event) {
    const scrollPosY = event.nativeEvent.contentOffset.y;
    const { scrolled } = this.state;

    if (scrollPosY > 0) {
      this.animateIntentsOnScroll('hide');
    } else {
      this.animateIntentsOnScroll('show');
    }

    if (scrollPosY > 150 && !scrolled) {
      this.setState(state => {
        return {
          ...state,
          scrolled: true,
        };
      });
    } else if (scrollPosY < 150 && scrolled) {
      this.setState(state => {
        return {
          ...state,
          scrolled: false,
        };
      });
    }
  }

  @bind
  onSend(messages = [], shouldResetInputToolbar = false) {
    let resMessage = messages;
    if (!Array.isArray(messages)) {
      resMessage = [messages];
    }

    resMessage = resMessage.map(message => {
      return {
        ...message,
        user: this.props.user,
        createdAt: new Date(),
        _id: this.props.messageIdGenerator(),
      };
    });

    if (shouldResetInputToolbar === true) {
      this.resetInputToolbar();
    }

    this.props.appendMessage(resMessage);
    this.scrollToBottom();
  }

  setLocale(locale) {
    this._locale = locale;
  }

  @bind
  getLocale() {
    return this._locale;
  }

  setMessages(messages) {
    this._messages = messages;
  }

  getMessages() {
    return this._messages;
  }

  setMaxHeight(height) {
    this._maxHeight = height;
  }

  getMaxHeight() {
    return this._maxHeight;
  }

  setKeyboardHeight(height) {
    this._keyboardHeight = height;
  }

  getKeyboardHeight() {
    return this._keyboardHeight;
  }

  setBottomOffset(value) {
    this._bottomOffset = value;
  }

  getBottomOffset() {
    return this._bottomOffset;
  }

  setIsFirstLayout(value) {
    this._isFirstLayout = value;
  }

  getIsFirstLayout() {
    return this._isFirstLayout;
  }

  setIsMounted(value) {
    this._isMounted = value;
  }

  getIsMounted() {
    return this._isMounted;
  }

  getMinInputToolbarHeight() {
    return this._isInputToolbar ? MIN_INPUT_TOOLBAR_HEIGHT : 0;
  }

  initLocale() {
    if (this.props.locale === null) {
      this.setLocale('en');
    } else {
      this.setLocale(this.props.locale);
    }
  }

  initMessages(messages = []) {
    this.setMessages(messages);
  }

  prepareMessagesContainerHeight(value) {
    if (this.props.isAnimated === true) {
      return new Animated.Value(value);
    }
    return value;
  }

  scrollToBottom(animated = true) {
    this._messageContainerRef.scrollTo({
      y: 0,
      animated,
    });
  }

  // eslint-disable-next-line
  animatedBottomStyles() {
    return {
      bottom: new Animated.Value(0),
    };
  }

  animateBottom(controlsHeight) {
    Animated.timing(this.animatedBottomStyles.bottom, {
      toValue: controlsHeight,
      duration: 600,
      easing: Easing.ease,
    }).start();
  }

  animateIntentsOnScroll(dir) {
    Animated.parallel([
      Animated.timing(this.animatedBottomStyles.bottom, {
        toValue: dir === 'show' ? this.props.controlsHeight : 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }

  renderMessages() {
    const AnimatedView = this.props.isAnimated === true ? Animated.View : View;

    return (
      <AnimatedView
        style={{
          height: this.state.messagesContainerHeight,
        }}
      >
        <MessageContainer
          {...this.props}
          scrolled={this.state.scrolled}
          messagesLength={this.props.messagesLength}
          invertibleScrollViewProps={this.invertibleScrollViewProps}
          messages={this.getMessages()}
          ref={component => {
            this._messageContainerRef = component;
          }}
        />
        {this.renderChatFooter()}
      </AnimatedView>
    );
  }

  renderChatFooter() {
    if (this.props.renderChatFooter) {
      const footerProps = {
        ...this.props,
      };

      return this.props.renderChatFooter(footerProps);
    }
    return null;
  }

  render() {
    if (this.state.isInitialized === true) {
      return (
        <Animated.View
          style={[styles.container, this.animatedBottomStyles]}
          onLayout={this.onMainViewLayout}
        >
          {this.renderMessages()}
        </Animated.View>
      );
    }
    return (
      <Animated.View
        style={[styles.container, this.animatedBottomStyles]}
        onLayout={this.onInitialLayoutViewLayout}
      >
        {this.props.renderLoading()}
      </Animated.View>
    );
  }
}

GiftedChat.childContextTypes = {
  actionSheet: PropTypes.func,
  getLocale: PropTypes.func,
};

GiftedChat.defaultProps = {
  controlsHeight: 0,
  messages: [],
  locale: null,
  isAnimated: Platform.select({
    ios: true,
    android: false,
  }),
  keyboardShouldPersistTaps: Platform.select({
    ios: 'never',
    android: 'always',
  }),
  renderChatFooter: null,
  renderLoading: null,
  user: {},
  bottomOffset: 0,
  messageIdGenerator: () => {
    return uuid.v4();
  },
};

GiftedChat.propTypes = {
  messagesLength: PropTypes.number.isRequired,
  appendMessage: PropTypes.func.isRequired,
  controlsHeight: PropTypes.number,
  messages: PropTypes.arrayOf(PropTypes.any),
  locale: PropTypes.string,
  isAnimated: PropTypes.bool,
  renderChatFooter: PropTypes.func,
  user: PropTypes.shape({}),
  bottomOffset: PropTypes.number,
  messageIdGenerator: PropTypes.func,
  renderLoading: PropTypes.func,
  keyboardShouldPersistTaps: PropTypes.oneOf(['always', 'never', 'handled']),
};

export {
  GiftedChat,
  Avatar,
  Bubble,
  MessageText,
  Composer,
  LoadEarlier,
  Message,
  Send,
  GiftedAvatar,
  utils,
};
