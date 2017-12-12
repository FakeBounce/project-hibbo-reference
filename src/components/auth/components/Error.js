import React from 'react';
import { string, number } from 'prop-types';

import Toast from 'shared/Toast';

import * as Styles from '../styles';

const Error = ({ posX, posY, label }) => {
  return (
    <Styles.SError posX={posX} posY={posY}>
      <Toast label={label} position="bottom" />
    </Styles.SError>
  );
};

Error.propTypes = {
  label: string.isRequired,
  posX: number.isRequired,
  posY: number.isRequired,
};

export default Error;
