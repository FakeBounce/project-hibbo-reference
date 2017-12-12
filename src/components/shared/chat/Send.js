import React from 'react';
import { oneOfType, string, object, number, func } from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

const Send = ({ text, containerStyle, onSend, textStyle, label }) => {
  if (text.trim().length > 0) {
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => {
          onSend(
            {
              text: text.trim(),
            },
            true,
          );
        }}
        accessibilityTraits="button"
      >
        <Text style={[styles.text, textStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return <View />;
};

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
};

Send.propTypes = {
  text: string,
  onSend: func,
  label: string,
  containerStyle: oneOfType([string, object, number]),
  textStyle: oneOfType([string, object, number]),
};

export default Send;
