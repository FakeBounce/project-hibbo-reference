import React from 'react';
import { string } from 'prop-types';

import { StyledContainerColumn } from 'styles/styledComponents/containers';
import { StyledTextXSmall } from 'styles/styledComponents/texts';

const AccountName = ({ name }) => {
  return (
    <StyledContainerColumn>
      <StyledTextXSmall>{name}</StyledTextXSmall>
    </StyledContainerColumn>
  );
};

AccountName.propTypes = {
  name: string.isRequired,
};

export default AccountName;
