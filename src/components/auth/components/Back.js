import React from 'react';
import { TouchableOpacity } from 'react-native';
import { func, string, bool } from 'prop-types';

import back from 'assets/auth/nav/back.png';

import * as Styles from '../styles';

const Back = ({ goBack, title, isTos }) => {
  return (
    <Styles.SHeader isTos={isTos}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          goBack(title);
        }}
      >
        <Styles.SBackImage source={back} />
      </TouchableOpacity>
    </Styles.SHeader>
  );
};

Back.defaultProps = {
  title: '',
  isTos: false,
};

Back.propTypes = {
  goBack: func.isRequired,
  title: string,
  isTos: bool,
};

export default Back;
