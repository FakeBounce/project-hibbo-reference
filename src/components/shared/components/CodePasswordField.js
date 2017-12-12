import React from 'react';
import { Image } from 'react-native';
import { arrayOf, string } from 'prop-types';

import passwordField from 'assets/transfert/passwordField.png';
import point from 'assets/transfert/oval.png';

import { SImageBg, SImageDot } from './styles';

const CodePasswordField = ({ typedPin }) => (
  <SImageBg source={passwordField}>
    {typedPin.map((value, index) => (
      <SImageDot key={`${value}${index}`}>
        <Image source={point} />
      </SImageDot>
    ))}
  </SImageBg>
);

CodePasswordField.propTypes = {
  typedPin: arrayOf(string).isRequired,
};

export default CodePasswordField;
