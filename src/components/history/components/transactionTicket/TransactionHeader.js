import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components/native';

import Back from 'shared/Back';

import barcode from 'assets/history/barcode.png';

import {
  StyledContainerBasic,
  StyledContainerRow,
} from 'styles/styledComponents/containers';

const StyledBack = StyledContainerBasic.extend`align-items: flex-end;`;
const StyledBarcode = styled.Image`
  width: 43px;
  height: 31px;
`;

const TransactionHeader = ({ closeAction }) => {
  return (
    <StyledContainerRow>
      <StyledContainerBasic>
        <StyledBarcode source={barcode} />
      </StyledContainerBasic>
      <StyledBack>
        <Back type="cross" action={closeAction} />
      </StyledBack>
    </StyledContainerRow>
  );
};

TransactionHeader.propTypes = {
  closeAction: func.isRequired,
};

export default TransactionHeader;
