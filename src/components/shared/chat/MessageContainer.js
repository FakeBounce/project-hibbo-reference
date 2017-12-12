import React, { PureComponent } from 'react';
import { arrayOf, shape, number, func, any } from 'prop-types';
import { FlatList, Animated } from 'react-native';
import md5 from 'md5';
import { bind } from 'decko';

import { StyledContainerBasic } from 'styles/styledComponents/containers';

import { isSameDay } from './utils';

import Message from './Message';

class MessageContainer extends PureComponent {
  static keyExtractor(item) {
    return item.id;
  }

  constructor(props) {
    super(props);
    this.dateSelected = {};
    this.newMessages = [];
    this.lastIndexDisplayed = 0;
    this.mounted = false;
    const messagesData = this.prepareMessages(props.messages, this.filter);

    this.scrollHeight = 0;
    this.state = {
      messagesData,
      messagesLength: props.messagesLength || messagesData.length,
    };
  }

  componentDidMount() {
    this.mounted = true;
    setTimeout(() => {
      this.displayOtherMessages();
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages === nextProps.messages) {
      return;
    }
    const messagesData = this.prepareMessages(nextProps.messages, this.filter);

    this.setState(state => ({
      ...state,
      messagesData,
      messagesLength: messagesData.length,
    }));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  @bind
  onLayout(contentWidth, contentHeight) {
    if (this.scrollHeight === 0) {
      this.scrollHeight = contentHeight;
      this.scrollToEnd(false);
    }
    this.scrollHeight = contentHeight;
  }

  // Close all message with this date
  @bind
  onDatePress(date) {
    this.dateSelected[date] = !this.dateSelected[date];
    const messagesData = this.prepareMessages(this.props.messages, this.filter);

    this.setState(state => ({
      ...state,
      messagesData,
      messagesLength: messagesData.length,
    }));
  }

  @bind
  scrollToEnd(animated = true) {
    this.listView.scrollToOffset({
      offset: this.scrollHeight - 390,
      animated,
    });
  }

  @bind
  displayOtherMessages() {
    console.log(
      'LAST INDEX DIPLAYED IS ',
      this.lastIndexDisplayed,
      this.state.messagesLength,
      this.state.messagesData,
      this.mounted,
    );
    if (this.lastIndexDisplayed === this.state.messagesLength || !this.mounted)
      return;
    const { messagesData } = this.state;
    this.scrollToEnd();

    messagesData[this.lastIndexDisplayed].display = true;
    ++this.lastIndexDisplayed;
    this.setState(
      state => ({
        ...state,
        messagesData,
      }),
      () => {
        console.log('SCROLLING TO END');
        this.scrollToEnd();
        Animated.delay(1600).start(this.displayOtherMessages);
      },
    );
  }

  @bind
  filter(message) {
    const dateSeletedKeys = Object.keys(this.dateSelected);
    for (let i = 0; i < dateSeletedKeys.length; ++i) {
      const elem = this.dateSelected[dateSeletedKeys[i]];
      if (elem && isSameDay(message, { createdAt: dateSeletedKeys[i] })) {
        return false;
      }
    }
    return true;
  }

  @bind
  formNewMessage(messages, m, i, newMessages, filter) {
    let previousMessage = newMessages[newMessages.length - 1] || {};
    let nextMessage = {};

    if (m.isAnimated) {
      previousMessage = this.newMessages[i - 1] || {};
      for (let index = i + 1; index < messages.length; ++index) {
        if (messages[index].isAnimated) {
          nextMessage = messages[index];
          break;
        }
      }
    } else {
      for (let index = i + 1; index < messages.length; ++index) {
        if (!messages[index].isAnimated) {
          nextMessage = messages[index];
          break;
        }
      }
    }
    // add next and previous messages to hash to ensure updates
    const toHash = JSON.stringify(m) + previousMessage.id + nextMessage.id;
    const message = {
      ...m,
      display: filter(m),
      previousMessage,
      nextMessage,
      hash: md5(toHash),
    };
    console.log(
      'MESSAGE GOTTEN IS ',
      message.previousMessage.id,
      message.id,
      nextMessage.id,
    );
    return message;
  }

  @bind
  prepareMessages(messages, filter) {
    const newMessages = [];
    this.newMessages = [];
    messages.reduce((o, m, i) => {
      const previousMessage = messages[i - 1] || {};
      const nextMessage = messages[i + 1] || {};
      // add next and previous messages to hash to ensure updates
      const toHash = JSON.stringify(m) + previousMessage.id + nextMessage.id;
      let display = false;
      if (!m.isAnimated) {
        this.lastIndexDisplayed++;
        display = filter(m);
      }
      // const message = this.formNewMessage(messages, m, i, newMessages, filter);

      if (!isSameDay(previousMessage, m)) {
        this.lastIndexDisplayed++;
        newMessages.push({
          ...m,
          onDatePress: this.onDatePress,
          display: true,
          id: m.id + m.createdAt,
          date: m.createdAt,
          previousMessage: m,
          nextMessage: m,
          hash: md5(toHash + m.createdAt),
        });
        if (!this.dateSelected[m.createdAt]) {
          this.dateSelected[m.createdAt] = false;
        }
      }

      newMessages.push({
        ...m,
        display,
        previousMessage,
        nextMessage,
        hash: md5(toHash),
      });
      return newMessages[i];
    }, {});

    return newMessages;
  }

  @bind
  renderRow({ item }) {
    const message = item;
    if (!message.id && message.id !== 0) {
      console.warn(
        'GiftedChat: `id` is missing for message',
        JSON.stringify(message),
      );
    }
    if (!message.user) {
      console.warn(
        'GiftedChat: `user` is missing for message',
        JSON.stringify(message),
      );
      message.user = {};
    }

    const messageProps = {
      ...this.props,
      key: message.id,
      currentMessage: message,
      previousMessage: message.previousMessage,
      nextMessage: message.nextMessage,
      position: message.user._id === this.props.user._id ? 'right' : 'left',
    };

    if (this.props.renderMessage) {
      return this.props.renderMessage(messageProps);
    }

    // console.log(
    //   'messageProps',
    //   this.lastIndexDisplayed,
    //   this.state,
    //   messageProps.key,
    // );

    const isLast =
      !this.state.messagesData[this.lastIndexDisplayed - 1] ||
      (messageProps.key ===
        this.state.messagesData[this.lastIndexDisplayed - 1].id &&
        !messageProps.currentMessage.isIntro);

    // console.log('IS LAST IS ', isLast);
    return (
      <Message
        {...messageProps}
        isLast={isLast}
        isUpdating={message.isUpdating}
      />
    );
  }

  render() {
    return (
      <StyledContainerBasic>
        <FlatList
          ref={listView => {
            this.listView = listView;
          }}
          extraData={this.state}
          automaticallyAdjustContentInsets={false}
          initialNumToRender={this.state.messagesLength}
          maxToRenderPerBatch={30}
          data={this.state.messagesData}
          renderItem={this.renderRow}
          keyExtractor={MessageContainer.keyExtractor}
          onScroll={this.props.onScroll}
          onContentSizeChange={this.onLayout}
        />
      </StyledContainerBasic>
    );
  }
}

MessageContainer.defaultProps = {
  renderMessage: null,
  messagesLength: 0,
  onScroll: () => {},
};

MessageContainer.propTypes = {
  messages: arrayOf(any).isRequired,
  user: shape({
    _id: number.isRequired,
  }).isRequired,
  renderMessage: func,
  messagesLength: number,
  onScroll: func,
};

export default MessageContainer;
