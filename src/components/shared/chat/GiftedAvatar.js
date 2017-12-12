import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  any,
  shape,
  oneOfType,
  func,
  string,
  number,
  object,
} from 'prop-types';

import theme from 'styles/appStyles';

const defaultStyles = {
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
};

export default class GiftedAvatar extends React.Component {
  setAvatarColor() {
    const userName = this.props.user.name || '';
    const name = userName.toUpperCase().split(' ');

    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      this.avatarName = '';
    }

    let sumChars = 0;

    for (let i = 0; i < userName.length; i++) {
      sumChars += userName.charCodeAt(i);
    }

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [
      theme.colors.deepBlue,
      theme.colors.flatPink,
      theme.colors.flatOrange,
      theme.colors.flatPurple,
    ];

    this.avatarColor = colors[sumChars % colors.length];
  }

  renderAvatar() {
    if (typeof this.props.user.avatar === 'function') {
      return this.props.user.avatar();
    } else if (typeof this.props.user.avatar === 'string') {
      return (
        <Image
          source={{ uri: this.props.user.avatar }}
          style={[defaultStyles.avatarStyle, this.props.avatarStyle]}
        />
      );
    }
    return null;
  }

  renderInitials() {
    return (
      <Text style={[defaultStyles.textStyle, this.props.textStyle]}>
        {this.avatarName}
      </Text>
    );
  }

  render() {
    if (!this.props.user.name && !this.props.user.avatar) {
      // render placeholder
      return (
        <View
          style={[
            defaultStyles.avatarStyle,
            defaultStyles.transparent,
            this.props.avatarStyle,
          ]}
          accessibilityTraits="image"
        />
      );
    }
    if (this.props.user.avatar) {
      return (
        <TouchableOpacity
          disabled={!this.props.onPress}
          onPress={() => {
            const { ...other } = this.props;

            if (this.props.onPress) {
              this.props.onPress(other);
            }
          }}
          accessibilityTraits="image"
        >
          {this.renderAvatar()}
        </TouchableOpacity>
      );
    }

    if (!this.avatarColor) {
      this.setAvatarColor();
    }

    return (
      <TouchableOpacity
        disabled={!this.props.onPress}
        onPress={() => {
          const { ...other } = this.props;

          if (this.props.onPress) {
            this.props.onPress(other);
          }
        }}
        style={[
          defaultStyles.avatarStyle,
          { backgroundColor: this.avatarColor },
          this.props.avatarStyle,
        ]}
        accessibilityTraits="image"
      >
        {this.renderInitials()}
      </TouchableOpacity>
    );
  }
}

GiftedAvatar.defaultProps = {
  user: {
    name: null,
    avatar: null,
  },
  onPress: null,
  avatarStyle: {},
  textStyle: {},
};

GiftedAvatar.propTypes = {
  user: shape({
    name: string,
    avatar: any,
  }),
  onPress: func,
  avatarStyle: oneOfType([string, object, number]),
  textStyle: oneOfType([string, object, number]),
};
