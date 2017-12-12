import React from 'react';
import { Dimensions } from 'react-native';
import { string, func, bool, oneOfType, object, number } from 'prop-types';

import theme from 'styles/appStyles';

import * as Styles from './styles';

const { width } = Dimensions.get('window');
const Input = ({
  name,
  keyboardType,
  capitalize,
  onChange,
  innerRef,
  onSubmit,
  placeholder,
  error,
  returnKeyType,
  style,
  secureEntry,
  maxLength,
  centered,
  value,
  inputWidth,
}) => {
  return (
    <Styles.SInputContainer centered={centered}>
      <Styles.SInput
        key={keyboardType}
        value={value}
        autoCapitalize={capitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
        onChangeText={text => {
          onChange(name, text);
        }}
        innerRef={innerRef}
        onSubmitEditing={() => {
          onSubmit(name);
        }}
        placeholder={placeholder}
        placeholderTextColor={
          error ? theme.colors.google : theme.colors.inputGrey
        }
        returnKeyType={returnKeyType}
        style={style}
        inputWidth={inputWidth}
        secureTextEntry={secureEntry}
        underlineColorAndroid="transparent"
        maxLength={maxLength}
      />
      <Styles.SBorderInput inputWidth={inputWidth} />
    </Styles.SInputContainer>
  );
};

Input.defaultProps = {
  keyboardType: 'default',
  capitalize: 'words',
  innerRef: null,
  returnKeyType: 'next',
  style: {},
  secureEntry: false,
  maxLength: 500,
  centered: false,
  inputWidth: width,
  onSubmit: () => {},
};

Input.propTypes = {
  name: string.isRequired,
  keyboardType: string,
  capitalize: string,
  onChange: func.isRequired,
  innerRef: func,
  onSubmit: func,
  placeholder: string.isRequired,
  error: bool.isRequired,
  returnKeyType: string,
  style: oneOfType([string, number, object]),
  secureEntry: bool,
  maxLength: number,
  centered: bool,
  value: oneOfType([string, number]).isRequired,
  inputWidth: number,
};

export default Input;
