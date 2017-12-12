import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components/native';

import Checkbox from 'shared/Checkbox';

import { StyledContainerRow } from 'styledComponents/containers';
import { StyledTextXXSmall } from 'styledComponents/texts';

const SContainer = StyledContainerRow.extend`
  margin-bottom: 5px;
`;
const STextButton = styled.TouchableOpacity`
  margin-left: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.lightGrey};
`;
const SText = StyledTextXXSmall.extend`
  color: ${props => props.theme.colors.lightGrey};
`;

const TermsLink = ({ name, label, action, checkboxPressed }) => {
  return (
    <SContainer>
      <Checkbox name={name} pressedAction={checkboxPressed} />
      <STextButton onPress={action}>
        <SText>{label}</SText>
      </STextButton>
    </SContainer>
  );
};

TermsLink.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  action: func.isRequired,
  checkboxPressed: func.isRequired,
};

export default TermsLink;
