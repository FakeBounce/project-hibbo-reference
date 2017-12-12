import React from 'react';
import { number, shape, func, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';

import TouchableRipple from 'shared/TouchableRipple';

const styles = EStyleSheet.create({
  text: {
    fontFamily: '$fonts.circularBook',
    fontSize: 15,
    color: 'white',
  },
  containerRipple: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    left: 10,
    top: 0,
  },
  notifications: {
    backgroundColor: '$colors.red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 29,
    height: 29,
    borderRadius: 40,
  },
});

const Notification = ({ numberOfNotification, navigation }) => {
  if (numberOfNotification === 0) return null;

  return (
    <TouchableRipple
      style={styles.containerRipple}
      onPress={() => {
        navigation.navigate('Notification');
      }}
    >
      <View style={styles.notifications}>
        <Text style={styles.text}>
          {numberOfNotification}
        </Text>
      </View>
    </TouchableRipple>
  );
};

Notification.propTypes = {
  numberOfNotification: number.isRequired,
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
};

export default Notification;
