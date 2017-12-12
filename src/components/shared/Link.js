import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  string,
  func,
  number,
  object,
  array,
  oneOfType,
} from 'prop-types';

const Link = ({ label, action, linkStyle, buttonStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={buttonStyle}
      onPress={() => { action(); }}
    >
      <Text
        style={linkStyle}
      >{label}
      </Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  label: string.isRequired,
  action: func.isRequired,
  buttonStyle: oneOfType([object, number, array]).isRequired,
  linkStyle: oneOfType([object, number, array]).isRequired,
};

export default Link;
