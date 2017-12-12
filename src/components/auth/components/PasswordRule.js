import React from 'react';
import { func, bool } from 'prop-types';
import { StyledGreyTextXSmall } from 'styles/styledComponents/texts';
import { getTranslations } from 'utils/i18n';
import Link from './Link';
import { SResetTextExplain } from '../styles';

const PasswordRule = ({ showPassword, isPaswordHidden }) => {
  return (
    <SResetTextExplain>
      <StyledGreyTextXSmall>
        {getTranslations('auth.label.minimunpasswordsize')}
      </StyledGreyTextXSmall>
      <Link
        label={
          isPaswordHidden
            ? getTranslations('auth.label.showpassword')
            : getTranslations('auth.label.hidepassword')
        }
        action={showPassword}
        textDecorationLine="underline"
      />
    </SResetTextExplain>
  );
};

PasswordRule.propTypes = {
  isPaswordHidden: bool.isRequired,
  showPassword: func.isRequired,
};

export default PasswordRule;
