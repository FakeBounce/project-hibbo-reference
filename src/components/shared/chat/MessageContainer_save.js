/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { bind } from 'decko';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';

import shallowequal from 'shallowequal';
import md5 from 'md5';
import LoadEarlier from './LoadEarlier';
import Message from './Message';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default class MessageContainer extends React.Component {
  constructor(props) {
    super(props);

    const messagesData = this.prepareMessages(props.messages);

    this.state = {
      dataSource: messagesData,
      scrolled: false,
      goingDown: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages === nextProps.messages) {
      return;
    }
    const messagesData = this.prepareMessages(nextProps.messages);

    this.setState({
      dataSource: messagesData,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowequal(this.props, nextProps)) {
      return true;
    }
    if (!shallowequal(this.state, nextState)) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line
  prepareMessages(messages) {
    const newMessages = [];
    messages.reduce((o, m, i) => {
      const previousMessage = messages[i + 1] || {};
      const nextMessage = messages[i - 1] || {};
      // add next and previous messages to hash to ensure updates
      const toHash = JSON.stringify(m) + previousMessage._id + nextMessage._id;
      const res = o;
      newMessages[i] = {
        ...m,
        id: m._id,
        previousMessage,
        nextMessage,
        hash: md5(toHash),
      };
      return res;
    }, {});

    return newMessages;
  }

  scrollTo(options) {
    this._invertibleScrollViewRef.scrollTo(options);
  }

  @bind
  goToBottom() {
    this.goingDown();
    this.listView.scrollToEnd({ animated: true });
  }

  goingDown() {
    this.setState(
      state => {
        return {
          ...state,
          goingDown: true,
        };
      },
      () => {
        setTimeout(() => {
          this.setState(state => {
            return {
              ...state,
              goingDown: false,
            };
          });
        }, 1000);
      },
    );
  }

  // eslint-disable-next-line
  keyExtractor(item) {
    return item.id;
  }

  @bind
  renderFooter() {
    if (this.props.renderFooter) {
      const footerProps = {
        ...this.props,
      };

      return this.props.renderFooter(footerProps);
    }
    return null;
  }

  @bind
  renderLoadEarlier() {
    if (this.props.loadEarlier === true) {
      const loadEarlierProps = {
        ...this.props,
      };

      if (this.props.renderLoadEarlier) {
        return this.props.renderLoadEarlier(loadEarlierProps);
      }
      return <LoadEarlier {...loadEarlierProps} />;
    }
    return null;
  }

  @bind
  renderRow({ item }) {
    const message = item;
    if (!message._id && message._id !== 0) {
      console.warn(
        'GiftedChat: `_id` is missing for message',
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
      key: message._id,
      currentMessage: message,
      previousMessage: message.previousMessage,
      nextMessage: message.nextMessage,
      position: message.user._id === this.props.user._id ? 'right' : 'left',
    };

    if (this.props.renderMessage) {
      return this.props.renderMessage(messageProps);
    }

    console.log('messageProps', messageProps);

    const isLast =
      messageProps.key === messageProps.messages[0]._id &&
      !messageProps.currentMessage.isIntro;

    return (
      <Message
        {...messageProps}
        isLast={isLast}
        isUpdating={message.isUpdating}
      />
    );
  }

  @bind
  renderScrollComponent(props) {
    const invertibleScrollViewProps = this.props.invertibleScrollViewProps;

    return (
      <InvertibleScrollView
        {...props}
        {...invertibleScrollViewProps}
        ref={component => {
          this._invertibleScrollViewRef = component;
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          ref={listView => {
            this.listView = listView;
          }}
          automaticallyAdjustContentInsets={false}
          initialNumToRender={this.props.messagesLength}
          maxToRenderPerBatch={30}
          {...this.props.listViewProps}
          data={this.state.dataSource}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderFooter}
          ListFooterComponent={this.renderLoadEarlier}
          renderScrollComponent={this.renderScrollComponent}
        />
      </View>
    );
  }
}

MessageContainer.defaultProps = {
  messages: [],
  user: {},
  renderFooter: null,
  renderMessage: null,
  listViewProps: {},
  loadEarlier: false,
  renderLoadEarlier: null,
  invertibleScrollViewProps: {},
  messagesLength: 0,
};

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
  renderFooter: PropTypes.func,
  renderMessage: PropTypes.func,
  loadEarlier: PropTypes.bool,
  listViewProps: PropTypes.objectOf(PropTypes.any),
  renderLoadEarlier: PropTypes.func,
  invertibleScrollViewProps: PropTypes.objectOf(PropTypes.any),
  messagesLength: PropTypes.number,
};
