import React from 'react';
import { StyleSheet } from 'react-native';
import { string, arrayOf, func } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import SecurityCode from 'shared/SecurityCode';
import * as Styles from '../../styles';

const styles = StyleSheet.create({
  content: {
    marginTop: 40,
  },
  text: {
    marginTop: 60,
  },
});
const CodeStep = ({ pin, token, enterPin }) => {
  return (
    <Styles.StyledCode>
      <SecurityCode
        isSetup
        isDebit
        text={getTranslations('auth.label.entermailcode')}
        contentStyle={styles.content}
        textStyle={styles.text}
        setupAction={enterPin}
        pin={pin}
        amount={token}
      />
    </Styles.StyledCode>
  );
};

CodeStep.propTypes = {
  enterPin: func.isRequired,
  pin: arrayOf(string).isRequired,
  token: string.isRequired,
};

export default CodeStep;
