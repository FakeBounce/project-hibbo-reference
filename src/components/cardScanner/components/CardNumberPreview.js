import React from 'react';
import { string } from 'prop-types';

import { SLine, SText } from '../styles';

const CardNumberPreview = ({ cardNumber }) => {
  if (cardNumber !== '') {
    return (
      <SLine>
        <SText>{cardNumber.substr(0, 4)}</SText>
        <SText>{cardNumber.substr(4, 4)}</SText>
        <SText>{cardNumber.substr(8, 4)}</SText>
        <SText>{cardNumber.substr(12, 4)}</SText>
      </SLine>
    );
  }

  return (
    <SLine>
      <SText>XXXX</SText>
      <SText>XXXX</SText>
      <SText>XXXX</SText>
      <SText>XXXX</SText>
    </SLine>
  );
};

CardNumberPreview.propTypes = {
  cardNumber: string.isRequired,
};

export default CardNumberPreview;
