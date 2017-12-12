import React from 'react';
import { Animated } from 'react-native';
import { shape, instanceOf, func } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';

import Link from 'shared/Link';

import { getTranslations } from 'utils/i18n';

const styles = EStyleSheet.create({
  link: {
    backgroundColor: 'transparent',
  },
  register: {
    fontSize: 35,
    marginBottom: 15,
  },
  login: {
    fontSize: 17,
  },
  linkText: {
    color: '$colors.white',
    fontFamily: '$fonts.circularMedium',
  },
});

const AWrapperControls = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const Controls = ({ styling, selectAuthType }) => {
  return (
    <AWrapperControls style={styling}>
      <Link
        label={getTranslations('auth.register')}
        action={() => {
          selectAuthType('register');
        }}
        buttonStyle={styles.link}
        linkStyle={[styles.linkText, styles.register]}
      />

      <Link
        label={getTranslations('auth.login')}
        action={() => {
          selectAuthType('login');
        }}
        buttonStyle={styles.link}
        linkStyle={[styles.linkText, styles.login]}
      />
    </AWrapperControls>
  );
};

Controls.propTypes = {
  styling: shape({
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  selectAuthType: func.isRequired,
};

export default Controls;
