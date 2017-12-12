import React from 'react';
import { shape, string, number } from 'prop-types';
import appStyles from 'styles/appStyles';
import Toast from 'shared/Toast';
import { getTranslations } from 'utils/i18n';
import { pwdSecurityLevel } from 'utils/regex';

import { SToastSecurityCheck } from '../styles';

const getToastForm = securityLevel => {
  switch (securityLevel) {
    case 'strong':
      return {
        color: appStyles.colors.greenStrong,
        text: getTranslations('auth.security.passwordStrong'),
      };
    case 'medium':
      return {
        color: appStyles.colors.orangeNotStrong,
        text: getTranslations('auth.security.passwordNotStrong'),
      };
    default:
      return {
        color: appStyles.colors.red,
        text: getTranslations('auth.security.passwordWeak'),
      };
  }
};

const SecurityToast = ({ password, inputPosition }) => {
  const { color, text } = getToastForm(pwdSecurityLevel(password));

  return (
    <SToastSecurityCheck posX={inputPosition.x + 50} posY={inputPosition.y}>
      <Toast label={text} type="security" position="bottom" color={color} />
    </SToastSecurityCheck>
  );
};

SecurityToast.propTypes = {
  password: string.isRequired,
  inputPosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
};

export default SecurityToast;
