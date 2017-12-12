import React from 'react';
import { string } from 'prop-types';

import { StyledContainerColumn } from 'styledComponents/containers';
import { StyledTextXSmall } from 'styledComponents/texts';

const StyledContainer = StyledContainerColumn.extend`
  padding-vertical: 18px;
  background-color: ${props => props.theme.colors.buttonYellow};
`;

const SectionHeader = ({ title }) => {
  return (
    <StyledContainer>
      <StyledTextXSmall>{title}</StyledTextXSmall>
    </StyledContainer>
  );
};

SectionHeader.propTypes = {
  title: string.isRequired,
};

export default SectionHeader;
