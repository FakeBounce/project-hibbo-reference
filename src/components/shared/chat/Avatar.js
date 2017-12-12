/* eslint no-underscore-dangle: 0 */

import React from 'react';
import {
  func,
  number,
  object,
  string,
  oneOfType,
  shape,
  oneOf,
} from 'prop-types';
import { StyleSheet, View } from 'react-native';

import GiftedAvatar from './GiftedAvatar';

import { isSameUser, isSameDay, warnDeprecated } from './utils';

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
      marginBottom: 10,
      borderRadius: 18,
    },
    image: {
      height: 36,
      width: 36,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
      marginBottom: 10,
      overflow: 'visible',
      backgroundColor: '#fcfcfc',
      borderRadius: 18,
    },
    image: {
      height: 36,
      width: 36,
    },
  }),
};

export default class Avatar extends React.Component {
  renderAvatar() {
    if (this.props.currentMessage.user._id === 0) {
      return null;
    } else if (
      this.props.renderAvatar &&
      this.props.currentMessage.user._id === 2
    ) {
      const { ...avatarProps } = this.props;

      return this.props.renderAvatar(avatarProps);
    } else if (
      this.props.renderAvatar &&
      this.props.currentMessage.user._id === 1
    ) {
      const { ...avatarProps } = this.props;

      return this.props.renderAvatarUser(avatarProps);
    }
    return (
      <GiftedAvatar
        avatarStyle={StyleSheet.flatten([
          styles[this.props.position].image,
          this.props.imageStyle[this.props.position],
        ])}
        user={
          this.props.currentMessage.user._id === this.props.user._id
            ? this.props.user
            : this.props.currentMessage.user
        }
      />
    );
  }

  render() {
    if (
      isSameUser(this.props.currentMessage, this.props.nextMessage) &&
      isSameDay(this.props.currentMessage, this.props.nextMessage)
    ) {
      return (
        <View
          style={[
            styles[this.props.position].container,
            this.props.containerStyle[this.props.position],
          ]}
        >
          <GiftedAvatar
            avatarStyle={StyleSheet.flatten([
              styles[this.props.position].image,
              this.props.imageStyle[this.props.position],
            ])}
          />
        </View>
      );
    }
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position],
        ]}
      >
        {this.renderAvatar()}
      </View>
    );
  }
}

Avatar.defaultProps = {
  position: 'left',
  currentMessage: {
    user: null,
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
  renderAvatarUser: null,
  renderAvatar: null,
};

Avatar.propTypes = {
  user: shape({
    _id: number.isRequired,
  }).isRequired,
  renderAvatarUser: func,
  renderAvatar: func,
  position: oneOf(['left', 'right']),
  currentMessage: shape({
    user: object,
  }),
  nextMessage: shape({}),
  containerStyle: shape({
    left: oneOfType([string, object, number]),
    right: oneOfType([string, object, number]),
  }),
  imageStyle: shape({
    left: oneOfType([string, object, number]),
    right: oneOfType([string, object, number]),
  }),
  isSameDay: func,
  isSameUser: func,
};
