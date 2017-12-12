import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { instanceOf, func, shape, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getTranslations } from 'utils/i18n';

import sendOffImg from 'assets/messenger/send-off.png';
import sendOnImg from 'assets/messenger/send-on.png';

import MessengerPictoSelect from './MessengerPictoSelect';

const styles = EStyleSheet.create({
  messageBoxText: {
    fontFamily: '$fonts.circularMedium',
    fontSize: '$textSizes.normal',
    color: '$colors.textGrey',
    margin: 30,
    flex: 0,
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 30,
    flex: 1,
  },
  image: {
    marginLeft: 30,
  },
  messageBox: {
    backgroundColor: '$colors.buttonGrey',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: '$size.cardMargin',
    marginRight: '$size.cardMargin',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 15,
    borderTopWidth: 15,
    borderBottomLeftRadius: 5,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  bottom: {
    flexDirection: 'row',
  },
});

const MessengerBottom = ({
  animShowBotton,
  animHideBottom,
  showTextBox,
  choosePicto,
  sendMessage,
  messages,
}) => (
  <Animated.View style={[styles.messageBox, { height: animShowBotton }]}>
    <Animated.View
      style={[
        styles.triangle,
        {
          opacity: animShowBotton.interpolate({
            inputRange: [111, Dimensions.get('window').height],
            outputRange: [1, 0],
          }),
        },
      ]}
    />
    <Animated.View
      style={[
        styles.bottom,
        {
          opacity: animHideBottom,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          showTextBox(false);
        }}
      >
        <Text style={styles.messageBoxText}>
          {getTranslations('messenger.input.placeholder')}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconBox}>
        <MessengerPictoSelect action={choosePicto} />
        {messages.text || messages.image ? (
          <TouchableOpacity onPress={sendMessage}>
            <Image style={styles.image} source={sendOnImg} />
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={sendOffImg} />
        )}
      </View>
    </Animated.View>
  </Animated.View>
);

MessengerBottom.propTypes = {
  animShowBotton: instanceOf(Animated.Value).isRequired,
  animHideBottom: instanceOf(Animated.Value).isRequired,
  choosePicto: func.isRequired,
  showTextBox: func.isRequired,
  sendMessage: func.isRequired,
  messages: shape({
    text: string,
    image: string,
  }).isRequired,
};
export default MessengerBottom;
