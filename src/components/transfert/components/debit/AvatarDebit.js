import React from 'react';
import { StyleSheet } from 'react-native';
import { shape, string, bool } from 'prop-types';
import GiftedAvatar from 'shared/chat/GiftedAvatar';
import AvatarPulsed from './AvatarPulsed';
import { SAvatarView } from '../../styles';

const styles = StyleSheet.create({
  avatarStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

const AvatarDebit = ({ user, hasPulse, ...props }) => {
  return (
    <SAvatarView>
      {hasPulse ? (
        <AvatarPulsed user={user} avatarStyle={styles.avatarStyle} {...props} />
      ) : (
        <GiftedAvatar user={user} avatarStyle={styles.avatarStyle} />
      )}
    </SAvatarView>
  );
};

AvatarDebit.propTypes = {
  user: shape({
    name: string.isRequired,
    avatar: string,
  }).isRequired,
  hasPulse: bool.isRequired,
};

export default AvatarDebit;
