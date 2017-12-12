import React from 'react';
import { Animated, TextInput } from 'react-native';
import {
  string,
  func,
  bool,
  object,
  array,
  number,
  oneOfType,
  shape,
  instanceOf,
} from 'prop-types';
import styled from 'styled-components/native';

import appStyles from 'styles/appStyles';

const SBorder = styled(Animated.View)`
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.colors.white};
  margin-horizontal: 20px;
  overflow: hidden;
`;
const SInput = styled(Animated.createAnimatedComponent(TextInput))`
  height: 45px;
  padding: 5px;
  font-size: ${props => props.theme.textSizes.regular};
  text-align: center;
  font-family: ${props => props.theme.fonts.circularBold};
`;

const Input = ({
  name,
  defaultValue,
  placeholder,
  setData,
  validate,
  error,
  secureEntry,
  keyboardType,
  capitalize,
  style,
  returnKeyType,
  maxLength,
  innerRef,
  animations,
  autoFocus,
}) => {
  return (
    <SBorder
      style={[
        style,
        {
          opacity: animations.borderOpacity,
          transform: [{ translateY: animations.borderTranslateY }],
        },
      ]}
    >
      <SInput
        key={keyboardType}
        value={defaultValue}
        autoCapitalize={capitalize}
        autoCorrect={false}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        onChangeText={text => {
          setData(name, text);
        }}
        innerRef={innerRef}
        onSubmitEditing={() => {
          validate(name);
        }}
        placeholder={placeholder}
        placeholderTextColor={
          error ? appStyles.colors.google : appStyles.colors.white
        }
        returnKeyType={returnKeyType}
        style={[
          style,
          {
            color: error ? appStyles.colors.google : appStyles.colors.white,
            opacity: animations.inputOpacity,
            transform: [{ translateY: animations.inputTranslateY }],
          },
        ]}
        secureTextEntry={secureEntry}
        underlineColorAndroid="transparent"
        maxLength={maxLength}
      />
    </SBorder>
  );
};

Input.defaultProps = {
  capitalize: 'words',
  style: {},
  returnKeyType: 'send',
  secureEntry: false,
  keyboardType: 'default',
  maxLength: 100,
  innerRef: null,
  autoFocus: false,
};

Input.propTypes = {
  innerRef: func,
  maxLength: number,
  capitalize: string,
  name: string.isRequired,
  defaultValue: string.isRequired,
  placeholder: string.isRequired,
  setData: func.isRequired,
  validate: func.isRequired,
  error: bool.isRequired,
  secureEntry: bool,
  keyboardType: string,
  style: oneOfType([object, number, array]),
  returnKeyType: string,
  animations: shape({
    borderOpacity: instanceOf(Animated.Value).isRequired,
    borderTranslateY: instanceOf(Animated.Value).isRequired,
    inputOpacity: instanceOf(Animated.Value).isRequired,
    inputTranslateY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  autoFocus: bool,
};

export default Input;
