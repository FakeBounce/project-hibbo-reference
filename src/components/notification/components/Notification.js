/* eslint no-restricted-syntax: 0 */
import React, { PureComponent } from 'react';
import { shape, func, string, arrayOf, oneOf, number } from 'prop-types';
import { Animated } from 'react-native';
import { bind } from 'decko';

import styled from 'styled-components/native';

import { StyledAvatar } from 'styles/styledComponents/avatars';
import MessageContainer from 'shared/chat/MessageContainer';
import Header from 'shared/Header';
import { getTranslations } from 'utils/i18n';

import banker from 'assets/transfert/Banker.png';

import Tips from './Tips';

const StyledContainer = styled.View`
  align-items: center;
  align-self: center;
`;

class Notification extends PureComponent {
  constructor(props) {
    super(props);
    const messages = [];

    for (const notif of props.notifications.read) {
      messages.push({
        createdAt: notif.createdAt,
        user: {
          _id: 2,
        },
        isLoading: false,
        isUpdating: false,
        isAnimated: false,
        color: notif.theme,
        id: notif.id,
        ...this.getSpeBubble(notif),
      });
    }
    for (const notif of props.notifications.unread) {
      messages.push({
        createdAt: notif.createdAt,
        user: {
          _id: 2,
        },
        isLoading: false,
        isUpdating: false,
        isAnimated: true,
        color: notif.theme,
        id: notif.id,
        ...this.getSpeBubble(notif),
      });
    }

    this.tipsHeight = new Animated.Value(150);
    this.animRunning = false;
    this.state = {
      messages,
    };
  }

  componentDidMount() {
    const { profile, user } = this.props;
    this.props.setNotificationToRead(profile.id, user.token);
  }

  @bind
  onScroll(event) {
    const scrollPosY = event.nativeEvent.contentOffset.y;
    const size = event.nativeEvent.contentSize.height;

    if (!this.animRunning) {
      const defaultValue = 450 + (this.tipsHeight._value === 0 ? 150 : 0);
      const direction =
        size - scrollPosY <= defaultValue || scrollPosY === 0 ? 'down' : 'up';
      if (direction === 'up' && this.tipsHeight._value !== 0) {
        this.animRunning = true;
        Animated.timing(this.tipsHeight, {
          toValue: 0,
          duration: 150,
        }).start(() => {
          Animated.delay(500).start(() => {
            this.animRunning = false;
          });
        });
      } else if (direction === 'down' && this.tipsHeight._value !== 150) {
        this.animRunning = true;
        Animated.timing(this.tipsHeight, {
          toValue: 150,
          duration: 150,
        }).start(() => {
          Animated.delay(500).start(() => {
            this.animRunning = false;
          });
        });
      }
    }
  }

  getSpeBubble(notif) {
    const bubbleInfo = {
      id: notif.id.toString(),
      animated: true,
      speech: notif.message,
      width: 70,
      height: 20,
      transaction: notif.transaction,
    };
    const speBubble = {};
    if (notif.type === 'default') {
      speBubble.defaultTransfertBubble = bubbleInfo;
    } else {
      speBubble.botBubble = bubbleInfo;
    }
    return speBubble;
  }

  render() {
    const { navigation, profile, tips } = this.props;

    return (
      <StyledContainer>
        <Header
          navigation={navigation}
          text={getTranslations('notification.header.main')}
        />

        <MessageContainer
          renderAvatar={() => <StyledAvatar source={banker} size={30} />}
          messages={this.state.messages}
          user={{
            _id: profile.id,
            name: profile.nickname,
            avatar: profile.avatar,
          }}
          onScroll={this.onScroll}
        />

        <Tips
          tipsHeight={this.tipsHeight}
          tips={tips}
          showTips={index => navigation.navigate('Tips', { index })}
        />
      </StyledContainer>
    );
  }
}

Notification.propTypes = {
  tips: arrayOf(
    shape({
      type: oneOf(['image', 'video']).isRequired,
      source: number.isRequired,
      thumbnail: number,
    }),
  ).isRequired,
  notifications: shape({
    unread: arrayOf(
      shape({
        id: number,
        icon: string,
        message: string,
        theme: string,
        type: oneOf(['mission', 'message', 'default']).isRequired,
        status: oneOf(['unread']).isRequired,
        profileId: number.isRequired,
      }),
    ).isRequired,
    read: arrayOf(
      shape({
        id: number.isRequired,
        icon: string,
        message: string,
        theme: string,
        type: oneOf(['mission', 'message', 'default']).isRequired,
        status: oneOf(['read']).isRequired,
        profileId: number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
  setNotificationToRead: func.isRequired,
  profile: shape({}).isRequired,
  user: shape({}).isRequired,
};

export default Notification;
