import React from 'react';
import { shape, func, string } from 'prop-types';

import Back from 'shared/Back';

import { getTranslations } from 'utils/i18n';

import { StyledTextSmall, StyledTextXXSmall } from 'styledComponents/texts';

import * as Styles from '../styles';

const PrivacyPolicies = ({ navigation }) => {
  return (
    <Styles.SContainer>
      <Styles.SHeader>
        <Styles.SSides />
        <Styles.SCentered>
          <StyledTextSmall>{getTranslations('privacy.title')}</StyledTextSmall>
        </Styles.SCentered>
        <Styles.SSides>
          <Back
            type="cross"
            action={() => {
              navigation.goBack(null);
            }}
          />
        </Styles.SSides>
      </Styles.SHeader>
      <Styles.SContent>
        <StyledTextXXSmall>
          {getTranslations('privacy.paragraph1')}
        </StyledTextXXSmall>
      </Styles.SContent>
    </Styles.SContainer>
  );
};

PrivacyPolicies.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PrivacyPolicies;
