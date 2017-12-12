import React from 'react';
import { View, Text, Image } from 'react-native';
import { string, bool } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  zIndex: {
    zIndex: 999,
  },
  connectedDot: {
    position: 'absolute',
    top: 28,
    left: 27,
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: '$colors.green',
    zIndex: 999,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  iconBubble: {
    width: 38,
    height: 38,
  },
  avatarTextHolder: {
    width: 36,
    height: 36,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colors.buttonGrey',
  },
  avatarText: {
    fontFamily: '$fonts.circularMedium',
    fontSize: 18,
  },
});

const UserAvatar = ({ avatar, logged, firstName }) => {
  if (avatar !== '') {
    return (
      <View>
        <View style={styles.zIndex}>
          {logged && <View style={styles.connectedDot} />}
        </View>
        <Image source={{ uri: avatar }} style={styles.profilePic} />
      </View>
    );
  } else if (firstName) {
    return (
      <View style={styles.iconBubble}>
        <View style={styles.avatarTextHolder}>
          <Text style={styles.avatarText}>
            {firstName.substr(0, 1).toUpperCase()}
          </Text>
        </View>
        {logged && <View style={styles.connectedDot} />}
      </View>
    );
  }

  return null;
};

UserAvatar.defaultProps = {
  avatar: '',
};

UserAvatar.propTypes = {
  avatar: string,
  logged: bool.isRequired,
  firstName: string.isRequired,
};

export default UserAvatar;
