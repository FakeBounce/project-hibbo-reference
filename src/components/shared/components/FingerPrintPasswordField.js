import React from 'react';
import { func } from 'prop-types';
import { Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import TouchableRipple from 'shared/TouchableRipple';
import { getTranslations } from 'utils/i18n';

import touchId from 'assets/shared/touchID.png';
import underscore from 'assets/transfert/underscoreFull.png';

const styles = EStyleSheet.create({
  $margin: 15,
  touchable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: '$margin',
  },
  text: {
    fontFamily: '$fonts.circularBook',
    fontSize: '$textSizes.small',
    color: '$colors.primary',
  },
  under: {
    width: 74,
    marginTop: '$margin',
  },
});

const FingerPrintPasswordField = ({ onFingerPrintClick }) => (
  <View style={styles.touchable}>
    <TouchableRipple onPress={onFingerPrintClick}>
      <Image source={touchId} style={styles.image} />
    </TouchableRipple>
    <Text style={styles.text}>{getTranslations('transfert.touchid.ask')}</Text>
    <Image source={underscore} style={styles.under} />
  </View>
);

FingerPrintPasswordField.propTypes = {
  onFingerPrintClick: func.isRequired,
};

export default FingerPrintPasswordField;
