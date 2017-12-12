import React from 'react';
import { View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '$colors.textGrey',
    justifyContent: 'flex-start',
    marginTop: 9,
    marginBottom: 9,
  },
  textInput: {
    flex: 1,
    color: '$colors.textGrey',
    height: 30,
    fontSize: 25,
    fontFamily: '$fonts.circularBook',
  },
});

function TransparentTextInput(props) {
  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.textInput} {...props} />
    </View>
  );
}

export default TransparentTextInput;
