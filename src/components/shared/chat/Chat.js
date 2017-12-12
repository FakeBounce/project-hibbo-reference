import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import { func, string, shape, arrayOf, any } from 'prop-types';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import uuid from 'uuid/v4';
import Animation from 'lottie-react-native';
import { bind } from 'decko';

import { GiftedChat } from './GiftedChat';
import UserAvatar from './UserAvatar';
import CustomView from './custom/CustomView';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$colors.white',
  },
  avatar: {
    width: 36,
    height: 36,
  },
  content: {
    flex: 1,
  },
});

class Chat extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      controlsHeight: 0,
      showTip: false,
      isLayoutControls: false,
      messages: [],
      messagePagesShown: 1,
      loadEarlier: false,
      init: false,
    };

    this.animatedControlsStyles = this.animatedControlsStyles();
  }

  componentDidMount() {
    this.onLoadEarlier();
  }
  componentWillReceiveProps(nextProps) {
    const bot = {
      createdAt: new Date(),
      user: {
        _id: 2,
      },
    };

    if (this.props.messages.length > nextProps.messages.length) {
      // Reset scenario
      this.setState(state => {
        return {
          ...state,
          loadEarlier: false,
          messages: GiftedChat.prepend([], nextProps.messages),
          messagePagesShown: 1,
        };
      });
    }

    if (
      nextProps.currentState !== this.props.currentState &&
      nextProps.userSpeech !== ''
    ) {
      // Append a message from the user
      const messageToAppend = {
        _id: uuid(),
        createdAt: new Date(),
        text: nextProps.userSpeech,
        user: {
          _id: 1,
        },
      };

      this.props.appendMessage(messageToAppend);
      this.setState(state => {
        return {
          ...state,
          controlsHeight: 0,
          messages: GiftedChat.append(state.messages, messageToAppend),
        };
      });
    }
    if (
      nextProps.currentState !== this.props.currentState &&
      nextProps.botSpeech !== ''
    ) {
      // Append a message from the bot
      const id = uuid();
      const messageToAppend = {
        ...bot,
        _id: id,
        botBubble: {
          id,
          animated: false,
          speech: nextProps.botSpeech,
        },
      };

      setTimeout(() => {
        this.props.appendMessage(messageToAppend);
        this.setState(state => {
          return {
            ...state,
            controlsHeight: 0,
            messages: GiftedChat.append(state.messages, messageToAppend),
          };
        });
      }, 1500);
    }
  }

  onLayoutControls(event) {
    const { height } = event.nativeEvent.layout;
    const DELAY_CONTROLS = 2000;

    this.setState(state => {
      return {
        ...state,
        controlsHeight: 0,
      };
    });

    this.animatedControlsStyles.opacity.setValue(0);
    this.animatedControlsStyles.transform[0].translateY.setValue(100);

    if (height !== this.state.controlsHeight) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          controlsHeight: height,
          isLayoutControls: true,
        });
      }, DELAY_CONTROLS);
    }
  }

  // eslint-disable-next-line
  animatedControlsStyles() {
    return {
      opacity: new Animated.Value(0),
      transform: [{ translateY: new Animated.Value(100) }],
    };
  }

  @bind
  animateControls(dir = 'show') {
    Animated.parallel([
      Animated.timing(this.animatedControlsStyles.opacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(this.animatedControlsStyles.transform[0].translateY, {
        toValue: dir === 'hide' ? this.state.controlsHeight : 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }

  @bind
  onLoadEarlier() {
    const savedMessages = this.props.messages;
    const size = 30;
    const pageNumber = this.state.messagePagesShown - 1;
    const start = pageNumber * size;
    const end =
      (pageNumber + 1) * size >= savedMessages.length
        ? savedMessages.length
        : (pageNumber + 1) * size;

    const currentMessages = savedMessages.slice(start, end);

    const firstMessagesCount =
      this.state.messages.length + currentMessages.length * pageNumber;
    const currentMessagesCount =
      firstMessagesCount === 0 ? 30 : firstMessagesCount;
    const messagesCount = savedMessages.length;

    this.setState(state => {
      return {
        ...state,
        loadEarlier: currentMessagesCount < messagesCount,
        messages: GiftedChat.prepend(state.messages, currentMessages),
        messagePagesShown: state.messagePagesShown + 1,
      };
    });
  }

  @bind
  animateBotDing() {
    this.botAnimation.play();
  }

  @bind
  renderUserAvatar() {
    return (
      <UserAvatar
        avatar={this.props.userData.avatar}
        logged
        firstName={this.props.firstName}
      />
    );
  }

  @bind
  renderBotAvatar() {
    return (
      <Animation
        ref={animation => {
          this.botAnimation = animation;
        }}
        source={this.botAnimationIndex}
        speed={1}
        style={styles.avatar}
      />
    );
  }

  @bind
  renderCustomView(props) {
    return <CustomView {...props} updateMessage={this.updateMessage} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <GiftedChat
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            navigation={this.props.navigation}
            messages={this.state.messages}
            messagesLength={this.props.messages.length}
            appendMessage={this.appendMessage}
            isInputToolbar={this.state.isInputToolbar}
            renderInputToolbar={() => {
              return false;
            }}
            renderCustomView={this.renderCustomView}
            renderAvatar={this.renderBotAvatar}
            renderAvatarUser={this.renderUserAvatar}
            controlsHeight={this.state.controlsHeight}
            animateControls={this.animateControls}
            currentState={this.props.currentState}
            user={{
              _id: 1,
            }}
          />
        </View>
      </View>
    );
  }
}

Chat.propTypes = {
  appendMessage: func.isRequired,
  setClipboardData: func.isRequired,
  botSpeech: string.isRequired,
  userSpeech: string.isRequired,
  currentState: string.isRequired,
  navigation: shape({}).isRequired,
  firstName: string.isRequired,
  messages: arrayOf(any).isRequired,
  userData: shape({}).isRequired,
};

const mapStateToProps = state => {
  return {
    userData: state.profile.userData,
  };
};

export default connect(mapStateToProps, null)(Chat);
