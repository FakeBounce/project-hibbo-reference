import React from 'react';
import { string } from 'prop-types';

import { StyledContainerColumn } from 'styles/styledComponents/containers';
import { StyledTextXSmall } from 'styles/styledComponents/texts';

const StyledText = StyledTextXSmall.extend`letter-spacing: 1.5px;`;

const AccountNumber = ({ accountNumber }) => {
  return (
    <StyledContainerColumn>
      <StyledText>
        N° ****{accountNumber.substr(accountNumber.length - 4)}
      </StyledText>
    </StyledContainerColumn>
  );
};

AccountNumber.propTypes = {
  accountNumber: string.isRequired,
};

export default AccountNumber;
