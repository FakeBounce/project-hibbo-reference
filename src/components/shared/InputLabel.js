import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components/native';

import { StyledTextXXSmall } from 'styledComponents/texts';

const StyledContainer = styled.View`
  margin-bottom: 5px;
`;
const SText = StyledTextXXSmall.extend`
  color: ${props => props.theme.colors.inputLabel};
`;

const InputLabel = ({ label }) => {
  return (
    <StyledContainer>
      <SText>{label.toUpperCase()}</SText>
    </StyledContainer>
  );
};

InputLabel.propTypes = {
  label: string.isRequired,
};

export default InputLabel;
