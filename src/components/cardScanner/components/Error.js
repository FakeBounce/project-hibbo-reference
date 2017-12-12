import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    alignItems: 'center',
  },
  text: {
    fontFamily: '$fonts.circularBook',
    color: '$colors.red',
    fontSize: 14,
  },
});

const Error = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

Error.propTypes = {
  label: string.isRequired,
};

export default Error;
