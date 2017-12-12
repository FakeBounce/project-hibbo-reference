import React from 'react';
import {
  bool,
  string,
  func,
  number,
  object,
  array,
  oneOfType,
} from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';

import { StyledTextSmall } from 'styledComponents/texts';

import TouchableRipple from './TouchableRipple';
import { UserPicture } from './UserPicture';

const styles = EStyleSheet.create({
  button: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounded: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 12,
    marginRight: 5,
  },
  yellow: {
    backgroundColor: '$colors.buttonYellow',
  },
  grey: {
    backgroundColor: '$colors.buttonGrey',
  },
});

const SButtonPicture = styled(UserPicture)`
  height: 30px;
  width: 30px;
  margin-left: 12px;
`;

const Button = ({
  rounded,
  text,
  action,
  profilePicture,
  styleText,
  styleButton,
  disabled,
}) => {
  return (
    <TouchableRipple
      styleTouchable={[styles.button, styleButton, rounded && styles.rounded]}
      onPress={action}
      disabled={disabled}
    >
      <StyledTextSmall style={styleText}>{text}</StyledTextSmall>
      {profilePicture !== null && (
        <SButtonPicture source={profilePicture} scale={false} />
      )}
    </TouchableRipple>
  );
};

Button.propTypes = {
  rounded: bool,
  text: string.isRequired,
  action: func.isRequired,
  profilePicture: string,
  styleText: oneOfType([object, number, array]),
  styleButton: oneOfType([object, number, array]),
  disabled: bool,
};

Button.defaultProps = {
  rounded: false,
  styleText: {},
  styleButton: {},
  profilePicture: null,
  disabled: false,
};

const YellowButton = props => (
  <Button {...props} styleText={[styles.yellow, props.styleButton]} />
);

YellowButton.propTypes = {
  styleButton: oneOfType([object, number, array]),
};

YellowButton.defaultProps = {
  styleButton: {},
};
const YellowRoundedButton = props => (
  <Button {...props} rounded styleButton={[styles.yellow, props.styleButton]} />
);

YellowRoundedButton.propTypes = {
  styleButton: oneOfType([object, number, array]),
};

YellowRoundedButton.defaultProps = {
  styleButton: {},
};
const GreyRoundedButton = props => (
  <Button {...props} rounded styleButton={[styles.grey, props.styleButton]} />
);

GreyRoundedButton.propTypes = {
  styleButton: oneOfType([object, number, array]),
};

GreyRoundedButton.defaultProps = {
  styleButton: {},
};

export { Button, YellowButton, YellowRoundedButton, GreyRoundedButton };
