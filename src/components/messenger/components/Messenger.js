import React from 'react';
import { View, Animated } from 'react-native';
import {
  string,
  shape,
  func,
  bool,
  object,
  instanceOf,
  array,
  number,
  oneOfType,
} from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from 'shared/Header';

import MessengerMain from './MessengerMain';
import MessengerBottom from './MessengerBottom';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 2,
    padding: 15,
    paddingTop: 0,
  },
});

const Messenger = ({
  navigation,
  choosePicto,
  messages,
  input,
  animHide,
  style,
  showTextBox,
  showMessageBox,
  animShowBotton,
  animHideBottom,
  sendMessage,
  firstName,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          {
            opacity: animHide,
            // margin: animHide.interpolate({
            //   inputRange: [0, 1],
            //   outputRange: [-19, 0],
            // }),
            height: animHide.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 90],
            }),
          },
        ]}
      >
        <Header navigation={navigation} />
      </Animated.View>
      <MessengerMain
        style={styles.main}
        messages={messages}
        input={input}
        showTextBox={() => showTextBox(true)}
        choosePicto={choosePicto}
        animHide={animHide}
        firstname={firstName}
      />
      {!showMessageBox && (
        <MessengerBottom
          animHideBottom={animHideBottom}
          animShowBotton={animShowBotton}
          showTextBox={showTextBox}
          choosePicto={choosePicto}
          sendMessage={sendMessage}
          messages={messages}
        />
      )}
    </View>
  );
};

Messenger.defaultProps = {
  style: {},
};

Messenger.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
      params: shape({
        amount: string.isRequired,
        paymentMeans: shape({
          cardId: string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  choosePicto: func.isRequired,
  showTextBox: func.isRequired,
  sendMessage: func.isRequired,
  messages: shape({
    text: string,
    image: string,
  }).isRequired,
  input: bool.isRequired,
  showMessageBox: bool.isRequired,
  animHide: instanceOf(Animated.Value).isRequired,
  animShowBotton: instanceOf(Animated.Value).isRequired,
  animHideBottom: instanceOf(Animated.Value).isRequired,
  style: oneOfType([object, number, array]),
  firstName: string.isRequired,
};

export default Messenger;
